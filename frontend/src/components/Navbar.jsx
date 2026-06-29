import React from 'react';
import { LayoutDashboard, LogOut } from 'lucide-react';

export default function Navbar({ user, onOpenAuth, onLogout, onNavigate, activeTab }) {
  return (
    <nav style={{
      position: 'absolute', // Sits inside the app-frame container relative space
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
      {/* Logo — actual company logo image */}
      <div 
        onClick={() => onNavigate('home')}
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
            // Fallback: hide img and show text logo if file not found
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Text fallback (hidden when logo loads) */}
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

      {/* Nav Links */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '32px'
      }}>
        {activeTab === 'home' && (
          <>
            <a href="#solutions" style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', transition: 'color 0.2s', letterSpacing: '0.05em', textTransform: 'uppercase' }} onMouseOver={(e) => e.target.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>Solutions</a>
            <a href="#how-it-works" style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', transition: 'color 0.2s', letterSpacing: '0.05em', textTransform: 'uppercase' }} onMouseOver={(e) => e.target.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>How it works</a>
            <a href="#why-us" style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', transition: 'color 0.2s', letterSpacing: '0.05em', textTransform: 'uppercase' }} onMouseOver={(e) => e.target.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>Security</a>
            <a href="#contact" style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', transition: 'color 0.2s', letterSpacing: '0.05em', textTransform: 'uppercase' }} onMouseOver={(e) => e.target.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>Contact</a>
          </>
        )}
      </div>

      {/* Auth Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {user ? (
          <>
            {activeTab === 'home' ? (
              <button 
                onClick={() => onNavigate('dashboard')}
                className="btn-cred-neon"
                style={{ padding: '8px 18px', fontSize: '11.5px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <LayoutDashboard size={13} />
                Dashboard
              </button>
            ) : (
              <button 
                onClick={() => onNavigate('home')}
                className="btn-cred-outline"
                style={{ padding: '8px 18px', fontSize: '11.5px' }}
              >
                Back to Home
              </button>
            )}
            <button 
              onClick={onLogout}
              className="btn-cred-outline"
              style={{ padding: '8px 18px', fontSize: '11.5px', border: '1px solid rgba(255, 72, 72, 0.2)', color: '#ff4d4d' }}
              onMouseOver={(e) => { e.target.style.background = 'rgba(255, 72, 72, 0.04)'; e.target.style.borderColor = '#ff4d4d'; }}
              onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(255, 72, 72, 0.2)'; }}
            >
              <LogOut size={13} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Log Out
            </button>
          </>
        ) : (
          <button 
            onClick={onOpenAuth}
            className="btn-cred"
            style={{ padding: '8px 18px', fontSize: '11.5px' }}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
