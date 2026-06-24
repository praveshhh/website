import React, { useState, useRef } from 'react';
import { Shield, Sparkles, Zap, Smartphone, CheckCircle, Send, ArrowRight, ArrowLeftRight } from 'lucide-react';
import axios from 'axios';

export default function Hero({ onOpenAuth, backendUrl }) {
  // Contact form state
  const [contactData, setContactData] = useState({ name: '', email: '', subject: 'Payment Gateway Integration', message: '' });
  const [contactStatus, setContactStatus] = useState({ success: false, error: null, loading: false });

  // Solutions tabs state
  const [activeTab, setActiveTab] = useState('merchants');

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

  const solutions = {
    merchants: [
      { title: 'Payment Gateway', desc: 'Secure online payment collection with 100+ payment options including Credit/Debit Cards, NetBanking, and UPI.', icon: <Zap size={20} color="var(--accent-periwinkle)" /> },
      { title: 'Payouts API', desc: 'Automate bulk transfers to vendors, partners, and customers instantly 24x7 via IMPS, NEFT, or UPI.', icon: <ArrowLeftRight size={20} color="var(--accent-periwinkle)" /> },
      { title: 'BBPS Services', desc: 'Integrated Bharat Bill Payment System for electricity, water, gas, DTH, and mobile recharges.', icon: <Smartphone size={20} color="var(--accent-periwinkle)" /> }
    ],
    enterprise: [
      { title: 'Custom Software', desc: 'Fully customized enterprise fintech portals, banking integration nodes, and ledger architectures.', icon: <Shield size={20} color="var(--accent-periwinkle)" /> },
      { title: 'AEPS & DMT', desc: 'Aadhaar Enabled Payment System and Domestic Money Transfer nodes for agent networks and retail outlets.', icon: <Sparkles size={20} color="var(--accent-periwinkle)" /> },
      { title: 'Travel API', desc: 'Integrate flight, hotel, and bus bookings with automated wallets and instant settlement rails.', icon: <Zap size={20} color="var(--accent-periwinkle)" /> }
    ]
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
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(94, 92, 230, 0.15)',
              background: 'rgba(94, 92, 230, 0.04)',
              padding: '6px 16px',
              borderRadius: '50px',
              marginBottom: '28px',
              fontSize: '11px',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--accent-periwinkle)'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-periwinkle)', display: 'inline-block' }} />
              End-to-End Encrypted Fintech Platform
            </div>

            <h1 style={{
              fontSize: 'clamp(40px, 5.5vw, 68px)',
              lineHeight: '1.02',
              letterSpacing: '-0.03em',
              marginBottom: '24px',
              fontWeight: 900,
              color: 'var(--text-primary)'
            }}>
              payments <br />
              <span className="text-gradient-green">designed for </span> <br />
              <span className="text-gradient-blue">the future.</span>
            </h1>

            <p style={{
              fontSize: '16px',
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              maxWidth: '520px',
              marginBottom: '38px',
              fontWeight: 400
            }}>
              BillsPay24X7 enables next-generation transactions with zero trust E2EE credentials storage, T+1 settlement rails, BBPS systems, and developer-centric payout APIs.
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
              borderTop: '1px solid rgba(0, 0, 0, 0.05)',
              paddingTop: '28px'
            }}>
              <div>
                <h3 style={{ fontSize: '28px', color: 'var(--text-primary)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>T+1</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Settlements</p>
              </div>
              <div>
                <h3 style={{ fontSize: '28px', color: 'var(--accent-periwinkle)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>99.9%</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Uptime API</p>
              </div>
              <div>
                <h3 style={{ fontSize: '28px', color: 'var(--text-primary)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>100%</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>E2E Encrypted</p>
              </div>
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
              
              {/* Backplate Card 1 */}
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

              {/* Backplate Card 2 */}
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

              {/* Backplate Card 3 */}
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

              {/* Periwinkle 3D Card */}
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
                  <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF', opacity: 0.8 }}>
                    security node
                  </span>
                  <Shield size={20} color="#FFFFFF" style={{ opacity: 0.9 }} />
                </div>

                {/* Parallax Microchip */}
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

                {/* Card credentials */}
                <div style={{ transform: 'translateZ(40px)', color: '#FFFFFF' }}>
                  <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    vault credentials status
                  </p>
                  <h4 style={{ fontSize: '18px', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '1.5px', marginBottom: '18px' }}>
                    •••• •••• •••• 9823
                  </h4>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>active encryption</span>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fff' }}>AES-GCM-256</span>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>key status</span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#FFF' }}>CLIENT STORED</span>
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

      {/* 2. TRUST TICKER BAR */}
      <section style={{
        background: '#FFFFFF',
        borderTop: '1px solid rgba(0, 0, 0, 0.04)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
        padding: '20px 0',
        overflow: 'hidden'
      }}>
        <div className="ticker-wrap">
          <div className="ticker-content">
            {[1, 2].map((groupIndex) => (
              <div key={groupIndex} style={{ display: 'inline-flex', gap: '60px', alignItems: 'center', paddingRight: '60px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', letterSpacing: '0.05em' }}>
                  <CheckCircle size={12} color="var(--accent-periwinkle)" /> INTEGRATED PAYMENT GATEWAY
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', letterSpacing: '0.05em' }}>
                  <CheckCircle size={12} color="var(--accent-periwinkle)" /> BBPS BILL SERVICES
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', letterSpacing: '0.05em' }}>
                  <CheckCircle size={12} color="var(--accent-periwinkle)" /> AEPS ADHAAR CASH-OUT
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', letterSpacing: '0.05em' }}>
                  <CheckCircle size={12} color="var(--accent-periwinkle)" /> INSTANT PAYOUTS RAIL
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', letterSpacing: '0.05em' }}>
                  <CheckCircle size={12} color="var(--accent-periwinkle)" /> JIO PAYMENTS PARTNER
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', letterSpacing: '0.05em' }}>
                  <CheckCircle size={12} color="var(--accent-periwinkle)" /> CASHFREE POWERED
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SOLUTIONS SECTION */}
      <section id="solutions" style={{
        padding: '100px 8%',
        background: 'rgba(255,255,255,0.2)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-periwinkle)' }}>
              our solutions
            </span>
            <h2 style={{ fontSize: '38px', marginTop: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>Fintech tools for scale</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginTop: '12px', maxWidth: '480px', margin: '12px auto 0' }}>
              Choose your solution area. We provide full REST integrations and dashboard controls.
            </p>

            {/* Toggle Buttons */}
            <div style={{
              display: 'inline-flex',
              padding: '5px',
              background: 'rgba(0, 0, 0, 0.03)',
              borderRadius: '50px',
              border: '1px solid rgba(0,0,0,0.05)',
              marginTop: '32px'
            }}>
              <button 
                onClick={() => setActiveTab('merchants')}
                style={{
                  padding: '10px 28px',
                  background: activeTab === 'merchants' ? '#FFFFFF' : 'transparent',
                  color: activeTab === 'merchants' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: activeTab === 'merchants' ? '0 4px 12px rgba(0,0,0,0.04)' : 'none'
                }}
              >
                Merchants & Payouts
              </button>
              <button 
                onClick={() => setActiveTab('enterprise')}
                style={{
                  padding: '10px 28px',
                  background: activeTab === 'enterprise' ? '#FFFFFF' : 'transparent',
                  color: activeTab === 'enterprise' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: activeTab === 'enterprise' ? '0 4px 12px rgba(0,0,0,0.04)' : 'none'
                }}
              >
                Enterprise & APIs
              </button>
            </div>
          </div>

          {/* Solutions Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {solutions[activeTab].map((sol, index) => (
              <div key={index} className="card-cred">
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '10px',
                  background: 'rgba(94, 92, 230, 0.04)',
                  border: '1px solid rgba(94, 92, 230, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  {sol.icon}
                </div>
                <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '10px', fontWeight: 800 }}>{sol.title}</h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{sol.desc}</p>
              </div>
            ))}
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
            <h2 style={{ fontSize: '38px', marginTop: '12px', fontWeight: 800 }}>Three steps to full E2EE security</h2>
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
                Create your merchant account. Get validated instantly with a secure verification OTP sent via Gmail.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '48px', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'rgba(94,92,230,0.05)', position: 'absolute', top: '-30px', left: 0 }}>02</div>
              <h3 style={{ fontSize: '16px', color: 'var(--accent-periwinkle)', marginTop: '20px', marginBottom: '10px', fontWeight: 800 }}>Initialize Master Key</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Set up your client-side encryption Master Password. This derives a 256-bit AES key locally in your browser.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '48px', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'rgba(94,92,230,0.05)', position: 'absolute', top: '-30px', left: 0 }}>03</div>
              <h3 style={{ fontSize: '16px', color: 'var(--text-primary)', marginTop: '20px', marginBottom: '10px', fontWeight: 800 }}>Secure Your Credentials</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Save API secrets and bank nodes. Payload gets encrypted before transmission, storing only ciphertext in the database.
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
              Traditional servers store credentials in plain text or using server-side keys. If the server is breached, database secrets are exposed.
              <br /><br />
              With BillsPay24X7's **E2EE secure vault**, encryption happens entirely on the client. Even if our AWS database is inspected, no one can read your secure payload without your Master Password, which is never transmitted to our backend.
            </p>
            <div style={{ marginTop: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <CheckCircle size={16} color="var(--accent-periwinkle)" />
                <span style={{ fontSize: '13.5px', fontWeight: 600 }}>PBKDF2 Key Derivation (100,000 iterations)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <CheckCircle size={16} color="var(--accent-periwinkle)" />
                <span style={{ fontSize: '13.5px', fontWeight: 600 }}>AES-GCM 256-bit Encryption standard</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle size={16} color="var(--accent-periwinkle)" />
                <span style={{ fontSize: '13.5px', fontWeight: 600 }}>Zero Master Password server logs</span>
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
              <h4 style={{ fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 800 }}>BBPS Integrations</h4>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Full access to utility bills, recharges, and subscription payout routes instantly.</p>
            </div>
            <div className="card-cred" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 800 }}>AEPS Cashout</h4>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Support Aadhaar cash withdrawal terminals, biometric transactions, and agent nodes.</p>
            </div>
            <div className="card-cred" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 800 }}>Security Audit Log</h4>
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
