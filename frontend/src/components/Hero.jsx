import React, { useState } from 'react';
import { Shield, Sparkles, Zap, Smartphone, CheckCircle, Send, ArrowRight, ArrowLeftRight } from 'lucide-react';
import axios from 'axios';

export default function Hero({ onOpenAuth, backendUrl }) {
  // Contact form state
  const [contactData, setContactData] = useState({ name: '', email: '', subject: 'Payment Gateway Integration', message: '' });
  const [contactStatus, setContactStatus] = useState({ success: false, error: null, loading: false });

  // Solutions tabs state
  const [activeTab, setActiveTab] = useState('merchants');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus({ success: false, error: null, loading: true });

    try {
      const response = await axios.post(`${backendUrl}/api/contact`, contactData);
      setContactStatus({ success: true, error: null, loading: false });
      setContactData({ name: '', email: '', subject: 'Payment Gateway Integration', message: '' });
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to submit form. Please try again.';
      setContactStatus({ success: false, error: errMsg, loading: false });
    }
  };

  const solutions = {
    merchants: [
      { title: 'Payment Gateway', desc: 'Secure online payment collection with 100+ payment options including Credit/Debit Cards, NetBanking, and UPI.', icon: <Zap size={20} color="#00e676" /> },
      { title: 'Payouts API', desc: 'Automate bulk transfers to vendors, partners, and customers instantly 24x7 via IMPS, NEFT, or UPI.', icon: <ArrowLeftRight size={20} color="#00b0ff" /> },
      { title: 'BBPS Services', desc: 'Integrated Bharat Bill Payment System for electricity, water, gas, DTH, and mobile recharges.', icon: <Smartphone size={20} color="#ffb300" /> }
    ],
    enterprise: [
      { title: 'Custom Software', desc: 'Fully customized enterprise fintech portals, banking integration nodes, and ledger architectures.', icon: <Shield size={20} color="#00e676" /> },
      { title: 'AEPS & DMT', desc: 'Aadhaar Enabled Payment System and Domestic Money Transfer nodes for agent networks and retail outlets.', icon: <Sparkles size={20} color="#00b0ff" /> },
      { title: 'Travel API', desc: 'Integrate flight, hotel, and bus bookings with automated wallets and instant settlement rails.', icon: <Zap size={20} color="#ffb300" /> }
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
        background: 'radial-gradient(circle at 10% 20%, rgba(0, 230, 118, 0.03) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(0, 176, 255, 0.02) 0%, transparent 50%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.03)'
      }}>
        {/* Glow Effects */}
        <div className="glow-overlay-green" style={{ top: '-10%', left: '-5%' }} />
        <div className="glow-overlay-blue" style={{ bottom: '5%', right: '5%' }} />

        <div style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Hero Content */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(0, 230, 118, 0.3)',
              background: 'rgba(0, 230, 118, 0.08)',
              padding: '6px 16px',
              borderRadius: '50px',
              marginBottom: '28px',
              fontSize: '11px',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--accent-green)'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block' }} />
              End-to-End Encrypted Fintech Platform
            </div>

            <h1 style={{
              fontSize: 'clamp(40px, 5.5vw, 68px)',
              lineHeight: '1.02',
              letterSpacing: '-0.03em',
              marginBottom: '24px',
              fontWeight: 900
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
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              paddingTop: '28px'
            }}>
              <div>
                <h3 style={{ fontSize: '28px', color: '#fff', fontWeight: 800 }}>T+1</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Settlements</p>
              </div>
              <div>
                <h3 style={{ fontSize: '28px', color: 'var(--accent-green)', fontWeight: 800 }}>99.9%</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Uptime API</p>
              </div>
              <div>
                <h3 style={{ fontSize: '28px', color: 'var(--accent-blue)', fontWeight: 800 }}>100%</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>E2E Encrypted</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Mockup: CRED Card Mockup with 3D/Hover Perspective */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div 
              style={{
                width: '320px',
                height: '480px',
                background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.9) 0%, rgba(5, 5, 5, 0.95) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '40px 30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                transition: 'transform 0.5s ease',
                transformStyle: 'preserve-3d',
                cursor: 'pointer'
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width/2;
                const y = e.clientY - rect.top - rect.height/2;
                e.currentTarget.style.transform = `rotateY(${x / 10}deg) rotateX(${-y / 15}deg) scale(1.02)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
              }}
            >
              {/* Card top */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent-green)' }}>
                  security node
                </span>
                <Shield size={24} color="#00e676" />
              </div>

              {/* Card middle: Glass chip */}
              <div style={{
                width: '44px',
                height: '34px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
              }} />

              {/* Card values */}
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  vault credentials status
                </p>
                <h4 style={{ fontSize: '20px', fontFamily: 'monospace', fontWeight: 600, color: '#fff', letterSpacing: '2px', marginBottom: '16px' }}>
                  •••• •••• •••• 9823
                </h4>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <span style={{ fontSize: '9px', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>active encyption</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>AES-GCM-256</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '9px', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>key status</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-green)' }}>CLIENT STORED</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ambient decorative glowing backdrops */}
            <div style={{
              position: 'absolute',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--accent-green) 0%, transparent 70%)',
              top: '20%',
              left: '-20px',
              filter: 'blur(50px)',
              zIndex: -1,
              opacity: 0.15
            }} />
          </div>
        </div>
      </section>

      {/* 2. TRUST TICKER BAR */}
      <section style={{
        background: '#040404',
        borderTop: '1px solid rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.03)',
        padding: '24px 0',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          gap: '60px',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          width: 'max-content'
        }}>
          {/* Double content for seamless looping scroll */}
          {[1, 2].map((groupIndex) => (
            <div key={groupIndex} style={{
              display: 'inline-flex',
              gap: '60px',
              alignItems: 'center',
              animation: 'ticker 25s linear infinite'
            }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={12} color="var(--accent-green)" /> INTEGRATED PAYMENT GATEWAY
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={12} color="var(--accent-green)" /> BBPS BILL SERVICES
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={12} color="var(--accent-green)" /> AEPS ADHAAR CASH-OUT
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={12} color="var(--accent-green)" /> INSTANT PAYOUTS RAIL
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={12} color="var(--accent-green)" /> JIO PAYMENTS PARTNER
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={12} color="var(--accent-green)" /> CASHFREE POWERED
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SOLUTIONS SECTION */}
      <section id="solutions" style={{
        padding: '100px 8%',
        background: '#040404'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-green)' }}>
              our solutions
            </span>
            <h2 style={{ fontSize: '36px', marginTop: '12px', fontWeight: 800 }}>Fintech tools for scale</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '12px', maxWidth: '480px', margin: '12px auto 0' }}>
              Choose your solution area. We provide full REST integrations and dashboard controls.
            </p>

            {/* Toggle buttons */}
            <div style={{
              display: 'inline-flex',
              padding: '6px',
              background: 'var(--bg-secondary)',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.05)',
              marginTop: '32px'
            }}>
              <button 
                onClick={() => setActiveTab('merchants')}
                style={{
                  padding: '8px 24px',
                  background: activeTab === 'merchants' ? 'var(--text-primary)' : 'transparent',
                  color: activeTab === 'merchants' ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Merchants & Payouts
              </button>
              <button 
                onClick={() => setActiveTab('enterprise')}
                style={{
                  padding: '8px 24px',
                  background: activeTab === 'enterprise' ? 'var(--text-primary)' : 'transparent',
                  color: activeTab === 'enterprise' ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Enterprise & APIs
              </button>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {solutions[activeTab].map((sol, index) => (
              <div key={index} className="card-cred card-cred-glow-green">
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  {sol.icon}
                </div>
                <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '10px' }}>{sol.title}</h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how-it-works" style={{
        padding: '100px 8%',
        background: 'var(--bg-primary)',
        borderTop: '1px solid rgba(255,255,255,0.03)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-blue)' }}>
              integration workflow
            </span>
            <h2 style={{ fontSize: '36px', marginTop: '12px', fontWeight: 800 }}>Three steps to full E2EE security</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px',
            position: 'relative'
          }}>
            {/* Step 1 */}
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '48px', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.03)', position: 'absolute', top: '-30px', left: 0 }}>01</div>
              <h3 style={{ fontSize: '16px', color: '#fff', marginTop: '20px', marginBottom: '10px' }}>Register & Authenticate</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Create your merchant account. Get validated instantly with a secure verification OTP sent via Gmail.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '48px', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.03)', position: 'absolute', top: '-30px', left: 0 }}>02</div>
              <h3 style={{ fontSize: '16px', color: 'var(--accent-green)', marginTop: '20px', marginBottom: '10px' }}>Initialize Master Key</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Set up your client-side encryption Master Password. This derives a 256-bit AES key locally in your browser.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '48px', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.03)', position: 'absolute', top: '-30px', left: 0 }}>03</div>
              <h3 style={{ fontSize: '16px', color: '#fff', marginTop: '20px', marginBottom: '10px' }}>Secure Your Credentials</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Save API secrets and bank nodes. Payload gets encrypted before transmission, storing only ciphertext in the database.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY US / SECURITY DETAILS */}
      <section id="why-us" style={{
        padding: '100px 8%',
        background: '#040404',
        borderTop: '1px solid rgba(255,255,255,0.03)'
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
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-green)' }}>
              zero trust architecture
            </span>
            <h2 style={{ fontSize: '38px', marginTop: '12px', fontWeight: 800, lineHeight: '1.1' }}>
              Your keys.<br />Your credentials.<br />No exceptions.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.8', marginTop: '20px' }}>
              Traditional servers store credentials in plain text or using server-side keys. If the server is breached, database secrets are exposed.
              <br /><br />
              With BillsPay24X7's **E2EE secure vault**, encryption happens entirely on the client. Even if our AWS database is inspected, no one can read your secure payload without your Master Password, which is never transmitted to our backend.
            </p>
            <div style={{ marginTop: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <CheckCircle size={18} color="var(--accent-green)" />
                <span style={{ fontSize: '14px', fontWeight: 600 }}>PBKDF2 Key Derivation (100,000 iterations)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <CheckCircle size={18} color="var(--accent-green)" />
                <span style={{ fontSize: '14px', fontWeight: 600 }}>AES-GCM 256-bit Encryption standard</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle size={18} color="var(--accent-green)" />
                <span style={{ fontSize: '14px', fontWeight: 600 }}>Zero Master Password server logs</span>
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
          }}>
            <div className="card-cred" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '8px' }}>T+1 Settlements</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Standard payouts settlements processed in T+1 directly to linked merchant bank accounts.</p>
            </div>
            <div className="card-cred" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '8px' }}>BBPS Integrations</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Full access to utility bills, recharges, and subscription payout routes instantly.</p>
            </div>
            <div className="card-cred" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '8px' }}>AEPS Cashout</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Support Aadhaar cash withdrawal terminals, biometric transactions, and agent nodes.</p>
            </div>
            <div className="card-cred" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '8px' }}>Security Audit Log</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Immutable history logs for all client-authorized credential modifications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contact" style={{
        padding: '100px 8%',
        background: 'var(--bg-primary)',
        borderTop: '1px solid rgba(255,255,255,0.03)'
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
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-blue)' }}>
              partner with us
            </span>
            <h2 style={{ fontSize: '36px', marginTop: '12px', fontWeight: 800, marginBottom: '20px' }}>Let's discuss integration</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.7', marginBottom: '32px' }}>
              Submit your inquiry and our technology team will contact you to set up your payment nodes, sandbox keys, and wallet configurations.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '4px' }}>Support Email</span>
                <a href="mailto:support@billspay24x7.com" style={{ fontSize: '15px', fontWeight: 700, color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '2px', display: 'inline-block' }}>support@billspay24x7.com</a>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '4px' }}>Sales Hotline</span>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>+91 9988776655</span>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '4px' }}>Corporate Office</span>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>BillsPay24X7 Office, Lucknow Fintech Hub, Uttar Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="card-cred" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '6px' }}>Send a Message</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Fill in details and hit submit.</p>

            {contactStatus.success ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(0, 230, 118, 0.08)',
                  border: '2px solid var(--accent-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <CheckCircle size={32} color="var(--accent-green)" />
                </div>
                <h4 style={{ fontSize: '18px', color: '#fff', marginBottom: '8px' }}>Submission Successful</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>We have received your message. Our sales team will get back to you shortly.</p>
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
                    style={{ background: 'var(--bg-secondary)' }}
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
        background: '#040404',
        borderTop: '1px solid rgba(255, 255, 255, 0.03)',
        padding: '56px 8% 24px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '40px',
          paddingBottom: '40px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.03)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--accent-green)', display: 'flex', alignItems: 'center', justify: 'center' }}>
                <Shield size={16} color="#000" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '18px' }}>BillsPay24X7</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '280px' }}>
              India's premium, zero-trust end-to-end fintech framework for instant payout operations.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', marginBottom: '16px' }}>Services</h4>
            <a href="#solutions" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>Payment Gateway</a>
            <a href="#solutions" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>Payouts API</a>
            <a href="#solutions" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)' }}>BBPS Billers</a>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', marginBottom: '16px' }}>Security</h4>
            <a href="#why-us" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>E2E Vault</a>
            <a href="#why-us" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>Key Derivation</a>
            <a href="#why-us" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)' }}>Privacy Policy</a>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', marginBottom: '16px' }}>Company</h4>
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
