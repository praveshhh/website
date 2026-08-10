import React from 'react';

import ParticleText from './ParticleText';

/**
 * The home hero headline, rendered as particles that scatter and re-gather
 * when the pointer moves across them.
 *
 * Three stacked instances rather than one, because ParticleText draws a single
 * `fillText` with no wrapping: each line of the headline needs its own canvas
 * or the whole thing collapses onto one line and scales itself down to fit.
 *
 * Colours mirror the classes this replaces, so the headline still reads the
 * way it did. ParticleText blends `color` into `highlightColor` left to right,
 * which maps onto the existing linear-gradient text treatments:
 *   .text-gradient-green  --text-primary -> --accent-periwinkle
 *   .text-gradient-blue   --accent-periwinkle -> #007AFF
 *
 * Glow is off. It sets shadowColor on the canvas, which reads as a halo on a
 * dark ground and as muddy smear on this light one.
 *
 * The letters are solid and still. Scatter and idle drift are both zero, so
 * there is no dissolve on load or on hover; the only motion is the pointer
 * pushing particles aside as it crosses a line, which settles straight back.
 *
 * Runs at every width. Measured coverage of the real glyphs: 100% at the 62px
 * desktop size, 99% at 44px on tablet, 98% at the 28px phone size. Phones do
 * pay for it in edge spill (21% at 28px, 27% on the 18px line) because the
 * component floors its sampling step at 2px and a stroke that small is only a
 * few pixels wide, so the letters read a touch bolder than the real type.
 * prefers-reduced-motion is still honoured inside ParticleText, which pins the
 * particles to their targets and skips all motion.
 */

const INK = '#1A1D20';        // --text-primary
const PERIWINKLE = '#5E5CE6'; // --accent-periwinkle
const BLUE = '#007AFF';

const LINES = [
  {
    text: 'Make Payment,',
    color: INK,
    highlightColor: INK,
    fontSize: 'clamp(28px, 6vw, 62px)',
    fontWeight: 900,
    height: 'clamp(36px, 7.4vw, 76px)',
  },
  {
    text: 'Build Growth',
    color: INK,
    highlightColor: PERIWINKLE,
    fontSize: 'clamp(28px, 6vw, 62px)',
    fontWeight: 900,
    height: 'clamp(36px, 7.4vw, 76px)',
  },
  {
    text: 'Fintech · IT Software · Travel',
    color: PERIWINKLE,
    highlightColor: BLUE,
    fontSize: 'clamp(18px, 4vw, 42px)',
    fontWeight: 800,
    height: 'clamp(26px, 5.2vw, 54px)',
    marginTop: '12px',
  },
];

export default function HeroParticleHeadline() {
  return (
    <>
      {LINES.map((line) => (
        <ParticleText
          key={line.text}
          text={line.text}
          color={line.color}
          highlightColor={line.highlightColor}
          fontSize={line.fontSize}
          fontWeight={line.fontWeight}
          fontFamily="inherit"
          // Solid, not speckled. Sampled every 2px; the component scales each
          // dot to particleSize * (0.75 + alpha * 0.45), so 2.5 puts interior
          // dots at 3px on a 2px grid and they overlap into continuous strokes.
          // Measured against the rendered glyphs: 100% ink coverage at 13%
          // edge spill. Going to 3 held coverage but pushed spill to 17%, which
          // just fattens the letterforms. The cap has to be lifted as well, or
          // the component thins a short wide line back to 900 particles.
          particleSize={2.5}
          density={2}
          maxParticles={4500}
          // No dissolve: nothing scatters, nothing drifts. The letters sit
          // still and only react to the pointer pushing through them.
          scatter={0}
          idleDrift={0}
          gatherDuration={400}
          stagger={0}
          trigger="mount"
          pointerRepel={38}
          repelRadius={110}
          glow={false}
          style={{
            height: line.height,
            marginTop: line.marginTop,
            cursor: 'default',
          }}
        />
      ))}
    </>
  );
}
