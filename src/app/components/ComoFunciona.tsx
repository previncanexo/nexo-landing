import { motion } from 'motion/react';
import { fadeUp, staggerContainerSlow, staggerItem, lineDraw, viewportOnce } from './motion-variants';

interface ComoFuncionaProps {
  onOpenCheckout: () => void;
}

export function ComoFunciona({ onOpenCheckout }: ComoFuncionaProps) {
  const steps = [
    {
      number: '01',
      title: 'Elegís tu plan',
      body: 'Seleccionás el Plan Base y agregás los servicios A la Carta que necesitás. Todo desde esta pantalla, sin salir de la web.',
      tag: '2 min',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      ),
      iconBg: 'from-[#8660ef] to-[#ee5cd0]'
    },
    {
      number: '02',
      title: 'Completás tus datos y el pago',
      body: 'Nombre, DNI y contacto. Luego elegís el método de pago a través de Mercado Pago: tarjeta, débito, transferencia o billetera virtual.',
      tag: '3 min',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      ),
      iconBg: 'from-[#ee5cd0] to-[#8660ef]'
    },
    {
      number: '03',
      title: 'Recibis tu alta en Nexo por WhatsApp',
      body: 'Te guiamos y acompañamos durante el proceso de alta.',
      tag: 'Inmediato',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <path d="M9 10h6"/>
          <path d="M9 14h4"/>
        </svg>
      ),
      iconBg: 'from-[#8660ef] to-[#e5ab9f]'
    }
  ];

  return (
    <section
      id="como"
      className="py-16 md:py-[120px] relative z-[2] overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #faf9fc 50%, #ffffff 100%)'
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-[5%] w-[400px] h-[400px] rounded-full bg-[var(--purple)] opacity-5 blur-[100px]" />
      <div className="absolute bottom-32 right-[8%] w-[450px] h-[450px] rounded-full bg-[var(--pink)] opacity-5 blur-[110px]" />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-20"
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

          <h2 className="font-['DM_Serif_Display'] text-[clamp(36px,5.5vw,68px)] text-[var(--gray-900)] leading-[0.95] tracking-[-2px] mb-4 sm:mb-5 max-w-[760px] mx-auto">
            Pensar en tu bienestar es{' '}
            <span className="italic text-[var(--pink)]">elegir Nexo by Previnca</span>
          </h2>

          <p className="text-[15px] sm:text-lg text-[var(--gray-600)] leading-relaxed max-w-[520px] mx-auto">
            Obtené tu cobertura médica esencial en minutos, sin papeles ni trámites presenciales.
          </p>
        </motion.div>

        {/* Steps - Timeline */}
        <div className="relative max-w-[960px] mx-auto mb-12 md:mb-20">
          {/* Vertical connector line (desktop) */}
          <div className="hidden md:block absolute left-[39px] top-12 bottom-12 w-[2px]">
            <div className="w-full h-full bg-gradient-to-b from-[var(--purple)]/15 via-[var(--pink)]/15 to-[var(--peach)]/15 rounded-full" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[var(--purple)] via-[var(--pink)] to-[var(--peach)] rounded-full origin-top"
              variants={lineDraw}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              style={{ height: '100%' }}
            />
          </div>

          {/* Mobile vertical connector */}
          <div className="md:hidden absolute left-[23px] top-8 bottom-8 w-[2px]">
            <div className="w-full h-full bg-gradient-to-b from-[var(--purple)]/10 via-[var(--pink)]/10 to-[var(--peach)]/10 rounded-full" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[var(--purple)] via-[var(--pink)] to-[var(--peach)] rounded-full origin-top"
              variants={lineDraw}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              style={{ height: '100%' }}
            />
          </div>

          <motion.div
            className="space-y-5 md:space-y-6"
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {steps.map((step) => (
              <motion.div
                key={step.number}
                className="group relative"
                variants={staggerItem}
              >
                {/* ===== DESKTOP LAYOUT (md+) ===== */}
                <div className="hidden md:flex gap-10 items-start">
                  <div className="flex-shrink-0 relative z-10">
                    <motion.div
                      className={`w-[80px] h-[80px] rounded-3xl bg-gradient-to-br ${step.iconBg} flex flex-col items-center justify-center text-white shadow-lg`}
                      whileHover={{ scale: 1.08, rotate: 3 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-0.5">Paso</span>
                      <span className="font-['DM_Serif_Display'] text-2xl leading-none">{step.number}</span>
                    </motion.div>
                  </div>

                  <div className="flex-1 bg-white rounded-3xl border transition-all duration-500 overflow-hidden border-[var(--gray-200)] hover:border-[var(--purple)]/30 hover:shadow-[var(--shadow-elevated)]">
                    <div className="p-8">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.iconBg} flex items-center justify-center text-white flex-shrink-0 shadow-md`}>
                            {step.icon}
                          </div>
                          <h3 className="text-xl font-bold text-[var(--gray-900)] leading-tight">
                            {step.title}
                          </h3>
                        </div>
                        <div className="inline-flex items-center gap-1.5 bg-[var(--gray-100)] px-3 py-1.5 rounded-full flex-shrink-0">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </svg>
                          <span className="text-[11px] font-bold text-[var(--purple)] uppercase tracking-wide">{step.tag}</span>
                        </div>
                      </div>

                      <p className="text-sm text-[var(--gray-600)] leading-relaxed ml-16">
                        {step.body}
                      </p>

                    </div>
                  </div>
                </div>

                {/* ===== MOBILE LAYOUT (<md) ===== */}
                <div className="md:hidden">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 relative z-10">
                      <div className={`w-[48px] h-[48px] rounded-2xl bg-gradient-to-br ${step.iconBg} flex items-center justify-center text-white shadow-lg`}>
                        <span className="font-['DM_Serif_Display'] text-lg leading-none">{step.number}</span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 bg-white rounded-2xl border border-[var(--gray-200)] overflow-hidden shadow-[var(--shadow-subtle)]">
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-2.5">
                          <h3 className="text-[15px] font-bold text-[var(--gray-900)] leading-snug flex-1">
                            {step.title}
                          </h3>
                          <div className="inline-flex items-center gap-1 bg-[var(--gray-100)] px-2 py-1 rounded-full flex-shrink-0">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"/>
                              <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            <span className="text-[10px] font-bold text-[var(--purple)] uppercase tracking-wide">{step.tag}</span>
                          </div>
                        </div>

                        <p className="text-[13px] text-[var(--gray-600)] leading-relaxed">
                          {step.body}
                        </p>

                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="relative"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="relative overflow-hidden rounded-3xl sm:rounded-[36px] max-w-[900px] mx-auto">
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
                ¿Listo para{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">simplificar tu salud?</span>
                  <span className="absolute bottom-1 left-0 w-full h-2.5 bg-white/25 -z-0" />
                </span>
              </h3>

              <p className="text-[15px] sm:text-base text-white/90 leading-relaxed mb-6 sm:mb-8 max-w-[480px] mx-auto">
                Comenzá el proceso de afiliación ahora mismo. En menos de 10 minutos tenés tu credencial lista.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <motion.button
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
                </motion.button>

                <div className="flex items-center gap-2 text-white/90">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span className="text-[13px] sm:text-sm font-bold">Desde $19.500/mes</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}