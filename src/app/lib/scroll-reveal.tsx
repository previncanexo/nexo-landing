import { useEffect } from 'react';

// Entrada al hacer scroll, sin Framer (ver motion-shim.tsx). Es una mejora progresiva:
// el HTML del SSG trae todo visible y recién acá, ya montado, se esconde SOLO lo que está
// debajo del pliegue. Lo que el usuario ya ve al cargar nunca parpadea. Sin JS, sin
// IntersectionObserver o con reduced-motion, la página queda exactamente como antes.
const SELECTORS = '.fx-title, .fx-card';

export function useScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add('fx-in');
          // Al terminar se sacan las clases: así el hover de .fx-card recupera su transition
          el.addEventListener('transitionend', () => el.classList.remove('fx-reveal', 'fx-in'), { once: true });
          io.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    const fold = window.innerHeight;
    document.querySelectorAll<HTMLElement>(SELECTORS).forEach((el) => {
      if (el.getBoundingClientRect().top < fold) return;
      // Stagger entre hermanos (tarjetas de una misma grilla), tope de 5 pasos
      const index = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty('--fx-delay', `${Math.min(Math.max(index, 0), 5) * 80}ms`);
      el.classList.add('fx-reveal');
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);
}

// Capa de efectos de la landing: monta el reveal y la barra de progreso de lectura.
// Va como componente (no hook en App) para que se re-ejecute al volver del onboarding.
export function ScrollEffects() {
  useScrollReveal();
  return <div className="fx-progress" aria-hidden="true" />;
}
