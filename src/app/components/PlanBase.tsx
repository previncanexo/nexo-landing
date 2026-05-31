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
  organicPatternStyle,
} from './motion-variants';
import planTeleconsulta from '@/assets/plan-teleconsulta.webp';
import planUrgencias from '@/assets/plan-urgencias.webp';
import planFarmacia from '@/assets/plan-farmacia.webp';
import planOdontologia from '@/assets/plan-odontologia.webp';

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
    label: 'Guardias Odontológicas',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5.5c-1.5-2-4-2.5-5.5-1S4 8 4.5 10c.3 1 .5 2 .5 3 0 2 .5 4 1.5 5.5.5.8 1 1.5 1.5 1.5s1-1 1.5-2.5c.3-1 .5-2 .5-3 0 1 .2 2 .5 3 .5 1.5 1 2.5 1.5 2.5s1-.7 1.5-1.5C18.5 17 19 15 19 13c0-1 .2-2 .5-3 .5-2-.5-4.5-2-6S13.5 3.5 12 5.5Z"/>
      </svg>
    ),
  },
];

export function PlanBase() {
  const benefits = [
    {
      image: planTeleconsulta,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
      name: 'Teleconsultas médicas: DOC24',
      desc: 'Consultas virtuales con médicos las 24 horas, desde cualquier lugar.',
      color: 'from-[var(--purple)] to-[var(--pink)]',
      shadowColor: 'rgba(134,96,239,0.25)',
    },
    {
      image: planUrgencias,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      ),
      name: 'Emergencias 24/7',
      desc: 'Asistencia inmediata ante situaciones de emergencia, estés donde estés.',
      color: 'from-[var(--purple)] to-[var(--pink)]',
      shadowColor: 'rgba(134,96,239,0.25)',
    },
    {
      image: planFarmacia,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.5 1h3a1.5 1.5 0 0 1 1.5 1.5V5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2V2.5A1.5 1.5 0 0 1 10.5 1z"/>
          <line x1="9" y1="12" x2="15" y2="12"/>
        </svg>
      ),
      name: 'Descuentos en farmacias',
      desc: 'Beneficios y descuentos en farmacias adheridas en Rosario y la región.',
      color: 'from-[var(--purple)] to-[var(--pink)]',
      shadowColor: 'rgba(134,96,239,0.25)',
    },
    {
      image: planOdontologia,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c-1.7 0-3 1.5-3 3.5 0 1.2.5 2.3 1.2 3C9 9.3 7 11 7 13.5 7 17 9 22 12 22s5-5 5-8.5c0-2.5-2-4.2-3.2-5 .7-.7 1.2-1.8 1.2-3C15 3.5 13.7 2 12 2z"/>
          <path d="M9.5 17l2.5-3 2.5 3"/>
        </svg>
      ),
      name: 'Guardias Odontológicas',
      desc: 'Atención odontológica ante dolores agudos y/o urgencias inesperadas.',
      color: 'from-[var(--purple)] to-[var(--pink)]',
      shadowColor: 'rgba(134,96,239,0.25)',
    }
  ];

  return (
    <section
      id="beneficios"
      className="relative z-[10] overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #ffffff 0%, #faf9fc 60%, #ffffff 100%)',
        marginTop: 'clamp(-48px, -6vw, -80px)',
        borderRadius: 'clamp(40px, 5.5vw, 72px) clamp(40px, 5.5vw, 72px) 0 0',
        paddingTop: 'clamp(48px, 5.5vw, 72px)',
        paddingBottom: 'clamp(40px, 4vw, 60px)',
      }}
    >
      {/* Organic background pattern */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={organicPatternStyle} />

      {/* Decorative orbs */}
      <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-[var(--purple)] opacity-[0.03] blur-[120px] pointer-events-none z-[1]" />
      <div className="absolute bottom-40 left-[5%] w-[400px] h-[400px] rounded-full bg-[var(--pink)] opacity-[0.03] blur-[100px] pointer-events-none z-[1]" />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 relative z-10">

        {/* ── FEATURE STRIP ── */}
        <motion.div
          className="mb-16 sm:mb-24 pb-8 border-b border-[var(--gray-100)]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Mobile: 2×2 grid */}
          <div className="grid grid-cols-2 gap-2.5 sm:hidden">
            {featureItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 px-3.5 py-3 rounded-2xl"
                style={{
                  background: 'rgba(134,96,239,0.06)',
                  border: '1px solid rgba(134,96,239,0.10)',
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, var(--purple), var(--pink))' }}
                >
                  {item.icon}
                </div>
                <span className="text-[12px] font-semibold text-[var(--gray-700)] leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Desktop: horizontal strip */}
          <div className="hidden sm:flex flex-wrap items-center justify-center">
            {featureItems.map((item, i, arr) => (
              <Fragment key={item.label}>
                <div className="flex items-center gap-3 px-7 py-5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, var(--purple), var(--pink))',
                      boxShadow: '0 4px 12px rgba(134,96,239,0.25)',
                    }}
                  >
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-[var(--gray-600)] whitespace-nowrap tracking-wide">
                    {item.label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className="self-stretch w-px bg-[var(--gray-200)] my-3" />
                )}
              </Fragment>
            ))}
          </div>
        </motion.div>

        {/* ── ASYMMETRIC HEADER ── */}
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-20 mb-12 sm:mb-16 items-end">

          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--purple)] to-[var(--pink)] px-5 py-2.5 rounded-full mb-7 shadow-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span className="text-xs font-bold tracking-[0.12em] uppercase text-white">Nexo by Previnca</span>
            </div>

            <h2 className="font-['DM_Serif_Display'] text-[44px] sm:text-[clamp(36px,5.5vw,68px)] text-[var(--gray-900)] leading-[1.05] tracking-[-2px] mb-7">
              {/* Mobile: 2 líneas */}
              <span className="block sm:hidden">
                El plan que<br />
                <span className="italic text-[var(--pink)]">siempre</span>{' '}necesitás
              </span>
              {/* Desktop: 3 líneas */}
              <span className="hidden sm:block">
                El plan que<br />
                <span className="italic text-[var(--pink)]">siempre</span><br />
                necesitás
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[var(--gray-500)] leading-relaxed max-w-[460px] font-light">
              Cuatro coberturas esenciales incluidas desde el primer día. Sin trámites, sin espera, sin excusas.
            </p>
          </motion.div>

          <motion.div
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative"
          >
            <div className="relative inline-block w-full sm:w-auto">
              <div className="bg-white rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 border border-[var(--gray-100)] relative overflow-hidden"
                style={{ boxShadow: '0 4px 40px rgba(134,96,239,0.08), 0 1px 8px rgba(0,0,0,0.04)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--purple-light)] to-[var(--pink-light)] opacity-40" />
                <div className="absolute inset-0 opacity-[0.06]">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, var(--purple) 1px, transparent 0)',
                    backgroundSize: '28px 28px'
                  }} />
                </div>
                <div className="relative z-10">
                  <div className="text-[11px] text-[var(--gray-400)] font-medium uppercase tracking-[0.18em] mb-4">Suscripción mensual</div>
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="font-['DM_Serif_Display'] text-[clamp(40px,7.5vw,96px)] text-transparent bg-clip-text bg-gradient-to-br from-[var(--purple)] to-[var(--pink)] tracking-[-3px] leading-none inline-block pr-2">
                      $19.500
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--gray-500)]">
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-[var(--pink)]"
                      style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
                    />
                    <span className="font-medium">Incluye 4 prestaciones esenciales</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── BENEFITS GRID — circular icons, minimal cards ── */}
        <motion.div
          className="relative mb-12 sm:mb-16"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.name}
                className="group"
                variants={staggerItem}
                whileHover={{ y: -5, transition: { type: 'spring', stiffness: 400, damping: 28 } }}
              >
                <div
                  className="h-full bg-white rounded-[28px] overflow-hidden flex flex-col border border-[var(--gray-100)] transition-all duration-500 group-hover:border-[var(--purple)]/15"
                  style={{ boxShadow: '0 2px 24px rgba(0,0,0,0.04)' }}
                >
                  {/* Foto */}
                  <div className="w-full overflow-hidden" style={{ aspectRatio: '3/4' }}>
                    <img
                      src={benefit.image}
                      alt={benefit.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Texto */}
                  <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1">
                    <div
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${benefit.color} flex items-center justify-center shrink-0 [&>svg]:stroke-white`}
                      style={{ boxShadow: `0 4px 12px ${benefit.shadowColor}` }}
                    >
                      {benefit.icon}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-[18px] sm:text-[15px] font-bold text-[var(--gray-900)] leading-snug">
                        {benefit.name}
                      </h3>
                      <p className="text-sm text-[var(--gray-500)] leading-relaxed font-light">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── TRUST INDICATORS ── */}
        <motion.div
          className="mt-12 sm:mt-16 relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                ),
                stat: '100% Digital',
                desc: 'Sin trámites presenciales'
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                ),
                stat: '+60 años',
                desc: 'Experiencia en el sector salud'
              }
            ].map((item) => (
              <motion.div
                key={item.stat}
                className="bg-white rounded-[24px] px-7 sm:px-8 py-6 border border-[var(--gray-100)] flex items-center gap-5 hover:border-[var(--purple)]/15 transition-all duration-300"
                style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.04)' }}
                variants={staggerItem}
                whileHover={{ y: -3 }}
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--purple-light)] to-[var(--pink-light)] flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-2xl font-['DM_Serif_Display'] text-[var(--gray-900)] mb-0.5 tracking-tight">{item.stat}</div>
                  <div className="text-sm text-[var(--gray-500)] font-light">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
