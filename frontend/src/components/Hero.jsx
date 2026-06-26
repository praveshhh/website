import React, { useState, useRef } from 'react';
import { Shield, Sparkles, Zap, Smartphone, CheckCircle, Send, ArrowRight, ArrowLeftRight, Phone, Mail, MapPin, Globe, Star, Laptop, Plane, Building, DollarSign, Calendar, MessageSquare } from 'lucide-react';
import axios from 'axios';

export default function Hero({ onOpenAuth, backendUrl }) {
  // Contact form state
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [contactStatus, setContactStatus] = useState({ success: false, error: null, loading: false });

  // Solutions active tab ('fintech', 'banking', 'travel', 'it')
  const [activeTab, setActiveTab] = useState('fintech');

  // How it works active step (0 to 6)
  const [activeStep, setActiveStep] = useState(0);

  // 3D Card Hover state
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
    
    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = -((y - centerY) / centerY) * 15;
    
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    card.style.setProperty('--x', `${glareX}%`);
    card.style.setProperty('--y', `${glareY}%`);

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

    // Validate inputs
    if (!contactData.firstName.trim() || !contactData.lastName.trim() || !contactData.email.trim() || !contactData.phone.trim() || !contactData.message.trim()) {
      setContactStatus({ success: false, error: 'Please fill in all required fields.', loading: false });
      return;
    }

    const payload = {
      name: `${contactData.firstName} ${contactData.lastName}`.trim(),
      email: contactData.email,
      subject: contactData.subject || "General Enquiry",
      message: `Phone/WhatsApp: ${contactData.phone}\n\n${contactData.message}`
    };

    try {
      await axios.post(`${backendUrl}/api/contact`, payload);
      setContactStatus({ success: true, error: null, loading: false });
      setContactData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to submit enquiry. Please try again.';
      setContactStatus({ success: false, error: errMsg, loading: false });
    }
  };

  // Solutions data structure mapping 4 tabs
  const tabInfo = {
    fintech: {
      title: 'BillsPay24X7✓ — Payment Infrastructure',
      chip: '💳 Fintech & Payment Solutions',
      desc: 'Accept payments via UPI, Cards, Netbanking & Wallets. T+1 settlement. 0.17% MDR. 80+ bank partners. White-label checkout. REST API ready.',
      stats: [
        { label: 'UPI MDR', val: '0.17%' },
        { label: 'Settlement', val: 'T+1' },
        { label: 'Uptime', val: '99.9%' },
        { label: 'Bank Partners', val: '80+' }
      ],
      cards: [
        {
          title: 'Payment Gateway',
          tag: 'Full-Stack',
          desc: 'Accept UPI, credit/debit cards, netbanking & wallets. T+1 settlement, 0.17% MDR, white-label checkout, SDK & REST API. Powered by Jio Payment & Cashfree.',
          feats: [
            'UPI Collection — 0.17% MDR (best rate in India)',
            'Cards — Visa, Mastercard, RuPay, Amex',
            'Netbanking — 80+ bank partners',
            'Wallets — Paytm, PhonePe, Amazon Pay',
            'T+1 settlement (next business day)',
            'White-label checkout page & REST API SDK'
          ]
        },
        {
          title: 'UPI Collections',
          tag: 'Instant Credit',
          desc: 'Dynamic QR, payment links, UPI AutoPay mandates & intent flow. India\'s fastest growing payment method — own your complete UPI stack with BillsPay24X7✓.',
          feats: [
            'Dynamic QR code generated per transaction',
            'UPI payment links via WhatsApp / SMS',
            'UPI AutoPay — recurring mandate management',
            'Intent flow for mobile-first checkout',
            'Real-time webhook payment notifications',
            'Reconciliation dashboard + CSV export'
          ]
        },
        {
          title: 'Virtual Accounts',
          tag: 'RBI Compliant',
          desc: 'Dedicated virtual bank accounts per merchant or per transaction. Auto fund routing, real-time credit detection via IMPS/NEFT/RTGS & regulatory segregation.',
          feats: [
            'Dedicated IFSC + account per merchant',
            'Auto credit detection — IMPS/NEFT/RTGS',
            'Real-time webhook on every fund credit',
            'Bulk virtual account creation via API',
            'RBI-compliant fund segregation',
            'Custom settlement rules per product category'
          ]
        },
        {
          title: 'Payout API',
          tag: 'Real-time 24×7',
          desc: 'Send money to any bank account, UPI ID, or wallet instantly. Bulk payouts for salary, vendors, cashbacks & refunds — all via BillsPay24X7✓ REST API.',
          feats: [
            'Bank transfer — IMPS/NEFT/RTGS via API',
            'UPI Payout — send to any UPI ID instantly',
            'Bulk payout via CSV upload or API batch',
            'Wallet credit — Paytm, PhonePe & more',
            '24×7 real-time payout processing',
            'Status webhooks & full reconciliation report'
          ]
        }
      ]
    },
    banking: {
      title: 'BillsPay24X7✓ — Financial Inclusion Services',
      chip: '🏦 Banking & Financial Inclusion',
      desc: 'BBPS (220+ billers) · AEPS (Aadhaar banking) · DMT (money transfer) · Mobile Recharge — complete last-mile banking for India\'s 1.4 billion people.',
      stats: [
        { label: 'BBPS Billers', val: '220+' },
        { label: 'Certified', val: 'NPCI' },
        { label: 'AEPS Daily', val: '₹10K' },
        { label: 'Processing', val: '24×7' }
      ],
      cards: [
        {
          title: 'BBPS — Bill Payments',
          tag: '220+ Billers',
          desc: 'Bharat Bill Payment System via BillsPay24X7✓. Pay electricity, gas, water, broadband, insurance, DTH & loan EMIs in one click with instant confirmation.',
          feats: [
            'Electricity — UPPCL, MSEDCL, BESCOM & 80+ boards',
            'Gas (PNG) & Water utility bills',
            'DTH & Cable — Tata Play, Airtel, Dish TV',
            'Loan EMI payments — NBFCs & MFIs',
            'Insurance premium payments',
            'Instant biller fetch & bill confirmation'
          ]
        },
        {
          title: 'AEPS Services',
          tag: 'Last-Mile Banking',
          desc: 'Aadhaar Enabled Payment System — cash withdrawal, balance inquiry & fund transfer using only fingerprint. No card, no PIN needed. Enable last-mile banking.',
          feats: [
            'Cash Withdrawal up to ₹10,000/day via Aadhaar',
            'Balance Inquiry — real-time bank balance check',
            'Mini Statement — last 5 transactions',
            'Aadhaar to Aadhaar fund transfer',
            'Biometric devices — Morpho, Mantra, Startek',
            'Commission per transaction for CSP agents'
          ]
        },
        {
          title: 'DMT — Money Transfer',
          tag: 'Instant Transfer',
          desc: 'Domestic Money Transfer for migrant workers & rural customers. Cash-in at any BillsPay24X7✓ agent, instant IMPS credit to any bank account across India 24×7.',
          feats: [
            'Send up to ₹25,000/transaction · ₹1L/month',
            'Sender KYC via Aadhaar OTP verification',
            'Beneficiary management — save & reuse',
            'IMPS real-time credit 24×7 all year',
            'RBI-compliant transaction limits',
            'Distributor → Retailer hierarchy & commission'
          ]
        },
        {
          title: 'Mobile Recharge',
          tag: 'Instant Commission',
          desc: 'Instant mobile & DTH recharge for all Indian telecom operators via BillsPay24X7✓. Earn retailer margin on every prepaid, postpaid, DTH, FASTag & data card transaction.',
          feats: [
            'Prepaid — Jio, Airtel, Vi, BSNL, MTNL',
            'Postpaid bill payment with e-receipt',
            'DTH — Tata Play, Airtel, Dish, Sun Direct',
            'Data card & FASTag recharge',
            'Operator plan fetch with offers & validity',
            'Instant commission credit per transaction'
          ]
        }
      ]
    },
    travel: {
      title: 'BillsPay24X7✓ — Flight · Hotel · Bus · Train',
      chip: '✈️ Travel Booking Solutions',
      desc: 'GDS-powered flights (500+ airlines) · 1M+ hotels globally · 1000+ bus operators · IRCTC trains — complete B2B white-label travel booking with markup engine.',
      stats: [
        { label: 'Airlines', val: '500+' },
        { label: 'Hotels', val: '1M+' },
        { label: 'Bus Ops', val: '1000+' },
        { label: 'Train API', val: 'IRCTC' }
      ],
      cards: [
        {
          title: 'Flight Booking',
          tag: '500+ Airlines',
          desc: 'Full-stack flight engine for travel agents & OTAs via BillsPay24X7✓. Real-time availability, competitive fares, instant PNR confirmation & B2B markup engine.',
          feats: [
            'Domestic flights — all major Indian carriers',
            'International — 500+ global airlines via GDS',
            'Low-cost carriers with ancillary upsells',
            'Multi-city & round-trip booking support',
            'PNR management & seat selection API',
            'B2B markup engine — set your own margins'
          ]
        },
        {
          title: 'Hotel Booking',
          tag: 'Best Rate',
          desc: 'Access 1 million+ hotel properties across India & worldwide via BillsPay24X7✓. Instant confirmation, best-rate guarantee, flexible cancellation & B2B markup engine.',
          feats: [
            '1M+ properties in 190+ countries',
            'Best Rate Guarantee — always competitive',
            'Instant or Request-based confirmation',
            'Room type filters, amenities & star rating',
            'B2B markup engine for agent commission',
            'Flexible cancellation & amendment support'
          ]
        },
        {
          title: 'Bus Booking',
          tag: 'Live Tracking',
          desc: '1000+ bus operators across India via BillsPay24X7✓. Seat maps, live GPS tracking, M-Ticket (no print needed) & boarding point selection — all in your branded portal.',
          feats: [
            '1000+ operators — AC, Sleeper, Semi-sleeper',
            'Real-time seat availability & selection',
            'Live GPS bus tracking for booked journeys',
            'M-Ticket (mobile ticket) — no print needed',
            'Boarding & dropping point selection',
            'B2B commission per booking, multi-level'
          ]
        },
        {
          title: 'Train Booking',
          tag: 'IRCTC Integrated',
          desc: 'IRCTC-integrated train booking via BillsPay24X7✓. Real-time seat availability, PNR status, Tatkal booking & e-ticket generation — full Indian Railways.',
          feats: [
            'IRCTC API — all train types & routes',
            'Real-time seat availability across all classes',
            'Tatkal & Premium Tatkal booking support',
            'Live PNR status & passenger records',
            'E-ticket generation — print & mobile view',
            'Cancellation & refund automation'
          ]
        }
      ]
    },
    it: {
      title: 'BillsPay24X7✓ — Complete IT Software Solutions',
      chip: '💻 IT Software Development',
      desc: 'Web Development · Mobile Apps · AI Automation · Cloud & DevOps · FinTech Platforms · CMS · Custom Software — 500+ merchants · 15+ countries · 10+ years of excellence.',
      stats: [
        { label: 'Years', val: '10+' },
        { label: 'Clients', val: '500+' },
        { label: 'Deployments', val: '1000+' },
        { label: 'Countries', val: '15+' }
      ],
      cards: [
        {
          title: 'Web Development',
          tag: 'Full-Stack',
          desc: 'Modern, production-grade web apps by BillsPay24X7✓ — from fintech portals to complex SaaS platforms. Clean architecture, SSR/SSG, REST & GraphQL APIs.',
          feats: [
            'React.js & Next.js (SSR/SSG) frontend',
            'Node.js, Python (Django/FastAPI) backend',
            'Progressive Web Apps (PWA) with offline support',
            'REST & GraphQL API architecture',
            'PostgreSQL, MongoDB, Redis integration',
            'Payment gateway & banking API integration'
          ]
        },
        {
          title: 'Mobile App Dev',
          tag: 'iOS & Android',
          desc: 'Cross-platform native-feel mobile apps by BillsPay24X7✓. Fintech-grade UI/UX, biometric auth, payment integration, push notifications & App / Play Store publishing.',
          feats: [
            'Flutter — single codebase, native performance',
            'React Native for web-first teams',
            'Biometric login — fingerprint & Face ID',
            'UPI, payment gateway & BBPS integration',
            'Push notifications & in-app messaging',
            'App Store & Play Store publishing support'
          ]
        },
        {
          title: 'FinTech Platforms',
          tag: 'White-Label',
          desc: 'Launch your branded fintech platform in 72 hours via BillsPay24X7✓. Multi-level distributor hierarchy, automated commission engine & real-time transaction dashboard.',
          feats: [
            'White-label — your brand, your domain',
            'Admin → Distributor → Retailer hierarchy',
            'Automated commission & incentive engine',
            'Merchant onboarding & KYC workflow',
            'Real-time transaction dashboard & reports',
            'BBPS, AEPS, DMT, Recharge all bundled'
          ]
        },
        {
          title: 'Cloud & DevOps',
          tag: '99.9% Uptime SLA',
          desc: 'Enterprise cloud infrastructure by BillsPay24X7✓ — AWS, Azure or GCP. CI/CD pipelines, Docker & Kubernetes, auto-scaling, 24×7 monitoring & disaster recovery.',
          feats: [
            'AWS, Azure & GCP setup & management',
            'Docker & Kubernetes containerization',
            'CI/CD — GitHub Actions, Jenkins pipelines',
            'Auto-scaling for traffic spikes',
            '24×7 uptime monitoring & alerting',
            'Database backup, DR & security audits'
          ]
        }
      ]
    }
  };

  // How it works 7 steps details
  const steps = [
    {
      n: '01',
      t: 'Requirement Analysis',
      d: 'We understand your business model, target customers, transaction volume, and service requirements through a free, no-pressure discovery call. We match you to the right BillsPay24X7✓ solutions — not generic bundles.',
      tags: ['Fintech Startups', 'E-commerce', 'Travel Companies', 'Aggregators', 'Enterprises']
    },
    {
      n: '02',
      t: 'Solution Design',
      d: 'Based on your requirements, we design the best combination of BillsPay24X7✓ payment, banking, travel, and IT solutions. Every decision is deliberate — tailored to your market, your model, and your users.',
      tags: ['Payment Gateway', 'Banking APIs', 'Travel Engine', 'IT Software', 'Custom Platform']
    },
    {
      n: '03',
      t: 'Documentation & Compliance',
      d: 'Our team handles the entire compliance journey — business KYC, merchant onboarding, bank verification, and regulatory review. You focus on building; we handle the paperwork.',
      tags: ['Business KYC', 'Merchant Onboarding', 'Bank Verification', 'Compliance Review']
    },
    {
      n: '04',
      t: 'Technology Setup',
      d: 'We configure your complete technical infrastructure: API keys, sandbox environment, merchant dashboard, banking integrations, reporting panel, and user management — all production-ready.',
      tags: ['API Keys & Sandbox', 'Merchant Dashboard', 'Banking Integration', 'Reporting Panel']
    },
    {
      n: '05',
      t: 'Integration & Development',
      d: 'Our BillsPay24X7✓ developers integrate every solution into your existing website, mobile app, or platform using your preferred tech stack — clean code, full documentation, knowledge transfer.',
      tags: ['Website Integration', 'Mobile App', 'Fintech Portal', 'SaaS Platform']
    },
    {
      n: '06',
      t: 'Testing & UAT',
      d: 'Complete end-to-end testing across every service in sandbox. Pay-in, payouts, BBPS, recharge, travel booking, and verification flows — all validated before a single real rupee moves.',
      tags: ['Payment Flow Testing', 'Payout Validation', 'BBPS Testing', 'Travel API UAT']
    },
    {
      n: '07',
      t: 'Go Live & Scale',
      d: 'Your platform is live — accepting real payments, processing payouts, and serving customers via BillsPay24X7✓. We stay as your 24×7 growth partner with monitoring and roadmap planning.',
      tags: ['Accept Payments', 'Process Payouts', 'Travel Bookings', 'Scale Operations']
    }
  ];

  // Why Us cards
  const whyUs = [
    { icon: '⚡', title: 'T+1 Settlement', desc: 'Next-day settlements powered by Jio Payment & Cashfree. Your cash flow accelerated every business day.' },
    { icon: '🔐', title: 'Bank-Grade Security', desc: 'PCI-DSS Level 1, 256-bit SSL encryption, 2FA & full RBI-compliant infrastructure always active.' },
    { icon: '🛠️', title: 'Full-Stack IT', desc: 'Payment APIs → mobile apps → cloud DevOps → travel engines — BillsPay24X7✓ delivers it all.' },
    { icon: '📊', title: 'Real-Time Analytics', desc: 'Live dashboards with transaction insights, reconciliation tools & business intelligence reports.' },
    { icon: '🤝', title: '24×7 Dedicated Support', desc: 'WhatsApp, phone & email support. Your dedicated account manager always reachable, always accountable.' },
    { icon: '🚀', title: 'Rapid Deployment', desc: 'Go live in days, not months. Sandbox-to-production in as little as 72 hours — guaranteed.' }
  ];

  // Business Models
  const businessModels = [
    { icon: '🏪', title: 'Retail & Kirana', desc: 'AEPS, BBPS, DMT & recharge for neighbourhood payment outlets across India.' },
    { icon: '🏢', title: 'B2B Aggregators', desc: 'White-label platforms with multi-level retailer & distributor hierarchy.' },
    { icon: '🛒', title: 'E-commerce', desc: 'Payment gateway + payout + GST invoicing for online retail businesses.' },
    { icon: '✈️', title: 'Travel Agencies', desc: 'Complete travel booking — flight, hotel, bus & train with B2B markup.' },
    { icon: '💊', title: 'Healthcare', desc: 'Patient billing, subscription plans & insurance payment management.' },
    { icon: '🎓', title: 'Education', desc: 'Fee collection, instalment billing & automated payment reminders.' },
    { icon: '🏗️', title: 'SaaS Startups', desc: 'Recurring billing, usage-based pricing & developer-friendly APIs.' },
    { icon: '🏛️', title: 'Enterprise', desc: 'Custom IT solutions, ERP integration & dedicated cloud infrastructure.' }
  ];

  // Testimonials
  const testimonials = [
    {
      stars: '★★★★★',
      quote: '"BillsPay24X7✓ helped us integrate UPI, BBPS, and our payment gateway within days. Their tech team is exceptional and 24×7 support actually means it — always available, always responsive."',
      initials: 'RK',
      name: 'Rahul Kumar',
      role: 'Founder, PayEasy Fintech · Lucknow'
    },
    {
      stars: '★★★★★',
      quote: '"We launched our complete travel booking platform — flight, hotel & bus — in under 2 weeks via BillsPay24X7✓. The integration is seamless and the commission management system is exactly what we needed."',
      initials: 'PS',
      name: 'Priya Sharma',
      role: 'CEO, TravelNow India · Delhi'
    },
    {
      stars: '★★★★★',
      quote: '"BillsPay24X7✓ white-label fintech platform with multi-level distributor hierarchy is outstanding. T+1 settlements have completely transformed our retailer relationships and cash flow."',
      initials: 'AM',
      name: 'Amit Mishra',
      role: 'MD, DigiPay Solutions · Kanpur'
    }
  ];

  // Smooth scroll helper
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ paddingTop: '80px', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 8%',
        background: 'radial-gradient(circle at 10% 20%, rgba(94, 92, 230, 0.03) 0%, transparent 60%), radial-gradient(circle at 95% 85%, rgba(0, 122, 255, 0.02) 0%, transparent 60%)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.04)'
      }}>
        <div className="glow-overlay-green" style={{ top: '-10%', left: '-5%' }} />
        <div className="glow-overlay-blue" style={{ bottom: '5%', right: '5%' }} />

        <div style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '50px',
          alignItems: 'center'
        }} className="grid-responsive-hero">
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
              India's Complete Fintech · IT · Travel Platform
            </div>

            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 62px)',
              lineHeight: '1.05',
              letterSpacing: '-0.03em',
              marginBottom: '24px',
              fontWeight: 900,
              color: 'var(--text-primary)'
            }}>
              Make Payment,<br />
              <span className="text-gradient-green">Build Growth</span><br />
              <span style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 800, display: 'block', marginTop: '12px' }} className="text-gradient-blue">
                Fintech · IT Software · Travel
              </span>
            </h1>

            <p style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              maxWidth: '560px',
              marginBottom: '38px',
              fontWeight: 400
            }}>
              Payment Gateway · BBPS · AEPS · DMT · UPI · Payout API · Flight · Hotel · Bus · Train · Custom Software · Cloud & DevOps — India's complete business platform. T+1 Settlement. RBI Compliant.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button onClick={() => scrollToId('contact')} className="btn-cred-neon" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                🚀 Free Consultation <ArrowRight size={14} />
              </button>
              <button onClick={() => scrollToId('solutions')} className="btn-cred-outline">
                Explore All Services ↓
              </button>
            </div>

            {/* Statistics Row */}
            <div style={{
              marginTop: '56px',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              maxWidth: '560px',
              borderTop: '1px solid rgba(0, 0, 0, 0.05)',
              paddingTop: '28px'
            }} className="grid-responsive-stats">
              <div>
                <h3 style={{ fontSize: '24px', color: 'var(--text-primary)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>500+</h3>
                <p style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Merchants</p>
              </div>
              <div>
                <h3 style={{ fontSize: '24px', color: 'var(--accent-periwinkle)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>24×7</h3>
                <p style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Support</p>
              </div>
              <div>
                <h3 style={{ fontSize: '24px', color: 'var(--text-primary)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>99.9%</h3>
                <p style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Uptime</p>
              </div>
              <div>
                <h3 style={{ fontSize: '24px', color: 'var(--accent-periwinkle)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>T+1</h3>
                <p style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Settlement</p>
              </div>
            </div>
          </div>

          {/* Right Hero Visual: 3D stacked cards */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative'
          }} className="hero-visual-container">
            {/* Subtle Float Metrics alongside the Card Stack */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'absolute',
              left: '-20px',
              top: '40px',
              zIndex: 10
            }} className="floating-hero-metrics">
              {/* Metric 1 */}
              <div className="card-cred" style={{ padding: '12px 18px', display: 'flex', flexDirection: 'column', minHeight: 'auto', background: 'rgba(255, 255, 255, 0.75)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', borderRadius: '14px', width: '160px' }}>
                <span style={{ fontSize: '9px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.03em' }}>Today's UPI Vol</span>
                <span style={{ fontSize: '16px', color: 'var(--accent-green)', fontWeight: 800, fontFamily: 'var(--font-mono)', marginTop: '2px' }}>₹12.4 Lakhs</span>
                <span style={{ fontSize: '8px', color: 'var(--text-muted)', marginTop: '2px' }}>Live Processing</span>
              </div>
              {/* Metric 2 */}
              <div className="card-cred" style={{ padding: '12px 18px', display: 'flex', flexDirection: 'column', minHeight: 'auto', background: 'rgba(255, 255, 255, 0.75)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', borderRadius: '14px', width: '160px' }}>
                <span style={{ fontSize: '9px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.03em' }}>Settlement Cycle</span>
                <span style={{ fontSize: '16px', color: 'var(--accent-periwinkle)', fontWeight: 800, fontFamily: 'var(--font-mono)', marginTop: '2px' }}>T+1 Payouts</span>
                <span style={{ fontSize: '8px', color: 'var(--text-muted)', marginTop: '2px' }}>RBI Compliant</span>
              </div>
            </div>

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
                <div className="card-glare" />

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
                    BillsPay24X7✓
                  </span>
                  <Shield size={20} color="#FFFFFF" style={{ opacity: 0.9 }} />
                </div>

                {/* Microchip */}
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
                    merchant gateway status
                  </p>
                  <h4 style={{ fontSize: '18px', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '1.5px', marginBottom: '18px' }}>
                    •••• •••• •••• 24X7
                  </h4>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>settlements</span>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fff' }}>T+1 Standard</span>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>MDR rate</span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#FFF' }}>0.17% UPI</span>
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

      {/* 2. INFINITE TICKER BAR */}
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
              <div key={groupIndex} style={{ display: 'inline-flex', gap: '48px', alignItems: 'center', paddingRight: '48px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', letterSpacing: '0.03em' }}>
                  <CheckCircle size={13} color="var(--accent-periwinkle)" /> NPCI Certified — BBPS & AEPS
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', letterSpacing: '0.03em' }}>
                  <CheckCircle size={13} color="var(--accent-periwinkle)" /> RBI Registered Entity
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', letterSpacing: '0.03em' }}>
                  <CheckCircle size={13} color="var(--accent-periwinkle)" /> PCI-DSS Level 1 Compliant
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', letterSpacing: '0.03em' }}>
                  <CheckCircle size={13} color="var(--accent-periwinkle)" /> T+1 Settlement Cycle
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', letterSpacing: '0.03em' }}>
                  <CheckCircle size={13} color="var(--accent-periwinkle)" /> ISO 27001 Certified
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', letterSpacing: '0.03em' }}>
                  <CheckCircle size={13} color="var(--accent-periwinkle)" /> 500+ Active Merchants
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', letterSpacing: '0.03em' }}>
                  <CheckCircle size={13} color="var(--accent-periwinkle)" /> GDS Flight Integration
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', letterSpacing: '0.03em' }}>
                  <CheckCircle size={13} color="var(--accent-periwinkle)" /> IRCTC Train Booking API
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', letterSpacing: '0.03em' }}>
                  <CheckCircle size={13} color="var(--accent-periwinkle)" /> 1M+ Hotels Worldwide
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', letterSpacing: '0.03em' }}>
                  <CheckCircle size={13} color="var(--accent-periwinkle)" /> 1000+ Bus Operators
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', letterSpacing: '0.03em' }}>
                  <CheckCircle size={13} color="var(--accent-periwinkle)" /> Custom IT Software Development
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', letterSpacing: '0.03em' }}>
                  <CheckCircle size={13} color="var(--accent-periwinkle)" /> Jio Payment Partner
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', letterSpacing: '0.03em' }}>
                  <CheckCircle size={13} color="var(--accent-periwinkle)" /> Cashfree Payments Partner
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SOLUTIONS TAB SECTION */}
      <section id="solutions" style={{
        padding: '100px 8%',
        background: 'rgba(255,255,255,0.2)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-periwinkle)' }}>
              our solutions
            </span>
            <h2 style={{ fontSize: '38px', marginTop: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>Everything Your Business Needs</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '12px', maxWidth: '640px', margin: '12px auto 0', lineHeight: '1.6' }}>
              Fintech payments · Banking services · Travel booking · IT software — India's most complete business platform with T+1 settlement & 24×7 support.
            </p>

            {/* Toggle Buttons */}
            <div style={{
              display: 'inline-flex',
              padding: '6px',
              background: 'rgba(0, 0, 0, 0.03)',
              borderRadius: '50px',
              border: '1px solid rgba(0,0,0,0.05)',
              marginTop: '36px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '4px'
            }} className="tabs-container">
              {[
                { key: 'fintech', label: '💳 Fintech & Payments' },
                { key: 'banking', label: '🏦 Banking Services' },
                { key: 'travel', label: '✈️ Travel Solutions' },
                { key: 'it', label: '💻 IT Software' }
              ].map((tab) => (
                <button 
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    padding: '10px 24px',
                    background: activeTab === tab.key ? '#FFFFFF' : 'transparent',
                    color: activeTab === tab.key ? 'var(--text-primary)' : 'var(--text-secondary)',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: activeTab === tab.key ? '0 4px 12px rgba(0,0,0,0.04)' : 'none'
                  }}
                  className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Tab Panel */}
          <div style={{ marginTop: '20px' }}>
            {/* Tab Header sub-banner */}
            <div className="card-cred" style={{
              padding: '40px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(240, 243, 248, 0.7) 100%)',
              border: '1px solid var(--border-secondary)',
              borderRadius: '24px',
              marginBottom: '40px',
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '40px',
              alignItems: 'center'
            }} className="grid-responsive-subbanner">
              <div>
                <span className="btn-cred-outline" style={{ pointerEvents: 'none', padding: '4px 14px', fontSize: '11px', marginBottom: '18px', background: 'rgba(94, 92, 230, 0.05)', borderColor: 'rgba(94, 92, 230, 0.2)', color: 'var(--accent-periwinkle)' }}>
                  {tabInfo[activeTab].chip}
                </span>
                <h3 style={{ fontSize: '26px', fontWeight: 800, marginTop: '8px', marginBottom: '12px' }}>{tabInfo[activeTab].title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>{tabInfo[activeTab].desc}</p>
                <button onClick={() => scrollToId('contact')} className="btn-cred-neon">
                  🚀 Get Started with BillsPay24X7✓
                </button>
              </div>

              {/* Sub-banner stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px',
                background: 'rgba(255, 255, 255, 0.5)',
                border: '1px solid rgba(255,255,255,0.7)',
                borderRadius: '16px',
                padding: '24px'
              }}>
                {tabInfo[activeTab].stats.map((stat, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{stat.val}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom layout if tab is IT Software */}
            {activeTab === 'it' && (
              <>
                {/* IT Portfolio section */}
                <div style={{ marginBottom: '40px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-periwinkle)', marginBottom: '20px' }}>
                    🗂️ BillsPay24X7✓ IT Portfolio
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '20px'
                  }}>
                    {[
                      { title: 'Fintech Payment Platform', tag: 'Fintech · Development', fallback: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=320&h=160&fit=crop&q=70' },
                      { title: 'Smart KYC & Identity Platform', tag: 'KYC · Verification', fallback: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=320&h=160&fit=crop&q=70' },
                      { title: 'Automated Server Deployment', tag: 'Automation · DevOps', fallback: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=320&h=160&fit=crop&q=70' },
                      { title: 'ATM & Kiosk Software System', tag: 'ATM · Security', fallback: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=320&h=160&fit=crop&q=70' }
                    ].map((item, idx) => (
                      <div key={idx} className="card-cred" style={{ padding: 0, height: '160px', borderRadius: '16px', position: 'relative', cursor: 'default' }}>
                        <img src={item.fallback} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(13, 24, 64, 0.85) 0%, rgba(13, 24, 64, 0.2) 70%)',
                          borderRadius: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          padding: '16px'
                        }}>
                          <span style={{ fontSize: '9px', background: 'var(--accent-periwinkle)', color: '#FFF', padding: '2px 8px', borderRadius: '4px', alignSelf: 'flex-start', fontWeight: 700, letterSpacing: '0.03em', textTransform: 'uppercase', marginBottom: '6px' }}>{item.tag}</span>
                          <span style={{ fontSize: '13.5px', color: '#FFF', fontWeight: 800 }}>{item.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* IT Offerings Grid */}
                <div style={{ marginBottom: '40px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-periwinkle)', marginBottom: '20px' }}>
                    🛠️ BillsPay24X7✓ IT Service Offerings
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '16px'
                  }}>
                    {[
                      { icon: '⚙️', name: 'Platform Engineering', sub: 'Web apps, backend APIs, domain-driven architecture, microservices' },
                      { icon: '📱', name: 'Mobile App Studio', sub: 'Flutter & React Native — iOS & Android, native-feel performance' },
                      { icon: '🤖', name: 'AI Automation Lab', sub: 'Intelligent workflows, ML models, recommendation engines' },
                      { icon: '☁️', name: 'Cloud & DevOps', sub: 'AWS/Azure/GCP, Docker, Kubernetes, CI/CD, 99.9% SLA' },
                      { icon: '💳', name: 'FinTech Platforms', sub: 'Payment gateways, billing systems, mobile banking, KYC' },
                      { icon: '🖥️', name: 'CMS Development', sub: 'WordPress, Shopify, Webflow, Drupal, Headless CMS' },
                      { icon: '🔐', name: 'Cybersecurity', sub: 'Security audits, penetration testing, PCI-DSS compliance' },
                      { icon: '📊', name: 'Data Engineering', sub: 'PostgreSQL, MongoDB, Redis, real-time analytics pipelines' },
                      { icon: '🧪', name: 'Product Prototyping', sub: 'Rapid MVPs, UX wireframes, technical blueprints, discovery sprints' }
                    ].map((svc, idx) => (
                      <div key={idx} className="card-cred" style={{ padding: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start', minHeight: 'auto' }}>
                        <span style={{ fontSize: '24px' }}>{svc.icon}</span>
                        <div>
                          <h5 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>{svc.name}</h5>
                          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{svc.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Solutions Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {tabInfo[activeTab].cards.map((sol, index) => (
                <div key={index} className="card-cred" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ fontSize: '18px', color: 'var(--text-primary)', fontWeight: 800 }}>{sol.title}</span>
                      <span className="btn-cred-outline" style={{ pointerEvents: 'none', padding: '3px 10px', fontSize: '10px', background: 'rgba(0,0,0,0.02)', color: 'var(--text-secondary)' }}>
                        {sol.tag}
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '18px' }}>{sol.desc}</p>
                    
                    {/* Bullet lists */}
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {sol.feats.map((feat, idx) => (
                        <li key={idx} style={{ display: 'flex', gap: '8px', fontSize: '12px', color: 'var(--text-primary)', marginBottom: '8px', alignItems: 'flex-start' }}>
                          <span style={{ color: 'var(--accent-periwinkle)', fontWeight: 'bold' }}>✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '16px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{sol.tag === 'Full-Stack' ? '0.17% MDR · T+1' : sol.tag === 'Last-Mile Banking' ? 'CSP Agent commission' : 'REST API Ready'}</span>
                    <button onClick={() => scrollToId('contact')} style={{ background: 'none', border: 'none', color: 'var(--accent-periwinkle)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      Explore <ArrowRight size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS (7 STEPS INTEGRATION) */}
      <section id="how-it-works" style={{
        padding: '100px 8%',
        background: 'rgba(255,255,255,0.4)',
        borderTop: '1px solid rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-periwinkle)' }}>
              our process
            </span>
            <h2 style={{ fontSize: '38px', marginTop: '12px', fontWeight: 800 }}>How We Onboard You</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '12px', maxWidth: '520px', margin: '12px auto 0' }}>
              A structured, transparent process — from discovery call to live platform in days, not months.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr',
            gap: '40px',
            alignItems: 'start'
          }} className="grid-responsive-process">
            {/* Clickable Steps list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`card-cred ${activeStep === idx ? 'active-step-card' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    cursor: 'pointer',
                    padding: '16px 24px',
                    minHeight: 'auto',
                    background: activeStep === idx ? 'rgba(255,255,255,0.95)' : 'var(--bg-card)',
                    borderColor: activeStep === idx ? 'var(--accent-periwinkle)' : 'var(--border-primary)',
                    boxShadow: activeStep === idx ? '0 10px 30px rgba(94, 92, 230, 0.08)' : '0 4px 12px rgba(0,0,0,0.01)'
                  }}
                >
                  <div style={{
                    fontSize: '20px',
                    fontWeight: 900,
                    fontFamily: 'var(--font-mono)',
                    color: activeStep === idx ? 'var(--accent-periwinkle)' : 'var(--text-muted)'
                  }}>{step.n}</div>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>{step.t}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{idx === 0 ? 'Free discovery call' : idx === 1 ? 'Tailored decision architectural design' : idx === 2 ? 'KYC, onboard validation' : idx === 3 ? 'API configs & integrations' : idx === 4 ? 'Dev stack deployment' : idx === 5 ? 'E2E sandbox validations' : 'Roadmap & monitoring scale'}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Step Details Panel */}
            <div className="card-cred" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
              border: '1.5px solid var(--border-secondary)',
              borderRadius: '24px',
              padding: '40px',
              minHeight: '380px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'sticky',
              top: '110px'
            }}>
              <div>
                <div style={{
                  fontSize: '72px',
                  fontWeight: 900,
                  fontFamily: 'var(--font-mono)',
                  color: 'rgba(94, 92, 230, 0.1)',
                  lineHeight: '1',
                  marginBottom: '16px'
                }}>{steps[activeStep].n}</div>
                
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
                  {steps[activeStep].t}
                </h3>
                
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '28px' }}>
                  {steps[activeStep].d}
                </p>
              </div>

              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '10px' }}>
                  Key elements verified
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {steps[activeStep].tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="btn-cred-outline"
                      style={{ 
                        padding: '4px 12px', 
                        fontSize: '11px', 
                        borderRadius: '6px', 
                        pointerEvents: 'none', 
                        background: 'rgba(255, 255, 255, 0.8)',
                        borderColor: 'rgba(0,0,0,0.06)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY US SECTION */}
      <section id="why-us" style={{
        padding: '100px 8%',
        background: 'rgba(255,255,255,0.2)',
        borderTop: '1px solid rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-periwinkle)' }}>
              why billspay24x7✓
            </span>
            <h2 style={{ fontSize: '38px', marginTop: '12px', fontWeight: 800 }}>The Smarter Business Platform</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '12px', maxWidth: '520px', margin: '12px auto 0' }}>
              Deep fintech expertise · complete IT development · travel booking · one brand · one platform · zero complexity.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {whyUs.map((w, idx) => (
              <div key={idx} className="card-cred" style={{ padding: '32px' }}>
                <span style={{ fontSize: '28px', display: 'block', marginBottom: '16px' }}>{w.icon}</span>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>{w.title}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BUSINESS MODELS (WHO WE BUILD FOR) */}
      <section id="models" style={{
        padding: '100px 8%',
        background: 'rgba(255,255,255,0.4)',
        borderTop: '1px solid rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-periwinkle)' }}>
              business models
            </span>
            <h2 style={{ fontSize: '38px', marginTop: '12px', fontWeight: 800 }}>Who We Build For</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '12px', maxWidth: '520px', margin: '12px auto 0' }}>
              BillsPay24X7✓ adapts to every business model — startup, aggregator, or enterprise scaling across India.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}>
            {businessModels.map((m, idx) => (
              <div key={idx} className="card-cred" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '180px' }}>
                <span style={{ fontSize: '24px' }}>{m.icon}</span>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>{m.title}</h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section id="testimonials" style={{
        padding: '100px 8%',
        background: 'rgba(255,255,255,0.2)',
        borderTop: '1px solid rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-periwinkle)' }}>
              client stories
            </span>
            <h2 style={{ fontSize: '38px', marginTop: '12px', fontWeight: 800 }}>Trusted by 500+ Merchants Across India</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {testimonials.map((t, idx) => (
              <div key={idx} className="card-cred" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ color: '#FCD34D', fontSize: '16px', marginBottom: '14px', letterSpacing: '2px' }}>{t.stars}</div>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '24px' }}>{t.quote}</p>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7F7DF4 0%, #5E5CE6 100%)',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>{t.initials}</div>
                  <div>
                    <h5 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>{t.name}</h5>
                    <p style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA BANNER */}
      <section style={{
        padding: '80px 8%',
        background: 'rgba(255,255,255,0.4)',
        borderTop: '1px solid rgba(0, 0, 0, 0.03)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(94, 92, 230, 0.03) 0%, rgba(0, 122, 255, 0.02) 100%)',
          border: '1px solid var(--border-secondary)',
          borderRadius: '24px',
          padding: '56px 40px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '14px' }}>Ready to Power Your Business with BillsPay24X7✓?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '580px', margin: '0 auto 32px', lineHeight: '1.6' }}>
            Join 500+ merchants across India. Free consultation. No commitments. Get started in 72 hours.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => scrollToId('contact')} className="btn-cred-neon">
              🚀 Book Free Consultation
            </button>
            <button onClick={onOpenAuth} className="btn-cred-outline" style={{ background: '#FFFFFF' }}>
              Create Account Free
            </button>
          </div>
        </div>
      </section>

      {/* 9. CONTACT US & ENQUIRY FORM */}
      <section id="contact" style={{
        padding: '100px 8%',
        background: 'rgba(255,255,255,0.2)'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '60px',
          alignItems: 'start'
        }} className="grid-responsive-contact">
          
          {/* Contact Details (Left) */}
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-periwinkle)' }}>
              get in touch
            </span>
            <h2 style={{ fontSize: '38px', marginTop: '12px', fontWeight: 800, marginBottom: '16px' }}>Let's Build Something Great Together</h2>
            <div style={{ width: '40px', height: '3px', background: 'var(--accent-periwinkle)', marginBottom: '24px', borderRadius: '2px' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8', marginBottom: '36px' }}>
              Whether you need a payment gateway, fintech platform, mobile app, travel engine or complete IT software — BillsPay24X7✓ is ready to turn your vision into reality.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {/* Phone */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(94, 92, 230, 0.04)', display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0 }}>
                  <Phone size={18} color="var(--accent-periwinkle)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '4px' }}>Phone / WhatsApp</h4>
                  <a href="tel:+919278403522" style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', display: 'block' }}>+91 92784 03522</a>
                  <a href="https://wa.me/919278403522" target="_blank" rel="noreferrer" style={{ fontSize: '12.5px', color: 'var(--accent-periwinkle)', fontWeight: 700, display: 'inline-block', marginTop: '2px' }}>Chat on WhatsApp →</a>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(94, 92, 230, 0.04)', display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0 }}>
                  <Mail size={18} color="var(--accent-periwinkle)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '4px' }}>Email</h4>
                  <a href="mailto:support@billspay24x7.com" style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', display: 'block' }}>support@billspay24x7.com</a>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Response within 2 hours</span>
                </div>
              </div>

              {/* Address */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(94, 92, 230, 0.04)', display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0 }}>
                  <MapPin size={18} color="var(--accent-periwinkle)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '4px' }}>Registered Office</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    PLOT NO-02, KHASRA NO-122, GRAM FARIDIPUR DUBAGGA,<br />
                    Lucknow Chowk, Lucknow, UP — 226003<br />
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>Mon–Sat: 9 AM – 7 PM IST</span>
                  </p>
                </div>
              </div>

              {/* Corporate Identity Box */}
              <div className="card-cred" style={{
                background: 'linear-gradient(135deg, rgba(27,45,107,0.02) 0%, rgba(27,45,107,0.06) 100%)',
                borderColor: 'rgba(94,92,230,0.08)',
                padding: '24px',
                borderRadius: '16px',
                minHeight: 'auto'
              }}>
                <h5 style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  BILLSPAY TECHNOLOGIES PRIVATE LIMITED
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>CIN:</strong> <span style={{ fontFamily: 'var(--font-mono)' }}>U63999UP2026PTC245490</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>Brand:</strong> <span>BillsPay24X7✓</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>Status:</strong> <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>RBI Registered Entity</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>Hours:</strong> <span>Mon–Sat 9AM–7PM IST · 24×7 Support</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact / Enquiry Form Card (Right) */}
          <div className="card-cred" style={{ padding: '36px', border: '1px solid var(--border-secondary)', background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)' }}>
            <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginBottom: '6px', fontWeight: 800 }}>Send Us a Message</h3>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '24px' }}>We'll respond within 2 hours during business hours.</p>

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
                <h4 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 800 }}>Message Sent!</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Thank you! We have received your message. Our team will contact you within 2 hours.
                  <br /><br />
                  <strong>Urgent?</strong> WhatsApp us at <a href="https://wa.me/919278403522" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-periwinkle)', fontWeight: 700 }}>+91 92784 03522</a>
                </p>
                <button 
                  onClick={() => setContactStatus({ success: false, error: null, loading: false })}
                  className="btn-cred-outline"
                  style={{ marginTop: '28px', padding: '8px 18px', fontSize: '11px' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group-cred">
                    <label htmlFor="cf-fn">First Name</label>
                    <input 
                      type="text" 
                      id="cf-fn" 
                      placeholder="Rahul"
                      className="form-control-cred"
                      value={contactData.firstName}
                      onChange={(e) => setContactData({...contactData, firstName: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="form-group-cred">
                    <label htmlFor="cf-ln">Last Name</label>
                    <input 
                      type="text" 
                      id="cf-ln" 
                      placeholder="Kumar"
                      className="form-control-cred"
                      value={contactData.lastName}
                      onChange={(e) => setContactData({...contactData, lastName: e.target.value})}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group-cred">
                  <label htmlFor="cf-em">Email Address</label>
                  <input 
                    type="email" 
                    id="cf-em" 
                    placeholder="rahul@company.com"
                    className="form-control-cred"
                    value={contactData.email}
                    onChange={(e) => setContactData({...contactData, email: e.target.value})}
                    required 
                  />
                </div>

                <div className="form-group-cred">
                  <label htmlFor="cf-ph">Phone Number</label>
                  <input 
                    type="tel" 
                    id="cf-ph" 
                    placeholder="+91 98765 43210"
                    className="form-control-cred"
                    value={contactData.phone}
                    onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                    required 
                  />
                </div>

                <div className="form-group-cred">
                  <label htmlFor="cf-int">I'm Interested In</label>
                  <select 
                    id="cf-int" 
                    className="form-control-cred"
                    value={contactData.subject}
                    onChange={(e) => setContactData({...contactData, subject: e.target.value})}
                    style={{ background: '#FFFFFF', appearance: 'auto' }}
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="Payment Gateway">Payment Gateway</option>
                    <option value="UPI / BBPS / AEPS">UPI / BBPS / AEPS</option>
                    <option value="Payout API">Payout API</option>
                    <option value="Travel Booking Engine">Travel Booking Engine</option>
                    <option value="Custom IT Software">Custom IT Software</option>
                    <option value="White-Label Fintech Platform">White-Label Fintech Platform</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>

                <div className="form-group-cred">
                  <label htmlFor="cf-msg">Message</label>
                  <textarea 
                    id="cf-msg" 
                    placeholder="Tell us about your project or requirements..."
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
                  className="btn-cred-neon" 
                  style={{ width: '100%', marginTop: '8px' }}
                  disabled={contactStatus.loading}
                >
                  {contactStatus.loading ? 'Sending Message...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FLOAT SHORTCUTS (WhatsApp & Phone) */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 9999
      }} className="floating-shortcuts-buttons">
        <a 
          href="https://wa.me/919278403522" 
          target="_blank" 
          rel="noreferrer"
          style={{
            background: '#25D366',
            color: '#FFFFFF',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(37,211,102,0.3)',
            fontSize: '20px'
          }}
          title="Chat on WhatsApp"
        >
          💬
        </a>
        <a 
          href="tel:+919278403522"
          style={{
            background: 'var(--accent-periwinkle)',
            color: '#FFFFFF',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(94, 92, 230, 0.3)',
            fontSize: '20px'
          }}
          title="Call Sales Hotline"
        >
          📞
        </a>
      </div>

      {/* 10. FOOTER */}
      <footer style={{
        background: 'rgba(255,255,255,0.4)',
        borderTop: '1px solid rgba(0, 0, 0, 0.03)',
        padding: '64px 8% 24px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.8fr 1fr 1fr 1.2fr',
          gap: '40px',
          paddingBottom: '40px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.03)'
        }} className="grid-responsive-footer">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--accent-periwinkle)', display: 'flex', alignItems: 'center', justify: 'center' }}>
                <Shield size={16} color="#FFF" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px' }}>BillsPay24X7✓</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
              BILLSPAY TECHNOLOGIES PRIVATE LIMITED · CIN: U63999UP2026PTC245490 · India's complete fintech, IT software & travel platform — payment infrastructure, banking APIs, travel booking & custom software all under one brand.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)', marginBottom: '16px' }}>Fintech Services</h4>
            <a onClick={() => { setActiveTab('fintech'); scrollToId('solutions'); }} style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px', cursor: 'pointer' }}>Payment Gateway</a>
            <a onClick={() => { setActiveTab('fintech'); scrollToId('solutions'); }} style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px', cursor: 'pointer' }}>UPI Collection</a>
            <a onClick={() => { setActiveTab('banking'); scrollToId('solutions'); }} style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px', cursor: 'pointer' }}>BBPS Bill Pay</a>
            <a onClick={() => { setActiveTab('banking'); scrollToId('solutions'); }} style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px', cursor: 'pointer' }}>AEPS Services</a>
            <a onClick={() => { setActiveTab('banking'); scrollToId('solutions'); }} style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer' }}>DMT Transfer</a>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)', marginBottom: '16px' }}>IT & Travel</h4>
            <a onClick={() => { setActiveTab('it'); scrollToId('solutions'); }} style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px', cursor: 'pointer' }}>Web Development</a>
            <a onClick={() => { setActiveTab('it'); scrollToId('solutions'); }} style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px', cursor: 'pointer' }}>Mobile Apps</a>
            <a onClick={() => { setActiveTab('it'); scrollToId('solutions'); }} style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px', cursor: 'pointer' }}>FinTech Platforms</a>
            <a onClick={() => { setActiveTab('it'); scrollToId('solutions'); }} style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px', cursor: 'pointer' }}>Cloud & DevOps</a>
            <a onClick={() => { setActiveTab('travel'); scrollToId('solutions'); }} style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer' }}>Travel Booking</a>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)', marginBottom: '16px' }}>Registered Office</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              PLOT NO-02, KHASRA NO-122, GRAM FARIDIPUR DUBAGGA,<br />
              Lucknow Chowk, Lucknow, UP — 226003<br /><br />
              <strong>CIN:</strong> U63999UP2026PTC245490<br />
              <strong>Support:</strong> support@billspay24x7.com
            </p>
          </div>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '18px auto 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          color: 'var(--text-muted)',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <p>© 2026 BILLSPAY TECHNOLOGIES PRIVATE LIMITED. All rights reserved. Brand: BillsPay24X7✓</p>
          <p style={{ fontSize: '9px', opacity: 0.7 }}>RBI Registered · PCI-DSS Level 1 · ISO 27001 Certified</p>
        </div>
      </footer>
    </div>
  );
}
