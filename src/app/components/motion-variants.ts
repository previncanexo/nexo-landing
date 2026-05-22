import type { Variants } from 'motion/react';

// ─── Spring Presets ─────────────────────────────────────────
const springEntrance = { type: 'spring' as const, stiffness: 260, damping: 28, mass: 0.85 };
const springSubtle   = { type: 'spring' as const, stiffness: 300, damping: 30, mass: 0.80 };
export const springSnappy   = { type: 'spring' as const, stiffness: 400, damping: 28 };

// ─── Fade Up (default entrance) ─────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: springEntrance },
};

// ─── Fade Up Subtle (smaller movement) ──────────────────────
export const fadeUpSubtle: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: springSubtle },
};

// ─── Fade In (opacity only — spring irrelevant here) ────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ─── Scale Up ───────────────────────────────────────────────
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 26, mass: 0.85 } },
};

// ─── Slide From Left ────────────────────────────────────────
export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: springEntrance },
};

// ─── Slide From Right ───────────────────────────────────────
export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: springEntrance },
};

// ─── Stagger Containers ─────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.10, delayChildren: 0.10 } },
};

// ─── Stagger Item ───────────────────────────────────────────
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 28, mass: 0.85 } },
};

// ─── Card Hover ─────────────────────────────────────────────
export const cardHover = {
  y: -6,
  transition: springSnappy,
};

// ─── Line Draw (timeline connectors — deliberate tween draw) ─
export const lineDraw: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 } },
};

// ─── Viewport settings (reusable) ───────────────────────────
export const viewportOnce = { once: true, margin: '-60px' as const };
export const viewportOnceEarly = { once: true, margin: '-30px' as const };
