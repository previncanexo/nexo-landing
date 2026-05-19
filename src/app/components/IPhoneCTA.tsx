import { motion, AnimatePresence } from 'motion/react';

interface IPhoneCTAProps {
  isVisible: boolean;
  onOpenCheckout: () => void;
}

export function IPhoneCTA({ isVisible, onOpenCheckout }: IPhoneCTAProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[90]"
        >
          {/* iPhone Frame */}
          <div
            className="relative rounded-[28px] sm:rounded-[32px] px-[6px] py-[6px] sm:px-[7px] sm:py-[7px] shadow-[0_8px_40px_rgba(0,0,0,0.18),0_2px_12px_rgba(134,96,239,0.25)]"
            style={{
              background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Titanium edge highlight */}
            <div
              className="absolute inset-0 rounded-[28px] sm:rounded-[32px] pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.06) 100%)',
              }}
            />

            {/* Screen */}
            <div
              className="relative rounded-[22px] sm:rounded-[26px] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, var(--purple) 0%, var(--pink) 60%, var(--peach) 100%)',
              }}
            >
              {/* Dynamic Island */}
              <div className="flex justify-center pt-[10px] sm:pt-3 pb-1">
                <div
                  className="w-[72px] sm:w-[90px] h-[18px] sm:h-[22px] rounded-full"
                  style={{
                    background: '#000',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6)',
                  }}
                >
                  {/* Camera dot */}
                  <div className="flex items-center justify-end h-full pr-[10px] sm:pr-3">
                    <div
                      className="w-[6px] h-[6px] sm:w-[7px] sm:h-[7px] rounded-full"
                      style={{
                        background: 'radial-gradient(circle at 35% 35%, #2a2a4a 0%, #0a0a1a 100%)',
                        boxShadow: '0 0 3px rgba(134,96,239,0.3)',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Content area */}
              <button
                onClick={onOpenCheckout}
                className="w-full border-none bg-transparent cursor-pointer px-6 sm:px-10 pt-2 sm:pt-3 pb-4 sm:pb-5 flex flex-col items-center gap-2 sm:gap-2.5 group"
              >
                {/* CTA Text */}
                <span className="text-white text-[15px] sm:text-lg font-bold tracking-wide whitespace-nowrap font-['DM_Sans']">
                  Lo quiero
                </span>

                {/* Subtitle */}
                <span className="text-white/70 text-[10px] sm:text-xs whitespace-nowrap">
                  $19.500/mes
                </span>

                {/* iPhone home indicator */}
                <div className="mt-1 sm:mt-2">
                  <div
                    className="w-[80px] sm:w-[100px] h-[3px] sm:h-[4px] rounded-full transition-all duration-300 group-hover:w-[100px] sm:group-hover:w-[120px]"
                    style={{
                      background: 'rgba(255,255,255,0.5)',
                    }}
                  />
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}