import { m } from '../lib/motion-shim';
import { fadeUp, staggerContainer, staggerItem, viewportOnce, organicPatternStyle } from './motion-variants';
import cartaTelemedicina from '@/assets/carta-telemedicina.webp';
import cartaOdontologia from '@/assets/carta-odontologia.webp';
import cartaSeguros from '@/assets/carta-seguros.webp';
import cartaTelemedicinaSet from '@/assets/carta-telemedicina.webp?w=360;540&format=webp&quality=70&as=srcset';
import cartaOdontologiaSet from '@/assets/carta-odontologia.webp?w=360;540&format=webp&quality=70&as=srcset';
import cartaSegurosSet from '@/assets/carta-seguros.webp?w=360;540&format=webp&quality=70&as=srcset';
// Placeholders blur-up en base64 (inline en el HTML → blur instantáneo, sin requests)
import { cartaTelemedicinaPh, cartaOdontologiaPh, cartaSegurosPh } from './placeholders';

interface ALaCartaProps {
  onOpenCheckout: () => void;
}

export function ALaCarta({ onOpenCheckout: _onOpenCheckout }: ALaCartaProps) {

  const services = [
    {
      image: cartaTelemedicina,
      imageSet: cartaTelemedicinaSet,
      imagePh: cartaTelemedicinaPh,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          <path d="M3.22 12H9.5l1.5-3 2 4.5 2-7 1.5 5.5H20.78"/>
        </svg>
      ),
      title: 'Más opciones',
    },
    {
      image: cartaOdontologia,
      imageSet: cartaOdontologiaSet,
      imagePh: cartaOdontologiaPh,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2c-1.7 0-3 1.5-3 3.5 0 1.2.5 2.3 1.2 3C9 9.3 7 11 7 13.5 7 17 9 22 12 22s5-5 5-8.5c0-2.5-2-4.2-3.2-5 .7-.7 1.2-1.8 1.2-3C15 3.5 13.7 2 12 2z"/>
          <path d="M9.5 17l2.5-3 2.5 3"/>
        </svg>
      ),
      title: 'Más bienestar para vos',
    },
    {
      image: cartaSeguros,
      imageSet: cartaSegurosSet,
      imagePh: cartaSegurosPh,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>
      ),
      title: 'Más beneficios',
    },
  ];

  return (
    <section
      id="carta"
      className="pt-10 sm:pt-16 md:pt-20 pb-10 sm:pb-16 md:pb-20 relative z-[2] overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f5f0ff 50%, #ffffff 100%)'
      }}
    >
      {/* Organic pattern */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={organicPatternStyle} />

      {/* Decorative orbs */}
      <div className="absolute top-32 left-[8%] w-[500px] h-[500px] rounded-full bg-[var(--purple)] opacity-[0.03] blur-[130px] pointer-events-none" />
      <div className="absolute bottom-20 right-[12%] w-[450px] h-[450px] rounded-full bg-[var(--pink)] opacity-[0.03] blur-[110px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 relative z-10">
        {/* Header */}
        <m.div
          className="text-center mb-8 sm:mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[var(--purple)] to-[var(--pink)] px-5 py-2.5 rounded-full mb-8 shadow-xl">
            <span className="text-sm font-bold tracking-wide uppercase text-white">+Bienestar</span>
            <span className="bg-white/25 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/40">Próximamente</span>
          </div>

          <h2 className="font-['DM_Serif_Display'] text-[clamp(36px,5.5vw,68px)] text-[var(--gray-900)] leading-tight tracking-[-2px] mb-5">
            Próximamente:{' '}
            <span className="italic text-[var(--pink)]">nuevas posibilidades</span>
          </h2>

          <p className="text-base sm:text-lg text-[var(--gray-600)] leading-relaxed max-w-[560px] mx-auto">
            Seguimos evolucionando para ofrecerte más opciones que se adapten a tu estilo de vida.
          </p>
        </m.div>

        {/* Floating Icon Items */}
        <m.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {services.map((service) => (
            <m.div
              key={service.title}
              variants={staggerItem}
              whileHover={{ y: -5, transition: { type: 'spring', stiffness: 400, damping: 28 } }}
              className="group bg-white rounded-[28px] border border-[var(--gray-100)] hover:border-[var(--purple)]/15 transition-all duration-500 overflow-hidden flex flex-col"
              style={{ boxShadow: '0 2px 24px rgba(0,0,0,0.04)' }}
            >
              {/* Foto */}
              <div className="w-full overflow-hidden" style={{ aspectRatio: '4/3', backgroundImage: `url(${service.imagePh})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <img
                  src={service.image}
                  srcSet={service.imageSet}
                  sizes="(max-width: 640px) 90vw, 360px"
                  alt={service.title}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Contenido */}
              <div className="p-5 sm:p-6 flex flex-col items-center text-center gap-3 flex-1">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--purple)]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(134,96,239,0.08) 0%, rgba(238,92,208,0.06) 100%)',
                    border: '1px solid rgba(134,96,239,0.18)',
                  }}
                >
                  {service.icon}
                </div>
                <p className="text-[13px] font-semibold text-[var(--gray-700)] leading-snug">{service.title}</p>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
