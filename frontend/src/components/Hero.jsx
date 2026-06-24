import React, { useState, useRef } from 'react';
import { Shield, Sparkles, Zap, Smartphone, CheckCircle, Send, ArrowRight, ArrowLeftRight, CreditCard, Globe, Lightbulb } from 'lucide-react';
import axios from 'axios';

export default function Hero({ onOpenAuth, backendUrl }) {
  // Contact form state
  const [contactData, setContactData] = useState({ name: '', email: '', subject: 'Payment Gateway Integration', message: '' });
  const [contactStatus, setContactStatus] = useState({ success: false, error: null, loading: false });

  // 3D Card Hover / Mouse position state
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !containerRef.current) return;
    const card = cardRef.current;
    const container = containerRef.current;
    
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotation tilt (-15 to 15 degrees)
    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = -((y - centerY) / centerY) * 15;
    
    // Glare position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    card.style.setProperty('--x', `${glareX}%`);
    card.style.setProperty('--y', `${glareY}%`);

    // Subtle parallax shift for background cards
    const backplates = container.querySelectorAll('.backplate-card');
    backplates.forEach((plate, index) => {
      const depth = (index + 1) * 0.25;
      plate.style.transform = `rotateX(${rotateX * depth}deg) rotateY(${rotateY * depth}deg) translateZ(${-depth * 30}px) rotate(${(index === 0 ? -10 : index === 1 ? 5 : -3)}deg)`;
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = '';
    card.style.setProperty('--x', '50%');
    card.style.setProperty('--y', '50%');

    if (containerRef.current) {
      const backplates = containerRef.current.querySelectorAll('.backplate-card');
      backplates.forEach((plate, index) => {
        plate.style.transform = `rotate(${(index === 0 ? -10 : index === 1 ? 5 : -3)}deg) translateZ(${-((index + 1) * 15)}px)`;
      });
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
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 8%',
        background: 'radial-gradient(circle at 10% 20%, rgba(94, 92, 230, 0.03) 0%, transparent 60%), radial-gradient(circle at 95% 85%, rgba(0, 122, 255, 0.02) 0%, transparent 60%)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.04)'
      }}>
        {/* Decorative Soft Accents */}
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
          {/* Left Hero Content */}
          <div>
            <h1 style={{
              fontSize: 'clamp(42px, 5.5vw, 68px)',
              lineHeight: '1.02',
              letterSpacing: '-0.04em',
              marginBottom: '20px',
              fontWeight: 800,
              color: 'var(--text-primary)'
            }}>
              Revolutionizing <br />
              Payments, <br />
              <span className="text-gradient-blue" style={{ fontStyle: 'italic', fontWeight: 700 }}>One Card</span> <span style={{ fontWeight: 800 }}>at a Time</span>
            </h1>

            <p style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              maxWidth: '460px',
              marginBottom: '32px',
              fontWeight: 400
            }}>
              Enjoy instant transactions, smart budgeting tools, and global access—all with the convenience of a single card. BillsPay24X7 enables next-generation zero trust E2EE credentials vaulting.
            </p>

            {/* Pill Search / Input Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: '6px 6px 6px 20px',
              borderRadius: '50px',
              maxWidth: '420px',
              boxShadow: '0 12px 30px rgba(94, 92, 230, 0.04)',
              marginBottom: '38px',
              position: 'relative'
            }}>
              <input 
                type="text" 
                placeholder="Start spending smarter today..." 
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  fontSize: '13.5px',
                  color: 'var(--text-primary)',
                  flex: 1,
                  fontFamily: 'var(--font-body)'
                }}
                disabled
              />
              <button 
                onClick={onOpenAuth} 
                className="btn-cred" 
                style={{ 
                  padding: '10px 24px', 
                  fontSize: '12.5px',
                  background: '#1A1D20',
                  color: '#FFF'
                }}
              >
                Go!
              </button>
            </div>

            {/* Direct CTAs */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button onClick={onOpenAuth} className="btn-cred-neon">
                Get Your Card Now <ArrowRight size={14} style={{ marginLeft: '8px' }} />
              </button>
              <a href="#solutions" className="btn-cred-outline">
                Explore Services
              </a>
            </div>
          </div>

          {/* Right Hero Visual: 3D stacked cards */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                position: 'relative',
                width: '320px',
                height: '460px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transformStyle: 'preserve-3d',
                perspective: '1200px'
              }}
            >
              
              {/* Backplate Card 1 (Angled Diagonal Glass) */}
              <div 
                className="backplate-card"
                style={{
                  position: 'absolute',
                  width: '280px',
                  height: '410px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(5px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                  transform: 'rotate(-10deg) translateZ(-45px)',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: 'none',
                  zIndex: 1
                }}
              />

              {/* Backplate Card 2 (Angled Diagonal Glass) */}
              <div 
                className="backplate-card"
                style={{
                  position: 'absolute',
                  width: '280px',
                  height: '410px',
                  background: 'rgba(255, 255, 255, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.45)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(5px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                  transform: 'rotate(5deg) translateZ(-30px)',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: 'none',
                  zIndex: 2
                }}
              />

              {/* Backplate Card 3 (Angled Diagonal Glass) */}
              <div 
                className="backplate-card"
                style={{
                  position: 'absolute',
                  width: '280px',
                  height: '410px',
                  background: 'rgba(255, 255, 255, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.55)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(5px)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.03)',
                  transform: 'rotate(-3deg) translateZ(-15px)',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: 'none',
                  zIndex: 3
                }}
              />

              {/* Periwinkle 3D Card (Main floating/interactive element) */}
              <div 
                ref={cardRef}
                className={`card-3d ${!isHovered ? 'card-idle-float' : ''}`}
                style={{
                  position: 'absolute',
                  width: '280px',
                  height: '410px',
                  zIndex: 4,
                  background: 'linear-gradient(135deg, #6E62F9 0%, #4D3CE6 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  padding: '32px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 30px 60px rgba(94, 92, 230, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  transformStyle: 'preserve-3d',
                  overflow: 'hidden'
                }}
              >
                {/* Glare effect */}
                <div className="card-glare" />

                {/* Overlapping wavy background lines */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.15,
                  background: `url("data:image/svg+xml,%3Csvg width='280' height='410' viewBox='0 0 280 410' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-50 200 C50 120, 150 280, 330 200 C330 200, 330 450, 330 450 L-50 450 Z' fill='%23FFFFFF' /%3E%3Cpath d='M-50 250 C80 180, 100 350, 330 260 L330 450 L-50 450 Z' fill='%23FFFFFF' opacity='0.5' /%3E%3C/svg%3E")`,
                  backgroundSize: 'cover',
                  pointerEvents: 'none'
                }} />

                {/* Card Top Details */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', transform: 'translateZ(30px)' }}>
                  <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.9 }}>
                    <rect width="34" height="28" rx="5" fill="#FFF" opacity="0.15" />
                    <rect x="5" y="5" width="8" height="7" rx="1.5" stroke="#FFF" strokeWidth="0.8" />
                    <rect x="21" y="5" width="8" height="7" rx="1.5" stroke="#FFF" strokeWidth="0.8" />
                    <rect x="5" y="16" width="8" height="7" rx="1.5" stroke="#FFF" strokeWidth="0.8" />
                    <rect x="21" y="16" width="8" height="7" rx="1.5" stroke="#FFF" strokeWidth="0.8" />
                    <path d="M13 9H21M13 19H21M17 5V23" stroke="#FFF" strokeWidth="0.8" />
                  </svg>
                  
                  {/* Contactless waves */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                    <path d="M5 12h.01M9 9a5 5 0 0 1 0 6M13 6a9 9 0 0 1 0 12M17 3a13 13 0 0 1 0 18" />
                  </svg>
                </div>

                {/* Card credentials */}
                <div style={{ transform: 'translateZ(40px)', color: '#FFFFFF' }}>
                  <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    vault credit node
                  </p>
                  <h4 style={{ fontSize: '20px', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '1px', marginBottom: '18px' }}>
                    1253 5432 3521 3090
                  </h4>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>cardholder</span>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#fff' }}>Preston Langley</span>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#fff', fontStyle: 'italic', letterSpacing: '1px' }}>VISA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ambient Back Glow */}
            <div style={{
              position: 'absolute',
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(94, 92, 230, 0.12) 0%, transparent 70%)',
              top: '15%',
              right: '-10px',
              filter: 'blur(50px)',
              zIndex: -1,
              opacity: 0.8
            }} />
          </div>
        </div>
      </section>

      {/* 2. STATS & THREE FEATURE COLUMNS ROW */}
      <section style={{
        padding: '60px 8% 80px',
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Stat & Description Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr 2fr',
            gap: '40px',
            alignItems: 'center',
            marginBottom: '64px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
            paddingBottom: '48px'
          }}>
            {/* Stat */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #FFF', marginRight: '-10px', objectFit: 'cover' }} alt="Avatar 1" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #FFF', marginRight: '-10px', objectFit: 'cover' }} alt="Avatar 2" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #FFF', objectFit: 'cover' }} alt="Avatar 3" />
              </div>
              <h2 style={{ fontSize: '56px', fontWeight: 900, color: 'var(--text-primary)', lineHeight: '1', fontFamily: 'var(--font-display)' }}>10M</h2>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800 }}>users worldwide</span>
            </div>

            {/* Spacer/Divider */}
            <div style={{ height: '80px', borderRight: '1px solid rgba(0, 0, 0, 0.08)', justifySelf: 'center' }} />

            {/* Description */}
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              Whether you're shopping, traveling, or managing expenses, enjoy a smarter, faster, and more rewarding way to pay—anytime, anywhere. BillsPay24X7 secures your keys locally while providing global transactional convenience.
            </p>
          </div>

          {/* Three Feature Columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px'
          }}>
            <div>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(94, 92, 230, 0.04)',
                border: '1px solid rgba(94, 92, 230, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <CreditCard size={18} color="var(--accent-periwinkle)" />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>Secure Payments</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Use contactless, chip, or virtual payment options for seamless E2EE secure transactions.
              </p>
            </div>

            <div>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(94, 92, 230, 0.04)',
                border: '1px solid rgba(94, 92, 230, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Globe size={18} color="var(--accent-periwinkle)" />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>Global Accessibility</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Enjoy transparent processing with zero international transaction fees or unnecessary hidden charges.
              </p>
            </div>

            <div>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(94, 92, 230, 0.04)',
                border: '1px solid rgba(94, 92, 230, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Lightbulb size={18} color="var(--accent-periwinkle)" />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>Smart Budgeting Tools</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Set spending limits, categorize expenses, and automate vault parameters for perfect control.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. BENTO SOLUTIONS SECTION */}
      <section id="solutions" style={{
        padding: '100px 8%',
        background: 'rgba(255,255,255,0.2)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-periwinkle)' }}>
              platform capabilities
            </span>
            <h2 style={{ fontSize: '38px', marginTop: '12px', fontWeight: 800 }}>Fintech infrastructure nodes</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginTop: '12px', maxWidth: '480px', margin: '12px auto 0' }}>
              Deploy modular payment and banking nodes with clean client-side encryption profiles.
            </p>
          </div>

          <div className="bento-grid">
            {/* Bento Grid Item 1: Payment Gateway */}
            <div className="bento-item bento-col-2">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(94, 92, 230, 0.04)', display: 'flex', alignItems: 'center', justify: 'center' }}>
                    <Zap size={16} color="var(--accent-periwinkle)" />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Payment Gateway Node</h3>
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '540px' }}>
                  Integrate online payment collection supporting Cards, NetBanking, and UPI. Designed for reliability under peak transactional loads with automated routing rails.
                </p>
              </div>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '24px', flexWrap: 'wrap' }}>
                {['Credit Cards', 'UPI Routing', 'NetBanking Node', 'BBPS Integration'].map((method, index) => (
                  <div key={index} style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    padding: '8px 16px',
                    borderRadius: '50px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-primary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-periwinkle)' }} />
                    {method}
                  </div>
                ))}
              </div>
            </div>

            {/* Bento Grid Item 2: Payouts API */}
            <div className="bento-item">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(94, 92, 230, 0.04)', display: 'flex', alignItems: 'center', justify: 'center' }}>
                    <ArrowLeftRight size={16} color="var(--accent-periwinkle)" />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Payouts API</h3>
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Automate transactions to vendor accounts instantly 24x7 via IMPS, NEFT, or UPI endpoints.
                </p>
              </div>

              <div style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                borderRadius: '8px',
                padding: '12px 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-secondary)',
                marginTop: '20px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.01)'
              }}>
                <span style={{ color: 'var(--accent-periwinkle)' }}>POST</span> /api/payouts<br />
                <span style={{ color: 'var(--text-muted)' }}>{`{ amount: 24500, upi: 'pay@node' }`}</span>
              </div>
            </div>

            {/* Bento Grid Item 3: BBPS Nodes */}
            <div className="bento-item">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(94, 92, 230, 0.04)', display: 'flex', alignItems: 'center', justify: 'center' }}>
                    <Smartphone size={16} color="var(--accent-periwinkle)" />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800 }}>BBPS Biller Nodes</h3>
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Direct access to electricity, gas, water, and telecom bill payments via BBPS certified routing.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
                <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.05)', padding: '4px 10px', borderRadius: '50px', color: 'var(--text-secondary)' }}>Utility API</span>
                <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.05)', padding: '4px 10px', borderRadius: '50px', color: 'var(--accent-periwinkle)' }}>Authorized</span>
              </div>
            </div>

            {/* Bento Grid Item 4: E2EE Vault */}
            <div className="bento-item bento-col-2">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(94, 92, 230, 0.04)', display: 'flex', alignItems: 'center', justify: 'center' }}>
                    <Shield size={16} color="var(--accent-periwinkle)" />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800 }}>E2EE Secure Vault</h3>
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '540px' }}>
                  Sensitive credentials like API passwords, bank routes, and keys are encrypted client-side using PBKDF2 key derivation. The plain keys never leave your browser window.
                </p>
              </div>

              <div style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                borderRadius: '8px',
                padding: '14px 18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                marginTop: '20px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.01)'
              }}>
                <span style={{ color: 'var(--text-muted)' }}>plaintext: "stripe_key_123"</span>
                <span style={{ color: 'var(--accent-periwinkle)' }}>→ PBKDF2 →</span>
                <span style={{ color: 'var(--accent-green)' }}>ciphertext: "7e9b04f...aes256"</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how-it-works" style={{
        padding: '100px 8%',
        background: 'rgba(255,255,255,0.4)',
        borderTop: '1px solid rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-periwinkle)' }}>
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
              <div style={{ fontSize: '48px', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'rgba(94,92,230,0.05)', position: 'absolute', top: '-30px', left: 0 }}>01</div>
              <h3 style={{ fontSize: '16px', color: 'var(--text-primary)', marginTop: '20px', marginBottom: '10px', fontWeight: 800 }}>Register & Authenticate</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Create your merchant portal account. Instantly authenticate with an OTP passcode delivered via SMTP service.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '48px', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'rgba(94,92,230,0.05)', position: 'absolute', top: '-30px', left: 0 }}>02</div>
              <h3 style={{ fontSize: '16px', color: 'var(--accent-periwinkle)', marginTop: '20px', marginBottom: '10px', fontWeight: 800 }}>Derive Encryption Key</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Derive a 256-bit AES master key locally in your browser window from your master passphrase (PBKDF2, 100k rounds).
              </p>
            </div>

            {/* Step 3 */}
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '48px', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'rgba(94,92,230,0.05)', position: 'absolute', top: '-30px', left: 0 }}>03</div>
              <h3 style={{ fontSize: '16px', color: 'var(--text-primary)', marginTop: '20px', marginBottom: '10px', fontWeight: 800 }}>Save Encrypted Vault</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Store payment nodes and bank integration credentials encrypted. Our AWS server only holds base64 ciphertext.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY US / SECURITY DETAILS */}
      <section id="why-us" style={{
        padding: '100px 8%',
        background: 'rgba(255,255,255,0.2)',
        borderTop: '1px solid rgba(0, 0, 0, 0.03)'
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
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-periwinkle)' }}>
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
                <CheckCircle size={16} color="var(--accent-periwinkle)" />
                <span style={{ fontSize: '13.5px', fontWeight: 600 }}>PBKDF2 Key Derivation (100,000 iterations)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <CheckCircle size={16} color="var(--accent-periwinkle)" />
                <span style={{ fontSize: '13.5px', fontWeight: 600 }}>AES-GCM 256-bit encryption standards</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle size={16} color="var(--accent-periwinkle)" />
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
              <h4 style={{ fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 800 }}>T+1 Settlements</h4>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Standard payouts settlements processed in T+1 directly to linked merchant bank accounts.</p>
            </div>
            <div className="card-cred" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 800 }}>BBPS Integration</h4>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Full access to utility bills, recharges, and subscription payout routes instantly.</p>
            </div>
            <div className="card-cred" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 800 }}>AEPS Cashout</h4>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Support Aadhaar cash withdrawal terminals, biometric transactions, and agent nodes.</p>
            </div>
            <div className="card-cred" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 800 }}>Audit Logs</h4>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Immutable history logs for all client-authorized credential modifications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contact" style={{
        padding: '100px 8%',
        background: 'rgba(255,255,255,0.4)',
        borderTop: '1px solid rgba(0, 0, 0, 0.03)'
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
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-periwinkle)' }}>
              partner with us
            </span>
            <h2 style={{ fontSize: '38px', marginTop: '12px', fontWeight: 800, marginBottom: '20px' }}>Let's discuss integration</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: '1.7', marginBottom: '32px' }}>
              Submit your inquiry and our technology team will contact you to set up your payment nodes, sandbox keys, and wallet configurations.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Support Email</span>
                <a href="mailto:support@billspay24x7.com" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '2px', display: 'inline-block' }}>support@billspay24x7.com</a>
              </div>
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Sales Hotline</span>
                <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>+91 9988776655</span>
              </div>
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Corporate Office</span>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>BillsPay24X7 Office, Lucknow Fintech Hub, Uttar Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="card-cred" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginBottom: '6px', fontWeight: 800 }}>Send a Message</h3>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Fill in details and hit submit.</p>

            {contactStatus.success ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(94, 92, 230, 0.04)',
                  border: '1px solid var(--accent-periwinkle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <CheckCircle size={24} color="var(--accent-periwinkle)" />
                </div>
                <h4 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 800 }}>Submission Successful</h4>
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
                    style={{ background: '#FFFFFF' }}
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
        background: 'rgba(255,255,255,0.4)',
        borderTop: '1px solid rgba(0, 0, 0, 0.03)',
        padding: '56px 8% 24px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '40px',
          paddingBottom: '40px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.03)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--accent-periwinkle)', display: 'flex', alignItems: 'center', justify: 'center' }}>
                <Shield size={16} color="#FFF" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px' }}>BillsPay24X7</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '280px' }}>
              India's premium, zero-trust end-to-end fintech framework for instant payout operations.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)', marginBottom: '16px' }}>Services</h4>
            <a href="#solutions" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>Payment Gateway</a>
            <a href="#solutions" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>Payouts API</a>
            <a href="#solutions" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)' }}>BBPS Billers</a>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)', marginBottom: '16px' }}>Security</h4>
            <a href="#why-us" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>E2E Vault</a>
            <a href="#why-us" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>Key Derivation</a>
            <a href="#why-us" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)' }}>Privacy Policy</a>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)', marginBottom: '16px' }}>Company</h4>
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
