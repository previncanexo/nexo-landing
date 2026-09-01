import { useState, useEffect, useCallback, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Planes, ServiciosOnDemand } from './components/Planes';
import { BackToTop } from './components/BackToTop';
import { WhatsAppButton } from './components/WhatsAppButton';
import { IPhoneCTA } from './components/IPhoneCTA';
// Eager imports (no lazy): para el prerender/SSG el contenido tiene que renderizarse
// en el HTML. React.lazy + Suspense renderizan null en SSR → no saldrían las secciones.
import { ALaCarta } from './components/ALaCarta';
import { ComoFunciona } from './components/ComoFunciona';
import { BannerCarousel } from './components/BannerCarousel';
import { Testimonios } from './components/Testimonios';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Onboarding } from './components/Onboarding';
import { captureAttribution } from './lib/attribution';
import { PLANES, LS_PLAN_KEY } from './data/planes';

const testimonials = [
  {
    name: 'Denise Coletti',
    role: 'Socia desde hace años',
    content: 'Tengo el servicio desde que tengo uso de razón, con algunos cambios de por medio pero siempre con servicios asociado a mi familia. En la mayoría de los casos todo excelente: desde la atención vía mail, vía telefónica y presencialmente en consultorios y la calidad médica. Agradezco a Josefina Romero Acuña, Ejecutiva de Atención al Cliente, por su amabilidad, atención y rapidez a la hora de resolver y facilitarme un inconveniente con mis facturas.',
  },
  {
    name: 'Felisa Albarran',
    role: 'Socia desde hace más de 40 años',
    content: 'Soy social desde hace más de 40 años, me cuesta la tecnología pero la atención de los empleados es impecable y con su guía me comunico y soluciono mis inquietudes. Gracias a la Srta J Romero y a sus compañeros.',
  },
  {
    name: 'Clau Dowling',
    role: 'Socia nueva',
    content: 'Somos nuevos, pero destaco que ante unos errores me solucionaron todo rápido y excelente atención telefónica.',
  },
];

const faqItems = [
  {
    question: '¿Cómo me suscribo?',
    answer: 'Hacé clic en "Quiero mi cobertura", revisá los servicios incluidos y el valor del plan, completá el formulario con tus datos y realizá el pago a través de Mercado Pago.\nTodo el proceso se hace desde el celular, sin papeles y en menos de 5 minutos.',
  },
  {
    question: '¿Cuándo puedo empezar a usar los servicios?',
    answer: 'Una vez confirmado el pago, recibirás tu credencial digital por correo electrónico.\nLos servicios de Teleconsultas médicas y Emergencias médicas estarán habilitados dentro de las 24 hs hábiles de recibida la credencial digital.\nEl resto de los servicios cuentan con una carencia de 30 días. Finalizado ese período, podrás acceder a guardia odontológica y descuentos en farmacias.',
  },
  {
    question: '¿Cómo uso cada servicio?',
    answer: 'Teleconsultas médicas: Desde Previnca Nexo solicitás la consulta y un profesional te atiende en minutos, las 24 horas.\nEmergencias médicas: Llamás a la línea de atención, indicás que sos cliente Previnca Nexo y brindás tu DNI para recibir asistencia inmediata.\nDescuento en farmacias: Presentando tu receta con el número de farmacia que figura en tu credencial digital, podes acceder al 50% off en más de 6000 medicamentos seleccionados.\nGuardia odontológica: Debés enviar un mensaje al WhatsApp del prestador para informar que vas a concurrir a la atención. Luego, poder coordinar para acercarte a las instalaciones en la ciudad de Rosario. Horarios de atención: lunes a viernes de 8 a 20 hs.',
  },
  {
    question: '¿Puedo compartir mi cuenta con otra persona?',
    answer: 'No. Cada cuenta es personal e intransferible, y está asociada exclusivamente a la persona titular del servicio.',
  },
  {
    question: '¿Cuándo se cobra y qué pasa si no tengo saldo?',
    answer: 'El cobro se realiza entre el 1 y el 10 de cada mes.\nSi al momento del vencimiento no se acredita el pago, tu cobertura entra en mora. Esto se visualizará en tu perfil mediante una señal amarilla y además recibirás una notificación por WhatsApp.\nUna vez regularizado el pago, la cobertura se reactiva automáticamente.',
  },
  {
    question: '¿Qué hago si perdí acceso a mi cuenta?',
    answer: 'Podés recuperar el acceso desde la opción "Olvidé mi contraseña". Si el inconveniente continúa, comunicate con el equipo de soporte por WhatsApp al 341 5056130.',
  },
  {
    question: '¿Cómo contacto si necesito hacer una consulta sobre el servicio?',
    answer: 'Podés comunicarte con nuestra línea WSP 341 5056130 y recibir asesoramiento personalizado para resolver cualquier duda o consulta sobre el servicio.',
  },
  {
    question: '¿Cuántas teleconsultas puedo realizar por mes?',
    answer: 'Tu plan incluye 1 teleconsulta médica sin cargo por mes. Si necesitás realizar más consultas dentro del mismo mes, las teleconsultas adicionales podrán utilizarse abonando el valor correspondiente al momento de solicitar el servicio.',
  },
  {
    question: '¿Qué diferencia hay entre una emergencia y una teleconsulta?',
    answer: 'La teleconsulta está orientada a consultas médicas generales o situaciones de baja complejidad.\nLas urgencias están destinadas a situaciones que requieren atención inmediata.',
  },
  {
    question: '¿Qué medicamentos tienen descuento?',
    answer: 'Podés consultar el listado completo de medicamentos con cobertura y descuentos en nuestra página web.\nnexo.portal.previncasalud.com.ar/vademecum',
  },
  {
    question: '¿Mis datos médicos y personales son privados?',
    answer: 'Sí. Toda la información médica y personal se gestiona bajo estándares de privacidad y seguridad para proteger la confidencialidad de cada usuario.',
  },
  {
    question: '¿Puedo cancelar cuando quiera?',
    answer: 'Sí. No existe permanencia mínima ni penalidades.\nPodés solicitar la baja en cualquier momento y tu cobertura continuará activa hasta finalizar el período ya abonado.',
  },
];

export default function App() {
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Routing client-side: si la URL es /onboarding, montamos el componente Onboarding
  // en lugar de la landing. Soporta deep-link, back/forward del browser, y navegación
  // programática desde las CTAs.
  const [pathname, setPathname] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    // Asegurar sync inicial post-hydration (SSG renderiza con / por defecto)
    setPathname(window.location.pathname);
    // First-touch attribution: capturamos UTM/click IDs + referrer + landing_url
    // ANTES de que las CTAs limpien la query navegando a /onboarding.
    captureAttribution();
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const showMobileCtaRef = useRef(false);
  const showBackToTopRef = useRef(false);

  // Plan elegido en la card. Viaja hasta el PATCH del onboarding para que MP cobre
  // el precio correcto. Si alguien entra por /onboarding directo (deep link, sin
  // pasar por una card), queda 'nexo-1': el backend, sin plan, cae al MÁS BARATO,
  // y cobrarle $7.000 a quien quiso el de $20.000 es peor que asumir el principal.
  const [planSlug, setPlanSlug] = useState<string>('nexo-1');

  // Navegación pura hacia /onboarding, sin efectos sobre localStorage. Separada
  // de goToRegistro/elegirPlan a propósito: si esas dos funciones compartieran
  // este paso de limpieza, elegirPlan (que escribe el plan en localStorage y
  // navega en el mismo tick) se borraría a sí misma. Ver el porqué completo en
  // el comentario de goToRegistro, dos funciones más abajo.
  const irAOnboarding = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.history.pushState({}, '', '/onboarding/afiliado');
    setPathname('/onboarding/afiliado');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  // goToRegistro queda SIN parámetros a propósito. Navigation.tsx:99,
  // IPhoneCTA.tsx:37 y ComoFunciona.tsx:203 la pasan como `onClick={onOpenCheckout}`
  // sin envolver, así que React le inyecta el MouseEvent como primer argumento.
  // Si aceptara un slug opcional, esas tres CTAs guardarían un evento del DOM como
  // plan, ningún plan matchearía, y el cobro caería al más barato: justo el bug que
  // esta entrega viene a cerrar.
  //
  // Además de navegar, limpia el plan persistido. Es la CTA GENÉRICA (Navigation,
  // Hero, ALaCarta, ComoFunciona, IPhoneCTA): "entré por acá, no por una card" es
  // justo la condición que activa el fallback a 'nexo-1' documentado arriba. Si
  // no se limpia, alguien que eligió Nexo III, abandonó sin crear lead (ningún
  // removeItem de Onboarding.tsx se dispara sin LS_LEAD) y vuelve dentro de las
  // 24h del TTL por una CTA genérica, heredaría el plan viejo en vez de caer al
  // principal — el mismo bug de cobro incorrecto que esta entrega cierra, por
  // la otra punta.
  //
  // NO fusionar esto con `irAOnboarding` ni compartirlo con `elegirPlan`:
  // `elegirPlan` escribe el plan en localStorage y navega en el mismo tick, así
  // que si pasara por este removeItem se borraría el plan que acaba de guardar.
  const goToRegistro = useCallback(() => {
    // Limpiar localStorage no alcanza: el estado planSlug de React sobrevive a una
    // navegacion SPA (cerrar el wizard con la x y volver por una CTA generica, sin
    // reload), y ese valor stale gana antes de llegar al fallback. Se resetea aca
    // para que quien entra SIN elegir plan arranque siempre en el principal.
    setPlanSlug('nexo-1');
    if (typeof window !== 'undefined') {
      try { localStorage.removeItem(LS_PLAN_KEY); } catch { /* ignore */ }
    }
    irAOnboarding();
  }, [irAOnboarding]);

  /**
   * Entrada desde una card de plan: fija el plan y arranca el alta.
   *
   * También lo persiste en localStorage (`LS_PLAN_KEY`, importada de
   * `data/planes.ts` para que un typo futuro no rompa el mecanismo en silencio
   * en un repo sin `tsc`). Onboarding YA está diseñado para sobrevivir un reload
   * a mitad del wizard (retoma LS_LEAD/LS_FORM); si `planSlug` viviera solo acá,
   * ese mismo reload remontaría App con el default y cobraría el plan
   * equivocado. Se escribe en cada clic para que nunca quede desactualizado
   * respecto de la última decisión del usuario.
   *
   * Se guarda con timestamp (no el slug plano) porque `Onboarding.tsx` lo hace
   * caducar: si alguien elige un plan y abandona antes de crear un lead, ningún
   * cleanup existente lo borra, y sin TTL ese slug viejo secuestraría la sesión
   * de otra persona que entre por deep link semanas después.
   *
   * Navega con `irAOnboarding`, NO con `goToRegistro`: esta última limpia el
   * plan persistido (es la CTA genérica), y si elegirPlan pasara por ahí se
   * borraría el plan que acaba de escribir dos líneas arriba, en el mismo tick.
   */
  const elegirPlan = useCallback((slug: string) => {
    setPlanSlug(slug);
    if (typeof window !== 'undefined') {
      try { localStorage.setItem(LS_PLAN_KEY, JSON.stringify({ slug, ts: Date.now() })); } catch { /* ignore */ }
    }
    irAOnboarding();
  }, [irAOnboarding]);

  const goToLanding = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.history.pushState({}, '', '/');
    setPathname('/');
  }, []);

  const isOnboarding = pathname.startsWith('/onboarding');

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute('href');
      if (!id) return;
      if (id === '#') {
        e.preventDefault();
        return;
      }
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  useEffect(() => {
    // Cacheamos el offset de #beneficios: leer offsetTop en CADA evento de scroll
    // fuerza un reflow del layout y traba el scroll en iOS Safari. Lo medimos una
    // vez (y en resize/load), y el handler de scroll solo lee window.scrollY.
    let planBaseTop = Infinity;
    const measure = () => {
      const el = document.getElementById('beneficios');
      planBaseTop = el ? el.offsetTop - 200 : Infinity;
    };
    measure();

    const onScroll = () => {
      const y = window.scrollY;
      const nextMobile = y > 600 && y < planBaseTop;
      const nextBack = y > 800;

      if (nextMobile !== showMobileCtaRef.current) {
        showMobileCtaRef.current = nextMobile;
        setShowMobileCta(nextMobile);
      }
      if (nextBack !== showBackToTopRef.current) {
        showBackToTopRef.current = nextBack;
        setShowBackToTop(nextBack);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
    };
  }, []);

  if (isOnboarding) {
    return <Onboarding onClose={goToLanding} planSlug={planSlug} />;
  }

  return (
    <div className="overflow-x-clip">
      <Navigation onOpenCheckout={goToRegistro} />
      <Hero onOpenCheckout={goToRegistro} />
      <Planes onElegirPlan={elegirPlan} />
      <ServiciosOnDemand />
      <ALaCarta onOpenCheckout={goToRegistro} />
      <ComoFunciona onOpenCheckout={goToRegistro} />
      <BannerCarousel />
      <Testimonios testimonials={testimonials} />
      <FAQ items={faqItems} />
      {/* Los tres planes reemplazan el viejo link único "Previnca Nexo → #beneficios"
          (ya apuntan a esa sección), pero "+Bienestar" y "Cómo funciona" son
          navegación real de esta landing y no tienen por qué desaparecer. */}
      <Footer
        servicios={[
          ...PLANES.map((p) => ({ href: `#plan-${p.slug}`, label: p.nombre })),
          { href: '#carta', label: '+Bienestar' },
          { href: '#como', label: 'Cómo funciona' },
        ]}
      />

      <BackToTop isVisible={showBackToTop} isMobileCTAVisible={showMobileCta} />
      <WhatsAppButton isVisible={true} isMobileCTAVisible={showMobileCta} />
      <IPhoneCTA isVisible={showMobileCta} onOpenCheckout={goToRegistro} />
    </div>
  );
}
