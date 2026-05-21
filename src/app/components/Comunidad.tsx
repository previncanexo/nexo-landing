import { motion } from 'motion/react';
import { fadeUp, slideFromLeft, slideFromRight, staggerContainer, staggerItem, viewportOnce } from './motion-variants';

export function Comunidad() {
  const cards = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      ),
      title: 'Salud y Prevención',
      sub: 'Contenido, alertas y seguimiento activo de tu bienestar',
      color: 'from-[var(--purple)] to-[var(--pink)]'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      ),
      title: 'Bienestar Físico y Mental',
      sub: 'Rutinas, meditación y recursos de salud mental de calidad',
      color: 'from-[var(--pink)] to-[var(--purple)]'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ),
      title: 'Cuidados Personales',
      sub: 'Guías de autocuidado, hábitos saludables y consejos expertos',
      color: 'from-[var(--purple)] to-[var(--peach)]'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7"/>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
        </svg>
      ),
      title: 'Planes Alimentarios',
      sub: 'Recetas y guías nutricionales adaptadas a tus objetivos',
      color: 'from-[var(--pink)] to-[var(--peach)]'
    }
  ];

  return (
    <section
      id="comunidad"
      className="py-20 sm:py-28 relative z-[2] overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #faf9fc 50%, #ffffff 100%)'
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-32 right-[8%] w-[450px] h-[450px] rounded-full bg-[var(--purple)] opacity-5 blur-[120px]" />
      <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] rounded-full bg-[var(--pink)] opacity-5 blur-[100px]" />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 relative z-10">
        {/* Asymmetric Header */}
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 md:gap-12 items-end mb-12 md:mb-20">
          {/* Left: Title */}
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[var(--purple)] to-[var(--pink)] px-6 py-3 rounded-full mb-8 shadow-xl">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span className="text-sm font-bold tracking-wide uppercase text-white">Comunidad Nexo</span>
              <span className="bg-white/25 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/40">Próximamente</span>
            </div>

            <h2 className="font-['DM_Serif_Display'] text-[clamp(36px,6vw,76px)] text-[var(--gray-900)] leading-[0.95] tracking-[-2.5px] mb-6">
              Más allá de la{' '}
              <span className="block italic text-[var(--pink)] mt-2">cobertura</span>
            </h2>

            <p className="text-base sm:text-lg text-[var(--gray-600)] leading-relaxed max-w-[540px]">
              Un espacio de valor continuo que te acompaña mucho más allá de la urgencia médica o la transacción.
            </p>
          </motion.div>

          {/* Right: Value Prop Card */}
          <motion.div
            className="relative"
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-[var(--purple)]/30 shadow-[var(--shadow-elevated)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--purple-light)] to-[var(--pink-light)] opacity-20" />

              <div className="absolute inset-0 opacity-10">
                <div style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, var(--purple) 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                  width: '100%',
                  height: '100%'
                }} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--purple)] to-[var(--pink)] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-bold text-[var(--purple)] uppercase tracking-wide">Ecosistema de Bienestar</div>
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-[var(--pink)] to-[var(--peach)] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full w-fit">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      Próximamente
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[var(--gray-900)] mb-3 leading-tight">
                  Contenido exclusivo para miembros
                </h3>

                <p className="text-sm text-[var(--gray-600)] leading-relaxed">
                  Accedé a guías, rutinas, recetas y acompañamiento profesional incluido en tu membresía.
                </p>
              </div>
            </div>

            {/* Floating Badge */}
            <div
              className="absolute -top-4 -right-2 sm:-right-4 bg-gradient-to-br from-[var(--pink)] to-[var(--purple)] rounded-xl sm:rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 shadow-2xl z-20"
              style={{ animation: 'float-1 5s ease-in-out infinite' }}
            >
              <div className="text-center">
                <div className="text-2xl font-['DM_Serif_Display'] text-white">24/7</div>
                <div className="text-xs text-white/90 font-bold uppercase tracking-wider">Acceso</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <motion.div
          className="relative mb-10 md:mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {cards.map((card) => (
              <motion.div
                key={card.title}
                className="group relative"
                variants={staggerItem}
                whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] } }}
              >
                <div className="bg-white rounded-3xl overflow-hidden transition-all duration-500 relative border border-[var(--gray-200)] group-hover:border-[var(--purple)]/30 group-hover:shadow-[var(--shadow-elevated)]">
                  {/* Gradient Header */}
                  <div className={`h-20 sm:h-28 bg-gradient-to-br ${card.color} relative overflow-hidden`}>
                    <div className="absolute -top-8 -right-8 w-24 sm:w-28 h-24 sm:h-28 rounded-full bg-white/20 group-hover:scale-150 transition-transform duration-700" />
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-5 w-10 sm:w-14 h-10 sm:h-14 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 [&>svg]:w-[20px] [&>svg]:h-[20px] sm:[&>svg]:w-[28px] sm:[&>svg]:h-[28px]">
                      {card.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-6">
                    <h3 className="text-sm sm:text-base font-bold text-[var(--gray-900)] mb-1 sm:mb-2 leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-[11px] sm:text-sm text-[var(--gray-600)] leading-relaxed">
                      {card.sub}
                    </p>
                  </div>

                  {/* Hover Gradient Border */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} style={{ padding: '2px' }}>
                    <div className="w-full h-full bg-white rounded-3xl" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA Banner */}
        <motion.div
          className="relative"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="relative overflow-hidden rounded-3xl sm:rounded-[40px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--purple)] via-[var(--pink)] to-[var(--purple)]" />

            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-[100px] opacity-40" />
              <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white blur-[80px] opacity-40" />
            </div>

            <div className="absolute inset-0 opacity-10">
              <div style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px',
                width: '100%',
                height: '100%'
              }} />
            </div>

            <div className="relative z-10 px-6 sm:px-10 py-10 sm:py-12 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-6">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span className="text-sm font-bold text-white uppercase tracking-wide">Incluido con tu plan</span>
              </div>

              <h3 className="text-[clamp(22px,4vw,40px)] font-['DM_Serif_Display'] font-bold text-white mb-4 leading-tight tracking-tight max-w-[600px] mx-auto">
                Tu bienestar es parte del{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">plan</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-white/25 -z-0" />
                </span>
              </h3>

              <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-[520px] mx-auto">
                Ser parte de Nexo es acceder a un ecosistema completo de salud, bienestar y cuidado personal.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}