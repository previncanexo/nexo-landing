import { m, AnimatePresence } from '../lib/motion-shim';

interface BackToTopProps {
  isVisible: boolean;
  isMobileCTAVisible: boolean;
}

export function BackToTop({ isVisible, isMobileCTAVisible }: BackToTopProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // AnimatePresence necesita hijos DIRECTOS con `key`. Antes envolvíamos los dos
  // botones en un <>Fragment</> (sin key), lo que rompía la animación de salida
  // en iOS Safari (el botón quedaba en estado errático). Ahora cada botón es un
  // hijo keyed directo del AnimatePresence.
  return (
    <AnimatePresence>
      {isVisible && (
        <m.button
          key="backtotop-desktop"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="hidden lg:flex fixed bottom-[104px] right-8 z-[95] w-14 h-14 rounded-2xl border-none cursor-pointer items-center justify-center group shadow-[var(--shadow-float)]"
          style={{
            background: 'linear-gradient(135deg, rgba(134, 96, 239, 0.95) 0%, rgba(238, 92, 208, 0.95) 100%)',
            backdropFilter: 'blur(16px)',
          }}
          aria-label="Volver arriba"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:-translate-y-1"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </m.button>
      )}

      {isVisible && (
        <m.button
          key="backtotop-mobile"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={`lg:hidden fixed z-[91] w-12 h-12 rounded-xl border-2 border-white/20 cursor-pointer flex items-center justify-center shadow-lg transition-all duration-500 ${
            isMobileCTAVisible ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100'
          }`}
          style={{
            left: '1rem',
            bottom: 'calc(72px + env(safe-area-inset-bottom, 0px))',
            background: 'linear-gradient(135deg, rgba(134, 96, 239, 0.95) 0%, rgba(238, 92, 208, 0.95) 100%)',
          }}
          aria-label="Volver arriba"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </m.button>
      )}
    </AnimatePresence>
  );
}
