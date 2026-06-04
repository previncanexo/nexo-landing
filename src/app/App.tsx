import { useState, useEffect, useCallback, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { PlanBase } from './components/PlanBase';
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

const PORTAL_REGISTRO = 'https://nexo.portal.previncasalud.com.ar/registro';

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

  const showMobileCtaRef = useRef(false);
  const showBackToTopRef = useRef(false);

  const goToRegistro = useCallback(() => {
    window.open(PORTAL_REGISTRO, '_blank', 'noopener,noreferrer');
  }, []);

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

  return (
    <div className="overflow-x-clip">
      <Navigation onOpenCheckout={goToRegistro} />
      <Hero />
      <PlanBase />
      <ALaCarta onOpenCheckout={goToRegistro} />
      <ComoFunciona onOpenCheckout={goToRegistro} />
      <BannerCarousel />
      <Testimonios testimonials={testimonials} />
      <FAQ items={faqItems} />
      <Footer />

      <BackToTop isVisible={showBackToTop} isMobileCTAVisible={showMobileCta} />
      <WhatsAppButton isVisible={true} isMobileCTAVisible={showMobileCta} />
      <IPhoneCTA isVisible={showMobileCta} onOpenCheckout={goToRegistro} />
    </div>
  );
}
