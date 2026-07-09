import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Code, Tablet, ShieldAlert, Cpu, Database, Play, CheckCircle, Send, Check, ArrowRight, Lock, Settings, Layers, Activity, Star } from 'lucide-react';
import TiltCard from './TiltCard';

// 3D Isometric System Architecture Visual
function IsometricArchitecture() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '480px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      perspective: '1200px',
      transformStyle: 'preserve-3d'
    }} className="isometric-container">
      {/* 3D Stack Wrapper */}
      <motion.div
        animate={{ rotateY: [-12, 12, -12], rotateX: [18, 24, 18] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'relative',
          width: '320px',
          height: '380px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Layer 4: Security Shield (Top) */}
        <motion.div
          animate={{ z: [110, 120, 110] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
          style={{
            position: 'absolute',
            top: '20px',
            width: '100%',
            height: '64px',
            background: 'rgba(255, 255, 255, 0.45)',
            border: '1.5px solid rgba(94, 92, 230, 0.45)',
            borderRadius: '16px',
            boxShadow: '0 12px 30px rgba(94, 92, 230, 0.15), inset 0 1px 0 rgba(255,255,255,0.6)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            transform: 'rotateX(55deg) rotateZ(-45deg) translateZ(120px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '0 20px',
            transformStyle: 'preserve-3d'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #FFC107, #FF9800)', boxShadow: '0 4px 12px rgba(255,152,0,0.3)' }}>
            <Lock size={16} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0D1438' }}>Security Gate</div>
            <div style={{ fontSize: '9px', color: '#2DB84B', fontWeight: 700 }}>✓ PCI-DSS & RBI Shield</div>
          </div>
        </motion.div>

        {/* Data pulse packet: Layer 3 to 4 */}
        <motion.div
          animate={{ z: [30, 110, 30] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: '50%',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--accent-periwinkle)',
            boxShadow: '0 0 12px 3px var(--accent-periwinkle)',
            transform: 'translateX(-50%)'
          }}
        />

        {/* Layer 3: Application UI/UX */}
        <motion.div
          animate={{ z: [35, 42, 35] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          style={{
            position: 'absolute',
            top: '100px',
            width: '100%',
            height: '64px',
            background: 'rgba(255, 255, 255, 0.45)',
            border: '1.5px solid rgba(45, 184, 75, 0.35)',
            borderRadius: '16px',
            boxShadow: '0 12px 30px rgba(45, 184, 75, 0.1), inset 0 1px 0 rgba(255,255,255,0.6)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            transform: 'rotateX(55deg) rotateZ(-45deg) translateZ(40px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '0 20px',
            transformStyle: 'preserve-3d'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #2DB84B, #1E9438)', boxShadow: '0 4px 12px rgba(45,184,75,0.3)' }}>
            <Cpu size={16} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0D1438' }}>Application Layer</div>
            <div style={{ fontSize: '9px', color: 'var(--text-secondary)', fontWeight: 700 }}>React · Next.js · Flutter</div>
          </div>
        </motion.div>

        {/* Data pulse packet: Layer 2 to 3 */}
        <motion.div
          animate={{ z: [-35, 30, -35] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          style={{
            position: 'absolute',
            left: '50%',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#2DB84B',
            boxShadow: '0 0 12px 3px #2DB84B',
            transform: 'translateX(-50%)'
          }}
        />

        {/* Layer 2: API Gateway */}
        <motion.div
          animate={{ z: [-45, -38, -45] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          style={{
            position: 'absolute',
            top: '180px',
            width: '100%',
            height: '64px',
            background: 'rgba(255, 255, 255, 0.45)',
            border: '1.5px solid rgba(94, 92, 230, 0.35)',
            borderRadius: '16px',
            boxShadow: '0 12px 30px rgba(94, 92, 230, 0.1), inset 0 1px 0 rgba(255,255,255,0.6)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            transform: 'rotateX(55deg) rotateZ(-45deg) translateZ(-40px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '0 20px',
            transformStyle: 'preserve-3d'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #6E62F9, #4D3CE6)', boxShadow: '0 4px 12px rgba(94,92,230,0.3)' }}>
            <Code size={16} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0D1438' }}>API Microservices</div>
            <div style={{ fontSize: '9px', color: 'var(--text-secondary)', fontWeight: 700 }}>BBPS · AEPS · UPI Core</div>
          </div>
        </motion.div>

        {/* Data pulse packet: Layer 1 to 2 */}
        <motion.div
          animate={{ z: [-110, -45, -110] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          style={{
            position: 'absolute',
            left: '50%',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#F59E0B',
            boxShadow: '0 0 12px 3px #F59E0B',
            transform: 'translateX(-50%)'
          }}
        />

        {/* Layer 1: Cloud & Database (Base) */}
        <motion.div
          animate={{ z: [-125, -120, -125] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '260px',
            width: '100%',
            height: '64px',
            background: 'rgba(255, 255, 255, 0.45)',
            border: '1.5px solid rgba(27, 42, 107, 0.25)',
            borderRadius: '16px',
            boxShadow: '0 15px 35px rgba(27, 42, 107, 0.15), inset 0 1px 0 rgba(255,255,255,0.6)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            transform: 'rotateX(55deg) rotateZ(-45deg) translateZ(-120px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '0 20px',
            transformStyle: 'preserve-3d'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #1B2A6B, #3B4E9E)', boxShadow: '0 4px 12px rgba(27,42,107,0.3)' }}>
            <Database size={16} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0D1438' }}>Data Infrastructure</div>
            <div style={{ fontSize: '9px', color: 'var(--text-secondary)', fontWeight: 700 }}>AWS · GCP · PostgreSQL</div>
          </div>
        </motion.div>

        {/* Vertical Center Connector Line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '60px',
          bottom: '80px',
          width: '2px',
          background: 'linear-gradient(to bottom, rgba(94,92,230,0.5) 0%, rgba(45,184,75,0.5) 50%, rgba(27,42,107,0.3) 100%)',
          transform: 'translateX(-50%)',
          zIndex: -1
        }} />
      </motion.div>
    </div>
  );
}

export default function ITPage({ onOpenModal }) {
  // B2B estimation form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('Fintech Payment Portal');
  const [details, setDetails] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Tech stack filter state
  const [activeStackTab, setActiveStackTab] = useState('Frontend');

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

  const techStackData = [
    { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'Angular'] },
    { label: 'Backend', items: ['Node.js', 'Python / Django', 'Java / Spring', 'PHP / Laravel', 'Go', 'GraphQL'] },
    { label: 'Mobile', items: ['Flutter', 'React Native', 'Swift / iOS', 'Kotlin / Android'] },
    { label: 'Database & Cloud', items: ['PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'] }
  ];

  return (
    <div id="page-it" style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', overflowX: 'hidden' }}>
      
      {/* Glow overlays similar to MakeMyTrip/InstanceIT */}
      <div className="glow-overlay-green" style={{ top: '5%', left: '-5%', opacity: 0.15 }} />
      <div className="glow-overlay-blue" style={{ top: '35%', right: '-5%', opacity: 0.15 }} />

      {/* IT Hero */}
      <div className="it-hero" style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 8% 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle grid background mesh */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(94, 92, 230, 0.08) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          opacity: 0.9
        }} />

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '60px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          width: '100%'
        }} className="grid-responsive-ithero">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="it-overline"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(45, 184, 75, 0.2)',
                background: 'rgba(45, 184, 75, 0.05)',
                padding: '6px 14px',
                borderRadius: '50px',
                fontFamily: 'var(--font-display)',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#1E9438',
                marginBottom: '24px'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2DB84B', display: 'inline-block' }} className="pulse-glow" />
              Accepting new projects — Q3 2026
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="it-h1"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw, 60px)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '24px'
              }}
            >
              We Engineer<br />
              <span className="text-gradient-blue" style={{ fontWeight: 900 }}>
                Digital Products
              </span><br />
              That Scale.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="it-lead"
              style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '36px', maxWidth: '540px' }}
            >
              BillsPay24X7 builds web platforms, mobile apps, fintech portals and enterprise systems for ambitious Indian businesses. Clean code, fast delivery, measurable results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="it-hero-cta"
              style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}
            >
              <button
                onClick={() => { document.getElementById('it-contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-cred-neon pulse-glow"
                style={{ padding: '14px 28px', fontSize: '13.5px' }}
              >
                🚀 Start a Project
              </button>
              <button
                onClick={() => { document.getElementById('it-port')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-cred-outline"
                style={{ padding: '14px 28px', fontSize: '13.5px' }}
              >
                View Our Work
              </button>
            </motion.div>

            {/* Proof Strip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="it-proof-strip"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                background: 'rgba(255, 255, 255, 0.7)',
                border: '1px solid var(--border-primary)',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(27,42,107,0.04)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                overflow: 'hidden'
              }}
            >
              <div style={{ padding: '16px 12px', textAlign: 'center', borderRight: '1px solid var(--border-primary)' }}>
                <div style={{ fontWeight: 900, fontSize: '22px', color: 'var(--accent-periwinkle)', fontFamily: 'var(--font-mono)' }}>120+</div>
                <div style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginTop: '2px' }}>Projects</div>
              </div>
              <div style={{ padding: '16px 12px', textAlign: 'center', borderRight: '1px solid var(--border-primary)' }}>
                <div style={{ fontWeight: 900, fontSize: '22px', color: 'var(--accent-periwinkle)', fontFamily: 'var(--font-mono)' }}>50+</div>
                <div style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginTop: '2px' }}>Clients</div>
              </div>
              <div style={{ padding: '16px 12px', textAlign: 'center', borderRight: '1px solid var(--border-primary)' }}>
                <div style={{ fontWeight: 900, fontSize: '22px', color: 'var(--accent-periwinkle)', fontFamily: 'var(--font-mono)' }}>6 Wk</div>
                <div style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginTop: '2px' }}>Delivery</div>
              </div>
              <div style={{ padding: '16px 12px', textAlign: 'center' }}>
                <div style={{ fontWeight: 900, fontSize: '22px', color: 'var(--accent-periwinkle)', fontFamily: 'var(--font-mono)' }}>99%</div>
                <div style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginTop: '2px' }}>Retention</div>
              </div>
            </motion.div>
          </div>

          {/* Interactive 3D Server Stack Visual */}
          <div className="ithero-visual">
            <IsometricArchitecture />
          </div>
        </div>
      </div>

      {/* IT Services Grid */}
      <section className="it-sec" id="it-svc" style={{ padding: '80px 8%', background: 'var(--surf-1)', borderTop: '1px solid var(--border-primary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="it-overline" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: 'var(--accent-periwinkle)',
              marginBottom: '16px'
            }}>What We Build</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 900 }}>End-to-End Software Services</h2>
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', maxWidth: '580px', margin: '12px auto 0', lineHeight: 1.6 }}>From a single feature to an enterprise platform — we cover the full stack, front to back, mobile to cloud.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
            {[
              { t: 'Fintech & Payment Portals', d: 'AEPS dashboards, BBPS portals, DMT panels, payout systems and agent networks — built RBI-compliant and PCI-DSS secure. We have shipped portals processing Rs 50L+ in daily transactions.', tags: ['BBPS API', 'AEPS', 'DMT', 'UPI', 'PCI-DSS', 'RBI'], icon: <Server size={22} />, glow: 'rgba(45,184,75,0.18)' },
              { t: 'Web Development', d: 'React, Next.js, Node.js — high-performance portals, SaaS platforms and progressive web apps. From a 3-page landing site to a system handling 10,000 concurrent users.', tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL'], icon: <Code size={22} />, glow: 'rgba(94,92,230,0.18)' },
              { t: 'Mobile App Dev', d: 'Flutter and React Native for iOS & Android. Cross-platform fintech, travel and retail apps with biometric auth, push notifications and offline mode.', tags: ['Flutter', 'React Native', 'Swift', 'Kotlin'], icon: <Tablet size={22} />, glow: 'rgba(14,165,233,0.18)' },
              { t: 'UI/UX Design', d: 'Figma-driven design systems, interactive prototypes, usability testing and conversion-optimized interfaces for web and mobile.', tags: ['Figma', 'Design System', 'User Testing'], icon: <Cpu size={22} />, glow: 'rgba(236,72,153,0.18)' },
              { t: 'Cloud & DevOps', d: 'AWS, Azure, GCP architecture, Docker, Kubernetes, CI/CD pipelines, Terraform and managed cloud services with 99.99% uptime.', tags: ['AWS', 'Kubernetes', 'Terraform', 'Docker'], icon: <Database size={22} />, glow: 'rgba(245,158,11,0.18)' },
              { t: 'AI & Analytics', d: 'Fraud detection models, BI dashboards, predictive analytics, recommendation engines and custom ML pipelines.', tags: ['TensorFlow', 'Power BI', 'OpenAI'], icon: <ShieldAlert size={22} />, glow: 'rgba(239,68,68,0.18)' }
            ].map((svc, idx) => (
              <TiltCard key={idx} style={{ display: 'flex', height: '100%' }}>
                <div
                  className="it-svc-card"
                  style={{
                    background: 'var(--white)',
                    border: '1.5px solid var(--border-primary)',
                    borderRadius: '20px',
                    padding: '30px',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 20px rgba(27,42,107,0.03)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-periwinkle)';
                    e.currentTarget.style.boxShadow = `0 16px 40px ${svc.glow}`;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-primary)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(27,42,107,0.03)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(94, 92, 230, 0.06)',
                    color: 'var(--accent-periwinkle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    {svc.icon}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>{svc.t}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px', flexGrow: 1 }}>{svc.d}</p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', borderTop: '1px solid var(--border-primary)', paddingTop: '16px' }}>
                    {svc.tags.map((tag, tIdx) => (
                      <span key={tIdx} style={{
                        fontSize: '9.5px',
                        background: 'rgba(94,92,230,0.05)',
                        border: '1px solid rgba(94,92,230,0.12)',
                        color: 'var(--accent-periwinkle)',
                        padding: '3px 9px',
                        borderRadius: '50px',
                        fontWeight: 700,
                        letterSpacing: '0.02em'
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* IT Outcomes Section */}
      <section className="it-sec it-sec-alt" style={{ padding: '80px 8%', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '60px', alignItems: 'center' }} className="grid-responsive-process">
          <div>
            <div className="it-overline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#2DB84B', marginBottom: '16px' }}>Why BillsPay24X7</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 900, marginBottom: '16px' }}>We Deliver Outcomes, Not Just Code.</h2>
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', marginBottom: '36px', lineHeight: 1.6 }}>Other agencies ship features. We ship outcomes — on time, on spec, with a team that stays accountable after go-live.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                { t: '6-week average delivery', d: 'Signed contract to production in 6 weeks. Tight sprints, daily standups, weekly demos. No scope creep, no deadline slips.' },
                { t: 'Compliance-first architecture', d: 'RBI, PCI-DSS, OWASP, ISO 27001. Security is architected in from day one — not audited in after launch.' },
                { t: 'Full in-house team in Lucknow', d: '15+ developers, designers, DevOps and QA. No outsourcing. You talk to the people actually building your product every day.' },
                { t: 'Zero vendor lock-in, ever', d: 'You own the code, the IP, the infrastructure. Full Git repo handover, complete documentation at project close.' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ marginTop: '2px' }}><CheckCircle size={16} color="#2DB84B" className="pulse-glow" style={{ borderRadius: '50%' }} /></div>
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text-primary)' }}>{item.t}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.5' }}>{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <TiltCard style={{ width: '100%', height: '100%' }}>
              <div style={{
                background: 'var(--white)',
                border: '1.5px solid var(--border-primary)',
                borderRadius: '24px',
                padding: '36px',
                width: '100%',
                height: '100%',
                boxShadow: '0 10px 40px rgba(27,42,107,0.04)'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
                  <div style={{ background: 'rgba(94, 92, 230, 0.04)', border: '1px solid rgba(94, 92, 230, 0.1)', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--accent-periwinkle)', fontFamily: 'var(--font-mono)' }}>120+</div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '4px' }}>Projects Shipped</div>
                  </div>
                  <div style={{ background: 'rgba(45, 184, 75, 0.04)', border: '1px solid rgba(45, 184, 75, 0.1)', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: '#1E9438', fontFamily: 'var(--font-mono)' }}>50+</div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '4px' }}>Happy Clients</div>
                  </div>
                  <div style={{ background: 'rgba(94, 92, 230, 0.04)', border: '1px solid rgba(94, 92, 230, 0.1)', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--accent-periwinkle)', fontFamily: 'var(--font-mono)' }}>6 Wk</div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '4px' }}>Avg Time to Live</div>
                  </div>
                  <div style={{ background: 'rgba(45, 184, 75, 0.04)', border: '1px solid rgba(45, 184, 75, 0.1)', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: '#1E9438', fontFamily: 'var(--font-mono)' }}>99%</div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '4px' }}>Client Retention</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, padding: '5px 12px', background: 'rgba(94,92,230,0.06)', color: 'var(--accent-periwinkle)', border: '1px solid rgba(94,92,230,0.12)', borderRadius: '50px' }}>✓ PCI-DSS L1</span>
                  <span style={{ fontSize: '10px', fontWeight: 800, padding: '5px 12px', background: 'rgba(45,184,75,0.06)', color: '#1E9438', border: '1px solid rgba(45,184,75,0.12)', borderRadius: '50px' }}>✓ RBI Compliant</span>
                  <span style={{ fontSize: '10px', fontWeight: 800, padding: '5px 12px', background: 'rgba(94,92,230,0.06)', color: 'var(--accent-periwinkle)', border: '1px solid rgba(94,92,230,0.12)', borderRadius: '50px' }}>✓ ISO 27001</span>
                </div>

                <div style={{ padding: '20px', background: 'var(--surf-1)', borderRadius: '16px', border: '1px solid var(--border-primary)' }}>
                  <h4 style={{ fontWeight: 800, fontSize: '14px', marginBottom: '6px' }}>Proposal in 48 hours — guaranteed</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>We scope your project, estimate effort honestly, and send a fixed-price quote. If we cannot build it well, we will tell you upfront.</p>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* IT Process Flow: connected flowchart node pipeline */}
      <section className="it-sec" id="it-proc" style={{ padding: '80px 8%', background: 'var(--surf-1)', borderTop: '1px solid var(--border-primary)', borderBottom: '1px solid var(--border-primary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="it-overline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--accent-periwinkle)', marginBottom: '16px' }}>How We Work</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 900 }}>Brief to Launch in Five Clear Phases</h2>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
            gap: '24px',
            flexWrap: 'wrap'
          }} className="flowchart-pipeline">
            
            {/* SVG Connecting Flow line for desktop */}
            <div className="flowchart-line" style={{
              position: 'absolute',
              top: '40px',
              left: '10%',
              right: '10%',
              height: '3px',
              background: 'linear-gradient(90deg, #1B2A6B 0%, var(--accent-periwinkle) 50%, #2DB84B 100%)',
              zIndex: 0
            }} />

            {[
              { step: 'Phase 01', t: 'Discovery', d: 'Goals, users, constraints. We scope and agree on success metrics before writing a single line of code.' },
              { step: 'Phase 02', t: 'Design', d: 'Figma wireframes to interactive prototype to your approval. UI passes usability review before dev starts.' },
              { step: 'Phase 03', t: 'Development', d: '2-week sprints. Live staging environment from week two. You see the product working and give real feedback.' },
              { step: 'Phase 04', t: 'QA & Security', d: 'Automated tests, manual QA, performance load testing, security scan. Nothing ships without hitting our quality gates.' },
              { step: 'Phase 05', t: 'Launch & Scale', d: 'Production deployment with monitoring, alerting, auto-scaling. Full handover. Support from ₹9,999/month.' }
            ].map((p, idx) => (
              <div key={idx} style={{
                flex: '1 1 200px',
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                {/* Flow node ball */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'var(--white)',
                    border: '3px solid var(--accent-periwinkle)',
                    boxShadow: '0 8px 24px rgba(94,92,230,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '18px',
                    color: 'var(--accent-periwinkle)',
                    marginBottom: '20px',
                    cursor: 'default'
                  }}
                >
                  {idx + 1}
                </motion.div>
                
                {/* Node details */}
                <div style={{
                  textAlign: 'center',
                  background: 'var(--white)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                  width: '100%'
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 800, color: '#2DB84B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>{p.step}</div>
                  <h4 style={{ fontWeight: 800, fontSize: '15px', marginBottom: '8px', color: 'var(--text-primary)' }}>{p.t}</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IT Tech Stack with interactive categories */}
      <section className="it-sec it-sec-dark" style={{ padding: '80px 8%', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="it-overline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--accent-periwinkle)', marginBottom: '16px' }}>Technology</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 900 }}>Battle-Tested Stack, Modern Tooling</h2>
          </div>

          {/* Interactive Stack filter tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}>
            {techStackData.map((group, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStackTab(group.label)}
                style={{
                  padding: '10px 22px',
                  borderRadius: '50px',
                  border: activeStackTab === group.label ? '1px solid var(--accent-periwinkle)' : '1px solid var(--border-primary)',
                  background: activeStackTab === group.label ? 'var(--accent-periwinkle)' : 'var(--white)',
                  color: activeStackTab === group.label ? '#fff' : 'var(--text-secondary)',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                {group.label}
              </button>
            ))}
          </div>

          {/* Staggered Tag Render */}
          <div style={{
            background: 'var(--surf-1)',
            border: '1.5px solid var(--border-primary)',
            borderRadius: '24px',
            padding: '36px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.02)'
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStackTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}
              >
                {techStackData.find(g => g.label === activeStackTab)?.items.map((item, itemIdx) => (
                  <span
                    key={itemIdx}
                    style={{
                      background: 'var(--white)',
                      border: '1px solid var(--border-primary)',
                      borderRadius: '12px',
                      padding: '12px 24px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.01)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-periwinkle)' }} />
                    {item}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* IT Portfolio */}
      <section className="it-sec" id="it-port" style={{ padding: '80px 8%', background: 'var(--surf-1)', borderTop: '1px solid var(--border-primary)', borderBottom: '1px solid var(--border-primary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="it-overline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--accent-periwinkle)', marginBottom: '16px' }}>Portfolio</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 900 }}>Real Products, Real Results</h2>
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', maxWidth: '580px', margin: '12px auto 0', lineHeight: 1.6 }}>Not concepts. Live software running in production, solving real problems for real businesses right now.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
            {[
              { t: 'BillsPay24X7 Agent Portal', tag: 'FINTECH PLATFORM', p: 'Full-stack fintech portal — AEPS, BBPS, DMT, UPI and payout in one dashboard. Multi-tier agent hierarchy, real-time monitoring, T+1 settlement.', kpis: ['₹50L+ daily volume', '500+ agents'], bg: 'linear-gradient(135deg, #1B2A6B, #0D1638)', img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=560&h=300&fit=crop&q=80' },
              { t: 'Grocers24X7 Marketplace', tag: 'RETAIL APP', p: 'Progressive Web App for a hyperlocal grocery delivery platform. Instant search, local store inventory mapping, route-optimized delivery partner dispatch.', kpis: ['10K+ monthly active', '99.98% runtime'], bg: 'linear-gradient(135deg, #2DB84B, #0D3018)', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=560&h=300&fit=crop&q=80' },
              { t: 'BillsPay24X7 Travel Engine', tag: 'TRAVEL PLATFORM', p: 'Comprehensive travel B2B API gateway. Merges flight, hotel and bus inventories from multiple global suppliers into one search/payout layer.', kpis: ['180ms search avg', '15+ suppliers'], bg: 'linear-gradient(135deg, #3B4E9E, #243080)', img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=560&h=300&fit=crop&q=80' }
            ].map((port, idx) => (
              <TiltCard key={idx} style={{ height: '100%' }}>
                <div style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  height: '100%',
                  width: '100%',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(27,42,107,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.02)';
                }}
                >
                  <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                    <img src={port.img} alt={port.t} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 2 }}>
                      <span style={{ fontSize: '9px', background: 'rgba(27, 42, 107, 0.85)', color: '#fff', padding: '4px 12px', borderRadius: '50px', fontWeight: 800, letterSpacing: '0.05em' }}>{port.tag}</span>
                    </div>
                  </div>
                  <div style={{ padding: '28px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>{port.t}</h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px', flexGrow: 1 }}>{port.p}</p>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', borderTop: '1px solid var(--border-primary)', paddingTop: '16px' }}>
                      {port.kpis.map((kpi, kIdx) => (
                        <span key={kIdx} style={{ fontSize: '11px', color: '#1E9438', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle size={12} color="#1E9438" /> {kpi}
                        </span>
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
      <section className="it-sec it-sec-alt" id="it-contact" style={{ padding: '80px 8%', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            background: 'var(--white)',
            border: '1.5px solid var(--border-primary)',
            borderRadius: '24px',
            padding: '44px',
            boxShadow: '0 12px 40px rgba(27,42,107,0.04)'
          }}>
            {!isSuccess ? (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 900, marginBottom: '6px' }}>Estimate Your IT Project</h3>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '32px' }}>Submit details for a quote in 48 hours</div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="grid-responsive-process">
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name *</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-primary)', borderRadius: '10px', background: 'var(--surf-1)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone / WhatsApp *</label>
                    <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-primary)', borderRadius: '10px', background: 'var(--surf-1)', color: 'var(--text-primary)' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="grid-responsive-process">
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address *</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-primary)', borderRadius: '10px', background: 'var(--surf-1)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company Name</label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-primary)', borderRadius: '10px', background: 'var(--surf-1)', color: 'var(--text-primary)' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Project Service Type</label>
                  <select value={service} onChange={(e) => setService(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-primary)', borderRadius: '10px', background: 'var(--surf-1)', color: 'var(--text-primary)' }}>
                    <option>Fintech Payment Portal</option>
                    <option>Web Application Development</option>
                    <option>Mobile App (iOS/Android)</option>
                    <option>Cloud Infrastructure & DevOps</option>
                    <option>Custom ERP & CRM Module</option>
                    <option>AI Automation & ML Pipelines</option>
                  </select>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Project Details & Requirements</label>
                  <textarea rows="4" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Describe what you want to build..." style={{ width: '100%', padding: '14px', border: '1px solid var(--border-primary)', borderRadius: '10px', background: 'var(--surf-1)', color: 'var(--text-primary)', lineHeight: 1.6 }}></textarea>
                </div>

                <button type="submit" className="btn-cred-neon" style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  <Send size={15} /> Submit Inquiry via WhatsApp
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(45,184,75,0.06)', border: '2.5px solid #2DB84B', display: 'flex', alignItems: 'center', justify: 'center', margin: '0 auto 24px', color: '#2DB84B' }}><Check size={32} /></div>
                <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '10px' }}>Project Inquiry Sent!</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Opening WhatsApp to finalize your B2B proposal details...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
