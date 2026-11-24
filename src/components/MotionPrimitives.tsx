import { useRef, useState, type ReactNode } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Smooth scroll-triggered reveal wrapper using Framer Motion.
 */
export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Magnetic micro-interaction wrapper that subtly pulls toward the cursor on hover.
 */
export function Magnetic({ children, className = '', strength = 0.24 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 280, damping: 18, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const offsetY = (e.clientY - (rect.top + rect.height / 2)) * strength;
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

/**
 * 3D perspective tilt card with glassmorphism surface and dynamic cyan-violet cursor spotlight.
 */
export function TiltCard({ children, className = '', maxTilt = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);

  const rotateX = useSpring(rawRotateX, { stiffness: 220, damping: 20 });
  const rotateY = useSpring(rawRotateY, { stiffness: 220, damping: 20 });

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${spotX}% ${spotY}%, rgba(34, 211, 238, 0.13), rgba(139, 92, 246, 0.06) 45%, transparent 75%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    spotX.set(px * 100);
    spotY.set(py * 100);
    rawRotateY.set((px - 0.5) * maxTilt * 2);
    rawRotateX.set(-(py - 0.5) * maxTilt * 2);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className={`relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md transition-colors duration-300 hover:border-cyan-400/30 ${className}`}
    >
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none absolute inset-0 rounded-2xl"
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
