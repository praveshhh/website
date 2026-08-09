import React from 'react';
import { motion } from 'framer-motion';

/**
 * Floating capability cards for the hero's right column.
 *
 * Replaces the large dashboard mockup with four small glass cards that each
 * name one thing the platform does, drifting at their own pace and joined by
 * faint connector lines with a pulse travelling between them.
 *
 * Built on the existing light-glass tokens (--bg-card, --border-secondary,
 * --accent-periwinkle), so it inherits the site's look rather than introducing
 * a second one. Icons are drawn inline: no image requests, nothing for the
 * server to serve, and they stay crisp at any size.
 */

const CARD_BASE = {
  position: 'absolute',
  width: '44%',
  padding: '12px 13px 12px',
  // Brighter than --bg-card so the cards read as lit panels against the
  // indigo wash rather than dissolving into it.
  background: 'linear-gradient(158deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.80) 100%)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.9)',
  borderRadius: 'var(--r-medium)',
  boxShadow:
    '0 18px 44px rgba(94, 92, 230, 0.20), 0 4px 12px rgba(27, 42, 107, 0.07), inset 0 1px 0 rgba(255,255,255,0.9)',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const LABEL = {
  fontSize: '12px',
  fontWeight: 800,
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-display)',
  letterSpacing: '-0.01em',
  lineHeight: 1.25,
};

const META = {
  fontSize: '9.5px',
  fontWeight: 700,
  color: 'var(--text-muted)',
  fontFamily: 'var(--font-mono)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

/* ── Inline icons ─────────────────────────────────────────────────────────── */

function IconConnectedBanking() {
  // A hub bank wired to satellite banks: the 80+ partner network.
  const spokes = [
    [14, 12], [46, 12], [8, 34], [52, 34], [18, 52], [42, 52],
  ];
  return (
    <svg viewBox="0 0 60 64" style={{ width: '100%', height: '46px' }} aria-hidden="true">
      {spokes.map(([x, y], i) => (
        <line key={i} x1="30" y1="32" x2={x + 3} y2={y + 3}
          stroke="rgba(94, 92, 230, 0.28)" strokeWidth="1" strokeDasharray="2 2" />
      ))}
      {spokes.map(([x, y], i) => (
        <g key={`b-${i}`} transform={`translate(${x},${y})`}>
          <rect width="7" height="6" y="1.5" rx="1" fill="rgba(94, 92, 230, 0.16)" />
          <path d="M0.6 1.8 L3.5 0 L6.4 1.8" fill="none" stroke="var(--accent-periwinkle)" strokeWidth="0.9" strokeLinejoin="round" />
        </g>
      ))}
      <circle cx="30" cy="32" r="12" fill="rgba(94, 92, 230, 0.10)" />
      <g transform="translate(23,26)">
        <path d="M0.8 3 L7 0 L13.2 3" fill="none" stroke="var(--accent-periwinkle)" strokeWidth="1.4" strokeLinejoin="round" />
        <rect x="1.5" y="3.6" width="11" height="7" rx="1" fill="var(--accent-periwinkle)" opacity="0.85" />
      </g>
    </svg>
  );
}

function IconVerified() {
  return (
    <svg viewBox="0 0 60 64" style={{ width: '100%', height: '46px' }} aria-hidden="true">
      <motion.g
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '30px 32px' }}
      >
        {/* Scalloped verification badge */}
        <path
          d="M30 12 l4.4 3.1 5.3-1 2.2 4.9 4.9 2.2-1 5.3 3.1 4.4-3.1 4.4 1 5.3-4.9 2.2-2.2 4.9-5.3-1L30 52l-4.4-3.1-5.3 1-2.2-4.9-4.9-2.2 1-5.3L11.1 33l3.1-4.4-1-5.3 4.9-2.2 2.2-4.9 5.3 1z"
          fill="rgba(45, 184, 75, 0.14)" stroke="#2DB84B" strokeWidth="1.3" strokeLinejoin="round"
        />
        <path d="M23.5 32.5 l4.8 4.8 8.6-9.4" fill="none" stroke="#2DB84B"
          strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </svg>
  );
}

function IconPayments() {
  const bars = [
    { x: 12, h: 12 }, { x: 22, h: 20 }, { x: 32, h: 15 }, { x: 42, h: 26 },
  ];
  return (
    <svg viewBox="0 0 60 64" style={{ width: '100%', height: '46px' }} aria-hidden="true">
      <line x1="9" y1="46" x2="51" y2="46" stroke="rgba(27, 42, 107, 0.14)" strokeWidth="1" />
      {bars.map((b, i) => (
        <motion.rect
          key={i} x={b.x} width="6" rx="1.5" fill="var(--accent-periwinkle)"
          opacity={0.35 + i * 0.2}
          initial={{ height: 0, y: 46 }}
          animate={{ height: b.h, y: 46 - b.h }}
          transition={{ duration: 0.7, delay: 0.25 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      <text x="30" y="18" textAnchor="middle" fontSize="15" fontWeight="800"
        fill="var(--accent-periwinkle)" fontFamily="var(--font-display)">₹</text>
    </svg>
  );
}

function IconSecure() {
  return (
    <svg viewBox="0 0 60 64" style={{ width: '100%', height: '46px' }} aria-hidden="true">
      <path
        d="M30 11 L45 17 v12 c0 10.5-6.4 18.4-15 21.6C21.4 47.4 15 39.5 15 29 V17 z"
        fill="rgba(94, 92, 230, 0.10)" stroke="var(--accent-periwinkle)" strokeWidth="1.4" strokeLinejoin="round"
      />
      <rect x="24" y="29" width="12" height="9.5" rx="1.6" fill="var(--accent-periwinkle)" opacity="0.9" />
      <path d="M26.5 29 v-3.1 a3.5 3.5 0 0 1 7 0 V29" fill="none"
        stroke="var(--accent-periwinkle)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="30" cy="33.4" r="1.25" fill="#fff" />
    </svg>
  );
}

/* ── Card definitions ─────────────────────────────────────────────────────── */

const CARDS = [
  { key: 'bank',  label: 'Connected Banking', meta: '80+ partners',    Icon: IconConnectedBanking, pos: { left: '0%',  top: '4%'  }, drift: -11, dur: 6.4, delay: 0 },
  { key: 'kyc',   label: 'KYC Verified',      meta: 'Live in 48 hrs',  Icon: IconVerified,         pos: { right: '0%', top: '0%'  }, drift: -9,  dur: 7.2, delay: 0.7 },
  { key: 'pay',   label: 'Payments',          meta: '0.17% UPI MDR',   Icon: IconPayments,         pos: { left: '2%',  top: '62%' }, drift: -10, dur: 6.8, delay: 1.3 },
  { key: 'secure',label: 'Secure Encryption', meta: 'PCI-DSS Level 1', Icon: IconSecure,           pos: { right: '1%', top: '57%' }, drift: -8,  dur: 7.8, delay: 0.35 },
];

// Connector geometry, drawn between the card centres in the same 100x100
// space the cards are positioned in. Keep these in step with `pos` above.
const LINKS = [
  'M22,18 L78,14',
  'M78,14 L77,71',
  'M77,71 L24,76',
  'M24,76 L22,18',
];

export default function CapabilityCards() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '460px',
        aspectRatio: '1 / 0.86',
        // The hero visual container is a flex row, so without this the box
        // gets stretched to the row height and aspect-ratio is ignored.
        alignSelf: 'center',
        margin: '0 auto',
      }}
    >
      {/* Soft bloom so the cards read as floating above something */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: '12%',
          background: 'radial-gradient(circle, rgba(129, 126, 255, 0.26) 0%, rgba(94, 92, 230, 0.10) 42%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Connector lines with a pulse travelling the loop */}
      <svg
        viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <defs>
          <filter id="ccBloom" x="-400%" y="-400%" width="900%" height="900%">
            <feGaussianBlur stdDeviation="0.9" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {LINKS.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="rgba(94, 92, 230, 0.38)"
            strokeWidth="0.5" strokeDasharray="1.6 1.6" />
        ))}
        {LINKS.map((d, i) => (
          <circle
            key={`p-${i}`} r="1.1" fill="#2DB84B" filter="url(#ccBloom)"
            style={{ offsetPath: `path('${d}')`, animation: `ccRide 7s linear infinite`, animationDelay: `${i * 1.75}s` }}
          />
        ))}
      </svg>

      {CARDS.map(({ key, label, meta, Icon, pos, drift, dur, delay }) => (
        <motion.div
          key={key}
          style={{ ...CARD_BASE, ...pos }}
          initial={{ opacity: 0, y: 18, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 + delay * 0.35, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.04, boxShadow: '0 20px 46px rgba(27, 42, 107, 0.16)' }}
        >
          <motion.div
            animate={{ y: [0, drift, 0] }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <Icon />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={LABEL}>{label}</span>
              <span style={META}>{meta}</span>
            </div>
          </motion.div>
        </motion.div>
      ))}

      <style>{`
        @keyframes ccRide {
          from { offset-distance: 0%;   opacity: 0; }
          10%  { opacity: 0.75; }
          88%  { opacity: 0.75; }
          to   { offset-distance: 100%; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="offset-path"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
