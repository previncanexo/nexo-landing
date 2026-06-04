import { useState, useEffect } from 'react';
import logoImage from "@/assets/logo.png";

interface NavigationProps {
  onOpenCheckout: () => void;
}

export function Navigation({ onOpenCheckout }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  const navLinks = [
    { href: '#beneficios', label: 'Previnca Nexo' },
    { href: '#carta', label: '+Bienestar' },
    { href: '#como', label: 'Cómo funciona' },
    { href: '#faq', label: 'Preguntas frecuentes' },
  ];

  return (
    <>
      {/* Floating pill wrapper — pointer-events-none so the transparent area never blocks clicks */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-3 px-3 sm:px-5 pointer-events-none">
        <nav
          className="nav-pill w-full max-w-[1200px] rounded-full pointer-events-auto transition-all duration-300"
          data-scrolled={scrolled}
          style={{
            border: `1px solid ${scrolled ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.20)'}`,
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.12)'
              : '0 4px 24px rgba(0,0,0,0.10)',
            padding: '5px 8px 5px 16px',
          }}
        >

          {/* ── DESKTOP: 3-col grid — links | logo | CTAs ── */}
          <div className="hidden lg:grid items-center gap-2" style={{ gridTemplateColumns: '1fr auto 1fr' }}>

            {/* Left: nav links */}
            <ul className="flex items-center gap-0.5 list-none m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13px] text-white/80 no-underline font-medium px-3.5 py-2 rounded-full transition-all duration-200 hover:text-white hover:bg-white/10 block whitespace-nowrap"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Center: logo */}
            <a href="#hero" className="flex items-center justify-center">
              <img
                src={logoImage}
                alt="Previnca Nexo"
                style={{
                  height: scrolled ? '38px' : '48px',
                  width: 'auto',
                  maxWidth: 'none',
                  marginLeft: '-12px',
                  marginRight: '-12px',
                  transition: 'height 0.3s ease',
                  objectFit: 'contain',
                }}
              />
            </a>

            {/* Right: CTAs */}
            <div className="flex items-center gap-2 justify-end">
              <a
                href="https://nexo.portal.previncasalud.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[13px] font-semibold text-white/80 no-underline px-3.5 py-2 rounded-full border border-white/25 transition-all duration-200 hover:bg-white/10 hover:text-white hover:border-white/40 active:scale-95 whitespace-nowrap"
                style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Mi Portal
              </a>
              <button
                onClick={onOpenCheckout}
                className="bg-white text-[var(--purple)] border-none px-5 py-2.5 rounded-full text-[13px] font-bold cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-95 font-['DM_Sans'] whitespace-nowrap flex items-center gap-1.5 group"
              >
                Quiero mi cobertura
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ── MOBILE: logo left — actions right ── */}
          <div className="lg:hidden flex items-center justify-between gap-2">
            <a href="#hero" className="flex items-center">
              <img
                src={logoImage}
                alt="Previnca Nexo"
                style={{
                  height: '40px',
                  width: 'auto',
                  maxWidth: 'none',
                  marginLeft: '-10px',
                  marginRight: '-10px',
                  objectFit: 'contain',
                }}
              />
            </a>
            <div className="flex items-center gap-2">
              <a
                href="https://nexo.portal.previncasalud.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] font-semibold text-white no-underline px-3 py-2 rounded-full border border-white/30 transition-all hover:bg-white/20 active:scale-95"
                style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Mi Portal
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 cursor-pointer transition-all hover:bg-white/20 active:scale-95"
                style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
                aria-label="Menú"
              >
                <div className="flex flex-col gap-[4px]">
                  <span className={`block w-[18px] h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[5.5px]' : ''}`} />
                  <span className={`block w-[18px] h-[1.5px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-0' : ''}`} />
                  <span className={`block w-[18px] h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[5.5px]' : ''}`} />
                </div>
              </button>
            </div>
          </div>

        </nav>
      </div>

      {/* ── MOBILE MENU OVERLAY ── */}
      <div
        className={`fixed inset-0 z-[99] lg:hidden transition-opacity duration-150 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          // rgba en vez de color-mix(): color-mix NO existe en iOS Safari < 16.2 →
          // el fondo quedaba transparente y el menú "roto". Sin backdrop-filter:
          // el overlay (fixed inset-0) está SIEMPRE en el DOM y su blur creaba una
          // capa GPU permanente que trababa el scroll aun con el menú cerrado.
          background: 'linear-gradient(135deg, rgba(134, 96, 239, 0.98) 0%, rgba(238, 92, 208, 0.98) 100%)',
        }}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-5 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-xl border border-white/20 bg-white/10 cursor-pointer hover:bg-white/20 active:scale-95 transition-all"
          aria-label="Cerrar menú"
        >
          <div className="flex flex-col gap-[5px]">
            <span className="block w-5 h-[2px] bg-white rounded-full origin-center rotate-45 translate-y-[7px]" />
            <span className="block w-5 h-[2px] bg-white rounded-full opacity-0" />
            <span className="block w-5 h-[2px] bg-white rounded-full origin-center -rotate-45 -translate-y-[7px]" />
          </div>
        </button>

        <div className="flex flex-col items-center justify-center h-full px-8 relative z-10">
          <ul className="list-none flex flex-col items-center gap-1 mb-10 w-full max-w-xs p-0 m-0">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className="w-full"
              >
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-center text-white text-lg no-underline py-3.5 px-6 rounded-2xl transition-all hover:bg-white/15 font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="w-full max-w-xs flex flex-col gap-3">
            <button
              onClick={() => { setMobileOpen(false); onOpenCheckout(); }}
              className="w-full bg-white text-[var(--purple)] border-none px-8 py-4 rounded-full text-base cursor-pointer transition-all hover:shadow-2xl font-['DM_Sans'] font-bold flex items-center justify-center gap-2 group"
            >
              Quiero mi cobertura
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
            <a
              href="https://nexo.portal.previncasalud.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 text-white/85 no-underline py-3.5 px-8 rounded-full border border-white/25 bg-white/10 text-sm font-semibold transition-all hover:bg-white/20 hover:text-white"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Mi Portal
            </a>
          </div>
        </div>
      </div>

    </>
  );
}
