import { useState, useEffect } from 'react';
import logoImage from "figma:asset/ecd8e061081ccf04576b02fa005ef90a6411ef89.png";

interface NavigationProps {
  onOpenCheckout: () => void;
}

export function Navigation({ onOpenCheckout }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  const navLinks = [
    { href: '#beneficios', label: 'Plan Base' },
    { href: '#carta', label: 'A la Carta' },
    { href: '#como', label: 'Cómo funciona' },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={{
          padding: scrolled ? '6px 0' : '10px 0',
          background: scrolled
            ? 'rgba(80, 30, 160, 0.72)'
            : 'linear-gradient(135deg, color-mix(in srgb, var(--purple) 88%, transparent) 0%, color-mix(in srgb, var(--pink) 88%, transparent) 100%)',
          backdropFilter: 'blur(24px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.3)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.18)' : 'none',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">

            {/* Logo — overflow hidden para recortar espacio en blanco lateral */}
            <a href="#hero" className="shrink-0 overflow-hidden flex items-center" style={{ marginLeft: '-10px', marginRight: '-4px' }}>
              <img
                src={logoImage}
                alt="Nexo by Previnca"
                style={{
                  height: scrolled ? '56px' : '72px',
                  width: 'auto',
                  maxWidth: 'none',
                  marginLeft: '-12px',
                  marginRight: '-12px',
                  transition: 'height 0.3s ease',
                  objectFit: 'contain',
                }}
              />
            </a>

            {/* Desktop links */}
            <ul className="hidden lg:flex items-center gap-1 list-none flex-1 justify-center">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/85 no-underline font-medium px-4 py-2 rounded-full transition-all duration-200 hover:text-white hover:bg-white/12 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <button
                onClick={onOpenCheckout}
                className="bg-white text-[var(--purple)] border-none px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-95 font-['DM_Sans']"
              >
                Quiero mi cobertura
              </button>
              <a
                href="https://nexo.portal.previncasalud.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-semibold text-white no-underline px-4 py-2.5 rounded-full border border-white/30 bg-white/10 transition-all duration-200 hover:bg-white/20 hover:border-white/50 active:scale-95"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Mi Portal
              </a>
            </div>

            {/* Mobile: Mi Portal + Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href="https://nexo.portal.previncasalud.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] font-semibold text-white no-underline px-3 py-2 rounded-full border border-white/30 bg-white/12 transition-all hover:bg-white/22 active:scale-95"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Mi Portal
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 cursor-pointer transition-all hover:bg-white/20 active:scale-95"
                aria-label="Menú"
              >
                <div className="flex flex-col gap-[5px]">
                  <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                  <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-0' : ''}`} />
                  <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                </div>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] lg:hidden transition-all duration-400 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'linear-gradient(135deg, color-mix(in srgb, var(--purple) 98%, transparent) 0%, color-mix(in srgb, var(--pink) 98%, transparent) 100%)',
          backdropFilter: 'blur(30px)',
        }}
      >
        {/* Orbs decorativos */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-white/10 blur-[80px]" />
        <div className="absolute bottom-40 left-10 w-48 h-48 rounded-full bg-white/10 blur-[60px]" />

        {/* Close */}
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
          <ul className="list-none flex flex-col items-center gap-1 mb-10 w-full max-w-xs">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className="w-full"
                style={{ animation: mobileOpen ? `fadeInUp 0.35s ease-out ${i * 0.07}s backwards` : 'none' }}
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

          <div
            className="w-full max-w-xs flex flex-col gap-3"
            style={{ animation: mobileOpen ? 'fadeInUp 0.35s ease-out 0.28s backwards' : 'none' }}
          >
            <button
              onClick={() => { setMobileOpen(false); onOpenCheckout(); }}
              className="w-full bg-white text-[var(--purple)] border-none px-8 py-4 rounded-full text-base cursor-pointer transition-all hover:shadow-2xl font-['DM_Sans'] font-bold"
            >
              Quiero mi cobertura
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

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
