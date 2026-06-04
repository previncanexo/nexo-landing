import { useState } from 'react';
import { m, AnimatePresence } from '../lib/motion-shim';
import { fadeUp, staggerContainer, staggerItem, viewportOnce, organicPatternStyle } from './motion-variants';

interface Testimonial {
  name: string;
  role: string;
  content: string;
}

interface TestimoniosProps {
  testimonials: Testimonial[];
}

const gradients = [
  'from-[var(--purple)] to-[var(--pink)]',
  'from-[var(--pink)] to-[var(--peach)]',
  'from-[var(--peach)] to-[var(--purple)]',
];

const PREVIEW_LENGTH = 160;

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = testimonial.content.length > PREVIEW_LENGTH;
  const displayText = isLong && !expanded
    ? testimonial.content.slice(0, PREVIEW_LENGTH).trimEnd() + '…'
    : testimonial.content;

  return (
    <m.div
      variants={staggerItem}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 28 } }}
      className="bg-white rounded-[28px] p-8 sm:p-10 border border-[var(--gray-100)] group cursor-default flex flex-col transition-all duration-500 hover:border-[var(--purple)]/15"
      style={{ boxShadow: '0 2px 24px rgba(0,0,0,0.04)' }}
    >
      {/* Quote Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 bg-gradient-to-br ${gradients[index % 3]}`}
        style={{ boxShadow: '0 4px 16px rgba(134, 96, 239, 0.25)' }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
        </svg>
      </div>

      {/* Content */}
      <div className="flex-1 mb-4">
        <AnimatePresence initial={false} mode="wait">
          <m.p
            key={expanded ? 'expanded' : 'collapsed'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[var(--gray-600)] leading-relaxed text-[15px] lg:text-base"
          >
            "{displayText}"
          </m.p>
        </AnimatePresence>

        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 flex items-center gap-1.5 cursor-pointer border-none bg-transparent p-0"
          >
            <span
              className={`text-sm font-semibold bg-gradient-to-r ${gradients[index % 3]} bg-clip-text`}
              style={{ WebkitTextFillColor: 'transparent' }}
            >
              {expanded ? 'Ver menos' : 'Ver más'}
            </span>
            <m.svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                stroke: index % 3 === 0 ? 'var(--pink)' : index % 3 === 1 ? 'var(--peach)' : 'var(--purple)',
              }}
            >
              <polyline points="6 9 12 15 18 9"/>
            </m.svg>
          </button>
        )}
      </div>

      {/* Author */}
      <div className="flex items-center gap-4 pt-5 border-t border-[var(--gray-200)] mt-2">
        <div className="relative flex-shrink-0">
          <div
            className={`absolute inset-0 rounded-full opacity-40 transition-opacity duration-300 group-hover:opacity-70 bg-gradient-to-br ${gradients[index % 3]}`}
            style={{ filter: 'blur(8px)' }}
          />
          <div className={`relative w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${gradients[index % 3]} shadow-md`}>
            <span className="text-white font-bold text-base leading-none select-none">
              {getInitials(testimonial.name)}
            </span>
          </div>
        </div>

        <div>
          <div className="font-bold text-[var(--gray-900)] mb-0.5">{testimonial.name}</div>
          <div className="text-sm text-[var(--gray-500)]">{testimonial.role}</div>
        </div>
      </div>
    </m.div>
  );
}

export function Testimonios({ testimonials }: TestimoniosProps) {
  return (
    <section
      className="relative py-16 sm:py-24 md:py-32 px-5 sm:px-6 lg:px-8 z-[2] overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #faf9fc 50%, #ffffff 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none z-[1]" style={organicPatternStyle} />
      <div className="absolute top-20 right-[8%] w-[500px] h-[500px] rounded-full bg-[var(--purple)] opacity-[0.03] blur-[110px] pointer-events-none" />
      <div className="absolute bottom-20 left-[5%] w-[450px] h-[450px] rounded-full bg-[var(--pink)] opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-['DM_Serif_Display'] text-[clamp(36px,5.5vw,68px)] mb-4 leading-tight tracking-[-2px] text-[var(--gray-900)]">
            Lo que dicen nuestros{' '}
            <span className="italic text-[var(--pink)]">miembros</span>
          </h2>
          <p className="text-[var(--gray-600)] text-base sm:text-lg max-w-2xl mx-auto">
            Historias reales de personas que confían en Previnca
          </p>
        </m.div>

        {/* Testimonials Grid */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </m.div>
      </div>
    </section>
  );
}
