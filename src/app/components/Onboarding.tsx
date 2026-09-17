import { useEffect, useRef, useState } from 'react';
import logoImage from '@/assets/logo.png';
import { getAttribution } from '../lib/attribution';
import { PLANES, formatearMiles, LS_PLAN_KEY, type PlanComercial } from '@/app/data/planes';
import { BirthDatePicker } from './BirthDatePicker';

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 'success';

interface FormData {
  para_quien: string;
  nombre: string;
  apellido: string;
  email: string;
  whatsapp: string;
  dni: string;
  fecha_nacimiento: string;
  ciudad: string;
  calle: string;
  numero: string;
  depto: string;
  medio_pago: string;
  mp_email: string;
}

const initialForm: FormData = {
  // Default: si el usuario aterriza directo en /onboarding/datos sin pasar
  // por el step 1 (elección de plan), asumimos que se afilia a sí mismo.
  // El backend rechaza el POST si `para_quien` viene vacío.
  para_quien: 'para_mi',
  nombre: '',
  apellido: '',
  email: '',
  whatsapp: '',
  dni: '',
  fecha_nacimiento: '',
  ciudad: '',
  calle: '',
  numero: '',
  depto: '',
  medio_pago: '',
  mp_email: '',
};

const TITLES: Record<string, Record<number, { title: string; desc: string }>> = {
  para_mi: {
    2: { title: 'Tus datos', desc: 'Empecemos por lo básico para crear la cuenta.' },
    3: { title: 'Más sobre vos', desc: 'Necesitamos tu DNI y fecha de nacimiento para validar la afiliación.' },
    4: { title: '¿Dónde vivís?', desc: 'Para configurar tu cobertura por zona.' },
  },
  otra_persona: {
    2: { title: 'Datos del afiliado', desc: 'Datos básicos de la persona que vas a afiliar.' },
    3: { title: 'Sobre el afiliado', desc: 'Necesitamos su DNI y fecha de nacimiento para validar la afiliación.' },
    4: { title: '¿Dónde vive?', desc: 'Para configurar la cobertura por zona.' },
  },
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    /** Inyectado por index.html — fuerza la carga del tracking sin esperar al idle. */
    loadNexoTrackingNow?: () => void;
  }
}

function ErrorMsg({ msg }: { msg: string }) {
  return (
    <div className="ob-error" role="alert">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span>{msg}</span>
    </div>
  );
}

function trackStepView(n: number) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', `form_${n}`, { event_category: 'form', event_label: 'nexo-onboarding' });
  }
}

// API base URL (override con VITE_NEXO_API_URL en .env de Vite)
const API_URL = (import.meta as { env?: Record<string, string> }).env?.VITE_NEXO_API_URL
  ?? 'https://nexo.portal.previncasalud.com.ar';

// localStorage keys
// LS_LEAD y LS_FORM se persisten para que el usuario pueda reanudar el onboarding
// si cierra y vuelve. affiliateId, checkoutUrl y eventIdIC NO se persisten: si
// quedan cacheados, otros usuarios que abran el flow en el mismo browser podrían
// pagar usando la URL de MP del usuario original (bug histórico — un payer cargó
// 3 pagos al affiliate de Matias por este motivo).
// Exportada: App.tsx (goToRegistro) necesita saber si hay un lead en curso
// antes de limpiar el plan persistido — ver el comentario de goToRegistro.
export const LS_LEAD = 'nexo_lead_id';
const LS_FORM = 'nexo_form_data';
// El plan viaja en memoria desde App (prop `planSlug`), pero el flujo YA está
// diseñado para sobrevivir un reload a mitad del wizard (por eso existen LS_LEAD
// y LS_FORM arriba) — si recargás en el step 4 habiendo elegido Nexo III, App se
// remonta con su default y el resumen/PATCH terminarían cobrando $20.000 en vez
// de $7.000. Se persiste acá, con la misma convención. La key vive en
// `data/planes.ts` (LS_PLAN_KEY) porque App.tsx también la escribe.
//
// El plan elegido caduca: si alguien abandona el alta sin crear lead, ningún
// removeItem de abajo se dispara (todos cuelgan de que exista LS_LEAD), y el
// slug queda huérfano en el browser. Semanas después, un deep link directo a
// /onboarding/afiliado (sin pasar por ninguna card) leería ese slug viejo antes
// que el fallback 'nexo-1' — la misma familia del incidente de URL hijacking
// entre sesiones que documentan los LS_LEGACY_* de abajo.
const LS_PLAN_TTL_MS = 24 * 60 * 60 * 1000;

/** Lee el plan guardado y lo descarta si caducó, no matchea un slug vigente, o
 *  el JSON es viejo/corrupto (versión anterior guardaba el slug plano: un
 *  `JSON.parse('nexo-3')` tira, y ahí también hay que caer al fallback en vez
 *  de arriesgar cobrar mal). */
function leerPlanGuardado(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const crudo = sessionStorage.getItem(LS_PLAN_KEY);
    if (!crudo) return null;
    const { slug, ts } = JSON.parse(crudo);
    if (typeof ts !== 'number' || Date.now() - ts > LS_PLAN_TTL_MS) {
      sessionStorage.removeItem(LS_PLAN_KEY);
      return null;
    }
    return typeof slug === 'string' ? slug : null;
  } catch {
    try { sessionStorage.removeItem(LS_PLAN_KEY); } catch { /* ignore */ }
    return null;
  }
}
// Caches legacy que se limpian al montar (ver useEffect de cleanup):
const LS_LEGACY_AFFILIATE = 'nexo_affiliate_id';
const LS_LEGACY_CHECKOUT = 'nexo_checkout_url';
const LS_LEGACY_EVENT_ID_IC = 'nexo_event_id_ic';

// Mapeo bidireccional entre step y subruta
const STEP_TO_PATH: Record<string, string> = {
  '1': '/onboarding/afiliado',
  '2': '/onboarding/datos',
  '3': '/onboarding/dni',
  '4': '/onboarding/direccion',
  '5': '/onboarding/pago',
  '6': '/onboarding/resumen',
  success: '/onboarding/listo',
};

const PATH_TO_STEP: Record<string, Step> = {
  '/onboarding': 1,
  '/onboarding/': 1,
  '/onboarding/afiliado': 1,
  '/onboarding/datos': 2,
  '/onboarding/dni': 3,
  '/onboarding/direccion': 4,
  '/onboarding/pago': 5,
  '/onboarding/resumen': 6,
  '/onboarding/listo': 'success',
};

function stepFromPath(path: string): Step {
  return PATH_TO_STEP[path.replace(/\/$/, '') || '/onboarding'] ?? 1;
}

export function Onboarding({ onClose, planSlug }: { onClose: () => void; planSlug?: string }) {
  // El wizard tenía el producto único hardcodeado en cinco lugares. Con tres planes
  // eso mostraba un precio y cobraba otro. El plan se resuelve una vez y de acá salen
  // tanto la UI del resumen como los eventos de tracking. Fallback explícito a
  // 'nexo-1' (no a PLANES[0]) para que un cambio de orden en el array de datos no
  // termine cayendo silenciosamente al plan más barato.
  // El plan se congela al montar el wizard. Recalcularlo en cada render lo hacía
  // depender del localStorage vivo, y el removeItem(LS_PLAN_KEY) del cierre del
  // alta lo dejaba caer al prop stale en el re-render intermedio: el resumen y
  // el InitiateCheckout mostraban otro plan que el que se mandó a cobrar. Mismo
  // patrón que ya usa este archivo para `step` y `leadId`: useState perezoso.
  //
  // Precedencia: localStorage primero (sobrevive un reload a mitad del wizard,
  // que App no sobrevive porque su estado vuelve a 'nexo-1'), después el prop
  // `planSlug` de App, después el plan principal como último resort.
  // `leerPlanGuardado` valida el TTL: un slug legítimo pero viejo no debe
  // secuestrar la sesión de otra persona que entra semanas después.
  const [plan] = useState<PlanComercial>(() => {
    const guardado = leerPlanGuardado();
    return PLANES.find((p) => p.slug === guardado)
      ?? PLANES.find((p) => p.slug === planSlug)
      ?? PLANES.find((p) => p.slug === 'nexo-1')
      ?? PLANES[0];
  });

  const [step, setStep] = useState<Step>(
    typeof window !== 'undefined' ? stepFromPath(window.location.pathname) : 1
  );
  const [form, setForm] = useState<FormData>(initialForm);
  const [ciudadOpen, setCiudadOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);

  // Fecha máxima seleccionable = hoy - 18 años (limita el picker nativo en mobile).
  const maxBirthDate = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 18);
    return d.toISOString().slice(0, 10);
  })();
  // El onboarding NO persiste nada en localStorage — si el usuario cierra el
  // navegador arranca de cero. Evita el bug de leadId huérfano cuando la DB
  // se limpió (staging) o cuando el lead vencido dejó de existir.
  const [leadId, setLeadId] = useState<string | null>(null);
  // affiliateId, checkoutUrl y eventIdIC viven SOLO en memoria — nunca en sessionStorage.
  // Si el browser se reinicia, el usuario empieza de cero (a propósito).
  const [affiliateId, setAffiliateId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [eventIdIC, setEventIdIC] = useState<string | null>(null);

  // Ninguna restauración desde sessionStorage. El form nace en `initialForm` y
  // arranca en step 1. Cargamos solo GA + Meta Pixel.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.loadNexoTrackingNow?.();
  }, []);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validateStep(s: Step): { error: string | null; fields: Set<string> } {
    const invalid = new Set<string>();
    if (s === 1) {
      if (!form.para_quien) invalid.add('para_quien');
    } else if (s === 2) {
      if (!form.nombre.trim()) invalid.add('nombre');
      if (!form.apellido.trim()) invalid.add('apellido');
      // El email es la identidad de la cuenta Nexo — el backend rechaza si
      // ya existe un afiliado activo con ese email (unicidad hard).
      const email = form.email.trim();
      if (!email || !EMAIL_RE.test(email)) invalid.add('email');
      if (form.whatsapp.replace(/\D/g, '').length < 8) invalid.add('whatsapp');
    } else if (s === 3) {
      if (!/^\d{7,8}$/.test(form.dni.trim())) invalid.add('dni');
      if (!form.fecha_nacimiento) {
        invalid.add('fecha_nacimiento');
      } else {
        const birth = new Date(form.fecha_nacimiento);
        const minAge = new Date();
        minAge.setFullYear(minAge.getFullYear() - 18);
        if (isNaN(birth.getTime()) || birth > minAge) invalid.add('fecha_nacimiento');
      }
    } else if (s === 4) {
      if (!form.ciudad) invalid.add('ciudad');
      if (!form.calle.trim()) invalid.add('calle');
      if (!form.numero.trim()) invalid.add('numero');
    } else if (s === 5) {
      // Medio de pago: tarjeta o dinero en cuenta MP. Requerido — se usa
      // como `payer_email` en la preapproval; sin él MP no crea la sub.
      // El mp_email NO valida unicidad — un pagador puede pagar por N
      // afiliados con la misma cuenta MP (ej: alguien paga por familia).
      if (!['tarjeta', 'mp_balance'].includes(form.medio_pago)) invalid.add('medio_pago');
      const mp = form.mp_email.trim();
      if (!mp || !EMAIL_RE.test(mp)) invalid.add('mp_email');
    }
    return {
      error: invalid.size > 0 ? 'Completá los campos en rojo para continuar.' : null,
      fields: invalid,
    };
  }

  function isInvalid(name: string) {
    return invalidFields.has(name);
  }
  function errCls(name: string) {
    return isInvalid(name) ? ' ob-input-error' : '';
  }

  const trackedSteps = useRef(new Set<number>());

  useEffect(() => {
    if (typeof step === 'number' && !trackedSteps.current.has(step)) {
      trackedSteps.current.add(step);
      trackStepView(step);
    }
  }, [step]);

  // Cerrar dropdown al click afuera
  useEffect(() => {
    if (!ciudadOpen) return;
    const handler = () => setCiudadOpen(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [ciudadOpen]);

  // Sincronizar con back/forward del browser
  useEffect(() => {
    const onPopState = () => setStep(stepFromPath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Si el step entró como /onboarding (sin subruta) o desync, normalizamos la URL
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const target = STEP_TO_PATH[String(step)];
    if (target && window.location.pathname !== target) {
      window.history.replaceState({}, '', target);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => {
      const updated = { ...prev, [key]: value };
      if (typeof window !== 'undefined') {
        try { sessionStorage.setItem(LS_FORM, JSON.stringify(updated)); } catch { /* ignore */ }
      }
      return updated;
    });
    if (invalidFields.has(key)) {
      const next = new Set(invalidFields);
      next.delete(key);
      setInvalidFields(next);
      if (next.size === 0) setError(null);
    }
  }

  function navigateToStep(s: Step) {
    setError(null);
    setInvalidFields(new Set());
    setStep(s);
    if (typeof window !== 'undefined') {
      const target = STEP_TO_PATH[String(s)];
      if (target) window.history.pushState({}, '', target);
    }
  }

  function newEventId(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  async function callCreateLead(): Promise<string | null> {
    const event_id = newEventId();
    const attr = getAttribution();
    try {
      const res = await fetch(`${API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          para_quien: form.para_quien,
          nombre: form.nombre.trim(),
          apellido: form.apellido.trim(),
          // Email de la cuenta Nexo — requerido y único a nivel de afiliado
          // pagado. El backend responde `email_taken` si ya existe un
          // afiliado activo con este email.
          email: form.email.trim().toLowerCase(),
          whatsapp: form.whatsapp.trim(),
          // Plan elegido en la card. Persistir desde el step 1 para no perder
          // la elección si el usuario abandona antes del stage 2 (PATCH).
          plan_slug: plan.slug,
          event_id,
          event_source_url: typeof window !== 'undefined' ? window.location.href : undefined,
          utm_source: attr.utm_source ?? undefined,
          utm_medium: attr.utm_medium ?? undefined,
          utm_campaign: attr.utm_campaign ?? undefined,
          utm_term: attr.utm_term ?? undefined,
          utm_content: attr.utm_content ?? undefined,
          fbclid: attr.fbclid ?? undefined,
          gclid: attr.gclid ?? undefined,
          referer: attr.referer ?? undefined,
          landing_url: attr.landing_url ?? undefined,
          // Constantes del canal Nexo para la integración con Salesforce.
          // El backend las reenvía tal cual a SF, así queda agnóstico del canal:
          // otro canal (WhatsApp, etc.) mandaría sus propios valores.
          sales_channel: 'Nexo',
          document_type: 'DNI',
          country: 'Argentina',
          state: 'Santa Fe',
          declared_members_count: 1,
          senior_members_count: 0,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        if (data.error === 'email_taken') {
          setError(data.message || 'Probá registrándote con otro email.');
          setInvalidFields(new Set(['email']));
        } else {
          setError(data.message || 'No se pudo crear el lead. Probá de nuevo.');
        }
        return null;
      }
      sessionStorage.setItem(LS_LEAD, data.leadId);
      setLeadId(data.leadId);
      // Pixel Lead + GA4 generate_lead (mismo event_id que el CAPI server-side)
      if (typeof window !== 'undefined') {
        try {
          window.fbq?.('track', 'Lead', { content_name: 'nexo-onboarding' }, { eventID: event_id });
        } catch {}
        try {
          window.gtag?.('event', 'generate_lead', { event_category: 'form', event_label: 'nexo-onboarding' });
        } catch {}
      }
      return data.leadId;
    } catch {
      setError('No se pudo conectar con el servidor. Probá de nuevo.');
      return null;
    }
  }

  async function callFinalizeLead(currentLeadId: string): Promise<{ affiliateId: string; checkoutUrl: string } | null> {
    const eventIdCR = newEventId();
    const eventIdIC = newEventId();
    const attr = getAttribution();
    try {
      const res = await fetch(`${API_URL}/api/leads/${currentLeadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan_slug: plan.slug,
          dni: form.dni.trim(),
          fecha_nacimiento: form.fecha_nacimiento,
          ciudad: form.ciudad,
          calle: form.calle.trim(),
          numero: form.numero.trim(),
          depto: form.depto.trim(),
          // El email de contacto Nexo se persistió en el POST del step 2 y
          // NO se pisa acá. `mp_email` es el email de la cuenta MP del
          // pagador — se usa como `payer_email` de la preapproval y NO
          // valida unicidad (un pagador puede pagar por N afiliados).
          mp_email: form.mp_email.trim().toLowerCase(),
          medio_pago: form.medio_pago,
          event_id_complete_registration: eventIdCR,
          event_id_initiate_checkout: eventIdIC,
          event_source_url: typeof window !== 'undefined' ? window.location.href : undefined,
          // GA4 client_id parseado del cookie _ga (formato GA1.1.X.Y → X.Y).
          // El backend lo guarda en el affiliate y lo usa para mandar el
          // Purchase server-side desde el webhook MP atribuido al mismo usuario.
          ga_client_id: typeof document !== 'undefined'
            ? (document.cookie.split('; ').find(c => c.startsWith('_ga='))?.split('=')[1] || '').split('.').slice(-2).join('.')
            : undefined,
          // Atribución (por si el POST inicial no la capturó — el backend
          // solo escribe estos campos si vienen truthy, no pisa first-touch).
          utm_source: attr.utm_source ?? undefined,
          utm_medium: attr.utm_medium ?? undefined,
          utm_campaign: attr.utm_campaign ?? undefined,
          utm_term: attr.utm_term ?? undefined,
          utm_content: attr.utm_content ?? undefined,
          fbclid: attr.fbclid ?? undefined,
          gclid: attr.gclid ?? undefined,
          referer: attr.referer ?? undefined,
          landing_url: attr.landing_url ?? undefined,
          // Constantes del canal Nexo (idem POST) — el backend las reenvía
          // a Salesforce sin conocer el canal.
          sales_channel: 'Nexo',
          document_type: 'DNI',
          country: 'Argentina',
          state: 'Santa Fe',
          declared_members_count: 1,
          senior_members_count: 0,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        if (data.error === 'dni_taken' || data.error === 'email_taken') {
          setError(data.message);
          setInvalidFields(new Set([data.error === 'dni_taken' ? 'dni' : 'email']));
        } else {
          setError(data.message || 'No se pudo finalizar el registro. Probá de nuevo.');
        }
        return null;
      }
      sessionStorage.removeItem(LS_LEAD);
      // El alta se completó: el próximo visitante de este browser no debe heredar
      // el plan de otro affiliate ya creado.
      sessionStorage.removeItem(LS_PLAN_KEY);
      setLeadId(null);
      setAffiliateId(data.affiliateId);
      setCheckoutUrl(data.checkoutUrl);
      setEventIdIC(eventIdIC);

      // Pixel CompleteRegistration + GA4 sign_up (dedup CAPI vía eventID compartido)
      const planName = plan.nombre;
      const value = plan.precio;
      if (typeof window !== 'undefined') {
        try {
          window.fbq?.('track', 'CompleteRegistration', { content_name: planName, currency: 'ARS', value }, { eventID: eventIdCR });
        } catch {}
        try {
          window.gtag?.('event', 'sign_up', { method: 'nexo-onboarding', value, currency: 'ARS' });
        } catch {}
      }
      return { affiliateId: data.affiliateId, checkoutUrl: data.checkoutUrl };
    } catch {
      setError('No se pudo conectar con el servidor. Probá de nuevo.');
      return null;
    }
  }

  // Enriquecimiento progresivo del lead en SF: fire-and-forget al backend
  // apenas el usuario completa un step. El backend acumula datos parciales
  // en el lead y dispara /leads a SF con snapshot actual. No bloquea el
  // avance de step (si falla, seguimos como si nada).
  function enrichLeadInBackground(currentLeadId: string, extra: Record<string, unknown>) {
    fetch(`${API_URL}/api/leads/${currentLeadId}/enrich`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...extra,
        sales_channel: 'Nexo',
        document_type: 'DNI',
        declared_members_count: 1,
        senior_members_count: 0,
      }),
    }).catch(() => { /* ignoramos, es best-effort */ });
  }

  async function next() {
    if (typeof step !== 'number' || step >= 6) return;
    const { error: err, fields } = validateStep(step);
    if (err) {
      setError(err);
      setInvalidFields(fields);
      return;
    }

    // Step 2 → 3: crear lead (si todavía no existe)
    if (step === 2 && !leadId) {
      setSubmitting(true);
      const newLeadId = await callCreateLead();
      setSubmitting(false);
      if (!newLeadId) return;
    }

    // Step 3 → 4: DNI + fecha_nac ya validados → enrich a SF con esos datos.
    // Este es el PRIMER envío a SF (sin address todavía → readyToSell: false).
    if (step === 3 && leadId) {
      enrichLeadInBackground(leadId, {
        dni: form.dni.trim(),
        fecha_nacimiento: form.fecha_nacimiento,
      });
    }

    // Step 4 → 5: address completo → enrich a SF con street + city (+ apartment).
    // Después de este envío, SF debería responder readyToSell: true.
    if (step === 4 && leadId) {
      enrichLeadInBackground(leadId, {
        ciudad: form.ciudad,
        calle: form.calle.trim(),
        numero: form.numero.trim(),
        depto: form.depto?.trim() || undefined,
      });
    }

    // Step 5 → 6: finalizar lead, crear affiliate + suscripción MP.
    // SIEMPRE llamamos a la API (no cacheamos affiliateId entre re-clicks).
    // El backend es idempotente: si el lead ya está convertido, devuelve la
    // checkoutUrl existente del affiliate ya creado, sin crear uno nuevo.
    if (step === 5) {
      let currentLeadId = leadId;
      // Auto-recuperación: si el leadId se perdió (localStorage limpiado por
      // 404 del lead viejo, o el usuario volvió atrás y cambió datos), lo
      // recreamos con los datos actuales antes de finalizar, en vez de
      // obligar al usuario a recargar.
      if (!currentLeadId) {
        setSubmitting(true);
        currentLeadId = await callCreateLead();
        if (!currentLeadId) {
          setSubmitting(false);
          return;
        }
      }
      setSubmitting(true);
      const result = await callFinalizeLead(currentLeadId);
      setSubmitting(false);
      if (!result) return;
    }

    navigateToStep((step + 1) as Step);
  }
  function prev() {
    if (typeof step !== 'number' || step <= 1) return;
    navigateToStep((step - 1) as Step);
  }

  function getTitle(n: number) {
    const choice = form.para_quien || 'para_mi';
    return TITLES[choice]?.[n] || TITLES.para_mi[n];
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!checkoutUrl) {
      setError('No tenemos el link de pago todavía. Volvé al paso anterior y reintentá.');
      return;
    }
    // Dispara InitiateCheckout client-side justo antes del redirect.
    // Usa el mismo event_id que el server-side ya envió a CAPI → dedup.
    if (typeof window !== 'undefined') {
      const ic = eventIdIC ?? newEventId();
      try {
        window.fbq?.('track', 'InitiateCheckout', { content_name: plan.nombre, currency: 'ARS', value: plan.precio }, { eventID: ic });
      } catch {}
      try {
        window.gtag?.('event', 'begin_checkout', { currency: 'ARS', value: plan.precio, items: [{ item_name: plan.nombre, price: plan.precio, quantity: 1 }] });
      } catch {}
    }
    // Pequeño delay para que el pixel pueda enviar el request antes del navigate
    setTimeout(() => {
      window.location.href = checkoutUrl;
    }, 400);
  }

  const hoy = new Date();
  const fechaHoy = `${String(hoy.getDate()).padStart(2, '0')}/${String(hoy.getMonth() + 1).padStart(2, '0')}/${hoy.getFullYear()}`;

  return (
    <div className="fixed inset-0 z-[300] overflow-y-auto" style={{ background: 'linear-gradient(135deg, #12053d 0%, #2d1266 40%, #6535cc 100%)', scrollbarGutter: 'stable' }}>
      <style>{`
        .ob-card { background: rgba(18,5,61,0.55); border: 1px solid rgba(255,255,255,0.14); border-radius: 18px; padding: 2.5rem 2rem; backdrop-filter: blur(32px); box-shadow: 0 8px 40px rgba(0,0,0,0.30); width: 100%; max-width: 560px; }
        .ob-progress { display: flex; align-items: center; justify-content: center; gap: 0.4rem; margin-bottom: 2rem; }
        .ob-dot { width: 26px; height: 26px; border-radius: 50%; background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.14); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; color: rgba(255,255,255,0.4); transition: all 0.3s ease; }
        .ob-dot.done, .ob-dot.active { background: #8660ef; border-color: #8660ef; color: #fff; }
        .ob-line { width: 26px; height: 1px; background: rgba(255,255,255,0.14); transition: background 0.3s ease; }
        .ob-line.done { background: #8660ef; }
        .ob-title { font-family: 'DM Serif Display', serif; font-style: italic; font-size: clamp(1.6rem, 4vw, 2rem); font-weight: 400; line-height: 1.2; margin-bottom: 0.4rem; text-align: center; color: #fff; }
        .ob-desc { font-size: 0.9rem; color: rgba(255,255,255,0.65); text-align: center; margin-bottom: 1.5rem; }
        .ob-options { display: grid; gap: 0.6rem; margin-bottom: 0.5rem; }
        .ob-option { position: relative; display: flex; align-items: center; gap: 0.85rem; padding: 1rem 1.1rem; border: 1px solid rgba(255,255,255,0.14); border-radius: 12px; cursor: pointer; transition: all 0.2s ease; background: rgba(255,255,255,0.02); }
        .ob-option:hover { border-color: rgba(255,255,255,0.22); background: rgba(255,255,255,0.05); }
        .ob-option.checked { border-color: #8660ef; background: rgba(134,96,239,0.12); }
        .ob-option-icon { width: 38px; height: 38px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border-radius: 10px; background: rgba(134,96,239,0.25); }
        .ob-option-text { display: flex; flex-direction: column; gap: 0.15rem; flex: 1; }
        .ob-option-title { font-size: 0.95rem; font-weight: 600; color: #fff; }
        .ob-option-sub { font-size: 0.75rem; color: rgba(255,255,255,0.65); }
        .ob-option-check { width: 20px; height: 20px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.22); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ob-option.checked .ob-option-check { background: #8660ef; border-color: #8660ef; }
        .ob-field { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }
        .ob-field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem; }
        .ob-field-grid .ob-field { margin-bottom: 0; }
        .ob-label { font-size: 0.75rem; font-weight: 600; color: rgba(255,255,255,0.65); text-transform: uppercase; letter-spacing: 0.06em; }
        /* font-size 16px evita el zoom automático de iOS al enfocar un input. */
        .ob-input { width: 100%; padding: 0.85rem 1rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.14); border-radius: 12px; color: #fff; font-family: inherit; font-size: 1rem; line-height: 1.25; transition: all 0.2s ease; color-scheme: dark; }
        /* Date input nativo: se apila invisible encima del input text para que
           el usuario vea siempre "DD/MM/AAAA" bien formateado y en mobile se
           dispare el picker nativo del sistema. */
        .ob-date-wrap { position: relative; }
        .ob-date-wrap .ob-input { padding-right: 2.75rem; }
        .ob-date-icon { position: absolute; top: 50%; right: 0.9rem; transform: translateY(-50%); pointer-events: none; color: rgba(255,255,255,0.55); }
        .ob-date-native { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.001; border: 0; padding: 0; margin: 0; background: transparent; color: transparent; cursor: pointer; font-size: 16px; color-scheme: dark; -webkit-appearance: none; appearance: none; }
        .ob-date-native::-webkit-calendar-picker-indicator { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }
        .ob-input:focus { outline: none; border-color: #8660ef; background: rgba(134,96,239,0.08); }
        .ob-input::placeholder { color: rgba(255,255,255,0.4); }
        .ob-cselect { position: relative; }
        .ob-cselect-btn { width: 100%; padding: 0.85rem 1rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.14); border-radius: 12px; color: #fff; font-family: inherit; font-size: 0.95rem; text-align: left; cursor: pointer; display: flex; align-items: center; justify-content: space-between; }
        .ob-cselect-btn.placeholder { color: rgba(255,255,255,0.4); }
        .ob-cselect-list { position: absolute; top: calc(100% + 6px); left: 0; right: 0; background: rgba(18,5,61,0.96); border: 1px solid rgba(255,255,255,0.22); border-radius: 12px; backdrop-filter: blur(20px); box-shadow: 0 12px 32px rgba(0,0,0,0.5); z-index: 10; overflow: hidden; }
        .ob-cselect-option { width: 100%; padding: 0.75rem 1rem; background: transparent; border: none; color: #fff; font-family: inherit; font-size: 0.95rem; text-align: left; cursor: pointer; display: block; }
        .ob-cselect-option:hover { background: rgba(134,96,239,0.25); }
        .ob-cselect-option.selected { background: rgba(134,96,239,0.18); color: #ee5cd0; font-weight: 600; }
        /* Método de pago (step 5): 2 cards seleccionables (tarjeta / mp balance) */
        .ob-paymethod { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-bottom: 1.1rem; }
        @media (max-width: 380px) { .ob-paymethod { grid-template-columns: 1fr; } }
        .ob-paymethod-card { display: flex; align-items: center; gap: 0.75rem; padding: 0.85rem 0.9rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.14); border-radius: 14px; color: #fff; font-family: inherit; cursor: pointer; text-align: left; transition: all 0.2s ease; }
        .ob-paymethod-card:hover { border-color: rgba(255,255,255,0.28); background: rgba(255,255,255,0.09); }
        .ob-paymethod-card.selected { border-color: #8660ef; background: rgba(134,96,239,0.14); box-shadow: 0 0 0 3px rgba(134,96,239,0.18); }
        .ob-paymethod-icon { width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, rgba(134,96,239,0.28) 0%, rgba(238,92,208,0.28) 100%); display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0; }
        .ob-paymethod-body { min-width: 0; }
        .ob-paymethod-title { font-size: 0.95rem; font-weight: 600; margin: 0; }
        .ob-paymethod-sub { font-size: 0.78rem; color: rgba(255,255,255,0.55); margin: 2px 0 0; }
        .ob-paymethod.ob-input-error .ob-paymethod-card:not(.selected) { border-color: rgba(255,120,130,0.5); }
        .ob-field-hint { font-size: 0.78rem; color: rgba(255,255,255,0.55); margin: 0.5rem 0 0; line-height: 1.35; }
        /* BirthDatePicker: 3 selects custom (día · mes · año) con scrollbar
           estilado al tema. Reemplaza el input date nativo del step 3. */
        .bdp-picker { display: grid; grid-template-columns: 90px 1fr 100px; gap: 0.6rem; }
        @media (max-width: 380px) { .bdp-picker { grid-template-columns: 80px 1fr 92px; } }
        .bdp-select { position: relative; font-family: inherit; }
        .bdp-trigger { width: 100%; background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.14); border-radius: 12px; padding: 0.85rem 0.75rem; font-family: inherit; font-size: 1rem; cursor: pointer; text-align: left; display: flex; align-items: center; justify-content: space-between; transition: all 0.2s ease; line-height: 1.25; }
        .bdp-trigger:hover { border-color: rgba(255,255,255,0.25); background: rgba(255,255,255,0.08); }
        .bdp-select.bdp-open .bdp-trigger,
        .bdp-trigger:focus { outline: none; border-color: #8660ef; background: rgba(134,96,239,0.08); box-shadow: 0 0 0 3px rgba(134,96,239,0.18); }
        .bdp-placeholder { color: rgba(255,255,255,0.4); }
        .bdp-value { color: white; }
        .bdp-chevron { width: 16px; height: 16px; transition: transform 0.2s ease; flex-shrink: 0; margin-left: 0.4rem; }
        .bdp-select.bdp-open .bdp-chevron { transform: rotate(180deg); }
        .bdp-options { position: absolute; top: calc(100% + 6px); left: 0; right: 0; background: rgba(18,5,61,0.98); border: 1px solid rgba(255,255,255,0.14); border-radius: 12px; padding: 6px; max-height: 240px; overflow-y: auto; z-index: 20; box-shadow: 0 20px 40px rgba(0,0,0,0.5); backdrop-filter: blur(20px); display: none; scrollbar-width: thin; scrollbar-color: rgba(180,130,255,0.55) rgba(255,255,255,0.05); }
        .bdp-select.bdp-open .bdp-options { display: block; }
        .bdp-options::-webkit-scrollbar { width: 8px; }
        .bdp-options::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 4px; margin: 4px 0; }
        .bdp-options::-webkit-scrollbar-thumb { background: linear-gradient(180deg, rgba(134,96,239,0.65) 0%, rgba(238,92,208,0.65) 100%); border-radius: 4px; border: 1px solid rgba(255,255,255,0.06); }
        .bdp-options::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, rgba(134,96,239,0.9) 0%, rgba(238,92,208,0.9) 100%); }
        .bdp-option { padding: 0.65rem 0.85rem; border-radius: 10px; cursor: pointer; font-size: 0.98rem; color: rgba(255,255,255,0.85); transition: background 0.1s ease, color 0.1s ease; }
        .bdp-option:hover { background: rgba(134,96,239,0.22); color: white; }
        .bdp-option-selected { background: linear-gradient(135deg, rgba(134,96,239,0.32) 0%, rgba(238,92,208,0.32) 100%); color: white; font-weight: 500; }
        .bdp-select.bdp-error .bdp-trigger { border-color: rgba(255,120,130,0.7); background-color: rgba(255,120,130,0.08); }
        .ob-actions { display: flex; gap: 0.75rem; margin-top: 1.5rem; }
        .ob-btn { flex: 1; padding: 0.95rem 1.25rem; border-radius: 50px; border: 1px solid rgba(255,255,255,0.22); background: transparent; color: #fff; font-family: inherit; font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: all 0.25s ease; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; line-height: 1; }
        .ob-btn:hover { background: rgba(255,255,255,0.06); }
        .ob-btn-primary { background: linear-gradient(135deg, #8660ef, #ee5cd0); border-color: transparent; box-shadow: 0 4px 16px rgba(134,96,239,0.35); }
        .ob-btn-primary:hover { background: linear-gradient(135deg, #9472f0, #f06dd5); }
        .ob-summary-block { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.14); border-radius: 12px; padding: 0.95rem 1.1rem; margin-bottom: 0.65rem; }
        .ob-summary-label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4); margin-bottom: 0.35rem; }
        .ob-summary-value { font-size: 1rem; font-weight: 600; color: #fff; }
        .ob-summary-sub { font-size: 0.8rem; color: rgba(255,255,255,0.65); margin-top: 0.2rem; }
        .ob-summary-plan { overflow: hidden; border-radius: 12px; border: 1px solid rgba(255,255,255,0.14); margin-bottom: 0.65rem; }
        .ob-summary-plan-bar { height: 4px; background: linear-gradient(90deg, #8660ef, #ee5cd0); }
        .ob-summary-plan-body { padding: 1rem 1.1rem; background: rgba(255,255,255,0.06); display: flex; justify-content: space-between; align-items: flex-end; gap: 1rem; }
        .ob-summary-plan-label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4); margin-bottom: 0.2rem; }
        .ob-summary-plan-name { font-size: 1rem; font-weight: 600; color: #fff; }
        .ob-summary-plan-period { font-size: 0.75rem; color: rgba(255,255,255,0.4); margin-bottom: 0.1rem; text-align: right; }
        .ob-summary-plan-price { font-family: 'DM Serif Display', serif; font-style: italic; font-size: 1.5rem; line-height: 1; background: linear-gradient(135deg, #fff, rgba(255,255,255,0.75)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; text-align: right; }
        .ob-close { position: absolute; top: 1.5rem; right: 1.5rem; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14); color: rgba(255,255,255,0.7); width: 38px; height: 38px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; z-index: 10; }
        .ob-close:hover { background: rgba(255,255,255,0.14); color: #fff; }
        .ob-collapsible { overflow: hidden; transition: max-height 0.4s ease, opacity 0.3s ease, margin-top 0.4s ease; }
        .ob-collapsible.closed { max-height: 0; opacity: 0; margin-top: 0 !important; }
        .ob-collapsible.open { max-height: 200px; opacity: 1; margin-top: 1rem; }
        .ob-success-icon { width: 64px; height: 64px; margin: 0 auto 1.25rem; border-radius: 50%; background: linear-gradient(135deg, #8660ef, #ee5cd0); display: flex; align-items: center; justify-content: center; }
        .ob-error { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.85rem 1rem; border-radius: 12px; background: rgba(239,68,68,0.10); border: 1px solid rgba(239,68,68,0.30); color: #fca5a5; font-size: 0.85rem; line-height: 1.4; margin-top: 0.5rem; margin-bottom: 0.5rem; }
        .ob-input-error, .ob-input.ob-input-error { border-color: rgba(239,68,68,0.55) !important; background: rgba(239,68,68,0.06) !important; }
        .ob-input-error:focus { border-color: rgba(239,68,68,0.85) !important; }
        .ob-option.ob-option-error { border-color: rgba(239,68,68,0.55); background: rgba(239,68,68,0.06); }
        .ob-cselect-btn.ob-input-error { border-color: rgba(239,68,68,0.55) !important; background: rgba(239,68,68,0.06) !important; }
        .ob-error svg { flex-shrink: 0; margin-top: 0.1rem; }
        .ob-error strong { color: #fecaca; font-weight: 600; }
        @media (max-width: 600px) { .ob-card { padding: 1.75rem 1.25rem; } .ob-actions { flex-direction: column-reverse; } .ob-field-grid { grid-template-columns: 1fr; } .ob-line { width: 14px; } }
      `}</style>

      <button onClick={onClose} className="ob-close" aria-label="Cerrar">×</button>

      <header style={{ position: 'relative', zIndex: 2, padding: '1.5rem 5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={logoImage} alt="Previnca Nexo" style={{ height: 64, width: 'auto' }} />
      </header>

      <main style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '1rem 1.5rem 3rem' }}>
        <div className="ob-card">
          {step !== 'success' && (
            <div className="ob-progress">
              {[1, 2, 3, 4, 5, 6].map((n, i) => (
                <span key={n} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className={`ob-dot ${typeof step === 'number' && step === n ? 'active' : ''} ${typeof step === 'number' && step > n ? 'done' : ''}`}>{n}</span>
                  {i < 5 && <span className={`ob-line ${typeof step === 'number' && step > n ? 'done' : ''}`}></span>}
                </span>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {step === 1 && (
              <>
                <h2 className="ob-title">¿Para quién es el plan?</h2>
                <p className="ob-desc">Contanos a quién vamos a afiliar.</p>
                <div className="ob-options">
                  {[
                    { value: 'para_mi', title: 'Para mí', sub: 'Voy a ser el titular', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
                    { value: 'otra_persona', title: 'Para otra persona', sub: 'Estoy gestionando por un familiar/conocido', icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' },
                  ].map((opt) => (
                    <label key={opt.value} className={`ob-option ${form.para_quien === opt.value ? 'checked' : ''} ${isInvalid('para_quien') ? 'ob-option-error' : ''}`}>
                      <input type="radio" name="para_quien" value={opt.value} checked={form.para_quien === opt.value} onChange={() => setField('para_quien', opt.value)} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
                      <span className="ob-option-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d={opt.icon} /></svg></span>
                      <span className="ob-option-text">
                        <span className="ob-option-title">{opt.title}</span>
                        <span className="ob-option-sub">{opt.sub}</span>
                      </span>
                      <span className="ob-option-check">{form.para_quien === opt.value && <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>}</span>
                    </label>
                  ))}
                </div>
                {error && <ErrorMsg msg={error} />}
                <div className="ob-actions">
                  <button type="button" className="ob-btn ob-btn-primary" onClick={next}>Siguiente →</button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="ob-title">{getTitle(2).title}</h2>
                <p className="ob-desc">{getTitle(2).desc}</p>
                <div className="ob-field-grid">
                  <div className="ob-field"><label className="ob-label">Nombre</label><input className={`ob-input${errCls('nombre')}`} type="text" value={form.nombre} onChange={(e) => setField('nombre', e.target.value)} placeholder="Juan" /></div>
                  <div className="ob-field"><label className="ob-label">Apellido</label><input className={`ob-input${errCls('apellido')}`} type="text" value={form.apellido} onChange={(e) => setField('apellido', e.target.value)} placeholder="García" /></div>
                </div>
                <div className="ob-field"><label className="ob-label">Email</label><input className={`ob-input${errCls('email')}`} type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} placeholder="tu@email.com" autoComplete="email" inputMode="email" /></div>
                <div className="ob-field"><label className="ob-label">WhatsApp</label><input className={`ob-input${errCls('whatsapp')}`} type="tel" value={form.whatsapp} onChange={(e) => setField('whatsapp', e.target.value)} placeholder="+54 9 341 1234 5678" /></div>
                {error && <ErrorMsg msg={error} />}
                <div className="ob-actions">
                  <button type="button" className="ob-btn" onClick={prev} disabled={submitting}>← Atrás</button>
                  <button type="button" className="ob-btn ob-btn-primary" onClick={next} disabled={submitting}>
                    {submitting ? 'Procesando…' : 'Siguiente →'}
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="ob-title">{getTitle(3).title}</h2>
                <p className="ob-desc">{getTitle(3).desc}</p>
                <div className="ob-field"><label className="ob-label">DNI</label><input className={`ob-input${errCls('dni')}`} type="text" inputMode="numeric" maxLength={8} value={form.dni} onChange={(e) => setField('dni', e.target.value)} placeholder="12345678" /></div>
                <div className="ob-field">
                  <label className="ob-label">Fecha de nacimiento</label>
                  <BirthDatePicker
                    value={form.fecha_nacimiento}
                    onChange={(iso) => setField('fecha_nacimiento', iso)}
                    hasError={isInvalid('fecha_nacimiento')}
                  />
                </div>
                {error && <ErrorMsg msg={error} />}
                <div className="ob-actions">
                  <button type="button" className="ob-btn" onClick={prev}>← Atrás</button>
                  <button type="button" className="ob-btn ob-btn-primary" onClick={next}>Siguiente →</button>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="ob-title">{getTitle(4).title}</h2>
                <p className="ob-desc">{getTitle(4).desc}</p>
                <div className="ob-field">
                  <label className="ob-label">Localidad</label>
                  <div className="ob-cselect" onClick={(e) => e.stopPropagation()}>
                    <button type="button" className={`ob-cselect-btn ${!form.ciudad ? 'placeholder' : ''}${errCls('ciudad')}`} onClick={() => setCiudadOpen((o) => !o)}>
                      <span>{form.ciudad || 'Seleccioná tu localidad'}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.65)" style={{ transform: ciudadOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}><path d="M7 10l5 5 5-5z" /></svg>
                    </button>
                    {ciudadOpen && (
                      <div className="ob-cselect-list">
                        {['Rosario', 'Granadero Baigorria', 'Villa Gobernador Gálvez'].map((c) => (
                          <button key={c} type="button" className={`ob-cselect-option ${form.ciudad === c ? 'selected' : ''}`} onClick={() => { setField('ciudad', c); setCiudadOpen(false); }}>{c}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="ob-field"><label className="ob-label">Calle</label><input className={`ob-input${errCls('calle')}`} type="text" value={form.calle} onChange={(e) => setField('calle', e.target.value)} placeholder="Nombre de la calle" /></div>
                <div className="ob-field-grid">
                  <div className="ob-field"><label className="ob-label">Número</label><input className={`ob-input${errCls('numero')}`} type="text" inputMode="numeric" value={form.numero} onChange={(e) => setField('numero', e.target.value)} placeholder="1234" /></div>
                  <div className="ob-field"><label className="ob-label">Departamento</label><input className="ob-input" type="text" value={form.depto} onChange={(e) => setField('depto', e.target.value)} placeholder="Ej: 3B (opcional)" /></div>
                </div>
                {error && <ErrorMsg msg={error} />}
                <div className="ob-actions">
                  <button type="button" className="ob-btn" onClick={prev}>← Atrás</button>
                  <button type="button" className="ob-btn ob-btn-primary" onClick={next}>Siguiente →</button>
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <h2 className="ob-title">¿Cómo querés pagar?</h2>
                <p className="ob-desc">Elegí el método y confirmá el email asociado a tu cuenta de Mercado Pago.</p>
                <div className={`ob-paymethod${errCls('medio_pago')}`}>
                  <button
                    type="button"
                    className={`ob-paymethod-card${form.medio_pago === 'tarjeta' ? ' selected' : ''}`}
                    onClick={() => setField('medio_pago', 'tarjeta')}
                  >
                    <div className="ob-paymethod-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                    </div>
                    <div className="ob-paymethod-body">
                      <p className="ob-paymethod-title">Tarjeta</p>
                      <p className="ob-paymethod-sub">Crédito o débito</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`ob-paymethod-card${form.medio_pago === 'mp_balance' ? ' selected' : ''}`}
                    onClick={() => setField('medio_pago', 'mp_balance')}
                  >
                    <div className="ob-paymethod-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M5 8h11a3 3 0 010 6H8a3 3 0 000 6h11"/></svg>
                    </div>
                    <div className="ob-paymethod-body">
                      <p className="ob-paymethod-title">Dinero en cuenta</p>
                      <p className="ob-paymethod-sub">Saldo Mercado Pago</p>
                    </div>
                  </button>
                </div>
                <div className="ob-field">
                  <label className="ob-label">Email de tu cuenta de Mercado Pago</label>
                  <input
                    className={`ob-input${errCls('mp_email')}`}
                    type="email"
                    value={form.mp_email}
                    onChange={(e) => setField('mp_email', e.target.value)}
                    placeholder="tu@email.com"
                    autoComplete="email"
                    inputMode="email"
                  />
                  <p className="ob-field-hint">Puede ser distinto al email de tu cuenta Nexo. Se usa para procesar el cobro.</p>
                </div>
                {error && <ErrorMsg msg={error} />}
                <div className="ob-actions">
                  <button type="button" className="ob-btn" onClick={prev} disabled={submitting}>← Atrás</button>
                  <button type="button" className="ob-btn ob-btn-primary" onClick={next} disabled={submitting}>
                    {submitting ? 'Procesando…' : 'Siguiente →'}
                  </button>
                </div>
              </>
            )}

            {step === 6 && (
              <>
                <h2 className="ob-title">Confirmá tu compra</h2>
                <p className="ob-desc">Revisá los datos antes de pagar.</p>
                {typeof window !== 'undefined' && window.location.host.includes('staging') && (
                  <div style={{
                    background: 'rgba(255,193,7,0.12)',
                    border: '1px solid rgba(255,193,7,0.55)',
                    color: '#ffd54f',
                    padding: '10px 14px',
                    borderRadius: 8,
                    fontSize: '0.85rem',
                    lineHeight: 1.35,
                    marginBottom: '1rem',
                  }}>
                    Ambiente de prueba con pago real. Vamos a cobrar $15 para validar el proceso completo.
                  </div>
                )}
                <div className="ob-summary-block">
                  <p className="ob-summary-label">Afiliado</p>
                  <p className="ob-summary-value">{form.nombre || '—'} {form.apellido}</p>
                  <p className="ob-summary-sub">DNI: {form.dni || '—'}</p>
                </div>
                <div className="ob-summary-plan">
                  <div className="ob-summary-plan-bar"></div>
                  <div className="ob-summary-plan-body">
                    <div>
                      <p className="ob-summary-plan-label">Plan</p>
                      <p className="ob-summary-plan-name">{plan.nombre}</p>
                    </div>
                    <div>
                      <p className="ob-summary-plan-period">por mes</p>
                      <p className="ob-summary-plan-price">${formatearMiles(plan.precio)}</p>
                    </div>
                  </div>
                </div>
                <div className="ob-summary-block">
                  <p className="ob-summary-label">Vigencia</p>
                  <p className="ob-summary-value">Desde el {fechaHoy}</p>
                  <p className="ob-summary-sub">Suscripción mensual</p>
                  <p className="ob-summary-sub">Fecha de cobro cada 30 días</p>
                </div>
                <div className="ob-actions">
                  <button type="button" className="ob-btn" onClick={prev} disabled={submitting}>← Atrás</button>
                  <button type="submit" className="ob-btn ob-btn-primary" disabled={submitting}>
                    {submitting ? 'Redirigiendo a Mercado Pago…' : 'Pagar'}
                  </button>
                </div>
              </>
            )}

            {step === 'success' && (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div className="ob-success-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="#fff"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg></div>
                <h2 className="ob-title">¡Listo!</h2>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Recibimos tus datos. Un asesor de Previnca Nexo te va a contactar a la brevedad.</p>
                <button type="button" className="ob-btn ob-btn-primary" style={{ maxWidth: 280, margin: '0 auto' }} onClick={onClose}>Volver al sitio</button>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
