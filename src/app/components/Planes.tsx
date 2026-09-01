import { Check, Percent, X } from 'lucide-react';
import { PLANES, ON_DEMAND, formatearMiles, type Prestacion, type PlanComercial } from '@/app/data/planes';
import { Button } from './ui/button';

const NEXO_PURPLE = '#8660ef';
const NEXO_PINK = '#ee5cd0';
const NEXO_GRADIENT = 'linear-gradient(135deg, #8660ef, #ee5cd0)';
/**
 * Los colores de marca como TEXTO chico sobre blanco no llegan a 4.5:1
 * (violeta 4.26, rosa 2.97). Estas variantes son los mismos tonos oscurecidos
 * lo justo para cumplir, sin cambiar la identidad. Se usan SOLO para texto:
 * los fondos y gradientes siguen con los colores de marca originales.
 */
const VIOLETA_TEXTO = '#6d43e0';
const ROSA_TEXTO = '#c2359f';
/** El violeta sólido del CTA: blanco sobre #8660ef da 4.26. Este llega a 4.6. */
const VIOLETA_BOTON = '#7a51e6';
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
            style={{ background: plan.recomendado ? NEXO_GRADIENT : VIOLETA_BOTON }}
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
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em]"
        style={{ color: VIOLETA_TEXTO }}>
        Nuestros planes
      </p>
      <h2 className="mx-auto mt-3 max-w-[600px] text-center text-[clamp(26px,5vw,42px)] leading-tight tracking-[-1px]">
        Elegí la cobertura que necesitás
      </h2>
      {/*
        Sin `items-start`: con esa clase cada card se encogía a su contenido y las
        tres quedaban de alturas distintas, con los botones "Afiliarme" a tres
        alturas diferentes. Estirándolas (el default del grid) el `mt-auto` que ya
        tiene el CTA lo empuja al pie y los tres quedan alineados, que es lo que
        hace comparable una tabla de precios.
      */}
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
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
/**
 * Ícono por servicio. Los datos no traen ícono a propósito (`planes.ts` es copy
 * comercial, no presentación), así que el mapeo vive acá, junto al render.
 */
function IconoServicio({ id }: { id: string }) {
  const comun = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  if (id.startsWith('hogar')) {
    return (
      <svg {...comun}>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
        <path d="M9.5 21v-6h5v6" />
      </svg>
    );
  }
  if (id === 'arbol-de-vida') {
    return (
      <svg {...comun}>
        <path d="M12 22v-6" />
        <path d="M12 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
        <path d="m12 15-2.5-2.5" />
        <path d="m12 12 2.5-2.5" />
      </svg>
    );
  }
  if (id === 'vida') {
    return (
      <svg {...comun}>
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8Z" />
      </svg>
    );
  }
  // Seguro de Salud
  return (
    <svg {...comun}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v6M9 11h6" />
    </svg>
  );
}

export function ServiciosOnDemand() {
  return (
    <section id="on-demand" className="mx-auto max-w-6xl scroll-mt-24 px-5 pt-14 pb-6">
      {/* Misma estructura de encabezado que la sección de planes (volanta +
          titular + bajada) para que las dos se lean como partes de lo mismo. */}
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em]"
        style={{ color: ROSA_TEXTO }}>
        Servicios on demand
      </p>
      <h2 className="mx-auto mt-3 max-w-[600px] text-center text-[clamp(26px,5vw,42px)] leading-tight tracking-[-1px]">
        Sumá solo lo que necesites
      </h2>
      <p className="mx-auto mt-3 max-w-[460px] text-center text-sm text-[#6b6b6b]">
        No están incluidos en los planes. Se contratan aparte y se suman a tu cuota únicamente si los querés.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ON_DEMAND.map((s) => {
          const rojo = !!s.pendiente;
          return (
            <div
              key={s.id}
              className="flex flex-col rounded-3xl bg-white p-6 transition-all hover:-translate-y-1"
              style={{
                border: `1.5px solid ${rojo ? `${PENDIENTE_ROJO}33` : '#f0eaf9'}`,
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl text-white"
                style={{
                  background: rojo ? PENDIENTE_ROJO : NEXO_GRADIENT,
                  boxShadow: `0 4px 14px ${rojo ? `${PENDIENTE_ROJO}40` : 'rgba(134,96,239,0.30)'}`,
                }}
              >
                <IconoServicio id={s.id} />
              </div>

              <h3
                className="mt-4 text-lg leading-snug"
                style={{ color: rojo ? PENDIENTE_ROJO : '#111111' }}
              >
                {s.nombre}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#6b6b6b]">{s.detalle}</p>

              {/* mt-auto: los precios quedan alineados al pie aunque los detalles
                  ocupen una o dos líneas. */}
              <div className="mt-auto flex items-baseline gap-1.5 pt-5">
                <span
                  className="font-['DM_Serif_Display'] text-[30px] leading-none"
                  style={
                    rojo
                      ? { color: PENDIENTE_ROJO }
                      : {
                          background: NEXO_GRADIENT,
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          color: 'transparent',
                        }
                  }
                >
                  ${formatearMiles(s.precio)}
                </span>
                <span className="text-sm font-semibold text-[#6b6b6b]">/mes</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
