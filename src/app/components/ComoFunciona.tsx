import { m } from '../lib/motion-shim';
import { fadeUp, staggerContainerSlow, staggerItem, viewportOnce, organicPatternStyle } from './motion-variants';

interface ComoFuncionaProps {
  onOpenCheckout: () => void;
}

export function ComoFunciona({ onOpenCheckout }: ComoFuncionaProps) {
  const steps = [
    {
      number: '01',
      title: 'Hacé clic en Quiero mi Cobertura',
      body: 'Revisás el resumen de Previnca Nexo: las 4 prestaciones incluidas, topes, precio mensual y vigencia. Todo claro, sin letra chica.',
      tag: '1 min',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      ),
      iconBg: 'from-[var(--purple)] to-[var(--pink)]'
    },
    {
      number: '02',
      title: 'Completás el formulario de alta',
      body: 'Nombre, apellido, DNI, email y datos de contacto. El proceso es 100% digital, sin papeles ni turnos presenciales.',
      tag: '1 min',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      iconBg: 'from-[var(--purple)] to-[var(--pink)]'
    },
    {
      number: '03',
      title: 'Aceptás los términos y realizás el pago',
      body: 'Revisás y aceptás las condiciones del plan. Luego pagás de forma segura a través de Mercado Pago: tarjeta, débito, transferencia o billetera virtual.',
      tag: '2 min',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      ),
      iconBg: 'from-[var(--purple)] to-[var(--pink)]'
    },
    {
      number: '04',
      title: 'Accedés al Portal Nexo con tu credencial virtual',
      body: 'Al confirmarse el pago, recibís acceso inmediato a tu Portal Nexo. Desde ahí gestionás todos tus beneficios y presentás tu credencial digital en cualquier prestador.',
      tag: 'Inmediato',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
      iconBg: 'from-[var(--purple)] to-[var(--pink)]'
    }
  ];

  return (
    <section
      id="como"
      className="py-16 sm:py-24 md:py-32 relative z-[2] overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #fff0fd 50%, #ffffff 100%)'
      }}
    >
      {/* Organic pattern */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={organicPatternStyle} />

      {/* Decorative orbs */}
      <div className="absolute top-20 left-[5%] w-[500px] h-[500px] rounded-full bg-[var(--purple)] opacity-[0.03] blur-[110px] pointer-events-none" />
      <div className="absolute bottom-32 right-[8%] w-[500px] h-[500px] rounded-full bg-[var(--pink)] opacity-[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 relative z-10">
        {/* Header */}
        <m.div
          className="text-center mb-12 sm:mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[var(--purple)] to-[var(--pink)] px-5 py-2.5 rounded-full mb-6 sm:mb-8 shadow-xl">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
            <span className="text-sm font-bold tracking-wide uppercase text-white">¿Cómo funciona?</span>
          </div>

          <h2 className="font-['DM_Serif_Display'] text-[clamp(36px,5.5vw,68px)] text-[var(--gray-900)] leading-tight tracking-[-2px] mb-4 sm:mb-5 max-w-[760px] mx-auto">
            Pensar en tu bienestar es{' '}
            <span className="italic text-[var(--pink)]">elegir Previnca Nexo</span>
          </h2>

          <p className="text-[15px] sm:text-lg text-[var(--gray-600)] leading-relaxed max-w-[520px] mx-auto">
            Completá los pasos que ves a continuación y obtené tu cobertura en minutos.
          </p>
        </m.div>

        {/* Steps Grid — 2×2 */}
        <m.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-[960px] mx-auto mb-12 sm:mb-16"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {steps.map((step) => (
            /* Outer: solo entrada stagger. Inner: solo hover. Sin conflicto. */
            <m.div key={step.number} variants={staggerItem}>
              <m.div
                className="group bg-white rounded-[24px] border border-[var(--gray-100)] hover:border-[var(--purple)]/15 transition-colors duration-500 p-5 sm:p-6 flex flex-col h-full relative overflow-hidden"
                style={{ boxShadow: '0 2px 24px rgba(0,0,0,0.04)' }}
                whileHover={{ y: -4, boxShadow: '0 8px 40px rgba(134,96,239,0.10)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              >
                {/* Paso label + time badge */}
                <div className="relative flex items-center justify-between mb-4">
                  <span className="text-[9px] font-bold text-[var(--purple)]/40 uppercase tracking-[0.18em]">Paso {step.number}</span>
                  <div className="inline-flex items-center gap-1.5 bg-[var(--gray-100)] px-3 py-1.5 rounded-full">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span className="text-[10px] font-bold text-[var(--purple)] uppercase tracking-wide">{step.tag}</span>
                  </div>
                </div>

                {/* Icon */}
                <div className={`relative w-10 h-10 rounded-2xl bg-gradient-to-br ${step.iconBg} flex items-center justify-center text-white shadow-md mb-3`}>
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="relative text-[15px] font-bold text-[var(--gray-900)] leading-snug mb-1.5">
                  {step.title}
                </h3>
                <p className="relative text-[13px] text-[var(--gray-500)] leading-relaxed flex-1">
                  {step.body}
                </p>
              </m.div>
            </m.div>
          ))}
        </m.div>

        {/* Bottom CTA */}
        <m.div
          className="relative"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px] max-w-[960px] mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--purple)] via-[var(--pink)] to-[var(--purple)]" />

            <div className="absolute inset-0 opacity-30">
              <div
                className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white blur-[100px] opacity-40"
              />
              <div
                className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white blur-[80px] opacity-40"
              />
            </div>

            <div className="absolute inset-0 opacity-10">
              <div style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px',
                width: '100%',
                height: '100%'
              }} />
            </div>

            <div className="relative z-10 px-6 sm:px-12 py-10 sm:py-12 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-5 sm:mb-6">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
                <span className="text-sm font-bold text-white uppercase tracking-wide">Empezá ahora</span>
              </div>

              <h3 className="text-[clamp(22px,3.5vw,40px)] font-['DM_Serif_Display'] font-bold text-white mb-4 sm:mb-5 leading-tight tracking-tight max-w-[560px] mx-auto">
                ¿Listo para simplificar tu salud?
              </h3>

              <p className="text-[15px] sm:text-base text-white/90 leading-relaxed mb-6 sm:mb-8 max-w-[480px] mx-auto">
                Completá el alta en minutos y accedé al instante a tu Portal Nexo con credencial virtual incluida.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <m.button
                  onClick={onOpenCheckout}
                  className="bg-white text-[var(--purple)] border-none px-8 sm:px-10 py-4 rounded-full text-base font-bold cursor-pointer font-['DM_Sans'] flex items-center gap-3 group w-full sm:w-auto justify-center"
                  whileHover={{ scale: 1.03, boxShadow: '0 20px 60px rgba(255,255,255,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <span>Empezar ahora</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </m.button>

                <div className="flex items-center gap-2 text-white/90">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span className="text-sm font-bold">Desde $19.500/mes</span>
                </div>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}