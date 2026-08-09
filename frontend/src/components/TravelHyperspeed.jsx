import React, { Suspense, lazy, useEffect, useState } from 'react';

/**
 * Hyperspeed background for the Travel hero, recoloured to the BillsPay palette.
 *
 * Loading strategy matters here. three.js plus postprocessing is roughly 600KB,
 * which is more than the rest of the site put together, so it is behind a
 * dynamic import: Vite emits it as a separate chunk that only downloads when
 * someone actually opens Travel. The home page never pays for it.
 *
 * It is also gated off below 900px and under prefers-reduced-motion. A big
 * share of the audience is on budget Android hardware, and a WebGL tunnel is
 * the wrong thing to hand them; they get the static gradient instead, which
 * looks deliberate rather than broken.
 */

const Hyperspeed = lazy(() => import('./Hyperspeed'));

// The road is dark because light trails need somewhere dark to read against,
// but it is a deep indigo out of the brand navy family rather than black, so
// it belongs to this site instead of looking like a dropped-in demo.
// Traffic is split by brand colour: periwinkle one way, brand green the other.
const EFFECT_OPTIONS = {
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [12, 80],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    background: 0x0b1130,     // deep indigo, not black
    roadColor: 0x131a42,
    islandColor: 0x1a2250,
    shoulderLines: 0xb9b7ff,  // pale periwinkle
    brokenLines: 0xb9b7ff,
    leftCars: [0x5e5ce6, 0x817eff, 0x4d3ce6],   // periwinkle traffic
    rightCars: [0x2db84b, 0x5dcb6a, 0x24b263],  // brand green traffic
    sticks: 0x5e5ce6,
  },
};

// Matches the deep end of the effect, so the fallback and the real thing agree.
const STATIC_BACKDROP =
  'radial-gradient(120% 80% at 50% 108%, rgba(94,92,230,0.34) 0%, transparent 62%),' +
  'radial-gradient(80% 60% at 50% 0%, rgba(45,184,75,0.12) 0%, transparent 60%),' +
  'linear-gradient(180deg, #0B1130 0%, #131A42 60%, #0D1233 100%)';

export default function TravelHyperspeed() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const big = window.matchMedia('(min-width: 900px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnabled(big.matches && !calm.matches);
    sync();
    big.addEventListener('change', sync);
    calm.addEventListener('change', sync);
    return () => {
      big.removeEventListener('change', sync);
      calm.removeEventListener('change', sync);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: STATIC_BACKDROP,
        pointerEvents: 'none',
      }}
    >
      {enabled && (
        <Suspense fallback={null}>
          <Hyperspeed effectOptions={EFFECT_OPTIONS} />
        </Suspense>
      )}

      {/* Hand off to the light page below instead of hard-cutting into it. */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '38%',
          background: 'linear-gradient(180deg, rgba(236,239,246,0) 0%, rgba(236,239,246,0.55) 62%, var(--bg-primary) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
