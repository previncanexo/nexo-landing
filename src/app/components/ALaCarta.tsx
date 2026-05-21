import { motion } from 'motion/react';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from './motion-variants';

interface ALaCartaProps {
  onOpenCheckout: () => void;
}

export function ALaCarta({ onOpenCheckout: _onOpenCheckout }: ALaCartaProps) {
  const handleWhatsApp = () => {
    window.open('https://wa.me/5493415056130?text=Hola%2C%20quiero%20suscribirme%20para%20acceder%20a%20los%20nuevos%20servicios%20de%20Nexo', '_blank');
  };

  const services = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <path d="M8 21h8"/>
          <path d="M12 17v4"/>
          <path d="M7.5 10.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"/>
          <path d="M14 9h3"/>
          <path d="M14 12h3"/>
        </svg>
      ),
      title: 'Telemedicina & Psicología',
      color: 'from-[var(--purple)] to-[var(--pink)]'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c-1.7 0-3 1.5-3 3.5 0 1.2.5 2.3 1.2 3C9 9.3 7 11 7 13.5 7 17 9 22 12 22s5-5 5-8.5c0-2.5-2-4.2-3.2-5 .7-.7 1.2-1.8 1.2-3C15 3.5 13.7 2 12 2z"/>
          <path d="M9.5 17l2.5-3 2.5 3"/>
        </svg>
      ),
      title: 'Odontología estética',
      color: 'from-[var(--pink)] to-[var(--peach)]'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5"/>
          <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/>
          <path d="M8 14v.5"/>
          <path d="M16 14v.5"/>
          <path d="M11.25 16.25h1.5L12 17l-.75-.75z"/>
          <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a13.152 13.152 0 0 0-.42-3.309"/>
        </svg>
      ),
      title: 'Cobertura para tu mascota',
      color: 'from-[var(--purple)] to-[var(--pink)]'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>
      ),
      title: 'Seguros personales',
      color: 'from-[#ee5cd0] to-[#8660ef]'
    }
  ];

  return (
    <section
      id="carta"
      className="py-20 sm:py-28 relative z-[2] overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #faf9fc 50%, #ffffff 100%)'
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-32 left-[8%] w-[450px] h-[450px] rounded-full bg-[var(--purple)] opacity-5 blur-[120px]" />
      <div className="absolute bottom-20 right-[12%] w-[400px] h-[400px] rounded-full bg-[var(--pink)] opacity-5 blur-[100px]" />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[var(--purple)] to-[var(--pink)] px-5 py-2.5 rounded-full mb-8 shadow-xl">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span className="text-sm font-bold tracking-wide uppercase text-white">Servicios A la Carta</span>
            <span className="bg-white/25 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/40">Próximamente</span>
          </div>

          <h2 className="font-['DM_Serif_Display'] text-[clamp(36px,5.5vw,68px)] text-[var(--gray-900)] leading-tight tracking-[-2px] mb-5">
            Ampliá tu{' '}
            <span className="italic text-[var(--pink)]">cobertura</span>
          </h2>

          <p className="text-base sm:text-lg text-[var(--gray-600)] leading-relaxed max-w-[560px] mx-auto mb-4">
            Muy pronto vas a poder acceder a las prestaciones que necesitás, de manera simple y flexible.
          </p>

          <p className="text-base sm:text-lg text-[var(--gray-600)] leading-relaxed max-w-[560px] mx-auto">
            Ser parte de Nexo tiene beneficios extra: adquirí el servicio médico que necesitás y abonalo como te conviene.
          </p>
        </motion.div>

        {/* CTA capture */}
        <motion.div
          className="flex flex-col items-center gap-5 mb-14 md:mb-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.button
            onClick={handleWhatsApp}
            className="bg-gradient-to-r from-[var(--purple)] to-[var(--pink)] text-white border-none px-6 sm:px-10 py-4 rounded-full text-base font-bold cursor-pointer font-['DM_Sans'] flex items-center gap-3 group shadow-xl w-full sm:w-auto justify-center"
            whileHover={{ scale: 1.03, boxShadow: '0 20px 60px rgba(134,96,239,0.35)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Suscribite y sé el primero en acceder
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </motion.button>
          <p className="text-xs text-[var(--gray-500)] font-medium">Te avisamos cuando estén disponibles. Sin spam.</p>
        </motion.div>

        {/* Floating Icon Items */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={staggerItem}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] } }}
              className="bg-white rounded-3xl border border-[var(--gray-200)] hover:border-[var(--purple)]/30 hover:shadow-[var(--shadow-elevated)] transition-all duration-500 p-6 flex flex-col items-center text-center gap-4"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg`}>
                {service.icon}
              </div>
              <p className="text-sm font-bold text-[var(--gray-800)] leading-snug">{service.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
