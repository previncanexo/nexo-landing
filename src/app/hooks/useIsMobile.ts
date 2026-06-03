import { useState, useEffect } from 'react';

/**
 * Returns true when the viewport is below `breakpointPx` (default 768px).
 *
 * Lazy-initialised from matchMedia so the FIRST render is already correct —
 * this avoids a flash where the desktop (animated/blurred) path renders for one
 * frame on a phone. Used to disable GPU-heavy effects (per-letter blur reveals,
 * scroll-linked transforms, backdrop-filter on fixed elements) on mobile only,
 * leaving the desktop experience untouched.
 */
export function useIsMobile(breakpointPx = 768): boolean {
  const query = `(max-width: ${breakpointPx - 1}px)`;
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return isMobile;
}
