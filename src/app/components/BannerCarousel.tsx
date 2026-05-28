import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import banner1 from '@/assets/banner-comunidad-1.webp';
import banner2 from '@/assets/banner-comunidad-2.webp';

const slides = [
  {
    img: banner2,
    label: 'Salud sin fronteras',
    sub: 'Accedé desde donde estés',
  },
];

const overlayStyle = {
  background: 'linear-gradient(to top, rgba(18,5,61,0.75) 0%, rgba(18,5,61,0.20) 45%, transparent 100%)',
};

export function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => {
      setPrev(c);
      return (c + 1) % slides.length;
    });
  }, []);

  const goTo = useCallback((i: number) => {
    setCurrent((c) => {
      if (i === c) return c;
      setPrev(c);
      return i;
    });
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((c) => {
      const p = (c - 1 + slides.length) % slides.length;
      setPrev(c);
      return p;
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section
      className="relative z-[2] w-full overflow-hidden"
      style={{ height: 'clamp(320px, 52vw, 620px)', background: '#12053d' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide anterior — base sólida siempre visible */}
      {prev !== null && (
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <img
            src={slides[prev].img}
            alt={slides[prev].label}
            className="w-full h-full object-cover object-center select-none"
            draggable={false}
          />
          <div className="absolute inset-0" style={overlayStyle} />
        </div>
      )}

      {/* Slide actual — entra con fade-in encima */}
      <motion.div
        key={current}
        className="absolute inset-0"
        style={{ zIndex: 2 }}
        initial={{ opacity: prev === null ? 1 : 0, scale: prev === null ? 1 : 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={slides[current].img}
          alt={slides[current].label}
          className="w-full h-full object-cover object-center select-none"
          draggable={false}
        />
        <div className="absolute inset-0" style={overlayStyle} />

        {/* Texto */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center w-full px-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-1">
            {slides[current].sub}
          </p>
          <h2 className="font-['DM_Serif_Display'] text-white text-[clamp(28px,4vw,56px)] leading-tight tracking-tight">
            {slides[current].label}
          </h2>
        </motion.div>
      </motion.div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 10 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? '28px' : '8px',
              height: '8px',
              background:
                i === current
                  ? 'linear-gradient(to right, var(--purple), var(--pink))'
                  : 'rgba(255,255,255,0.4)',
            }}
          />
        ))}
      </div>

      {/* Flecha anterior */}
      <button
        onClick={goPrev}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ zIndex: 10, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}
        aria-label="Anterior"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Flecha siguiente */}
      <button
        onClick={next}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ zIndex: 10, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}
        aria-label="Siguiente"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </section>
  );
}
