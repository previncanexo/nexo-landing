import { useState, useEffect, useCallback } from 'react';
import banner1 from '@/assets/banner-comunidad-1.webp';
import banner2 from '@/assets/banner-comunidad-2.webp';
import banner1Set from '@/assets/banner-comunidad-1.webp?w=480;768;1080;1672&format=webp&quality=70&as=srcset';
import banner2Set from '@/assets/banner-comunidad-2.webp?w=480;768;1080;1672&format=webp&quality=70&as=srcset';
// Placeholders blur-up en base64 (inline en el HTML → preview instantáneo, sin requests)
import { banner1Ph, banner2Ph } from './placeholders';

const slides = [
  {
    img: banner2,
    imgSet: banner2Set,
    imgPh: banner2Ph,
    label: 'Salud sin fronteras',
    sub: 'Accedé desde donde estés',
  },
  {
    img: banner1,
    imgSet: banner1Set,
    imgPh: banner1Ph,
    label: 'Para los que van siempre para adelante',
    sub: 'Tu salud, sin pausas',
  },
];

const overlayStyle = {
  background: 'linear-gradient(to top, rgba(18,5,61,0.75) 0%, rgba(18,5,61,0.20) 45%, transparent 100%)',
};

export function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const goPrev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

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
      {/* Todas las slides apiladas — solo la activa tiene opacity 1 */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            zIndex: i === current ? 2 : 1,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            backgroundImage: `url(${slide.imgPh})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <img
            src={slide.img}
            srcSet={slide.imgSet}
            sizes="100vw"
            alt={slide.label}
            loading="eager"
            decoding={i === 0 ? 'sync' : 'async'}
            draggable={false}
            className="w-full h-full object-cover object-center select-none"
          />
          <div className="absolute inset-0" style={overlayStyle} />
        </div>
      ))}

      {/* Texto — transición suave al cambiar slide */}
      {slides.map((slide, i) => (
        <div
          key={`text-${i}`}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center w-full px-6"
          style={{
            zIndex: 5,
            opacity: i === current ? 1 : 0,
            transform: i === current ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
            pointerEvents: i === current ? 'auto' : 'none',
          }}
        >
          <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-1">
            {slide.sub}
          </p>
          <h2 className="font-['DM_Serif_Display'] text-white text-[clamp(24px,3.5vw,52px)] leading-tight tracking-tight">
            {slide.label}
          </h2>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 10 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? '28px' : '8px',
              height: '8px',
              background: i === current
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
