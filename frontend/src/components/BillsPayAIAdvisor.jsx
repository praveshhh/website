import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Bot, Send, Phone, Mail, MessageCircle } from 'lucide-react';
import axios from 'axios';

import { ask, buildGraph } from '../knowledge/ariaEngine';
import { COMPANY, CHIPS } from '../knowledge/billspayKnowledge';

const STORAGE_KEY = 'billspay_aria_session_v2';
const GRAPH_VIEW = 340;

// Chips that trigger an action instead of a knowledge lookup.
const ACTION_CHIPS = {
  '📞 Request Callback': 'lead',
  '💬 WhatsApp Us': 'whatsapp',
  '📧 Email Us': 'email',
  '📊 See Memory Graph': 'graph',
};

const OPENING_MESSAGE = {
  role: 'bot',
  content:
    `👋 Hi, I'm **Aria** — your ${COMPANY.brand} advisor.\n\n` +
    `I can tell you anything about our company: payments, banking services, travel APIs, custom software, pricing, compliance — or just put you in touch with our team.\n\n` +
    `What would you like to know?`,
  chips: CHIPS.main,
};

/**
 * Renders the light markdown the knowledge base uses: **bold** plus newlines.
 * The previous version dumped the raw string into the DOM, so visitors saw
 * literal asterisks around every emphasised phrase.
 */
function RichText({ text }) {
  const lines = String(text || '').split('\n');
  return (
    <>
      {lines.map((line, li) => (
        <React.Fragment key={li}>
          {line.split(/(\*\*[^*]+\*\*)/g).map((part, pi) =>
            part.startsWith('**') && part.endsWith('**') && part.length > 4 ? (
              <strong key={pi} style={{ color: '#ffffff', fontWeight: 800 }}>
                {part.slice(2, -2)}
              </strong>
            ) : (
              <React.Fragment key={pi}>{part}</React.Fragment>
            )
          )}
          {li < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
}

export default function BillsPayAIAdvisor({ backendUrl, isOpen, onToggle, isChatOpen }) {
  // Restore a prior session so navigating the SPA doesn't wipe the conversation.
  const restored = useMemo(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && Array.isArray(parsed.messages) && parsed.messages.length ? parsed : null;
    } catch {
      return null;
    }
  }, []);

  const [showBubble, setShowBubble] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState(() => restored?.messages || [OPENING_MESSAGE]);
  const [memory, setMemory] = useState(() => restored?.memory || { discussedTopics: [], turnCount: 0 });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const [leadStatus, setLeadStatus] = useState({ success: false, error: null, loading: false });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const replyTimer = useRef(null);

  const graph = useMemo(() => buildGraph(memory.discussedTopics || [], GRAPH_VIEW), [memory.discussedTopics]);

  // ── Effects ───────────────────────────────────────────────────────────────

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 60);
      return () => clearTimeout(t);
    }
  }, [messages, loading, isOpen, activeTab]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, memory }));
    } catch {
      // Private-mode storage failures must never break the widget.
    }
  }, [messages, memory]);

  // One-time greeting bubble.
  useEffect(() => {
    if (sessionStorage.getItem('billspay_chatbot_greeted')) return;
    const openTimer = setTimeout(() => {
      setShowBubble(true);
      sessionStorage.setItem('billspay_chatbot_greeted', 'true');
    }, 1500);
    const closeTimer = setTimeout(() => setShowBubble(false), 9500);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  // Escape closes the panel (or the lead form on top of it) — expected of any
  // dialog, and previously the widget trapped you until you found the ✕.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (showLeadForm) setShowLeadForm(false);
      else onToggle(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, showLeadForm, onToggle]);

  useEffect(() => {
    if (isOpen && activeTab === 'chat' && !showLeadForm) {
      const t = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [isOpen, activeTab, showLeadForm]);

  // A pending reply must not land after unmount.
  useEffect(() => () => clearTimeout(replyTimer.current), []);

  // ── Actions ───────────────────────────────────────────────────────────────

  const openLeadForm = useCallback(
    (topicsForContext) => {
      const list = (topicsForContext || []).join(', ');
      setLeadForm((prev) => ({
        ...prev,
        message:
          `Enquiry via the Aria advisor widget on the website.\n` +
          (list ? `Topics discussed: ${list}\n` : 'No specific topic discussed yet.\n'),
      }));
      setLeadStatus({ success: false, error: null, loading: false });
      setShowLeadForm(true);
    },
    []
  );

  const pushBot = useCallback((payload) => {
    setMessages((prev) => [...prev, { role: 'bot', ...payload }]);
  }, []);

  const handleSend = useCallback(
    (textToSend) => {
      const text = String(textToSend ?? input).trim();
      if (!text || loading) return;
      if (textToSend === undefined) setInput('');

      setMessages((prev) => [...prev, { role: 'user', content: text }]);

      // Action chips short-circuit the knowledge engine.
      const action = ACTION_CHIPS[text];
      if (action === 'graph') {
        setActiveTab('graph');
        pushBot({
          content:
            "Here's your **requirements map** — every service you've asked about, connected to how we deliver it. Tap any node to inspect it.",
          chips: CHIPS.main.slice(0, 3),
        });
        return;
      }
      if (action === 'whatsapp') {
        window.open(
          `${COMPANY.whatsapp}?text=${encodeURIComponent(`Hi ${COMPANY.brand}! I was chatting with Aria on your website and would like to know more.`)}`,
          '_blank',
          'noopener'
        );
        pushBot({ content: `Opening WhatsApp to **${COMPANY.phone}** — our team replies ${COMPANY.responseTime}.` });
        return;
      }
      if (action === 'email') {
        window.open(
          `mailto:${COMPANY.email}?subject=${encodeURIComponent('Enquiry from the website')}`,
          '_blank',
          'noopener'
        );
        pushBot({ content: `Opening your email client for **${COMPANY.email}**. We reply ${COMPANY.responseTime}.` });
        return;
      }
      if (action === 'lead') {
        openLeadForm(memory.discussedTitles);
        pushBot({
          content: `Sure — leave your details and our team will call you back ${COMPANY.responseTime}.`,
        });
        return;
      }

      // Knowledge lookup. The small delay is purely cosmetic: an instant answer
      // reads as canned, and the typing indicator sets the right expectation.
      setLoading(true);
      const result = ask(text, memory);
      replyTimer.current = setTimeout(() => {
        pushBot({
          content: result.answer,
          bullets: result.bullets,
          chips: result.chips,
          thinking: result.thinkingPath,
        });
        setLoading(false);

        setMemory((prev) => {
          const discussedTopics = result.topicId
            ? Array.from(new Set([...(prev.discussedTopics || []), result.topicId]))
            : prev.discussedTopics || [];
          const discussedTitles = result.title
            ? Array.from(new Set([...(prev.discussedTitles || []), result.title]))
            : prev.discussedTitles || [];
          return {
            ...prev,
            lastTopicId: result.topicId || prev.lastTopicId,
            lastPillar: result.pillars?.[0] || prev.lastPillar,
            discussedTopics,
            discussedTitles,
            turnCount: (prev.turnCount || 0) + 1,
            offeredCallback: /callback|call you back|get a human|reach out/i.test(result.answer),
          };
        });

        if (result.action === 'lead') {
          setTimeout(() => openLeadForm(result.title ? [result.title] : memory.discussedTitles), 500);
        }
      }, 550);
    },
    [input, loading, memory, openLeadForm, pushBot]
  );

  const handleLeadSubmit = async (e) => {
    if (e) e.preventDefault();
    if (leadStatus.loading) return;

    if (!leadForm.firstName.trim() || !leadForm.email.trim() || !leadForm.phone.trim()) {
      setLeadStatus({ success: false, error: 'Please fill in name, email and phone.', loading: false });
      return;
    }

    setLeadStatus({ success: false, error: null, loading: true });
    const payload = {
      name: `${leadForm.firstName} ${leadForm.lastName}`.trim(),
      email: leadForm.email.trim(),
      subject: 'Aria advisor — callback request',
      message: `Phone: ${leadForm.phone.trim()}\n\n${leadForm.message}`,
    };

    try {
      await axios.post(`${backendUrl || ''}/api/contact`, payload);
      setLeadStatus({ success: true, error: null, loading: false });
      setTimeout(() => {
        setShowLeadForm(false);
        setLeadStatus({ success: false, error: null, loading: false });
        pushBot({
          content: `✅ Got it — our team will contact you ${COMPANY.responseTime}.\n\nIf it's urgent, WhatsApp us on **${COMPANY.phone}**.`,
          chips: ['💬 WhatsApp Us', '💰 Pricing', '🏢 About Us'],
        });
      }, 1400);
    } catch {
      setLeadStatus({
        success: false,
        error: `Couldn't submit — please WhatsApp us on ${COMPANY.phone}.`,
        loading: false,
      });
    }
  };

  const resetConversation = () => {
    clearTimeout(replyTimer.current);
    setMessages([OPENING_MESSAGE]);
    setMemory({ discussedTopics: [], turnCount: 0 });
    setSelectedNode(null);
    setLoading(false);
    setActiveTab('chat');
  };

  // The advisor yields to the live-support widget when that one is open. This
  // check must come after every hook — returning early above them changes the
  // hook count between renders, which is exactly what React forbids.
  if (isChatOpen) return null;

  const nodeById = (id) => graph.nodes.find((n) => n.id === id);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: isOpen ? '84px' : '148px',
        right: '20px',
        zIndex: 99999,
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* ─── Greeting bubble ─── */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.button
            initial={{ opacity: 0, y: 15, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            onClick={() => {
              onToggle(true);
              setShowBubble(false);
            }}
            aria-label="Open the Aria advisor"
            style={{
              position: 'absolute',
              bottom: '72px',
              right: 0,
              width: '260px',
              padding: '12px 16px',
              textAlign: 'left',
              background: 'linear-gradient(135deg, rgba(18, 24, 54, 0.98) 0%, rgba(10, 15, 38, 0.96) 100%)',
              backdropFilter: 'blur(15px)',
              border: '1.5px solid rgba(94, 92, 230, 0.35)',
              borderRadius: '16px 16px 4px 16px',
              boxShadow: '0 12px 36px rgba(10, 15, 38, 0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
              cursor: 'pointer',
              color: '#ffffff',
              fontSize: '11px',
              lineHeight: 1.45,
              fontFamily: 'inherit',
            }}
            whileHover={{ y: -2 }}
          >
            <div
              style={{
                fontWeight: 800,
                color: 'var(--accent-periwinkle)',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#22C55E',
                  boxShadow: '0 0 6px #22C55E',
                }}
              />
              Aria · BillsPay Advisor
            </div>
            <div>👋 Hi! Ask me anything about our payments, banking, travel or software services.</div>
            <span
              style={{
                position: 'absolute',
                bottom: '-6px',
                right: '22px',
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid rgba(10, 15, 38, 0.98)',
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Launcher ─── */}
      <motion.button
        onClick={() => {
          onToggle(!isOpen);
          setShowBubble(false);
        }}
        aria-label={isOpen ? 'Close the Aria advisor' : 'Open the Aria advisor'}
        aria-expanded={isOpen}
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
          position: 'relative',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        {isOpen ? <span style={{ fontSize: '20px', fontWeight: 800 }}>✕</span> : <Brain className="w-6 h-6 text-white animate-pulse" />}
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
            boxShadow: '0 0 8px #2DB84B',
          }}
        />
      </motion.button>

      {/* ─── Panel ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Aria — BillsPay24X7 advisor"
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 350, damping: 24 }}
            style={{
              position: 'fixed',
              bottom: '152px',
              right: '20px',
              // Grow on desktop, but never overflow a phone screen.
              width: 'min(360px, calc(100vw - 40px))',
              height: 'min(520px, calc(100vh - 200px))',
              background: 'linear-gradient(135deg, rgba(10, 15, 38, 0.97) 0%, rgba(18, 24, 54, 0.95) 100%)',
              backdropFilter: 'blur(25px)',
              border: '1.5px solid rgba(94, 92, 230, 0.25)',
              borderRadius: '20px',
              boxShadow: '0 12px 40px rgba(10, 15, 38, 0.6), inset 0 1px 1px rgba(255,255,255,0.05)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 999999,
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '12px 14px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.02)',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--accent-periwinkle) 0%, #4D3CE6 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '15px',
                    }}
                  >
                    👩‍💼
                  </div>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#22C55E',
                      border: '1.5px solid #0A0F26',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#fff', letterSpacing: '0.3px' }}>
                    Aria · BillsPay Advisor
                  </span>
                  <span style={{ fontSize: '8.5px', color: '#22C55E', fontWeight: 600 }}>Online · Replies instantly</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
                {[
                  ['chat', 'CHAT'],
                  ['graph', 'MAP'],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    aria-pressed={activeTab === key}
                    style={{
                      padding: '4px 8px',
                      fontSize: '8.5px',
                      borderRadius: '5px',
                      background: activeTab === key ? 'var(--accent-periwinkle)' : 'rgba(255,255,255,0.04)',
                      color: activeTab === key ? '#fff' : 'rgba(255,255,255,0.5)',
                      border: 'none',
                      fontWeight: 800,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={resetConversation}
                  title="Start over"
                  aria-label="Start a new conversation"
                  style={{
                    padding: '4px 7px',
                    fontSize: '9px',
                    borderRadius: '5px',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.5)',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  ↻
                </button>
              </div>
            </div>

            {/* Quick contact strip — the shortest path from curiosity to a lead. */}
            <div
              style={{
                display: 'flex',
                gap: '6px',
                padding: '8px 14px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                flexShrink: 0,
              }}
            >
              {[
                { icon: <Phone size={11} />, label: 'Call', href: `tel:${COMPANY.phoneRaw}` },
                { icon: <MessageCircle size={11} />, label: 'WhatsApp', href: COMPANY.whatsapp },
                { icon: <Mail size={11} />, label: 'Email', href: `mailto:${COMPANY.email}` },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    padding: '6px',
                    borderRadius: '7px',
                    background: 'rgba(94,92,230,0.10)',
                    border: '1px solid rgba(94,92,230,0.25)',
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '9.5px',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  {item.icon}
                  {item.label}
                </a>
              ))}
            </div>

            {/* Body */}
            {activeTab === 'chat' ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
                <div
                  style={{
                    flex: 1,
                    padding: '12px 14px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  {messages.map((msg, idx) => {
                    const isBot = msg.role === 'bot';
                    return (
                      <div key={idx} style={{ display: 'flex', justifyContent: isBot ? 'flex-start' : 'flex-end', gap: '8px' }}>
                        {isBot && (
                          <div
                            style={{
                              width: '24px',
                              height: '24px',
                              flexShrink: 0,
                              borderRadius: '50%',
                              background: 'rgba(94, 92, 230, 0.15)',
                              border: '1px solid rgba(94, 92, 230, 0.25)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Bot className="w-3.5 h-3.5 text-accent-periwinkle" />
                          </div>
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '82%' }}>
                          <div
                            style={{
                              padding: '11px 13px',
                              borderRadius: '12px',
                              background: isBot ? 'rgba(255,255,255,0.04)' : 'var(--accent-periwinkle)',
                              border: isBot ? '1px solid rgba(255,255,255,0.07)' : 'none',
                              color: isBot ? 'rgba(255,255,255,0.87)' : '#fff',
                              fontSize: '11.5px',
                              lineHeight: 1.55,
                              wordBreak: 'break-word',
                            }}
                          >
                            <RichText text={msg.content} />

                            {isBot && msg.bullets?.length > 0 && (
                              <div
                                style={{
                                  marginTop: '10px',
                                  paddingTop: '9px',
                                  borderTop: '1px solid rgba(255,255,255,0.08)',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '6px',
                                }}
                              >
                                {msg.bullets.map((b, bi) => (
                                  <div key={bi} style={{ fontSize: '11px', lineHeight: 1.5, color: 'rgba(255,255,255,0.78)' }}>
                                    <RichText text={b} />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {isBot && msg.chips?.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '5px' }}>
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
                                    fontFamily: 'inherit',
                                    transition: 'all 0.15s ease',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(94,92,230,0.3)';
                                    e.currentTarget.style.color = '#fff';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(94,92,230,0.12)';
                                    e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                                  }}
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
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: 'rgba(94, 92, 230, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Bot className="w-3.5 h-3.5 text-accent-periwinkle animate-pulse" />
                      </div>
                      <div
                        style={{
                          padding: '11px 14px',
                          background: 'rgba(255,255,255,0.04)',
                          borderRadius: '12px',
                          display: 'flex',
                          gap: '4px',
                          alignItems: 'center',
                        }}
                      >
                        {[0, 150, 300].map((delay) => (
                          <span
                            key={delay}
                            style={{
                              width: '5px',
                              height: '5px',
                              borderRadius: '50%',
                              background: 'var(--accent-periwinkle)',
                              animation: 'ariaBounce 1s ease-in-out infinite',
                              animationDelay: `${delay}ms`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Lead capture */}
                {showLeadForm && (
                  <form
                    onSubmit={handleLeadSubmit}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(10, 15, 38, 0.97)',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: '9px',
                      zIndex: 10,
                      overflowY: 'auto',
                    }}
                  >
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#fff' }}>🤝 Request a callback</span>
                    <span style={{ fontSize: '9.5px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>
                      Our team will reach out {COMPANY.responseTime}.
                    </span>

                    {leadStatus.error && <span style={{ fontSize: '9.5px', color: '#ff6b6b' }}>{leadStatus.error}</span>}
                    {leadStatus.success && <span style={{ fontSize: '9.5px', color: '#22C55E' }}>✓ Request received — talk soon!</span>}

                    {[
                      { key: 'firstName', placeholder: 'First Name *', type: 'text', autoComplete: 'given-name' },
                      { key: 'lastName', placeholder: 'Last Name', type: 'text', autoComplete: 'family-name' },
                      { key: 'email', placeholder: 'Email *', type: 'email', autoComplete: 'email' },
                      { key: 'phone', placeholder: 'Phone Number *', type: 'tel', autoComplete: 'tel' },
                    ].map((f) => (
                      <input
                        key={f.key}
                        type={f.type}
                        autoComplete={f.autoComplete}
                        placeholder={f.placeholder}
                        value={leadForm[f.key]}
                        onChange={(e) => setLeadForm({ ...leadForm, [f.key]: e.target.value })}
                        aria-label={f.placeholder.replace(' *', '')}
                        style={{
                          padding: '9px',
                          fontSize: '10.5px',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          borderRadius: '6px',
                          color: '#fff',
                          outline: 'none',
                          fontFamily: 'inherit',
                        }}
                      />
                    ))}

                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <button
                        type="button"
                        onClick={() => setShowLeadForm(false)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          background: 'rgba(255,255,255,0.06)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '10px',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={leadStatus.loading}
                        style={{
                          flex: 1,
                          padding: '10px',
                          background: 'var(--accent-periwinkle)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '10px',
                          cursor: leadStatus.loading ? 'wait' : 'pointer',
                          fontWeight: 800,
                          fontFamily: 'inherit',
                          opacity: leadStatus.loading ? 0.7 : 1,
                        }}
                      >
                        {leadStatus.loading ? 'SUBMITTING…' : 'SUBMIT'}
                      </button>
                    </div>
                  </form>
                )}

                {/* Composer */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  style={{
                    padding: '10px 14px',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(0,0,0,0.2)',
                    display: 'flex',
                    gap: '6px',
                    flexShrink: 0,
                  }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything about BillsPay24X7…"
                    aria-label="Ask Aria a question"
                    style={{
                      flex: 1,
                      minWidth: 0,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      padding: '9px 12px',
                      fontSize: '11.5px',
                      color: '#fff',
                      outline: 'none',
                      fontFamily: 'inherit',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    aria-label="Send message"
                    style={{
                      padding: '8px 12px',
                      background: 'var(--accent-periwinkle)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                      cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                      opacity: loading || !input.trim() ? 0.5 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
                  </button>
                </form>
              </div>
            ) : (
              /* ─── Requirements map ─── */
              <div
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flexShrink: 0 }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#fff' }}>YOUR REQUIREMENTS MAP</span>
                  <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                    {(memory.discussedTopics || []).length > 0
                      ? `${memory.discussedTopics.length} topic${memory.discussedTopics.length === 1 ? '' : 's'} explored`
                      : 'Ask about a service to build your map'}
                  </span>
                </div>

                <div
                  style={{
                    flex: 1,
                    minHeight: 0,
                    border: '1px dashed rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    background: 'rgba(0,0,0,0.15)',
                    overflow: 'hidden',
                  }}
                >
                  <svg viewBox={`0 0 ${GRAPH_VIEW} ${GRAPH_VIEW}`} style={{ width: '100%', height: '100%' }} role="img" aria-label="Map of the services you asked about">
                    {graph.edges.map((edge, idx) => {
                      const src = nodeById(edge.source);
                      const tgt = nodeById(edge.target);
                      if (!src || !tgt) return null;
                      return (
                        <line
                          key={`e-${idx}`}
                          x1={src.x}
                          y1={src.y}
                          x2={tgt.x}
                          y2={tgt.y}
                          stroke="rgba(255,255,255,0.13)"
                          strokeWidth="1.2"
                        />
                      );
                    })}

                    {graph.nodes.map((node) => {
                      const isSelected = selectedNode?.id === node.id;
                      const r = node.type === 'platform' ? 15 : node.type === 'pillar' ? 11 : 8;
                      // Keep labels inside the viewBox on the outer ring.
                      const anchor = node.x < GRAPH_VIEW * 0.28 ? 'start' : node.x > GRAPH_VIEW * 0.72 ? 'end' : 'middle';
                      return (
                        <g
                          key={node.id}
                          onClick={() => setSelectedNode(node)}
                          style={{ cursor: 'pointer' }}
                          role="button"
                          aria-label={node.label}
                        >
                          {isSelected && (
                            <circle cx={node.x} cy={node.y} r={r + 5} fill="none" stroke={node.color} strokeWidth="1.3" opacity="0.7" />
                          )}
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={r}
                            fill={node.color}
                            opacity={node.type === 'topic' ? 0.85 : 1}
                            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))' }}
                          />
                          <text
                            x={node.x}
                            y={node.y + r + 10}
                            fill={isSelected ? '#fff' : 'rgba(255,255,255,0.55)'}
                            fontSize="7.5"
                            fontWeight={isSelected ? 700 : 400}
                            textAnchor={anchor}
                          >
                            {node.label.length > 22 ? `${node.label.slice(0, 21)}…` : node.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div
                  style={{
                    padding: '9px 10px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    minHeight: '64px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px',
                    flexShrink: 0,
                  }}
                >
                  {selectedNode ? (
                    <>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#fff' }}>{selectedNode.label}</span>
                      <span style={{ fontSize: '9.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.45 }}>
                        {selectedNode.desc}
                      </span>
                    </>
                  ) : (
                    <span style={{ fontSize: '9.5px', color: 'rgba(255,255,255,0.4)', margin: 'auto', textAlign: 'center' }}>
                      Tap any node to see what it covers
                    </span>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Typing-dot keyframes, scoped to this widget. */}
      <style>{`
        @keyframes ariaBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.45; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
