import type React from 'react';
import type { Variants } from '../lib/motion-shim';

// ─── Contenido siempre visible ──────────────────────────────
// El estado "hidden" NO esconde el contenido (sin opacity:0 ni offset). Es
// obligatorio para el prerender/SSG: el HTML se genera con el contenido YA
// visible, no escondido esperando a que el JS dispare el whileInView. Las
// animaciones de entrada se simplifican a cambio de que cargue fluido e instantáneo.
const hiddenState = (_desktopHidden: Record<string, unknown>) => ({});

// ─── Spring Presets ─────────────────────────────────────────
const springPremium       = { type: 'spring' as const, stiffness: 72,  damping: 20, mass: 1.2 };
const springPremiumSubtle = { type: 'spring' as const, stiffness: 90,  damping: 22, mass: 1.0 };
export const springSnappy = { type: 'spring' as const, stiffness: 400, damping: 28 };

// ─── Fade Up (default entrance) ─────────────────────────────
export const fadeUp: Variants = {
  hidden:  hiddenState({ opacity: 0, y: 52 }),
  visible: { opacity: 1, y: 0, transition: springPremium },
};

// ─── Fade Up Subtle (smaller movement) ──────────────────────
export const fadeUpSubtle: Variants = {
  hidden:  hiddenState({ opacity: 0, y: 24 }),
  visible: { opacity: 1, y: 0, transition: springPremiumSubtle },
};

// ─── Fade In (opacity only) ──────────────────────────────────
export const fadeIn: Variants = {
  hidden:  hiddenState({ opacity: 0 }),
  visible: { opacity: 1, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Scale Up ───────────────────────────────────────────────
export const scaleUp: Variants = {
  hidden:  hiddenState({ opacity: 0, scale: 0.91 }),
  visible: { opacity: 1, scale: 1, transition: springPremium },
};

// ─── Slide From Left ────────────────────────────────────────
export const slideFromLeft: Variants = {
  hidden:  hiddenState({ opacity: 0, x: -64 }),
  visible: { opacity: 1, x: 0, transition: springPremium },
};

// ─── Slide From Right ───────────────────────────────────────
export const slideFromRight: Variants = {
  hidden:  hiddenState({ opacity: 0, x: 64 }),
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
  hidden:  hiddenState({ opacity: 0, y: 42 }),
  visible: { opacity: 1, y: 0, transition: springPremium },
};

// ─── Card Hover ─────────────────────────────────────────────
export const cardHover = {
  y: -6,
  transition: springSnappy,
};

// ─── Line Draw (timeline connectors) ────────────────────────
export const lineDraw: Variants = {
  hidden:  hiddenState({ scaleY: 0 }),
  visible: { scaleY: 1, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 } },
};

// ─── Viewport settings ──────────────────────────────────────
// Margen inferior positivo = el reveal PRE-dispara antes de que el elemento entre
// al viewport (en desktop). En mobile el contenido ya arranca visible (ver arriba),
// así que esto es solo un refuerzo.
export const viewportOnce      = { once: true, margin: '0px 0px 200px 0px' as const };
export const viewportOnceEarly = { once: true, margin: '0px 0px 300px 0px' as const };

// ─── Organic background pattern ─────────────────────────────
export const organicPatternStyle: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1.5' fill='%238660ef' fill-opacity='0.07'/%3E%3Ccircle cx='70' cy='70' r='1.5' fill='%238660ef' fill-opacity='0.07'/%3E%3Ccircle cx='40' cy='40' r='1' fill='%23ee5cd0' fill-opacity='0.05'/%3E%3Ccircle cx='70' cy='10' r='1' fill='%238660ef' fill-opacity='0.05'/%3E%3Ccircle cx='10' cy='70' r='1' fill='%23ee5cd0' fill-opacity='0.05'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'repeat',
};
