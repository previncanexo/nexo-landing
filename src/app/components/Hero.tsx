import { motion } from 'motion/react';
import { fadeUp, fadeUpSubtle } from './motion-variants';
import heroWoman from '@/assets/hero-woman.png';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-[640px] md:min-h-[760px]"
    >
      {/* ─── BACKGROUND: opaque gradient covers the mesh ─── */}
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

      {/* Decorative arcs — translucent rings in the background */}
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

      {/* ─── WOMAN PHOTO — full width background ─── */}
      <div className="absolute inset-0 z-[3]">
        <img
          src={heroWoman}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-center select-none"
        />

        {/* Purple tint over the whole photo */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(30, 10, 90, 0.50)' }}
        />

        {/* Left gradient — keeps text readable */}
        <div
          className="absolute inset-y-0 left-0 z-10"
          style={{
            width: '65%',
            background:
              'linear-gradient(to right, rgba(18,5,61,0.96) 0%, rgba(30,10,90,0.80) 45%, rgba(45,18,102,0.30) 75%, transparent 100%)',
          }}
        />

        {/* Top fade */}
        <div
          className="absolute top-0 left-0 right-0 h-40 z-10"
          style={{ background: 'linear-gradient(to bottom, rgba(18,5,61,0.70) 0%, transparent 100%)' }}
        />

        {/* Bottom fade to white */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 z-10"
          style={{ background: 'linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0) 100%)' }}
        />
      </div>

      {/* ─── CONTENT — left side ─── */}
      <div className="relative z-[10] w-full pt-24 sm:pt-28 md:pt-32 pb-32 md:pb-40">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-14">
          <div className="max-w-[520px]">

            {/* Badge */}
            <motion.div
              variants={fadeUpSubtle}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border-2 border-[var(--purple)] rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs text-[var(--purple)] font-bold mb-5 sm:mb-8 shadow-xl"
            >
              <div
                className="w-2 h-2 rounded-full bg-[var(--pink)]"
                style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
              />
              100% pensado para vos
            </motion.div>

            {/* H1 */}
            <motion.h1
              className="font-['DM_Serif_Display'] leading-tight tracking-[-1px] sm:tracking-[-2px] md:tracking-[-3px] mb-5 sm:mb-7"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
            >
              <span className="block text-[clamp(36px,5.5vw,84px)] text-white">
                Tu salud,
              </span>
              <span className="block text-[clamp(36px,5.5vw,84px)] text-white italic">
                digitalmente simple
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-[15px] sm:text-base text-white/80 leading-relaxed mb-8 sm:mb-10 max-w-[460px] font-medium"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              Contá con el respaldo que necesitas desde{' '}
              <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white font-bold border border-white/30">
                $19.500 por mes
              </span>
              {'. '}Obtené tu cobertura médica esencial en minutos, sin papeles ni trámites presenciales.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex gap-3 flex-col sm:flex-row"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.45 }}
            >
              <motion.button
                onClick={() =>
                  window.open(
                    'https://nexo.portal.previncasalud.com.ar/registro',
                    '_blank',
                    'noopener,noreferrer',
                  )
                }
                className="bg-white text-[var(--purple)] border-none px-8 sm:px-10 py-4 rounded-full text-[15px] sm:text-base font-bold cursor-pointer font-['DM_Sans'] whitespace-nowrap group flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start"
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

              <motion.button
                onClick={() =>
                  window.open(
                    'https://wa.me/5493415056130?text=Hola%2C%20quiero%20consultar%20sobre%20Nexo%20by%20Previnca',
                    '_blank',
                  )
                }
                className="backdrop-blur-md text-white border-2 px-6 sm:px-8 py-3.5 rounded-full text-[15px] sm:text-base font-bold cursor-pointer font-['DM_Sans'] whitespace-nowrap flex items-center gap-2 w-full sm:w-auto justify-center"
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
      </div>

      {/* ─── BOTTOM: gradient fade to white → PlanBase ─── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[15] h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0) 100%)',
        }}
      />

      {/* Organic curved white divider */}
      <div className="absolute bottom-0 left-0 right-0 z-[16] pointer-events-none">
        <svg
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ display: 'block', marginBottom: '-1px' }}
        >
          <path
            d="M0,40 C320,80 720,0 1080,48 C1200,64 1360,32 1440,40 L1440,64 L0,64 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
