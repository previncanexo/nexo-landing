import { motion } from 'motion/react';

interface WhatsAppButtonProps {
  isVisible: boolean;
  isMobileCTAVisible: boolean;
}

export function WhatsAppButton({ isVisible, isMobileCTAVisible }: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    // Número de WhatsApp (reemplazar con el número real)
    const phoneNumber = '5493415056130'; // Formato: 549 + código de área sin 0 + número
    const message = encodeURIComponent('Hola! Me gustaría saber más sobre Nexo by Previnca.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop version - bottom right */}
      <div className="hidden lg:block fixed bottom-8 right-8 z-[95]">
        {/* Tooltip/Dialog Bubble */}
        <motion.div
          initial={{ opacity: 0, x: 10, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ 
            delay: 1,
            type: 'spring', 
            stiffness: 300, 
            damping: 25 
          }}
          className="absolute bottom-0 right-[72px] mb-2 px-4 py-2.5 rounded-2xl shadow-lg whitespace-nowrap pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(134, 96, 239, 0.98) 0%, rgba(238, 92, 208, 0.98) 100%)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="text-white text-sm font-semibold">
            ¿Dudas? Escribinos
          </div>
          {/* Arrow pointing to button */}
          <div 
            className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0"
            style={{
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderLeft: '6px solid rgba(238, 92, 208, 0.98)',
            }}
          />
        </motion.div>

        {/* WhatsApp Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWhatsAppClick}
          className="w-14 h-14 rounded-2xl border-none cursor-pointer flex items-center justify-center group shadow-[var(--shadow-float)]"
          style={{
            background: '#25D366', // WhatsApp green
            backdropFilter: 'blur(16px)',
          }}
          aria-label="Contactar por WhatsApp"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:scale-110"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </motion.button>
      </div>

      {/* Mobile version — pill button, no separate tooltip */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: isMobileCTAVisible ? 0 : 1, y: isMobileCTAVisible ? 8 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={handleWhatsAppClick}
        aria-label="Contactar por WhatsApp"
        className="lg:hidden fixed z-[91] left-4 flex items-center gap-2.5 px-4 py-3 rounded-full cursor-pointer shadow-lg border border-white/20"
        style={{
          bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
          background: '#25D366',
          pointerEvents: isMobileCTAVisible ? 'none' : 'auto',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="text-white text-sm font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Escribinos
        </span>
      </motion.button>
    </>
  );
}