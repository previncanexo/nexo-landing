import { motion } from 'motion/react';
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
    <section className="relative py-20 sm:py-28 px-5 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="font-['DM_Serif_Display'] text-[clamp(36px,5.5vw,68px)] mb-4 leading-tight tracking-[-2px] text-white">
            Preguntas{' '}
            <span className="italic text-[var(--pink)]">
              frecuentes
            </span>
          </h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            Todo lo que necesitás saber sobre Nexo
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {items.map((item, index) => (
              <motion.div key={index} variants={staggerItem}>
                <AccordionItem
                  value={`item-${index}`}
                  className="rounded-3xl overflow-hidden backdrop-blur-xl border-0"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  <AccordionTrigger
                    className="px-6 py-5 hover:no-underline group [&[data-state=open]]:pb-3"
                    style={{
                      transition: 'all 0.3s var(--ease-out-quart)',
                    }}
                  >
                    <div className="flex items-center gap-4 text-left">
                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: 'linear-gradient(135deg, var(--purple), var(--pink))',
                          boxShadow: '0 4px 16px rgba(134, 96, 239, 0.3)',
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
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
                      {/* Question */}
                      <span className="font-bold text-base lg:text-lg pr-4 text-white">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-6 pb-5 pt-2">
                    <div className="pl-0 sm:pl-14 text-white/70 leading-relaxed">
                      {item.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-10 sm:mt-16 rounded-3xl p-6 sm:p-8 lg:p-10 text-center backdrop-blur-xl border"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div className="mb-6">
            <div
              className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4"
              style={{
                background: 'linear-gradient(135deg, var(--purple), var(--pink))',
                boxShadow: '0 8px 24px rgba(134, 96, 239, 0.4)',
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3 className="font-['DM_Serif_Display'] text-2xl font-bold mb-2 text-white">
              ¿Tenés más preguntas?
            </h3>
            <p className="text-white/60">
              Nuestro equipo está disponible para ayudarte
            </p>
          </div>
          <a
            href="mailto:hola@nexo.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 text-white"
            style={{
              background: 'linear-gradient(to right, var(--purple), var(--pink))',
              boxShadow: 'var(--shadow-elevated)',
            }}
          >
            Contactanos
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}