/**
 * Captura de atribución "first-touch" persistida en sessionStorage.
 *
 * Se ejecuta al montar la SPA — parsea UTM/click IDs de la query string y
 * document.referrer + landing_url del primer hit. Sobreviven a la navegación
 * client-side entre `/` y `/onboarding/*` porque los CTAs no propagan la query.
 *
 * Política first-touch: si el sessionStorage ya tiene datos, no se pisan.
 * Un segundo landing con UTMs distintos NO reemplaza al primero durante la
 * sesión (evita atribuir a la última campaña vista).
 */

const SS_KEY = 'nexo_attribution_v1';

export interface Attribution {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  fbclid: string | null;
  gclid: string | null;
  referer: string | null;
  landing_url: string | null;
}

function emptyAttribution(): Attribution {
  return {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_term: null,
    utm_content: null,
    fbclid: null,
    gclid: null,
    referer: null,
    landing_url: null,
  };
}

function readFromParams(): Attribution {
  if (typeof window === 'undefined') return emptyAttribution();
  const q = new URLSearchParams(window.location.search);
  return {
    utm_source: q.get('utm_source'),
    utm_medium: q.get('utm_medium'),
    utm_campaign: q.get('utm_campaign'),
    utm_term: q.get('utm_term'),
    utm_content: q.get('utm_content'),
    fbclid: q.get('fbclid'),
    gclid: q.get('gclid'),
    referer: typeof document !== 'undefined' ? (document.referrer || null) : null,
    landing_url: window.location.href,
  };
}

function hasAnySignal(a: Attribution): boolean {
  return Boolean(
    a.utm_source || a.utm_medium || a.utm_campaign || a.utm_term || a.utm_content
    || a.fbclid || a.gclid || a.referer || a.landing_url
  );
}

/**
 * Ejecutar UNA vez al montar la SPA (en App.tsx). Si el sessionStorage ya
 * tiene atribución, no la pisa (first-touch). Si no, guarda el snapshot
 * actual — pero solo si trae al menos un signal (evita persistir un objeto
 * lleno de nulls cuando el usuario llega orgánico sin ningún parámetro).
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = window.sessionStorage.getItem(SS_KEY);
    if (existing) return;
    const attr = readFromParams();
    if (!hasAnySignal(attr)) return;
    window.sessionStorage.setItem(SS_KEY, JSON.stringify(attr));
  } catch {
    // sessionStorage puede estar deshabilitado (private mode / cookies bloqueadas)
  }
}

/**
 * Lee el snapshot guardado. Si no existe, hace una lectura on-the-fly de la
 * URL actual (útil cuando el usuario aterrizó directo en /onboarding con
 * UTMs y captureAttribution() no llegó a correr por algún motivo).
 */
export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return emptyAttribution();
  try {
    const raw = window.sessionStorage.getItem(SS_KEY);
    if (raw) return { ...emptyAttribution(), ...JSON.parse(raw) };
  } catch {
    // ignore
  }
  const fallback = readFromParams();
  return hasAnySignal(fallback) ? fallback : emptyAttribution();
}
