import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Toast {
  id: number;
  name: string;
  city: string;
  minutesAgo: number;
}

interface SocialProofToastProps {
  isMobileCTAVisible?: boolean;
}

const names = [
  'Juan', 'María', 'Carlos', 'Ana', 'Diego', 'Laura', 'Martín', 'Sofía',
  'Lucas', 'Camila', 'Facundo', 'Valentina', 'Mateo', 'Florencia', 'Santiago',
  'Lucía', 'Agustín', 'Victoria', 'Nicolás', 'Catalina'
];

const cities = [
  'Rosario', 'Buenos Aires', 'Córdoba', 'Mendoza', 'La Plata', 'Mar del Plata',
  'Salta', 'San Miguel de Tucumán', 'Santa Fe', 'San Juan', 'Neuquén',
  'Resistencia', 'Paraná', 'Posadas', 'San Salvador de Jujuy', 'Bahía Blanca'
];

export function SocialProofToast({ isMobileCTAVisible = false }: SocialProofToastProps) {
  const [toast, setToast] = useState<Toast | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(() => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomMinutes = Math.floor(Math.random() * 3) + 2;

    const newToast: Toast = {
      id: Date.now(),
      name: randomName,
      city: randomCity,
      minutesAgo: randomMinutes,
    };

    setToast(newToast);

    // Auto-hide after 5 seconds
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 5000);
  }, []);

  // Scroll listener - detect when user scrolls past 400px
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 400) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Toast cycle - starts after user has scrolled
  useEffect(() => {
    if (!hasScrolled) return;

    // Show first toast after 2 seconds
    timeoutRef.current = setTimeout(showToast, 2000);

    // Show toast every 18-28 seconds randomly
    intervalRef.current = setInterval(() => {
      showToast();
    }, Math.random() * 10000 + 18000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [hasScrolled, showToast]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`fixed lg:bottom-[100px] left-4 lg:left-8 z-[85] max-w-[min(280px,calc(100vw-2rem))] lg:max-w-[320px] pointer-events-none ${
            isMobileCTAVisible ? 'bottom-[160px]' : 'bottom-[140px]'
          }`}
        >
          <div
            className="rounded-2xl px-4 py-3.5 shadow-[var(--shadow-float)] border border-white/20"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <div className="flex items-start gap-3">
              {/* Avatar with gradient */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
                style={{
                  background: 'linear-gradient(135deg, var(--purple) 0%, var(--pink) 100%)',
                }}
              >
                {toast.name.charAt(0)}
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 8 }}
                    transition={{ delay: 0.2 }}
                    className="h-2 w-2 rounded-full bg-gradient-to-r from-[var(--purple)] to-[var(--pink)]"
                  />
                  <span className="text-xs font-bold text-[var(--purple)] uppercase tracking-wide">
                    Nueva afiliación
                  </span>
                </div>
                <p className="text-sm text-[var(--gray-900)] font-medium leading-snug mb-0.5">
                  <strong className="font-bold">{toast.name}</strong> de {toast.city}
                </p>
                <p className="text-xs text-[var(--gray-600)]">
                  Se afilió hace {toast.minutesAgo} minutos
                </p>
              </div>

              {/* Check icon */}
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 400 }}
                className="flex-shrink-0"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[var(--purple)] to-[var(--pink)] flex items-center justify-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
