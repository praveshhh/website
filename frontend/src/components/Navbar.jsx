import React, { useState } from 'react';
import { LayoutDashboard, LogOut, Menu, X } from 'lucide-react';

export default function Navbar({ user, onOpenAuth, onLogout, onNavigate, activeTab, onOpenModal }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLinkClick = (tab) => {
    onNavigate(tab);
    setIsMobileOpen(false);
  };

  const openEnquire = () => {
    onOpenModal('enquire');
    setIsMobileOpen(false);
  };

  const openSignup = () => {
    onOpenModal('signup');
    setIsMobileOpen(false);
  };

  return (
    <nav style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '80px',
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 8%'
    }}>
      {/* Logo */}
      <div 
        onClick={() => handleLinkClick('home')}
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        <img
          src="/logo.svg"
          alt="BillsPay24X7: Smart Payments. Secure Growth."
          style={{
            height: '48px',
            width: 'auto',
            objectFit: 'contain',
            display: 'block'
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <span style={{
          display: 'none',
          alignItems: 'center',
          gap: '8px',
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: '19px',
          letterSpacing: '-0.02em',
          color: '#1B2D6B'
        }}>
          BillsPay<span style={{ color: '#22C55E' }}>24X7</span>✓
        </span>
      </div>

      {/* Desktop Links */}
      <div className="nav-links-desktop" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px'
      }}>
        {activeTab !== 'dashboard' && (
          <>
            <a onClick={() => handleLinkClick('home')} style={{ fontSize: '11px', fontWeight: 700, color: activeTab === 'home' ? '#1B2D6B' : 'var(--text-secondary)', transition: 'color 0.2s', letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer' }}>Home</a>
            <a onClick={() => handleLinkClick('travel')} style={{ fontSize: '11px', fontWeight: 700, color: activeTab === 'travel' ? '#1B2D6B' : 'var(--text-secondary)', transition: 'color 0.2s', letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer' }}>✈️ Travel</a>
            <a onClick={() => handleLinkClick('it')} style={{ fontSize: '11px', fontWeight: 700, color: activeTab === 'it' ? '#1B2D6B' : 'var(--text-secondary)', transition: 'color 0.2s', letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer' }}>💻 IT Software</a>
            <a onClick={() => handleLinkClick('about')} style={{ fontSize: '11px', fontWeight: 700, color: activeTab === 'about' ? '#1B2D6B' : 'var(--text-secondary)', transition: 'color 0.2s', letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer' }}>About</a>
            <a onClick={() => handleLinkClick('pricing')} style={{ fontSize: '11px', fontWeight: 700, color: activeTab === 'pricing' ? '#1B2D6B' : 'var(--text-secondary)', transition: 'color 0.2s', letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer' }}>Pricing</a>
            <a onClick={() => handleLinkClick('blog')} style={{ fontSize: '11px', fontWeight: 700, color: activeTab === 'blog' ? '#1B2D6B' : 'var(--text-secondary)', transition: 'color 0.2s', letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer' }}>Blog</a>
            <a onClick={openEnquire} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', transition: 'color 0.2s', letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer' }}>Enquire</a>
          </>
        )}
      </div>

      {/* Auth Actions & Mobile Menu trigger */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Enquire button on desktop */}
        {activeTab !== 'dashboard' && (
          <button 
            onClick={openSignup} 
            className="btn-cred-outline nav-cta-desktop" 
            style={{ padding: '8px 16px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}
          >
            Get Started
          </button>
        )}

        {user ? (
          <>
            {activeTab === 'home' || activeTab !== 'dashboard' ? (
              <button 
                onClick={() => handleLinkClick('dashboard')}
                className="btn-cred-neon"
                style={{ padding: '8px 16px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <LayoutDashboard size={12} />
                Dashboard
              </button>
            ) : (
              <button 
                onClick={() => handleLinkClick('home')}
                className="btn-cred-outline"
                style={{ padding: '8px 16px', fontSize: '11px' }}
              >
                Back to Home
              </button>
            )}
            <button 
              onClick={onLogout}
              className="btn-cred-outline"
              style={{ padding: '8px 16px', fontSize: '11px', border: '1px solid rgba(255, 72, 72, 0.2)', color: '#ff4d4d' }}
            >
              <LogOut size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Log Out
            </button>
          </>
        ) : (
          <button 
            onClick={onOpenAuth}
            className="btn-cred"
            style={{ padding: '8px 16px', fontSize: '11px' }}
          >
            Sign In
          </button>
        )}

        {/* Mobile menu trigger */}
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)} 
          className="nav-mobile-hamburger"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: 'var(--text-primary)'
          }}
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          background: 'var(--white)',
          borderBottom: '1px solid var(--border-primary)',
          boxShadow: 'var(--shadow-md)',
          padding: '24px 8%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 99
        }}>
          {activeTab !== 'dashboard' && (
            <>
              <a onClick={() => handleLinkClick('home')} style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>Home</a>
              <a onClick={() => handleLinkClick('travel')} style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>✈️ Travel Booking</a>
              <a onClick={() => handleLinkClick('it')} style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>💻 IT Software Services</a>
              <a onClick={() => handleLinkClick('about')} style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>About Us</a>
              <a onClick={() => handleLinkClick('pricing')} style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>Pricing Plans</a>
              <a onClick={() => handleLinkClick('blog')} style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>Blog Insights</a>
              <a onClick={openEnquire} style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>Get Quote</a>
              <button onClick={openSignup} className="btn-cred-neon" style={{ padding: '10px', fontSize: '12px', width: '100%' }}>Get Started</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
