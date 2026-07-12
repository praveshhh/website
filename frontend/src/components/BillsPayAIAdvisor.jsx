import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Bot, Send, MessageSquare } from 'lucide-react';
import axios from 'axios';

// ── Knowledge base: every service category with broad keyword signals ──────────
const KB = {
  fintech: {
    label: 'Fintech & Payments',
    nodeLabel: 'Payment Gateway',
    nodeId: 'fintech',
    color: '#6366F1',
    signals: ['payment','pay','pg','gateway','checkout','upi','qr','virtual account','payout','disbursement',
               'netbanking','card','wallet','razorpay','merchant','transaction','settlement','mdr','collect','acquiring'],
    tagline: '💳 Accept UPI, Cards & Wallets — 0.17% MDR, T+1 settlement',
    bullets: [
      '✓ Instant UPI / QR checkout widget',
      '✓ T+1 bank settlement with 80+ partners',
      '✓ Payout & disbursement API (B2B)',
      '✓ Virtual accounts & smart collect',
      '✓ PCI-DSS & RBI compliant infra',
    ],
    desc: 'Accept payments via UPI, Cards, Netbanking & Wallets with T+1 settlement and 80+ bank partners.',
  },
  banking: {
    label: 'Banking Services',
    nodeLabel: 'Banking & AEPS',
    nodeId: 'banking',
    color: '#F59E0B',
    signals: ['aeps','aadhaar','biometric','bbps','utility','recharge','topup','dmt','money transfer',
               'remittance','neft','imps','banking','agent bank','csp','bc agent','withdrawal','deposit',
               'kyc','mini atm','micro atm'],
    tagline: '🏦 AEPS · BBPS · DMT · Recharges — Full Retail Banking Stack',
    bullets: [
      '✓ AEPS biometric cash withdrawal & balance',
      '✓ BBPS – all utility bill payments',
      '✓ DMT domestic money transfer',
      '✓ Mobile, DTH & data card recharges',
      '✓ BC-agent / CSP portal with hierarchy',
    ],
    desc: 'Retail banking services including AEPS biometric cash-outs, DMT transfers, and BBPS utility bill payments.',
  },
  travel: {
    label: 'Travel Solutions',
    nodeLabel: 'Travel Portal',
    nodeId: 'travel',
    color: '#10B981',
    signals: ['travel','flight','airline','hotel','bus','train','irctc','holiday','package','tour',
               'booking','ticket','gds','b2b travel','white label travel','itinerary','cab','car rental',
               'cruise','visa'],
    tagline: '✈️ Flights · Hotels · Buses · Trains — 500+ Airlines, 1M+ Hotels',
    bullets: [
      '✓ 500+ airlines — domestic & international',
      '✓ 1M+ hotels across 190 countries',
      '✓ IRCTC train API — Tatkal & general',
      '✓ 1000+ bus operators across India',
      '✓ White-label B2B / B2C travel portal',
    ],
    desc: 'API integrations & white-label portals for Flights, Hotels, Buses, Trains (IRCTC) and holiday packages.',
  },
  it: {
    label: 'IT Software',
    nodeLabel: 'IT & Software',
    nodeId: 'it',
    color: '#EC4899',
    signals: ['software','web','website','app','mobile','android','ios','flutter','react','node','api',
               'develop','build','portal','erp','crm','saas','cloud','aws','devops','kubernetes','ecommerce',
               'custom','fintech platform','dashboard','admin panel','tech','it solution','automation','ai','ml'],
    tagline: '🛠️ Custom Fintech · Travel · E-Commerce · Cloud — 120+ Projects',
    bullets: [
      '✓ React / Next.js web portals & SaaS',
      '✓ Flutter & React Native mobile apps',
      '✓ Fintech dashboards & BBPS portals',
      '✓ AWS / GCP cloud architecture',
      '✓ 6-week avg delivery — 99% retention',
    ],
    desc: 'Custom enterprise software, React portals, Flutter apps, cloud hosting, and compliance consulting.',
  },
};

// ── Greeting & small-talk detection ──────────────────────────────────────────
const GREETINGS = ['hi','hello','hey','hii','hiii','yo','sup','howdy','namaste','namaskar',
                   'good morning','good afternoon','good evening','good night'];
const SMALL_TALK = ['how are you','how r u','what can you do','who are you','what are you',
                    'help','what do you offer','tell me more','about you','services'];

function detectIntent(text) {
  const q = text.toLowerCase().trim();

  // Greeting
  if (GREETINGS.some(g => q === g || q.startsWith(g + ' ') || q.endsWith(' ' + g))) {
    return { type: 'greeting' };
  }
  // Small-talk / help
  if (SMALL_TALK.some(s => q.includes(s))) {
    return { type: 'smalltalk' };
  }

  // Score each category — count how many signal words appear
  const scores = {};
  let topScore = 0;
  Object.entries(KB).forEach(([key, cat]) => {
    const score = cat.signals.filter(sig => q.includes(sig)).length;
    scores[key] = score;
    if (score > topScore) topScore = score;
  });

  const matched = Object.entries(scores)
    .filter(([, s]) => s > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([key]) => key);

  if (matched.length > 0) return { type: 'service', matched };

  return { type: 'unknown' };
}

// ── Main component ────────────────────────────────────────────────────────────
export default function BillsPayAIAdvisor({ backendUrl, isOpen, onToggle, isChatOpen }) {
  if (isChatOpen) return null;

  const [showBubble, setShowBubble] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'graph'
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: "👋 Hi! I'm Aria, your BillsPay Care Advisor.\n\nWe provide standard-setting payment gateways, banking portals, travel APIs, and custom software. Tap an option below to learn more, or request a quick callback!",
      chips: ['💳 Payment Gateway', '🏦 Banking & AEPS', '✈️ Travel APIs', '🛠️ Custom Software', '📞 Request Callback'],
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Graph state representing the client's needs map
  const [nodes, setNodes] = useState([
    { id: 'client', label: 'Your Business', type: 'client', desc: 'Your custom enterprise project and requirements.' },
    { id: 'billspay', label: 'BillsPay24X7', type: 'platform', desc: 'Secure payment infrastructure and software platform.' }
  ]);
  const [edges, setEdges] = useState([
    { source: 'client', target: 'billspay', label: 'PARTNER' }
  ]);
  const [selectedNode, setSelectedNode] = useState(null);

  // Lead capture state
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const [leadStatus, setLeadStatus] = useState({ success: false, error: null, loading: false });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, loading, isOpen]);

  // Auto-greet bubble tooltip on page load (slides away if no interaction)
  useEffect(() => {
    const hasGreeted = sessionStorage.getItem('billspay_chatbot_greeted');
    if (!hasGreeted) {
      // Show greeting bubble 1.5 seconds after landing
      const openTimer = setTimeout(() => {
        setShowBubble(true);
        sessionStorage.setItem('billspay_chatbot_greeted', 'true');
      }, 1500);

      // Auto-close greeting bubble after 8 seconds (9.5s total from load)
      const closeTimer = setTimeout(() => {
        setShowBubble(false);
      }, 9500);

      return () => {
        clearTimeout(openTimer);
        clearTimeout(closeTimer);
      };
    }
  }, []);

  // ── Conversation engine using detectIntent + KB ────────────────────────────
  const buildBotReply = (text) => {
    const intent = detectIntent(text);

    if (intent.type === 'greeting') {
      return {
        content: "👋 Hello! Welcome to BillsPay24X7. I can guide you through our payment gateways, banking platforms, travel engines, or custom IT services. What can I help you build today?",
        chips: ['💳 Payment Gateway', '🏦 Banking & AEPS', '✈️ Travel APIs', '🛠️ Custom Software', '📞 Request Callback'],
        detected: null,
      };
    }

    if (intent.type === 'smalltalk') {
      return {
        content: "I'm Aria, your BillsPay advisor. I explain our payment infrastructure, retail banking, travel APIs, and custom software systems, and can connect you to our care desk. What are you looking to build?",
        chips: ['💳 Payment Gateway', '🏦 Banking & AEPS', '✈️ Travel APIs', '🛠️ Custom Software', '📞 Request Callback'],
        detected: null,
      };
    }

    if (intent.type === 'service') {
      const matched = intent.matched;
      const newNodes = [...nodes];
      const newEdges = [...edges];
      const detectedLabels = [];

      matched.forEach(key => {
        const cat = KB[key];
        if (!newNodes.some(n => n.id === cat.nodeId)) {
          newNodes.push({ id: cat.nodeId, label: cat.nodeLabel, type: 'service', desc: cat.desc, color: cat.color });
          newEdges.push({ source: 'client', target: cat.nodeId, label: 'NEEDS' });
          newEdges.push({ source: cat.nodeId, target: 'billspay', label: 'POWERED_BY' });
        }
        detectedLabels.push(cat.label);
      });

      setNodes(newNodes);
      setEdges(newEdges);

      let content = "";
      const firstMatch = matched[0];
      if (firstMatch === 'fintech') {
        content = "💳 **Payment Gateway**: We provide high-performance checkout widgets accepting UPI, cards, and wallets with next-day T+1 settlements. I can immediately put you in touch with our billing team to activate your merchant account!";
      } else if (firstMatch === 'banking') {
        content = "🏦 **Banking & AEPS**: We offer a complete retail banking stack (AEPS cash-out, BBPS utility bill payments, recharges, and money transfers). I can connect you to our CSP onboarding desk to get you set up!";
      } else if (firstMatch === 'travel') {
        content = "✈️ **Travel APIs**: We integrate 500+ airlines, 1M+ hotels, buses, and trains (IRCTC) into your portal, or build you a white-label booking engine. I can have a travel expert call you to discuss details!";
      } else if (firstMatch === 'it') {
        content = "🛠️ **Custom Software**: We design and deploy custom React web portals, Flutter apps, secure APIs, and cloud infrastructure with a 6-week average delivery. I'd love to connect you with our lead architect to scope your project!";
      } else {
        content = "We offer premium payment gateways, retail banking platforms (AEPS/BBPS), unified travel solutions, and custom IT software. I can immediately request a callback from our support desk!";
      }

      content += "\n\nWould you like me to request a callback from our customer care desk to discuss this?";

      return {
        content,
        chips: ['📞 Request Callback', '📊 See Memory Graph', '💳 Payment Gateway', '✈️ Travel APIs'],
        detected: detectedLabels,
      };
    }

    // Unknown intent — guide with suggestions
    return {
      content: "I'd love to assist you! We offer RBI-compliant payment gateways, retail agent banking setups (AEPS/BBPS), travel booking portals, and custom IT software. Shall I request a callback from our care desk to discuss your needs?",
      chips: ['💳 Payment Gateway', '🏦 Banking & AEPS', '✈️ Travel APIs', '🛠️ Custom Software', '📞 Request Callback'],
      detected: null,
    };
  };

  const handleSend = (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    if (!textToSend) setInput('');

    // Handle graph shortcut chip
    if (text === '📊 See Memory Graph') {
      setActiveTab('graph');
      setMessages(prev => [...prev, { role: 'user', content: text }]);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'bot',
          content: 'Switched to your **Requirements Graph** — you can see every service you\'ve explored mapped as interconnected nodes. Click any node to inspect details.',
          chips: ['💳 Payment Gateway', '✈️ Travel APIs', '📞 Request Callback'],
          detected: null,
        }]);
      }, 400);
      return;
    }

    // Handle callback / care desk chips
    if (text === '📞 Request Callback' || text === '📞 Connect to Care') {
      setMessages(prev => [...prev, { role: 'user', content: text }]);
      setTimeout(() => {
        triggerLeadForm();
        setMessages(prev => [...prev, {
          role: 'bot',
          content: '📋 Opening the callback request form — please submit your contact info and our care team will call or email you within 2 business hours!',
          chips: null,
          detected: null,
        }]);
      }, 400);
      return;
    }

    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setLoading(true);

    setTimeout(() => {
      const reply = buildBotReply(text);
      setMessages(prev => [...prev, { role: 'bot', ...reply }]);
      setLoading(false);
    }, 900);
  };

  const triggerLeadForm = () => {
    const needed = nodes.filter(n => n.type === 'service').map(n => n.label);
    const summary = needed.length > 0 
      ? `Interest in: ${needed.join(', ')}.` 
      : `General interest.`;
    
    setLeadForm(prev => ({
      ...prev,
      message: `Enquiry via BillsPay AI Advisor Widget.\nRequirements Map: ${summary}\n`
    }));
    setShowLeadForm(true);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setLeadStatus({ success: false, error: null, loading: true });

    if (!leadForm.firstName.trim() || !leadForm.email.trim() || !leadForm.phone.trim()) {
      setLeadStatus({ success: false, error: 'Please fill in required fields.', loading: false });
      return;
    }

    const payload = {
      name: `${leadForm.firstName} ${leadForm.lastName}`.trim(),
      email: leadForm.email,
      subject: 'AI Advisor Lead Capture',
      message: `Phone: ${leadForm.phone}\n\n${leadForm.message}`
    };

    try {
      await axios.post(`${backendUrl || ''}/api/contact`, payload);
      setLeadStatus({ success: true, error: null, loading: false });
      setTimeout(() => {
        setShowLeadForm(false);
        setLeadStatus({ success: false, error: null, loading: false });
        setMessages(prev => [...prev, { role: 'bot', content: '✓ Callback request received! Our sales representative will contact you shortly.' }]);
      }, 1500);
    } catch (err) {
      setLeadStatus({ success: false, error: 'Failed to submit callback request.', loading: false });
    }
  };

  // Node position layout coords
  const getNodeCoords = (id) => {
    const coords = {
      client: { x: 170, y: 220 },
      billspay: { x: 170, y: 60 },
      fintech: { x: 50, y: 130 },
      banking: { x: 290, y: 130 },
      travel: { x: 50, y: 290 },
      it: { x: 290, y: 290 }
    };
    return coords[id] || { x: 170, y: 150 };
  };

  return (
    <div style={{ position: 'fixed', bottom: isOpen ? '84px' : '148px', right: '20px', zIndex: 99999, fontFamily: 'var(--font-mono)' }}>
      {/* ─── Auto-greeting Tooltip speech bubble ─── */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            onClick={() => {
              onToggle(true);
              setShowBubble(false);
            }}
            style={{
              position: 'absolute',
              bottom: '72px',
              right: '0px',
              width: '260px',
              padding: '12px 16px',
              background: 'linear-gradient(135deg, rgba(18, 24, 54, 0.98) 0%, rgba(10, 15, 38, 0.96) 100%)',
              backdropFilter: 'blur(15px)',
              border: '1.5px solid rgba(94, 92, 230, 0.35)',
              borderRadius: '16px 16px 4px 16px',
              boxShadow: '0 12px 36px rgba(10, 15, 38, 0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
              cursor: 'pointer',
              color: '#ffffff',
              fontSize: '11px',
              lineHeight: '1.45',
              zIndex: 999999
            }}
            whileHover={{ y: -2 }}
          >
            <div style={{ fontWeight: 800, color: 'var(--accent-periwinkle)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 6px #22C55E' }} />
              BillsPay Care Desk
            </div>
            <div>👋 Hi! How can I assist you today? Click here to explore our services & contact care.</div>
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              right: '22px',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid rgba(10, 15, 38, 0.98)'
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Floating Button ─── */}
      <motion.button
        onClick={() => {
          onToggle(!isOpen);
          setShowBubble(false);
        }}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-periwinkle) 0%, #4D3CE6 100%)',
          border: 'none',
          boxShadow: '0 8px 30px rgba(94, 92, 230, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          position: 'relative'
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        {isOpen ? (
          <span style={{ fontSize: '20px', fontWeight: 800 }}>✕</span>
        ) : (
          <Brain className="w-6 h-6 text-white animate-pulse" />
        )}
        <span 
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#2DB84B',
            border: '2px solid #fff',
            boxShadow: '0 0 8px #2DB84B'
          }}
        />
      </motion.button>

      {/* ─── Chat Drawer Panel ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 350, damping: 24 }}
            style={{
              position: 'fixed',
              bottom: '152px',
              right: '20px',
              width: '310px',
              height: '420px',
              background: 'linear-gradient(135deg, rgba(10, 15, 38, 0.97) 0%, rgba(18, 24, 54, 0.95) 100%)',
              backdropFilter: 'blur(25px)',
              border: '1.5px solid rgba(94, 92, 230, 0.25)',
              borderRadius: '20px',
              boxShadow: '0 12px 40px rgba(10, 15, 38, 0.6), inset 0 1px 1px rgba(255,255,255,0.05)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 999999
            }}
          >
            {/* Header info */}
            <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255, 0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-periwinkle) 0%, #4D3CE6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                    👩‍💼
                  </div>
                  <span style={{ position: 'absolute', bottom: 0, right: 0, width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E', border: '1.5px solid #000' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#ffffff', letterSpacing: '0.3px' }}>Aria (BillsPay Advisor)</span>
                  <span style={{ fontSize: '8px', color: '#22C55E', fontWeight: 600 }}>Active · On Desk</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => setActiveTab('chat')}
                  style={{
                    padding: '4px 8px',
                    fontSize: '8px',
                    borderRadius: '4px',
                    background: activeTab === 'chat' ? 'var(--accent-periwinkle)' : 'rgba(255,255,255,0.04)',
                    color: activeTab === 'chat' ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    border: 'none',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  CHAT
                </button>
                <button
                  onClick={() => setActiveTab('graph')}
                  style={{
                    padding: '4px 8px',
                    fontSize: '8px',
                    borderRadius: '4px',
                    background: activeTab === 'graph' ? 'var(--accent-periwinkle)' : 'rgba(255,255,255,0.04)',
                    color: activeTab === 'graph' ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    border: 'none',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  GRAPH
                </button>
              </div>
            </div>

            {/* Content Switcher */}
            {activeTab === 'chat' ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Messages Panel */}
                <div style={{ flex: 1, padding: '12px 14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {messages.map((msg, idx) => {
                    const isBot = msg.role === 'bot';
                    return (
                      <div key={idx} style={{ display: 'flex', justifyContent: isBot ? 'flex-start' : 'flex-end', gap: '8px' }}>
                        {isBot && (
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(94, 92, 230, 0.15)', border: '1px solid rgba(94, 92, 230, 0.25)', display: 'flex', alignItems: 'center', shrink: 0, justifyContent: 'center' }}>
                            <Bot className="w-3.5 h-3.5 text-accent-periwinkle" />
                          </div>
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '80%' }}>
                          <div style={{
                            padding: '12px 14px',
                            borderRadius: '12px',
                            background: isBot ? 'rgba(255,255,255,0.03)' : 'var(--accent-periwinkle)',
                            border: isBot ? '1px solid rgba(255,255,255,0.06)' : 'none',
                            color: isBot ? 'rgba(255,255,255,0.85)' : '#ffffff',
                            fontSize: '11px',
                            lineHeight: '1.5',
                            whiteSpace: 'pre-wrap'
                          }}>
                            {msg.content}
                          </div>

                          {/* AWS-style quick-reply chips */}
                          {isBot && msg.chips && msg.chips.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                              {msg.chips.map((chip, ci) => (
                                <button
                                  key={ci}
                                  onClick={() => handleSend(chip)}
                                  style={{
                                    padding: '5px 11px',
                                    borderRadius: '20px',
                                    background: 'rgba(94,92,230,0.12)',
                                    border: '1px solid rgba(94,92,230,0.35)',
                                    color: 'rgba(255,255,255,0.85)',
                                    fontSize: '10px',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    transition: 'all 0.15s ease',
                                    whiteSpace: 'nowrap',
                                  }}
                                  onMouseEnter={e => { e.target.style.background = 'rgba(94,92,230,0.3)'; e.target.style.color = '#fff'; }}
                                  onMouseLeave={e => { e.target.style.background = 'rgba(94,92,230,0.12)'; e.target.style.color = 'rgba(255,255,255,0.85)'; }}
                                >
                                  {chip}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {loading && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '8px' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(94, 92, 230, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Bot className="w-3.5 h-3.5 text-accent-periwinkle animate-pulse" />
                      </div>
                      <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', gap: '4px' }}>
                        <span className="w-1 h-1 bg-accent-periwinkle animate-bounce" />
                        <span className="w-1 h-1 bg-accent-periwinkle animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 h-1 bg-accent-periwinkle animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Lead Form Overlay inside chat area */}
                {showLeadForm && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(10, 15, 38, 0.95)',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '10px',
                    zIndex: 10
                  }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff' }}>🤝 CONNECT TO CUSTOMER CARE</span>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>Submit your contact info for an instant callback.</span>
                    {leadStatus.error && <span style={{ fontSize: '9px', color: '#ff4d4d' }}>{leadStatus.error}</span>}
                    
                    <input type="text" placeholder="First Name *" value={leadForm.firstName} onChange={e => setLeadForm({...leadForm, firstName: e.target.value})} style={{ padding: '8px', fontSize: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', outline: 'none' }} />
                    <input type="text" placeholder="Last Name" value={leadForm.lastName} onChange={e => setLeadForm({...leadForm, lastName: e.target.value})} style={{ padding: '8px', fontSize: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', outline: 'none' }} />
                    <input type="email" placeholder="Email *" value={leadForm.email} onChange={e => setLeadForm({...leadForm, email: e.target.value})} style={{ padding: '8px', fontSize: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', outline: 'none' }} />
                    <input type="text" placeholder="Phone Number *" value={leadForm.phone} onChange={e => setLeadForm({...leadForm, phone: e.target.value})} style={{ padding: '8px', fontSize: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', outline: 'none' }} />
                    
                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                      <button type="button" onClick={() => setShowLeadForm(false)} style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}>Cancel</button>
                      <button type="button" onClick={handleLeadSubmit} disabled={leadStatus.loading} style={{ flex: 1, padding: '10px', background: 'var(--accent-periwinkle)', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '10px', cursor: 'pointer', fontWeight: 800 }}>
                        {leadStatus.loading ? 'SUBMITTING...' : 'SUBMIT REQUEST'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Input Textbox */}
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  style={{ padding: '10px 14px', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)', display: 'flex', gap: '6px' }}
                >
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Describe your business needs..."
                    style={{
                      flex: 1,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '11px',
                      color: '#ffffff',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    style={{
                      padding: '8px 12px',
                      background: 'var(--accent-periwinkle)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
                  </button>
                </form>
              </div>
            ) : (
              /* Graph Visualizer Panel */
              <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#ffffff' }}>COGNITIVE REQUIREMENTS MEMORY</span>
                  <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Extracts your business ontology</span>
                </div>

                <div style={{ flex: 1, position: 'relative', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '12px', background: 'rgba(0,0,0,0.15)', overflow: 'hidden', margin: '4px 0' }}>
                  <svg viewBox="0 0 340 340" style={{ width: '100%', height: '100%' }}>
                    {/* Draw Edges */}
                    {edges.map((edge, idx) => {
                      const src = getNodeCoords(edge.source);
                      const tgt = getNodeCoords(edge.target);
                      return (
                        <g key={`edge-${idx}`}>
                          <line x1={src.x} y1={src.y} x2={tgt.x} y2={tgt.y} stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                          <text
                            x={(src.x + tgt.x) / 2}
                            y={(src.y + tgt.y) / 2 - 3}
                            fill="rgba(255,255,255,0.25)"
                            fontSize="6"
                            textAnchor="middle"
                          >
                            {edge.label}
                          </text>
                        </g>
                      );
                    })}

                    {/* Draw Nodes */}
                    {nodes.map((node) => {
                      const pos = getNodeCoords(node.id);
                      const isSelected = selectedNode?.id === node.id;
                      const color = node.type === 'client' ? '#10B981' : node.type === 'platform' ? 'var(--accent-periwinkle)' : (node.color || '#3B82F6');
                      return (
                        <g key={node.id} onClick={() => setSelectedNode(node)} style={{ cursor: 'pointer' }}>
                          {isSelected && (
                            <circle cx={pos.x} cy={pos.y} r="16" fill="none" stroke={color} strokeWidth="1.5" className="animate-ping" style={{ animationDuration: '2.5s' }} />
                          )}
                          <circle cx={pos.x} cy={pos.y} r="12" fill={color} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                          <text x={pos.x} y={pos.y + 3} fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                            {node.label.charAt(0)}
                          </text>
                          <text x={pos.x} y={pos.y + 22} fill={isSelected ? '#ffffff' : 'rgba(255,255,255,0.5)'} fontSize="8" textAnchor="middle">
                            {node.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Mini Memory Inspector */}
                <div style={{
                  padding: '10px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '10px',
                  height: '70px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  overflowY: 'auto'
                }}>
                  {selectedNode ? (
                    <>
                      <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Memory Node Details</span>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#ffffff' }}>{selectedNode.label}</span>
                      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>{selectedNode.desc}</span>
                    </>
                  ) : (
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', margin: 'auto', textAlign: 'center' }}>Click a node in the Requirements Graph to inspect details</span>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
