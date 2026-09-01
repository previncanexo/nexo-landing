import { Check, Percent, X } from 'lucide-react';
import { PLANES, ON_DEMAND, formatearMiles, type Prestacion, type PlanComercial } from '@/app/data/planes';
import { Button } from './ui/button';

const NEXO_PURPLE = '#8660ef';
const NEXO_PINK = '#ee5cd0';
const NEXO_GRADIENT = 'linear-gradient(135deg, #8660ef, #ee5cd0)';
/** Rojo de revisión: marca datos que el cliente todavía no confirmó. */
const PENDIENTE_ROJO = '#dc2626';

/**
 * Cada estado tiene ícono y color propios. `no-incluido` se muestra tachado y en
 * gris: tiene que leerse como "esto NO lo tenés", no como una línea más de la lista.
 *
 * `#c4c4c4` (el gris "no-incluido" original) da 1.75:1 de contraste contra blanco:
 * muy por debajo del mínimo WCAG AA (4.5:1, AGENTS.md §7). Se sube a `#8c8c8c`
 * (~3.4:1 en un ícono decorativo) para que siga leyéndose sin gritar como si
 * estuviera incluido.
 *
 * `pendiente` gana sobre el color de estado: su único propósito es saltar a la
 * vista en la revisión con el cliente, así que también tiene que pintar el ícono
 * en `no-incluido` — si no, un dato sin confirmar (ej. Óptica en Nexo I) muestra
 * texto rojo con ícono gris, dos señales distintas para el mismo dato.
 */
function IconoEstado({ p }: { p: Prestacion }) {
  const color = p.pendiente ? PENDIENTE_ROJO : p.estado === 'incluido' ? NEXO_PURPLE : NEXO_PINK;
  // aria-hidden: el ícono es redundante con el texto (label + prefijo sr-only de
  // PrestacionItem); sin esto un lector de pantalla anunciaría un <svg> sin nombre.
  if (p.estado === 'no-incluido') {
    return <X aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" style={{ color: p.pendiente ? PENDIENTE_ROJO : '#8c8c8c' }} />;
  }
  if (p.estado === 'coseguro') return <Percent aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} />;
  return <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} />;
}

/** Prefijo audible por estado: sin esto, un lector de pantalla lee las tres
 * columnas como líneas idénticas — la distinción incluido/coseguro/no-incluido
 * hoy vive solo en el ícono y el color (AGENTS.md §7). */
function PrefijoEstadoSr({ estado }: { estado: Prestacion['estado'] }) {
  const texto = estado === 'no-incluido' ? 'No incluido: ' : estado === 'coseguro' ? 'Con coseguro: ' : 'Incluido: ';
  return <span className="sr-only">{texto}</span>;
}

function PrestacionItem({ p }: { p: Prestacion }) {
  const esNo = p.estado === 'no-incluido';
  return (
    <li className="flex items-start gap-2.5 text-sm leading-snug">
      <IconoEstado p={p} />
      <span style={{
        // #c4c4c4 daba 1.75:1 contra blanco (WCAG AA pide 4.5:1). #6b6b6b es el
        // gris secundario que ya usa el resto del repo (~5.2:1): el tachado sigue
        // comunicando "no lo tenés", pero ahora también se puede leer.
        color: p.pendiente ? PENDIENTE_ROJO : esNo ? '#6b6b6b' : '#3d3d3d',
        textDecoration: esNo ? 'line-through' : 'none',
      }}>
        <PrefijoEstadoSr estado={p.estado} />
        {p.label}
        {/* #8c8c8c daba ~3.4:1 contra blanco: por debajo del 4.5:1 que pide WCAG AA
            para texto de 13px. Este detalle es el dato del coseguro (ej. "1 sesión
            a $15.000 · luego $30.000"), el que más se necesita leer. */}
        {p.detalle && <span className="block text-[13px] text-[#6b6b6b]">{p.detalle}</span>}
      </span>
    </li>
  );
}

function PlanCard({ plan, onElegirPlan }: { plan: PlanComercial; onElegirPlan: (slug: string) => void }) {
  return (
    <div
      id={`plan-${plan.slug}`}
      className="relative flex scroll-mt-24 flex-col overflow-hidden rounded-3xl bg-white transition-all hover:-translate-y-1.5"
      style={{
        boxShadow: plan.recomendado ? '0 18px 50px -12px rgba(134,96,239,0.35)' : 'var(--shadow-card)',
        border: plan.recomendado ? `1.5px solid ${NEXO_PURPLE}` : '1.5px solid transparent',
      }}
    >
      {plan.recomendado && (
        <>
          <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: NEXO_GRADIENT }} />
          <span
            className="absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
            style={{ background: NEXO_GRADIENT }}
          >
            Recomendado
          </span>
        </>
      )}

      <div className="flex flex-1 flex-col p-7">
        <h3 className="mt-2 text-2xl">{plan.nombre}</h3>
        <p className="mt-2 text-sm leading-snug text-[#6b6b6b]">{plan.bajada}</p>

        <div className="mt-4 flex items-baseline gap-1.5">
          <span
            className="font-['DM_Serif_Display'] text-[clamp(38px,6vw,48px)] leading-none"
            style={{
              background: NEXO_GRADIENT,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            ${formatearMiles(plan.precio)}
          </span>
          <span className="text-sm font-semibold text-[#6b6b6b]">/mes</span>
        </div>

        <ul className="m-0 mt-6 flex list-none flex-col gap-2.5 p-0">
          {plan.prestaciones.map((p) => <PrestacionItem key={p.label} p={p} />)}
        </ul>

        <div className="mt-auto pt-5">
          <Button
            onClick={() => onElegirPlan(plan.slug)}
            aria-label={`Afiliarme a ${plan.nombre}`}
            className="w-full rounded-full text-white hover:opacity-90"
            style={{ background: plan.recomendado ? NEXO_GRADIENT : NEXO_PURPLE }}
          >
            Afiliarme
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Planes({ onElegirPlan }: { onElegirPlan: (slug: string) => void }) {
  return (
    <section id="beneficios" className="mx-auto max-w-6xl scroll-mt-24 px-5 pt-16 pb-6 sm:pt-20">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--purple)]">
        Nuestros planes
      </p>
      <h2 className="mx-auto mt-3 max-w-[600px] text-center text-[clamp(26px,5vw,42px)] leading-tight tracking-[-1px]">
        Elegí la cobertura que necesitás
      </h2>
      <div className="mt-10 grid grid-cols-1 items-start gap-5 md:grid-cols-3">
        {PLANES.map((p) => <PlanCard key={p.slug} plan={p} onElegirPlan={onElegirPlan} />)}
      </div>
    </section>
  );
}

/**
 * Sección propia, separada de `Planes`. NO va dentro de `ALaCarta`: esa sección
 * está badgeada "Próximamente" y estos servicios (Seguro de Hogar, Árbol de Vida...)
 * ya se contratan HOY en el portal — listar precios vigentes bajo un cartel de
 * "próximamente" es una contradicción comercial, no solo un desprolijidad visual.
 */
export function ServiciosOnDemand() {
  return (
    <section id="on-demand" className="mx-auto max-w-2xl scroll-mt-24 px-5 pt-12 pb-6">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--purple)]">
        Servicios on demand
      </p>
      {/* var(--gray-500) resuelve a #8c8c8c, el mismo gris de bajo contraste (~3.4:1)
          que se corrigió en PrestacionItem. Mismo tamaño de texto, mismo problema. */}
      <p className="mx-auto mt-3 max-w-[440px] text-center text-sm text-[#6b6b6b]">
        Se contratan aparte y se suman a tu cuota solo si los querés.
      </p>
      <ul className="m-0 mt-6 flex list-none flex-col gap-0 p-0">
        {ON_DEMAND.map((s) => (
          <li
            key={s.id}
            className="flex items-baseline justify-between gap-4 border-b border-[var(--gray-100)] py-3.5 last:border-b-0"
          >
            <span>
              <span
                className="text-sm font-semibold"
                style={{ color: s.pendiente ? PENDIENTE_ROJO : 'var(--gray-700)' }}
              >
                {s.nombre}
              </span>
              <span className="block text-[13px] text-[#6b6b6b]">{s.detalle}</span>
            </span>
            <span
              className="shrink-0 whitespace-nowrap text-sm font-bold"
              style={{ color: s.pendiente ? PENDIENTE_ROJO : 'var(--gray-900)' }}
            >
              ${formatearMiles(s.precio)}/mes
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
