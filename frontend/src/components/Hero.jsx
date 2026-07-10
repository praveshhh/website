import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Shield, Sparkles, Zap, Smartphone, CheckCircle, Send, ArrowRight, ArrowLeftRight, Phone, Mail, MapPin, Globe, Star, Laptop, Plane, Building, DollarSign, Calendar, MessageSquare } from 'lucide-react';
import axios from 'axios';
import TiltCard from './TiltCard';

// ─── Reusable animated section wrapper ───────────────────────────────────────
function FadeUp({ children, delay = 0, className = '', style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Staggered grid of cards ─────────────────────────────────────────────────
function StaggerGrid({ children, style = {}, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } }
      }}
    >
      {children}
    </motion.div>
  );
}

function StaggerCard({ children, style = {}, className = '' }) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated section heading ─────────────────────────────────────────────────
function SectionHeading({ eyebrow, title, subtitle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  return (
    <div ref={ref} style={{ textAlign: 'center', marginBottom: '56px' }}>
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-periwinkle)' }}
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontSize: '38px', marginTop: '12px', fontWeight: 800, color: 'var(--text-primary)' }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '12px', maxWidth: '640px', margin: '12px auto 0', lineHeight: '1.6' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// ─── Magnetic button wrapper ──────────────────────────────────────────────────
function MagneticButton({ children, className, style, onClick, type }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 28 });
  const springY = useSpring(y, { stiffness: 300, damping: 28 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.28);
    y.set((e.clientY - cy) * 0.28);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      className={className}
      style={{ ...style, x: springX, y: springY, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      type={type}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimatedStat({ val, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 style={{ fontSize: '24px', color: 'var(--text-primary)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{val}</h3>
      <p style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>{label}</p>
    </motion.div>
  );
}

// ─── 3D Glassmorphic Card & Pulsing Ledger Flow ───────────────────────────────
function FintechPaymentsVisual3D() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    const rX = -(mouseY / height) * 22;
    const rY = (mouseX / width) * 22;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const [txs, setTxs] = useState([
    { id: 1, val: '₹10,500 via UPI', delay: 0 },
    { id: 2, val: '₹4,200 via Card', delay: 1.2 },
    { id: 3, val: '₹18,000 via NetBanking', delay: 2.4 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTxs(prev => prev.map(t => {
        const valList = ['₹1,200 via UPI', '₹28,500 via IMPS', '₹3,400 via Wallets', '₹15,000 via RuPay', '₹9,800 via Visa'];
        return {
          ...t,
          val: valList[Math.floor(Math.random() * valList.length)]
        };
      }));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '350px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      perspective: '1200px',
      overflow: 'hidden',
      borderRadius: '24px',
      background: 'rgba(94, 92, 230, 0.02)',
      border: '1px solid rgba(94, 92, 230, 0.08)'
    }}>
      <div style={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        height: '100px',
        background: 'linear-gradient(to top, rgba(94, 92, 230, 0.05), transparent)',
        zIndex: 0
      }} />

      {txs.map((tx, idx) => (
        <motion.div
          key={tx.id}
          initial={{ opacity: 0, y: 150, scale: 0.8 }}
          animate={{
            opacity: [0, 0.9, 0.9, 0],
            y: [-20, -140, -180, -220],
            scale: [0.85, 1, 1, 0.9],
            x: idx === 0 ? [-50, -30, -50] : idx === 1 ? [0, 30, 10] : [60, 40, 50]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: tx.delay,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1.5px solid rgba(94, 92, 230, 0.15)',
            boxShadow: '0 8px 24px rgba(94, 92, 230, 0.08)',
            padding: '8px 14px',
            borderRadius: '50px',
            fontSize: '10px',
            fontWeight: 800,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span style={{ color: '#2DB84B' }}>⚡</span> {tx.val}
        </motion.div>
      ))}

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '300px',
          height: '180px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(27, 42, 107, 0.95) 0%, rgba(13, 22, 56, 0.98) 100%)',
          border: '1.5px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 30px 60px rgba(13, 24, 64, 0.25), inset 0 1px 1px rgba(255,255,255,0.2)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          cursor: 'pointer',
          position: 'relative',
          zIndex: 1,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease-out, box-shadow 0.3s ease'
        }}
        whileHover={{
          boxShadow: '0 40px 80px rgba(94, 92, 230, 0.3), inset 0 1px 2px rgba(255,255,255,0.3)',
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 20% 30%, rgba(94, 92, 230, 0.25) 0%, transparent 60%)',
          borderRadius: '14px',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', transform: 'translateZ(30px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '1px', color: '#fff', fontFamily: 'var(--font-display)' }}>
              BillsPay<span style={{ color: '#2DB84B' }}>24X7</span>✓
            </span>
            <span style={{ fontSize: '7px', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>Smart Merchant Link</span>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 8a10 10 0 0 1 20 0" />
            <path d="M5 12a7 7 0 0 1 14 0" />
            <path d="M8 16a4 4 0 0 1 8 0" />
          </svg>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '20px 0', transform: 'translateZ(20px)' }}>
          <div style={{
            width: '38px',
            height: '28px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #F3CE5E 0%, #D4AF37 50%, #B8901C 100%)',
            border: '1px solid rgba(0,0,0,0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(0,0,0,0.15)' }} />
            <div style={{ position: 'absolute', left: '33%', top: 0, bottom: 0, width: '1px', background: 'rgba(0,0,0,0.15)' }} />
            <div style={{ position: 'absolute', left: '66%', top: 0, bottom: 0, width: '1px', background: 'rgba(0,0,0,0.15)' }} />
          </div>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: 800, fontFamily: 'var(--font-mono)', letterSpacing: '0.5px' }}>
            SECURE LEDGER L1
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', transform: 'translateZ(25px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', color: '#fff', letterSpacing: '2.5px', fontFamily: 'var(--font-mono)' }}>•••• •••• •••• 2478</span>
            <span style={{ fontSize: '7px', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>BILLSPAY MERCHANT</span>
          </div>
          <div style={{ display: 'flex', position: 'relative', width: '34px', height: '22px' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(235, 0, 27, 0.75)', position: 'absolute', left: 0 }} />
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(247, 158, 27, 0.75)', position: 'absolute', right: 0 }} />
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          right: '25px',
          bottom: '25px',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
          fontSize: '12px',
          color: '#fff',
          zIndex: 2
        }}
      >
        🛡️
      </motion.div>
    </div>
  );
}

// ─── 3D Mini Graphics for Fintech Cards ──────────────────────────────────────
function FintechCardVisual3D({ type }) {
  if (type === 'Payment Gateway') {
    return (
      <div style={{
        width: '100%',
        height: '110px',
        background: 'linear-gradient(135deg, rgba(45,184,75,0.06) 0%, rgba(45,184,75,0.02) 100%)',
        borderBottom: '1px solid rgba(45,184,75,0.1)',
        borderRadius: '12px 12px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '16px'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(45,184,75,0.15) 0%, transparent 60%)' }} />
        
        <svg width="120" height="80" viewBox="0 0 120 80" style={{ position: 'relative', zIndex: 1 }}>
          <rect x="45" y="10" width="30" height="60" rx="4" fill="none" stroke="#2DB84B" strokeWidth="2" />
          <line x1="55" y1="65" x2="65" y2="65" stroke="#2DB84B" strokeWidth="2" strokeLinecap="round" />
          <rect x="50" y="16" width="20" height="42" rx="1" fill="rgba(45,184,75,0.1)" />
          <motion.g
            animate={{ y: [0, -6, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <rect x="20" y="24" width="45" height="28" rx="3" fill="#1B2A6B" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <rect x="25" y="29" width="10" height="7" rx="1" fill="#F3CE5E" />
            <line x1="25" y1="44" x2="45" y2="44" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          </motion.g>
          <motion.circle cx="82" cy="22" r="10" fill="#2DB84B"
            animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
          <path d="M78 22l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
    );
  }

  if (type === 'UPI Collections') {
    return (
      <div style={{
        width: '100%',
        height: '110px',
        background: 'linear-gradient(135deg, rgba(94,92,230,0.06) 0%, rgba(94,92,230,0.02) 100%)',
        borderBottom: '1px solid rgba(94,92,230,0.1)',
        borderRadius: '12px 12px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '16px'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(94,92,230,0.15) 0%, transparent 60%)' }} />
        
        <svg width="120" height="80" viewBox="0 0 120 80" style={{ position: 'relative', zIndex: 1 }}>
          <rect x="42" y="12" width="36" height="36" rx="3" fill="none" stroke="var(--accent-periwinkle)" strokeWidth="2" />
          <rect x="46" y="16" width="10" height="10" fill="var(--accent-periwinkle)" />
          <rect x="64" y="16" width="10" height="10" fill="var(--accent-periwinkle)" />
          <rect x="46" y="34" width="10" height="10" fill="var(--accent-periwinkle)" />
          <rect x="66" y="36" width="6" height="6" fill="var(--accent-periwinkle)" />
          <motion.line x1="36" y1="12" x2="84" y2="12" stroke="#2DB84B" strokeWidth="2"
            animate={{ y: [0, 36, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.rect x="36" y="12" width="48" height="2" fill="rgba(45,184,75,0.4)"
            animate={{ y: [0, 36, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.path d="M18 55c5 0 9-4 9-9" stroke="var(--accent-periwinkle)" strokeWidth="2" strokeDasharray="3 3" fill="none" />
          <motion.g
            animate={{ x: [-20, 40], y: [60, 40], opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <circle cx="20" cy="55" r="3" fill="#2DB84B" />
          </motion.g>
          <text x="60" y="65" textAnchor="middle" fontSize="9" fontWeight="800" fill="var(--accent-periwinkle)" fontFamily="var(--font-mono)">DYNAMIC QR</text>
        </svg>
      </div>
    );
  }

  if (type === 'Virtual Accounts') {
    return (
      <div style={{
        width: '100%',
        height: '110px',
        background: 'linear-gradient(135deg, rgba(14,165,233,0.06) 0%, rgba(14,165,233,0.02) 100%)',
        borderBottom: '1px solid rgba(14,165,233,0.1)',
        borderRadius: '12px 12px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '16px'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(14,165,233,0.15) 0%, transparent 60%)' }} />
        
        <svg width="120" height="80" viewBox="0 0 120 80" style={{ position: 'relative', zIndex: 1 }}>
          <circle cx="60" cy="35" r="20" fill="none" stroke="#0EA5E9" strokeWidth="2" />
          <motion.circle cx="60" cy="35" r="14" fill="none" stroke="#0EA5E9" strokeWidth="1" strokeDasharray="4 2"
            animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} />
          <circle cx="60" cy="35" r="6" fill="#0EA5E9" />
          
          <circle cx="20" cy="20" r="6" fill="rgba(14,165,233,0.2)" stroke="#0EA5E9" strokeWidth="1.5" />
          <circle cx="20" cy="50" r="6" fill="rgba(14,165,233,0.2)" stroke="#0EA5E9" strokeWidth="1.5" />
          <circle cx="100" cy="20" r="6" fill="rgba(14,165,233,0.2)" stroke="#0EA5E9" strokeWidth="1.5" />
          <circle cx="100" cy="50" r="6" fill="rgba(14,165,233,0.2)" stroke="#0EA5E9" strokeWidth="1.5" />

          <line x1="26" y1="22" x2="42" y2="28" stroke="rgba(14,165,233,0.4)" strokeWidth="1.5" />
          <line x1="26" y1="48" x2="42" y2="42" stroke="rgba(14,165,233,0.4)" strokeWidth="1.5" />
          <line x1="94" y1="22" x2="78" y2="28" stroke="rgba(14,165,233,0.4)" strokeWidth="1.5" />
          <line x1="94" y1="48" x2="78" y2="42" stroke="rgba(14,165,233,0.4)" strokeWidth="1.5" />

          <motion.circle cx="34" cy="25" r="2" fill="#2DB84B"
            animate={{ cx: [26, 42], cy: [22, 28] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
          <motion.circle cx="86" cy="45" r="2" fill="#2DB84B"
            animate={{ cx: [78, 94], cy: [42, 48] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
            
          <text x="60" y="68" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0EA5E9" fontFamily="var(--font-mono)">AUTO ROUTING</text>
        </svg>
      </div>
    );
  }

  if (type === 'Payout API') {
    return (
      <div style={{
        width: '100%',
        height: '110px',
        background: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(245,158,11,0.02) 100%)',
        borderBottom: '1px solid rgba(245,158,11,0.1)',
        borderRadius: '12px 12px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '16px'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(245,158,11,0.15) 0%, transparent 60%)' }} />
        
        <svg width="120" height="80" viewBox="0 0 120 80" style={{ position: 'relative', zIndex: 1 }}>
          <rect x="48" y="24" width="24" height="24" rx="4" fill="none" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="60" cy="36" r="4" fill="#F59E0B" />

          <circle cx="15" cy="36" r="5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          <circle cx="60" cy="10" r="5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          <circle cx="105" cy="36" r="5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />

          <line x1="48" y1="36" x2="20" y2="36" stroke="rgba(245,158,11,0.4)" strokeWidth="1.5" />
          <line x1="60" y1="24" x2="60" y2="15" stroke="rgba(245,158,11,0.4)" strokeWidth="1.5" />
          <line x1="72" y1="36" x2="100" y2="36" stroke="rgba(245,158,11,0.4)" strokeWidth="1.5" />

          <motion.circle cx="48" cy="36" r="2.5" fill="#2DB84B"
            animate={{ cx: [48, 20] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }} />
          <motion.circle cx="60" cy="24" r="2.5" fill="#2DB84B"
            animate={{ cy: [24, 15] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }} />
          <motion.circle cx="72" cy="36" r="2.5" fill="#2DB84B"
            animate={{ cx: [72, 100] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }} />

          <text x="60" y="65" textAnchor="middle" fontSize="9" fontWeight="800" fill="#F59E0B" fontFamily="var(--font-mono)">REALTIME 24×7</text>
        </svg>
      </div>
    );
  }

  return null;
}

// ─── Main export ──────────────────────────────────────────────────────────────
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
  const [slideshowPaused, setSlideshowPaused] = useState(false);

  // Solutions automatic autoplay slideshow loop
  useEffect(() => {
    if (slideshowPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const order = ['fintech', 'banking', 'travel', 'it'];
        const nextIdx = (order.indexOf(prev) + 1) % order.length;
        return order[nextIdx];
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [slideshowPaused]);

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    // Temporarily trigger state refresh to reset the interval
    setSlideshowPaused(true);
    setTimeout(() => {
      setSlideshowPaused(false);
    }, 50);
  };

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
      title: 'BillsPay24X7✓: Payment Infrastructure',
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
            'UPI Collection: 0.17% MDR (best rate in India)',
            'Cards: Visa, Mastercard, RuPay, Amex',
            'Netbanking: 80+ bank partners',
            'Wallets: Paytm, PhonePe, Amazon Pay',
            'T+1 settlement (next business day)',
            'White-label checkout page & REST API SDK'
          ]
        },
        {
          title: 'UPI Collections',
          tag: 'Instant Credit',
          desc: 'Dynamic QR, payment links, UPI AutoPay mandates & intent flow. India\'s fastest growing payment method to own your complete UPI stack with BillsPay24X7✓.',
          feats: [
            'Dynamic QR code generated per transaction',
            'UPI payment links via WhatsApp / SMS',
            'UPI AutoPay: recurring mandate management',
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
            'Auto credit detection: IMPS/NEFT/RTGS',
            'Real-time webhook on every fund credit',
            'Bulk virtual account creation via API',
            'RBI-compliant fund segregation',
            'Custom settlement rules per product category'
          ]
        },
        {
          title: 'Payout API',
          tag: 'Real-time 24×7',
          desc: 'Send money to any bank account, UPI ID, or wallet instantly. Bulk payouts for salary, vendors, cashbacks & refunds are all processed via BillsPay24X7✓ REST API.',
          feats: [
            'Bank transfer: IMPS/NEFT/RTGS via API',
            'UPI Payout: send to any UPI ID instantly',
            'Bulk payout via CSV upload or API batch',
            'Wallet credit: Paytm, PhonePe & more',
            '24×7 real-time payout processing',
            'Status webhooks & full reconciliation report'
          ]
        }
      ]
    },
    banking: {
      title: 'BillsPay24X7✓: Financial Inclusion Services',
      chip: '🏦 Banking & Financial Inclusion',
      desc: 'BBPS (220+ billers), AEPS (Aadhaar banking), DMT (money transfer), and Mobile Recharge provide complete last-mile banking for India\'s 1.4 billion people.',
      stats: [
        { label: 'BBPS Billers', val: '220+' },
        { label: 'Certified', val: 'NPCI' },
        { label: 'AEPS Daily', val: '₹10K' },
        { label: 'Processing', val: '24×7' }
      ],
      cards: [
        {
          title: 'BBPS: Bill Payments',
          tag: '220+ Billers',
          desc: 'Bharat Bill Payment System via BillsPay24X7✓. Pay electricity, gas, water, broadband, insurance, DTH & loan EMIs in one click with instant confirmation.',
          feats: [
            'Electricity: UPPCL, MSEDCL, BESCOM & 80+ boards',
            'Gas (PNG) & Water utility bills',
            'DTH & Cable: Tata Play, Airtel, Dish TV',
            'Loan EMI payments: NBFCs & MFIs',
            'Insurance premium payments',
            'Instant biller fetch & bill confirmation'
          ]
        },
        {
          title: 'AEPS Services',
          tag: 'Last-Mile Banking',
          desc: 'Aadhaar Enabled Payment System: cash withdrawal, balance inquiry & fund transfer using only fingerprint. No card, no PIN needed. Enable last-mile banking.',
          feats: [
            'Cash Withdrawal up to ₹10,000/day via Aadhaar',
            'Balance Inquiry: real-time bank balance check',
            'Mini Statement: last 5 transactions',
            'Aadhaar to Aadhaar fund transfer',
            'Biometric devices: Morpho, Mantra, Startek',
            'Commission per transaction for CSP agents'
          ]
        },
        {
          title: 'DMT: Money Transfer',
          tag: 'Instant Transfer',
          desc: 'Domestic Money Transfer for migrant workers & rural customers. Cash-in at any BillsPay24X7✓ agent, instant IMPS credit to any bank account across India 24×7.',
          feats: [
            'Send up to ₹25,000/transaction · ₹1L/month',
            'Sender KYC via Aadhaar OTP verification',
            'Beneficiary management: save & reuse',
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
            'Prepaid: Jio, Airtel, Vi, BSNL, MTNL',
            'Postpaid bill payment with e-receipt',
            'DTH: Tata Play, Airtel, Dish, Sun Direct',
            'Data card & FASTag recharge',
            'Operator plan fetch with offers & validity',
            'Instant commission credit per transaction'
          ]
        }
      ]
    },
    travel: {
      title: 'Travel Solutions & APIs',
      chip: '🌍 Complete Travel Stack',
      desc: 'Flights, Hotels, Buses, Trains & Holiday Packages. B2B travel APIs + consumer portal. 500+ airlines, 1M+ hotels.',
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
          desc: 'Domestic & International flights. 500+ airlines, lowest fares, group bookings, charter & cargo support.',
          feats: [
            'Domestic flights across all major Indian carriers',
            'International coverage via 500+ global airlines',
            'Lowest fare guarantee with real-time pricing',
            'Group bookings, charter & cargo support',
            'Instant PNR confirmation & seat selection',
            'B2B markup engine for agent commission'
          ]
        },
        {
          title: 'Hotel Booking',
          tag: '1M+ Hotels',
          desc: '1M+ hotels globally from budget to luxury. Instant confirmation, free cancellation, B2B wholesale rates.',
          feats: [
            '1M+ properties across 190+ countries',
            'Budget to luxury with star rating filters',
            'Instant confirmation & free cancellation options',
            'B2B wholesale rates for travel agents',
            'Room type, amenity & location filters',
            'Best rate guarantee on every booking'
          ]
        },
        {
          title: 'Bus Tickets',
          tag: '1000+ Operators',
          desc: '1000+ operators, real-time seat inventory, AC/sleeper/semi-sleeper, multi-city routes and live tracking.',
          feats: [
            '1000+ operators across all Indian routes',
            'AC, Sleeper & Semi-sleeper options',
            'Real-time seat inventory & selection',
            'Live GPS tracking for booked journeys',
            'Multi-city routes with boarding point selection',
            'M-Ticket (mobile ticket) support'
          ]
        },
        {
          title: 'Train Booking',
          tag: 'IRCTC API',
          desc: 'IRCTC integrated. Tatkal, general and premium class tickets with live PNR and waitlist alerts.',
          feats: [
            'IRCTC API integration for all train types',
            'Tatkal & Premium Tatkal booking support',
            'General, Sleeper, AC & Premium classes',
            'Live PNR status & waitlist alerts',
            'E-ticket generation with mobile view',
            'Cancellation & refund automation'
          ]
        },
        {
          title: 'Holiday Packages',
          tag: 'White Label',
          desc: 'Curated domestic & international packages. White-label your travel brand on our booking engine.',
          feats: [
            'Curated domestic & international packages',
            'Flights + Hotels + Transfers bundled',
            'White-label your travel brand',
            'Customizable itineraries & pricing',
            'B2B & B2C booking engine support',
            'Commission management for agents'
          ]
        },
        {
          title: 'Travel Portal',
          tag: 'Book Now',
          desc: 'Book flights, hotels, buses, trains and holiday packages at the best prices on our consumer travel platform.',
          feats: [
            'Consumer-facing travel booking platform',
            'Best prices across flights, hotels & buses',
            'Trains & holiday packages included',
            'Instant e-tickets & hotel vouchers',
            'Easy cancellation & refund process',
            '24x7 WhatsApp, phone & email support'
          ]
        }
      ]
    },
    it: {
      title: 'IT Software & Solutions',
      chip: '🛠️ Custom Development',
      desc: 'Fintech portals, travel engines, mobile apps, ERP, CRM, B2B SaaS platforms. 120+ projects shipped, 50+ clients, 6-week average delivery.',
      stats: [
        { label: 'Projects', val: '120+' },
        { label: 'Clients', val: '50+' },
        { label: 'Avg Delivery', val: '6 Wks' },
        { label: 'Retention', val: '99%' }
      ],
      cards: [
        {
          title: 'Fintech & Payment Portals',
          tag: 'RBI Compliant',
          desc: 'AEPS dashboards, BBPS portals, DMT panels, payout systems and agent networks built RBI-compliant and PCI-DSS secure.',
          feats: [
            'BBPS API, AEPS, DMT & UPI integration',
            'Multi-tier agent hierarchy dashboard',
            'PCI-DSS & RBI compliant architecture',
            'Real-time transaction monitoring',
            'T+1 settlement engine',
            'Portals processing Rs 50L+ daily'
          ]
        },
        {
          title: 'Web Development',
          tag: 'Full-Stack',
          desc: 'React, Next.js, Node.js high-performance portals, SaaS platforms and progressive web apps handling 10,000 concurrent users.',
          feats: [
            'React, Next.js & Node.js stack',
            'High-performance SaaS platforms',
            'Progressive Web Apps with offline support',
            'PostgreSQL, MongoDB & Redis integration',
            'REST & GraphQL API architecture',
            'Handles 10,000+ concurrent users'
          ]
        },
        {
          title: 'Mobile App Development',
          tag: 'iOS & Android',
          desc: 'iOS and Android from one Flutter or React Native codebase. Fintech apps, travel booking and field-agent apps with offline sync.',
          feats: [
            'Flutter & React Native cross-platform',
            'Fintech, travel & commerce apps',
            'Biometric login with Face ID support',
            'Offline sync for field-agent apps',
            'Published on App Store & Play Store',
            'Zero-crash rate guarantee'
          ]
        },
        {
          title: 'Cloud & DevOps',
          tag: '99.9% Uptime',
          desc: 'AWS, Azure and GCP architecture, Docker containers, Kubernetes orchestration, CI/CD pipelines with zero-downtime deployments.',
          feats: [
            'AWS, Azure & GCP architecture',
            'Docker & Kubernetes orchestration',
            'CI/CD pipelines for zero-downtime',
            'Auto-scaling for traffic spikes',
            '24x7 monitoring & alerting',
            'Disaster recovery & security audits'
          ]
        },
        {
          title: 'E-Commerce Solutions',
          tag: 'B2B & B2C',
          desc: 'B2B and B2C stores with integrated payment gateway, inventory management, GST billing, logistics APIs and real-time analytics.',
          feats: [
            'Shopify, WooCommerce & custom builds',
            'Integrated payment gateway & payouts',
            'GST-compliant billing & invoicing',
            'Inventory management system',
            'Logistics API integration',
            'Real-time sales analytics'
          ]
        },
        {
          title: 'Travel Tech Platform',
          tag: 'White Label',
          desc: 'White-label B2B & B2C flight, hotel, bus and train booking engines with IRCTC API, GDS integration and commission management.',
          feats: [
            'GDS API & IRCTC integration',
            'White-label B2B & B2C portals',
            'Flight, hotel, bus & train engines',
            'B2B agent portal with commission mgmt',
            'Real-time availability & pricing',
            'Branded booking experience'
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
      d: 'We understand your business model, target customers, transaction volume, and service requirements through a free, no-pressure discovery call. We match you to the right BillsPay24X7✓ solutions instead of generic bundles.',
      tags: ['Fintech Startups', 'E-commerce', 'Travel Companies', 'Aggregators', 'Enterprises']
    },
    {
      n: '02',
      t: 'Solution Design',
      d: 'Based on your requirements, we design the best combination of BillsPay24X7✓ payment, banking, travel, and IT solutions. Every decision is deliberate and tailored to your market, model, and users.',
      tags: ['Payment Gateway', 'Banking APIs', 'Travel Engine', 'IT Software', 'Custom Platform']
    },
    {
      n: '03',
      t: 'Documentation & Compliance',
      d: 'Our team handles the entire compliance journey, covering business KYC, merchant onboarding, bank verification, and regulatory review. You focus on building; we handle the paperwork.',
      tags: ['Business KYC', 'Merchant Onboarding', 'Bank Verification', 'Compliance Review']
    },
    {
      n: '04',
      t: 'Technology Setup',
      d: 'We configure your complete technical infrastructure: API keys, sandbox environment, merchant dashboard, banking integrations, reporting panel, and user management, which are all production-ready.',
      tags: ['API Keys & Sandbox', 'Merchant Dashboard', 'Banking Integration', 'Reporting Panel']
    },
    {
      n: '05',
      t: 'Integration & Development',
      d: 'Our BillsPay24X7✓ developers integrate every solution into your existing website, mobile app, or platform using your preferred tech stack, delivering clean code, full documentation, and knowledge transfer.',
      tags: ['Website Integration', 'Mobile App', 'Fintech Portal', 'SaaS Platform']
    },
    {
      n: '06',
      t: 'Testing & UAT',
      d: 'Complete end-to-end testing across every service in sandbox. Pay-in, payouts, BBPS, recharge, travel booking, and verification flows, which are all validated before a single real rupee moves.',
      tags: ['Payment Flow Testing', 'Payout Validation', 'BBPS Testing', 'Travel API UAT']
    },
    {
      n: '07',
      t: 'Go Live & Scale',
      d: 'Your platform is live, accepting real payments, processing payouts, and serving customers via BillsPay24X7✓. We stay as your 24×7 growth partner with monitoring and roadmap planning.',
      tags: ['Accept Payments', 'Process Payouts', 'Travel Bookings', 'Scale Operations']
    }
  ];

  // Why Us cards
  const whyUs = [
    { icon: '⚡', title: 'T+1 Settlement', desc: 'Next-day settlements powered by Jio Payment & Cashfree. Your cash flow accelerated every business day.' },
    { icon: '🔐', title: 'Bank-Grade Security', desc: 'PCI-DSS Level 1, 256-bit SSL encryption, 2FA & full RBI-compliant infrastructure always active.' },
    { icon: '🛠️', title: 'Full-Stack IT', desc: 'Payment APIs, mobile apps, cloud DevOps, and travel engines. BillsPay24X7✓ delivers it all.' },
    { icon: '📊', title: 'Real-Time Analytics', desc: 'Live dashboards with transaction insights, reconciliation tools & business intelligence reports.' },
    { icon: '🤝', title: '24×7 Dedicated Support', desc: 'WhatsApp, phone & email support. Your dedicated account manager always reachable, always accountable.' },
    { icon: '🚀', title: 'Rapid Deployment', desc: 'Go live in days, not months. Sandbox-to-production in as little as 72 hours, guaranteed.' }
  ];

  // Business Models
  const businessModels = [
    { icon: '🏪', title: 'Retail & Kirana', desc: 'AEPS, BBPS, DMT & recharge for neighbourhood payment outlets across India.' },
    { icon: '🏢', title: 'B2B Aggregators', desc: 'White-label platforms with multi-level retailer & distributor hierarchy.' },
    { icon: '🛒', title: 'E-commerce', desc: 'Payment gateway + payout + GST invoicing for online retail businesses.' },
    { icon: '✈️', title: 'Travel Agencies', desc: 'Complete travel booking, offering flight, hotel, bus, and train services with B2B markup.' },
    { icon: '💊', title: 'Healthcare', desc: 'Patient billing, subscription plans & insurance payment management.' },
    { icon: '🎓', title: 'Education', desc: 'Fee collection, instalment billing & automated payment reminders.' },
    { icon: '🏗️', title: 'SaaS Startups', desc: 'Recurring billing, usage-based pricing & developer-friendly APIs.' },
    { icon: '🏛️', title: 'Enterprise', desc: 'Custom IT solutions, ERP integration & dedicated cloud infrastructure.' }
  ];

  // Testimonials
  const testimonials = [
    {
      stars: '★★★★★',
      quote: '"BillsPay24X7✓ helped us integrate UPI, BBPS, and our payment gateway within days. Their tech team is exceptional and 24×7 support actually means it, being always available and highly responsive."',
      initials: 'RK',
      name: 'Rahul Kumar',
      role: 'Founder, PayEasy Fintech · Lucknow'
    },
    {
      stars: '★★★★★',
      quote: '"We launched our complete travel booking platform, covering flight, hotel, and bus services, in under 2 weeks via BillsPay24X7✓. The integration is seamless and the commission management system is exactly what we needed."',
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
      <section className="hero-sec" style={{
        position: 'relative',
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 8% 40px',
        background: 'radial-gradient(circle at 10% 20%, rgba(94, 92, 230, 0.03) 0%, transparent 60%), radial-gradient(circle at 95% 85%, rgba(0, 122, 255, 0.02) 0%, transparent 60%)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
        boxSizing: 'border-box'
      }}>
        {/* Animated ambient blobs */}
        <motion.div
          className="glow-overlay-green"
          style={{ top: '-10%', left: '-5%' }}
          animate={{ x: [0, 20, 0], y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="glow-overlay-blue"
          style={{ bottom: '5%', right: '5%' }}
          animate={{ x: [0, -15, 0], y: [0, 10, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

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
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
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
              }}
              className="hero-overline"
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-periwinkle)', display: 'inline-block' }} />
              India's Complete Fintech · IT · Travel Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(28px, 6vw, 62px)',
                lineHeight: '1.1',
                letterSpacing: '-0.03em',
                marginBottom: '20px',
                fontWeight: 900,
                color: 'var(--text-primary)'
              }}
            >
              Make Payment,<br />
              <span className="text-gradient-green">Build Growth</span><br />
              <span style={{ fontSize: 'clamp(18px, 4vw, 42px)', fontWeight: 800, display: 'block', marginTop: '12px' }} className="text-gradient-blue">
                Fintech · IT Software · Travel
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: '15px',
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                maxWidth: '560px',
                marginBottom: '24px',
                fontWeight: 400
              }}
            >
              Payment Gateway · BBPS · AEPS · DMT · UPI · Payout API · Flight · Hotel · Bus · Train · Custom Software · Cloud & DevOps. India's complete business platform with T+1 Settlement and RBI compliance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
            >
              <MagneticButton onClick={() => scrollToId('contact')} className="btn-cred-neon">
                🚀 Free Consultation <ArrowRight size={14} />
              </MagneticButton>
              <MagneticButton onClick={() => scrollToId('solutions')} className="btn-cred-outline">
                Explore All Services ↓
              </MagneticButton>
            </motion.div>

            {/* Statistics Row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: '36px',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
                maxWidth: '560px',
                borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                paddingTop: '28px'
              }} className="grid-responsive-stats"
            >
              {[
                { val: '500+', label: 'Merchants', accent: false },
                { val: '24×7', label: 'Support', accent: true },
                { val: '99.9%', label: 'Uptime', accent: false },
                { val: 'T+1', label: 'Settlement', accent: true }
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 style={{ fontSize: '24px', color: s.accent ? 'var(--accent-periwinkle)' : 'var(--text-primary)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{s.val}</h3>
                  <p style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile-only Compact Card — shown at ≤968px instead of 3D stack */}
          <div className="hero-mobile-card">
            <div className="hero-mobile-card-chip" />
            <div className="hero-mobile-card-info">
              <span className="hero-mobile-card-title">BillsPay24X7✓</span>
              <span className="hero-mobile-card-num">•••• •••• 24X7</span>
            </div>
            <div className="hero-mobile-card-badges">
              <span className="hero-mobile-card-badge">T+1 Payouts</span>
              <span className="hero-mobile-card-badge">0.17% UPI</span>
            </div>
          </div>

          {/* Right Hero Visual: 3D stacked cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative'
            }} className="hero-visual-container"
          >
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
              <motion.div
                className="card-cred"
                style={{ padding: '12px 18px', display: 'flex', flexDirection: 'column', minHeight: 'auto', background: 'rgba(255, 255, 255, 0.75)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', borderRadius: '14px', width: '160px' }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span style={{ fontSize: '9px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.03em' }}>Today's UPI Vol</span>
                <span style={{ fontSize: '16px', color: 'var(--accent-green)', fontWeight: 800, fontFamily: 'var(--font-mono)', marginTop: '2px' }}>₹12.4 Lakhs</span>
                <span style={{ fontSize: '8px', color: 'var(--text-muted)', marginTop: '2px' }}>Live Processing</span>
              </motion.div>
              {/* Metric 2 */}
              <motion.div
                className="card-cred"
                style={{ padding: '12px 18px', display: 'flex', flexDirection: 'column', minHeight: 'auto', background: 'rgba(255, 255, 255, 0.75)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', borderRadius: '14px', width: '160px' }}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              >
                <span style={{ fontSize: '9px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.03em' }}>Settlement Cycle</span>
                <span style={{ fontSize: '16px', color: 'var(--accent-periwinkle)', fontWeight: 800, fontFamily: 'var(--font-mono)', marginTop: '2px' }}>T+1 Payouts</span>
                <span style={{ fontSize: '8px', color: 'var(--text-muted)', marginTop: '2px' }}>RBI Compliant</span>
              </motion.div>
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
          </motion.div>
        </div>
      </section>

      {/* 2. INFINITE TICKER BAR */}
      <section className="ticker-sec" style={{
        background: '#FFFFFF',
        borderTop: '1px solid rgba(0, 0, 0, 0.04)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
        height: '44px',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <div className="ticker-wrap">
          <div className="ticker-content">
            {[1, 2].map((groupIndex) => (
              <div key={groupIndex} style={{ display: 'inline-flex', gap: '48px', alignItems: 'center', paddingRight: '48px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', letterSpacing: '0.03em' }}>
                  <CheckCircle size={13} color="var(--accent-periwinkle)" /> NPCI Certified: BBPS & AEPS
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
      <section 
        id="solutions" 
        onMouseEnter={() => setSlideshowPaused(true)}
        onMouseLeave={() => setSlideshowPaused(false)}
        style={{
          padding: '40px 8%',
          background: 'rgba(255,255,255,0.2)'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionHeading
            eyebrow="our solutions"
            title="Everything Your Business Needs"
            subtitle="Fintech payments · Banking services · Travel booking · IT software. India's most complete business platform with T+1 settlement and 24×7 support."
          />

          {/* Toggle Buttons */}
          <FadeUp delay={0.1} style={{ textAlign: 'center', marginBottom: '20px', marginTop: '-28px' }}>
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
                <motion.button 
                  key={tab.key}
                  onClick={() => handleTabClick(tab.key)}
                  style={{
                    padding: '10px 24px',
                    background: activeTab === tab.key ? '#FFFFFF' : 'transparent',
                    color: activeTab === tab.key ? 'var(--text-primary)' : 'var(--text-secondary)',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: activeTab === tab.key ? '0 4px 12px rgba(0,0,0,0.04)' : 'none'
                  }}
                  className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </FadeUp>

          {/* Active Tab Panel */}
          <div style={{ perspective: '1500px', width: '100%', position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.92, transformOrigin: 'center center' }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  transition: { delay: 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] } 
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 1.08,
                  transformOrigin: 'center center',
                  transition: { duration: 0.25, ease: 'easeOut' } 
                }}
                style={{ marginTop: '20px', backfaceVisibility: 'hidden', width: '100%' }}
              >
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
                  
                  {/* Fintech horizontal stats view */}
                  {activeTab === 'fintech' && (
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '24px', flexWrap: 'wrap' }}>
                      {tabInfo.fintech.stats.map((stat, i) => (
                        <div key={i} style={{ borderRight: i < 3 ? '1px solid rgba(0,0,0,0.08)' : 'none', paddingRight: '20px' }}>
                          <span style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{stat.val}</span>
                          <span style={{ display: 'block', fontSize: '9px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <motion.button
                    onClick={() => scrollToId('contact')}
                    className="btn-cred-neon"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  >
                    🚀 Get Started with BillsPay24X7✓
                  </motion.button>
                </div>

                {/* Sub-banner stats / 3D Visualizer */}
                {activeTab === 'fintech' ? (
                  <FintechPaymentsVisual3D />
                ) : (
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
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{ textAlign: 'center' }}
                      >
                        <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{stat.val}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom layout if tab is IT Software */}
              {activeTab === 'it' && (
                <>
                  {/* IT Portfolio section */}
                  <div style={{ marginBottom: '40px' }}>
                    <h4 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-periwinkle)', marginBottom: '20px' }}>
                      🗂️ BillsPay24X7✓ IT Portfolio
                    </h4>
                    <StaggerGrid style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: '20px'
                    }}>
                      {[
                        { title: 'BillsPay24X7 Agent Portal', tag: 'Fintech · Payment Portal', fallback: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=320&h=160&fit=crop&q=70' },
                        { title: 'Travel & Booking Super App', tag: 'Flutter · iOS & Android', fallback: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=320&h=160&fit=crop&q=70' },
                        { title: 'Multi-Vendor FMCG Platform', tag: 'E-Commerce · B2B Marketplace', fallback: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=320&h=160&fit=crop&q=70' },
                        { title: 'GST Reconciliation Dashboard', tag: 'Analytics · React · Python', fallback: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=320&h=160&fit=crop&q=70' },
                        { title: '200-Bed Hospital Management', tag: 'Healthcare · Full-Stack HMS', fallback: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=320&h=160&fit=crop&q=70' },
                        { title: 'Online Learning Platform', tag: 'EdTech · LMS · AWS', fallback: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=320&h=160&fit=crop&q=70' }
                      ].map((item, idx) => (
                        <StaggerCard key={idx} className="card-cred" style={{ padding: 0, height: '160px', borderRadius: '16px', position: 'relative', cursor: 'default' }}>
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
                        </StaggerCard>
                      ))}
                    </StaggerGrid>
                  </div>

                  {/* IT Offerings Grid */}
                  <div style={{ marginBottom: '40px' }}>
                    <h4 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-periwinkle)', marginBottom: '20px' }}>
                      🛠️ BillsPay24X7✓ IT Service Offerings
                    </h4>
                    <StaggerGrid style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '16px'
                    }}>
                      {[
                        { icon: '💳', name: 'Fintech & Payment Portals', sub: 'AEPS, BBPS, DMT, UPI, payout systems, agent networks, PCI-DSS & RBI compliant' },
                        { icon: '⚙️', name: 'Web Development', sub: 'React, Next.js, Node.js portals, SaaS platforms, progressive web apps' },
                        { icon: '📱', name: 'Mobile App Development', sub: 'Flutter & React Native, iOS & Android, fintech & travel apps, offline sync' },
                        { icon: '🛒', name: 'E-Commerce Solutions', sub: 'B2B & B2C stores, payment gateway, GST billing, logistics APIs, analytics' },
                        { icon: '☁️', name: 'Cloud & DevOps', sub: 'AWS, Azure, GCP, Docker, Kubernetes, CI/CD, zero-downtime deployments' },
                        { icon: '🎨', name: 'UI/UX Design', sub: 'Figma wireframes, interactive prototypes, design systems, user testing' },
                        { icon: '✈️', name: 'Travel Tech Platform', sub: 'White-label B2B & B2C booking engines, GDS API, IRCTC, commission management' },
                        { icon: '🏢', name: 'ERP & CRM Systems', sub: 'Custom HR, inventory, accounting & customer management platforms' },
                        { icon: '🤖', name: 'AI & Data Analytics', sub: 'Fraud detection, BI dashboards, recommendation engines, ML models' },
                        { icon: '📈', name: 'Digital Marketing & SEO', sub: 'Google Ads, Meta Ads, SEO audits, content strategy, live analytics' },
                        { icon: '🔗', name: 'API Development & Integration', sub: 'REST, GraphQL, payment gateways, government APIs, microservices' },
                        { icon: '🔐', name: 'Cybersecurity & Compliance', sub: 'VAPT audits, OWASP hardening, ISO 27001, RBI compliance review' }
                      ].map((svc, idx) => (
                        <StaggerCard key={idx} className="card-cred" style={{ padding: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start', minHeight: 'auto' }}>
                          <span style={{ fontSize: '24px' }}>{svc.icon}</span>
                          <div>
                            <h5 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>{svc.name}</h5>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{svc.sub}</p>
                          </div>
                        </StaggerCard>
                      ))}
                    </StaggerGrid>
                  </div>
                </>
              )}

              {/* Solutions Grid */}
              <StaggerGrid style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px'
              }}>
                {tabInfo[activeTab].cards.map((sol, index) => (
                  <TiltCard key={index} style={{ height: '100%' }}>
                    {activeTab === 'fintech' ? (
                      <StaggerCard className="card-cred" style={{ padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '100%' }}>
                        <div>
                          <FintechCardVisual3D type={sol.title} />
                          <div style={{ padding: '0 24px 24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                              <span style={{ fontSize: '18px', color: 'var(--text-primary)', fontWeight: 800 }}>{sol.title}</span>
                              <span className="btn-cred-outline" style={{ pointerEvents: 'none', padding: '3px 10px', fontSize: '10px', background: 'rgba(0,0,0,0.02)', color: 'var(--text-secondary)' }}>
                                {sol.tag}
                              </span>
                            </div>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '18px' }}>{sol.desc}</p>
                            
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                              {sol.feats.map((feat, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                  style={{ display: 'flex', gap: '8px', fontSize: '12px', color: 'var(--text-primary)', marginBottom: '8px', alignItems: 'flex-start' }}
                                >
                                  <span style={{ color: 'var(--accent-periwinkle)', fontWeight: 'bold' }}>✓</span>
                                  <span>{feat}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div style={{ padding: '0 24px 24px' }}>
                          <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{sol.tag === 'Full-Stack' ? '0.17% MDR · T+1' : 'REST API Ready'}</span>
                            <button onClick={() => scrollToId('contact')} style={{ background: 'none', border: 'none', color: 'var(--accent-periwinkle)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              Explore <ArrowRight size={10} />
                            </button>
                          </div>
                        </div>
                      </StaggerCard>
                    ) : (
                      <StaggerCard className="card-cred" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '100%' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <span style={{ fontSize: '18px', color: 'var(--text-primary)', fontWeight: 800 }}>{sol.title}</span>
                            <span className="btn-cred-outline" style={{ pointerEvents: 'none', padding: '3px 10px', fontSize: '10px', background: 'rgba(0,0,0,0.02)', color: 'var(--text-secondary)' }}>
                              {sol.tag}
                            </span>
                          </div>
                          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '18px' }}>{sol.desc}</p>
                          
                          <ul style={{ listStyle: 'none', padding: 0 }}>
                            {sol.feats.map((feat, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                style={{ display: 'flex', gap: '8px', fontSize: '12px', color: 'var(--text-primary)', marginBottom: '8px', alignItems: 'flex-start' }}
                              >
                                <span style={{ color: 'var(--accent-periwinkle)', fontWeight: 'bold' }}>✓</span>
                                <span>{feat}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '16px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{sol.tag === 'Full-Stack' ? '0.17% MDR · T+1' : sol.tag === 'Last-Mile Banking' ? 'CSP Agent commission' : 'REST API Ready'}</span>
                          <button onClick={() => scrollToId('contact')} style={{ background: 'none', border: 'none', color: 'var(--accent-periwinkle)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            Explore <ArrowRight size={10} />
                          </button>
                        </div>
                      </StaggerCard>
                    )}
                  </TiltCard>
                ))}
              </StaggerGrid>
            </motion.div>
          </AnimatePresence>
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
          <SectionHeading
            eyebrow="our process"
            title="How We Onboard You"
            subtitle="A structured, transparent process going from discovery call to live platform in days, not months."
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr',
            gap: '40px',
            alignItems: 'start'
          }} className="grid-responsive-process">
            {/* Clickable Steps list */}
            <FadeUp>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {steps.map((step, idx) => (
                  <motion.div 
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
                    whileHover={{ x: 4, transition: { type: 'spring', stiffness: 400, damping: 30 } }}
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
                  </motion.div>
                ))}
              </div>
            </FadeUp>

            {/* Interactive Step Details Panel */}
            <FadeUp delay={0.15}>
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
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  >
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

                    <div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '10px' }}>
                        Key elements verified
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {steps[activeStep].tags.map((tag, idx) => (
                          <motion.span 
                            key={idx}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </FadeUp>
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
          <SectionHeading
            eyebrow="why billspay24x7✓"
            title="The Smarter Business Platform"
            subtitle="Deep fintech expertise · complete IT development · travel booking · one brand · one platform · zero complexity."
          />

          <StaggerGrid style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {whyUs.map((w, idx) => (
              <TiltCard key={idx} style={{ height: '100%' }}>
                <StaggerCard className="card-cred" style={{ padding: '32px', height: '100%', width: '100%' }}>
                <motion.span
                  style={{ fontSize: '28px', display: 'block', marginBottom: '16px' }}
                  whileHover={{ scale: 1.2, rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  {w.icon}
                </motion.span>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>{w.title}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{w.desc}</p>
                </StaggerCard>
              </TiltCard>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 6. BUSINESS MODELS (WHO WE BUILD FOR) */}
      <section id="models" style={{
        padding: '100px 8%',
        background: 'rgba(255,255,255,0.4)',
        borderTop: '1px solid rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionHeading
            eyebrow="business models"
            title="Who We Build For"
            subtitle="BillsPay24X7✓ adapts to every business model, whether it is a startup, aggregator, or enterprise scaling across India."
          />

          <StaggerGrid style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}>
            {businessModels.map((m, idx) => (
              <TiltCard key={idx} style={{ height: '100%' }}>
                <StaggerCard className="card-cred" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '180px', height: '100%', width: '100%' }}>
                <motion.span
                  style={{ fontSize: '24px' }}
                  whileHover={{ scale: 1.25, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  {m.icon}
                </motion.span>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>{m.title}</h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{m.desc}</p>
                </div>
                </StaggerCard>
              </TiltCard>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section id="testimonials" style={{
        padding: '100px 8%',
        background: 'rgba(255,255,255,0.2)',
        borderTop: '1px solid rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionHeading
            eyebrow="client stories"
            title="Trusted by 500+ Merchants Across India"
          />

          <StaggerGrid style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {testimonials.map((t, idx) => (
              <StaggerCard key={idx} className="card-cred" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <motion.div
                    style={{ color: '#FCD34D', fontSize: '16px', marginBottom: '14px', letterSpacing: '2px' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {t.stars}
                  </motion.div>
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
              </StaggerCard>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 8. CTA BANNER */}
      <section style={{
        padding: '80px 8%',
        background: 'rgba(255,255,255,0.4)',
        borderTop: '1px solid rgba(0, 0, 0, 0.03)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.03)'
      }}>
        <FadeUp>
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
              <MagneticButton onClick={() => scrollToId('contact')} className="btn-cred-neon">
                🚀 Book Free Consultation
              </MagneticButton>
              <MagneticButton onClick={onOpenAuth} className="btn-cred-outline" style={{ background: '#FFFFFF' }}>
                Create Account Free
              </MagneticButton>
            </div>
          </div>
        </FadeUp>
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
          <FadeUp>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-periwinkle)' }}>
              get in touch
            </span>
            <h2 style={{ fontSize: '38px', marginTop: '12px', fontWeight: 800, marginBottom: '16px' }}>Let's Build Something Great Together</h2>
            <div style={{ width: '40px', height: '3px', background: 'var(--accent-periwinkle)', marginBottom: '24px', borderRadius: '2px' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8', marginBottom: '36px' }}>
              Whether you need a payment gateway, fintech platform, mobile app, travel engine, or complete IT software, BillsPay24X7✓ is ready to turn your vision into reality.
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
                    Lucknow Chowk, Lucknow, UP 226003<br />
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
          </FadeUp>

          {/* Contact / Enquiry Form Card (Right) */}
          <FadeUp delay={0.15}>
            <div className="card-cred" style={{ padding: '36px', border: '1px solid var(--border-secondary)', background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)' }}>
              <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginBottom: '6px', fontWeight: 800 }}>Send Us a Message</h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '24px' }}>We'll respond within 2 hours during business hours.</p>

              {contactStatus.success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{ textAlign: 'center', padding: '24px 0' }}
                >
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
                </motion.div>
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

                  <MagneticButton 
                    type="submit"
                    className="btn-cred-neon" 
                    style={{ width: '100%', marginTop: '8px', justifyContent: 'center' }}
                  >
                    {contactStatus.loading ? 'Sending Message...' : 'Send Message →'}
                  </MagneticButton>
                </form>
              )}
            </div>
          </FadeUp>
        </div>
      </section>


      {/* 8. CLIENT LOGOS MARQUEE */}
      <section style={{ padding: '40px 0', background: 'rgba(255,255,255,0.4)', borderTop: '1px solid var(--border-primary)', borderBottom: '1px solid var(--border-primary)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', width: '200%', gap: '48px', animation: 'marquee 25s linear infinite' }} className="ticker-content">
          {['State Bank of India', 'ICICI Bank', 'NPCI Certified', 'RBI Regulated', 'AWS Cloud Partner', 'IRCTC Rail Booking', 'MakeMyTrip API', 'Visa Card Net', 'MasterCard Net', 'Jio Payments'].map((logo, idx) => (
            <div key={idx} style={{ flex: 1, textAlign: 'center', fontSize: '15px', fontWeight: 800, color: 'var(--text-muted)', opacity: 0.6, minWidth: '150px', whiteSpace: 'nowrap' }}>
              {logo}
            </div>
          ))}
          {/* Duplicate for infinite effect */}
          {['State Bank of India', 'ICICI Bank', 'NPCI Certified', 'RBI Regulated', 'AWS Cloud Partner', 'IRCTC Rail Booking', 'MakeMyTrip API', 'Visa Card Net', 'MasterCard Net', 'Jio Payments'].map((logo, idx) => (
            <div key={idx + '-dup'} style={{ flex: 1, textAlign: 'center', fontSize: '15px', fontWeight: 800, color: 'var(--text-muted)', opacity: 0.6, minWidth: '150px', whiteSpace: 'nowrap' }}>
              {logo}
            </div>
          ))}
        </div>
      </section>

      {/* 9. CASE STUDIES */}
      <section style={{ padding: '80px 8%', background: 'var(--surf-1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800 }}>Success Stories</h2>
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', marginTop: '8px' }}>How Indian merchants use BillsPay24X7 to scale daily transactions</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              { t: 'Lucknow Retail Agent Network', s: 'Fintech Portal', d: 'An agent network deployed our AEPS & BBPS platform to serve 25,000+ rural customers. Daily volumes scaled to ₹15L with zero settlement delays.', res: '✓ 250+ Active Agents' },
              { t: 'TravelGoa B2C Booking Portal', s: 'White-Label travel API', d: 'Integrated our Flight & Hotel B2B APIs with custom booking workflows, achieving 180ms page loads and 42% search-to-book conversions.', res: '✓ 180ms Search API response' },
              { t: 'Arogya Hospital HMS CRM', s: 'Enterprise software', d: 'Custom-engineered a 200-bed HMS connecting billing, laboratory records, and OPD schedules securely hosted on AWS Cloud.', res: '✓ 99.99% AWS Uptime SLA' }
            ].map((cs, idx) => (
              <TiltCard key={idx} style={{ height: '100%' }}>
                <div className="card-cs" style={{ background: 'var(--white)', border: '1px solid var(--border-primary)', borderRadius: '20px', padding: '28px', display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent-periwinkle)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{cs.s}</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>{cs.t}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', flex: 1, marginBottom: '16px' }}>{cs.d}</p>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#2DB84B' }}>{cs.res}</div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <FAQSection />

      {/* 11. NEWSLETTER */}
      <section style={{ padding: '60px 8%', background: 'linear-gradient(135deg, #1B2A6B 0%, #243080 100%)', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, marginBottom: '8px' }}>Subscribe to our Newsletter</h2>
          <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>Get the latest updates on fintech APIs, travel technology trends, and Lucknow IT developments.</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              style={{ padding: '12px 18px', borderRadius: '8px', border: 'none', width: '280px', fontSize: '13px', outline: 'none', color: '#1B2A6B' }} 
            />
            <button 
              onClick={() => window.open('https://wa.me/919278403522?text=Subscribe%20to%20Newsletter', '_blank')}
              className="btn-cred-neon" 
              style={{ padding: '12px 24px', fontSize: '13px' }}
            >
              Subscribe →
            </button>
          </div>
        </div>
      </section>

      {/* FLOAT SHORTCUTS (WhatsApp & Phone) */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 9999
      }} className="floating-shortcuts-buttons">
        <motion.a 
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
          whileHover={{ scale: 1.18, y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        >
          💬
        </motion.a>
        <motion.a 
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
          whileHover={{ scale: 1.18, y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        >
          📞
        </motion.a>
      </div>
    </div>
  );
}

// ─── FAQ Section Component ──────────────────────────────────────────────────
function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);
  const faqs = [
    { q: 'How long does it take to activate a merchant account?', a: 'Standard payment gateway accounts are activated within 48 hours of completing online KYC verification.' },
    { q: 'What is the transaction settlement cycle?', a: 'Settlement is processed on a T+1 basis (next working day) for domestic payments directly to your registered bank account.' },
    { q: 'Are your APIs RBI regulated?', a: 'Yes, our banking portal integrations and payouts run on NPCI approved protocols and comply with RBI Guidelines.' },
    { q: 'Do you offer white-label travel portals?', a: 'Yes, we provide fully branded white-label travel booking engines for flights, hotels, and buses under your own brand name.' },
    { q: 'Can we build custom features on the IT side?', a: 'Absolutely. We specialize in custom web apps, mobile apps, CRM systems, and database integrations tailored to your business needs.' },
    { q: 'Who handles customer support?', a: 'We provide dedicated 24×7 customer support via WhatsApp, phone, and email to assist you with any transaction or API issues.' }
  ];
  return (
    <section style={{ padding: '80px 8%', background: '#fff' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800 }}>Frequently Asked Questions</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} style={{ border: '1px solid var(--border-primary)', borderRadius: '12px', overflow: 'hidden' }}>
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                style={{ width: '100%', padding: '18px 24px', background: 'var(--surf-1)', border: 'none', textAlign: 'left', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-primary)' }}
              >
                <span>{faq.q}</span>
                <span style={{ fontSize: '18px' }}>{openIdx === idx ? '−' : '+'}</span>
              </button>
              {openIdx === idx && (
                <div style={{ padding: '18px 24px', background: '#fff', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', borderTop: '1px solid var(--border-primary)' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

