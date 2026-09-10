/**
 * Copy comercial de los planes. Fuente: documento de producto del cliente
 * (capturas en `Nuevos servicios/`, 2026-09-01) + aclaración de Javier Talarn
 * en Slack sobre los coseguros de Doc24.
 *
 * Este archivo es SOLO copy de marketing. La matriz operativa de prestaciones
 * (cant. cubierta, valor cubierto, valor no cubierto) vive en Supabase y la
 * consume el portal: son dos cosas con distinta audiencia y distinta cadencia
 * de cambio. Ver el spec, sección "Por qué el copy y la matriz están separados".
 *
 * El único dato compartido con el portal es el PRECIO, y por eso lo verifica
 * `scripts/check-precios.mjs` contra `GET /api/planes`.
 */

/**
 * `no-incluido` es un estado EXPLÍCITO, no una ausencia. Nexo III no tiene
 * Emergencias ni Farmacia; si eso se comunica solo por omisión, el que compara
 * tres columnas no lo registra y termina creyendo que tiene ambulancia.
 */
export type Estado = 'incluido' | 'coseguro' | 'no-incluido';

export interface Prestacion {
  label: string;
  estado: Estado;
  /** Aclaración del coseguro: "1 consulta sin cargo · luego $18.000" */
  detalle?: string;
  /**
   * Dato que el cliente TODAVÍA NO CONFIRMÓ. Se pinta en rojo para que salte a la
   * vista en la revisión de staging. NO debe llegar a producción: antes de publicar
   * hay que confirmar el dato y sacar el flag, o borrar la línea.
   */
  pendiente?: boolean;
}

export interface PlanComercial {
  /** Identificador estable, igual al `slug` de la tabla `plans` del portal. */
  slug: 'nexo-1' | 'nexo-2' | 'nexo-3';
  nombre: string;
  precio: number;
  bajada: string;
  recomendado?: boolean;
  prestaciones: Prestacion[];
}

export interface ServicioOnDemand {
  id: string;
  nombre: string;
  precio: number;
  detalle: string;
  pendiente?: boolean;
}

/**
 * Formateo de miles a mano. `toLocaleString` puede dar distinto en Node (build SSG)
 * y en el browser, y eso rompe la coincidencia del render inicial al hidratar
 * (regla dura, AGENTS.md §6).
 */
export function formatearMiles(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Óptica. Fuente: `circuito_optica_previnca_v2.docx` (2026-09-01), que a su vez
 * cita TEXTUALMENTE la cartilla médica AGO 2026 de Previnca Salud para las
 * condiciones de cobertura. Prestador: Rosario Visión Ópticas (4 sucursales).
 *
 * Cubre sin cargo: armazón de acetato con alma de metal no ferrosa, cristales
 * minerales blancos de stock, hasta 4.00 dioptrías esféricas y 2.00 cilíndricas.
 * Lo que exceda ese alcance lo abona el afiliado a la óptica, con 20% de
 * descuento sobre el excedente.
 *
 * El resto del circuito (credencial + cuota al día + receta, sucursales, retiro)
 * es operativo: va en el portal del afiliado, no en el copy de la landing.
 *
 * Lo que el documento NO resuelve: en qué planes entra. Habla del "afiliado" de
 * Previnca Salud en general, sin mencionar Nexo I/II/III.
 *
 * Por eso los dos pendientes de Óptica tuvieron destinos distintos: en II y III
 * el flag estaba por las CONDICIONES DE COBERTURA que faltaban (el documento de
 * producto ya los listaba con Óptica, eso nunca estuvo en duda), y este
 * documento las trae, así que sale. En Nexo I el flag está por la ASIGNACIÓN
 * DE PLAN — el documento de producto no lo lista y este tampoco lo desmiente —,
 * así que sigue abierto.
 */
/**
 * La etiqueta se separa de la prestación porque Óptica aparece en los tres
 * planes con DOS formas distintas: `incluido` con detalle en Nexo II y III (la
 * const `OPTICA` de abajo) y `no-incluido` marcada como pendiente en Nexo I.
 * Si el nombre queda tipeado en los dos lugares, un renombre puede arreglar uno
 * y olvidarse del otro, y la tabla comparativa termina mostrando dos nombres
 * para el mismo servicio en columnas contiguas.
 */
const LABEL_OPTICA = 'Óptica';

const OPTICA: Prestacion = {
  label: LABEL_OPTICA,
  estado: 'incluido',
  detalle: '1 par al año · Armazón y cristales de stock hasta 4.00 esf / 2.00 cil',
};

/**
 * OJO CON LA FUENTE de estos dos importes: NO salen de la aclaración de Javier
 * Talarn (Slack, 2026-08-31). Ese mensaje sólo dice, sobre psicología, "Y
 * psicologia todo igual" — no trae ningún número. Los $15.000 / $30.000 vienen
 * de la tabla de coseguros del documento de producto del cliente (capturas en
 * `Nuevos servicios/`, 2026-09-01), que lista "Doc24 Psicología · Cant. cubierta
 * 1 · Valor cubierto $15.000 · Valor no cubierto $30.000", igual en los tres
 * planes. Lo que aporta el mensaje de Talarn es que psicología NO cambia entre
 * planes, a diferencia de la guardia clínica.
 *
 * Se aclara porque un comentario que parece citado y no lo está es peor que no
 * tener comentario: el próximo lector da los importes por verificados contra
 * Slack y no los vuelve a chequear.
 *
 * Doc24 Pediatría NO se lista: no se vende a menores, así que ningún socio puede
 * usarla. Publicarla genera reclamos de posventa.
 */
const PSICOLOGIA: Prestacion = {
  label: 'Psicología · Doc24',
  estado: 'coseguro',
  detalle: '1 sesión a $15.000 · luego $30.000',
};

/**
 * Guardia clínica: es el MISMO servicio en los tres planes y sólo cambia el
 * coseguro, así que la etiqueta se escribe una vez y el detalle se pasa por
 * plan. Sin esto la cadena queda tipeada a mano tres veces y el próximo
 * renombre arregla dos y se olvida de una — y ahí Nexo III termina anunciando
 * un nombre de servicio distinto al de Nexo I y II, en la misma tabla
 * comparativa, sin que nada lo detecte. Los precios tienen `check-precios.mjs`
 * como red; los nombres no tienen ninguna.
 *
 * Se declara arriba del bloque PLANES a propósito: las regex de
 * `check-precios.mjs` están acotadas a ese bloque y al de ON_DEMAND, así que una
 * constante declarada acá queda fuera de las dos ventanas y no altera la
 * extracción de precios.
 *
 * OJO al redactar comentarios acá arriba: el script localiza el inicio del
 * bloque con `indexOf` sobre la cadena `export` + ` const PLANES`. Escribir esa
 * cadena completa en un comentario ANTERIOR a la declaración real hace que el
 * `indexOf` matchee el comentario y la ventana arranque antes de donde debe. Por
 * eso acá se nombra "el bloque PLANES" y no la declaración textual.
 */
const guardiaClinica = (detalle: string): Prestacion => ({
  label: 'Guardia clínica 24/7 · Doc24',
  estado: 'coseguro',
  detalle,
});

/**
 * Las tres prestaciones que aparecen en los tres planes cambiando sólo el
 * `estado`. Mismo motivo que `guardiaClinica`: tipeadas a mano son tres copias
 * de la misma cadena, `label` es un `string` cualquiera y un typo compila
 * perfecto — la tabla comparativa terminaría mostrando dos nombres distintos
 * para el mismo servicio, en columnas contiguas, sin que nada lo detecte. Los
 * precios los cubre `check-precios.mjs`; los nombres no tienen ninguna red.
 *
 * Se declaran arriba del bloque PLANES para no entrar en las ventanas que ese
 * script acota con `indexOf` (ver la advertencia sobre la cadena centinela en el
 * comentario de `guardiaClinica`).
 */
const emergencias = (estado: Estado): Prestacion => ({ label: 'Emergencias médicas', estado });
const guardiaOdontologica = (estado: Estado): Prestacion => ({ label: 'Guardia odontológica', estado });
const farmacia = (estado: Estado): Prestacion => ({ label: 'Farmacia', estado });

export const PLANES: PlanComercial[] = [
  {
    slug: 'nexo-1',
    nombre: 'Nexo I',
    precio: 20000,
    bajada: 'La cobertura completa: emergencias, odontología y farmacia.',
    recomendado: true,
    prestaciones: [
      emergencias('incluido'),
      guardiaOdontologica('incluido'),
      farmacia('incluido'),
      // El documento de producto no lista Óptica en Nexo I, pero sí en II y III,
      // que son más baratos. Probable omisión en el origen. A confirmar.
      // `circuito_optica_previnca_v2.docx` trajo QUÉ cubre la óptica, no EN QUÉ
      // PLANES entra, así que este pendiente sigue abierto.
      { label: LABEL_OPTICA, estado: 'no-incluido', pendiente: true },
      guardiaClinica('1 consulta sin cargo · luego $18.000'),
      PSICOLOGIA,
    ],
  },
  {
    slug: 'nexo-2',
    nombre: 'Nexo II',
    precio: 12000,
    bajada: 'Seguro de salud, farmacia y óptica, con telemedicina.',
    prestaciones: [
      { label: 'Seguro de Salud I', estado: 'incluido', detalle: 'Alta complejidad, internación y trasplante' },
      farmacia('incluido'),
      OPTICA,
      // TENSIÓN RESUELTA (2026-09-10). Venía de una contradicción entre dos
      // fuentes: el documento de producto lista este servicio con "Cant.
      // Cubierta 0" (ninguna consulta sin cargo) y una confirmación anterior
      // decía "consultas sin límite y luego $30.000", que se leía al revés.
      // El cliente definió el texto final: "Consulta a $30.000 · sin límite".
      // O sea que se cobran TODAS las consultas, a $30.000 cada una, y lo que
      // no tiene límite es la cantidad — coincide con el "Cant. Cubierta 0" del
      // documento original.
      //
      // El separador `·` no es decorativo: es el borde entre lo que pagás y lo
      // que recibís. `Planes.tsx` pinta `detalle` en 13px, el cuerpo más chico
      // de la card; sin el separador las dos ideas se leen como una sola frase,
      // para un público que incluye adultos mayores.
      { label: 'Médico a domicilio', estado: 'coseguro', detalle: 'Consulta a $30.000 · sin límite' },
      guardiaClinica('1 consulta sin cargo · luego $18.000'),
      PSICOLOGIA,
      emergencias('no-incluido'),
      guardiaOdontologica('no-incluido'),
    ],
  },
  {
    slug: 'nexo-3',
    nombre: 'Nexo III',
    precio: 7000,
    bajada: 'La puerta de entrada: seguro de salud y telemedicina.',
    prestaciones: [
      { label: 'Seguro de Salud II', estado: 'incluido', detalle: 'Alta complejidad, enfermedades graves y rehabilitación' },
      OPTICA,
      guardiaClinica('Cobertura de $10.000 · luego $18.000'),
      PSICOLOGIA,
      emergencias('no-incluido'),
      guardiaOdontologica('no-incluido'),
      farmacia('no-incluido'),
    ],
  },
];

/**
 * Servicios que se contratan y se pagan por fuera de la cuota.
 * Los dos Seguros de Hogar figuran con el mismo nombre en el documento de origen,
 * pero son los dos planes ya implementados en el portal (`hasta_1er_piso` y
 * `segundo_piso_plus`). Ver nexo-portal/docs/superpowers/specs/2026-06-30-seguro-hogar-design.md
 */
export const ON_DEMAND: ServicioOnDemand[] = [
  { id: 'salud-1', nombre: 'Seguro de Salud I', precio: 6000, detalle: 'Alta complejidad, internación y trasplante' },
  // DISCREPANCIA RESUELTA (2026-09-10): acá se publicaba $5.000 (documento de
  // producto del cliente) pero el portal cobraba $4.500 (nexo-portal
  // ServiceCards.tsx, constante ARBOL_VIDA_PRECIO). El cliente confirmó
  // explícitamente que mandan los precios de la landing, por ser los últimos
  // que pasó — no se resolvió por criterio propio. El portal se está
  // actualizando a $5.000 en paralelo (otro cambio, otro repo). El precio de
  // acá ($5.000) ya estaba correcto y no se toca; lo que se saca es el flag
  // `pendiente`, porque la discrepancia que lo motivaba ya no existe.
  // `check-precios.mjs` extiende su chequeo para cubrir on-demand contra
  // `/api/planes` y así evitar que una discrepancia como esta vuelva a pasar
  // desapercibida (antes solo comparaba el bloque PLANES contra `plans`).
  { id: 'arbol-de-vida', nombre: 'Árbol de Vida', precio: 5000, detalle: 'Sepelio, cremación ecológica y parcela con árbol' },
  { id: 'hogar-1', nombre: 'Seguro de Hogar · hasta 1er piso', precio: 19000, detalle: 'Casas, PB y 1er piso · Solo en Rosario' },
  { id: 'hogar-2', nombre: 'Seguro de Hogar · 2do piso +', precio: 22000, detalle: 'Dentro y fuera de Rosario' },
  // El precio viene del documento con un comentario interno pegado: "chequear
  // lista de precio de vendedores me parece q esta mal". Sin confirmar.
  { id: 'vida', nombre: 'Seguro de Vida', precio: 2750, detalle: 'Suma asegurada $3.162.500', pendiente: true },
];

/**
 * Key de localStorage del plan elegido en una card, compartida entre `App.tsx`
 * (que escribe) y `Onboarding.tsx` (que lee). Este repo no corre `tsc`, así que
 * duplicar el literal en los dos archivos deja el mecanismo un typo lejos de
 * romperse en silencio, justo en la rama que existe para cerrar bugs de
 * sincronización de plan.
 *
 * Fuera de los bloques PLANES y ON_DEMAND a propósito, y con este
 * nombre: la cadena literal `export const LS_PLAN_KEY` es el DELIMITADOR de fin
 * del bloque `ON_DEMAND` en `scripts/check-precios.mjs` (busca su posición con
 * `indexOf` para acotar la regex). Si se la renombra, o se la mueve arriba de
 * `ON_DEMAND`, ese `indexOf` devuelve -1, el bloque se extiende hasta el final
 * del archivo y el chequeo de precios se degrada SIN FALLAR. Hoy no rompe nada
 * porque después no hay más pares `id:`/`precio:`, que es justo lo que lo hace
 * peligroso: es una trampa armada para el próximo que agregue un export al pie.
 */
export const LS_PLAN_KEY = 'nexo_plan_slug';

/**
 * Precio de entrada ("desde $X/mes"): se deriva de PLANES en vez de
 * hardcodearse, para que no quede un número viejo pegado en la UI cuando
 * cambien las tarifas. Centralizado acá (y no repetido en cada componente que
 * lo usa — Hero, ComoFunciona, IPhoneCTA) porque esta misma entrega existe
 * para cerrar un $19.500 que había quedado hardcodeado en seis lugares del
 * sitio: repetir la derivación en vez de centralizarla reintroduciría la
 * misma clase de problema.
 */
export const PRECIO_DESDE = Math.min(...PLANES.map((p) => p.precio));
