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
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
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
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #00e676, #00b0ff)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(0, 230, 118, 0.3)'
        }}>
          <Shield size={20} color="#000" strokeWidth={2.5} />
        </div>
        <span style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: '20px',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #fff, #bbb)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          BillsPay<span style={{ color: '#00e676', WebkitTextFillColor: 'initial' }}>24X7</span>
        </span>
      </div>

      {/* Nav Links */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '40px'
      }}>
        {activeTab === 'home' && (
          <>
            <a href="#solutions" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', transition: 'color 0.2s', letterSpacing: '0.05em', textTransform: 'uppercase' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>Solutions</a>
            <a href="#how-it-works" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', transition: 'color 0.2s', letterSpacing: '0.05em', textTransform: 'uppercase' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>How it works</a>
            <a href="#why-us" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', transition: 'color 0.2s', letterSpacing: '0.05em', textTransform: 'uppercase' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>Security</a>
            <a href="#contact" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', transition: 'color 0.2s', letterSpacing: '0.05em', textTransform: 'uppercase' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>Contact</a>
          </>
        )}
      </div>

      {/* Auth Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {user ? (
          <>
            {activeTab === 'home' ? (
              <button 
                onClick={() => onNavigate('dashboard')}
                className="btn-cred-neon"
                style={{ padding: '10px 20px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <LayoutDashboard size={14} />
                Dashboard
              </button>
            ) : (
              <button 
                onClick={() => onNavigate('home')}
                className="btn-cred-outline"
                style={{ padding: '10px 20px', fontSize: '12px' }}
              >
                Back to Home
              </button>
            )}
            <button 
              onClick={onLogout}
              className="btn-cred-outline"
              style={{ padding: '10px 20px', fontSize: '12px', border: '1px solid rgba(255,72,72,0.3)', color: '#ff7272' }}
              onMouseOver={(e) => { e.target.style.background = 'rgba(255,72,72,0.1)'; e.target.style.borderColor = '#ff7272'; }}
              onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(255,72,72,0.3)'; }}
            >
              <LogOut size={14} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
              Log Out
            </button>
          </>
        ) : (
          <button 
            onClick={onOpenAuth}
            className="btn-cred"
            style={{ padding: '10px 24px', fontSize: '12px' }}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
