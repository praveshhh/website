import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import AuthModal from './components/AuthModal';
import TravelPage from './components/TravelPage';
import ITPage from './components/ITPage';
import { AboutPage, PricingPage, BlogPage, PartnersPage } from './components/StaticPages';
import Modals from './components/Modals';

const pageVariants = {
  initial: { opacity: 0, rotateY: -6, x: 50, scale: 0.98 },
  animate: { opacity: 1, rotateY: 0, x: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, rotateY: 6, x: -50, scale: 0.98, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

// Backend URL selection (configurable via env, defaults to relative path in prod and localhost:8082 in dev)
const BACKEND_URL = import.meta.env.VITE_API_URL !== undefined 
  ? import.meta.env.VITE_API_URL 
  : (import.meta.env.PROD ? '' : 'http://localhost:8082');

export default function App() {
  const [user, setUser] = useState(null);
  const [masterPassword, setMasterPassword] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Global UI states
  const [activeModal, setActiveModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { text: 'Hello! Welcome to BillsPay24X7✓. How can we help you today?', isUser: false },
    { text: 'You can reach us on WhatsApp at +91 92784 03522', isUser: false }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Restore user session token on load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      } catch (e) {
        localStorage.removeItem('user');
      }
    }

    // Force light mode on load
    document.documentElement.removeAttribute('data-theme');

    // Global loading screen simulator
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleAuthSuccess = (userData, derivedMasterPassword) => {
    setUser(userData);
    setMasterPassword(derivedMasterPassword);
    localStorage.setItem('user', JSON.stringify(userData));
    setActiveTab('dashboard'); // Redirect to dashboard on success
  };

  const handleLogout = () => {
    setUser(null);
    setMasterPassword('');
    localStorage.removeItem('user');
    setActiveTab('home');
  };

  const handleNavigate = (tab) => {
    if (tab === 'dashboard' && !user) {
      setIsAuthOpen(true);
      return;
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const handleSendChat = (e) => {
    if (e && e.key !== 'Enter') return;
    const msg = chatInput.trim();
    if (!msg) return;

    setChatMessages(prev => [...prev, { text: msg, isUser: true }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        text: 'Thank you for your message! Our team will respond shortly. For urgent queries, please WhatsApp us at +91 92784 03522.',
        isUser: false
      }]);
    }, 1000);
  };

  // Close modals with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', color: 'var(--text-primary)' }}>
      {/* 1. Global Loading Screen */}
      {loading && (
        <div id="loader" style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          background: 'linear-gradient(135deg, #1B2A6B 0%, #243080 40%, #2DB84B 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>
            BillsPay<span style={{ color: '#5DCB6A' }}>24X7</span>✓
          </div>
          <div style={{ width: '180px', height: '3px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', marginTop: '20px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '100%', background: '#5DCB6A', animation: 'loadfill 1.5s ease-in-out infinite' }}></div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '12px', letterSpacing: '2px' }}>SMART PAYMENTS. SECURE GROWTH.</div>
        </div>
      )}

      {/* Main app frame */}
      <div className="app-frame" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Floating Navbar */}
        <Navbar 
          user={user} 
          activeTab={activeTab}
          onOpenAuth={() => setIsAuthOpen(true)} 
          onLogout={handleLogout}
          onNavigate={handleNavigate}
          onOpenModal={setActiveModal}
        />

        {/* Multi-page Routing render */}
        <div style={{ flex: 1, perspective: 1200, overflowX: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ width: '100%' }}
            >
              {activeTab === 'home' && (
                <Hero 
                  onOpenAuth={() => setIsAuthOpen(true)} 
                  backendUrl={BACKEND_URL}
                  onOpenModal={setActiveModal}
                />
              )}

              {activeTab === 'travel' && (
                <TravelPage onOpenModal={setActiveModal} />
              )}

              {activeTab === 'it' && (
                <ITPage onOpenModal={setActiveModal} />
              )}

              {activeTab === 'about' && (
                <AboutPage />
              )}

              {activeTab === 'pricing' && (
                <PricingPage />
              )}

              {activeTab === 'blog' && (
                <BlogPage />
              )}

              {activeTab === 'partners' && (
                <PartnersPage />
              )}

              {activeTab === 'dashboard' && (
                <Dashboard 
                  user={user} 
                  masterPassword={masterPassword} 
                  backendUrl={BACKEND_URL}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Footer (shows on marketing pages only) */}
        {activeTab !== 'dashboard' && (
          <footer style={{
            background: 'var(--navy-deep)',
            color: '#fff',
            borderTop: '1px solid var(--border-primary)',
            padding: '60px 8% 24px',
            fontSize: '13px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '40px',
              maxWidth: '1200px',
              margin: '0 auto 40px'
            }} className="grid-responsive-process">
              <div>
                <img src="/logo.svg" alt="BillsPay24X7" style={{ height: '40px', width: 'auto', marginBottom: '16px' }} />
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', marginBottom: '16px' }}>
                  BILLSPAY TECHNOLOGIES PRIVATE LIMITED · CIN: U63999UP2026PTC245490 · India's complete fintech, IT software & travel platform.
                </p>
                <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.06)', padding: '4px 12px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}>CIN: U63999UP2026PTC245490</span>
              </div>
              <div>
                <h4 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>Services</h4>
                <a onClick={() => handleNavigate('home')} style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', cursor: 'pointer' }}>Payments & Fintech</a>
                <a onClick={() => handleNavigate('travel')} style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', cursor: 'pointer' }}>Travel Booking Portal</a>
                <a onClick={() => handleNavigate('it')} style={{ display: 'block', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>IT Software Services</a>
              </div>
              <div>
                <h4 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>Company</h4>
                <a onClick={() => handleNavigate('about')} style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', cursor: 'pointer' }}>About Us</a>
                <a onClick={() => handleNavigate('pricing')} style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', cursor: 'pointer' }}>Pricing Plans</a>
                <a onClick={() => setActiveModal('careers')} style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', cursor: 'pointer' }}>Careers</a>
                <a onClick={() => handleNavigate('blog')} style={{ display: 'block', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Blog Insights</a>
              </div>
              <div>
                <h4 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>Legals</h4>
                <a onClick={() => setActiveModal('terms')} style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', cursor: 'pointer' }}>Terms of Service</a>
                <a onClick={() => setActiveModal('privacy')} style={{ display: 'block', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', cursor: 'pointer' }}>Privacy Policy</a>
                <a onClick={() => setActiveModal('refund')} style={{ display: 'block', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Refund Policy</a>
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'between', flexWrap: 'wrap', gap: '10px' }}>
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>© 2026 BillsPay Technologies Private Limited. All rights reserved.</p>
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>Head Office: Lucknow Chowk, Lucknow, UP 226003</p>
            </div>
          </footer>
        )}
      </div>


      {/* 3. Global Live Chat Support Bot */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)} 
        style={{
          position: 'fixed',
          bottom: '84px',
          right: '24px',
          zIndex: 997,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: '#2DB84B',
          color: '#fff',
          border: 'none',
          boxShadow: '0 8px 32px rgba(45,184,75,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          cursor: 'pointer'
        }}
        aria-label="Open chat support"
      >
        💬
      </button>

      {isChatOpen && (
        <div style={{
          position: 'fixed',
          bottom: '144px',
          right: '24px',
          zIndex: 998,
          width: '320px',
          background: 'var(--white)',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--border-primary)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          color: 'var(--text-primary)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1B2A6B 0%, #2DB84B 100%)',
            color: '#fff',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'between'
          }}>
            <h4 style={{ fontWeight: 800, margin: 0 }}>💬 BillsPay24X7 Support</h4>
            <button onClick={() => setIsChatOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
          </div>
          <div style={{ padding: '14px', height: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {chatMessages.map((msg, idx) => (
              <div key={idx} style={{
                background: msg.isUser ? '#1B2A6B' : 'var(--surf-2)',
                color: msg.isUser ? '#fff' : 'var(--text-primary)',
                padding: '10px 14px',
                borderRadius: '12px',
                alignSelf: msg.isUser ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                fontSize: '12px',
                lineHeight: '1.5'
              }}>
                {msg.text}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', padding: '10px', borderTop: '1px solid var(--border-primary)', gap: '8px' }}>
            <input 
              type="text" 
              value={chatInput} 
              onChange={(e) => setChatInput(e.target.value)} 
              onKeyDown={handleSendChat}
              placeholder="Type a message..." 
              style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--border-primary)', borderRadius: '8px', fontSize: '12.5px', outline: 'none' }} 
            />
            <button onClick={() => handleSendChat()} style={{ background: '#1B2A6B', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>Send</button>
          </div>
        </div>
      )}

      {/* 4. Global Modals Portal */}
      <Modals activeModal={activeModal} onClose={() => setActiveModal(null)} />

      {/* Auth Modal Portal */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        backendUrl={BACKEND_URL}
      />
    </div>
  );
}
