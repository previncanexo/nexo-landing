import { useState, useEffect, useCallback, useRef } from 'react';
import bannerTeleconsulta from '@/assets/banner-teleconsulta.webp';
import bannerFarmacias from '@/assets/banner-farmacias.webp';
import bannerEmergencias from '@/assets/banner-emergencias.webp';
import bannerOdontologia from '@/assets/banner-odontologia.webp';
import bannerTeleconsultaSet from '@/assets/banner-teleconsulta.webp?w=480;768;1080;1440;1920&format=webp&quality=68&as=srcset';
import bannerFarmaciasSet from '@/assets/banner-farmacias.webp?w=480;768;1080;1440;1920&format=webp&quality=68&as=srcset';
import bannerEmergenciasSet from '@/assets/banner-emergencias.webp?w=480;768;1080;1440;1920&format=webp&quality=68&as=srcset';
import bannerOdontologiaSet from '@/assets/banner-odontologia.webp?w=480;768;1080;1440;1920&format=webp&quality=68&as=srcset';
// Placeholders blur-up en base64 (inline en el HTML → preview instantáneo, sin requests)
import {
  bannerTeleconsultaPh,
  bannerFarmaciasPh,
  bannerEmergenciasPh,
  bannerOdontologiaPh,
} from './placeholders';

// position = encuadre horizontal (las fotos son 1920x665; en mobile se ve ~40% del ancho)
const slides = [
  {
    img: bannerTeleconsulta,
    imgSet: bannerTeleconsultaSet,
    imgPh: bannerTeleconsultaPh,
    position: '72% center',
    label: 'Teleconsultas médicas sin salir de casa',
    sub: 'Tu médico, desde donde estés',
  },
  {
    img: bannerFarmacias,
    imgSet: bannerFarmaciasSet,
    imgPh: bannerFarmaciasPh,
    position: '50% center',
    label: 'Beneficios en farmacias',
    sub: 'Cuidarte también es ahorrar',
  },
  {
    img: bannerEmergencias,
    imgSet: bannerEmergenciasSet,
    imgPh: bannerEmergenciasPh,
    position: '62% center',
    label: 'Emergencias médicas',
    sub: 'Cuando más lo necesitás',
  },
  {
    img: bannerOdontologia,
    imgSet: bannerOdontologiaSet,
    imgPh: bannerOdontologiaPh,
    position: '30% center',
    label: 'Guardia odontológica',
    sub: 'Sonrisas para toda la familia',
  },
];

const overlayStyle = {
  background: 'linear-gradient(to top, rgba(18,5,61,0.75) 0%, rgba(18,5,61,0.20) 45%, transparent 100%)',
};

export function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const goPrev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    // Con reduced-motion no hay rotación automática (WCAG 2.2.2): se navega con flechas/dots/swipe
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section
      className="relative z-[2] w-full overflow-hidden"
      style={{ height: 'clamp(320px, 52vw, 620px)', background: '#12053d' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      // Swipe horizontal en touch (sin librerías): >40px y más horizontal que vertical
      onTouchStart={(e) => { touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
      onTouchEnd={(e) => {
        const s0 = touchStart.current;
        touchStart.current = null;
        if (!s0) return;
        const dx = e.changedTouches[0].clientX - s0.x;
        const dy = e.changedTouches[0].clientY - s0.y;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? next : goPrev)();
      }}
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
            backgroundPosition: slide.position,
          }}
        >
          <img
            src={slide.img}
            srcSet={slide.imgSet}
            sizes="100vw"
            alt={slide.label}
            loading="eager"
            // @ts-expect-error atributo DOM en minúscula (evita warning/mismatch SSR)
            fetchpriority="low"
            decoding={i === 0 ? 'sync' : 'async'}
            draggable={false}
            className={`w-full h-full object-cover select-none ${i === current ? 'fx-slide-active' : ''}`}
            style={{ objectPosition: slide.position }}
          />
          <div className="absolute inset-0" style={overlayStyle} />
        </div>
      ))}

      {/* Texto — transición suave al cambiar slide */}
      {slides.map((slide, i) => (
        <div
          key={`text-${i}`}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center w-full px-6"
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

      {/* Dots: el punto visible mide 8px, pero el botón tiene ~28px de área táctil (padding) */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex" style={{ zIndex: 10 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === current}
            className="flex items-center justify-center px-2.5 py-3 cursor-pointer"
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === current ? '28px' : '8px',
                height: '8px',
                background: i === current
                  ? 'linear-gradient(to right, var(--purple), var(--pink))'
                  : 'rgba(255,255,255,0.4)',
              }}
            />
          </button>
        ))}
      </div>

      {/* Flecha anterior */}
      <button
        onClick={goPrev}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 carousel-arrow w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        style={{ zIndex: 10, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
        aria-label="Anterior"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Flecha siguiente */}
      <button
        onClick={next}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 carousel-arrow w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        style={{ zIndex: 10, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
        aria-label="Siguiente"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </section>
  );
}
