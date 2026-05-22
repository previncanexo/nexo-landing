import { Fragment } from 'react';
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

const featureItems = [
  {
    label: 'Teleconsultas 24/7',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    label: '50% Off en Farmacias',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.5 1h3a1.5 1.5 0 0 1 1.5 1.5V5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2V2.5A1.5 1.5 0 0 1 10.5 1z"/>
        <line x1="9" y1="12" x2="15" y2="12"/>
      </svg>
    ),
  },
  {
    label: 'Urgencias inmediatas',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    label: 'Alta en minutos',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
];

export function PlanBase() {
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
      className="relative z-[10] overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #ffffff 0%, #faf9fc 50%, #ffffff 100%)',
        marginTop: 'clamp(-48px, -6vw, -80px)',
        borderRadius: 'clamp(40px, 5.5vw, 72px) clamp(40px, 5.5vw, 72px) 0 0',
        paddingTop: 'clamp(40px, 5vw, 64px)',
        paddingBottom: 'clamp(80px, 8vw, 112px)',
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

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 relative z-10">

        {/* ── FEATURE STRIP ── */}
        <motion.div
          className="flex flex-wrap items-center justify-center mb-14 sm:mb-20 pb-8 border-b border-[var(--gray-100)]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {featureItems.map((item, i, arr) => (
            <Fragment key={item.label}>
              <div className="flex items-center gap-3 px-5 sm:px-7 py-3 sm:py-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm"
                  style={{
                    background: 'linear-gradient(135deg, var(--purple), var(--pink))',
                    boxShadow: '0 4px 12px rgba(134,96,239,0.30)',
                  }}
                >
                  {item.icon}
                </div>
                <span className="text-[13px] sm:text-sm font-semibold text-[var(--gray-700)] whitespace-nowrap">
                  {item.label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div className="hidden sm:block self-stretch w-px bg-[var(--gray-200)] my-3" />
              )}
            </Fragment>
          ))}
        </motion.div>

        {/* ── ASYMMETRIC HEADER ── */}
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

            <h2 className="font-['DM_Serif_Display'] text-[clamp(36px,5.5vw,68px)] text-[var(--gray-900)] leading-tight tracking-[-2px] mb-6">
              Las 4 coberturas<br />
              <span className="italic text-[var(--pink)]">esenciales</span><br />
              incluidas
            </h2>

            <p className="text-base sm:text-lg text-[var(--gray-600)] leading-relaxed max-w-[480px] mb-6 sm:mb-8">
              Cuatro prestaciones desde el primer día. Sin letra chica, sin trámites presenciales.
            </p>
          </motion.div>

          {/* Right: Giant Price */}
          <motion.div
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative"
          >
            <div className="relative inline-block w-full sm:w-auto">
              <div className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 shadow-[var(--shadow-elevated)] border border-[var(--purple)]/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--purple-light)] to-[var(--pink-light)] opacity-30" />
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
            </div>
          </motion.div>
        </div>

        {/* ── BENEFITS GRID ── */}
        <motion.div
          className="relative mb-10 md:mb-16"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.name}
                className="group relative"
                variants={staggerItem}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 28 } }}
              >
                <div className="h-full bg-white rounded-3xl p-6 sm:p-7 flex flex-col gap-5 relative overflow-hidden border border-[var(--gray-100)] shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:border-[var(--purple)]/20">
                  <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${benefit.color} rounded-t-3xl`} />
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 [&>svg]:stroke-white`}
                    style={{ color: 'white' }}
                  >
                    {benefit.icon}
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-[17px] font-bold text-[var(--gray-900)] leading-tight">
                      {benefit.name}
                    </h3>
                    <p className="text-sm text-[var(--gray-500)] leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${benefit.color} text-white shadow-sm`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                      {benefit.highlight}
                    </span>
                  </div>
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none`} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA BANNER ── */}
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
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-[100px] opacity-40" />
              <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white blur-[80px] opacity-40" />
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
                  onClick={() => window.open('https://nexo.portal.previncasalud.com.ar/registro', '_blank', 'noopener,noreferrer')}
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

        {/* ── TRUST INDICATORS ── */}
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
