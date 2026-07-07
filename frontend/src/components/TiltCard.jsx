import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function TiltCard({ children, style = {}, className = '', ...props }) {
  const ref = useRef(null);

  // Motion values for X and Y cursor percentage (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 300, damping: 25 });

  // Shine position transforms
  const shineOpacity = useSpring(useTransform(x, (val) => Math.abs(val) * 0.4), { stiffness: 300, damping: 25 });
  const shineBg = useTransform(
    [x, y],
    ([valX, valY]) => `radial-gradient(circle at ${(valX + 0.5) * 100}% ${(valY + 0.5) * 100}%, rgba(255, 255, 255, 0.35) 0%, transparent 60%)`
  );

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000, display: 'flex' }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          width: '100%',
          ...style
        }}
        {...props}
      >
        {/* Render child elements */}
        {children}

        {/* Dynamic shine overlay */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            opacity: shineOpacity,
            background: shineBg
          }}
        />
      </motion.div>
    </div>
  );
}
