import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { fadeUpSubtle } from './motion-variants';
import heroWoman from '@/assets/hero-woman.webp';
import heroWoman2 from '@/assets/hero-woman-2.webp';
import heroWoman3 from '@/assets/hero-woman-3.webp';

const heroImages = [heroWoman, heroWoman2, heroWoman3];

const BLUR_STAGGER = 0.025;
const BLUR_EASE: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];

function BlurRevealWords({
  text,
  delay = 0,
  withBlur = true,
}: {
  text: string;
  delay?: number;
  withBlur?: boolean;
}) {
  const words = text.trim().split(' ').filter(Boolean);
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.05, delayChildren: delay },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          variants={{
            hidden: { opacity: 0, y: 16, ...(withBlur ? { filter: 'blur(10px)' } : {}) },
            visible: {
              opacity: 1,
              y: 0,
              ...(withBlur ? { filter: 'blur(0px)' } : {}),
              transition: { duration: 0.5, ease: BLUR_EASE },
            },
          }}
        >
          {word}{i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
}

function BlurRevealText({
  text,
  className,
  delay = 0,
  withBlur = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  withBlur?: boolean;
}) {
  return (
    <motion.span
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
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          variants={{
            hidden: { opacity: 0, y: 20, ...(withBlur ? { filter: 'blur(12px)' } : {}) },
            visible: {
              opacity: 1,
              y: 0,
              ...(withBlur ? { filter: 'blur(0px)' } : {}),
              transition: { duration: 0.55, ease: BLUR_EASE },
            },
          }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  // Default true so SSR + first paint don't apply scroll/blur — avoids hydration mismatch
  const [isMobile, setIsMobile] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // These are always created (hooks must be unconditional) but only applied on desktop
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => {
        setPrev(c);
        return (c + 1) % heroImages.length;
      });
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const blurInitial = (extraDelay: number) =>
    isMobile
      ? { opacity: 0, y: 16 }
      : { opacity: 0, y: 16, filter: 'blur(10px)' };

  const blurAnimate = (extraDelay: number) =>
    isMobile
      ? { opacity: 1, y: 0, transition: { delay: extraDelay, duration: 0.5, ease: BLUR_EASE } }
      : { opacity: 1, y: 0, filter: 'blur(0px)', transition: { delay: extraDelay, duration: 0.5, ease: BLUR_EASE } };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative overflow-hidden sticky top-0 z-0"
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

      {/* Grain texture */}
      <div
        className="absolute inset-0 z-[1] opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
        }}
      />

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

      {/* ── HERO PHOTOS ── */}
      <motion.div
        className="absolute inset-0 z-[3]"
        style={isMobile ? {} : { scale: bgScale }}
      >
        {prev !== null && (
          <img
            src={heroImages[prev]}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover select-none"
            style={{ objectPosition: '65% center', zIndex: 1 }}
          />
        )}

        <motion.img
          key={current}
          src={heroImages[current]}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover select-none"
          style={{ objectPosition: '65% center', zIndex: 2 }}
          initial={{ opacity: prev === null ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />

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
      </motion.div>

      {/* ── CONTENT ── */}
      <motion.div
        className="relative z-[10] w-full flex flex-col items-center justify-center"
        style={isMobile ? { minHeight: '100svh' } : { minHeight: '100svh', scale: contentScale, opacity: contentOpacity }}
      >
        <div className="max-w-[700px] mx-auto px-5 sm:px-8 text-center" style={{ paddingTop: '7rem', paddingBottom: '6rem' }}>

          {/* Badge */}
          <motion.div
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
          </motion.div>

          {/* H1 */}
          <h1 className="font-['DM_Serif_Display'] text-[clamp(36px,5.5vw,68px)] text-white leading-tight tracking-[-1px] sm:tracking-[-2px] md:tracking-[-3px] mb-6 sm:mb-8">
            <BlurRevealText text="Tu salud, " delay={0.2} withBlur={!isMobile} />
            <BlurRevealText text="digitalmente simple" className="italic whitespace-nowrap" delay={0.45} withBlur={!isMobile} />
          </h1>

          {/* Description */}
          <p className="text-[15px] sm:text-base text-white/80 leading-relaxed mb-10 sm:mb-12 mx-auto max-w-[480px] font-medium">
            <BlurRevealWords text="Contá con el respaldo que necesitas desde" delay={0.5} withBlur={!isMobile} />{' '}
            <motion.span
              className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white font-bold border border-white/30"
              initial={blurInitial(0.85)}
              animate={blurAnimate(0.85)}
            >
              $19.500 por mes
            </motion.span>
            <BlurRevealWords text=". Obtené tu cobertura médica esencial en minutos, sin papeles ni trámites presenciales." delay={0.95} withBlur={!isMobile} />
          </p>

          {/* CTAs */}
          <div className="flex gap-3 flex-col sm:flex-row justify-center items-center">
            <motion.div
              className="w-full sm:w-auto"
              initial={blurInitial(1.3)}
              animate={blurAnimate(1.3)}
            >
              <motion.button
                onClick={() =>
                  window.open(
                    'https://nexo.portal.previncasalud.com.ar/registro',
                    '_blank',
                    'noopener,noreferrer',
                  )
                }
                className="bg-white text-[var(--purple)] border-none px-8 sm:px-10 py-4 rounded-full text-[15px] sm:text-base font-bold cursor-pointer font-['DM_Sans'] whitespace-nowrap group flex items-center gap-2 w-full justify-center"
                whileHover={{ scale: 1.03, boxShadow: '0 20px 60px rgba(255,255,255,0.25)' }}
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
              </motion.button>
            </motion.div>

            <motion.div
              className="w-full sm:w-auto"
              initial={blurInitial(1.45)}
              animate={blurAnimate(1.45)}
            >
              <motion.button
                onClick={() =>
                  window.open(
                    'https://wa.me/5493415056130?text=Hola%2C%20quiero%20consultar%20sobre%20Nexo%20by%20Previnca',
                    '_blank',
                    'noopener,noreferrer',
                  )
                }
                className="backdrop-blur-md text-white border-2 px-6 sm:px-8 py-3.5 rounded-full text-[15px] sm:text-base font-bold cursor-pointer font-['DM_Sans'] whitespace-nowrap flex items-center gap-2 w-full justify-center"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.4)',
                }}
                whileHover={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderColor: 'rgba(255,255,255,1)',
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Saber más sobre Nexo
              </motion.button>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
