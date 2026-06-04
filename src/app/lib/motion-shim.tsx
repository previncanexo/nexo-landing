// Shim que reemplaza 'motion/react' (Framer Motion) por elementos HTML planos.
// Motivo: Framer agregaba JS pesado + hidrataba componentes de animación en cada carga,
// causando un glitch/re-render en mobile (independiente de la conexión). En mobile las
// animaciones ya estaban desactivadas, así que no se pierde nada visible. Esto saca Framer
// del bundle, elimina la hidratación de animaciones, y hace que el contenido sea estático/visible.
import React from 'react';

// Props específicas de Framer Motion que NO deben ir al DOM
const DROP = new Set([
  'variants', 'initial', 'animate', 'exit', 'whileInView', 'whileHover', 'whileTap',
  'whileFocus', 'whileDrag', 'transition', 'viewport', 'layout', 'layoutId', 'layoutScroll',
  'drag', 'dragConstraints', 'dragElastic', 'custom', 'onViewportEnter', 'onViewportLeave',
  'onAnimationStart', 'onAnimationComplete', 'onUpdate', 'onHoverStart', 'onHoverEnd',
  'onTap', 'onTapStart', 'onTapCancel', 'inherit',
]);

function clean(props: Record<string, any>) {
  const out: Record<string, any> = {};
  for (const k in props) {
    if (DROP.has(k)) continue;
    out[k] = props[k];
  }
  // style puede traer MotionValues (de useTransform); resolvemos a valor estático
  if (out.style && typeof out.style === 'object') {
    const s: Record<string, any> = {};
    for (const k in out.style) {
      const v = out.style[k];
      s[k] = v && typeof v.get === 'function' ? v.get() : v;
    }
    out.style = s;
  }
  return out;
}

const cache: Record<string, any> = {};
function tagComponent(tag: string) {
  if (!cache[tag]) {
    const C = React.forwardRef<any, any>((props, ref) =>
      React.createElement(tag, { ref, ...clean(props) }),
    );
    C.displayName = 'm.' + tag;
    cache[tag] = C;
  }
  return cache[tag];
}

// `m.div`, `m.span`, `m.button`, etc. → elementos planos
export const m: any = new Proxy({}, { get: (_t, tag: string) => tagComponent(tag) });

// Pasarelas / no-ops
export function AnimatePresence({ children }: { children?: React.ReactNode }) {
  return React.createElement(React.Fragment, null, children);
}
export function MotionConfig({ children }: { children?: React.ReactNode }) {
  return React.createElement(React.Fragment, null, children);
}
export function LazyMotion({ children }: { children?: React.ReactNode }) {
  return React.createElement(React.Fragment, null, children);
}
export const domAnimation = {};

// Hooks de scroll → valores estáticos (sin efecto)
export function useScroll() {
  return { scrollYProgress: { get: () => 0, on: () => () => {} } } as any;
}
export function useTransform() {
  return 1 as any;
}

export type Variants = Record<string, any>;
