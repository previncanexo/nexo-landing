import { motion } from 'motion/react';
import { slideFromLeft, scaleUp, viewportOnce } from './motion-variants';

export function CierreSection() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/5493415056130?text=Hola%2C%20quiero%20consultar%20sobre%20Nexo%20by%20Previnca', '_blank');
  };

  return (
    <section className="relative z-[2] overflow-hidden">
      {/* Dark backdrop — same style as Testimonios */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(13,5,32,0) 0%, rgba(13,5,32,0.95) 8%, rgba(13,5,32,0.95) 92%, rgba(13,5,32,0) 100%)',
        }}
      />
      {/* Subtle top/bottom divider lines */}
      <div className="absolute top-0 left-0 right-0 h-px z-[1]" style={{ background: 'linear-gradient(90deg, transparent, rgba(134,96,239,0.2), rgba(238,92,208,0.15), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px z-[1]" style={{ background: 'linear-gradient(90deg, transparent, rgba(134,96,239,0.2), rgba(238,92,208,0.15), transparent)' }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6 py-16 sm:py-[140px] md:py-[160px]">
        {/* Asymmetric layout */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-20 items-center">

          {/* Left: Editorial Typography */}
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {/* Section heading — same style as Testimonios */}
            <h3
              className="text-3xl sm:text-4xl lg:text-5xl mb-6 sm:mb-10 leading-tight"
              style={{ fontFamily: 'DM Serif Display' }}
            >
              Comenzá{' '}
              <span
                className="bg-gradient-to-r from-[var(--purple)] via-[var(--pink)] to-[var(--peach)] bg-clip-text"
                style={{ WebkitTextFillColor: 'transparent', filter: 'brightness(1.3)' }}
              >
                hoy
              </span>
            </h3>

            {/* Giant editorial title */}
            <h2 className="font-['DM_Serif_Display'] text-[clamp(36px,7vw,96px)] leading-[0.92] tracking-[-1px] sm:tracking-[-2px] md:tracking-[-3px] mb-6 sm:mb-8">
              <span className="text-white">Tu salud</span>
              <br />
              <span className="text-white">no puede</span>
              <br />
              <motion.span
                className="italic inline-block"
                style={{
                  background: 'linear-gradient(135deg, #ee5cd0, #e5ab9f, #ee5cd0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 200%',
                }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                esperar más.
              </motion.span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-[480px]">
              Comenzá con el plan base y agregá lo que necesitás cuando quieras. Sin papeles. Sin excusas.
            </p>
          </motion.div>

          {/* Right: CTA Card */}
          <motion.div
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="relative">
              {/* Glow behind card */}
              <div
                className="absolute -inset-4 rounded-[44px] opacity-50 blur-2xl"
                style={{ background: 'linear-gradient(135deg, var(--purple), var(--pink), var(--peach))' }}
              />

              {/* Glass card */}
              <div className="relative bg-white/[0.07] backdrop-blur-2xl rounded-[28px] sm:rounded-[36px] border border-white/[0.15] p-7 sm:p-10 md:p-12 overflow-hidden">
                {/* Inner glow */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* CTAs */}
                <div className="space-y-3 mb-10">
                  <motion.button
                    onClick={() => window.open('https://nexo.portal.previncasalud.com.ar/registro', '_blank', 'noopener,noreferrer')}
                    className="w-full bg-white text-[var(--purple)] border-none px-8 py-[18px] rounded-full text-base cursor-pointer font-['DM_Sans'] font-bold flex items-center justify-center gap-3 group"
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <span>Lo quiero — $19.500/mes</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </motion.button>

                  <motion.button
                    onClick={handleWhatsApp}
                    className="w-full text-white border px-8 py-[18px] rounded-full text-base cursor-pointer font-['DM_Sans'] font-bold flex items-center justify-center gap-2.5"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.2)' }}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.4)' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Consultá por WhatsApp
                  </motion.button>
                </div>

                {/* Trust line */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-white/40 font-medium tracking-wide flex-wrap justify-center">
                    <span>by previnca</span>
                    <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
                    <span className="hidden sm:inline">Rosario, Argentina</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}