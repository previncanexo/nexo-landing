import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from './motion-variants';

interface EjemploAhorroProps {
  onOpenCheckout: () => void;
}

export function EjemploAhorro({ onOpenCheckout }: EjemploAhorroProps) {
  const [countUp, setCountUp] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(counterRef, { once: true, margin: '-80px' });

  useEffect(() => {
    if (isInView) {
      let current = 0;
      const target = 50;
      const increment = target / 40;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCountUp(target);
          clearInterval(timer);
        } else {
          setCountUp(Math.floor(current));
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <section
      id="ahorro"
      className="py-16 md:py-[120px] relative z-[2] overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f8f7fb 100%)'
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 right-[5%] w-[500px] h-[500px] rounded-full bg-[var(--pink)] opacity-5 blur-[130px]" />
      <div className="absolute bottom-40 left-[8%] w-[450px] h-[450px] rounded-full bg-[var(--purple)] opacity-5 blur-[120px]" />

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
          className="text-center mb-10 md:mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[var(--purple)] to-[var(--pink)] px-6 py-3 rounded-full mb-8 shadow-xl">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            <span className="text-sm font-bold tracking-wide uppercase text-white">El plan que se paga solo</span>
          </div>

          <h2 className="font-['DM_Serif_Display'] text-[clamp(36px,5.5vw,72px)] text-[var(--gray-900)] leading-[0.95] tracking-[-2px] mb-5">
            Tu farmacia{' '}
            <span className="italic text-[var(--pink)]">compensa</span>{' '}
            la cuota
          </h2>

          <p className="text-base sm:text-lg text-[var(--gray-600)] leading-relaxed max-w-[560px] mx-auto">
            El descuento en medicamentos es tan grande que, en la mayoría de los casos,{' '}
            <strong className="text-[var(--gray-900)]">el ahorro supera el costo del plan</strong>.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          ref={counterRef}
          className="grid grid-cols-3 gap-2.5 sm:gap-4 max-w-[700px] mx-auto mb-10 md:mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {[
            {
              value: `${countUp}%`,
              label: 'Descuento en farmacia',
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="5" x2="5" y2="19"/>
                  <circle cx="6.5" cy="6.5" r="2.5"/>
                  <circle cx="17.5" cy="17.5" r="2.5"/>
                </svg>
              )
            },
            {
              value: '+5.000',
              label: 'Farmacias adheridas',
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              )
            },
            {
              value: '68%',
              label: 'Ahorra más que la cuota',
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
              )
            }
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-[var(--gray-200)] text-center hover:border-[var(--purple)]/30 hover:shadow-[var(--shadow-card)] transition-all duration-300"
              variants={staggerItem}
              whileHover={{ y: -4 }}
            >
              <div className="flex justify-center mb-1.5 sm:mb-2 [&>svg]:w-[18px] [&>svg]:h-[18px] sm:[&>svg]:w-[22px] sm:[&>svg]:h-[22px]">{stat.icon}</div>
              <div className="text-xl sm:text-2xl font-['DM_Serif_Display'] text-[var(--gray-900)] mb-0.5 sm:mb-1">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-[var(--gray-600)] font-medium leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="relative"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="relative overflow-hidden rounded-3xl sm:rounded-[32px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--purple)] via-[var(--pink)] to-[var(--purple)]" />

            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white blur-[100px] opacity-40" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-white blur-[80px] opacity-40" />
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
              <div className="max-w-[700px] mx-auto">
                <h3 className="text-[clamp(22px,4vw,44px)] font-['DM_Serif_Display'] font-bold text-white mb-5 leading-tight tracking-tight">
                  Activá Nexo hoy y empezá a{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10">ahorrar desde mañana</span>
                    <span className="absolute bottom-1 left-0 w-full h-3 bg-white/25 -z-0" />
                  </span>
                </h3>

                <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-8 max-w-[560px] mx-auto">
                  Sin papeles, sin vueltas. Te das de alta en minutos y accedés directo al Portal Nexo con tu credencial virtual.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.button
                    onClick={onOpenCheckout}
                    className="bg-white text-[var(--purple)] border-none px-10 py-4 rounded-full text-base font-bold cursor-pointer font-['DM_Sans'] flex items-center gap-3 group w-full sm:w-auto justify-center"
                    whileHover={{ scale: 1.03, boxShadow: '0 20px 60px rgba(255,255,255,0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <span>Lo quiero</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </motion.button>

                  <div className="flex items-center gap-2 text-white/90">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <span className="text-sm font-bold">Solo $19.500/mes · Cancelá cuando quieras</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}