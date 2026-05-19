import { motion } from 'motion/react';
import {
  fadeUp,
  slideFromLeft,
  scaleUp,
  staggerContainer,
  staggerItem,
  staggerContainerSlow,
  viewportOnce,
} from './motion-variants';

interface PlanBaseProps {
  onOpenCheckout: () => void;
}

export function PlanBase({ onOpenCheckout }: PlanBaseProps) {
  const benefits = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
      name: 'Teleconsultas médicas: DOC24',
      desc: 'Consultas virtuales con médicos las 24 horas, desde cualquier lugar.',
      highlight: 'Siempre activo',
      color: 'from-[var(--purple)] to-[var(--pink)]'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7.5 4.27l-4.12 2.6A2 2 0 0 0 2.5 8.6v6.8a2 2 0 0 0 .88 1.66l7.5 5a2 2 0 0 0 2.24 0l7.5-5a2 2 0 0 0 .88-1.66V8.6a2 2 0 0 0-.88-1.73L16.5 4.27a2 2 0 0 0-2.24 0z"/>
          <line x1="12" y1="8" x2="12" y2="16"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
      ),
      name: 'Urgencias 24/7',
      desc: 'Asistencia inmediata ante situaciones de urgencia, estés donde estés.',
      highlight: 'Respuesta rápida',
      color: 'from-[var(--pink)] to-[var(--purple)]'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.5 1h3a1.5 1.5 0 0 1 1.5 1.5V5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2V2.5A1.5 1.5 0 0 1 10.5 1z"/>
          <line x1="9" y1="12" x2="15" y2="12"/>
          <line x1="9" y1="16" x2="13" y2="16"/>
          <path d="M10.5 1v4M13.5 1v4"/>
        </svg>
      ),
      name: 'Descuentos 50% en farmacias',
      desc: 'Beneficios y descuentos en farmacias adheridas de todo el país.',
      highlight: 'Ahorro real',
      color: 'from-[var(--purple)] to-[var(--peach)]'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c-1.7 0-3 1.5-3 3.5 0 1.2.5 2.3 1.2 3C9 9.3 7 11 7 13.5 7 17 9 22 12 22s5-5 5-8.5c0-2.5-2-4.2-3.2-5 .7-.7 1.2-1.8 1.2-3C15 3.5 13.7 2 12 2z"/>
        </svg>
      ),
      name: 'Guardias Odontológicas',
      desc: 'Atención odontológica ante dolores agudos y/o urgencias inesperadas.',
      highlight: 'Rápido alivio',
      color: 'from-[var(--pink)] to-[var(--peach)]'
    }
  ];

  return (
    <section
      id="beneficios"
      className="py-16 md:py-[120px] relative z-[2] overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #ffffff 0%, #faf9fc 50%, #ffffff 100%)'
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-[10%] w-[400px] h-[400px] rounded-full bg-[var(--purple)] opacity-5 blur-[100px]" />
      <div className="absolute bottom-40 left-[5%] w-[350px] h-[350px] rounded-full bg-[var(--pink)] opacity-5 blur-[90px]" />

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 relative z-10">
        {/* Asymmetric Header Layout */}
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 md:gap-16 mb-12 md:mb-20 items-end">

          {/* Left: Title & Description */}
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--purple)] to-[var(--pink)] px-5 py-2.5 rounded-full mb-6 shadow-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span className="text-sm font-bold tracking-wide uppercase text-white">Plan Base</span>
            </div>

            <h2 className="font-['DM_Serif_Display'] text-[clamp(36px,5.5vw,68px)] text-[var(--gray-900)] leading-[0.95] tracking-[-2px] mb-6">
              Tu salud,<br />
              <span className="italic text-[var(--pink)]">digitalmente</span><br />
              simple
            </h2>

            <p className="text-base sm:text-lg text-[var(--gray-600)] leading-relaxed max-w-[480px] mb-6 sm:mb-8">
              Cuatro coberturas esenciales incluidas desde el primer día. Podes cancelar tu plan cuando quieras.
            </p>

            <div className="flex items-center gap-3 text-sm text-[var(--gray-600)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span className="font-medium">Cancelá cuando quieras</span>
            </div>
          </motion.div>

          {/* Right: Giant Price with Effects */}
          <motion.div
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative"
          >
            <div className="relative inline-block w-full sm:w-auto">
              {/* Main Price Container */}
              <div className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 shadow-[var(--shadow-elevated)] border border-[var(--purple)]/30 relative overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--purple-light)] to-[var(--pink-light)] opacity-30" />

                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, var(--purple) 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                  }} />
                </div>

                <div className="relative z-10">
                  <div className="text-sm text-[var(--gray-600)] font-bold uppercase tracking-widest mb-3">Suscripción mensual</div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-['DM_Serif_Display'] text-[clamp(36px,7vw,90px)] text-transparent bg-clip-text bg-gradient-to-br from-[var(--purple)] to-[var(--pink)] tracking-[-3px] leading-none">
                      $19.500
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--gray-700)]">
                    <div
                      className="w-2 h-2 rounded-full bg-[var(--pink)]"
                      style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
                    />
                    <span className="font-semibold">Incluye 4 prestaciones esenciales</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge removed */}
            </div>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <motion.div
          className="relative mb-10 md:mb-16"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.name}
                className="group relative"
                variants={staggerItem}
                whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] } }}
              >
                <div className="bg-white rounded-3xl overflow-hidden transition-all duration-500 relative border border-[var(--gray-200)] group-hover:border-[var(--purple)]/30 group-hover:shadow-[var(--shadow-elevated)]">

                  {/* Gradient Header */}
                  <div className={`h-24 sm:h-32 bg-gradient-to-br ${benefit.color} relative overflow-hidden`}>
                    <div className="absolute -top-10 -right-10 w-28 sm:w-32 h-28 sm:h-32 rounded-full bg-white/20 group-hover:scale-150 transition-transform duration-700" />

                    <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 w-12 sm:w-16 h-12 sm:h-16 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 [&>svg]:w-[24px] [&>svg]:h-[24px] sm:[&>svg]:w-[32px] sm:[&>svg]:h-[32px]">
                      {benefit.icon}
                    </div>

                    <div className="absolute top-4 right-4 bg-white/25 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/40">
                      {benefit.highlight}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-[var(--gray-900)] mb-2 sm:mb-3 leading-tight">
                      {benefit.name}
                    </h3>
                    <p className="text-[13px] sm:text-sm text-[var(--gray-600)] leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>

                  {/* Hover Gradient Border */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} style={{ padding: '2px' }}>
                    <div className="w-full h-full bg-white rounded-3xl" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="relative"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--purple)] via-[var(--pink)] to-[var(--purple)]" />

            <div className="absolute inset-0 opacity-30">
              <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-[100px] opacity-40"
              />
              <div
                className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white blur-[80px] opacity-40"
              />
            </div>

            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }} />
            </div>

            <div className="relative z-10 px-6 sm:px-12 py-8 sm:py-12 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  <span className="text-white text-sm font-bold uppercase tracking-wider">Ahorro Garantizado</span>
                </div>

                <h3 className="text-[clamp(22px,4vw,40px)] font-['DM_Serif_Display'] font-bold text-white mb-4 leading-tight tracking-tight">
                  El ahorro de farmacia{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10">compensa la cuota</span>
                    <span className="absolute bottom-1 left-0 w-full h-3 bg-white/30 -z-0" />
                  </span>
                </h3>

                <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-[540px] mx-auto lg:mx-0">
                  Hasta 50% Off en miles de productos en farmacias adheridas de todo el país.
                </p>
              </div>

              <div className="flex flex-col gap-5 items-center lg:items-end">
                <motion.button
                  onClick={onOpenCheckout}
                  className="bg-white text-[var(--purple)] border-none px-8 sm:px-10 py-4 rounded-full text-base font-bold cursor-pointer font-['DM_Sans'] flex items-center gap-3 group w-full sm:w-auto justify-center"
                  whileHover={{ scale: 1.03, boxShadow: '0 20px 60px rgba(255,255,255,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <span>Comprar mi cobertura</span>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </motion.button>

                <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm font-medium">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span>Activa tu plan en menos de 3 minutos</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-10 md:mt-16 relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                ),
                stat: '100% Digital',
                desc: 'Sin trámites presenciales'
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                ),
                stat: '10.000',
                desc: 'Afiliados activos'
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                ),
                stat: '+60 años',
                desc: 'Experiencia en el sector salud'
              }
            ].map((item) => (
              <motion.div
                key={item.stat}
                className="bg-white rounded-3xl px-6 sm:px-8 py-5 sm:py-6 shadow-[var(--shadow-card)] border border-[var(--gray-200)] flex items-center gap-4 sm:gap-5 hover:border-[var(--purple)]/30 hover:shadow-[var(--shadow-elevated)] transition-all duration-300"
                variants={staggerItem}
                whileHover={{ y: -4 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--purple-light)] to-[var(--pink-light)] flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-2xl font-['DM_Serif_Display'] text-[var(--gray-900)] mb-1 tracking-tight">{item.stat}</div>
                  <div className="text-sm text-[var(--gray-600)] font-medium">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}