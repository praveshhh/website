import React from 'react';
import { Shield, LayoutDashboard, LogOut } from 'lucide-react';

export default function Navbar({ user, onOpenAuth, onLogout, onNavigate, activeTab }) {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '80px',
      zIndex: 100,
      background: 'rgba(3, 3, 3, 0.75)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderBottom: '1px solid var(--border-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 8%'
    }}>
      {/* Logo */}
      <div 
        onClick={() => onNavigate('home')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer'
        }}
      >
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #FFE082, #D4AF37)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(212, 175, 55, 0.15)'
        }}>
          <Shield size={18} color="#000" strokeWidth={2.5} />
        </div>
        <span style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: '19px',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #fff, #bbb)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          BillsPay<span style={{ color: 'var(--accent-gold)', WebkitTextFillColor: 'initial' }}>24X7</span>
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
            <a href="#solutions" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', transition: 'color 0.2s', letterSpacing: '0.08em', textTransform: 'uppercase' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>Solutions</a>
            <a href="#how-it-works" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', transition: 'color 0.2s', letterSpacing: '0.08em', textTransform: 'uppercase' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>How it works</a>
            <a href="#why-us" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', transition: 'color 0.2s', letterSpacing: '0.08em', textTransform: 'uppercase' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>Security</a>
            <a href="#contact" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', transition: 'color 0.2s', letterSpacing: '0.08em', textTransform: 'uppercase' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>Contact</a>
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
              style={{ padding: '8px 18px', fontSize: '11.5px', border: '1px solid rgba(255, 72, 72, 0.2)', color: '#ff7272' }}
              onMouseOver={(e) => { e.target.style.background = 'rgba(255, 72, 72, 0.04)'; e.target.style.borderColor = '#ff7272'; }}
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
