/**
 * BillsPay24X7 — Aria's grounded knowledge base.
 *
 * This is the single source of truth Aria is allowed to speak from. Every fact
 * below is lifted from a page that is actually live on the site (Hero, About,
 * Pricing, Partners, Travel, IT, Modals). Aria never composes claims that are
 * not represented here, so the bot cannot invent MDR rates, SLAs or partners.
 *
 * Structure mirrors the memory graph in the MoneyMind project: each topic is a
 * node carrying its own retrieval signals plus the edges that relate it to
 * neighbouring topics, so a matched node can both answer and suggest where to
 * go next.
 */

// ── Company profile ──────────────────────────────────────────────────────────
export const COMPANY = {
  brand: 'BillsPay24X7✓',
  legalName: 'BillsPay Technologies Private Limited',
  cin: 'U63999UP2026PTC245490',
  founded: '2026',
  headOffice: 'Lucknow Chowk, Lucknow, Uttar Pradesh 226003',
  city: 'Lucknow',
  phone: '+91 92784 03522',
  phoneRaw: '+919278403522',
  whatsapp: 'https://wa.me/919278403522',
  email: 'support@billspay24x7.com',
  hours: 'Mon–Sat 9AM–7PM IST, with 24×7 support',
  responseTime: 'within 2 hours during business hours',
  tagline: 'Smart Payments. Secure Growth.',
  positioning:
    "India's complete fintech, IT software and travel platform — payments, banking services, travel APIs and custom software under one roof.",
  mission: 'Empower every business with seamless digital financial and technology services.',
  vision: "Become India's most trusted platform for fintech, travel, and IT solutions.",
  values: [
    'Integrity — transparency, security and compliance at every level',
    'Innovation — we constantly evolve our technology to stay ahead of market needs',
  ],
};

// Headline numbers, each one shown somewhere on the live site.
export const STATS = {
  mdr: '0.17% UPI MDR',
  settlement: 'T+1 settlement (next working day)',
  uptime: '99.9% uptime',
  bankPartners: '80+ bank partners',
  bbpsBillers: '220+ BBPS billers',
  airlines: '500+ airlines',
  hotels: '1M+ hotels across 190 countries',
  busOperators: '1000+ bus operators',
  projects: '120+ projects shipped',
  clients: '50+ clients',
  delivery: '6-week average delivery',
  retention: '99% client retention',
  merchants: '500+ merchants across India',
  goLive: 'sandbox-to-production in as little as 72 hours',
  activation: 'merchant accounts activated within 48 hours of online KYC',
};

// The four service pillars. `nodeId` ties a topic back to the memory graph.
export const PILLARS = {
  fintech: {
    id: 'fintech',
    label: 'Fintech & Payments',
    nodeLabel: 'Payments',
    color: '#6366F1',
    tagline: 'Accept UPI, Cards & Wallets — 0.17% MDR, T+1 settlement',
    desc: 'Payment gateway, UPI collections, virtual accounts and payout APIs with T+1 settlement and 80+ bank partners.',
  },
  banking: {
    id: 'banking',
    label: 'Banking Services',
    nodeLabel: 'Banking & AEPS',
    color: '#F59E0B',
    tagline: 'BBPS · AEPS · Recharge — full financial inclusion stack',
    desc: 'Last-mile retail banking: BBPS bill payments, AEPS Aadhaar banking and recharges.',
  },
  travel: {
    id: 'travel',
    label: 'Travel Solutions',
    nodeLabel: 'Travel APIs',
    color: '#10B981',
    tagline: 'Flights · Hotels · Buses · Trains — 500+ airlines, 1M+ hotels',
    desc: 'B2B travel APIs and white-label booking engines for flights, hotels, buses, trains and holiday packages.',
  },
  it: {
    id: 'it',
    label: 'IT Software',
    nodeLabel: 'IT & Software',
    color: '#EC4899',
    tagline: 'Custom fintech, travel, e-commerce & cloud — 120+ projects shipped',
    desc: 'Custom web portals, mobile apps, cloud/DevOps, e-commerce and fintech platforms built RBI-compliant.',
  },
  company: {
    id: 'company',
    label: 'About the Company',
    nodeLabel: 'BillsPay24X7',
    color: '#0EA5E9',
    desc: 'Lucknow-based fintech and technology company founded in 2026.',
  },
};

// Chip sets reused across answers.
export const CHIPS = {
  main: ['💳 Payments', '🏦 Banking & AEPS', '✈️ Travel APIs', '🛠️ IT Software', '💰 Pricing'],
  contact: ['📞 Request Callback', '💬 WhatsApp Us', '📧 Email Us'],
};

/**
 * Topics — Aria's retrievable memory.
 *
 * aliases  : whole phrases a visitor is likely to type. Matched with word
 *            boundaries, weighted heavily.
 * keywords : single discriminating tokens. Weighted lower.
 * Keep keywords longer than two characters — short fragments like "ai" or "pg"
 * used to substring-match inside unrelated words ("email", "available") and
 * routed half the conversation into the wrong pillar.
 */
export const TOPICS = [
  // ── Company ───────────────────────────────────────────────────────────────
  {
    id: 'about',
    pillar: 'company',
    title: 'About BillsPay24X7',
    aliases: [
      'about you', 'about us', 'about the company', 'about billspay', 'about billspay24x7',
      'who are you',
      'who is billspay', 'what is billspay', 'what do you do', 'tell me about your company',
      'company info', 'company details', 'your company', 'introduce yourself', 'know about company',
    ],
    keywords: ['about', 'company', 'organisation', 'organization', 'firm', 'business', 'billspay', 'overview', 'profile'],
    answer:
      `**${COMPANY.brand}** is a Lucknow-based fintech and technology company — legally **${COMPANY.legalName}** (CIN ${COMPANY.cin}), founded in ${COMPANY.founded}.\n\n` +
      `We started with one mission: make digital financial services accessible to every business in India. From our head office in ${COMPANY.city}, we now serve merchants, agents and enterprises across the country.`,
    bullets: [
      '💳 Payments — gateway, UPI, virtual accounts, payouts',
      '🏦 Banking — BBPS, AEPS, recharges',
      '✈️ Travel — flights, hotels, buses, trains, packages',
      '🛠️ IT Software — custom portals, apps, cloud',
    ],
    chips: ['💳 Payments', '🏦 Banking & AEPS', '✈️ Travel APIs', '🛠️ IT Software'],
    related: ['mission', 'contact', 'why-us'],
  },
  {
    id: 'mission',
    pillar: 'company',
    title: 'Mission, vision & values',
    aliases: ['your mission', 'your vision', 'company values', 'what do you stand for', 'mission and vision', 'core values'],
    keywords: ['mission', 'vision', 'values', 'purpose', 'goal', 'believe', 'culture', 'ethos'],
    answer:
      `**Mission** — ${COMPANY.mission}\n\n**Vision** — ${COMPANY.vision}`,
    bullets: [
      '🛡️ Integrity — transparency, security & compliance at every level',
      '⚙️ Innovation — we constantly evolve to stay ahead of market needs',
    ],
    chips: ['🏢 About Us', '🤝 Our Partners', '📞 Request Callback'],
    related: ['about', 'partners'],
  },
  {
    id: 'contact',
    strong: ['email', 'whatsapp', 'helpline'],
    pillar: 'company',
    title: 'Contact us',
    aliases: [
      'contact you', 'contact details', 'contact number', 'phone number', 'your number',
      'how do i reach you', 'how to contact', 'get in touch', 'talk to someone', 'call you',
      'your email', 'email address', 'whatsapp number', 'customer care', 'helpline', 'reach out',
    ],
    keywords: ['contact', 'phone', 'call', 'mobile', 'number', 'email', 'mail', 'whatsapp', 'reach', 'helpline', 'care'],
    answer:
      `Here's how to reach us — we reply ${COMPANY.responseTime}.\n\n` +
      `📞 **Phone / WhatsApp** — ${COMPANY.phone}\n` +
      `📧 **Email** — ${COMPANY.email}\n` +
      `📍 **Head Office** — ${COMPANY.headOffice}\n` +
      `🕘 **Hours** — ${COMPANY.hours}`,
    chips: ['📞 Request Callback', '💬 WhatsApp Us', '📧 Email Us'],
    related: ['location', 'support', 'hours'],
  },
  {
    id: 'location',
    strong: ['address', 'lucknow'],
    pillar: 'company',
    title: 'Office location',
    aliases: [
      'where are you located', 'where are you based', 'your address', 'office address',
      'head office', 'which city', 'are you in lucknow', 'do you have an office',
    ],
    keywords: ['location', 'address', 'office', 'city', 'based', 'lucknow', 'located', 'where'],
    answer:
      `Our head office is at **${COMPANY.headOffice}**.\n\n` +
      `We're a Lucknow-headquartered company serving merchants, agents and enterprises across India — onboarding and support run remotely, so you don't need to be in Lucknow to work with us.`,
    chips: ['📞 Request Callback', '🏢 About Us', '💬 WhatsApp Us'],
    related: ['contact', 'about'],
  },
  {
    id: 'hours',
    pillar: 'company',
    title: 'Business hours',
    aliases: ['business hours', 'working hours', 'office hours', 'when are you open', 'what time', 'are you open now'],
    keywords: ['hours', 'timing', 'timings', 'open', 'closed', 'available', 'weekend', 'sunday', 'holiday'],
    answer:
      `Our office hours are **${COMPANY.hours}**.\n\n` +
      `Sales and onboarding run Mon–Sat 9AM–7PM IST. Transaction and API support is staffed 24×7 via WhatsApp, phone and email — so if something breaks at 2AM, someone picks up.`,
    chips: ['📞 Request Callback', '💬 WhatsApp Us', '🛟 Support'],
    related: ['contact', 'support'],
  },
  {
    id: 'legal',
    strong: ['cin'],
    pillar: 'company',
    title: 'Legal entity & registration',
    aliases: ['company registration', 'cin number', 'legal name', 'registered company', 'are you registered', 'gst number', 'incorporation'],
    keywords: ['cin', 'registered', 'registration', 'legal', 'entity', 'incorporated', 'pvt', 'limited'],
    answer:
      `We operate as **${COMPANY.legalName}**, a private limited company incorporated in ${COMPANY.founded}.\n\n` +
      `**CIN:** ${COMPANY.cin}\n**Registered office:** ${COMPANY.headOffice}`,
    chips: ['🔐 Compliance & Security', '🏢 About Us', '📞 Request Callback'],
    related: ['compliance', 'about'],
  },
  {
    id: 'careers',
    strong: ['careers', 'hiring', 'vacancy', 'resume'],
    pillar: 'company',
    title: 'Careers',
    aliases: [
      'are you hiring', 'job opening', 'job openings', 'career opportunities', 'work with you',
      'apply for a job', 'vacancy', 'send my resume', 'internship',
    ],
    keywords: ['career', 'careers', 'hiring', 'job', 'jobs', 'vacancy', 'recruit', 'resume', 'cv', 'internship', 'employment'],
    answer:
      `We're hiring in **Lucknow** — competitive salaries, hybrid work and a fast learning curve.\n\n` +
      `**Current openings:**\n` +
      `• Software Engineer — Backend (Node.js / Python), 2–5 years\n` +
      `• Software Engineer — Frontend (React / Next.js), 2–5 years\n\n` +
      `To apply, email your resume to **${COMPANY.email}** with the subject "Careers".`,
    chips: ['📧 Email Us', '🏢 About Us'],
    related: ['about', 'contact'],
  },
  {
    id: 'partners',
    strong: ['partners'],
    pillar: 'company',
    title: 'Banking & technology partners',
    aliases: [
      'your partners', 'who do you work with', 'banking partners', 'partner banks',
      'which banks', 'technology partners', 'partnership',
    ],
    keywords: ['partner', 'partners', 'partnership', 'banks', 'network', 'npci', 'sbi', 'icici', 'visa', 'irctc', 'aws', 'cashfree'],
    answer:
      `We work with leading banks, networks and technology providers so you inherit their reach on day one:\n\n` +
      `🏦 **Banking** — State Bank of India, ICICI Bank (API banking)\n` +
      `🇮🇳 **Networks** — NPCI (UPI & BBPS), Visa, RBI-regulated compliance\n` +
      `☁️ **Infrastructure** — AWS Cloud\n` +
      `✈️ **Travel** — IRCTC (rail), MakeMyTrip (inventory)\n` +
      `💳 **Settlement** — Jio Payment & Cashfree power our T+1 settlement`,
    bullets: [`${STATS.bankPartners} on the payments side`],
    chips: ['💳 Payments', '🔐 Compliance & Security', '📞 Request Callback'],
    related: ['compliance', 'payment-gateway'],
  },
  {
    id: 'why-us',
    pillar: 'company',
    title: 'Why choose BillsPay24X7',
    aliases: [
      'why should i choose you', 'why you', 'what makes you different', 'why billspay',
      'your advantage', 'compare with razorpay', 'better than others', 'competitors',
    ],
    keywords: ['why', 'different', 'advantage', 'benefit', 'better', 'unique', 'compare', 'competitor', 'choose'],
    answer: `Six reasons merchants pick us:`,
    bullets: [
      `⚡ **T+1 Settlement** — next-day settlement powered by Jio Payment & Cashfree`,
      `🔐 **Bank-Grade Security** — 256-bit SSL, 2FA, RBI-compliant`,
      `🛠️ **Full-Stack** — payments, banking, travel APIs and custom software from one vendor`,
      `📊 **Real-Time Analytics** — live dashboards, reconciliation and BI reports`,
      `🤝 **24×7 Support** — WhatsApp, phone, email plus a dedicated account manager`,
      `🚀 **Rapid Deployment** — ${STATS.goLive}`,
    ],
    chips: ['💰 Pricing', '🤝 Our Partners', '📞 Request Callback'],
    related: ['pricing', 'partners', 'onboarding'],
  },
  {
    id: 'industries',
    pillar: 'company',
    title: 'Industries we serve',
    aliases: [
      'which industries', 'who are your clients', 'do you work with', 'industries you serve',
      'industries do you serve', 'is this for my business', 'suitable for', 'use cases',
    ],
    keywords: ['industry', 'industries', 'sector', 'clients', 'customers', 'retail', 'kirana', 'ecommerce', 'healthcare', 'education', 'saas', 'enterprise', 'agency'],
    answer: `We serve eight core segments — odds are yours is one of them:`,
    bullets: [
      '🏪 **Retail & Kirana** — AEPS, BBPS & recharge for neighbourhood outlets',
      '🏢 **B2B Aggregators** — white-label platforms with distributor hierarchy',
      '🛒 **E-commerce** — gateway + payouts + GST invoicing',
      '✈️ **Travel Agencies** — flight, hotel, bus, train booking with B2B markup',
      '💊 **Healthcare** — patient billing, subscriptions, insurance payments',
      '🎓 **Education** — fee collection, instalments, automated reminders',
      '🏗️ **SaaS Startups** — recurring billing, usage pricing, developer APIs',
      '🏛️ **Enterprise** — custom IT, ERP integration, dedicated cloud',
    ],
    chips: ['💳 Payments', '🛠️ IT Software', '📞 Request Callback'],
    related: ['about', 'clients'],
  },
  {
    id: 'clients',
    pillar: 'company',
    title: 'Client results',
    aliases: [
      'client testimonials', 'case study', 'case studies', 'success stories', 'reviews',
      'who uses your platform', 'any references', 'proof',
    ],
    keywords: ['testimonial', 'testimonials', 'review', 'reviews', 'reference', 'casestudy', 'success', 'story', 'stories', 'results'],
    answer: `A few results our clients have shared publicly:`,
    bullets: [
      '🏦 **PayEasy Fintech, Lucknow** — integrated UPI, BBPS and the gateway "within days"',
      '✈️ **TravelNow India, Delhi** — launched a full flight/hotel/bus platform in under 2 weeks',
      '💳 **DigiPay Solutions, Kanpur** — white-label platform with multi-level distributor hierarchy; T+1 settlement transformed retailer cash flow',
      `🏪 **Lucknow agent network** — AEPS & BBPS serving 25,000+ rural customers, ₹15L daily volume, 250+ active agents`,
    ],
    chips: ['🏢 About Us', '💰 Pricing', '📞 Request Callback'],
    related: ['industries', 'why-us'],
  },
  {
    id: 'support',
    pillar: 'company',
    title: 'Customer support',
    aliases: [
      'customer support', 'support team', 'help desk', 'technical support', 'raise a ticket',
      'i have a problem', 'transaction failed', 'payment failed', 'not working', 'complaint',
      'money not received', 'refund status', 'stuck transaction',
    ],
    keywords: ['support', 'help', 'issue', 'problem', 'complaint', 'failed', 'failure', 'stuck', 'pending', 'error', 'refund', 'dispute', 'escalate', 'ticket'],
    answer:
      `We run **24×7 customer support** via WhatsApp, phone and email, and every account gets a dedicated account manager.\n\n` +
      `For anything urgent — a failed transaction, a stuck settlement, an API error — the fastest route is WhatsApp on **${COMPANY.phone}**. Email **${COMPANY.email}** gets a reply ${COMPANY.responseTime}.\n\n` +
      `I'm a website guide, so I can't look up individual transactions. Let me take your details and put a human on it.`,
    chips: ['📞 Request Callback', '💬 WhatsApp Us', '📧 Email Us'],
    related: ['contact', 'hours'],
    urgent: true,
  },

  // ── Fintech & payments ────────────────────────────────────────────────────
  {
    id: 'payment-gateway',
    strong: ['gateway'],
    pillar: 'fintech',
    title: 'Payment Gateway',
    aliases: [
      'payment gateway', 'accept payments', 'online payments', 'checkout page', 'card payments',
      'credit card', 'debit card', 'netbanking', 'net banking', 'accept card', 'payment link',
      'start accepting payments', 'razorpay alternative',
    ],
    keywords: ['gateway', 'checkout', 'payments', 'payment', 'cards', 'netbanking', 'wallet', 'wallets', 'acquiring', 'merchant', 'transaction', 'transactions'],
    answer:
      `Our **Payment Gateway** lets you accept UPI, credit/debit cards, netbanking and wallets from one integration.\n\n` +
      `Powered by Jio Payment & Cashfree, with a white-label checkout so your customers never leave your brand.`,
    bullets: [
      `💰 **${STATS.mdr}** — transparent, no hidden fees`,
      `⚡ **${STATS.settlement}** straight to your registered bank account`,
      `📈 **${STATS.uptime}** with ${STATS.bankPartners}`,
      `🎨 White-label checkout + SDK and REST API`,
      `🔐 256-bit SSL and RBI-compliant infrastructure`,
    ],
    chips: ['💰 Pricing & MDR', '🔌 API & Integration', '📞 Request Callback'],
    related: ['pricing', 'integration', 'settlement', 'onboarding'],
  },
  {
    id: 'upi',
    strong: ['upi'],
    pillar: 'fintech',
    title: 'UPI Collections',
    aliases: [
      'upi collections', 'upi payments', 'accept upi', 'qr code', 'dynamic qr', 'upi autopay',
      'upi mandate', 'scan and pay', 'upi intent', 'collect via upi',
    ],
    keywords: ['upi', 'qrcode', 'mandate', 'autopay', 'collect', 'collections', 'intent'],
    answer:
      `**UPI Collections** gives you India's fastest-growing payment rail end to end.`,
    bullets: [
      '📱 Dynamic QR codes and shareable payment links',
      '🔁 UPI AutoPay mandates for subscriptions and recurring billing',
      '⚡ UPI intent flow for in-app one-tap payments',
      `💰 ${STATS.mdr} — among the lowest in the market`,
      `⏱️ ${STATS.settlement}`,
    ],
    chips: ['💳 Payment Gateway', '💰 Pricing & MDR', '📞 Request Callback'],
    related: ['payment-gateway', 'pricing'],
  },
  {
    id: 'virtual-accounts',
    strong: ['virtual'],
    pillar: 'fintech',
    title: 'Virtual Accounts',
    aliases: [
      'virtual accounts', 'virtual account', 'smart collect', 'dedicated bank account',
      'auto reconciliation', 'neft collection', 'imps collection',
    ],
    keywords: ['virtual', 'reconcile', 'reconciliation', 'neft', 'rtgs', 'imps', 'routing', 'segregation'],
    answer:
      `**Virtual Accounts** give you a dedicated bank account number per merchant or per transaction — so incoming money reconciles itself.`,
    bullets: [
      '🏦 Dedicated virtual bank account per merchant or per transaction',
      '⚡ Real-time credit detection via IMPS / NEFT / RTGS',
      '🔀 Automatic fund routing to the right sub-account',
      '📋 Regulatory segregation of client funds',
    ],
    chips: ['💳 Payment Gateway', '💸 Payout API', '📞 Request Callback'],
    related: ['payment-gateway', 'payouts'],
  },
  {
    id: 'payouts',
    strong: ['payout', 'payouts'],
    pillar: 'fintech',
    title: 'Payout API',
    aliases: [
      'payout api', 'payouts', 'send money', 'bulk payout', 'disbursement', 'vendor payment',
      'salary payment', 'transfer to bank account', 'refund api', 'cashback',
    ],
    keywords: ['payout', 'payouts', 'disburse', 'disbursement', 'bulk', 'salary', 'vendor', 'cashback', 'remit'],
    answer:
      `The **Payout API** sends money out to any bank account, UPI ID or wallet — instantly, over REST.`,
    bullets: [
      '⚡ Instant transfers to bank account, UPI ID or wallet',
      '📦 Bulk payouts for salaries, vendors, cashbacks and refunds',
      '🕐 24×7 real-time payout processing',
      '🔌 Clean REST API with webhooks',
    ],
    chips: ['🔌 API & Integration', '🏦 Virtual Accounts', '📞 Request Callback'],
    related: ['integration', 'virtual-accounts'],
  },
  {
    id: 'settlement',
    strong: ['settlement'],
    pillar: 'fintech',
    title: 'Settlement cycle',
    aliases: [
      'settlement cycle', 'when do i get my money', 'how fast is settlement', 'payout time',
      'settlement time', 't+1', 'when will i receive funds',
    ],
    keywords: ['settlement', 'settle', 'settled', 'payoutcycle', 'funds', 'credited'],
    answer:
      `Settlement is **T+1** — the next working day — processed directly to your registered bank account for domestic payments.\n\n` +
      `It's powered by Jio Payment & Cashfree, and it's the single thing clients tell us changed their cash flow most.`,
    chips: ['💳 Payment Gateway', '💰 Pricing & MDR', '📞 Request Callback'],
    related: ['payment-gateway', 'pricing'],
  },
  {
    id: 'compliance',
    strong: ['rbi', 'npci'],
    pillar: 'fintech',
    title: 'Security & compliance',
    aliases: [
      'are you rbi approved', 'rbi compliant', 'is it safe', 'is it secure', 'security',
      'data protection', 'are you regulated', 'npci approved', 'licence', 'license',
    ],
    keywords: ['security', 'secure', 'safe', 'safety', 'compliance', 'compliant', 'regulated', 'rbi', 'npci', 'encryption', 'ssl', 'audit'],
    answer:
      `Our banking integrations and payouts run on **NPCI-approved protocols** and comply with **RBI guidelines**.`,
    bullets: [
      '🔒 256-bit SSL encryption and 2FA',
      '📋 Compliant fund segregation and reporting',
    ],
    chips: ['🤝 Our Partners', '💳 Payment Gateway', '📞 Request Callback'],
    related: ['partners', 'payment-gateway', 'legal'],
  },
  {
    id: 'onboarding',
    pillar: 'fintech',
    title: 'Getting started & KYC',
    aliases: [
      'how do i get started', 'how to sign up', 'how to register', 'onboarding process',
      'kyc process', 'documents required', 'how long to activate', 'activation time',
      'how do i become a merchant', 'open an account', 'demo', 'free trial', 'sandbox access',
    ],
    keywords: ['start', 'started', 'signup', 'register', 'registration', 'onboard', 'onboarding', 'activate', 'activation', 'kyc', 'documents', 'demo', 'trial', 'apply'],
    answer:
      `Getting started is quick:\n\n` +
      `1️⃣ Tell us what you need — payments, banking, travel or software\n` +
      `2️⃣ Complete **online KYC** — standard payment gateway accounts activate **within 48 hours**\n` +
      `3️⃣ Test everything in sandbox — pay-in, payouts, BBPS, recharge, travel booking\n` +
      `4️⃣ Go live — ${STATS.goLive}\n\n` +
      `Free consultation, no commitments. Shall I have someone call you?`,
    chips: ['📞 Request Callback', '💰 Pricing', '🔌 API & Integration'],
    related: ['pricing', 'integration', 'contact'],
  },
  {
    id: 'integration',
    strong: ['api', 'apis', 'sdk', 'webhook', 'webhooks', 'sandbox'],
    pillar: 'fintech',
    title: 'API & integration',
    aliases: [
      'api documentation', 'api docs', 'developer docs', 'how to integrate', 'integration guide',
      'sdk', 'rest api', 'webhook', 'sandbox', 'test credentials', 'technical integration',
    ],
    keywords: ['api', 'apis', 'sdk', 'integrate', 'integration', 'webhook', 'webhooks', 'endpoint', 'developer', 'documentation', 'docs', 'sandbox', 'postman'],
    answer:
      `Everything we ship is **REST API first**, with SDKs and webhooks.\n\n` +
      `You get full sandbox access before a single real rupee moves — we test pay-in, payouts, BBPS, recharge, travel booking and verification flows end to end, then flip you to production.`,
    bullets: [
      '🔌 REST APIs + SDKs for gateway, payouts, BBPS, AEPS and travel',
      '🪝 Webhooks for real-time transaction events',
      '🧪 Full sandbox environment before go-live',
      `🚀 ${STATS.goLive}`,
    ],
    chips: ['📞 Request Callback', '💳 Payment Gateway', '💸 Payout API'],
    related: ['payment-gateway', 'payouts', 'onboarding'],
  },

  // ── Banking services ──────────────────────────────────────────────────────
  {
    id: 'bbps',
    strong: ['bbps'],
    pillar: 'banking',
    title: 'BBPS Bill Payments',
    aliases: [
      'bbps', 'bill payment', 'bill payments', 'bharat bill payment', 'electricity bill',
      'gas bill', 'water bill', 'broadband bill', 'dth bill', 'insurance premium', 'loan emi payment',
    ],
    keywords: ['bbps', 'bill', 'bills', 'biller', 'billers', 'electricity', 'utility', 'broadband', 'insurance', 'emi', 'fastag'],
    answer:
      `**BBPS** — the Bharat Bill Payment System — lets you collect payments for electricity, gas, water, broadband, insurance, DTH and loan EMIs in one click, with instant confirmation.`,
    bullets: [
      `🧾 **${STATS.bbpsBillers}** across every major category`,
      '✅ Instant confirmation',
      '💰 Earn commission on every bill payment',
      '🕐 24×7 processing',
    ],
    chips: ['🏦 AEPS Services', '🏪 Agent Network', '📞 Request Callback'],
    related: ['aeps', 'agent-network'],
  },
  {
    id: 'aeps',
    strong: ['aeps'],
    pillar: 'banking',
    title: 'AEPS — Aadhaar banking',
    aliases: [
      'aeps', 'aadhaar enabled payment', 'aadhaar banking', 'biometric withdrawal',
      'fingerprint banking', 'cash withdrawal', 'micro atm', 'mini atm', 'balance enquiry',
    ],
    keywords: ['aeps', 'aadhaar', 'aadhar', 'biometric', 'fingerprint', 'withdrawal', 'withdraw', 'cashout', 'microatm'],
    answer:
      `**AEPS** (Aadhaar Enabled Payment System) turns any retail outlet into a banking point — cash withdrawal, balance enquiry and fund transfer using only a fingerprint. No card, no PIN.`,
    bullets: [
      '👆 Biometric cash withdrawal and balance enquiry',
      '💵 ₹10K daily AEPS limit per customer',
      '🏪 Enables genuine last-mile banking in rural India',
      '✅ 24×7 processing',
    ],
    chips: ['🧾 BBPS', '🏪 Agent Network', '📞 Request Callback'],
    related: ['bbps', 'agent-network'],
  },
  {
    id: 'recharge',
    strong: ['recharge'],
    pillar: 'banking',
    title: 'Mobile & DTH recharge',
    aliases: [
      'mobile recharge', 'dth recharge', 'prepaid recharge', 'postpaid recharge', 'data card recharge',
      'fastag recharge', 'top up',
    ],
    keywords: ['recharge', 'prepaid', 'postpaid', 'topup', 'telecom', 'operator'],
    answer:
      `Instant **mobile and DTH recharge** for all Indian telecom operators — prepaid, postpaid, DTH, FASTag and data cards.\n\n` +
      `Retailers earn a margin on every single transaction.`,
    chips: ['🧾 BBPS', '🏦 AEPS Services', '📞 Request Callback'],
    related: ['bbps', 'agent-network'],
  },
  {
    id: 'agent-network',
    strong: ['agent', 'agents', 'retailer', 'distributor'],
    pillar: 'banking',
    title: 'Agent / retailer network',
    aliases: [
      'become an agent', 'become a retailer', 'agent portal', 'retailer portal', 'csp',
      'bc agent', 'distributor', 'white label banking', 'agent commission', 'franchise',
    ],
    keywords: ['agent', 'agents', 'retailer', 'retailers', 'distributor', 'hierarchy', 'commission', 'franchise', 'network', 'portal'],
    answer:
      `Yes — we run a full **agent / retailer network** with multi-level distributor hierarchy.\n\n` +
      `You get one dashboard covering AEPS, BBPS, UPI and payouts, real-time monitoring and T+1 settlement. Our Lucknow agent-network client scaled to 250+ active agents and ₹15L daily volume on this platform.`,
    bullets: [
      '🏪 Multi-tier agent, retailer and distributor hierarchy',
      '📊 Real-time monitoring dashboard',
      '💰 Commission management built in',
      '🎨 Available fully white-labelled under your brand',
    ],
    chips: ['🏦 AEPS Services', '💰 Pricing', '📞 Request Callback'],
    related: ['aeps', 'bbps', 'pricing'],
  },

  // ── Travel ────────────────────────────────────────────────────────────────
  {
    id: 'travel-overview',
    pillar: 'travel',
    title: 'Travel solutions',
    aliases: [
      'travel services', 'travel solutions', 'travel api', 'travel apis', 'travel booking',
      'travel portal', 'travel business', 'booking engine',
    ],
    keywords: ['travel', 'booking', 'bookings', 'trip', 'tourism', 'itinerary'],
    answer:
      `Our **travel stack** covers flights, hotels, buses, trains and holiday packages — available as B2B APIs, a white-label portal, or our consumer booking site.`,
    bullets: [
      `✈️ **${STATS.airlines}** — domestic and international`,
      `🏨 **${STATS.hotels}**`,
      `🚌 **${STATS.busOperators}** with live seat inventory`,
      `🚆 **IRCTC integrated** — Tatkal, general and premium`,
      `🏝️ Curated domestic & international holiday packages`,
    ],
    chips: ['✈️ Flights', '🏨 Hotels', '🎨 White-Label Portal', '📞 Request Callback'],
    related: ['flights', 'hotels', 'buses', 'trains', 'white-label-travel'],
  },
  {
    id: 'flights',
    strong: ['flight', 'flights', 'airline', 'airlines'],
    pillar: 'travel',
    title: 'Flight booking',
    aliases: ['flight booking', 'book a flight', 'air ticket', 'airline api', 'flight api', 'charter', 'cargo'],
    keywords: ['flight', 'flights', 'airline', 'airlines', 'airfare', 'charter', 'cargo', 'gds'],
    answer:
      `**Flight booking** across ${STATS.airlines}, domestic and international — lowest fares, group bookings, plus charter and cargo support.`,
    chips: ['🏨 Hotels', '🎨 White-Label Portal', '📞 Request Callback'],
    related: ['travel-overview', 'white-label-travel'],
  },
  {
    id: 'hotels',
    strong: ['hotel', 'hotels'],
    pillar: 'travel',
    title: 'Hotel booking',
    aliases: ['hotel booking', 'book a hotel', 'hotel api', 'accommodation', 'resort', 'wholesale rates'],
    keywords: ['hotel', 'hotels', 'accommodation', 'stay', 'resort', 'room', 'rooms'],
    answer:
      `**${STATS.hotels}** — budget to luxury, with instant confirmation, free cancellation and B2B wholesale rates.`,
    chips: ['✈️ Flights', '🎨 White-Label Portal', '📞 Request Callback'],
    related: ['travel-overview', 'white-label-travel'],
  },
  {
    id: 'buses',
    strong: ['bus', 'buses'],
    pillar: 'travel',
    title: 'Bus tickets',
    aliases: ['bus booking', 'bus ticket', 'bus tickets', 'bus api', 'sleeper bus', 'volvo'],
    keywords: ['bus', 'buses', 'sleeper', 'seat', 'operator', 'operators'],
    answer:
      `**${STATS.busOperators}** with real-time seat inventory — AC, sleeper and semi-sleeper, multi-city routes and live tracking.`,
    chips: ['🚆 Trains', '✈️ Flights', '📞 Request Callback'],
    related: ['travel-overview', 'trains'],
  },
  {
    id: 'trains',
    strong: ['irctc'],
    pillar: 'travel',
    title: 'Train booking (IRCTC)',
    aliases: ['train booking', 'train ticket', 'irctc api', 'railway booking', 'tatkal', 'pnr status'],
    keywords: ['train', 'trains', 'irctc', 'railway', 'rail', 'tatkal', 'pnr', 'waitlist'],
    answer:
      `**IRCTC-integrated train booking** — Tatkal, general and premium class, with live PNR and waitlist alerts.`,
    chips: ['🚌 Buses', '✈️ Flights', '📞 Request Callback'],
    related: ['travel-overview', 'buses'],
  },
  {
    id: 'white-label-travel',
    strong: ['whitelabel'],
    pillar: 'travel',
    title: 'White-label travel portal',
    aliases: [
      'white label travel', 'white label portal', 'own travel brand', 'b2b travel portal',
      'travel agency platform', 'commission management', 'markup',
    ],
    keywords: ['whitelabel', 'branded', 'b2b', 'markup', 'commission', 'agency', 'reseller'],
    answer:
      `Yes — we build **fully branded white-label travel booking engines** for flights, hotels and buses under *your* brand name.\n\n` +
      `B2B and B2C, with IRCTC API, GDS integration and commission/markup management. One client launched their complete platform in under 2 weeks.`,
    chips: ['✈️ Flights', '🛠️ IT Software', '📞 Request Callback'],
    related: ['travel-overview', 'travel-tech'],
  },

  // ── IT software ───────────────────────────────────────────────────────────
  {
    id: 'it-overview',
    pillar: 'it',
    title: 'IT software & solutions',
    aliases: [
      'software development', 'it services', 'it solutions', 'build software', 'custom software',
      'develop an app', 'build a website', 'build a platform', 'software company',
    ],
    keywords: ['software', 'development', 'develop', 'build', 'custom', 'technology', 'engineering', 'project'],
    answer:
      `Our **IT division** builds fintech portals, travel engines, mobile apps, ERP, CRM and B2B SaaS platforms.`,
    bullets: [
      `📦 **${STATS.projects}** for **${STATS.clients}**`,
      `⏱️ **${STATS.delivery}**`,
      `🤝 **${STATS.retention}** client retention`,
      `💰 Fixed-price quotes — if we can't build it well, we say so upfront`,
    ],
    chips: ['🌐 Web Development', '📱 Mobile Apps', '☁️ Cloud & DevOps', '📞 Request Callback'],
    related: ['web-dev', 'mobile-dev', 'cloud', 'it-process'],
  },
  {
    id: 'web-dev',
    strong: ['website', 'react', 'nextjs'],
    pillar: 'it',
    title: 'Web development',
    aliases: ['web development', 'website development', 'build a website', 'web app', 'saas platform', 'web portal', 'pwa'],
    keywords: ['web', 'website', 'react', 'nextjs', 'nodejs', 'frontend', 'portal', 'saas', 'dashboard'],
    answer:
      `**Web development** in React, Next.js and Node.js — high-performance portals, SaaS platforms and progressive web apps built to handle 10,000 concurrent users.`,
    chips: ['📱 Mobile Apps', '☁️ Cloud & DevOps', '📞 Request Callback'],
    related: ['it-overview', 'mobile-dev'],
  },
  {
    id: 'mobile-dev',
    strong: ['flutter', 'reactnative', 'android', 'ios'],
    pillar: 'it',
    title: 'Mobile app development',
    aliases: ['mobile app', 'android app', 'ios app', 'app development', 'flutter app', 'react native'],
    keywords: ['mobile', 'app', 'apps', 'android', 'ios', 'flutter', 'reactnative', 'offline'],
    answer:
      `**Mobile apps** for iOS and Android from a single Flutter or React Native codebase — fintech apps, travel booking and field-agent apps with offline sync.`,
    chips: ['🌐 Web Development', '☁️ Cloud & DevOps', '📞 Request Callback'],
    related: ['it-overview', 'web-dev'],
  },
  {
    id: 'cloud',
    strong: ['devops', 'kubernetes', 'aws'],
    pillar: 'it',
    title: 'Cloud & DevOps',
    aliases: ['cloud services', 'devops', 'aws hosting', 'kubernetes', 'ci cd', 'server management', 'hosting'],
    keywords: ['cloud', 'devops', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'cicd', 'hosting', 'infrastructure', 'deployment'],
    answer:
      `**Cloud & DevOps** — AWS, Azure and GCP architecture, Docker containers, Kubernetes orchestration and CI/CD pipelines with zero-downtime deployments.`,
    chips: ['🌐 Web Development', '🛠️ IT Software', '📞 Request Callback'],
    related: ['it-overview', 'web-dev'],
  },
  {
    id: 'ecommerce',
    strong: ['ecommerce'],
    pillar: 'it',
    title: 'E-commerce solutions',
    aliases: ['ecommerce website', 'online store', 'shopping website', 'b2c store', 'gst billing', 'inventory management'],
    keywords: ['ecommerce', 'commerce', 'store', 'shop', 'shopping', 'inventory', 'gst', 'logistics', 'catalogue'],
    answer:
      `**E-commerce platforms**, B2B and B2C — integrated payment gateway, inventory management, GST billing, logistics APIs and real-time analytics.`,
    chips: ['💳 Payment Gateway', '🌐 Web Development', '📞 Request Callback'],
    related: ['it-overview', 'payment-gateway'],
  },
  {
    id: 'fintech-portal',
    pillar: 'it',
    title: 'Fintech & payment portals',
    aliases: [
      'fintech portal', 'aeps dashboard', 'bbps portal', 'payout system',
      'agent portal software', 'build a fintech platform',
    ],
    keywords: ['fintechportal', 'dashboard', 'panel', 'admin', 'hierarchy'],
    answer:
      `We build **fintech and payment portals** — AEPS dashboards, BBPS portals, payout systems and agent networks — secure and RBI-compliant.\n\n` +
      `Our own agent portal runs ₹50L+ daily volume across 500+ agents, so this is a platform we operate ourselves, not just build.`,
    chips: ['🏪 Agent Network', '💳 Payments', '📞 Request Callback'],
    related: ['agent-network', 'it-overview'],
  },
  {
    id: 'travel-tech',
    pillar: 'it',
    title: 'Travel tech platforms',
    aliases: ['travel software', 'booking engine development', 'travel platform development', 'gds integration'],
    keywords: ['traveltech', 'engine', 'gds'],
    answer:
      `**White-label B2B & B2C booking engines** for flights, hotels, buses and trains — with IRCTC API, GDS integration and commission management.`,
    chips: ['✈️ Travel APIs', '🛠️ IT Software', '📞 Request Callback'],
    related: ['white-label-travel', 'it-overview'],
  },
  {
    id: 'it-process',
    pillar: 'it',
    title: 'How we deliver projects',
    aliases: [
      'how long will it take', 'how long does it take', 'how long does a project take',
      'how long to build', 'delivery timeline', 'project timeline', 'development process',
      'how do you work', 'your process', 'project cost', 'quote',
    ],
    keywords: ['timeline', 'process', 'phases', 'delivery', 'deadline', 'duration', 'estimate', 'quote', 'scope', 'maintenance', 'project'],
    answer:
      `Our delivery process runs in five phases, ending with a live production launch.\n\n` +
      `We scope your project, estimate effort honestly and send a **fixed-price quote** — if we can't build it well, we tell you upfront.`,
    bullets: [
      `⏱️ **${STATS.delivery}** across ${STATS.projects}`,
      '🧪 Complete sandbox testing before anything goes live',
      '🚀 Production deployment with monitoring, alerting and auto-scaling',
      '🔧 Post-launch support from **₹9,999/month**',
      `🤝 ${STATS.retention} client retention`,
    ],
    chips: ['💰 Pricing', '🛠️ IT Software', '📞 Request Callback'],
    related: ['it-overview', 'pricing'],
  },

  // ── Pricing ───────────────────────────────────────────────────────────────
  {
    id: 'pricing',
    strong: ['mdr', 'pricing'],
    pillar: 'company',
    title: 'Pricing & plans',
    aliases: [
      'pricing', 'price list', 'how much does it cost', 'what are your charges', 'your rates',
      'plans and pricing', 'subscription cost', 'monthly fee', 'setup fee', 'is it free',
      'mdr rate', 'transaction charges', 'commission rate', 'kitna charge',
    ],
    keywords: ['price', 'pricing', 'cost', 'costs', 'charge', 'charges', 'rate', 'rates', 'fee', 'fees', 'plan', 'plans', 'mdr', 'subscription', 'expensive', 'cheap', 'budget', 'quote'],
    answer:
      `Simple, transparent pricing — no hidden fees.\n\n` +
      `**Starter — ₹0/month**\nBasic payment gateway, BBPS bill payments, UPI QR collections, email support, up to ₹50K daily volume.\n\n` +
      `**Business — ₹2,999/month** ⭐ *most popular*\nEverything in Starter, plus AEPS, Payout API, Travel API access, priority phone support, up to ₹5L daily volume.\n\n` +
      `**Enterprise — custom**\nEverything in Business, plus custom IT solutions, dedicated account manager, white-label options, 24/7 priority support, unlimited volume.\n\n` +
      `On transactions, UPI MDR is **${STATS.mdr}**. Custom software is quoted fixed-price per project, with support from ₹9,999/month.`,
    chips: ['📞 Request Callback', '💬 WhatsApp Us', '💳 Payment Gateway'],
    related: ['payment-gateway', 'onboarding', 'it-process'],
  },
];

/** Fast id → topic lookup. */
export const TOPIC_BY_ID = TOPICS.reduce((acc, t) => {
  acc[t.id] = t;
  return acc;
}, {});
