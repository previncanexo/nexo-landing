# Planes Nexo I / II / III — Plan de implementación (Entrega 1)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar en staging una landing que venda tres planes (Nexo I $20.000 / Nexo II $12.000 / Nexo III $7.000) y que el plan elegido llegue intacto al cobro de Mercado Pago.

**Architecture:** El copy comercial vive en un único archivo de datos tipado en la landing (`src/app/data/planes.ts`). Un componente `Planes.tsx` lo renderiza y reemplaza a `PlanBase.tsx`. El plan elegido viaja como `slug` (nunca UUID) desde la card hasta el `PATCH /api/leads/[id]` del portal, que lo resuelve contra Supabase. Un script de CI compara los precios de la landing contra los del portal.

**Tech Stack:** Landing: Vite + `vite-react-ssg` + React 18 + TypeScript + Tailwind, `"type": "module"`, Node 26. Sin framework de tests: se usa `node --test` nativo. Portal: Next.js App Router + Supabase + SDK de Mercado Pago.

**Spec:** `docs/superpowers/specs/2026-09-01-planes-nexo-i-ii-iii-design.md`

## Global Constraints

- **Dos repos.** Landing: `Nexo 2.0 V9` (rama `feat/planes-nexo-i-ii-iii`, desde `staging`). Portal: `nexo-portal` (crear `feat/planes-nexo-i-ii-iii` desde `staging`). Cada tarea dice en cuál se trabaja.
- **Sin `toLocaleString` para formatear miles.** El locale difiere entre Node (build SSG) y el browser y rompe la hidratación. Usar la regex de `AGENTS.md §6`: `n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')`.
- **Ningún render inicial condicionado a `useIsMobile()`, `window` o `matchMedia`.** El primer render del cliente debe coincidir exactamente con el HTML del SSG.
- **Diferencias mobile/desktop por media query en `theme.css`**, nunca por estado JS.
- **Imágenes:** `loading="eager"` + `fetchpriority="low"` (nunca `lazy`), con `srcSet` vía `vite-imagetools`.
- **Comentarios en español** explicando el *porqué* de decisiones no obvias. `AGENTS.md §5` los pide explícitamente; no removerlos.
- **Estilos inline (`style={{...}}`) están permitidos** y son el patrón de este repo.
- **Precios exactos, sin inventar:** Nexo I `20000`, Nexo II `12000`, Nexo III `7000`. Slugs: `nexo-1`, `nexo-2`, `nexo-3`.
- **Nada de descuento monotributista** en las cards nuevas. No figura en el documento de producto (spec, pendiente #6).
- **Los datos sin confirmar van con `pendiente: true`.** No inventar valores para completarlos. El spec lista 6 pendientes, pero eso da **5 flags** en el código: Óptica genera 3 (uno por plan) a partir de 2 items del spec, y otros 2 pendientes (Doc24 Pediatría y el descuento monotributista) se resuelven **no mostrando nada**, así que no llevan flag.
- **No tocar suscripciones existentes de Mercado Pago.** Está fuera de alcance.
- **Conventional commits, en español, sin `Co-Authored-By` ni atribución de IA.**

---

### Task 1: Migración de `plans` — slug, tres planes nuevos y legacy inactivo

**Repo:** `nexo-portal`

**Files:**
- Create: `supabase/migrations/20260901000001_add_slug_and_nexo_plans.sql`
- Modify: `src/lib/types.ts:3-11` (interface `Plan`)

**Interfaces:**
- Consumes: nada.
- Produces: columna `plans.slug text unique`; filas con slug `'nexo-1'` / `'nexo-2'` / `'nexo-3'`; tipo `Plan` con `slug: string | null` e `is_active: boolean`.

- [ ] **Step 1: Crear la migración**

`supabase/migrations/20260901000001_add_slug_and_nexo_plans.sql`:

```sql
-- Identificador estable de plan para consumidores externos (la landing).
-- La landing es SSG puro y no habla con Supabase: necesita un id legible y
-- versionable en su propio código, no un UUID que tendría que resolver en build.
alter table public.plans add column if not exists slug text unique;

-- Grandfathering: la fila del plan actual CONSERVA su precio ($19.500). Solo se
-- renombra, para que el socio que ya paga vea el nombre correcto del producto en
-- su credencial (CredentialCard.tsx:103), y se desactiva para que no aparezca en
-- el alta. Queda sin slug a propósito: sin slug no se puede contratar.
update public.plans
   set name = 'Nexo I', is_active = false
 where name = 'Plan Base Nexo';

insert into public.plans (slug, name, price, description, is_active) values
  ('nexo-1', 'Nexo I',   20000, 'Emergencias · Guardia odontológica · Farmacia · Doc24', true),
  ('nexo-2', 'Nexo II',  12000, 'Seguro de Salud I · Farmacia · Óptica · Doc24',         true),
  ('nexo-3', 'Nexo III',  7000, 'Seguro de Salud II · Óptica · Doc24',                   true)
on conflict (slug) do nothing;
```

- [ ] **Step 2: Aplicar la migración en el proyecto de staging de Supabase**

Run: `supabase db push` (o aplicar el SQL desde el panel de Supabase del proyecto de staging).

Expected: sin error. Verificar con:

```sql
select slug, name, price, is_active from public.plans order by is_active desc, price desc;
```

Debe devolver 4 filas: tres activas con slug (20000 / 12000 / 7000) y una inactiva sin slug a 19500 llamada "Nexo I".

- [ ] **Step 3: Actualizar el tipo `Plan`**

En `src/lib/types.ts`, reemplazar la interface `Plan` (líneas 3-11) por:

```ts
export interface Plan {
  id: string
  /** Identificador estable para consumidores externos (la landing). Null en planes legacy. */
  slug: string | null
  name: string
  description: string | null
  price: number
  /** Si es false, el plan no se ofrece en el alta. Los afiliados que ya lo tienen lo conservan. */
  is_active: boolean
  mp_plan_id: string | null
  created_at: string
  updated_at: string
}
```

- [ ] **Step 4: Verificar que compila**

Run: `npx tsc --noEmit`

Expected: sin errores nuevos. Si `admin/planes/PlansClient.tsx` rompe por los campos nuevos, NO lo arregles acá — es la Task 3.

- [ ] **Step 5: Commit**

```bash
git add supabase/migrations/20260901000001_add_slug_and_nexo_plans.sql src/lib/types.ts
git commit -m "feat(planes): agregar slug y los planes Nexo I/II/III, desactivar el legacy"
```

---

### Task 2: El alta del portal solo ofrece planes activos

**Repo:** `nexo-portal`

**Files:**
- Modify: `src/app/registro/page.tsx:7-11`

**Interfaces:**
- Consumes: `plans.is_active` (Task 1).
- Produces: nada nuevo.

Sin esto, el formulario de alta del portal muestra los cuatro planes, incluido el legacy inactivo.

- [ ] **Step 1: Filtrar por `is_active`**

En `src/app/registro/page.tsx`, la query pasa a ser:

```ts
  const { data: plans } = await supabase
    .from('plans')
    .select('id, name, price')
    // Solo los planes que se ofrecen hoy. El plan legacy sigue existiendo para los
    // afiliados que lo tienen, pero no se puede contratar.
    .eq('is_active', true)
    .order('price', { ascending: true })
```

- [ ] **Step 2: Verificar a mano**

Run: `npm run dev` y abrir `http://localhost:3000/registro`

Expected: el selector muestra exactamente tres planes — Nexo III $7.000, Nexo II $12.000, Nexo I $20.000 — y ninguno a $19.500.

- [ ] **Step 3: Commit**

```bash
git add src/app/registro/page.tsx
git commit -m "fix(registro): ofrecer solo planes activos en el alta"
```

---

### Task 3: `is_active` editable desde el admin

**Repo:** `nexo-portal`

**Files:**
- Modify: `src/app/admin/planes/PlansClient.tsx`
- Modify: `src/app/admin/planes/actions.ts`

**Interfaces:**
- Consumes: tipo `Plan` con `is_active` (Task 1).
- Produces: server action que persiste `is_active`.

La columna existe en la base desde el esquema inicial pero nunca se expuso: no aparece en `PlansClient.tsx`, ni en `actions.ts`, ni en el tipo. Este diseño depende de que el plan legacy quede inactivo, así que el equipo tiene que poder verlo y cambiarlo sin entrar a Supabase.

El admin usa server actions con `FormData` (`createPlan` / `updatePlan` en `actions.ts`) y un `<form>` no controlado con `defaultValue` en `PlansClient.tsx`. Seguí ese patrón; no introduzcas estado controlado.

- [ ] **Step 1: Agregar `slug` e `is_active` a `createPlan`**

En `src/app/admin/planes/actions.ts`, dentro de `createPlan`, después de la línea que lee `price`:

```ts
  const slug = (formData.get('slug') as string)?.trim() || null
  // Un checkbox HTML no manda nada cuando está desmarcado: ausente = inactivo.
  const isActive = formData.get('is_active') === 'on'
```

Y en el `.insert({...})`, sumar `slug` e `is_active: isActive` junto a los campos que ya están.

- [ ] **Step 2: Agregar `slug` e `is_active` a `updatePlan`**

Mismo archivo, dentro de `updatePlan`, las mismas dos líneas después de `price`. Y el `.update()` pasa a ser:

```ts
    .update({ name, description, price, slug, is_active: isActive, updated_at: new Date().toISOString() })
```

- [ ] **Step 3: Agregar los dos campos al formulario**

En `PlansClient.tsx`, dentro de `PlanForm`, después del bloque de "Descripción":

```tsx
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={labelStyle}>
            Slug
          </label>
          <input
            name="slug"
            type="text"
            defaultValue={plan?.slug ?? ''}
            placeholder="nexo-1"
            className="w-full px-4 py-2.5 rounded-xl text-sm"
            style={inputStyle}
          />
          <p className="mt-1.5 text-xs" style={labelStyle}>
            Identificador que usa la landing. Sin slug, el plan no se puede contratar desde la web.
          </p>
        </div>
        <div className="flex items-start pt-7">
          <label className="flex items-center gap-2.5 text-sm cursor-pointer" style={labelStyle}>
            <input
              name="is_active"
              type="checkbox"
              defaultChecked={plan?.is_active ?? true}
              className="w-4 h-4"
            />
            Se ofrece en el alta
          </label>
        </div>
      </div>
```

- [ ] **Step 4: Marcar visualmente los planes inactivos en el listado**

En el listado de planes de `PlansClient.tsx`, cada fila muestra su estado. Agregá el badge donde se renderiza el nombre del plan:

```tsx
              {!plan.is_active && (
                <span
                  className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: 'rgba(251,146,60,0.15)', color: '#fb923c' }}
                >
                  Inactivo
                </span>
              )}
```

- [ ] **Step 5: Verificar a mano**

Run: `npm run dev` y abrir `http://localhost:3000/admin/planes`

Expected: se ven los 4 planes; el legacy a $19.500 aparece con el badge "Inactivo"; al desactivar y reactivar un plan el cambio persiste tras recargar; editar un plan **no le borra el slug**; el conteo de afiliados por plan (que esa pantalla ya muestra) sigue funcionando.

- [ ] **Step 6: Commit**

```bash
git add src/app/admin/planes/
git commit -m "feat(admin-planes): permitir activar y desactivar planes"
```

---

### Task 4: `GET /api/planes` — endpoint público de precios

**Repo:** `nexo-portal`

**Files:**
- Create: `src/app/api/planes/route.ts`

**Interfaces:**
- Consumes: `plans.slug`, `plans.is_active` (Task 1).
- Produces: `GET /api/planes` → `{ planes: Array<{ slug: string; name: string; price: number }> }`. Lo consume `scripts/check-precios.mjs` (Task 9).

- [ ] **Step 1: Mirar cómo maneja CORS otra ruta pública**

Run: `cat src/lib/cors.ts && head -30 src/app/api/leads/route.ts`

La landing corre en otro dominio, así que este endpoint necesita el mismo tratamiento de CORS que `/api/leads`. Reusá el helper que ya existe; no escribas headers a mano.

- [ ] **Step 2: Crear la ruta**

`src/app/api/planes/route.ts`:

```ts
import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

/**
 * Precios públicos de los planes vigentes. Es la misma información que ya está
 * publicada en la landing, por eso no lleva auth.
 *
 * NO expone el UUID: el único identificador que cruza el límite hacia la landing
 * es el slug. Así la landing no depende de Supabase ni en build ni en runtime.
 */
export async function GET() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('plans')
    .select('slug, name, price')
    .eq('is_active', true)
    .not('slug', 'is', null)
    .order('price', { ascending: false })

  if (error) {
    return NextResponse.json({ error: 'No se pudieron leer los planes' }, { status: 500 })
  }

  return NextResponse.json({ planes: data ?? [] })
}
```

Aplicá encima el patrón de CORS que viste en el Step 1.

- [ ] **Step 3: Verificar**

Run: `npm run dev` y en otra terminal `curl -s http://localhost:3000/api/planes | jq`

Expected:

```json
{ "planes": [
  { "slug": "nexo-1", "name": "Nexo I",   "price": 20000 },
  { "slug": "nexo-2", "name": "Nexo II",  "price": 12000 },
  { "slug": "nexo-3", "name": "Nexo III", "price": 7000  }
] }
```

Sin el plan legacy (no tiene slug y está inactivo) y sin ningún UUID en la respuesta.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/planes/route.ts
git commit -m "feat(api): exponer los precios de los planes vigentes"
```

---

### Task 5: `PATCH /api/leads/[id]` acepta `plan_slug`

**Repo:** `nexo-portal`

**Files:**
- Modify: `src/app/api/leads/[id]/route.ts:20-45` (interface `FinalizeLeadInput`), `:100` (destructuring), `:199-202` (query del plan)

**Interfaces:**
- Consumes: `plans.slug` (Task 1).
- Produces: el body del `PATCH` acepta `plan_slug?: string`. Lo usa `Onboarding.tsx` (Task 8).

Esta es la tarea que evita el bug central: hoy, si no llega plan, el backend cae a `.order('price').limit(1)` — el plan más barato.

- [ ] **Step 1: Agregar `plan_slug` a la interface**

En `FinalizeLeadInput` (línea ~29), debajo de `plan_id?: string`:

```ts
  plan_id?: string
  /**
   * Identificador estable del plan, que manda la landing. La landing es SSG puro
   * y no conoce los UUID de Supabase: se resuelve acá del lado del servidor.
   * `plan_id` se mantiene porque RegistroForm.tsx (portal) ya lo manda.
   */
  plan_slug?: string
```

- [ ] **Step 2: Sumarlo al destructuring**

En la línea ~100, agregar `plan_slug` a la lista de campos que salen de `body`.

- [ ] **Step 3: Resolver el plan por slug**

Reemplazar el bloque de las líneas ~199-202 por:

```ts
  // Precedencia: plan_id (portal) → plan_slug (landing) → el más barato.
  // El fallback al más barato es el comportamiento histórico y se conserva por
  // compatibilidad, pero con tres planes en venta es peligroso: quien llegue sin
  // plan termina pagando $7.000. Por eso la landing SIEMPRE manda plan_slug.
  const planQuery = () => supabase.from('plans').select('id, name, price')
  const { data: plan } = plan_id
    ? await planQuery().eq('id', plan_id).maybeSingle()
    : plan_slug
      ? await planQuery().eq('slug', plan_slug).eq('is_active', true).maybeSingle()
      : await planQuery().order('price', { ascending: true }).limit(1).maybeSingle()
```

`planQuery` pasa a ser una función: el query builder de Supabase es mutable y encadenar dos ramas sobre la misma instancia arrastra filtros entre ellas.

- [ ] **Step 4: Verificar los tres caminos con curl**

Creá un lead de prueba y probá el `PATCH` con `plan_slug: "nexo-1"`.

Expected: en la respuesta, la suscripción de MP se crea por **$20.000**, no por $7.000. Confirmalo en el log del servidor o en el panel de Mercado Pago de prueba.

Probá también con un slug inexistente (`plan_slug: "nexo-99"`).

Expected: `plan` queda `null` y cae al default de `?? 19500` que ya existía en la línea ~221. No debe romper con un 500.

- [ ] **Step 5: Commit**

```bash
git add "src/app/api/leads/[id]/route.ts"
git commit -m "feat(api-leads): aceptar plan_slug para resolver el plan desde la landing"
```

---

### Task 6: Datos comerciales de los planes en la landing

**Repo:** `Nexo 2.0 V9`

**Files:**
- Create: `src/app/data/planes.ts`

**Interfaces:**
- Consumes: nada.
- Produces: `type Estado`, `interface Prestacion`, `interface PlanComercial`, `interface ServicioOnDemand`, `const PLANES: PlanComercial[]`, `const ON_DEMAND: ServicioOnDemand[]`, `function formatearMiles(n: number): string`. Los usan `Planes.tsx` (Task 7), `ALaCarta.tsx` (Task 7), `App.tsx` (Task 8) y `check-precios.mjs` (Task 9).

- [ ] **Step 1: Escribir el archivo completo**

`src/app/data/planes.ts`:

```ts
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
 * Coseguros de Doc24 según la aclaración de Javier Talarn (Slack, 2026-08-31):
 * "en nexo ii que sale $12.000 tiene cubierta una consulta de clinica sin cargo,
 * y el resto a $18.000 (pediatria igual pero como no vendemos a menores no va a
 * aplicar). en nexo iii, tiene una cobertura a $10.000 y el resto a 18.000. Y
 * psicologia todo igual."
 *
 * Doc24 Pediatría NO se lista: no se vende a menores, así que ningún socio puede
 * usarla. Publicarla genera reclamos de posventa.
 */
const PSICOLOGIA: Prestacion = {
  label: 'Doc24 · Psicología',
  estado: 'coseguro',
  detalle: '1 sesión a $15.000 · luego $30.000',
};

export const PLANES: PlanComercial[] = [
  {
    slug: 'nexo-1',
    nombre: 'Nexo I',
    precio: 20000,
    bajada: 'La cobertura completa: emergencias, odontología y farmacia.',
    recomendado: true,
    prestaciones: [
      { label: 'Emergencias médicas', estado: 'incluido' },
      { label: 'Guardia odontológica', estado: 'incluido' },
      { label: 'Farmacia', estado: 'incluido' },
      // El documento de producto no lista Óptica en Nexo I, pero sí en II y III,
      // que son más baratos. Probable omisión en el origen. A confirmar.
      { label: 'Óptica', estado: 'no-incluido', pendiente: true },
      { label: 'Doc24 · Clínica', estado: 'coseguro', detalle: '1 consulta sin cargo · luego $18.000' },
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
      { label: 'Farmacia', estado: 'incluido' },
      { label: 'Óptica', estado: 'incluido', pendiente: true },
      { label: 'Médico a domicilio', estado: 'incluido', pendiente: true },
      { label: 'Doc24 · Clínica', estado: 'coseguro', detalle: '1 consulta sin cargo · luego $18.000' },
      PSICOLOGIA,
      { label: 'Emergencias médicas', estado: 'no-incluido' },
      { label: 'Guardia odontológica', estado: 'no-incluido' },
    ],
  },
  {
    slug: 'nexo-3',
    nombre: 'Nexo III',
    precio: 7000,
    bajada: 'La puerta de entrada: seguro de salud y telemedicina.',
    prestaciones: [
      { label: 'Seguro de Salud II', estado: 'incluido', detalle: 'Alta complejidad, enfermedades graves y rehabilitación' },
      { label: 'Óptica', estado: 'incluido', pendiente: true },
      { label: 'Doc24 · Clínica', estado: 'coseguro', detalle: 'Cobertura de $10.000 · luego $18.000' },
      PSICOLOGIA,
      { label: 'Emergencias médicas', estado: 'no-incluido' },
      { label: 'Guardia odontológica', estado: 'no-incluido' },
      { label: 'Farmacia', estado: 'no-incluido' },
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
  { id: 'arbol-de-vida', nombre: 'Árbol de Vida', precio: 5000, detalle: 'Sepelio, cremación ecológica y parcela con árbol' },
  { id: 'hogar-1', nombre: 'Seguro de Hogar · hasta 1er piso', precio: 19000, detalle: 'Casas, PB y 1er piso · Solo en Rosario' },
  { id: 'hogar-2', nombre: 'Seguro de Hogar · 2do piso +', precio: 22000, detalle: 'Dentro y fuera de Rosario' },
  // El precio viene del documento con un comentario interno pegado: "chequear
  // lista de precio de vendedores me parece q esta mal". Sin confirmar.
  { id: 'vida', nombre: 'Seguro de Vida', precio: 2750, detalle: 'Suma asegurada $3.162.500', pendiente: true },
];
```

- [ ] **Step 2: Verificar que tipa**

Run: `npx tsc --noEmit`

Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/app/data/planes.ts
git commit -m "feat(planes): agregar los datos comerciales de Nexo I, II y III"
```

---

### Task 7: Componente `Planes` y actualización de `ALaCarta`

**Repo:** `Nexo 2.0 V9`

**Files:**
- Create: `src/app/components/Planes.tsx`
- Modify: `src/app/components/ALaCarta.tsx:18-60` (el array `services`)
- Reference: `git show netlify-planes-preview:src/app/components/MenuLanding.tsx` (de ahí sale el diseño de card a reusar)

**Interfaces:**
- Consumes: `PLANES`, `ON_DEMAND`, `formatearMiles`, `Prestacion`, `PlanComercial` de `@/app/data/planes` (Task 6).
- Produces: `export function Planes({ onElegirPlan }: { onElegirPlan: (slug: string) => void })`. Lo monta `App.tsx` (Task 8).

- [ ] **Step 1: Leer la card de referencia**

Run: `git show netlify-planes-preview:src/app/components/MenuLanding.tsx | sed -n '778,900p'`

Es `PlanCardItem`: card blanca, `rounded-3xl`, barra de gradiente y chip "Recomendado" arriba, precio en `DM_Serif_Display` con gradiente recortado, lista de prestaciones, CTA al pie. Reusá ese lenguaje visual. **No traslades** el bloque de descuento monotributista (spec, pendiente #6) ni los campos `range` / `segment` / `incentive`, que son de la segmentación vieja por edad.

- [ ] **Step 2: Escribir `Planes.tsx`**

`src/app/components/Planes.tsx`. Estructura obligatoria:

```tsx
import { Check, Percent, X } from 'lucide-react';
import { PLANES, formatearMiles, type Prestacion, type PlanComercial } from '@/app/data/planes';
import { Button } from './ui/button';

const NEXO_PURPLE = '#8660ef';
const NEXO_PINK = '#ee5cd0';
const NEXO_GRADIENT = 'linear-gradient(135deg, #8660ef, #ee5cd0)';
/** Rojo de revisión: marca datos que el cliente todavía no confirmó. */
const PENDIENTE_ROJO = '#dc2626';

/**
 * Cada estado tiene ícono y color propios. `no-incluido` se muestra tachado y en
 * gris: tiene que leerse como "esto NO lo tenés", no como una línea más de la lista.
 */
function IconoEstado({ p }: { p: Prestacion }) {
  const color = p.pendiente ? PENDIENTE_ROJO : p.estado === 'incluido' ? NEXO_PURPLE : NEXO_PINK;
  if (p.estado === 'no-incluido') return <X className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#c4c4c4' }} />;
  if (p.estado === 'coseguro') return <Percent className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} />;
  return <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} />;
}

function PrestacionItem({ p }: { p: Prestacion }) {
  const esNo = p.estado === 'no-incluido';
  return (
    <li className="flex items-start gap-2.5 text-sm leading-snug">
      <IconoEstado p={p} />
      <span style={{
        color: p.pendiente ? PENDIENTE_ROJO : esNo ? '#c4c4c4' : '#3d3d3d',
        textDecoration: esNo ? 'line-through' : 'none',
      }}>
        {p.label}
        {p.detalle && <span className="block text-[13px] text-[#8c8c8c]">{p.detalle}</span>}
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
```

**El `id="beneficios"` no es decorativo:** `App.tsx:110` mide `document.getElementById('beneficios').offsetTop` para decidir cuándo esconder el CTA de mobile. Ese id lo aportaba `PlanBase`; si se pierde, `planBaseTop` queda en `Infinity` y el CTA flotante nunca se oculta.

- [ ] **Step 3: Agregar la lista de precios On Demand a `ALaCarta.tsx`**

**No reemplaces el array `services`.** Son cosas distintas: `services` son 3 cards con fotografía real y títulos de teaser ("Más opciones", "Más bienestar para vos"), y solo existen 3 imágenes para 5 servicios On Demand. Meter los precios ahí a la fuerza rompe el bloque y deja dos servicios sin imagen.

En su lugar, agregá un bloque de precios **debajo** del grid de cards, antes del cierre de la `<section>`:

```tsx
      {/* Precios de los servicios que se contratan aparte de la cuota. El grid de
          arriba es un teaser con fotografía; esto es el dato concreto. */}
      <div className="mx-auto mt-12 max-w-2xl px-5">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--purple)]">
          Servicios on demand
        </p>
        <p className="mx-auto mt-3 max-w-[440px] text-center text-sm text-[var(--gray-500)]">
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
                  style={{ color: s.pendiente ? '#dc2626' : 'var(--gray-700)' }}
                >
                  {s.nombre}
                </span>
                <span className="block text-[13px] text-[var(--gray-500)]">{s.detalle}</span>
              </span>
              <span
                className="shrink-0 whitespace-nowrap text-sm font-bold"
                style={{ color: s.pendiente ? '#dc2626' : 'var(--gray-900)' }}
              >
                ${formatearMiles(s.precio)}/mes
              </span>
            </li>
          ))}
        </ul>
      </div>
```

Y el import arriba del archivo:

```tsx
import { ON_DEMAND, formatearMiles } from '@/app/data/planes';
```

- [ ] **Step 4: Verificar el build**

Run: `npm run build`

Expected: build exitoso, sin warnings de hidratación.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/Planes.tsx src/app/components/ALaCarta.tsx
git commit -m "feat(landing): comparativa de los tres planes y servicios on demand reales"
```

---

### Task 8: Cablear el plan elegido de la card hasta el PATCH

**Repo:** `Nexo 2.0 V9`

**Files:**
- Modify: `src/app/App.tsx:1-20` (imports), `:65-71` (`goToRegistro`), `:142-165` (render)
- Modify: `src/app/components/Onboarding.tsx:125` (firma), `:354+` (body del PATCH)
- Modify: `src/app/components/Footer.tsx` — solo la llamada en `App.tsx`
- Delete: `src/app/components/PlanBase.tsx`

**Interfaces:**
- Consumes: `Planes` (Task 7), `PLANES` (Task 6), `plan_slug` en el PATCH (Task 5).
- Produces: `Onboarding` acepta `planSlug?: string`.

Es la tarea que cierra el bug del cobro. **El wizard sigue teniendo 6 pasos**: no se toca `Step`, ni `STEP_TO_PATH`, ni `PATH_TO_STEP`, ni el indicador de puntos, ni `trackStepView`. Renumerar rompería los deep links en la calle, la serie de GA4 y los leads guardados a mitad de embudo.

- [ ] **Step 1: Estado del plan + una función separada para las cards**

En `App.tsx`, agregar el estado y una **segunda** función. `goToRegistro` NO cambia de firma.

```tsx
  // Plan elegido en la card. Viaja hasta el PATCH del onboarding para que MP cobre
  // el precio correcto. Si alguien entra por /onboarding directo (deep link, sin
  // pasar por una card), queda 'nexo-1': el backend, sin plan, cae al MÁS BARATO,
  // y cobrarle $7.000 a quien quiso el de $20.000 es peor que asumir el principal.
  const [planSlug, setPlanSlug] = useState<string>('nexo-1');

  // goToRegistro queda SIN parámetros a propósito. Navigation.tsx:99,
  // IPhoneCTA.tsx:37 y ComoFunciona.tsx:203 la pasan como `onClick={onOpenCheckout}`
  // sin envolver, así que React le inyecta el MouseEvent como primer argumento.
  // Si aceptara un slug opcional, esas tres CTAs guardarían un evento del DOM como
  // plan, ningún plan matchearía, y el cobro caería al más barato: justo el bug que
  // esta entrega viene a cerrar.
  const goToRegistro = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.history.pushState({}, '', '/onboarding/afiliado');
    setPathname('/onboarding/afiliado');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  /** Entrada desde una card de plan: fija el plan y arranca el alta. */
  const elegirPlan = useCallback((slug: string) => {
    setPlanSlug(slug);
    goToRegistro();
  }, [goToRegistro]);
```

Las CTAs genéricas (Hero, Navigation, ComoFunciona, IPhoneCTA) siguen usando `goToRegistro` sin ningún cambio y caen al default `'nexo-1'`.

- [ ] **Step 2: Montar `Planes` y pasar el slug al `Onboarding`**

En `App.tsx`: cambiar el import de `PlanBase` por `Planes`, reemplazar `<PlanBase />` por `<Planes onElegirPlan={elegirPlan} />` (la función nueva del Step 1, **no** `goToRegistro`), y en el retorno temprano del onboarding (línea ~142):

```tsx
  if (isOnboarding) {
    return <Onboarding onClose={goToLanding} planSlug={planSlug} />;
  }
```

- [ ] **Step 3: `Onboarding` recibe y manda el slug**

En `Onboarding.tsx`, la firma (línea 125):

```tsx
export function Onboarding({ onClose, planSlug }: { onClose: () => void; planSlug?: string }) {
```

Y en el body del `PATCH` dentro de `callFinalizeLead`, agregar junto a los demás campos:

```ts
        plan_slug: planSlug,
```

- [ ] **Step 4: Footer con los tres planes**

`Footer.tsx:200` ya acepta la prop `servicios`. En `App.tsx`:

```tsx
      <Footer servicios={PLANES.map((p) => ({ href: `#plan-${p.slug}`, label: p.nombre }))} />
```

- [ ] **Step 5: Borrar `PlanBase.tsx`**

Run: `grep -rn "PlanBase" src/`

Expected: sin resultados fuera del propio archivo. Entonces: `rm src/app/components/PlanBase.tsx`

Si `grep` devuelve algo más, resolvelo antes de borrar.

- [ ] **Step 6: Verificar el flujo completo de punta a punta**

Run: `npm run build && npm run dev`

Expected, en este orden:
1. La home muestra las tres cards. `PlanBase` ya no aparece.
2. Clic en "Afiliarme" de **Nexo III** ($7.000) → completar el alta → el checkout de MP dice **$7.000**.
3. Repetir con **Nexo I** → el checkout dice **$20.000**. *Esta es la verificación que justifica toda la tarea.*
4. Entrar directo a `/onboarding/afiliado` sin pasar por una card → el checkout dice **$20.000** (default `nexo-1`), no $7.000.
5. Los deep links viejos (`/onboarding/dni`, `/onboarding/pago`) siguen abriendo el paso correcto.
6. El CTA flotante de mobile se oculta al llegar a la sección de planes (verifica que el `id="beneficios"` sobrevivió).

- [ ] **Step 7: Commit**

```bash
git add src/app/App.tsx src/app/components/Onboarding.tsx
git rm src/app/components/PlanBase.tsx
git commit -m "feat(alta): enviar el plan elegido en la card hasta el cobro de MP"
```

---

### Task 9: Verificación de precios landing ↔ portal

**Repo:** `Nexo 2.0 V9`

**Files:**
- Create: `scripts/check-precios.mjs`
- Create: `scripts/check-precios.test.mjs`
- Create: `.github/workflows/check-precios.yml`
- Modify: `package.json` (scripts `test` y `check:precios`)

**Interfaces:**
- Consumes: `PLANES` de `src/app/data/planes.ts` (Task 6), `GET /api/planes` (Task 4).
- Produces: `export function compararPlanes(locales, remotos): string[]` — devuelve la lista de discrepancias, vacía si todo coincide.

El repo **no tiene infraestructura de tests**. No se instala ningún framework: `node --test` es nativo y el `package.json` ya es `"type": "module"`. La lógica de comparación se testea porque es pura y es la que cubre el riesgo real (que la landing diga $20.000 mientras MP cobra otra cosa); el resto del script es E/S.

- [ ] **Step 1: Escribir el test que falla**

`scripts/check-precios.test.mjs`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compararPlanes, extraerPlanesLocales } from './check-precios.mjs';

test('sin discrepancias cuando los precios coinciden', () => {
  const locales = [{ slug: 'nexo-1', precio: 20000 }];
  const remotos = [{ slug: 'nexo-1', price: 20000 }];
  assert.deepEqual(compararPlanes(locales, remotos), []);
});

test('detecta un precio distinto', () => {
  const locales = [{ slug: 'nexo-1', precio: 20000 }];
  const remotos = [{ slug: 'nexo-1', price: 19500 }];
  const errores = compararPlanes(locales, remotos);
  assert.equal(errores.length, 1);
  assert.match(errores[0], /nexo-1/);
  assert.match(errores[0], /20000/);
  assert.match(errores[0], /19500/);
});

test('detecta un plan de la landing que el portal no tiene', () => {
  const errores = compararPlanes([{ slug: 'nexo-9', precio: 100 }], []);
  assert.equal(errores.length, 1);
  assert.match(errores[0], /no existe en el portal/);
});

test('detecta un plan activo del portal que la landing no muestra', () => {
  const errores = compararPlanes([], [{ slug: 'nexo-2', price: 12000 }]);
  assert.equal(errores.length, 1);
  assert.match(errores[0], /no se muestra en la landing/);
});

test('acumula varias discrepancias a la vez', () => {
  const locales = [{ slug: 'nexo-1', precio: 20000 }, { slug: 'nexo-9', precio: 1 }];
  const remotos = [{ slug: 'nexo-1', price: 19500 }, { slug: 'nexo-3', price: 7000 }];
  assert.equal(compararPlanes(locales, remotos).length, 3);
});

test('extrae los planes ignorando la unión de tipos del interface', () => {
  const fuente = `
export interface PlanComercial {
  slug: 'nexo-1' | 'nexo-2' | 'nexo-3';
  precio: number;
}
export const PLANES: PlanComercial[] = [
  { slug: 'nexo-1', nombre: 'Nexo I', precio: 20000 },
  { slug: 'nexo-2', nombre: 'Nexo II', precio: 12000 },
];
export const ON_DEMAND = [
  { id: 'vida', nombre: 'Seguro de Vida', precio: 2750 },
];
`;
  assert.deepEqual(extraerPlanesLocales(fuente), [
    { slug: 'nexo-1', precio: 20000 },
    { slug: 'nexo-2', precio: 12000 },
  ]);
});

test('no devuelve nada si el archivo no tiene el bloque PLANES', () => {
  assert.deepEqual(extraerPlanesLocales('export const OTRA_COSA = [];'), []);
});
```

- [ ] **Step 2: Correr el test y confirmar que falla**

Run: `node --test scripts/`

Expected: FAIL — `Cannot find module './check-precios.mjs'`.

- [ ] **Step 3: Escribir el script**

`scripts/check-precios.mjs`:

```js
/**
 * Falla si los precios de `src/app/data/planes.ts` no coinciden con los que el
 * portal cobra realmente. El precio es el ÚNICO dato que la landing y el portal
 * comparten, y desincronizarlo significa publicar un precio y cobrar otro.
 *
 * Corre en CI, NO en el build: si el portal está caído, el deploy de la landing
 * igual tiene que salir. Lo que no sale es un merge con precios desfasados.
 */

/** Compara los planes locales contra los del portal. Devuelve las discrepancias. */
export function compararPlanes(locales, remotos) {
  const errores = [];
  const porSlug = new Map(remotos.map((r) => [r.slug, r]));

  for (const local of locales) {
    const remoto = porSlug.get(local.slug);
    if (!remoto) {
      errores.push(`"${local.slug}" está en la landing pero no existe en el portal como plan activo.`);
      continue;
    }
    if (remoto.price !== local.precio) {
      errores.push(`"${local.slug}": la landing dice ${local.precio} y el portal cobra ${remoto.price}.`);
    }
  }

  const slugsLocales = new Set(locales.map((l) => l.slug));
  for (const remoto of remotos) {
    if (!slugsLocales.has(remoto.slug)) {
      errores.push(`"${remoto.slug}" está activo en el portal pero no se muestra en la landing.`);
    }
  }

  return errores;
}

/**
 * Lee los precios del archivo de datos sin compilar TypeScript: extrae los pares
 * slug/precio con una regex. Evita sumar un transpilador solo para este chequeo.
 *
 * Se acota primero al bloque `export const PLANES`: el `interface PlanComercial`
 * declara `slug: 'nexo-1' | 'nexo-2' | 'nexo-3'`, que la regex también matchearía.
 * Sobre el archivo entero devolvía lo correcto de casualidad; acotado, no depende
 * de la suerte.
 */
export function extraerPlanesLocales(fuente) {
  const inicio = fuente.indexOf('export const PLANES');
  if (inicio === -1) return [];
  const fin = fuente.indexOf('export const ON_DEMAND', inicio);
  const bloque = fuente.slice(inicio, fin === -1 ? undefined : fin);

  const planes = [];
  const re = /slug:\s*'([^']+)'[\s\S]*?precio:\s*(\d+)/g;
  let m;
  while ((m = re.exec(bloque)) !== null) {
    planes.push({ slug: m[1], precio: Number(m[2]) });
  }
  return planes;
}

// Solo corre la parte de E/S cuando se invoca directo, no cuando lo importa el test.
if (process.argv[1] && process.argv[1].endsWith('check-precios.mjs')) {
  const { readFileSync } = await import('node:fs');
  const apiUrl = process.env.NEXO_API_URL ?? 'https://nexo.portal.previncasalud.com.ar';

  const fuente = readFileSync(new URL('../src/app/data/planes.ts', import.meta.url), 'utf8');
  const locales = extraerPlanesLocales(fuente);

  if (locales.length === 0) {
    console.error('✖ No se pudo leer ningún plan de src/app/data/planes.ts');
    process.exit(1);
  }

  const res = await fetch(`${apiUrl}/api/planes`);
  if (!res.ok) {
    console.error(`✖ El portal respondió ${res.status} en ${apiUrl}/api/planes`);
    process.exit(1);
  }
  const { planes: remotos } = await res.json();

  const errores = compararPlanes(locales, remotos);
  if (errores.length > 0) {
    console.error('✖ Precios desincronizados entre la landing y el portal:\n');
    for (const e of errores) console.error(`  · ${e}`);
    process.exit(1);
  }

  console.log(`✔ ${locales.length} planes con precios sincronizados.`);
}
```

- [ ] **Step 4: Correr el test y confirmar que pasa**

Run: `node --test scripts/`

Expected: PASS, 7 de 7.

- [ ] **Step 5: Agregar los scripts al `package.json`**

```json
  "scripts": {
    "build": "vite-react-ssg build",
    "dev": "vite-react-ssg dev",
    "test": "node --test scripts/",
    "check:precios": "node scripts/check-precios.mjs"
  }
```

- [ ] **Step 6: Probar el script contra el portal real**

Run: `NEXO_API_URL=http://localhost:3000 npm run check:precios` (con el portal corriendo)

Expected: `✔ 3 planes con precios sincronizados.`

Después, cambiá a mano el precio de Nexo I a `20001` en `planes.ts` y volvé a correrlo.

Expected: exit code 1 y el mensaje de discrepancia. **Revertí el cambio.**

- [ ] **Step 7: Crear el workflow de CI**

El repo no tiene `.github/`. `.github/workflows/check-precios.yml`:

```yaml
name: Precios sincronizados

on:
  pull_request:
    paths:
      - 'src/app/data/planes.ts'
      - 'scripts/check-precios.mjs'

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: node --test scripts/
      - run: node scripts/check-precios.mjs
        env:
          NEXO_API_URL: ${{ vars.NEXO_API_URL }}
```

Es un check de PR, no un paso del build: el deploy de la landing no depende de que el portal esté arriba.

- [ ] **Step 8: Commit**

```bash
git add scripts/ .github/ package.json
git commit -m "test(precios): verificar que la landing y el portal cobran lo mismo"
```

---

### Task 10: Deploy a staging y revisión con el cliente

**Repo:** ambos

**Files:** ninguno nuevo.

**Interfaces:**
- Consumes: todas las tareas anteriores.
- Produces: URL de staging para revisar con el cliente.

- [ ] **Step 1: Verificación final en la landing**

Run: `npm run build && npm run test`

Expected: build limpio y 7 tests en verde.

- [ ] **Step 2: Confirmar que ningún dato pendiente se coló como confirmado**

Run: `grep -n "pendiente: true" src/app/data/planes.ts`

Expected: exactamente **5** resultados — Óptica en los tres planes (3), Médico a Domicilio en Nexo II (1), y el Seguro de Vida (1). Si son menos, alguien confirmó un dato sin dejar registro; si son más, revisá cuál se agregó.

Verificá también que los dos pendientes que se resuelven por omisión siguen omitidos:

Run: `grep -in "pediatr\|monotribut" src/app/data/planes.ts`

Expected: solo los comentarios que explican por qué no están. Ninguna entrada de `PLANES` con esos datos.

- [ ] **Step 3: Mergear el portal a `staging` y desplegar**

El portal tiene que salir **antes** que la landing: la landing manda `plan_slug` y sin la Task 5 desplegada ese campo se ignora y el cobro cae al plan más barato.

- [ ] **Step 4: Mergear la landing a `staging` y desplegar**

- [ ] **Step 5: Prueba de humo en staging**

Con la URL de staging real:
1. Las tres cards se ven bien en mobile (375px) y desktop.
2. Los `no-incluido` se leen como no incluidos: tachados y en gris, no como una prestación más.
3. Los pendientes están en rojo y son fáciles de señalar en una llamada.
4. Un alta completa con Nexo I llega a Mercado Pago por **$20.000**.
5. `/admin/planes` muestra los 4 planes con el legacy inactivo.

- [ ] **Step 6: Pasarle al cliente la lista de pendientes**

Los seis puntos de la sección "⚠️ Datos sin confirmar" del spec. Sin esas respuestas esto **no puede pasar a producción**: hay prestaciones publicadas que nadie confirmó que existan.

---

## Cierre

Al terminar las 10 tareas: los tres planes están en staging, el plan elegido llega intacto al cobro, y la entrega 2 (portal diferenciado por plan, tabla `plan_services`) ya está especificada en el spec para arrancar sin re-discutir el modelo.
