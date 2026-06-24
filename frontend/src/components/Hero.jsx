import React, { useState, useRef } from 'react';
import { Shield, Sparkles, Zap, Smartphone, CheckCircle, Send, ArrowRight, ArrowLeftRight } from 'lucide-react';
import axios from 'axios';

export default function Hero({ onOpenAuth, backendUrl }) {
  // Contact form state
  const [contactData, setContactData] = useState({ name: '', email: '', subject: 'Payment Gateway Integration', message: '' });
  const [contactStatus, setContactStatus] = useState({ success: false, error: null, loading: false });

  // 3D Card Stack Refs
  const cardRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !containerRef.current) return;
    const card = cardRef.current;
    const container = containerRef.current;
    
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Tilt angle (max 15 degrees)
    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = -((y - centerY) / centerY) * 15;
    
    // Glare position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.setProperty('--x', `${glareX}%`);
    card.style.setProperty('--y', `${glareY}%`);
    
    const sleeve = container.querySelector('.wallet-sleeve');
    if (sleeve) {
      sleeve.style.transform = `rotateX(${rotateX * 0.4}deg) rotateY(${rotateY * 0.4}deg) translateZ(-20px)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.setProperty('--x', '50%');
    card.style.setProperty('--y', '50%');
    
    if (containerRef.current) {
      const sleeve = containerRef.current.querySelector('.wallet-sleeve');
      if (sleeve) {
        sleeve.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(-20px)';
      }
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus({ success: false, error: null, loading: true });

    try {
      await axios.post(`${backendUrl}/api/contact`, contactData);
      setContactStatus({ success: true, error: null, loading: false });
      setContactData({ name: '', email: '', subject: 'Payment Gateway Integration', message: '' });
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to submit form. Please try again.';
      setContactStatus({ success: false, error: errMsg, loading: false });
    }
  };

  return (
    <div style={{ paddingTop: '80px', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        padding: '80px 8%',
        background: 'radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.02) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.01) 0%, transparent 50%)',
        borderBottom: '1px solid var(--border-primary)'
      }}>
        {/* Glow Overlays */}
        <div className="glow-overlay-green" style={{ top: '-10%', left: '-5%' }} />
        <div className="glow-overlay-blue" style={{ bottom: '5%', right: '5%' }} />

        <div style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '40px',
          alignItems: 'center'
        }}>
          {/* Hero Content */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(255, 255, 255, 0.02)',
              padding: '6px 16px',
              borderRadius: '50px',
              marginBottom: '28px',
              fontSize: '11px',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-gold)', display: 'inline-block' }} />
              Premium encrypted payments framework
            </div>

            <h1 style={{
              fontSize: 'clamp(40px, 5.2vw, 64px)',
              lineHeight: '1.02',
              letterSpacing: '-0.04em',
              marginBottom: '24px',
              fontWeight: 800
            }}>
              payments <br />
              <span className="text-gradient-gold">designed for</span> <br />
              <span style={{ color: '#fff' }}>the future.</span>
            </h1>

            <p style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              maxWidth: '520px',
              marginBottom: '38px',
              fontWeight: 400
            }}>
              BillsPay24X7 enables next-generation transaction rails with client-side derived security vault storage, T+1 settlement systems, BBPS utility pipelines, and payout node APIs.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button onClick={onOpenAuth} className="btn-cred">
                Get Started Now <ArrowRight size={14} style={{ marginLeft: '8px' }} />
              </button>
              <a href="#solutions" className="btn-cred-outline">
                Explore Services
              </a>
            </div>

            {/* Statistics Row */}
            <div style={{
              marginTop: '56px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              maxWidth: '480px',
              borderTop: '1px solid var(--border-primary)',
              paddingTop: '28px'
            }}>
              <div>
                <h3 style={{ fontSize: '24px', color: '#fff', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>T+1</h3>
                <p style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Settlements</p>
              </div>
              <div>
                <h3 style={{ fontSize: '24px', color: '#fff', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>99.9%</h3>
                <p style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Uptime API</p>
              </div>
              <div>
                <h3 style={{ fontSize: '24px', color: 'var(--accent-gold)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>E2EE</h3>
                <p style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Zero Trust Vault</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Mockup: Premium 3D Wallet Card Stack */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                position: 'relative',
                width: '320px',
                height: '460px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transformStyle: 'preserve-3d',
                perspective: '1200px'
              }}
            >
              {/* Wallet Sleeve / Pocket (Background Depth) */}
              <div 
                className="wallet-sleeve"
                style={{
                  position: 'absolute',
                  width: '300px',
                  height: '280px',
                  bottom: '20px',
                  background: 'linear-gradient(180deg, #0C0C0D 0%, #040405 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.03)',
                  transform: 'translateZ(-20px)',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '24px 20px',
                  overflow: 'hidden'
                }}
              >
                {/* Sleeve Stitch Lines */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  right: '10px',
                  bottom: '10px',
                  border: '1px dashed rgba(255,255,255,0.02)',
                  borderRadius: '10px',
                  pointerEvents: 'none'
                }} />
                
                {/* Sleeve Branding */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.3 }}>
                  <span style={{ fontSize: '9px', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                    billspay security
                  </span>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#fff', opacity: 0.2 }} />
                </div>
              </div>

              {/* Luxury Metal Card (Foreground 3D Parallax) */}
              <div 
                ref={cardRef}
                className="card-3d"
                style={{
                  position: 'absolute',
                  width: '290px',
                  height: '420px',
                  top: '20px',
                  zIndex: 1,
                  background: 'linear-gradient(135deg, #18181B 0%, #09090B 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '32px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Glare Overlay */}
                <div className="card-glare" />

                {/* Top Details */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', transform: 'translateZ(30px)' }}>
                  <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent-gold)' }}>
                    titanium node
                  </span>
                  <Shield size={20} color="var(--accent-gold)" />
                </div>

                {/* Parallax Gold Contact Chip */}
                <div style={{ transform: 'translateZ(50px)', alignSelf: 'flex-start', margin: '20px 0' }}>
                  <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.9 }}>
                    <rect width="40" height="32" rx="6" fill="url(#chip-grad)" stroke="#D4AF37" strokeWidth="0.5" />
                    <rect x="6" y="6" width="10" height="8" rx="2" stroke="#D4AF37" strokeWidth="0.5" />
                    <rect x="24" y="6" width="10" height="8" rx="2" stroke="#D4AF37" strokeWidth="0.5" />
                    <rect x="6" y="18" width="10" height="8" rx="2" stroke="#D4AF37" strokeWidth="0.5" />
                    <rect x="24" y="18" width="10" height="8" rx="2" stroke="#D4AF37" strokeWidth="0.5" />
                    <path d="M16 10H24M16 22H24M20 6V26" stroke="#D4AF37" strokeWidth="0.5" />
                    <defs>
                      <linearGradient id="chip-grad" x1="0" y1="0" x2="40" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFE082" />
                        <stop offset="0.5" stopColor="#FFC107" />
                        <stop offset="1" stopColor="#FFA000" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Card Credentials Layout */}
                <div style={{ transform: 'translateZ(40px)' }}>
                  <p style={{ fontSize: '9px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                    vault credentials status
                  </p>
                  <h4 style={{ fontSize: '18px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#fff', letterSpacing: '1px', marginBottom: '16px' }}>
                    •••• •••• •••• 9823
                  </h4>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <span style={{ fontSize: '8px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>active standard</span>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fff' }}>AES-GCM-256</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '8px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>key status</span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-gold)' }}>ENCRYPTED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle Backglow */}
            <div style={{
              position: 'absolute',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--accent-gold) 0%, transparent 70%)',
              top: '20%',
              left: '-20px',
              filter: 'blur(60px)',
              zIndex: -1,
              opacity: 0.08
            }} />
          </div>
        </div>
      </section>

      {/* 2. TRUST TICKER BAR */}
      <section style={{
        background: '#030303',
        borderTop: '1px solid var(--border-primary)',
        borderBottom: '1px solid var(--border-primary)',
        padding: '20px 0',
        overflow: 'hidden'
      }}>
        <div className="ticker-wrap">
          <div className="ticker-content">
            {[1, 2].map((groupIndex) => (
              <div key={groupIndex} style={{ display: 'inline-flex', gap: '60px', alignItems: 'center', paddingRight: '60px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', letterSpacing: '0.05em' }}>
                  <CheckCircle size={12} color="var(--accent-gold)" /> INTEGRATED PAYMENT GATEWAY
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', letterSpacing: '0.05em' }}>
                  <CheckCircle size={12} color="var(--accent-gold)" /> BBPS BILL SERVICES
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', letterSpacing: '0.05em' }}>
                  <CheckCircle size={12} color="var(--accent-gold)" /> AEPS AADHAAR TERMINAL
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', letterSpacing: '0.05em' }}>
                  <CheckCircle size={12} color="var(--accent-gold)" /> INSTANT IMPS PAYOUTS
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', letterSpacing: '0.05em' }}>
                  <CheckCircle size={12} color="var(--accent-gold)" /> ZERO TRUST SECURITY VAULT
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BENTO SOLUTIONS SECTION */}
      <section id="solutions" style={{
        padding: '100px 8%',
        background: '#030303'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)' }}>
              platform nodes
            </span>
            <h2 style={{ fontSize: '38px', marginTop: '12px', fontWeight: 800 }}>Fintech infrastructure for scale</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '12px', maxWidth: '480px', margin: '12px auto 0' }}>
              Deploy modular payment and banking nodes with clean client-side E2EE security profiles.
            </p>
          </div>

          {/* Asymmetrical Bento Grid */}
          <div className="bento-grid">
            
            {/* Bento Grid Item 1: Payment Gateway (spans 2 columns) */}
            <div className="bento-item bento-col-2">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', justify: 'center' }}>
                    <Zap size={16} color="var(--accent-gold)" />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Payment Gateway Node</h3>
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '540px' }}>
                  Integrate online payment collection supporting Cards, NetBanking, and UPI. Designed for reliability under peak transactional loads with automated routing rails.
                </p>
              </div>
              
              {/* Payment Methods Badges */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '24px', flexWrap: 'wrap' }}>
                {['Credit Cards', 'UPI Routing', 'NetBanking Node', 'BBPS Integration'].map((method, index) => (
                  <div key={index} style={{
                    background: '#0d0d0f',
                    border: '1px solid var(--border-primary)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '11.5px',
                    fontFamily: 'var(--font-mono)',
                    color: '#fff',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-gold)' }} />
                    {method}
                  </div>
                ))}
              </div>
            </div>

            {/* Bento Grid Item 2: Payouts API (spans 1 column) */}
            <div className="bento-item">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', justify: 'center' }}>
                    <ArrowLeftRight size={16} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Payouts API</h3>
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Automate transactions to vendor accounts instantly 24x7 via IMPS, NEFT, or UPI endpoints.
                </p>
              </div>

              {/* Code Visualizer mockup */}
              <div style={{
                background: '#0d0d0f',
                border: '1px solid var(--border-primary)',
                borderRadius: '8px',
                padding: '12px 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-secondary)',
                marginTop: '20px'
              }}>
                <span style={{ color: 'var(--accent-gold)' }}>POST</span> /api/payouts<br />
                <span style={{ color: 'var(--text-muted)' }}>{`{ amount: 24500, upi: 'pay@node' }`}</span>
              </div>
            </div>

            {/* Bento Grid Item 3: BBPS Services (spans 1 column) */}
            <div className="bento-item">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', justify: 'center' }}>
                    <Smartphone size={16} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700 }}>BBPS Biller Nodes</h3>
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Direct access to electricity, gas, water, and telecom bill payments via BBPS certified routing.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
                <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-primary)', padding: '4px 10px', borderRadius: '6px', color: 'var(--text-secondary)' }}>Utility API</span>
                <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-primary)', padding: '4px 10px', borderRadius: '6px', color: 'var(--accent-gold)' }}>Authorized</span>
              </div>
            </div>

            {/* Bento Grid Item 4: AEPS terminal (spans 2 columns) */}
            <div className="bento-item bento-col-2">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', justify: 'center' }}>
                    <Shield size={16} color="var(--accent-gold)" />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700 }}>E2EE Secure Vault</h3>
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '540px' }}>
                  Sensitive credentials like API passwords, bank routes, and keys are encrypted client-side using PBKDF2 key derivation. The plain keys never leave your browser window.
                </p>
              </div>

              {/* Vault diagram mockup */}
              <div style={{
                background: '#0d0d0f',
                border: '1px solid var(--border-primary)',
                borderRadius: '8px',
                padding: '14px 18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                marginTop: '20px'
              }}>
                <span style={{ color: 'var(--text-muted)' }}>plaintext: "stripe_key_123"</span>
                <span style={{ color: 'var(--accent-gold)' }}>→ PBKDF2 →</span>
                <span style={{ color: 'var(--accent-green)' }}>ciphertext: "7e9b04f...aes256"</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how-it-works" style={{
        padding: '100px 8%',
        background: '#030303',
        borderTop: '1px solid var(--border-primary)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)' }}>
              integration workflow
            </span>
            <h2 style={{ fontSize: '38px', marginTop: '12px', fontWeight: 800 }}>Three steps to E2EE security</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px',
            position: 'relative'
          }}>
            {/* Step 1 */}
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '48px', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.02)', position: 'absolute', top: '-30px', left: 0 }}>01</div>
              <h3 style={{ fontSize: '16px', color: '#fff', marginTop: '20px', marginBottom: '10px' }}>Register & Authenticate</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Create your merchant portal account. Instantly authenticate with an OTP passcode delivered via SMTP service.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '48px', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.02)', position: 'absolute', top: '-30px', left: 0 }}>02</div>
              <h3 style={{ fontSize: '16px', color: 'var(--accent-gold)', marginTop: '20px', marginBottom: '10px' }}>Derive Encryption Key</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Derive a 256-bit AES master key locally in your browser window from your master passphrase (PBKDF2, 100k rounds).
              </p>
            </div>

            {/* Step 3 */}
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '48px', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.02)', position: 'absolute', top: '-30px', left: 0 }}>03</div>
              <h3 style={{ fontSize: '16px', color: '#fff', marginTop: '20px', marginBottom: '10px' }}>Save Encrypted Vault</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Store payment nodes and bank integration credentials encrypted. Our AWS server only holds base64 ciphertext.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY US / SECURITY DETAILS */}
      <section id="why-us" style={{
        padding: '100px 8%',
        background: '#030303',
        borderTop: '1px solid var(--border-primary)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)' }}>
              zero trust architecture
            </span>
            <h2 style={{ fontSize: '38px', marginTop: '12px', fontWeight: 800, lineHeight: '1.1' }}>
              Your keys.<br />Your credentials.<br />No exceptions.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: '1.7', marginTop: '20px' }}>
              Traditional servers store banking credentials in plaintext or using centralized database KMS systems. If the central server is breached, database secrets are exposed.
              <br /><br />
              With BillsPay24X7's E2EE vault, encryption happens directly in your browser. Even if the database is accessed, no one can read your credentials without your local Master Password.
            </p>
            <div style={{ marginTop: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <CheckCircle size={16} color="var(--accent-gold)" />
                <span style={{ fontSize: '13.5px', fontWeight: 600 }}>PBKDF2 Key Derivation (100,000 iterations)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <CheckCircle size={16} color="var(--accent-gold)" />
                <span style={{ fontSize: '13.5px', fontWeight: 600 }}>AES-GCM 256-bit encryption standards</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle size={16} color="var(--accent-gold)" />
                <span style={{ fontSize: '13.5px', fontWeight: 600 }}>Zero server logs of plain text master passwords</span>
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
          }}>
            <div className="card-cred" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '8px', fontWeight: 700 }}>T+1 Settlements</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Standard payouts settlements processed in T+1 directly to linked merchant bank accounts.</p>
            </div>
            <div className="card-cred" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '8px', fontWeight: 700 }}>BBPS Integration</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Full access to utility bills, recharges, and subscription payout routes instantly.</p>
            </div>
            <div className="card-cred" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '8px', fontWeight: 700 }}>AEPS Cashout</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Support Aadhaar cash withdrawal terminals, biometric transactions, and agent nodes.</p>
            </div>
            <div className="card-cred" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '8px', fontWeight: 700 }}>Audit Logs</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Immutable history logs for all client-authorized credential modifications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contact" style={{
        padding: '100px 8%',
        background: '#030303',
        borderTop: '1px solid var(--border-primary)'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'start'
        }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)' }}>
              partner with us
            </span>
            <h2 style={{ fontSize: '38px', marginTop: '12px', fontWeight: 800, marginBottom: '20px' }}>Let's discuss integration</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: '1.7', marginBottom: '32px' }}>
              Submit your inquiry and our technology team will contact you to set up your payment nodes, sandbox keys, and wallet configurations.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Support Email</span>
                <a href="mailto:support@billspay24x7.com" style={{ fontSize: '15px', fontWeight: 700, color: '#fff', borderBottom: '1px solid var(--border-primary)', paddingBottom: '2px', display: 'inline-block' }}>support@billspay24x7.com</a>
              </div>
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Sales Hotline</span>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>+91 9988776655</span>
              </div>
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Corporate Office</span>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>BillsPay24X7 Office, Lucknow Fintech Hub, Uttar Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="card-cred" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '6px', fontWeight: 700 }}>Send a Message</h3>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Fill in details and hit submit.</p>

            {contactStatus.success ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(212, 175, 55, 0.04)',
                  border: '1px solid var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <CheckCircle size={24} color="var(--accent-gold)" />
                </div>
                <h4 style={{ fontSize: '18px', color: '#fff', marginBottom: '8px', fontWeight: 700 }}>Submission Successful</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>We have received your message. Our sales team will get back to you shortly.</p>
                <button 
                  onClick={() => setContactStatus({ success: false, error: null, loading: false })}
                  className="btn-cred-outline"
                  style={{ marginTop: '24px', padding: '8px 18px', fontSize: '11px' }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit}>
                <div className="form-group-cred">
                  <label htmlFor="c-name">Full Name</label>
                  <input 
                    type="text" 
                    id="c-name" 
                    placeholder="Enter your name"
                    className="form-control-cred"
                    value={contactData.name}
                    onChange={(e) => setContactData({...contactData, name: e.target.value})}
                    required 
                  />
                </div>

                <div className="form-group-cred">
                  <label htmlFor="c-email">Work Email</label>
                  <input 
                    type="email" 
                    id="c-email" 
                    placeholder="Enter your email"
                    className="form-control-cred"
                    value={contactData.email}
                    onChange={(e) => setContactData({...contactData, email: e.target.value})}
                    required 
                  />
                </div>

                <div className="form-group-cred">
                  <label htmlFor="c-subject">Topic</label>
                  <select 
                    id="c-subject" 
                    className="form-control-cred"
                    value={contactData.subject}
                    onChange={(e) => setContactData({...contactData, subject: e.target.value})}
                    style={{ background: '#0d0d0f' }}
                  >
                    <option value="Payment Gateway Integration">Payment Gateway Integration</option>
                    <option value="BBPS & Utility Node API">BBPS & Utility Node API</option>
                    <option value="AEPS Retailer Network">AEPS Retailer Network</option>
                    <option value="Custom Fintech Development">Custom Fintech Development</option>
                  </select>
                </div>

                <div className="form-group-cred">
                  <label htmlFor="c-message">Message Details</label>
                  <textarea 
                    id="c-message" 
                    placeholder="Describe your requirements..."
                    className="form-control-cred"
                    rows="3"
                    value={contactData.message}
                    onChange={(e) => setContactData({...contactData, message: e.target.value})}
                    style={{ resize: 'none' }}
                    required
                  ></textarea>
                </div>

                {contactStatus.error && (
                  <div style={{ color: '#ff4d4d', fontSize: '12px', marginBottom: '16px' }}>
                    {contactStatus.error}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn-cred" 
                  style={{ width: '100%', marginTop: '8px' }}
                  disabled={contactStatus.loading}
                >
                  {contactStatus.loading ? 'Submitting...' : 'Submit Inquiry'}
                  <Send size={12} style={{ marginLeft: '8px' }} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: '#030303',
        borderTop: '1px solid var(--border-primary)',
        padding: '56px 8% 24px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '40px',
          paddingBottom: '40px',
          borderBottom: '1px solid var(--border-primary)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justify: 'center' }}>
                <Shield size={16} color="#000" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px' }}>BillsPay24X7</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '280px' }}>
              India's premium, zero-trust end-to-end fintech framework for instant payout operations.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', marginBottom: '16px' }}>Services</h4>
            <a href="#solutions" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>Payment Gateway</a>
            <a href="#solutions" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>Payouts API</a>
            <a href="#solutions" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)' }}>BBPS Billers</a>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', marginBottom: '16px' }}>Security</h4>
            <a href="#why-us" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>E2E Vault</a>
            <a href="#why-us" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>Key Derivation</a>
            <a href="#why-us" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)' }}>Privacy Policy</a>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', marginBottom: '16px' }}>Company</h4>
            <a href="#contact" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>About Hub</a>
            <a href="#contact" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>Hotline support</a>
            <a href="#contact" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)' }}>Inquiries</a>
          </div>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '18px auto 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          color: 'var(--text-muted)'
        }}>
          <p>© 2026 BillsPay24X7. All rights reserved.</p>
          <p style={{ fontSize: '9px', opacity: 0.7 }}>Licensed & Authorized Payments Node</p>
        </div>
      </footer>
    </div>
  );
}
