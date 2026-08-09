/**
 * Aria's reasoning engine.
 *
 * Mirrors the pipeline used by the MoneyMind advisor: normalise the input,
 * recall relevant memory (here: knowledge topics plus what the visitor already
 * asked about), score the candidates, then compose a structured result the UI
 * renders. Nothing here calls a network — retrieval and composition are local,
 * so Aria answers instantly, works offline and costs nothing per visitor.
 *
 * The engine returns a single shaped object, deliberately similar to the JSON
 * the MoneyMind LLM produces, so the UI has one contract to render:
 *
 *   {
 *     intent, confidence, topicId, title,
 *     answer, bullets, chips, action,
 *     pillars, topics,                 // for the memory graph
 *     thinkingPath                     // what Aria matched and why
 *   }
 */

import { COMPANY, PILLARS, TOPICS, TOPIC_BY_ID, CHIPS } from './billspayKnowledge';

// ── Text normalisation ───────────────────────────────────────────────────────

/**
 * Multi-word terms that must survive tokenisation as one token, so "white
 * label" and "whitelabel" score identically.
 */
const PHRASE_COMPOUNDS = [
  ['pci dss', 'pcidss'],
  ['qr code', 'qrcode'],
  ['white label', 'whitelabel'],
  ['ci cd', 'cicd'],
  ['next js', 'nextjs'],
  ['node js', 'nodejs'],
  ['react native', 'reactnative'],
  ['micro atm', 'microatm'],
  ['mini atm', 'microatm'],
  ['cash out', 'cashout'],
  ['cash in', 'cashin'],
  ['top up', 'topup'],
  ['e commerce', 'ecommerce'],
  ['case study', 'casestudy'],
  ['case studies', 'casestudy'],
  ['travel tech', 'traveltech'],
  ['fintech portal', 'fintechportal'],
  ['payment gateway', 'gateway payments'],
];

/**
 * Token-level rewrites: Hinglish, common shorthand and frequent typos, mapped
 * onto the vocabulary the knowledge base actually uses. Visitors type "kitna
 * charge hai" far more often than "what are your transaction fees".
 */
const TOKEN_SYNONYMS = {
  // Hinglish
  kitna: 'cost', kitne: 'cost', kitni: 'cost',
  paisa: 'money', paise: 'money', rupay: 'money', rupaye: 'money',
  chahiye: 'want', karna: 'do', karne: 'do', kaise: 'how', kaisa: 'how',
  kya: 'what', kahan: 'where', kaha: 'where', kab: 'when', kyu: 'why', kyun: 'why',
  hai: '', hain: '', mujhe: '', mera: 'my', meri: 'my', aap: 'you', aapka: 'your',
  bhai: '', sir: '', madam: '', ji: '',
  // shorthand / typos
  u: 'you', ur: 'your', urs: 'yours', r: 'are', pls: 'please', plz: 'please',
  thx: 'thanks', thnx: 'thanks', tnx: 'thanks', tq: 'thanks',
  info: 'information', doc: 'documentation', docs: 'documentation',
  acc: 'account', acct: 'account', ac: 'account',
  pg: 'gateway', txn: 'transaction', txns: 'transactions',
  aadhar: 'aadhaar', adhaar: 'aadhaar', adhar: 'aadhaar',
  wtsapp: 'whatsapp', whatsap: 'whatsapp', watsapp: 'whatsapp',
  no: 'number', num: 'number', mob: 'mobile',
  bussiness: 'business', servies: 'services', servcies: 'services',
  compnay: 'company', comapny: 'company',
};

/** Words that carry no retrieval signal. */
const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
  'do', 'does', 'did', 'can', 'could', 'will', 'would', 'shall', 'should',
  'may', 'might', 'must', 'of', 'to', 'in', 'on', 'at', 'by', 'for', 'with',
  'and', 'or', 'but', 'if', 'then', 'than', 'so', 'as', 'it', 'its', 'this',
  'that', 'these', 'those', 'me', 'my', 'we', 'our', 'you', 'your', 'i',
  'please', 'want', 'need', 'know', 'tell', 'give', 'get', 'have', 'has',
  'about', 'from', 'any', 'some', 'there', 'here', 'just', 'also', 'very',
]);

/**
 * Articles are dropped before phrase matching so "talk to a human" and "talk to
 * human" are the same phrase. Both the query and the stored aliases go through
 * this, so the two sides can never drift apart.
 */
const ARTICLES = new Set(['a', 'an', 'the']);

/** Lowercase, strip emoji/punctuation, fold compounds, apply synonyms. */
export function normalize(raw) {
  let text = String(raw || '').toLowerCase();

  // Strip everything that is not a letter, digit or space. This also removes
  // the emoji prefixes on quick-reply chips, so a chip routes like typed text.
  text = text.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();

  for (const [phrase, replacement] of PHRASE_COMPOUNDS) {
    if (text.includes(phrase)) text = text.split(phrase).join(replacement);
  }

  const tokens = text
    .split(' ')
    .map((t) => (Object.prototype.hasOwnProperty.call(TOKEN_SYNONYMS, t) ? TOKEN_SYNONYMS[t] : t))
    .join(' ')
    .split(' ')
    .filter(Boolean);

  return {
    text: tokens.join(' '),
    tokens,
    phraseText: tokens.filter((t) => !ARTICLES.has(t)).join(' '),
  };
}

/**
 * Aliases are authored as plain English but matched against normalised input,
 * so they must go through the identical pipeline. Computed once at module load.
 */
const NORMALIZED_ALIASES = new Map();
function aliasesFor(topic) {
  let cached = NORMALIZED_ALIASES.get(topic.id);
  if (!cached) {
    cached = (topic.aliases || []).map((a) => ({ raw: a, norm: normalize(a).phraseText })).filter((a) => a.norm);
    NORMALIZED_ALIASES.set(topic.id, cached);
  }
  return cached;
}

/** Content tokens only — used for scoring and for "did they say anything?" checks. */
function contentTokens(tokens) {
  return tokens.filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

// ── Conversational intents handled before knowledge retrieval ────────────────

const GREETING_WORDS = new Set([
  'hi', 'hii', 'hiii', 'hello', 'helo', 'hey', 'heyy', 'yo', 'sup', 'howdy',
  'namaste', 'namaskar', 'hola', 'greetings', 'morning', 'afternoon', 'evening',
]);

const THANKS_PATTERNS = ['thanks', 'thank you', 'thankyou', 'appreciate it', 'great help', 'helpful'];
const BYE_PATTERNS = ['bye', 'goodbye', 'good bye', 'see you', 'later', 'thats all', 'that is all', 'nothing else'];
const HUMAN_PATTERNS = [
  'talk to human', 'speak to human', 'real person', 'talk to someone', 'speak to someone',
  'talk to agent', 'human agent', 'customer executive', 'sales team', 'call me', 'callback',
  'call back', 'connect me', 'talk to your team', 'speak to sales',
];
const ARIA_PATTERNS = [
  'who are you', 'what are you', 'your name', 'are you a bot', 'are you human',
  'are you real', 'are you ai', 'what can you do', 'how can you help', 'what do you know',
];
const AFFIRM_PATTERNS = ['yes', 'yeah', 'yep', 'sure', 'ok', 'okay', 'please do', 'go ahead', 'do it'];

function includesPhrase(text, phrase) {
  // Word-boundary containment. Substring matching is what let "ai" fire inside
  // "email" and "available" and mis-route a large share of questions.
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|\\s)${escaped}($|\\s)`).test(text);
}

function matchesAny(text, patterns) {
  // Patterns are authored article-free, and `text` here is always phraseText.
  return patterns.some((p) => includesPhrase(text, p));
}

// ── Follow-up modifiers ──────────────────────────────────────────────────────

/**
 * Short referential turns ("how much?", "tell me more", "how do I start") carry
 * a clear intent but no subject. They resolve against the last topic discussed.
 */
const MODIFIERS = [
  { topicId: 'pricing', patterns: ['how much', 'what price', 'cost', 'charges', 'rate', 'fees', 'pricing'] },
  { topicId: 'onboarding', patterns: ['how do i start', 'how to start', 'get started', 'sign up', 'apply', 'activate'] },
  { topicId: 'integration', patterns: ['how to integrate', 'integration', 'api', 'documentation', 'sandbox'] },
  { topicId: 'contact', patterns: ['contact', 'phone', 'email', 'whatsapp', 'number'] },
];

const ELABORATE_PATTERNS = ['more', 'tell me more', 'explain', 'details', 'detail', 'elaborate', 'continue', 'go on'];

// ── Scoring ──────────────────────────────────────────────────────────────────

const ALIAS_HIT = 14;
const ALIAS_EXACT_BONUS = 8;
const ALIAS_EXTRA_HIT = 2;
const ALIAS_EXTRA_CAP = 6;
const STRONG_HIT = 11;
const KEYWORD_HIT = 5;
const KEYWORD_PREFIX_HIT = 2.5;
const KEYWORD_CAP = 15;
const TITLE_HIT = 2;
const PILLAR_CONTEXT_BOOST = 2;
const RELATED_CONTEXT_BOOST = 3;

function scoreTopic(topic, norm, tokenSet, memory) {
  let score = 0;
  const signals = [];

  // 1. Alias phrases — the strongest signal.
  let aliasHits = 0;
  for (const alias of aliasesFor(topic)) {
    if (includesPhrase(norm.phraseText, alias.norm)) {
      aliasHits += 1;
      if (aliasHits === 1) {
        score += ALIAS_HIT;
        signals.push(`phrase "${alias.raw}"`);
        if (norm.phraseText === alias.norm) score += ALIAS_EXACT_BONUS;
      } else if ((aliasHits - 1) * ALIAS_EXTRA_HIT <= ALIAS_EXTRA_CAP) {
        score += ALIAS_EXTRA_HIT;
      }
    }
  }

  // 1b. Unambiguous single tokens — acronyms and product names that identify a
  // topic on their own ("aeps", "cin", "mdr"). A bare "what is your mdr" has no
  // phrase to match, so without this it never clears the confidence bar.
  for (const strong of topic.strong || []) {
    if (tokenSet.has(strong)) {
      score += STRONG_HIT;
      signals.push(strong);
    }
  }

  // 2. Discriminating keywords, matched on whole tokens.
  let keywordScore = 0;
  for (const kw of topic.keywords || []) {
    if (tokenSet.has(kw)) {
      keywordScore += KEYWORD_HIT;
      signals.push(kw);
    } else if (kw.length >= 5) {
      // Tolerate plurals and light inflection without opening up substring noise.
      for (const token of tokenSet) {
        if (token.length >= 5 && (token.startsWith(kw) || kw.startsWith(token))) {
          keywordScore += KEYWORD_PREFIX_HIT;
          signals.push(`${token}~${kw}`);
          break;
        }
      }
    }
  }
  score += Math.min(keywordScore, KEYWORD_CAP);

  // 3. Words from the topic title.
  for (const word of normalize(topic.title).tokens) {
    if (word.length > 3 && tokenSet.has(word)) score += TITLE_HIT;
  }

  // 4. Conversational memory — what we were already talking about.
  if (score > 0 && memory) {
    if (memory.lastPillar && topic.pillar === memory.lastPillar) score += PILLAR_CONTEXT_BOOST;
    if (memory.lastTopicId) {
      const last = TOPIC_BY_ID[memory.lastTopicId];
      if (last && (last.related || []).includes(topic.id)) score += RELATED_CONTEXT_BOOST;
    }
  }

  return { score, signals };
}

/** Rank every topic against the query. Returns matches with score > 0, best first. */
export function retrieve(query, memory) {
  const norm = normalize(query);
  const tokens = contentTokens(norm.tokens);
  const tokenSet = new Set(tokens);

  return TOPICS.map((topic) => {
    const { score, signals } = scoreTopic(topic, norm, tokenSet, memory);
    return { topic, score, signals };
  })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score);
}

const HIGH_CONFIDENCE = 12;
const MEDIUM_CONFIDENCE = 6;

// ── Quick-reply chip routing ─────────────────────────────────────────────────

/**
 * A chip Aria rendered herself should never be re-interpreted by the scorer —
 * it is a button, and buttons must be deterministic. Every chip label resolves
 * straight to its topic; scoring is only for what the visitor freely types.
 *
 * Keyed on normalised text, so the emoji prefix and punctuation are irrelevant.
 */
const CHIP_LABEL_TO_TOPIC = {
  '💳 Payments': 'payment-gateway',
  '💳 Payment Gateway': 'payment-gateway',
  '🏦 Banking & AEPS': 'aeps',
  '🏦 AEPS Services': 'aeps',
  '✈️ Travel APIs': 'travel-overview',
  '🛠️ IT Software': 'it-overview',
  '💰 Pricing': 'pricing',
  '💰 Pricing & MDR': 'pricing',
  '🔌 API & Integration': 'integration',
  '🏢 About Us': 'about',
  '🤝 Our Partners': 'partners',
  '🔐 Compliance & Security': 'compliance',
  '🛟 Support': 'support',
  '💸 Payout API': 'payouts',
  '🏦 Virtual Accounts': 'virtual-accounts',
  '🧾 BBPS': 'bbps',
  '💸 DMT': 'dmt',
  '🏪 Agent Network': 'agent-network',
  '✈️ Flights': 'flights',
  '🏨 Hotels': 'hotels',
  '🚌 Buses': 'buses',
  '🚆 Trains': 'trains',
  '🎨 White-Label Portal': 'white-label-travel',
  '🌐 Web Development': 'web-dev',
  '📱 Mobile Apps': 'mobile-dev',
  '☁️ Cloud & DevOps': 'cloud',
};

const CHIP_ROUTES = new Map();
for (const [label, topicId] of Object.entries(CHIP_LABEL_TO_TOPIC)) {
  CHIP_ROUTES.set(normalize(label).phraseText, topicId);
}
// Chips generated at runtime carry the topic's own title, e.g. "✈️ Flight booking".
for (const topic of TOPICS) {
  CHIP_ROUTES.set(normalize(topic.title).phraseText, topic.id);
}

// ── Response composition ─────────────────────────────────────────────────────

function topicResponse(topic, extra = {}) {
  return {
    intent: 'knowledge',
    topicId: topic.id,
    title: topic.title,
    answer: topic.answer,
    bullets: topic.bullets || [],
    chips: topic.chips || CHIPS.main,
    action: topic.urgent ? 'lead' : null,
    pillars: topic.pillar ? [topic.pillar] : [],
    topics: [topic.id],
    ...extra,
  };
}

const CAPABILITY_ANSWER =
  `I'm **Aria**, the ${COMPANY.brand} advisor. I know this company inside out and I can walk you through any of it:\n\n` +
  `💳 **Payments** — gateway, UPI, virtual accounts, payouts, MDR, settlement\n` +
  `🏦 **Banking** — BBPS, AEPS, DMT, recharge, agent networks\n` +
  `✈️ **Travel** — flights, hotels, buses, IRCTC trains, white-label portals\n` +
  `🛠️ **IT Software** — web, mobile, cloud, e-commerce, custom platforms\n` +
  `🏢 **The company** — who we are, pricing, partners, compliance, careers, contact\n\n` +
  `Ask me anything in plain English or Hinglish — or tap an option below.`;

/**
 * Main entry point. Give it the visitor's message plus the running memory, get
 * back a fully composed reply.
 *
 * @param {string} message  what the visitor typed (or the chip they tapped)
 * @param {object} memory   { lastTopicId, lastPillar, discussedTopics[], turnCount }
 */
export function ask(message, memory = {}) {
  const norm = normalize(message);
  const tokens = contentTokens(norm.tokens);
  const text = norm.phraseText;

  const base = {
    intent: 'unknown',
    confidence: 'low',
    topicId: null,
    title: null,
    answer: '',
    bullets: [],
    chips: CHIPS.main,
    action: null,
    pillars: [],
    topics: [],
    thinkingPath: { matched: [], strategy: 'none', recalled: memory.lastTopicId || null },
  };

  // Empty or punctuation-only input.
  if (!text) {
    return {
      ...base,
      intent: 'smalltalk',
      answer: "I didn't catch that — could you rephrase? You can also tap one of the options below.",
    };
  }

  // A tapped chip resolves directly — no scoring, no ambiguity.
  const chipTopicId = CHIP_ROUTES.get(text);
  if (chipTopicId && TOPIC_BY_ID[chipTopicId]) {
    return {
      ...base,
      ...topicResponse(TOPIC_BY_ID[chipTopicId]),
      confidence: 'high',
      thinkingPath: { matched: ['quick reply'], strategy: 'chip route', recalled: memory.lastTopicId || null },
    };
  }

  const matches = retrieve(message, memory);
  const best = matches[0];
  const runnerUp = matches[1];

  // ── 1. Conversational intents that outrank knowledge retrieval ────────────

  // Human handoff. Checked first: someone asking for a person should never be
  // handed another paragraph of marketing copy.
  if (matchesAny(text, HUMAN_PATTERNS)) {
    return {
      ...base,
      intent: 'handoff',
      confidence: 'high',
      answer:
        `Of course — let's get a human on this.\n\n` +
        `Fastest is WhatsApp on **${COMPANY.phone}**. Or leave your details and our team will call you back ${COMPANY.responseTime}.`,
      chips: CHIPS.contact,
      action: 'lead',
      thinkingPath: { matched: ['human handoff request'], strategy: 'intent', recalled: memory.lastTopicId || null },
    };
  }

  // Greeting — only when the message is essentially just a greeting, so
  // "hi, what does the gateway cost?" still routes to pricing.
  const nonGreetingTokens = tokens.filter((t) => !GREETING_WORDS.has(t) && t !== 'good');
  if (tokens.some((t) => GREETING_WORDS.has(t)) && nonGreetingTokens.length === 0) {
    const returning = (memory.turnCount || 0) > 0;
    return {
      ...base,
      intent: 'greeting',
      confidence: 'high',
      answer: returning
        ? `Hello again! What else can I help you with?`
        : `👋 Hello, and welcome to **${COMPANY.brand}**!\n\n` +
          `We're a Lucknow-based fintech and technology company — we do payments, banking services, travel APIs and custom software.\n\n` +
          `What brings you here today?`,
      chips: CHIPS.main,
      thinkingPath: { matched: ['greeting'], strategy: 'intent', recalled: null },
    };
  }

  if (matchesAny(text, ARIA_PATTERNS)) {
    return {
      ...base,
      intent: 'capabilities',
      confidence: 'high',
      answer: CAPABILITY_ANSWER,
      chips: CHIPS.main,
      thinkingPath: { matched: ['identity / capabilities'], strategy: 'intent', recalled: null },
    };
  }

  // Gratitude, whether it's "thanks" or a whole appreciative sentence. A longer
  // message only counts if nothing in it looks like a real question.
  if (matchesAny(text, THANKS_PATTERNS) && (tokens.length <= 5 || !best || best.score < MEDIUM_CONFIDENCE)) {
    return {
      ...base,
      intent: 'thanks',
      confidence: 'high',
      answer: `You're very welcome! 😊 Anything else you'd like to know about ${COMPANY.brand}?`,
      chips: ['📞 Request Callback', '💰 Pricing', '🏢 About Us'],
      thinkingPath: { matched: ['thanks'], strategy: 'intent', recalled: null },
    };
  }

  if (matchesAny(text, BYE_PATTERNS) && tokens.length <= 5) {
    return {
      ...base,
      intent: 'bye',
      confidence: 'high',
      answer:
        `Thanks for stopping by! 👋\n\n` +
        `Whenever you're ready: **${COMPANY.phone}** on WhatsApp, or **${COMPANY.email}**. Have a great day!`,
      chips: ['💬 WhatsApp Us', '📞 Request Callback'],
      thinkingPath: { matched: ['farewell'], strategy: 'intent', recalled: null },
    };
  }

  // "Yes please" right after Aria offered a callback.
  if (matchesAny(text, AFFIRM_PATTERNS) && tokens.length <= 3 && memory.offeredCallback) {
    return {
      ...base,
      intent: 'handoff',
      confidence: 'high',
      answer: `Perfect — just a few details and our team will reach out ${COMPANY.responseTime}.`,
      chips: CHIPS.contact,
      action: 'lead',
      thinkingPath: { matched: ['accepted callback offer'], strategy: 'intent', recalled: memory.lastTopicId || null },
    };
  }

  // ── 2. Confident knowledge match ──────────────────────────────────────────
  if (best && best.score >= HIGH_CONFIDENCE) {
    const response = topicResponse(best.topic);

    // When a second topic scored nearly as high, surface it as a chip rather
    // than guessing — cheap recovery from a genuinely ambiguous question.
    let chips = response.chips;
    if (runnerUp && runnerUp.score >= best.score * 0.75 && runnerUp.topic.pillar !== best.topic.pillar) {
      const label = `${pillarEmoji(runnerUp.topic.pillar)} ${runnerUp.topic.title}`;
      chips = [label, ...chips].slice(0, 5);
    }

    return {
      ...base,
      ...response,
      chips,
      confidence: 'high',
      thinkingPath: {
        matched: best.signals.slice(0, 4),
        strategy: 'knowledge retrieval',
        recalled: memory.lastTopicId || null,
        score: Math.round(best.score),
      },
    };
  }

  // ── 3. Follow-up resolution against the last topic ────────────────────────
  if (memory.lastTopicId) {
    const last = TOPIC_BY_ID[memory.lastTopicId];

    // "how much?" / "how do I start?" — a clear modifier with no subject.
    for (const mod of MODIFIERS) {
      if (matchesAny(text, mod.patterns) && (!best || best.score < HIGH_CONFIDENCE)) {
        const target = TOPIC_BY_ID[mod.topicId];
        if (target && target.id !== memory.lastTopicId) {
          return {
            ...base,
            ...topicResponse(target),
            confidence: 'medium',
            answer: last
              ? `On **${last.title}** — here's what you're asking about:\n\n${target.answer}`
              : target.answer,
            thinkingPath: {
              matched: [`follow-up on "${last ? last.title : 'previous topic'}"`],
              strategy: 'follow-up modifier',
              recalled: memory.lastTopicId,
            },
          };
        }
      }
    }

    // "tell me more" — re-serve the last topic with its neighbours.
    if (matchesAny(text, ELABORATE_PATTERNS) && tokens.length <= 4 && last) {
      const relatedChips = (last.related || [])
        .map((id) => TOPIC_BY_ID[id])
        .filter(Boolean)
        .map((t) => `${pillarEmoji(t.pillar)} ${t.title}`)
        .slice(0, 4);
      return {
        ...base,
        ...topicResponse(last),
        confidence: 'medium',
        chips: relatedChips.length ? [...relatedChips, '📞 Request Callback'] : last.chips,
        thinkingPath: {
          matched: [`elaborate on "${last.title}"`],
          strategy: 'follow-up elaboration',
          recalled: memory.lastTopicId,
        },
      };
    }
  }

  // ── 4. Medium-confidence match ────────────────────────────────────────────
  if (best && best.score >= MEDIUM_CONFIDENCE) {
    const response = topicResponse(best.topic);
    return {
      ...base,
      ...response,
      confidence: 'medium',
      thinkingPath: {
        matched: best.signals.slice(0, 4),
        strategy: 'knowledge retrieval (partial)',
        recalled: memory.lastTopicId || null,
        score: Math.round(best.score),
      },
    };
  }

  // ── 5. Weak signal — offer the closest topics instead of a dead end ───────
  if (matches.length > 0) {
    const suggestions = matches.slice(0, 3).map((m) => m.topic);
    return {
      ...base,
      intent: 'clarify',
      confidence: 'low',
      answer:
        `I want to make sure I answer the right question. Did you mean one of these?\n\n` +
        suggestions.map((t) => `• **${t.title}**`).join('\n'),
      chips: [
        ...suggestions.map((t) => `${pillarEmoji(t.pillar)} ${t.title}`),
        '📞 Request Callback',
      ],
      topics: [],
      thinkingPath: {
        matched: suggestions.map((t) => t.title),
        strategy: 'low-confidence clarification',
        recalled: memory.lastTopicId || null,
      },
    };
  }

  // ── 6. Nothing matched at all ─────────────────────────────────────────────
  return {
    ...base,
    intent: 'fallback',
    confidence: 'low',
    answer:
      `That one's outside what I can answer from our own information — and I'd rather point you to a person than guess.\n\n` +
      `Here's what I *can* cover:\n\n${CAPABILITY_ANSWER.split('\n\n').slice(1).join('\n\n')}`,
    chips: [...CHIPS.main.slice(0, 4), '📞 Request Callback'],
    thinkingPath: { matched: [], strategy: 'fallback', recalled: memory.lastTopicId || null },
  };
}

/** Emoji used to prefix a topic chip, keyed by pillar. */
export function pillarEmoji(pillar) {
  return { fintech: '💳', banking: '🏦', travel: '✈️', it: '🛠️', company: '🏢' }[pillar] || '•';
}

// ── Memory graph ─────────────────────────────────────────────────────────────

/**
 * Build a laid-out node/edge graph from the topics discussed so far.
 *
 * The old version hard-coded coordinates for six known node ids, so anything
 * beyond those four service categories piled up at the same point. This lays
 * nodes out radially instead, so the graph grows with the conversation.
 */
export function buildGraph(discussedTopicIds = [], viewSize = 340) {
  const c = viewSize / 2;
  const nodes = [
    { id: 'billspay', label: COMPANY.brand, type: 'platform', x: c, y: c, color: '#1B6247', desc: COMPANY.positioning },
  ];
  const edges = [];

  // Group discussed topics under their pillar.
  const byPillar = {};
  for (const id of discussedTopicIds) {
    const topic = TOPIC_BY_ID[id];
    if (!topic) continue;
    (byPillar[topic.pillar] = byPillar[topic.pillar] || []).push(topic);
  }

  const pillarIds = Object.keys(byPillar);
  if (pillarIds.length === 0) {
    nodes.push({
      id: 'you',
      label: 'Your Business',
      type: 'client',
      x: c,
      y: c + 105,
      color: '#2E9E68',
      desc: 'Ask me about a service and it will appear on this map.',
    });
    edges.push({ source: 'you', target: 'billspay', label: 'EXPLORING' });
    return { nodes, edges };
  }

  const pillarRadius = 88;
  const topicRadius = 148;

  pillarIds.forEach((pillarId, i) => {
    const pillar = PILLARS[pillarId] || { label: pillarId, color: '#1E6849', desc: '' };
    // Start at -90° so the first pillar sits above the hub.
    const angle = (i / pillarIds.length) * Math.PI * 2 - Math.PI / 2;
    const px = c + Math.cos(angle) * pillarRadius;
    const py = c + Math.sin(angle) * pillarRadius;

    nodes.push({
      id: `pillar_${pillarId}`,
      label: pillar.nodeLabel || pillar.label,
      type: 'pillar',
      x: px,
      y: py,
      color: pillar.color,
      desc: pillar.desc,
    });
    edges.push({ source: 'billspay', target: `pillar_${pillarId}`, label: 'OFFERS' });

    // Fan this pillar's topics out around the pillar's own angle.
    const topics = byPillar[pillarId].slice(0, 4);
    const spread = Math.PI / 5;
    topics.forEach((topic, j) => {
      const offset = topics.length === 1 ? 0 : (j / (topics.length - 1) - 0.5) * spread * 2;
      const ta = angle + offset;
      nodes.push({
        id: `topic_${topic.id}`,
        label: topic.title,
        type: 'topic',
        x: c + Math.cos(ta) * topicRadius,
        y: c + Math.sin(ta) * topicRadius,
        color: pillar.color,
        desc: (topic.answer || '').replace(/\*\*/g, '').split('\n')[0],
      });
      edges.push({ source: `pillar_${pillarId}`, target: `topic_${topic.id}`, label: 'INCLUDES' });
    });
  });

  return { nodes, edges };
}
