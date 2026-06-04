import { m } from '../lib/motion-shim';

interface WhatsAppButtonProps {
  isVisible: boolean;
  isMobileCTAVisible: boolean;
}

export function WhatsAppButton({ isVisible, isMobileCTAVisible }: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    // Número de WhatsApp (reemplazar con el número real)
    const phoneNumber = '5493415056130'; // Formato: 549 + código de área sin 0 + número
    const message = encodeURIComponent('Hola! Me gustaría saber más sobre Previnca Nexo.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop version - bottom right */}
      <div className="hidden lg:block fixed bottom-8 right-8 z-[95]">
        {/* Tooltip/Dialog Bubble */}
        <m.div
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
        </m.div>

        {/* WhatsApp Button */}
        <m.button
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
        </m.button>
      </div>

      {/* Mobile version - hidden when iPhone CTA is visible to avoid overlap */}
      <div
        className={`lg:hidden fixed z-[91] left-4 transition-all duration-500 ${
          isMobileCTAVisible ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100'
        }`}
        style={{ bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}
      >
        {/* Tooltip/Dialog Bubble for Mobile */}
        <m.div
          initial={{ opacity: 0, x: -10, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ 
            delay: 1,
            type: 'spring', 
            stiffness: 300, 
            damping: 25 
          }}
          className="absolute bottom-0 left-[60px] mb-2 px-3 py-2 rounded-xl shadow-lg whitespace-nowrap pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(134, 96, 239, 0.98) 0%, rgba(238, 92, 208, 0.98) 100%)',
          }}
        >
          <div className="text-white text-xs font-semibold">
            ¿Dudas? Escribinos
          </div>
          {/* Arrow pointing to button */}
          <div 
            className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-0 h-0"
            style={{
              borderTop: '5px solid transparent',
              borderBottom: '5px solid transparent',
              borderRight: '5px solid rgba(134, 96, 239, 0.98)',
            }}
          />
        </m.div>

        {/* WhatsApp Button */}
        <m.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWhatsAppClick}
          className="w-12 h-12 rounded-xl border-2 border-white/20 cursor-pointer flex items-center justify-center shadow-lg"
          style={{
            background: '#25D366',
          }}
          aria-label="Contactar por WhatsApp"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </m.button>
      </div>
    </>
  );
}