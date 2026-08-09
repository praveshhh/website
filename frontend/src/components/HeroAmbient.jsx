import React from 'react';

/**
 * Ambient background motion for the home hero.
 *
 * Purely decorative and deliberately quiet: a slowly panning blueprint grid
 * plus a faint network of traces with light pulses travelling along them, so
 * the hero reads as live infrastructure rather than a static page.
 *
 * Constraints it respects:
 *  - existing palette only (periwinkle #5E5CE6, brand green #2DB84B)
 *  - sits behind the hero content and never intercepts pointer events
 *  - CSS + one inline SVG, no library, roughly 4KB
 *  - geometry hugs the edges so it never competes with the headline or the
 *    dashboard visual in the middle of the section
 *  - holds still under prefers-reduced-motion
 */

// Traces run around the outside of the section, away from the content column.
const TRACES = [
  'M60,110 L200,110 L280,190 L280,330',
  'M1380,140 L1240,140 L1160,220 L1160,380',
  'M100,780 L100,640 L190,550 L330,550',
  'M1340,760 L1200,760 L1120,680 L1120,560',
];

const PULSES = [
  { trace: 0, delay: '0s' },
  { trace: 0, delay: '-5.2s', slow: true },
  { trace: 1, delay: '-2.4s' },
  { trace: 2, delay: '-3.6s', slow: true },
  { trace: 3, delay: '-1.4s' },
  { trace: 3, delay: '-6.1s', slow: true },
];

const NODES = [
  [60, 110], [280, 330], [1380, 140], [1160, 380],
  [100, 780], [330, 550], [1340, 760], [1120, 560],
];

export default function HeroAmbient() {
  return (
    <div className="hero-ambient" aria-hidden="true">
      <div className="hero-ambient-grid" />

      <svg
        className="hero-ambient-net"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Bloom for the travelling pulses. On a light ground this is what
              sells them as lit rather than as flat dots. */}
          <filter id="haBloom" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {TRACES.map((d, i) => (
          <path key={`t-${i}`} className="ha-trace" d={d} />
        ))}

        {NODES.map(([cx, cy], i) => (
          <g key={`n-${i}`}>
            <circle className="ha-node-halo" cx={cx} cy={cy} r="9" />
            <circle className="ha-node" cx={cx} cy={cy} r="3.5" />
          </g>
        ))}

        {PULSES.map((p, i) => (
          <circle
            key={`p-${i}`}
            className={`ha-pulse${p.slow ? ' slow' : ''}`}
            r="3.4"
            filter="url(#haBloom)"
            style={{ offsetPath: `path('${TRACES[p.trace]}')`, animationDelay: p.delay }}
          />
        ))}
      </svg>

      <style>{`
        .hero-ambient {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        /* Blueprint grid, panning one cell every 40s. */
        .hero-ambient-grid {
          position: absolute;
          inset: -60px;
          background-image:
            linear-gradient(to right, rgba(94, 92, 230, 0.20) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(94, 92, 230, 0.20) 1px, transparent 1px);
          background-size: 60px 60px;
          /* Fade the grid out toward the middle so it never sits behind copy. */
          -webkit-mask-image: radial-gradient(120% 95% at 50% 50%, transparent 0%, transparent 30%, #000 74%);
          mask-image: radial-gradient(120% 95% at 50% 50%, transparent 0%, transparent 30%, #000 74%);
          animation: haPan 40s linear infinite;
        }

        @keyframes haPan {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(60px, 60px, 0); }
        }

        .hero-ambient-net {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .ha-trace {
          fill: none;
          stroke: rgba(94, 92, 230, 0.40);
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .ha-node { fill: rgba(94, 92, 230, 0.55); }
        .ha-node-halo { fill: rgba(94, 92, 230, 0.13); }

        /* Brand green for the pulses: money moving along the rails. */
        .ha-pulse {
          fill: #2DB84B;
          offset-rotate: 0deg;
          animation: haRide 9s linear infinite;
        }
        .ha-pulse.slow { animation-duration: 13s; }

        @keyframes haRide {
          from { offset-distance: 0%;   opacity: 0; }
          12%  { opacity: 0.95; }
          85%  { opacity: 0.95; }
          to   { offset-distance: 100%; opacity: 0; }
        }

        /* On narrow screens the traces would crowd the stacked content. */
        @media (max-width: 900px) {
          .hero-ambient-net { opacity: 0.5; }
          .hero-ambient-grid { background-size: 44px 44px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-ambient-grid { animation: none; }
          .ha-pulse { animation: none; opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
