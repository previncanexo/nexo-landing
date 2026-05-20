import { useState, useEffect } from 'react';
import logoImage from "figma:asset/ecd8e061081ccf04576b02fa005ef90a6411ef89.png";

interface NavigationProps {
  onOpenCheckout: () => void;
}

export function Navigation({ onOpenCheckout }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  const navLinks = [
    { href: '#beneficios', label: 'Plan Base' },
    { href: '#carta', label: 'A la Carta' },
    { href: '#como', label: '¿Cómo funciona?' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'py-1.5 shadow-2xl opacity-0 pointer-events-none'
            : 'py-2'
        }`}
        style={{
          background: scrolled
            ? 'linear-gradient(135deg, color-mix(in srgb, var(--purple) 97%, transparent) 0%, color-mix(in srgb, var(--pink) 97%, transparent) 100%)'
            : 'linear-gradient(135deg, color-mix(in srgb, var(--purple) 85%, transparent) 0%, color-mix(in srgb, var(--pink) 85%, transparent) 100%)',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.2)' : 'blur(16px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.18)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between gap-2">
            {/* Logo */}
            <a href="#hero" className="flex items-center relative z-10 shrink-0">
              <img
                src={logoImage}
                alt="Nexo by Previnca"
                className={`transition-all duration-300 ${scrolled ? 'h-14 md:h-18' : 'h-14 sm:h-16 md:h-20'}`}
              />
            </a>

            {/* Desktop Nav Links + Mi Portal */}
            <ul className={`hidden items-center gap-1 list-none ${scrolled ? '' : 'lg:flex'}`}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative text-sm text-white/85 no-underline transition-all duration-300 hover:text-white font-medium px-4 py-2 rounded-full hover:bg-white/10"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://nexo-portal-ten.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-semibold text-white no-underline px-4 py-2 rounded-full border border-white/30 bg-white/12 transition-all duration-200 hover:bg-white/22 hover:border-white/50 active:scale-95 ml-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  Mi Portal
                </a>
              </li>
            </ul>

            {/* Mi Portal — mobile (visible sin abrir el menú) */}
            <a
              href="https://nexo-portal-ten.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 text-[11px] font-semibold text-white no-underline px-2.5 py-2 rounded-full border border-white/30 bg-white/12 transition-all duration-200 hover:bg-white/22 active:scale-95 shrink-0 ${scrolled ? 'hidden' : 'lg:hidden'}`}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Mi Portal
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`relative z-10 w-11 h-11 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 cursor-pointer transition-all hover:bg-white/20 active:scale-95 ${scrolled ? '' : 'lg:hidden'}`}
              aria-label="Menu"
            >
              <div className="flex flex-col gap-[5px]">
                <span
                  className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${
                    mobileOpen ? 'rotate-45 translate-y-[7px]' : ''
                  }`}
                />
                <span
                  className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${
                    mobileOpen ? 'opacity-0 scale-0' : ''
                  }`}
                />
                <span
                  className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${
                    mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Floating Hamburger when scrolled */}
      {scrolled && !mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed top-5 right-6 z-[101] w-12 h-12 flex items-center justify-center rounded-2xl border border-white/20 cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-[var(--shadow-float)]"
          style={{
            background: 'linear-gradient(135deg, color-mix(in srgb, var(--purple) 95%, transparent) 0%, color-mix(in srgb, var(--pink) 95%, transparent) 100%)',
            backdropFilter: 'blur(24px)',
          }}
          aria-label="Menu"
        >
          <div className="flex flex-col gap-[5px]">
            <span className="block w-5 h-[2px] bg-white rounded-full" />
            <span className="block w-5 h-[2px] bg-white rounded-full" />
            <span className="block w-5 h-[2px] bg-white rounded-full" />
          </div>
        </button>
      )}

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] transition-all duration-500 ${scrolled ? '' : 'lg:hidden'} ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'linear-gradient(135deg, color-mix(in srgb, var(--purple) 98%, transparent) 0%, color-mix(in srgb, var(--pink) 98%, transparent) 100%)',
          backdropFilter: 'blur(30px)',
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="fixed top-5 right-6 z-[102] w-12 h-12 flex items-center justify-center rounded-2xl border border-white/20 cursor-pointer transition-all hover:bg-white/20 active:scale-95 bg-white/10 backdrop-blur-sm"
          aria-label="Cerrar menu"
        >
          <div className="flex flex-col gap-[5px]">
            <span className="block w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center rotate-45 translate-y-[7px]" />
            <span className="block w-5 h-[2px] bg-white rounded-full transition-all duration-300 opacity-0 scale-0" />
            <span className="block w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center -rotate-45 -translate-y-[7px]" />
          </div>
        </button>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-white/10 blur-[80px]" />
        <div className="absolute bottom-40 left-10 w-48 h-48 rounded-full bg-white/10 blur-[60px]" />

        <div className="flex flex-col items-center justify-center h-full px-8 relative z-10">
          <ul className="list-none flex flex-col items-center gap-2 mb-10 w-full max-w-xs">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className="w-full"
                style={{
                  animation: mobileOpen ? `fadeInUp 0.4s ease-out ${i * 0.08}s backwards` : 'none',
                }}
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
            style={{
              animation: mobileOpen ? 'fadeInUp 0.4s ease-out 0.35s backwards' : 'none',
            }}
          >
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenCheckout();
              }}
              className="w-full bg-white text-[var(--purple)] border-none px-8 py-4 rounded-full text-base cursor-pointer transition-all hover:shadow-2xl font-['DM_Sans'] font-bold"
            >
              Lo quiero — $19.500/mes
            </button>
            <a
              href="https://nexo-portal-ten.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 text-white/80 no-underline py-3 px-8 rounded-full border border-white/25 bg-white/10 text-sm font-semibold transition-all hover:bg-white/20 hover:text-white"
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
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}