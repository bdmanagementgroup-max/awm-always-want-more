import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

/** Silky cursor-glow that tracks the mouse with spring physics */
export const CursorGlow: React.FC = () => {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 80, damping: 18 });
  const y = useSpring(rawY, { stiffness: 80, damping: 18 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [rawX, rawY]);

  return (
    <motion.div
      style={{ left: x, top: y }}
      className="fixed z-[998] pointer-events-none w-[380px] h-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      aria-hidden="true"
    >
      {/* Inner amber glow core */}
      <div className="absolute inset-0 rounded-full bg-gradient-radial from-amber-500/8 via-amber-500/3 to-transparent" />
    </motion.div>
  );
};

/** Thin amber scroll-progress bar pinned to top of viewport */
export const ScrollProgressBar: React.FC = () => {
  const scaleX = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
      scaleX.set(scrolled);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [scaleX]);

  return (
    <motion.div
      id="scroll-progress-bar"
      style={{ scaleX, width: '100%' }}
    />
  );
};

/** Word-by-word animated heading reveal */
export const AnimatedHeading: React.FC<{
  text: string;
  className?: string;
  delay?: number;
}> = ({ text, className = '', delay = 0 }) => {
  const words = text.split(' ');
  return (
    <span className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

/** Stagger container for children */
export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.08 }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    variants={{
      hidden: {},
      visible: {
        transition: { staggerChildren: staggerDelay },
      },
    }}
  >
    {children}
  </motion.div>
);

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.55, ease: 'easeOut' },
      },
    }}
  >
    {children}
  </motion.div>
);

/** Magnetic button — children snap toward cursor on hover */
export const MagneticButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  as?: 'button' | 'div';
}> = ({ children, className = '', onClick, strength = 0.3, as: Tag = 'button' }) => {
  const ref = useRef<HTMLButtonElement | HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (Tag === 'div') {
    return (
      <motion.div
        ref={ref as React.Ref<HTMLDivElement>}
        style={{ x, y }}
        onMouseMove={onMouseMove as any}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      style={{ x, y }}
      onMouseMove={onMouseMove as any}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
};

/** Animated count-up number */
export const AnimatedCounter: React.FC<{
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}> = ({ target, suffix = '', prefix = '', className = '' }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${prefix}${Math.round(v)}${suffix}`);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: { duration: 0.3 },
      }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        const ctrl = { value: 0 };
        const start = performance.now();
        const dur = 1800;
        const tick = (now: number) => {
          const prog = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - prog, 3);
          count.set(eased * target);
          if (prog < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }}
    >
      <motion.span>{rounded}</motion.span>
    </motion.span>
  );
};

/** Tilt card with spring physics on hover */
export const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}> = ({ children, className = '', maxTilt = 8 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });
  const scale = useSpring(1, { stiffness: 300, damping: 25 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(nx * maxTilt * 2);
    rotateX.set(-ny * maxTilt * 2);
    scale.set(1.015);
  };
  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
};
