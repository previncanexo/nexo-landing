import { m } from '../lib/motion-shim';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from './motion-variants';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  return (
    <section id="faq" className="relative z-[20] overflow-hidden">
      {/* Fondo oscuro sólido — mismo gradiente que hero/footer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(160deg, #12053d 0%, #1e0a5a 50%, #2d1266 100%)',
        }}
      />

      {/* Orbs decorativos sutiles */}
      <div className="absolute top-20 right-[10%] w-[400px] h-[400px] rounded-full bg-[var(--pink)] opacity-10 blur-[120px] pointer-events-none z-[1]" />
      <div className="absolute bottom-20 left-[5%] w-[350px] h-[350px] rounded-full bg-[var(--purple)] opacity-10 blur-[100px] pointer-events-none z-[1]" />

      {/* Curva superior — transición desde las secciones blancas */}
      <div className="absolute top-0 left-0 right-0 z-[2] pointer-events-none">
        <svg
          viewBox="0 0 1440 72"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ display: 'block', marginTop: '-1px' }}
        >
          <path
            d="M0,0 L1440,0 L1440,20 C1080,72 360,72 0,20 Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="relative z-[3] max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32">

        {/* Header */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-['DM_Serif_Display'] text-[clamp(36px,5.5vw,68px)] mb-4 leading-tight tracking-[-2px] text-white">
            Preguntas{' '}
            <span className="italic text-[var(--pink)]">frecuentes</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
            Todo lo que necesitás saber sobre Nexo
          </p>
        </m.div>

        {/* Accordion */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {items.map((item, index) => (
              <m.div key={index} variants={staggerItem}>
                <AccordionItem
                  value={`item-${index}`}
                  className="rounded-2xl overflow-hidden border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    borderColor: 'rgba(255, 255, 255, 0.10)',
                  }}
                >
                  <AccordionTrigger
                    className="px-6 py-5 hover:no-underline group [&[data-state=open]]:pb-3 hover:bg-white/[0.04] transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: 'linear-gradient(135deg, var(--purple), var(--pink))',
                          boxShadow: '0 4px 14px rgba(134, 96, 239, 0.35)',
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform duration-300 group-data-[state=open]:rotate-180"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                      <span className="font-semibold text-base lg:text-[17px] pr-4 text-white leading-snug">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 pt-1">
                    <div className="pl-[52px] text-white/60 leading-relaxed text-[15px] space-y-2">
                      {item.answer.split('\n').map((line, i) => {
                        const isDomain = /^[a-z0-9.-]+\.[a-z]{2,}(\/[^\s]*)?$/i.test(line.trim())
                        const isUrl = line.trim().startsWith('http')
                        if (isDomain || isUrl) {
                          const href = isUrl ? line.trim() : `https://${line.trim()}`
                          return (
                            <a
                              key={i}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-2 transition-opacity hover:opacity-80"
                              style={{ color: 'var(--pink)' }}
                            >
                              {line.trim()}
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                              </svg>
                            </a>
                          )
                        }
                        return <p key={i}>{line}</p>
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </m.div>
            ))}
          </Accordion>
        </m.div>

        {/* CTA Card */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-12 sm:mt-16 rounded-3xl p-8 sm:p-10 text-center border"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(255, 255, 255, 0.10)',
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4"
            style={{
              background: 'linear-gradient(135deg, var(--purple), var(--pink))',
              boxShadow: '0 8px 24px rgba(134, 96, 239, 0.4)',
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h3 className="font-['DM_Serif_Display'] text-2xl mb-2 text-white">
            ¿Tenés más preguntas?
          </h3>
          <p className="text-white/55 mb-6 text-sm sm:text-base">
            Nuestro equipo está disponible para ayudarte
          </p>
          <a
            href="mailto:consultas@previncasalud.com.ar"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold transition-all duration-300 hover:scale-105 text-white text-sm sm:text-base"
            style={{
              background: 'linear-gradient(to right, var(--purple), var(--pink))',
              boxShadow: '0 8px 24px rgba(134, 96, 239, 0.35)',
            }}
          >
            Contactanos
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </m.div>

      </div>
    </section>
  );
}
