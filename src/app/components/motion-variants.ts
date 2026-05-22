import type React from 'react';
import type { Variants } from 'motion/react';

// ─── Spring Presets ─────────────────────────────────────────
// stiffness=72, damping=20 → ratio ≈ 1.08 (barely overdamped, zero bounce, ~0.9s settle)
const springPremium       = { type: 'spring' as const, stiffness: 72,  damping: 20, mass: 1.2 };
// stiffness=90, damping=22 → ratio ≈ 1.16 (overdamped, ~0.75s settle)
const springPremiumSubtle = { type: 'spring' as const, stiffness: 90,  damping: 22, mass: 1.0 };
// kept for interactive hover/tap — fast response is intentional there
export const springSnappy = { type: 'spring' as const, stiffness: 400, damping: 28 };

// ─── Fade Up (default entrance) ─────────────────────────────
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 52 },
  visible: { opacity: 1, y: 0, transition: springPremium },
};

// ─── Fade Up Subtle (smaller movement) ──────────────────────
export const fadeUpSubtle: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: springPremiumSubtle },
};

// ─── Fade In (opacity only) ──────────────────────────────────
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Scale Up ───────────────────────────────────────────────
export const scaleUp: Variants = {
  hidden:  { opacity: 0, scale: 0.91 },
  visible: { opacity: 1, scale: 1, transition: springPremium },
};

// ─── Slide From Left ────────────────────────────────────────
export const slideFromLeft: Variants = {
  hidden:  { opacity: 0, x: -64 },
  visible: { opacity: 1, x: 0, transition: springPremium },
};

// ─── Slide From Right ───────────────────────────────────────
export const slideFromRight: Variants = {
  hidden:  { opacity: 0, x: 64 },
  visible: { opacity: 1, x: 0, transition: springPremium },
};

// ─── Stagger Containers ─────────────────────────────────────
export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
};

export const staggerContainerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerContainerSlow: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.10 } },
};

// ─── Stagger Item ───────────────────────────────────────────
export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0, transition: springPremium },
};

// ─── Card Hover ─────────────────────────────────────────────
export const cardHover = {
  y: -6,
  transition: springSnappy,
};

// ─── Line Draw (timeline connectors) ────────────────────────
export const lineDraw: Variants = {
  hidden:  { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 } },
};

// ─── Viewport settings ──────────────────────────────────────
// -100px: animation fires when element is well inside the viewport (deliberate, premium feel)
export const viewportOnce      = { once: true, margin: '-100px' as const };
export const viewportOnceEarly = { once: true, margin: '-50px'  as const };

// ─── Organic background pattern ─────────────────────────────
export const organicPatternStyle: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1.5' fill='%238660ef' fill-opacity='0.07'/%3E%3Ccircle cx='70' cy='70' r='1.5' fill='%238660ef' fill-opacity='0.07'/%3E%3Ccircle cx='40' cy='40' r='1' fill='%23ee5cd0' fill-opacity='0.05'/%3E%3Ccircle cx='70' cy='10' r='1' fill='%238660ef' fill-opacity='0.05'/%3E%3Ccircle cx='10' cy='70' r='1' fill='%23ee5cd0' fill-opacity='0.05'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'repeat',
};
