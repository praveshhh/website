import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Code, Tablet, ShieldAlert, Cpu, Database, Play, CheckCircle, Send, Check } from 'lucide-react';
import TiltCard from './TiltCard';

export default function ITPage({ onOpenModal }) {
  // B2B estimation form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('Fintech Payment Portal');
  const [details, setDetails] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleWhatsApp = (msg) => {
    window.open(`https://wa.me/919278403522?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || phone.replace(/\D/g, '').length < 10 || !email) {
      alert('Please fill all required fields correctly.');
      return;
    }
    setIsSuccess(true);
    const msg = `Hi BillsPay24X7 IT Team!\nIT Project Inquiry:\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nService: ${service}\nDetails: ${details || 'N/A'}`;
    handleWhatsApp(msg);
  };

  return (
    <div id="page-it" style={{ paddingTop: '80px', minHeight: '100vh', background: '#fff', color: '#0D1438' }}>
      {/* IT Hero */}
      <div className="it-hero" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '100px 8% 70px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #F8FAFF 0%, #FFFFFF 40%, #F0F8F5 100%)'
      }}>
        <div className="it-hero-mesh" style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(27,42,107,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(27,42,107,.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: 0.8
        }}></div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          width: '100%'
        }} className="grid-responsive-ithero">
          <div>
            <div className="it-overline" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: '#2DB84B',
              marginBottom: '20px'
            }}>Accepting new projects — Q3 2026</div>
            
            <h1 className="it-h1" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 68px)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              marginBottom: '24px'
            }}>
              We Engineer<br />
              <span style={{ background: 'linear-gradient(135deg, #1B2A6B, #3B4E9E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Digital Products
              </span><br />
              That Scale.
            </h1>
            
            <p className="it-lead" style={{ fontSize: '15px', color: '#4A5878', lineHeight: '1.75', marginBottom: '34px' }}>
              BillsPay24X7 builds web platforms, mobile apps, fintech portals and enterprise systems for ambitious Indian businesses. Clean code, fast delivery, measurable results.
            </p>

            <div className="it-hero-cta" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <button onClick={() => { document.getElementById('it-contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="ibt ibt-v ibt-lg" style={{
                background: '#1B2A6B',
                color: '#fff',
                padding: '14px 28px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 32px rgba(27,42,107,0.2)'
              }}>
                🚀 Start a Project
              </button>
              <button onClick={() => { document.getElementById('it-port')?.scrollIntoView({ behavior: 'smooth' }); }} className="ibt ibt-vg ibt-lg" style={{
                background: 'transparent',
                color: '#3B4E9E',
                border: '1.5px solid rgba(27,42,107,0.4)',
                padding: '14px 28px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer'
              }}>
                View Our Work
              </button>
            </div>

            <div className="it-proof-strip" style={{ display: 'flex', border: '1px solid rgba(27,42,107,0.1)', borderRadius: '14px', overflow: 'hidden' }}>
              <div className="it-proof-item" style={{ flex: 1, padding: '16px 12px', textAlign: 'center', background: 'rgba(27,42,107,0.02)', borderRight: '1px solid rgba(27,42,107,0.1)' }}><div className="it-proof-n" style={{ fontWeight: 800, fontSize: '24px', color: '#1B2A6B' }}>120+</div><div className="it-proof-l" style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px', color: '#6B7DB3' }}>Projects</div></div>
              <div className="it-proof-item" style={{ flex: 1, padding: '16px 12px', textAlign: 'center', background: 'rgba(27,42,107,0.02)', borderRight: '1px solid rgba(27,42,107,0.1)' }}><div className="it-proof-n" style={{ fontWeight: 800, fontSize: '24px', color: '#1B2A6B' }}>50+</div><div className="it-proof-l" style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px', color: '#6B7DB3' }}>Clients</div></div>
              <div className="it-proof-item" style={{ flex: 1, padding: '16px 12px', textAlign: 'center', background: 'rgba(27,42,107,0.02)', borderRight: '1px solid rgba(27,42,107,0.1)' }}><div className="it-proof-n" style={{ fontWeight: 800, fontSize: '24px', color: '#1B2A6B' }}>6 Wk</div><div className="it-proof-l" style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px', color: '#6B7DB3' }}>Avg Delivery</div></div>
              <div className="it-proof-item" style={{ flex: 1, padding: '16px 12px', textAlign: 'center', background: 'rgba(27,42,107,0.02)' }}><div className="it-proof-n" style={{ fontWeight: 800, fontSize: '24px', color: '#1B2A6B' }}>99%</div><div className="it-proof-l" style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px', color: '#6B7DB3' }}>Retention</div></div>
            </div>
          </div>

          {/* Floating dashboard panel simulation */}
          <div style={{ position: 'relative', height: '500px' }} className="ithero-visual">
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: '#FFFFFF',
              border: '1px solid rgba(27,42,107,0.12)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)'
            }}>
              <div style={{ background: '#EEF2FB', padding: '14px 18px', display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(27,42,107,0.08)' }}>
                <div style={{ display: 'flex', gap: '6px' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }}></div><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FEBC2E' }}></div><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840' }}></div></div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#6B7DB3', margin: '0 auto' }}>BillsPay24X7 · Agent Dashboard</div>
              </div>
              <div style={{ padding: '22px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#64748B', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Transaction Volume · This Week</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px', marginBottom: '20px' }}>
                  <div style={{ flex: 1, borderRadius: '4px 4px 0 0', background: 'linear-gradient(180deg, #1B2A6B, rgba(27,42,107,0.2))', height: '40%' }}></div>
                  <div style={{ flex: 1, borderRadius: '4px 4px 0 0', background: 'linear-gradient(180deg, #1B2A6B, rgba(27,42,107,0.2))', height: '60%' }}></div>
                  <div style={{ flex: 1, borderRadius: '4px 4px 0 0', background: 'linear-gradient(180deg, #2DB84B, rgba(45,184,75,0.2))', height: '75%' }}></div>
                  <div style={{ flex: 1, borderRadius: '4px 4px 0 0', background: 'linear-gradient(180deg, #1B2A6B, rgba(27,42,107,0.2))', height: '50%' }}></div>
                  <div style={{ flex: 1, borderRadius: '4px 4px 0 0', background: 'linear-gradient(180deg, #2DB84B, rgba(45,184,75,0.2))', height: '90%' }}></div>
                  <div style={{ flex: 1, borderRadius: '4px 4px 0 0', background: 'linear-gradient(180deg, #1B2A6B, rgba(27,42,107,0.2))', height: '65%' }}></div>
                  <div style={{ flex: 1, borderRadius: '4px 4px 0 0', background: 'linear-gradient(180deg, #2DB84B, rgba(45,184,75,0.2))', height: '100%' }}></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <div style={{ background: '#F8FAFF', border: '1px solid rgba(27,42,107,0.06)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}><div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 800, color: '#1B2A6B' }}>₹4.2L</div><div style={{ fontSize: '9px', color: '#6B7DB3', marginTop: '2px' }}>Today</div></div>
                  <div style={{ background: '#F8FAFF', border: '1px solid rgba(27,42,107,0.06)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}><div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 800, color: '#1B2A6B' }}>2,847</div><div style={{ fontSize: '9px', color: '#6B7DB3', marginTop: '2px' }}>Transactions</div></div>
                  <div style={{ background: '#F8FAFF', border: '1px solid rgba(27,42,107,0.06)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}><div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 800, color: '#1B2A6B' }}>512</div><div style={{ fontSize: '9px', color: '#6B7DB3', marginTop: '2px' }}>Active Agents</div></div>
                </div>
                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFF', border: '1px solid rgba(27,42,107,0.04)', borderRadius: '8px', padding: '8px 12px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2DB84B' }}></div><div style={{ fontSize: '11px', color: '#2E3878', flex: 1 }}>BBPS · Electricity Bill</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: '#1E9438', fontWeight: 700 }}>+₹1,250 ✓</div></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFF', border: '1px solid rgba(27,42,107,0.04)', borderRadius: '8px', padding: '8px 12px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2DB84B' }}></div><div style={{ fontSize: '11px', color: '#2E3878', flex: 1 }}>AEPS · Cash Withdrawal</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: '#1E9438', fontWeight: 700 }}>+₹5,000 ✓</div></div>
                </div>
              </div>
            </div>
            
            {/* Overlay floats */}
            <div style={{ position: 'absolute', top: '-15px', right: '-15px', background: '#FFFFFF', border: '1px solid rgba(27,42,107,0.12)', borderRadius: '14px', padding: '10px 16px', boxShadow: 'var(--shadow-md)', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ fontSize: '18px' }}>🚀</div><div><div style={{ fontWeight: 800, fontSize: '13px' }}>Live Now</div><div style={{ fontSize: '9px', color: '#6B7DB3' }}>Agent Portal v3.2</div></div></div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#1E9438', marginTop: '4px' }}>✓ 99.95% uptime</div>
            </div>
            <div style={{ position: 'absolute', bottom: '60px', left: '-20px', background: 'rgba(45,184,75,0.05)', border: '1px solid rgba(45,184,75,0.2)', borderRadius: '14px', padding: '10px 16px', backdropFilter: 'blur(8px)', zIndex: 2 }}>
              <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#1E9438' }}>⚡ Built in 6 weeks</div>
              <div style={{ fontSize: '9px', color: '#6B7DB3' }}>Design to production</div>
            </div>
          </div>
        </div>
      </div>

      {/* IT Services Grid */}
      <section className="it-sec" id="it-svc" style={{ padding: '80px 8%', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="it-overline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#2DB84B', marginBottom: '16px' }}>What We Build</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800 }}>End-to-End Software Services</h2>
            <p style={{ fontSize: '14.5px', color: '#4A5878', maxWidth: '560px', margin: '10px auto 0' }}>From a single feature to an enterprise platform — we cover the full stack, front to back, mobile to cloud.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { t: 'Fintech & Payment Portals', d: 'AEPS dashboards, BBPS portals, DMT panels, payout systems and agent networks — built RBI-compliant and PCI-DSS secure. We have shipped portals processing Rs 50L+ in daily transactions.', tags: ['BBPS API', 'AEPS', 'DMT', 'UPI', 'PCI-DSS', 'RBI'], icon: <Server /> },
              { t: 'Web Development', d: 'React, Next.js, Node.js — high-performance portals, SaaS platforms and progressive web apps. From a 3-page landing site to a system handling 10,000 concurrent users.', tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL'], icon: <Code /> },
              { t: 'Mobile App Dev', d: 'Flutter and React Native for iOS & Android. Cross-platform fintech, travel and retail apps with biometric auth, push notifications and offline mode.', tags: ['Flutter', 'React Native', 'Swift', 'Kotlin'], icon: <Tablet /> },
              { t: 'UI/UX Design', d: 'Figma-driven design systems, interactive prototypes, usability testing and conversion-optimized interfaces for web and mobile.', tags: ['Figma', 'Design System', 'User Testing'], icon: <Cpu /> },
              { t: 'Cloud & DevOps', d: 'AWS, Azure, GCP architecture, Docker, Kubernetes, CI/CD pipelines, Terraform and managed cloud services with 99.99% uptime.', tags: ['AWS', 'Kubernetes', 'Terraform', 'Docker'], icon: <Database /> },
              { t: 'AI & Analytics', d: 'Fraud detection models, BI dashboards, predictive analytics, recommendation engines and custom ML pipelines.', tags: ['TensorFlow', 'Power BI', 'OpenAI'], icon: <ShieldAlert /> }
            ].map((svc, idx) => (
              <TiltCard key={idx} style={{ display: 'flex', height: '100%' }}>
                <div className="it-svc-card" style={{
                  background: '#FFFFFF',
                  border: '1.5px solid rgba(27,42,107,0.1)',
                  borderRadius: '20px',
                  padding: '24px',
                  transition: 'all 0.3s',
                  height: '100%',
                  width: '100%'
                }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(27,42,107,0.06)', display: 'flex', alignItems: 'center', justify: 'center', color: '#1B2A6B', marginBottom: '18px' }}>{svc.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px' }}>{svc.t}</h3>
                <p style={{ fontSize: '12.5px', color: '#4A5878', lineHeight: '1.6', marginBottom: '16px' }}>{svc.d}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {svc.tags.map((tag, tIdx) => (
                    <span key={tIdx} style={{ fontSize: '9px', background: 'rgba(27,42,107,0.05)', color: '#3B4E9E', padding: '2px 8px', borderRadius: '50px', fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
          </div>
        </div>
      </section>

      {/* IT Outcomes Section */}
      <section className="it-sec it-sec-alt" style={{ padding: '80px 8%', background: '#F8FAFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '60px' }} className="grid-responsive-process">
          <div>
            <div className="it-overline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#2DB84B', marginBottom: '16px' }}>Why BillsPay24X7</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800 }}>We Deliver Outcomes, Not Just Code.</h2>
            <p style={{ fontSize: '14.5px', color: '#4A5878', marginBottom: '32px' }}>Other agencies ship features. We ship outcomes — on time, on spec, with a team that stays accountable after go-live.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {[
                { t: '6-week average delivery', d: 'Signed contract to production in 6 weeks. Tight sprints, daily standups, weekly demos. No scope creep, no deadline slips.' },
                { t: 'Compliance-first architecture', d: 'RBI, PCI-DSS, OWASP, ISO 27001. Security is architected in from day one — not audited in after launch.' },
                { t: 'Full in-house team in Lucknow', d: '15+ developers, designers, DevOps and QA. No outsourcing. You talk to the people actually building your product every day.' },
                { t: 'Zero vendor lock-in, ever', d: 'You own the code, the IP, the infrastructure. Full Git repo handover, complete documentation at project close.' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ marginTop: '3px' }}><CheckCircle size={16} color="#2DB84B" /></div>
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: '14px' }}>{item.t}</h4>
                    <p style={{ fontSize: '12.5px', color: '#4A5878', marginTop: '2px', lineHeight: '1.5' }}>{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <TiltCard style={{ width: '100%', height: '100%' }}>
              <div style={{ background: '#fff', border: '1px solid rgba(27,42,107,0.12)', borderRadius: '20px', padding: '24px', width: '100%', height: '100%' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <div style={{ background: '#F8FAFF', borderRadius: '12px', padding: '16px', textAlign: 'center' }}><div style={{ fontSize: '26px', fontWeight: 900, color: '#1B2A6B' }}>120+</div><div style={{ fontSize: '9px', color: '#6B7DB3' }}>Projects Shipped</div></div>
                <div style={{ background: '#F8FAFF', borderRadius: '12px', padding: '16px', textAlign: 'center' }}><div style={{ fontSize: '26px', fontWeight: 900, color: '#1B2A6B' }}>50+</div><div style={{ fontSize: '9px', color: '#6B7DB3' }}>Happy Clients</div></div>
                <div style={{ background: '#F8FAFF', borderRadius: '12px', padding: '16px', textAlign: 'center' }}><div style={{ fontSize: '26px', fontWeight: 900, color: '#1B2A6B' }}>6 Wk</div><div style={{ fontSize: '9px', color: '#6B7DB3' }}>Avg Time to Live</div></div>
                <div style={{ background: '#F8FAFF', borderRadius: '12px', padding: '16px', textAlign: 'center' }}><div style={{ fontSize: '26px', fontWeight: 900, color: '#1B2A6B' }}>99%</div><div style={{ fontSize: '9px', color: '#6B7DB3' }}>Client Retention</div></div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
                <span style={{ fontSize: '9.5px', fontWeight: 700, padding: '4px 10px', background: '#F0F4FF', border: '1px solid rgba(27,42,107,0.1)', borderRadius: '6px' }}>✓ PCI-DSS L1</span>
                <span style={{ fontSize: '9.5px', fontWeight: 700, padding: '4px 10px', background: '#F0F4FF', border: '1px solid rgba(27,42,107,0.1)', borderRadius: '6px' }}>✓ RBI Compliant</span>
                <span style={{ fontSize: '9.5px', fontWeight: 700, padding: '4px 10px', background: '#F0F4FF', border: '1px solid rgba(27,42,107,0.1)', borderRadius: '6px' }}>✓ ISO 27001</span>
              </div>

              <div style={{ padding: '16px', background: '#F8FAFF', borderRadius: '12px', border: '1px solid rgba(27,42,107,0.08)' }}>
                <h4 style={{ fontWeight: 800, fontSize: '13.5px', marginBottom: '4px' }}>Proposal in 48 hours — guaranteed</h4>
                <p style={{ fontSize: '11.5px', color: '#6B7DB3', lineHeight: '1.6' }}>We scope your project, estimate effort honestly, and send a fixed-price quote. If we cannot build it well, we will tell you upfront.</p>
              </div>
            </div>
          </TiltCard>
          </div>
        </div>
      </section>

      {/* IT Process Flow */}
      <section className="it-sec" id="it-proc" style={{ padding: '80px 8%', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="it-overline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#2DB84B', marginBottom: '16px' }}>How We Work</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800 }}>Brief to Launch in Five Clear Phases</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { step: 'Phase 01', t: 'Discovery', d: 'Goals, users, constraints. We scope and agree on success metrics before writing a single line of code.' },
              { step: 'Phase 02', t: 'Design', d: 'Figma wireframes to interactive prototype to your approval. UI passes usability review before dev starts.' },
              { step: 'Phase 03', t: 'Development', d: '2-week sprints. Live staging environment from week two. You see the product working and give real feedback.' },
              { step: 'Phase 04', t: 'QA & Security', d: 'Automated tests, manual QA, performance load testing, security scan. Nothing ships without hitting our quality gates.' },
              { step: 'Phase 05', t: 'Launch & Scale', d: 'Production deployment with monitoring, alerting, auto-scaling. Full handover. Support from ₹9,999/month.' }
            ].map((p, idx) => (
              <TiltCard key={idx} style={{ height: '100%' }}>
                <div style={{ textAlign: 'center', padding: '16px', background: '#F8FAFF', borderRadius: '16px', border: '1px solid rgba(27,42,107,0.06)', height: '100%', width: '100%' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#1B2A6B', color: '#fff', display: 'flex', alignItems: 'center', justify: 'center', margin: '0 auto 16px', fontWeight: 'bold' }}>{idx + 1}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: '#2DB84B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>{p.step}</div>
                <h4 style={{ fontWeight: 800, fontSize: '14.5px', marginBottom: '6px' }}>{p.t}</h4>
                <p style={{ fontSize: '12px', color: '#4A5878', lineHeight: '1.6' }}>{p.d}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* IT Tech Stack */}
      <section className="it-sec it-sec-dark" style={{ padding: '80px 8%', background: '#F8FAFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="it-overline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#2DB84B', marginBottom: '16px' }}>Technology</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800 }}>Battle-Tested Stack, Modern Tooling</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {[
              { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'Angular'] },
              { label: 'Backend', items: ['Node.js', 'Python / Django', 'Java / Spring', 'PHP / Laravel', 'Go', 'GraphQL'] },
              { label: 'Mobile', items: ['Flutter', 'React Native', 'Swift / iOS', 'Kotlin / Android'] },
              { label: 'Database & Cloud', items: ['PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'] }
            ].map((group, idx) => (
              <div key={idx}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#6B7DB3', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>{group.label}</div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {group.items.map((item, itemIdx) => (
                    <span key={itemIdx} style={{ background: '#fff', border: '1px solid rgba(27,42,107,0.1)', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: '#2E3878' }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IT Portfolio */}
      <section className="it-sec" id="it-port" style={{ padding: '80px 8%', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="it-overline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#2DB84B', marginBottom: '16px' }}>Portfolio</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800 }}>Real Products, Real Results</h2>
            <p style={{ fontSize: '14.5px', color: '#4A5878', maxWidth: '560px', margin: '10px auto 0' }}>Not concepts. Live software running in production, solving real problems for real businesses right now.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { t: 'BillsPay24X7 Agent Portal', tag: 'FINTECH PLATFORM', p: 'Full-stack fintech portal — AEPS, BBPS, DMT, UPI and payout in one dashboard. Multi-tier agent hierarchy, real-time monitoring, T+1 settlement.', kpis: ['₹50L+ daily volume', '500+ agents'], bg: 'linear-gradient(135deg, #1B2A6B, #0D1638)' },
              { t: 'Grocers24X7 Marketplace', tag: 'RETAIL APP', p: 'Progressive Web App for a hyperlocal grocery delivery platform. Instant search, local store inventory mapping, route-optimized delivery partner dispatch.', kpis: ['10K+ monthly active', '99.98% runtime'], bg: 'linear-gradient(135deg, #2DB84B, #0D3018)' },
              { t: 'BillsPay24X7 Travel Engine', tag: 'TRAVEL PLATFORM', p: 'Comprehensive travel B2B API gateway. Merges flight, hotel and bus inventories from multiple global suppliers into one search/payout layer.', kpis: ['180ms search avg', '15+ suppliers'], bg: 'linear-gradient(135deg, #3B4E9E, #243080)' }
            ].map((port, idx) => (
              <TiltCard key={idx} style={{ height: '100%' }}>
                <div style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(27,42,107,0.1)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                  height: '100%',
                  width: '100%'
                }}>
                <div style={{ height: '140px', background: port.bg, display: 'flex', alignItems: 'center', justify: 'center', fontSize: '44px' }}>💻</div>
                <div style={{ padding: '24px' }}>
                  <span style={{ fontSize: '9px', background: '#F0F4FF', color: '#1B2A6B', padding: '3px 10px', borderRadius: '50px', fontWeight: 700, letterSpacing: '1px' }}>{port.tag}</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, marginTop: '12px', marginBottom: '8px' }}>{port.t}</h3>
                  <p style={{ fontSize: '12.5px', color: '#4A5878', lineHeight: '1.6', marginBottom: '16px' }}>{port.p}</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {port.kpis.map((kpi, kIdx) => (
                      <span key={kIdx} style={{ fontSize: '11px', color: '#1E9438', fontWeight: 700 }}>✓ {kpi}</span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
          </div>
        </div>
      </section>

      {/* IT Contact form */}
      <section className="it-sec it-sec-alt" id="it-contact" style={{ padding: '80px 8%', background: '#F8FAFF' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ background: '#fff', border: '1.5px solid rgba(27,42,107,0.18)', borderRadius: '24px', padding: '40px', boxShadow: 'var(--shadow-lg)' }}>
            {!isSuccess ? (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, marginBottom: '4px' }}>Estimate Your IT Project</h3>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '24px' }}>Submit details for a quote in 48 hours</div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="grid-responsive-process">
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>Full Name *</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>Phone / WhatsApp *</label>
                    <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="grid-responsive-process">
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>Email Address *</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>Company Name</label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>Project Service Type</label>
                  <select value={service} onChange={(e) => setService(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px', color: 'var(--text-primary)' }}>
                    <option>Fintech Payment Portal</option>
                    <option>Web Application Development</option>
                    <option>Mobile App (iOS/Android)</option>
                    <option>Cloud Infrastructure & DevOps</option>
                    <option>Custom ERP & CRM Module</option>
                    <option>AI Automation & ML Pipelines</option>
                  </select>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>Project Details & Requirements</label>
                  <textarea rows="4" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Describe what you want to build..." style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border-primary)', borderRadius: '8px' }}></textarea>
                </div>

                <button type="submit" style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #1B2A6B, #243080)',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  <Send size={15} /> Submit Inquiry via WhatsApp
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#F0FFF4', border: '2px solid #2DB84B', display: 'flex', alignItems: 'center', justify: 'center', margin: '0 auto 20px', color: '#2DB84B', fontSize: '28px' }}><Check size={28} /></div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>Project Inquiry Sent!</h3>
                <p style={{ fontSize: '13.5px', color: '#6B7DB3' }}>Opening WhatsApp to finalize your B2B proposal details...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
