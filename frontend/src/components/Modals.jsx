import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

export default function Modals({ activeModal, onClose }) {
  const [eqFn, setEqFn] = useState('');
  const [eqLn, setEqLn] = useState('');
  const [eqCo, setEqCo] = useState('');
  const [eqEm, setEqEm] = useState('');
  const [eqPh, setEqPh] = useState('');
  const [eqSol, setEqSol] = useState('Payment Gateway');
  const [eqSuccess, setEqSuccess] = useState(false);

  const [suFn, setSuFn] = useState('');
  const [suLn, setSuLn] = useState('');
  const [suBn, setSuBn] = useState('');
  const [suEm, setSuEm] = useState('');
  const [suPh, setSuPh] = useState('');
  const [suPw, setSuPw] = useState('');
  const [suPw2, setSuPw2] = useState('');
  const [suAg, setSuAg] = useState(false);
  const [suSuccess, setSuSuccess] = useState(false);

  const [bkFn, setBkFn] = useState('');
  const [bkLn, setBkLn] = useState('');
  const [bkPh, setBkPh] = useState('');
  const [bkEm, setBkEm] = useState('');
  const [bkSvc, setBkSvc] = useState('Flight Booking');
  const [bkMsg, setBkMsg] = useState('');
  const [bkSuccess, setBkSuccess] = useState(false);

  const handleWhatsApp = (msg) => {
    window.open(`https://wa.me/919278403522?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleEnquire = (e) => {
    e.preventDefault();
    if (!eqFn || !eqEm || !eqPh || !eqCo) {
      alert('Please fill all required fields correctly.');
      return;
    }
    setEqSuccess(true);
    const msg = `Hi BillsPay24X7! B2B Quote Request.\nName: ${eqFn} ${eqLn}\nCompany: ${eqCo}\nEmail: ${eqEm}\nPhone: ${eqPh}\nSolution: ${eqSol}`;
    handleWhatsApp(msg);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!suFn || !suEm || !suPh || !suBn) {
      alert('Please fill all required fields correctly.');
      return;
    }
    if (suPw.length < 8) {
      alert('Password must be at least 8 characters.');
      return;
    }
    if (suPw !== suPw2) {
      alert('Passwords do not match.');
      return;
    }
    if (!suAg) {
      alert('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }
    setSuSuccess(true);
    const msg = `Hi BillsPay24X7! New Merchant Sign-up.\nName: ${suFn} ${suLn}\nBusiness: ${suBn}\nEmail: ${suEm}\nPhone: ${suPh}`;
    handleWhatsApp(msg);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (!bkFn || bkPh.replace(/\D/g, '').length < 10) {
      alert('Please enter your name and a valid phone number.');
      return;
    }
    setBkSuccess(true);
    const msg = `Hi BillsPay24X7 Travel!\nTravel Booking Request:\nName: ${bkFn} ${bkLn}\nPhone: ${bkPh}\nEmail: ${bkEm || 'N/A'}\nService: ${bkSvc}\nDetails: ${bkMsg || 'N/A'}`;
    handleWhatsApp(msg);
  };

  if (!activeModal) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(13, 22, 56, 0.45)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      overflowY: 'auto'
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      
      <div style={{
        background: 'var(--white)',
        width: '100%',
        maxWidth: '520px',
        borderRadius: '24px',
        border: '1px solid var(--border-primary)',
        boxShadow: 'var(--shadow-xl)',
        padding: '36px',
        position: 'relative',
        maxHeight: '90vh',
        overflowY: 'auto',
        color: 'var(--text-primary)'
      }}>
        {/* Close Button */}
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'var(--surf-2)',
          border: 'none',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--text-secondary)'
        }}><X size={15} /></button>

        {/* Modal: Enquire */}
        {activeModal === 'enquire' && (
          <div>
            {!eqSuccess ? (
              <form onSubmit={handleEnquire}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>Get a Free Quote</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '24px' }}>We will call back within 24 hours</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>First Name</label>
                    <input className="mf-inp" required type="text" value={eqFn} onChange={(e) => setEqFn(e.target.value)} placeholder="Rahul" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>Last Name</label>
                    <input className="mf-inp" type="text" value={eqLn} onChange={(e) => setEqLn(e.target.value)} placeholder="Sharma" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }} />
                  </div>
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>Company</label>
                  <input className="mf-inp" required type="text" value={eqCo} onChange={(e) => setEqCo(e.target.value)} placeholder="Your Company Pvt Ltd" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }} />
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>Email</label>
                  <input className="mf-inp" required type="email" value={eqEm} onChange={(e) => setEqEm(e.target.value)} placeholder="rahul@company.com" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }} />
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>Phone / WhatsApp</label>
                  <input className="mf-inp" required type="tel" value={eqPh} onChange={(e) => setEqPh(e.target.value)} placeholder="+91 98765 43210" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>Solution Required</label>
                  <select value={eqSol} onChange={(e) => setEqSol(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px', color: 'var(--text-primary)' }}>
                    <option>Payment Gateway</option>
                    <option>BBPS / Bill Payments</option>
                    <option>AEPS</option>
                    <option>DMT Remittance</option>
                    <option>Payout API</option>
                    <option>Travel Solutions</option>
                    <option>IT Software</option>
                    <option>White Label Platform</option>
                    <option>Complete Suite</option>
                  </select>
                </div>
                <button type="submit" className="btn-cred-neon" style={{ width: '100%', padding: '12px' }}>Send via WhatsApp →</button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#F0FFF4', border: '2px solid #2DB84B', display: 'flex', alignItems: 'center', justify: 'center', margin: '0 auto 16px', color: '#2DB84B' }}><Check size={24} /></div>
                <h4 style={{ fontWeight: 800, fontSize: '18px', marginBottom: '8px' }}>Enquiry Sent!</h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>Opening WhatsApp... We will respond within 24 hours.</p>
              </div>
            )}
          </div>
        )}

        {/* Modal: Signup */}
        {activeModal === 'signup' && (
          <div>
            {!suSuccess ? (
              <form onSubmit={handleSignup}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>Create Merchant Account</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Go live in 48 hours</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>First Name</label>
                    <input className="mf-inp" required type="text" value={suFn} onChange={(e) => setSuFn(e.target.value)} placeholder="Rahul" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>Last Name</label>
                    <input className="mf-inp" type="text" value={suLn} onChange={(e) => setSuLn(e.target.value)} placeholder="Sharma" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }} />
                  </div>
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>Business Name</label>
                  <input className="mf-inp" required type="text" value={suBn} onChange={(e) => setSuBn(e.target.value)} placeholder="Your Company Pvt Ltd" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }} />
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>Email</label>
                  <input className="mf-inp" required type="email" value={suEm} onChange={(e) => setSuEm(e.target.value)} placeholder="rahul@company.com" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }} />
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>Phone / WhatsApp</label>
                  <input className="mf-inp" required type="tel" value={suPh} onChange={(e) => setSuPh(e.target.value)} placeholder="+91 98765 43210" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>Password</label>
                    <input className="mf-inp" required type="password" value={suPw} onChange={(e) => setSuPw(e.target.value)} placeholder="Min 8 chars" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>Confirm Password</label>
                    <input className="mf-inp" required type="password" value={suPw2} onChange={(e) => setSuPw2(e.target.value)} placeholder="Repeat password" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '20px', fontSize: '11px' }}>
                  <input type="checkbox" id="su-ag" checked={suAg} onChange={(e) => setSuAg(e.target.checked)} style={{ accentColor: '#1B2A6B' }} />
                  <label htmlFor="su-ag">I agree to BillsPay24X7✓ Terms of Service and Privacy Policy</label>
                </div>
                <button type="submit" className="btn-cred-neon" style={{ width: '100%', padding: '12px' }}>Create Account →</button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#F0FFF4', border: '2px solid #2DB84B', display: 'flex', alignItems: 'center', justify: 'center', margin: '0 auto 16px', color: '#2DB84B' }}><Check size={24} /></div>
                <h4 style={{ fontWeight: 800, fontSize: '18px', marginBottom: '8px' }}>Account Created!</h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>Welcome to BillsPay24X7✓! Opening WhatsApp...</p>
              </div>
            )}
          </div>
        )}

        {/* Modal: Booking */}
        {activeModal === 'booking' && (
          <div>
            {!bkSuccess ? (
              <form onSubmit={handleBooking}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>Complete Your Booking</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Travel expert confirms within 30 minutes</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>First Name</label>
                    <input className="mf-inp" required type="text" value={bkFn} onChange={(e) => setBkFn(e.target.value)} placeholder="Rahul" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>Last Name</label>
                    <input className="mf-inp" type="text" value={bkLn} onChange={(e) => setBkLn(e.target.value)} placeholder="Sharma" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }} />
                  </div>
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>Mobile Number</label>
                  <input className="mf-inp" required type="tel" value={bkPh} onChange={(e) => setBkPh(e.target.value)} placeholder="+91 98765 43210" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }} />
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>Email</label>
                  <input className="mf-inp" type="email" value={bkEm} onChange={(e) => setBkEm(e.target.value)} placeholder="rahul@email.com" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }} />
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>Booking Type</label>
                  <select value={bkSvc} onChange={(e) => setBkSvc(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px', color: 'var(--text-primary)' }}>
                    <option>Flight Booking</option>
                    <option>Hotel Booking</option>
                    <option>Bus Ticket</option>
                    <option>Train Ticket</option>
                    <option>Holiday Package</option>
                  </select>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>Travel Details</label>
                  <textarea rows="3" value={bkMsg} onChange={(e) => setBkMsg(e.target.value)} placeholder="Route, dates, passengers, class preferences..." style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px', fontSize: '13px' }}></textarea>
                </div>
                <button type="submit" className="btn-cred-neon" style={{ width: '100%', padding: '12px', background: 'var(--orange)' }}>Confirm via WhatsApp →</button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#F0FFF4', border: '2px solid #2DB84B', display: 'flex', alignItems: 'center', justify: 'center', margin: '0 auto 16px', color: '#2DB84B' }}><Check size={24} /></div>
                <h4 style={{ fontWeight: 800, fontSize: '18px', marginBottom: '8px' }}>Booking Request Sent!</h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>Opening WhatsApp... Our travel expert confirms within 30 minutes.</p>
              </div>
            )}
          </div>
        )}

        {/* Modal: About */}
        {activeModal === 'about' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, marginBottom: '2px' }}>About BillsPay24X7✓</h3>
            <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: '18px' }}>BILLSPAY TECHNOLOGIES PRIVATE LIMITED</div>
            <div style={{ fontSize: '13px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '50vh', overflowY: 'auto' }}>
              <p><strong>Our Story</strong><br />BillsPay24X7✓ was founded in 2026 with a single mission: to build India's most complete fintech, travel and IT infrastructure platform. We are a team of engineers, designers and operators based in Lucknow, Uttar Pradesh, working with businesses across India.</p>
              <p><strong>What We Do</strong><br />We provide Payment Gateway, BBPS, AEPS, DMT, UPI, Payout API, Travel Booking (Flights, Hotels, Buses, Trains, Holidays) and Custom IT Software development — all under one roof. Our clients range from early-stage fintech startups to enterprise banks and travel companies.</p>
              <p><strong>Company Details</strong><br />Name: BILLSPAY TECHNOLOGIES PRIVATE LIMITED<br />CIN: U63999UP2026PTC245490<br />Registered Office: PLOT NO-02 KHASRA NO-122 GRAM FARIDIPUR DUBAGGA, Lucknow Chowk, Lucknow, Uttar Pradesh 226003, India<br />Phone: +91 92784 03522<br />Email: support@billspay24x7.com</p>
            </div>
          </div>
        )}

        {/* Modal: Privacy */}
        {activeModal === 'privacy' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, marginBottom: '2px' }}>Privacy Policy</h3>
            <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginBottom: '18px' }}>Last updated: 01 January 2026</div>
            <div style={{ fontSize: '13px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '50vh', overflowY: 'auto' }}>
              <p><strong>1. Introduction</strong><br />BILLSPAY TECHNOLOGIES PRIVATE LIMITED respects your privacy and is committed to protecting your personal data. This Privacy Policy describes how we collect, use, store and share information when you use our website, services, APIs and mobile applications.</p>
              <p><strong>2. Information We Collect</strong><br />We collect: personal identification data (name, email, phone, business address), KYC documents as required by RBI, financial transaction data for settlements, and browser logs.</p>
              <p><strong>3. Data Security</strong><br />We implement PCI-DSS Level 1, ISO 27001 and RBI-compliant security measures. All data is encrypted in transit and at rest.</p>
            </div>
          </div>
        )}

        {/* Modal: Terms */}
        {activeModal === 'terms' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, marginBottom: '2px' }}>Terms of Service</h3>
            <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginBottom: '18px' }}>Effective from: 01 January 2026</div>
            <div style={{ fontSize: '13px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '50vh', overflowY: 'auto' }}>
              <p><strong>1. Acceptance</strong><br />By accessing or using BillsPay24X7✓ services, website, APIs or applications, you agree to be bound by these Terms of Service.</p>
              <p><strong>2. Service Usage</strong><br />You agree to use our Services only for lawful purposes. Businesses must complete KYC verification before processing live transactions.</p>
              <p><strong>3. Governing Law</strong><br />These Terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of courts in Lucknow, Uttar Pradesh.</p>
            </div>
          </div>
        )}

        {/* Modal: Refund */}
        {activeModal === 'refund' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, marginBottom: '2px' }}>Refund & Cancellation Policy</h3>
            <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginBottom: '18px' }}>Last updated: 01 January 2026</div>
            <div style={{ fontSize: '13px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '50vh', overflowY: 'auto' }}>
              <p><strong>1. Fintech Services</strong><br />Failed transactions are automatically reversed within T+1 to T+3 working days depending on the payment mode.</p>
              <p><strong>2. Travel Bookings</strong><br />Cancellation and refund policies vary by airline, hotel, bus operator and train class. Flight cancellations incur airline fees plus a ₹250 service charge per passenger.</p>
              <p><strong>3. IT Software Services</strong><br />If a custom project has not commenced, 100% refund of advance minus a 5% administrative fee. If work has begun, refund is calculated based on completed milestones.</p>
            </div>
          </div>
        )}

        {/* Modal: Careers */}
        {activeModal === 'careers' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, marginBottom: '2px' }}>Join BillsPay24X7✓</h3>
            <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginBottom: '18px' }}>Build India's fintech & travel infrastructure</div>
            <div style={{ fontSize: '13px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '50vh', overflowY: 'auto' }}>
              <p><strong>Why Work With Us</strong><br />We are a fast-growing team based in Lucknow, UP, solving hard problems. We offer competitive salaries, hybrid work models, and rapid learning curves.</p>
              <p><strong>Current Openings (Lucknow-based)</strong></p>
              <p>
                <strong>Software Engineer — Backend (Node.js / Python)</strong><br />
                Experience: 2–5 years<br />
                Build high-performance APIs for payment processing and travel bookings.
              </p>
              <p>
                <strong>Software Engineer — Frontend (React / Next.js)</strong><br />
                Experience: 2–5 years<br />
                Design and build merchant dashboards, consumer portals and interactive tools.
              </p>
              <p>
                <strong>How to Apply</strong><br />
                Send your resume and a short note to <a href="mailto:support@billspay24x7.com">support@billspay24x7.com</a> with the subject "Careers".
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
