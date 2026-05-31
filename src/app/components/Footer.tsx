import logoImage from "@/assets/logo.png";
import { motion } from 'motion/react';
import { fadeUp, viewportOnce } from './motion-variants';

export function Footer() {
  return (
    <footer
      className="relative z-[20] overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--purple) 0%, var(--pink) 100%)'
      }}
    >
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
          width: '100%',
          height: '100%'
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 right-[15%] w-[300px] h-[300px] rounded-full bg-white/10 blur-[100px]" />
      <div className="absolute bottom-0 left-[10%] w-[250px] h-[250px] rounded-full bg-white/10 blur-[80px]" />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 relative z-10">
        {/* Main Footer Content */}
        <motion.div
          className="py-12 sm:py-16 grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Logo & Description - 4 cols */}
          <div className="col-span-2 md:col-span-4">
            <img src={logoImage} alt="Nexo by Previnca" className="h-10 mb-5" />
            <p className="text-sm text-white/80 leading-relaxed mb-6 max-w-[280px]">
              Tu salud digitalmente simple. Cobertura médica esencial.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                {
                  label: 'Instagram',
                  href: 'https://www.instagram.com/previnca_salud/',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  )
                },
                {
                  label: 'Facebook',
                  href: 'https://www.facebook.com/previnca.salud',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  )
                },
                {
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/company/previnca-salud/',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  )
                }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-105 border border-white/10"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Servicios - 2 cols */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-bold text-xs mb-4 uppercase tracking-wider">Servicios</h3>
            <ul className="space-y-3">
              {[
                { href: '#beneficios', label: 'Nexo by Previnca' },
                { href: '#carta', label: 'A la Carta' },
                { href: '#como', label: 'Cómo funciona' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/65 text-sm hover:text-white transition-colors duration-300 no-underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto - 3 cols */}
          <div className="col-span-1 md:col-span-3">
            <h3 className="text-white font-bold text-xs mb-4 uppercase tracking-wider">Contacto</h3>
            <ul className="space-y-3">
              {[
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  ),
                  text: '+54 9 3415 05-6130'
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ),
                  text: 'consultas@previncasalud.com.ar'
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  ),
                  text: 'Rosario, Santa Fe'
                }
              ].map((item) => (
                <li key={item.text} className="text-white/65 text-sm flex items-center gap-3">
                  <span className="flex-shrink-0 opacity-60">{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Información - 3 cols */}
          <div className="col-span-2 md:col-span-3">
            <h3 className="text-white font-bold text-xs mb-4 uppercase tracking-wider">Información</h3>
            <ul className="space-y-3">
              {[
                { label: 'Términos y Condiciones', href: '#' },
                { label: 'Política de Privacidad', href: '#' },
                { label: 'Preguntas Frecuentes', href: '#faq' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-white/65 text-sm hover:text-white transition-colors duration-300 no-underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        <div className="border-t border-white/15 py-6 pb-8 lg:pb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <div className="text-xs text-white/50">
              © 2026 Previnca. Todos los derechos reservados.
            </div>
            <div className="text-xs text-white/50 max-w-[500px]">
              SSS - Superintendencia de Servicios de Salud · Órgano de control de Obras Sociales y Entidades de Medicina Prepaga
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <p className="text-[11px] text-white/50 leading-relaxed max-w-[700px] mx-auto">
              * Al afiliarte a Nexo by Previnca aceptás los{' '}
              <a href="#" className="text-white/60 hover:text-white underline transition-colors">Términos de servicio</a>{' '}
              y la{' '}
              <a href="#" className="text-white/60 hover:text-white underline transition-colors">Política de privacidad</a>.
              {' '}El servicio tiene alcance geográfico limitado. Próximamente disponibles las especificaciones completas de cobertura.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}