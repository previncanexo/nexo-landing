import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const WHATSAPP_NUMBER = '5493415056130'; // Placeholder — reemplazar con número real

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  whatsapp: string;
  ciudad: string;
  fechaNacimiento: string;
}

const ALA_CARTA_SERVICES = [
  { id: 'telemedicina', title: 'Telemedicina & Psicología', price: 4500 },
  { id: 'odontologia', title: 'Odontología Estética', price: 3200 },
  { id: 'mascotas', title: 'Mundo Mascotas', price: 2900 },
  { id: 'seguros', title: 'Seguros Personales', price: 5800 },
];

const BASE_PRICE = 19500;

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    whatsapp: '',
    ciudad: '',
    fechaNacimiento: '',
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentStep(1);
      setSelectedServices([]);
      setFormData({ nombre: '', apellido: '', dni: '', email: '', whatsapp: '', ciudad: '', fechaNacimiento: '' });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [onClose, isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const goToStep = useCallback((step: number) => {
    setCurrentStep(prev => {
      setDirection(step > prev ? 1 : -1);
      return step;
    });
  }, []);

  const handleField = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const totalPrice = BASE_PRICE + ALA_CARTA_SERVICES
    .filter(s => selectedServices.includes(s.id))
    .reduce((acc, s) => acc + s.price, 0);

  const selectedServicesList = ALA_CARTA_SERVICES.filter(s => selectedServices.includes(s.id));

  const sendToWhatsApp = useCallback(() => {
    const lines = [
      '¡Hola! Quiero afiliarme a *Nexo by Previnca*.',
      '',
      `*Nombre:* ${formData.nombre} ${formData.apellido}`,
      `*DNI:* ${formData.dni}`,
      `*Email:* ${formData.email}`,
      `*WhatsApp:* ${formData.whatsapp}`,
      `*Ciudad:* ${formData.ciudad}`,
      `*Fecha de nacimiento:* ${formData.fechaNacimiento}`,
      '',
      '*Plan elegido:* Nexo by Previnca — $19.500/mes',
    ];
    if (selectedServicesList.length > 0) {
      lines.push('');
      lines.push('*Servicios A la Carta adicionales:*');
      selectedServicesList.forEach(s => {
        lines.push(`  • ${s.title} — $${s.price.toLocaleString('es-AR')}/mes`);
      });
      lines.push('');
      lines.push(`*Total mensual:* $${totalPrice.toLocaleString('es-AR')}/mes`);
    }
    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    goToStep(4);
  }, [formData, goToStep, selectedServicesList, totalPrice]);

  const stepLabels = ['Datos', 'Resumen', 'Confirmar', 'Listo'];

  // Slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-end sm:items-center justify-center sm:p-5 transition-all duration-400 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{ background: 'rgba(13, 5, 32, 0.8)', backdropFilter: 'blur(16px)' }}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white rounded-t-[28px] sm:rounded-[28px] w-full max-w-[520px] max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto relative transition-all duration-400 shadow-2xl pb-safe ${
          isOpen ? 'translate-y-0 scale-100' : 'translate-y-4 scale-[0.97]'
        }`}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--gray-300) transparent',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)'
        }}
      >
        {/* Subtle Gradient Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--purple)] via-[var(--pink)] to-[var(--peach)] rounded-t-[28px]" />

        {/* AnimatePresence for step transitions */}
        <div className="overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">

            {/* ─── STEP 1: DATOS ─── */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="p-5 sm:p-7 md:p-8"
              >
                <StepHeader onClose={onClose} title="Tus datos" />
                <ProgressBar step={1} labels={stepLabels} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <div className="mb-2 sm:mb-4">
                    <label className="text-[11px] sm:text-xs font-bold text-[var(--gray-600)] mb-1.5 sm:mb-2 block tracking-wide uppercase">Nombre</label>
                    <input
                      type="text"
                      placeholder="Juan"
                      value={formData.nombre}
                      onChange={handleField('nombre')}
                      className="w-full bg-[var(--gray-100)] border-2 border-transparent rounded-xl px-4 py-3 text-[15px] text-[var(--gray-900)] font-['DM_Sans'] transition-all outline-none focus:border-[var(--purple)] focus:bg-white placeholder:text-[var(--gray-400)]"
                    />
                  </div>
                  <div className="mb-2 sm:mb-4">
                    <label className="text-[11px] sm:text-xs font-bold text-[var(--gray-600)] mb-1.5 sm:mb-2 block tracking-wide uppercase">Apellido</label>
                    <input
                      type="text"
                      placeholder="García"
                      value={formData.apellido}
                      onChange={handleField('apellido')}
                      className="w-full bg-[var(--gray-100)] border-2 border-transparent rounded-xl px-4 py-3 text-[15px] text-[var(--gray-900)] font-['DM_Sans'] transition-all outline-none focus:border-[var(--purple)] focus:bg-white placeholder:text-[var(--gray-400)]"
                    />
                  </div>
                </div>
                <div className="mb-2 sm:mb-4">
                  <label className="text-[11px] sm:text-xs font-bold text-[var(--gray-600)] mb-1.5 sm:mb-2 block tracking-wide uppercase">DNI</label>
                  <input
                    type="text"
                    placeholder="30.123.456"
                    value={formData.dni}
                    onChange={handleField('dni')}
                    className="w-full bg-[var(--gray-100)] border-2 border-transparent rounded-xl px-4 py-3 text-[15px] text-[var(--gray-900)] font-['DM_Sans'] transition-all outline-none focus:border-[var(--purple)] focus:bg-white placeholder:text-[var(--gray-400)]"
                  />
                </div>
                <div className="mb-2 sm:mb-4">
                  <label className="text-[11px] sm:text-xs font-bold text-[var(--gray-600)] mb-1.5 sm:mb-2 block tracking-wide uppercase">Email</label>
                  <input
                    type="email"
                    placeholder="juan@email.com"
                    value={formData.email}
                    onChange={handleField('email')}
                    className="w-full bg-[var(--gray-100)] border-2 border-transparent rounded-xl px-4 py-3 text-[15px] text-[var(--gray-900)] font-['DM_Sans'] transition-all outline-none focus:border-[var(--purple)] focus:bg-white placeholder:text-[var(--gray-400)]"
                  />
                </div>
                <div className="mb-2 sm:mb-4">
                  <label className="text-[11px] sm:text-xs font-bold text-[var(--gray-600)] mb-1.5 sm:mb-2 block tracking-wide uppercase">WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+54 9 341 000 0000"
                    value={formData.whatsapp}
                    onChange={handleField('whatsapp')}
                    className="w-full bg-[var(--gray-100)] border-2 border-transparent rounded-xl px-4 py-3 text-[15px] text-[var(--gray-900)] font-['DM_Sans'] transition-all outline-none focus:border-[var(--purple)] focus:bg-white placeholder:text-[var(--gray-400)]"
                  />
                </div>
                <div className="mb-2 sm:mb-4">
                  <label className="text-[11px] sm:text-xs font-bold text-[var(--gray-600)] mb-1.5 sm:mb-2 block tracking-wide uppercase">Ciudad</label>
                  <input
                    type="text"
                    placeholder="Rosario"
                    value={formData.ciudad}
                    onChange={handleField('ciudad')}
                    className="w-full bg-[var(--gray-100)] border-2 border-transparent rounded-xl px-4 py-3 text-[15px] text-[var(--gray-900)] font-['DM_Sans'] transition-all outline-none focus:border-[var(--purple)] focus:bg-white placeholder:text-[var(--gray-400)]"
                  />
                </div>
                <div className="mb-4 sm:mb-6">
                  <label className="text-[11px] sm:text-xs font-bold text-[var(--gray-600)] mb-1.5 sm:mb-2 block tracking-wide uppercase">Fecha de nacimiento</label>
                  <input
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={handleField('fechaNacimiento')}
                    className="w-full bg-[var(--gray-100)] border-2 border-transparent rounded-xl px-4 py-3 text-[15px] text-[var(--gray-900)] font-['DM_Sans'] transition-all outline-none focus:border-[var(--purple)] focus:bg-white"
                  />
                </div>
                <button
                  onClick={() => goToStep(2)}
                  className="block w-full bg-gradient-to-r from-[var(--purple)] to-[var(--pink)] text-white border-none py-4 rounded-full text-[15px] font-bold cursor-pointer transition-all hover:shadow-xl hover:scale-[1.01] font-['DM_Sans'] mb-3 flex items-center justify-center gap-2"
                >
                  Ver resumen
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
                <button
                  onClick={onClose}
                  className="block w-full bg-transparent text-[var(--gray-600)] border-2 border-[var(--gray-200)] py-3.5 rounded-full text-sm cursor-pointer transition-all hover:bg-[var(--gray-100)] font-['DM_Sans'] font-medium"
                >
                  Cancelar
                </button>
              </motion.div>
            )}

            {/* ─── STEP 2: RESUMEN ─── */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="p-5 sm:p-7 md:p-8"
              >
                <StepHeader onClose={onClose} onBack={() => goToStep(1)} title="Tu pedido" />
                <ProgressBar step={2} labels={stepLabels} />

                {/* Plan Base */}
                <div className="bg-gradient-to-br from-[var(--purple-light)] to-[var(--pink-light)] border-2 border-[var(--purple)]/40 rounded-2xl p-5 mb-4">
                  <div className="flex justify-between items-center text-sm text-[var(--gray-800)] py-1.5">
                    <span className="font-medium">Nexo by Previnca</span>
                    <span className="text-[var(--gray-900)] font-bold">$19.500/mes</span>
                  </div>
                  <div className="space-y-1 my-3">
                    {['Teleconsultas médicas: DOC24', 'Urgencias 24/7', 'Descuentos 50% en farmacias', 'Guardias Odontológicas'].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-[var(--gray-600)] py-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* A la Carta opcional */}
                <div className="mb-5">
                  <p className="text-[11px] font-bold text-[var(--gray-500)] uppercase tracking-wide mb-2.5">
                    Sumar servicios A la Carta (opcional)
                  </p>
                  <div className="space-y-2">
                    {ALA_CARTA_SERVICES.map((service) => {
                      return (
                        <div
                          key={service.id}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 border-[var(--gray-200)] bg-[var(--gray-100)] opacity-60 cursor-not-allowed text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full border-2 border-[var(--gray-300)] bg-white flex-shrink-0" />
                            <span className="text-[13px] font-medium text-[var(--gray-500)]">
                              {service.title}
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-[var(--gray-400)] flex-shrink-0 italic">
                            Próximamente
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Total dinámico */}
                <div className="flex items-center justify-between border-t-2 border-[var(--gray-200)] pt-4 mb-5">
                  <span className="text-sm font-bold text-[var(--gray-900)]">Total mensual</span>
                  <span className="font-['DM_Serif_Display'] text-[22px] text-transparent bg-clip-text bg-gradient-to-r from-[var(--purple)] to-[var(--pink)]">
                    ${totalPrice.toLocaleString('es-AR')}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-[var(--purple)] font-semibold mb-5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Cancelás cuando quieras
                </div>

                <button
                  onClick={() => goToStep(3)}
                  className="block w-full bg-gradient-to-r from-[var(--purple)] to-[var(--pink)] text-white border-none py-4 rounded-full text-[15px] font-bold cursor-pointer transition-all hover:shadow-xl hover:scale-[1.01] font-['DM_Sans'] mb-3 flex items-center justify-center gap-2"
                >
                  Continuar
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
                <button
                  onClick={() => goToStep(1)}
                  className="block w-full bg-transparent text-[var(--gray-600)] border-2 border-[var(--gray-200)] py-3.5 rounded-full text-sm cursor-pointer transition-all hover:bg-[var(--gray-100)] font-['DM_Sans'] font-medium"
                >
                  Volver a mis datos
                </button>
              </motion.div>
            )}

            {/* ─── STEP 3: CONFIRMAR ─── */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="p-5 sm:p-7 md:p-8"
              >
                <StepHeader onClose={onClose} onBack={() => goToStep(2)} title="Confirmá tus datos" />
                <ProgressBar step={3} labels={stepLabels} />

                {/* Info banner */}
                <div className="flex items-start gap-3 bg-gradient-to-r from-[var(--purple-light)] to-[var(--pink-light)] rounded-2xl p-4 mb-5 border border-[var(--purple)]/20">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--purple)] to-[var(--pink)] flex items-center justify-center flex-shrink-0 shadow-md">
                    {/* WhatsApp icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div className="text-[13px] text-[var(--gray-700)] leading-relaxed">
                    <strong className="text-[var(--gray-900)] block mb-0.5">Tu solicitud se envía por WhatsApp</strong>
                    Un asesor de Nexo recibirá tus datos y te guiará durante todo el proceso de alta.
                  </div>
                </div>

                {/* Data summary */}
                <div className="bg-[var(--gray-100)] rounded-2xl border border-[var(--gray-200)] divide-y divide-[var(--gray-200)] mb-5 overflow-hidden">
                  {[
                    { label: 'Nombre completo', value: `${formData.nombre} ${formData.apellido}`.trim() || '—' },
                    { label: 'DNI', value: formData.dni || '—' },
                    { label: 'Email', value: formData.email || '—' },
                    { label: 'WhatsApp', value: formData.whatsapp || '—' },
                    { label: 'Ciudad', value: formData.ciudad || '—' },
                    { label: 'Fecha de nacimiento', value: formData.fechaNacimiento || '—' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between px-4 py-3 gap-3">
                      <span className="text-[11px] font-bold text-[var(--gray-500)] uppercase tracking-wide flex-shrink-0">{row.label}</span>
                      <span className="text-[13px] text-[var(--gray-900)] font-medium text-right">{row.value}</span>
                    </div>
                  ))}
                  {/* Plan */}
                  <div className="flex items-center justify-between px-4 py-3 gap-3 bg-gradient-to-r from-[var(--purple-light)]/50 to-transparent">
                    <span className="text-[11px] font-bold text-[var(--purple)] uppercase tracking-wide flex-shrink-0">Nexo by Previnca</span>
                    <span className="text-[13px] text-[var(--purple)] font-bold text-right">Nexo by Previnca · $19.500/mes</span>
                  </div>
                  {/* A la Carta seleccionados */}
                  {selectedServicesList.map(s => (
                    <div key={s.id} className="flex items-center justify-between px-4 py-3 gap-3 bg-gradient-to-r from-[var(--pink-light)]/40 to-transparent">
                      <span className="text-[11px] font-bold text-[var(--pink)] uppercase tracking-wide flex-shrink-0">A la Carta</span>
                      <span className="text-[13px] text-[var(--gray-800)] font-semibold text-right">{s.title} · +${s.price.toLocaleString('es-AR')}/mes</span>
                    </div>
                  ))}
                  {/* Total */}
                  <div className="flex items-center justify-between px-4 py-3.5 gap-3 bg-[var(--gray-100)]">
                    <span className="text-[11px] font-bold text-[var(--gray-700)] uppercase tracking-wide">Total mensual</span>
                    <span className="font-['DM_Serif_Display'] text-[17px] text-transparent bg-clip-text bg-gradient-to-r from-[var(--purple)] to-[var(--pink)]">
                      ${totalPrice.toLocaleString('es-AR')}
                    </span>
                  </div>
                </div>

                {/* Edit hint */}
                <div className="flex items-center gap-2 text-[12px] text-[var(--gray-500)] mb-5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                  ¿Hay algo incorrecto? Volvé al paso anterior para corregirlo.
                </div>

                {/* CTA */}
                <button
                  onClick={sendToWhatsApp}
                  className="block w-full bg-gradient-to-r from-[var(--purple)] to-[var(--pink)] text-white border-none py-4 rounded-full text-[15px] font-bold cursor-pointer transition-all hover:shadow-xl hover:scale-[1.01] font-['DM_Sans'] mb-3 flex items-center justify-center gap-2.5"
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Enviar mis datos por WhatsApp
                </button>
                <button
                  onClick={() => goToStep(2)}
                  className="block w-full bg-transparent text-[var(--gray-600)] border-2 border-[var(--gray-200)] py-3.5 rounded-full text-sm cursor-pointer transition-all hover:bg-[var(--gray-100)] font-['DM_Sans'] font-medium"
                >
                  Volver y editar
                </button>
              </motion.div>
            )}

            {/* ─── STEP 4: LISTO ─── */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="p-5 sm:p-7 md:p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="font-['DM_Serif_Display'] text-[22px] text-[var(--gray-900)]">¡Solicitud enviada!</div>
                  <button
                    onClick={onClose}
                    className="w-9 h-9 rounded-full bg-[var(--gray-100)] border-none text-[var(--gray-600)] text-sm cursor-pointer flex items-center justify-center transition-all hover:bg-[var(--gray-200)]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
                <ProgressBar step={4} labels={stepLabels} />
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--purple)] to-[var(--pink)] flex items-center justify-center mx-auto mb-6 shadow-xl"
                  >
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-['DM_Serif_Display'] text-2xl text-[var(--gray-900)] mb-3"
                  >
                    ¡Ya estamos en contacto!
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm text-[var(--gray-600)] leading-relaxed mb-8 max-w-[380px] mx-auto"
                  >
                    Tus datos fueron enviados. Un asesor de Nexo te va a contactar para acompañarte durante el proceso y activar tu acceso al Portal Nexo.
                  </motion.div>

                  <div className="space-y-3 mb-8">
                    {[
                      {
                        icon: (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                          </svg>
                        ),
                        text: 'Un asesor recibió tu solicitud y te contactará pronto',
                        color: 'border-[var(--purple)]/40 bg-[var(--purple-light)]',
                        delay: 0.6,
                      },
                      {
                        icon: (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72"/>
                          </svg>
                        ),
                        text: 'Te guiamos y acompañamos durante todo el proceso de alta',
                        color: 'border-[var(--pink)]/40 bg-[var(--pink-light)]',
                        delay: 0.7,
                      },
                      {
                        icon: (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--peach)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                          </svg>
                        ),
                        text: 'Accedés de inmediato al Portal Nexo con tu credencial virtual',
                        color: 'border-[var(--peach)]/40 bg-[var(--peach-light)]',
                        delay: 0.8,
                      }
                    ].map((item) => (
                      <motion.div
                        key={item.text}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: item.delay }}
                        className={`flex items-center gap-3 ${item.color} border-2 rounded-2xl px-4 py-3.5 text-[13px] text-[var(--gray-700)]`}
                      >
                        <div className="flex-shrink-0">{item.icon}</div>
                        <span>{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="block w-full bg-gradient-to-r from-[var(--purple)] to-[var(--pink)] text-white border-none py-4 rounded-full text-[15px] font-bold cursor-pointer transition-all hover:shadow-xl hover:scale-[1.01] font-['DM_Sans']"
                >
                  Cerrar
                </button>
                <div className="text-center text-[11px] text-[var(--gray-500)] mt-4">
                  ¿Tenés alguna duda? Escribinos directamente al WhatsApp Nexo
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function StepHeader({ onClose, onBack, title }: { onClose: () => void; onBack?: () => void; title: string }) {
  return (
    <div className="flex items-center justify-between mb-6">
      {onBack ? (
        <button
          onClick={onBack}
          className="text-xs px-3 rounded-full bg-[var(--gray-100)] border-none text-[var(--gray-600)] h-8 flex items-center justify-center transition-all hover:bg-[var(--gray-200)] cursor-pointer font-semibold gap-1"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Volver
        </button>
      ) : (
        <div />
      )}
      <div className="font-['DM_Serif_Display'] text-[22px] text-[var(--gray-900)]">{title}</div>
      <button
        onClick={onClose}
        className="w-9 h-9 rounded-full bg-[var(--gray-100)] border-none text-[var(--gray-600)] text-sm cursor-pointer flex items-center justify-center transition-all hover:bg-[var(--gray-200)]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  );
}

function ProgressBar({ step, labels }: { step: number; labels: string[] }) {
  return (
    <div className="mb-7">
      {/* Labels */}
      <div className="flex justify-between mb-2">
        {labels.map((label, i) => (
          <span
            key={label}
            className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${
              i + 1 <= step ? 'text-[var(--purple)]' : 'text-[var(--gray-400)]'
            }`}
          >
            {label}
          </span>
        ))}
      </div>
      {/* Bar */}
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((dot) => (
          <motion.div
            key={dot}
            initial={false}
            animate={{
              backgroundColor:
                dot < step
                  ? 'var(--purple)'
                  : dot === step
                  ? 'var(--pink)'
                  : 'var(--gray-200)',
            }}
            transition={{ duration: 0.3 }}
            className="h-1 rounded-full flex-1"
          />
        ))}
      </div>
    </div>
  );
}