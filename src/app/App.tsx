import { useState, useEffect, useCallback, useRef } from 'react';
import { BackgroundMesh } from './components/BackgroundMesh';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { PlanBase } from './components/PlanBase';
import { ALaCarta } from './components/ALaCarta';
import { ComoFunciona } from './components/ComoFunciona';
import { Testimonios } from './components/Testimonios';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { WhatsAppButton } from './components/WhatsAppButton';
import { IPhoneCTA } from './components/IPhoneCTA';

const PORTAL_REGISTRO = 'https://nexo-portal-ten.vercel.app/registro';

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
    question: '¿Cómo funciona Nexo?',
    answer: 'Nexo es tu membresía de salud digital. Elegís un plan base que incluye medicina clínica y medicina general, y luego sumás especialidades a la carta según tus necesidades. Todo con una cuota mensual fija y transparente.',
  },
  {
    question: '¿Qué incluye el Plan Base?',
    answer: 'El Plan Base ($19.500/mes) incluye teleconsultas médicas 24/7 (DOC24), urgencias 24/7, descuentos del 50% en farmacias y guardias odontológicas.',
  },
  {
    question: '¿Puedo agregar especialidades después?',
    answer: 'Sí, totalmente. Podés sumar especialidades a la carta en cualquier momento. Solo pagás por las que uses y tenés la flexibilidad de activarlas o pausarlas cuando quieras.',
  },
  {
    question: '¿Los médicos están matriculados?',
    answer: 'Absolutamente. Todos nuestros profesionales están matriculados y cuentan con años de experiencia en sus especialidades. Verificamos credenciales y trayectoria antes de incorporarlos a la red de Nexo.',
  },
  {
    question: '¿Cómo cancelo mi membresía?',
    answer: 'Podés cancelar tu membresía en cualquier momento, sin penalidades ni costos adicionales. Tu acceso continuará hasta el final del período ya pagado.',
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
    const onScroll = () => {
      const y = window.scrollY;
      const planBaseEl = document.getElementById('beneficios');
      const planBaseTop = planBaseEl ? planBaseEl.offsetTop - 200 : Infinity;
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
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <BackgroundMesh />
      <Navigation onOpenCheckout={goToRegistro} />
      <Hero />
      <PlanBase />
      <ALaCarta onOpenCheckout={goToRegistro} />
      <ComoFunciona onOpenCheckout={goToRegistro} />
      <Testimonios testimonials={testimonials} />
      <FAQ items={faqItems} />
      <Footer />

      <BackToTop isVisible={showBackToTop} isMobileCTAVisible={showMobileCta} />
      <WhatsAppButton isVisible={true} isMobileCTAVisible={showMobileCta} />
      <IPhoneCTA isVisible={showMobileCta} onOpenCheckout={goToRegistro} />
    </div>
  );
}
