import { m, AnimatePresence } from '../lib/motion-shim';
import { useIsMobile } from '../hooks/useIsMobile';

interface IPhoneCTAProps {
  isVisible: boolean;
  onOpenCheckout: () => void;
}

export function IPhoneCTA({ isVisible, onOpenCheckout }: IPhoneCTAProps) {
  const isMobile = useIsMobile();
  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed left-1/2 -translate-x-1/2 z-[90] w-[calc(100%-32px)] max-w-sm"
          style={{ bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }}
        >
          <div
            className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: isMobile ? 'none' : 'blur(20px)',
              WebkitBackdropFilter: isMobile ? 'none' : 'blur(20px)',
              border: '1px solid rgba(0,0,0,0.07)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(134,96,239,0.18)',
            }}
          >
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-[var(--gray-500)] leading-none mb-0.5">Previnca Nexo</p>
              <p className="text-base font-bold text-[var(--gray-900)] leading-tight">$19.500/mes</p>
            </div>
            <button
              onClick={onOpenCheckout}
              className="shrink-0 text-white text-sm font-bold px-5 py-2.5 rounded-xl cursor-pointer transition-transform active:scale-95 font-['DM_Sans']"
              style={{
                background: 'linear-gradient(135deg, var(--purple) 0%, var(--pink) 100%)',
                boxShadow: '0 4px 16px rgba(134,96,239,0.35)',
              }}
            >
              Quiero mi cobertura
            </button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
