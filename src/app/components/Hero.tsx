import { useState, useEffect, useRef } from 'react';
import { m, useScroll, useTransform } from '../lib/motion-shim';
import { fadeUpSubtle } from './motion-variants';
import heroWoman from '@/assets/hero-woman.webp';
import heroWoman2 from '@/assets/hero-woman-2.webp';
import heroWoman3 from '@/assets/hero-woman-3.webp';
import heroWomanSet from '@/assets/hero-woman.webp?w=480;768;1080;1672&format=webp&quality=70&as=srcset';
import heroWoman2Set from '@/assets/hero-woman-2.webp?w=480;768;1080;1672&format=webp&quality=70&as=srcset';
import heroWoman3Set from '@/assets/hero-woman-3.webp?w=480;768;1080;1672&format=webp&quality=70&as=srcset';

const heroImages = [
  { src: heroWoman, srcSet: heroWomanSet },
  { src: heroWoman2, srcSet: heroWoman2Set },
  { src: heroWoman3, srcSet: heroWoman3Set },
];

const BLUR_STAGGER = 0.025;
const BLUR_EASE: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];

function BlurRevealWords({
  text,
  delay = 0,
  enabled = true,
}: {
  text: string;
  delay?: number;
  enabled?: boolean;
}) {
  // Mobile: render plain text. The per-word m.spans below each carry a
  // permanent will-change + animated blur() filter, which is GPU-murder on iPhone.
  if (!enabled) return <span>{text}</span>;

  const words = text.trim().split(' ').filter(Boolean);
  // Spaces go OUTSIDE inline-block spans — dentro de inline-block los colapsa el browser
  const elements: React.ReactNode[] = [];
  words.forEach((word, i) => {
    elements.push(
      <m.span
        key={i}
        style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
        variants={{
          hidden: { opacity: 0, y: 16, filter: 'blur(10px)' },
          visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.5, ease: BLUR_EASE },
          },
        }}
      >
        {word}
      </m.span>
    );
    if (i < words.length - 1) elements.push(' ');
  });
  return (
    <m.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.05, delayChildren: delay },
        },
      }}
    >
      {elements}
    </m.span>
  );
}

function BlurRevealText({
  text,
  className,
  delay = 0,
  enabled = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  enabled?: boolean;
}) {
  // Mobile: plain text — see note in BlurRevealWords.
  if (!enabled) return <span className={className}>{text}</span>;

  // Spaces go OUTSIDE inline-block spans para que el browser pueda hacer word-wrap
  const chars = text.split('');
  return (
    <m.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: BLUR_STAGGER, delayChildren: delay },
        },
      }}
    >
      {chars.map((char, i) =>
        char === ' ' ? (
          ' '
        ) : (
          <m.span
            key={i}
            style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
            variants={{
              hidden: { opacity: 0, y: 20, filter: 'blur(12px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.55, ease: BLUR_EASE },
              },
            }}
          >
            {char}
          </m.span>
        )
      )}
    </m.span>
  );
}

// Desktop-only wrapper: scroll-linked scale + fade. The useScroll/useTransform
// hooks live HERE (not in Hero) so they are NEVER instantiated on mobile —
// on a phone the scroll listener would run every frame for an effect that is
// disabled anyway.
function HeroScrollContent({
  heroRef,
  children,
}: {
  heroRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
}) {
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <m.div
      className="hero-content relative z-[10] w-full flex flex-col items-center justify-center"
      style={{ minHeight: '100svh', scale: contentScale, opacity: contentOpacity }}
    >
      {children}
    </m.div>
  );
}

export function Hero() {
  const [current, setCurrent] = useState(0);
  // desktopReady = false en SSR + primer render del cliente + SIEMPRE en mobile.
  // Solo pasa a true en DESKTOP, tras montar (matchMedia). Clave anti-glitch: el HTML
  // del SSG, el primer render del cliente y el render en mobile son IDÉNTICOS (1 foto
  // estática, sin animación). Al hidratar en el celu, el effect ve mobile y NO llama a
  // setDesktopReady → React no re-renderiza → cero flash/trabón. Solo el desktop "sube"
  // a la versión animada con crossfade de 3 fotos.
  const [desktopReady, setDesktopReady] = useState(false);
  const animate = desktopReady;
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Mobile: queda estático (1 foto, sin crossfade, sin grano, sin scroll-linked) →
    // no se re-renderiza al hidratar y no se descargan las otras 2 fotos (~240KB menos).
    if (!window.matchMedia('(min-width: 768px)').matches) return;
    setDesktopReady(true);
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const content = (
    <div className="max-w-[700px] mx-auto px-5 sm:px-8 text-center" style={{ paddingTop: 'clamp(3.5rem,12vw,7rem)', paddingBottom: 'clamp(2.5rem,8vw,6rem)' }}>

      {/* Badge — animado + backdrop-blur en desktop; estático y sin blur en mobile */}
      {animate ? (
        <m.div
          variants={fadeUpSubtle}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-[10px] sm:text-[11px] text-white/50 font-medium tracking-[0.20em] uppercase mb-8 sm:mb-10 border border-white/12 backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full bg-[var(--pink)]"
            style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
          />
          100% pensado para vos
        </m.div>
      ) : (
        <div
          className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-[10px] sm:text-[11px] text-white/50 font-medium tracking-[0.20em] uppercase mb-8 sm:mb-10 border border-white/12"
          style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--pink)]" />
          100% pensado para vos
        </div>
      )}

      {/* H1 — blur reveal (desktop) / plain (mobile) */}
      <h1 className="font-['DM_Serif_Display'] text-[clamp(26px,7.5vw,42px)] sm:text-[clamp(36px,5.5vw,68px)] text-white leading-tight tracking-[-1px] sm:tracking-[-2px] md:tracking-[-3px] mb-6 sm:mb-8">
        <BlurRevealText text="Tu salud y tu bienestar" delay={0.2} enabled={animate} />
        <br />
        <BlurRevealText text="sin vueltas." className="italic" delay={0.45} enabled={animate} />
      </h1>

      {/* Description */}
      <p className="text-[15px] sm:text-base text-white/80 leading-relaxed mb-10 sm:mb-12 mx-auto max-w-[480px] font-medium">
        <BlurRevealWords text="Desde" delay={0.5} enabled={animate} />{' '}
        {animate ? (
          <m.span
            className="inline-block whitespace-nowrap bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white font-bold border border-white/30"
            initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.85, duration: 0.5, ease: BLUR_EASE }}
          >
            $19.500 por mes
          </m.span>
        ) : (
          <span className="inline-block whitespace-nowrap bg-white/25 px-3 py-1 rounded-full text-white font-bold border border-white/30">
            $19.500 por mes
          </span>
        )}
        <BlurRevealWords text=". Teleconsultas médicas, emergencias médicas y beneficios para cuidarte, contratados en minutos y sin papeles." delay={0.95} enabled={animate} />
      </p>

      {/* CTAs */}
      <div className="flex gap-3 flex-col sm:flex-row justify-center items-center">
        {animate ? (
          <m.div
            className="w-full sm:w-auto"
            initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 1.3, duration: 0.5, ease: BLUR_EASE }}
          >
            <HeroCtaButton animate={animate} />
          </m.div>
        ) : (
          <div className="w-full sm:w-auto">
            <HeroCtaButton animate={animate} />
          </div>
        )}
      </div>

    </div>
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: '100svh' }}
    >
      {/* ── BACKGROUND: opaque gradient base ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(135deg, #12053d 0%, #2d1266 30%, #6535cc 65%, #c94fb5 100%)',
        }}
      />

      {/* Grain texture — desktop only (feTurbulence + mix-blend is expensive to paint on mobile) */}
      {desktopReady && (
        <div
          className="absolute inset-0 z-[1] opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* Decorative arcs */}
      <svg
        className="absolute inset-0 w-full h-full z-[2] pointer-events-none"
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="900" cy="380" rx="580" ry="420" stroke="rgba(255,255,255,0.05)" strokeWidth="90" />
        <ellipse cx="1280" cy="120" rx="320" ry="240" stroke="rgba(238,92,208,0.08)" strokeWidth="60" />
        <ellipse cx="160" cy="620" rx="220" ry="180" stroke="rgba(134,96,239,0.07)" strokeWidth="50" />
      </svg>

      {/* ── HERO PHOTOS — CSS crossfade, sin remount ── */}
      <div className="absolute inset-0 z-[3]">
        {(desktopReady ? heroImages : heroImages.slice(0, 1)).map((img, i) => (
          <img
            key={i}
            src={img.src}
            srcSet={img.srcSet}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            draggable={false}
            loading={i === 0 ? 'eager' : 'lazy'}
            // @ts-expect-error atributo DOM en minúscula para evitar warning/mismatch en SSR
            fetchpriority={i === 0 ? 'high' : 'low'}
            decoding={i === 0 ? 'sync' : 'async'}
            className="absolute inset-0 w-full h-full object-cover select-none"
            style={{
              objectPosition: '65% center',
              opacity: i === current ? 1 : 0,
              transition: 'opacity 0.9s ease-in-out',
              willChange: 'opacity',
            }}
          />
        ))}

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 3,
            background:
              'linear-gradient(to bottom, rgba(10,3,40,0.62) 0%, rgba(10,3,40,0.32) 50%, rgba(10,3,40,0.58) 100%)',
          }}
        />

        {/* Top fade */}
        <div
          className="absolute top-0 left-0 right-0 h-36"
          style={{ zIndex: 4, background: 'linear-gradient(to bottom, rgba(18,5,61,0.55) 0%, transparent 100%)' }}
        />
      </div>

      {/* ── CONTENT — scroll-linked scale + fade (desktop, post-mount) ── */}
      {!desktopReady ? (
        <div
          className="hero-content relative z-[10] w-full flex flex-col items-center justify-center"
          style={{ minHeight: '100svh' }}
        >
          {content}
        </div>
      ) : (
        <HeroScrollContent heroRef={heroRef}>{content}</HeroScrollContent>
      )}
    </section>
  );
}

function HeroCtaButton({ animate = true }: { animate?: boolean }) {
  return (
    <m.button
      onClick={() =>
        window.open(
          'https://nexo.portal.previncasalud.com.ar/registro',
          '_blank',
          'noopener,noreferrer',
        )
      }
      className="bg-white text-[var(--purple)] border-none px-8 sm:px-10 py-4 rounded-full text-[15px] sm:text-base font-bold cursor-pointer font-['DM_Sans'] whitespace-nowrap group flex items-center gap-2 w-full justify-center"
      whileHover={animate ? { scale: 1.03, boxShadow: '0 20px 60px rgba(255,255,255,0.25)' } : undefined}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      Quiero mi cobertura
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group-hover:translate-x-1 transition-transform"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </m.button>
  );
}
