import { motion } from 'motion/react';
import { fadeUp, fadeUpSubtle } from './motion-variants';

export function Hero() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/5493415056130?text=Hola%2C%20quiero%20consultar%20sobre%20Nexo%20by%20Previnca', '_blank');
  };

  return (
    <section id="hero" className="flex flex-col items-center py-12 pt-20 sm:py-16 md:pt-24 md:pb-20 relative overflow-hidden">
      {/* Enhanced Gradient Mesh Background with Grain */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay'
        }}
      />

      {/* Decorative Gradient Orbs */}
      <div className="absolute top-10 right-[10%] w-[500px] h-[500px] rounded-full bg-[var(--pink)] opacity-20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] rounded-full bg-[var(--purple)] opacity-15 blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 relative z-[2] w-full">
        {/* Text Content - Centered */}
        <div className="relative z-10 text-center max-w-[800px] mx-auto">
          {/* Top Badge */}
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

          {/* Hero Title */}
          <motion.div
            className="mb-5 sm:mb-7"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
          >
            <h1 className="font-['DM_Serif_Display'] leading-[0.92] tracking-[-2px] md:tracking-[-3px] mb-3">
              <span className="block text-[clamp(32px,9vw,96px)] text-white">Tu salud,</span>
              <span className="block text-[clamp(32px,9vw,96px)] text-white italic">digitalmente simple</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-[15px] sm:text-lg text-white/85 leading-relaxed mb-7 sm:mb-10 max-w-[520px] font-medium mx-auto"
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

          {/* CTA Buttons */}
          <motion.div
            className="flex gap-3 flex-col sm:flex-row mb-7 sm:mb-10 max-w-[400px] sm:max-w-none mx-auto justify-center"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.45 }}
          >
            <motion.button
              onClick={() => window.open('https://nexo-portal-ten.vercel.app/registro', '_blank', 'noopener,noreferrer')}
              className="bg-white text-[var(--purple)] border-none px-8 sm:px-10 py-4 rounded-full text-[15px] sm:text-base font-bold cursor-pointer font-['DM_Sans'] whitespace-nowrap group w-full sm:w-auto justify-center flex items-center gap-2"
              whileHover={{ scale: 1.03, boxShadow: '0 20px 60px rgba(255,255,255,0.25)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              Quiero mi cobertura
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </motion.button>
            <motion.button
              onClick={handleWhatsApp}
              className="backdrop-blur-md text-white border-2 px-6 sm:px-8 py-3.5 rounded-full text-[15px] sm:text-base font-bold cursor-pointer font-['DM_Sans'] whitespace-nowrap flex items-center gap-2 w-full sm:w-auto justify-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.4)' }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,1)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Saber más sobre Nexo
            </motion.button>
          </motion.div>

        </div>

        {/* Phone Mockup - Below Hero Text */}
        <motion.div
          className="flex justify-center mt-14 sm:mt-20 relative"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
        >
          <div className="relative">
            <PhoneMockup />

            {/* Floating Badge 1 */}
            <div
              className="absolute -top-6 -left-4 sm:-left-20 lg:-left-28 bg-white/95 backdrop-blur-xl rounded-2xl px-4 lg:px-5 py-3 lg:py-4 shadow-2xl border-2 border-[var(--peach)] z-20 hidden sm:block"
              style={{ animation: 'float-1 5s ease-in-out infinite' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--purple)] to-[var(--pink)] flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-[var(--gray-900)]">Alta en minutos</div>
                  <div className="text-xs text-[var(--gray-600)]">100% digital</div>
                </div>
              </div>
            </div>

            {/* Floating Badge 2 */}
            <div
              className="absolute -bottom-8 -left-4 sm:-left-24 lg:-left-32 bg-white/95 backdrop-blur-xl rounded-2xl px-4 lg:px-5 py-3 lg:py-4 shadow-2xl border-2 border-[var(--purple)] z-20 hidden sm:block"
              style={{ animation: 'float-2 5s ease-in-out 2s infinite' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--pink)] to-[var(--purple)] flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-[var(--gray-900)]">Portal Nexo</div>
                  <div className="text-xs text-[var(--gray-600)]">credencial virtual</div>
                </div>
              </div>
            </div>

            {/* Stats Badge */}
            <div
              className="absolute -top-4 -right-4 sm:-right-16 lg:-right-24 bg-gradient-to-br from-[var(--purple)] to-[var(--pink)] rounded-2xl px-4 lg:px-5 py-3 lg:py-4 shadow-2xl z-20 hidden sm:block"
              style={{ animation: 'float-3 5s ease-in-out 1s infinite' }}
            >
              <div className="text-3xl font-['DM_Serif_Display'] text-white mb-1">+10K</div>
              <div className="text-xs text-white/90 font-bold">afiliados</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="w-[280px] sm:w-[320px] bg-white/95 backdrop-blur-xl rounded-[44px] border-4 border-white px-6 pt-7 pb-9 relative overflow-hidden shadow-2xl">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--purple-light)] to-[var(--pink-light)] opacity-40 pointer-events-none" />

      {/* Notch */}
      <div className="w-24 h-7 bg-[var(--gray-900)] rounded-full mx-auto mb-6 relative z-10 flex items-center justify-center">
        <div className="w-16 h-1 bg-[var(--gray-800)] rounded-full" />
      </div>

      {/* Logo */}
      <div className="text-center mb-6 relative z-10">
        <div className="font-['DM_Serif_Display'] text-5xl text-[var(--gray-900)] tracking-[-2px] mb-1">nexo</div>
        <div className="text-xs text-[var(--gray-600)] font-bold uppercase tracking-widest">by previnca</div>
      </div>

      {/* Price Card */}
      <div className="bg-gradient-to-br from-[var(--pink)] to-[var(--purple)] border-2 border-white rounded-3xl p-6 text-center mb-5 relative z-10 shadow-xl">
        <div className="text-xs text-white/80 mb-2 font-bold uppercase tracking-wider">Plan Base</div>
        <div className="font-['DM_Serif_Display'] text-5xl text-white tracking-[-2px] mb-1">$19.500</div>
        <div className="text-sm text-white/90 font-medium">por mes</div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5 relative z-10">
        {[
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            ),
            text: 'DOC24'
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            ),
            text: 'Urgencias 24/7'
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <line x1="20" y1="8" x2="20" y2="14"/>
                <line x1="23" y1="11" x2="17" y2="11"/>
              </svg>
            ),
            text: 'Farmacias -50%'
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2c-1.7 0-3 1.5-3 3.5 0 1.2.5 2.3 1.2 3C9 9.3 7 11 7 13.5 7 17 9 22 12 22s5-5 5-8.5c0-2.5-2-4.2-3.2-5 .7-.7 1.2-1.8 1.2-3C15 3.5 13.7 2 12 2z"/>
              </svg>
            ),
            text: 'Guardias Odonto.'
          }
        ].map((item) => (
          <div key={item.text} className="bg-white/90 backdrop-blur-sm border-2 border-[var(--gray-200)] rounded-2xl p-3 flex flex-col items-center gap-2 text-xs text-[var(--gray-800)] text-center font-bold shadow-sm hover:border-[var(--purple)] transition-all">
            <div className="flex items-center justify-center">{item.icon}</div>
            <span className="leading-tight">{item.text}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={() => window.open('https://nexo-portal-ten.vercel.app/registro', '_blank', 'noopener,noreferrer')}
        className="block w-full bg-gradient-to-r from-[var(--pink)] to-[var(--purple)] text-white border-none py-4 rounded-full text-sm font-bold text-center font-['DM_Sans'] cursor-pointer mb-3 relative z-10 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
      >
        Lo quiero
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </button>

      {/* Support Button */}
      <div className="block w-full bg-white/90 backdrop-blur-sm text-[var(--gray-800)] border-2 border-[var(--gray-300)] py-3 rounded-full text-xs text-center font-['DM_Sans'] relative z-10 font-bold flex items-center justify-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        Soporte 24/7
      </div>
    </div>
  );
}