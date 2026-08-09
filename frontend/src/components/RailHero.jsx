import React, { useEffect, useRef } from 'react';

import { COMPANY } from '../knowledge/billspayKnowledge';

/**
 * The landing hero: BillsPay's payment network drawn as a prosperity yantra in
 * temple gold on emerald, with a scroll-linked camera that lowers the plane and
 * hands off to the light content below.
 *
 * All of it is CSS 3D transforms plus one inline SVG — no WebGL, no library,
 * about 15KB. That matters here specifically: a chunk of the audience is retail
 * agents on budget Android hardware, and a three.js scene would shut them out.
 *
 * Motion is scroll-linked rather than autoplaying, and reverses if you scroll
 * back. People deciding where to route their money want to feel in control.
 */
export default function RailHero({ onOpenAuth }) {
  const runwayRef = useRef(null);

  // Drive --rail-p (0 -> 1) from scroll position. rAF-throttled, passive.
  useEffect(() => {
    const runway = runwayRef.current;
    if (!runway) return;

    let ticking = false;
    const update = () => {
      const travel = runway.offsetHeight - window.innerHeight;
      const p = travel > 0 ? window.scrollY / travel : 0;
      runway.style.setProperty('--rail-p', Math.min(1, Math.max(0, p)).toFixed(4));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, []);

  const openWhatsApp = () =>
    window.open(
      `${COMPANY.whatsapp}?text=${encodeURIComponent(
        `Hi ${COMPANY.brand}! I'd like to know more about getting started.`
      )}`,
      '_blank',
      'noopener'
    );

  // Marker positions for the four rails, shared by the traces and the packets.
  const RAILS = [
    'M500,500 L500,372 L358,230 L358,120',
    'M500,500 L628,500 L770,358 L880,358',
    'M500,500 L500,628 L642,770 L642,880',
    'M500,500 L372,500 L230,642 L120,642',
  ];

  // Bright gold rides inward (collections), pale cream rides back out (settled).
  const PACKETS = [
    { rail: 0, delay: '0s' },
    { rail: 0, delay: '-3.1s', slow: true },
    { rail: 1, delay: '-1.2s', ret: true },
    { rail: 1, delay: '-4.4s' },
    { rail: 2, delay: '-2.3s', slow: true },
    { rail: 2, delay: '-5.6s', ret: true },
    { rail: 3, delay: '-0.7s' },
    { rail: 3, delay: '-4.0s', ret: true, slow: true },
  ];

  return (
    <div className="rail-runway" ref={runwayRef}>
      <div className="rail-stage">
        <div className="rail-glow" />
        <div className="rail-warmth" />

        <div className="rail-hero">
          <div className="rail-fore">
            <div className="rail-eyebrow">Rails live &middot; 24&times;7</div>
            <h1 className="rail-h1">
              Start taking payments today.
              <br />
              <em>Earn on every one.</em>
            </h1>
            <p className="rail-sub">
              Payments, Aadhaar banking, travel bookings, and the software to run all of it.
              One account. Money in your bank the next working day.
            </p>

            <div className="rail-actions">
              <button type="button" className="rail-btn rail-btn-gold" onClick={onOpenAuth}>
                <span>
                  Start free
                  <small>Live in 48 hours</small>
                </span>
              </button>
              <button type="button" className="rail-btn rail-btn-ghost" onClick={openWhatsApp}>
                <span>
                  Talk on WhatsApp
                  <small>Replies in 2 hours</small>
                </span>
              </button>
            </div>
          </div>

          <div className="rail-plane-wrap">
            <div className="rail-plane">
              <svg
                viewBox="0 0 1000 1000"
                role="img"
                aria-label="The BillsPay24X7 payment network drawn as a radiating gold figure: collections travelling inward to the central hub and settlements travelling back out to partner banks."
              >
                <defs>
                  <filter id="railGlow" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="7" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <g className="rail-grid">
                  <path d="M60,200 H940 M60,350 H940 M60,500 H940 M60,650 H940 M60,800 H940" />
                  <path d="M200,60 V940 M350,60 V940 M500,60 V940 M650,60 V940 M800,60 V940" />
                </g>

                {/* Concentric rings and an eight-petal figure. The Shri Yantra is
                    the prosperity diagram; borrowing its radial order lets the
                    network read as auspicious as well as technical. */}
                <g>
                  <circle className="rail-ring" cx="500" cy="500" r="118" />
                  <circle className="rail-ring" cx="500" cy="500" r="168" />
                  <circle className="rail-ring" cx="500" cy="500" r="242" opacity="0.18" />
                  <g className="rail-petal">
                    <circle cx="500" cy="382" r="60" />
                    <circle cx="500" cy="618" r="60" />
                    <circle cx="382" cy="500" r="60" />
                    <circle cx="618" cy="500" r="60" />
                    <circle cx="417" cy="417" r="60" />
                    <circle cx="583" cy="417" r="60" />
                    <circle cx="417" cy="583" r="60" />
                    <circle cx="583" cy="583" r="60" />
                  </g>
                </g>

                <g>
                  {RAILS.map((d, i) => (
                    <path key={`t-${i}`} className="rail-trace" d={d} />
                  ))}
                  {RAILS.map((d, i) => (
                    <path key={`l-${i}`} className="rail-trace-lit" d={d} />
                  ))}
                </g>

                <g>
                  <rect className="rail-pad" x="330" y="92" width="56" height="34" rx="5" />
                  <rect className="rail-pad" x="852" y="330" width="56" height="34" rx="5" />
                  <rect className="rail-pad" x="614" y="852" width="56" height="34" rx="5" />
                  <rect className="rail-pad" x="92" y="614" width="56" height="34" rx="5" />
                  <rect className="rail-pad-core" x="346" y="103" width="24" height="12" rx="2" />
                  <rect className="rail-pad-core" x="868" y="341" width="24" height="12" rx="2" />
                  <rect className="rail-pad-core" x="630" y="863" width="24" height="12" rx="2" />
                  <rect className="rail-pad-core" x="108" y="625" width="24" height="12" rx="2" />
                </g>

                <circle className="rail-hub-ring" cx="500" cy="500" r="52" />
                <circle className="rail-hub-ring" cx="500" cy="500" r="33" opacity="0.45" />
                <circle className="rail-hub-core" cx="500" cy="500" r="15" />

                {PACKETS.map((p, i) => (
                  <rect
                    key={`p-${i}`}
                    className={`rail-packet${p.ret ? ' ret' : ''}${p.slow ? ' slow' : ''}`}
                    style={{ offsetPath: `path('${RAILS[p.rail]}')`, animationDelay: p.delay }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>

        <div className="rail-readout">
          <div className="rail-trust">
            <span><b>RBI</b>-compliant</span>
            <span><b>PCI-DSS</b> Level 1</span>
            <span><b>NPCI</b>-certified</span>
            <span><b>80+</b> bank partners</span>
            <span><b>99.9%</b> uptime</span>
          </div>
          <div className="rail-cells">
            <div className="rail-cell"><b>&#8377;0</b><span>To start</span></div>
            <div className="rail-cell"><b>0.17%</b><span>UPI MDR</span></div>
            <div className="rail-cell"><b>T+1</b><span>Money in bank</span></div>
            <div className="rail-cell"><b>48 hrs</b><span>To go live</span></div>
          </div>
        </div>
      </div>

      <style>{`
        .rail-runway {
          --rail-p: 0;
          --rail-gold: #E8BC55;
          --rail-gold-text: #F5D488;
          --rail-gold-lift: #FFE9AE;
          --rail-gold-hot: #FFC94D;
          --rail-settled: #FFF6DC;
          --rail-mist: #CBE0D4;
          --rail-mist-dim: #8AA593;
          --rail-ivory: #FFF8EA;
          --rail-edge: #0C2E23;
          --rail-dim: #2C8862;
          height: 190vh;
          position: relative;
        }

        .rail-stage {
          position: sticky; top: 0;
          height: 100vh; overflow: hidden;
          /* One hue. Depth is value, not extra colours. */
          background: radial-gradient(112% 90% at 68% 48%, #21704E 0%, #164634 52%, #0B2A20 100%);
          opacity: calc(1 - (var(--rail-p) * 0.9));
        }

        .rail-glow {
          position: absolute; left: 68%; top: 47%;
          width: min(130vw, 1020px); aspect-ratio: 1; translate: -50% -50%;
          background: radial-gradient(circle, rgba(232,188,85,0.22) 0%, rgba(232,188,85,0.08) 38%, transparent 68%);
          pointer-events: none;
        }
        .rail-warmth {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(80% 62% at 64% 44%, rgba(255,183,77,0.085) 0%, transparent 60%),
            radial-gradient(120% 100% at 20% 96%, rgba(247,154,60,0.04) 0%, transparent 58%);
          mix-blend-mode: screen;
        }

        .rail-hero {
          position: relative; height: 100%;
          display: grid;
          grid-template-columns: minmax(0, 0.98fr) minmax(0, 1.02fr);
          align-items: center;
          max-width: 1420px; margin: 0 auto;
          padding: 80px clamp(24px, 5vw, 68px) 196px;
        }

        .rail-plane-wrap {
          position: relative;
          perspective: 1500px; perspective-origin: 46% 46%;
          transform-style: preserve-3d;
          justify-self: center; align-self: center; width: 100%;
        }
        .rail-plane {
          width: min(126%, 1000px); aspect-ratio: 1; margin: 0 auto;
          transform-style: preserve-3d;
          transform:
            translateY(calc(var(--rail-p) * 20vh))
            translateZ(calc(var(--rail-p) * -400px))
            rotateX(calc(57deg + (var(--rail-p) * 18deg)))
            rotateZ(-45deg);
          transition: transform 90ms linear;
        }
        .rail-plane svg { width: 100%; height: 100%; display: block; overflow: visible; }

        .rail-grid { stroke: #17553F; stroke-width: 1.4; opacity: 0.9; fill: none; }
        .rail-ring { fill: none; stroke: var(--rail-gold); stroke-width: 1.2; opacity: 0.3; }
        .rail-petal { fill: none; stroke: var(--rail-gold); stroke-width: 1.6; opacity: 0.42; }
        .rail-trace { stroke: var(--rail-dim); stroke-width: 5.5; fill: none; stroke-linecap: square; }
        .rail-trace-lit { stroke: var(--rail-gold); stroke-width: 2; fill: none; opacity: 0.95; filter: url(#railGlow); }
        .rail-pad { fill: var(--rail-edge); stroke: var(--rail-gold); stroke-width: 3; }
        .rail-pad-core { fill: var(--rail-gold); opacity: 0.62; }
        .rail-hub-ring {
          fill: none; stroke: var(--rail-gold); stroke-width: 3; filter: url(#railGlow);
          animation: railBeat 3.4s ease-in-out infinite; transform-origin: 500px 500px;
        }
        .rail-hub-core { fill: var(--rail-gold-lift); filter: url(#railGlow); }

        .rail-packet {
          width: 22px; height: 9px; rx: 2.5;
          fill: var(--rail-gold-hot); filter: url(#railGlow);
          offset-rotate: 0deg;
          animation: railRide 5.6s linear infinite;
        }
        .rail-packet.ret { fill: var(--rail-settled); animation-direction: reverse; }
        .rail-packet.slow { animation-duration: 7.8s; }

        @keyframes railRide {
          from { offset-distance: 0%; opacity: 0; }
          9%   { opacity: 1; }
          88%  { opacity: 1; }
          to   { offset-distance: 100%; opacity: 0; }
        }
        @keyframes railBeat {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.05); }
        }

        .rail-fore {
          position: relative; z-index: 3;
          grid-row: 1; grid-column: 1;
          transform: translateY(calc(var(--rail-p) * -12vh));
          opacity: calc(1 - (var(--rail-p) * 1.6));
        }
        .rail-eyebrow {
          font-family: var(--font-mono);
          font-size: clamp(9px, 1.35vw, 10.5px);
          letter-spacing: 0.32em; text-transform: uppercase;
          color: var(--rail-gold-text); margin-bottom: 24px;
          display: flex; align-items: center; gap: 10px;
        }
        .rail-eyebrow::before {
          content: ""; width: 6px; height: 6px; border-radius: 50%; flex: none;
          background: var(--rail-gold-lift); box-shadow: 0 0 10px var(--rail-gold);
          animation: railBeat 3.4s ease-in-out infinite;
        }
        .rail-h1 {
          font-family: var(--font-display);
          font-size: clamp(31px, 4.9vw, 64px);
          line-height: 1.0; letter-spacing: -0.036em; font-weight: 800;
          color: var(--rail-ivory); margin: 0; text-wrap: balance;
        }
        .rail-h1 em {
          font-style: normal; color: transparent;
          background: linear-gradient(100deg, var(--rail-gold-lift) 0%, var(--rail-gold) 46%, var(--rail-gold-hot) 104%);
          -webkit-background-clip: text; background-clip: text;
        }
        .rail-sub {
          margin: 22px 0 0; max-width: 44ch;
          font-size: clamp(13px, 1.5vw, 16px);
          color: var(--rail-mist); line-height: 1.65;
        }

        .rail-actions { display: flex; flex-wrap: wrap; gap: 11px; margin-top: 30px; }
        .rail-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 20px; border-radius: 10px;
          font-family: var(--font-display); font-size: 13.5px; font-weight: 700;
          text-align: left; cursor: pointer; border: 1px solid transparent;
          transition: transform .16s ease, box-shadow .16s ease, background .16s ease;
        }
        .rail-btn small { display: block; font-weight: 500; font-size: 10.5px; opacity: 0.72; }
        .rail-btn-gold {
          background: linear-gradient(135deg, var(--rail-gold-lift) 0%, var(--rail-gold) 58%, #D3A032 100%);
          color: #14301F;
          box-shadow: 0 8px 26px rgba(232,188,85,0.26);
        }
        .rail-btn-gold:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(232,188,85,0.34); }
        .rail-btn-ghost {
          background: rgba(255,255,255,0.05);
          border-color: rgba(232,188,85,0.38);
          color: var(--rail-gold-text);
        }
        .rail-btn-ghost:hover { background: rgba(232,188,85,0.13); transform: translateY(-2px); }

        .rail-readout {
          position: absolute; left: 0; right: 0; bottom: 0; z-index: 4;
          max-width: 1420px; margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 68px);
          background: linear-gradient(180deg, transparent, rgba(9,36,27,0.84));
          transform: translateY(calc(var(--rail-p) * 30vh));
          opacity: calc(1 - (var(--rail-p) * 1.7));
        }
        .rail-trust {
          display: flex; flex-wrap: wrap; gap: 7px 22px;
          padding: 11px 0 12px;
          font-family: var(--font-mono);
          font-size: clamp(7.5px, 1.05vw, 9px);
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--rail-mist-dim);
          border-bottom: 1px solid rgba(232,188,85,0.16);
        }
        .rail-trust b { color: var(--rail-gold-text); font-weight: 700; }
        .rail-cells {
          display: grid; grid-template-columns: repeat(4, 1fr);
          background: repeating-linear-gradient(90deg, rgba(232,188,85,0.85) 0 7px, transparent 7px 14px) top/100% 1px no-repeat;
        }
        .rail-cell { padding: 15px 20px 22px; border-left: 1px solid rgba(232,188,85,0.16); }
        .rail-cell:first-child { border-left: 0; padding-left: 0; }
        .rail-cell b {
          display: block; font-family: var(--font-mono);
          font-size: clamp(16px, 2.3vw, 25px); font-weight: 700;
          color: var(--rail-ivory); letter-spacing: -0.02em; font-variant-numeric: tabular-nums;
        }
        .rail-cell span {
          display: block; margin-top: 6px; font-family: var(--font-mono);
          font-size: clamp(7.5px, 1.05vw, 9px);
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--rail-mist-dim);
        }

        @media (max-width: 900px) {
          .rail-hero { grid-template-columns: 1fr; padding-bottom: 196px; place-items: center; }
          .rail-fore { grid-row: 1; grid-column: 1; }
          .rail-plane-wrap {
            grid-row: 1; grid-column: 1;
            position: absolute; inset: 0;
            display: grid; place-items: center;
            opacity: 0.4; pointer-events: none;
          }
          .rail-plane { width: 190vw; }
          .rail-cells { grid-template-columns: repeat(2, 1fr); }
          .rail-cell { border-top: 1px solid rgba(232,188,85,0.16); }
          .rail-cell:nth-child(3) { border-left: 0; padding-left: 0; }
          .rail-cell:nth-child(-n+2) { border-top: 0; }
          .rail-btn { flex: 1 1 auto; justify-content: center; }
        }

        /* Short viewports: landscape phones and small laptops. Without this the
           type column runs under the readout strip. */
        @media (max-height: 720px) {
          .rail-hero { padding-bottom: 168px; }
          .rail-eyebrow { margin-bottom: 14px; }
          .rail-h1 { font-size: clamp(23px, 4.1vw, 38px); }
          .rail-sub { margin-top: 13px; font-size: 13px; }
          .rail-actions { margin-top: 20px; }
          .rail-btn { padding: 10px 16px; font-size: 12.5px; }
          .rail-btn small { display: none; }
          .rail-trust { padding: 8px 0 9px; }
          .rail-cell { padding: 11px 16px 14px; }
          .rail-cell b { font-size: clamp(15px, 2.1vw, 20px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .rail-packet, .rail-hub-ring, .rail-eyebrow::before { animation: none; }
          .rail-packet { opacity: 0.9; }
          .rail-plane, .rail-btn { transition: none; }
          .rail-btn:hover { transform: none; }
        }

        .rail-btn:focus-visible { outline: 2px solid var(--rail-gold); outline-offset: 3px; }
      `}</style>
    </div>
  );
}
