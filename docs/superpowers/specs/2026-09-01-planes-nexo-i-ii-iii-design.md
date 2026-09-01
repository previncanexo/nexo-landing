# Diseño: Planes Nexo I / II / III

**Fecha:** 2026-09-01
**Proyectos:** `Nexo 2.0 V9` (landing) + `nexo-portal` (portal)
**Rama:** `feat/planes-nexo-i-ii-iii` (desde `staging`)
**Estado:** Aprobado en brainstorming. Sin implementar.

## Contexto

Nexo pasa de vender un producto único a vender tres: **Nexo I ($20.000)**, **Nexo II
($12.000)** y **Nexo III ($7.000)**. Nexo I es el plan que ya se vende (hoy "Plan Base Nexo"
a $19.500), reposicionado y con precio nuevo. II y III son nuevos, más baratos, y **quitan
prestaciones** en vez de agregarlas.

El objetivo final es que el portal muestre servicios distintos según el plan contratado. Este
diseño divide eso en dos entregas: la landing primero (para poder validar precios y
prestaciones con el cliente esta semana), el portal después.

Fuente de los datos: seis capturas en `Nuevos servicios/` (documento de producto del cliente +
un hilo de Slack entre josefina y Javier Talarn del 2026-08-31).

## Hallazgos del código (verificados)

Lo que ya existe y no hay que construir:

- **`plans` es multi-plan desde el día uno.** `supabase/migrations/20260519000001_initial_schema.sql:8`
  define la tabla con `is_active`; `affiliates.plan_id` y `leads.plan_id` la referencian. Hoy
  tiene una sola fila.
- **El alta ya soporta varios planes.** `nexo-portal/src/app/registro/RegistroForm.tsx:546`
  tiene `hasMultiplePlans` y renderiza el selector cuando hay más de uno.
- **Mercado Pago no necesita plan templates.** `registro/actions.ts:158` y
  `api/leads/[id]/route.ts:242` crean la `PreApproval` con `transaction_amount: plan.price`
  dinámico. Agregar planes no requiere tocar nada en MP.
- **`PATCH /api/leads/[id]` ya acepta `plan_id`** (`route.ts:29,100,200-202`).
- **`MenuLanding.tsx`** (rama `netlify-planes-preview`) es un prototipo de landing de 3 planes
  con otra segmentación (por edad: Joven/Activo, $12.900/$16.900). No se usa tal cual, pero su
  lenguaje visual de cards y su flag `pending` (`MenuLanding.tsx:200`) se reusan.

Lo que está roto o falta:

- **`Onboarding.tsx:302` nunca manda `plan_id`.** Al no llegar, el portal cae a
  `.order('price', { ascending: true }).limit(1)` — el plan **más barato**. Con un solo plan
  es inocuo; con tres, todo el que elija Nexo I terminaría pagando $7.000 en MP. Es el riesgo
  más serio de esta entrega.
- **`registro/page.tsx:9` no filtra `is_active`.** Al agregar planes, el formulario de alta
  del portal mostraría también el plan legacy.
- **`ServiceCards.tsx` no mira el plan.** Muestra los 8 servicios a todo afiliado con
  `status === 'active'` (gate en `portal/page.tsx:196`). Es el hueco que resuelve la entrega 2.

## Datos de producto

### Planes

| | Nexo I | Nexo II | Nexo III |
|---|---|---|---|
| Precio | $20.000/mes | $12.000/mes | $7.000/mes |
| Emergencias | Incluido | — | — |
| Guardia Odontológica | Incluido | — | — |
| Farmacia | Incluido | Incluido | — |
| Óptica | — ⚠️ | Incluido ⚠️ | Incluido ⚠️ |
| Seguro de Salud | — | Salud I ($6.000 c/IVA) | Salud II ($4.000 c/IVA) |
| Doc24 Clínica | 1 sin cargo, resto $18.000 | 1 sin cargo, resto $18.000 | cobertura $10.000, resto $18.000 |
| Doc24 Psicología | 1 a $15.000, resto $30.000 | 1 a $15.000, resto $30.000 | 1 a $15.000, resto $30.000 |
| Doc24 Pediatría | no aplica ⚠️ | no aplica ⚠️ | no aplica ⚠️ |
| Médico a Domicilio | — | Incluido ⚠️ | — |

Los coseguros de Doc24 salen de la aclaración de Javier Talarn en Slack, que es más precisa
que el cuadro: *"en nexo ii que sale $12.000 tiene cubierta una consulta de clinica sin cargo,
y el resto a $18.000 (pediatria igual pero como no vendemos a menores no va a aplicar). en
nexo iii, tiene una cobertura a $10.000 y el resto a 18.000. Y psicologia todo igual."*

### Servicios On Demand (fuera de la cuota)

| Servicio | Precio |
|---|---|
| Seguro de Salud I | $6.000/mes |
| Árbol de Vida (sepelio + cremación + árbol) | $5.000/mes |
| Seguro de Hogar — hasta 1er piso | $19.000/mes |
| Seguro de Hogar — 2do piso + | $22.000/mes |
| Seguro de Vida — suma asegurada $3.162.500 | $2.750/mes ⚠️ |

**Nota:** la captura lista "Seguro de Hogar I" dos veces, a $19.000 y $22.000. No es un error
de precio: son los dos planes ya implementados en el portal como `hasta_1er_piso` y
`segundo_piso_plus` (ver `nexo-portal/docs/superpowers/specs/2026-06-30-seguro-hogar-design.md`).
Solo hay que nombrarlos bien.

### ⚠️ Datos sin confirmar

Se publican en staging marcados en rojo (`pendiente: true`), nunca en producción sin
confirmación del cliente:

1. **Óptica** — no hay detalle de cobertura. josefina lo pidió en Slack y Javier lo delegó a
   Franco Petrone y Martín Iannuzzi; todavía no llegó.
2. **Óptica no figura en Nexo I** pero sí en II y III, que son más baratos. Probable omisión en
   la lista de origen. Confirmar.
3. **Seguro de Vida $2.750** — la celda de precio trae pegado un comentario interno:
   *"chequear lista de precio de vendedores me parece q esta mal"*. No se publica ese texto.
4. **Médico a Domicilio (Nexo II)** — el cuadro dice cant. cubierta 0, valor cubierto $0, valor
   no cubierto "—". Con eso no se puede redactar qué recibe el socio.
5. **Doc24 Pediatría** — cant. 0 en II y III, con la nota "no se usa, sin grupo familiar".
   **Recomendación: no listarlo en la landing.** Publicar una prestación que ningún socio puede
   usar (no se vende a menores) genera reclamos de posventa.

## Decisiones tomadas

1. **Alcance por etapas.** Entrega 1 = landing en staging. Entrega 2 = portal diferenciado.
2. **Nexo I reemplaza al plan actual** a $20.000 para altas nuevas.
3. **Los afiliados actuales quedan en $19.500** (grandfathered). No se toca ninguna suscripción
   viva en Mercado Pago. Ajustar cuotas existentes sería una operación masiva sobre cobros
   reales: requiere aviso al socio y pedido explícito del cliente, y no forma parte de esta
   entrega.
4. **La matriz operativa de prestaciones vive en Supabase**, editable desde `/admin` (entrega 2).
5. **El copy comercial de la landing vive en la landing** (`src/app/data/planes.ts`), separado
   de la matriz operativa.
6. **Los datos sin confirmar se publican en rojo**, no se omiten: así el cliente los ve y los
   resuelve en la revisión de staging.

### Por qué el copy y la matriz están separados

Son dos cosas con distinta audiencia y distinta cadencia de cambio. La landing necesita prosa
comercial ("Anteojos", "Farmacias hasta 50%") que cambia cuando cambia el marketing. El portal
necesita entitlements (`cant_cubierta`, `valor_cubierto`, `valor_no_cubierto`) que cambian
cuando el cliente renegocia un coseguro con el prestador. Unificarlas obligaría a un deploy de
la landing cada vez que se mueve un coseguro, y a que el equipo comercial edite prosa desde una
pantalla de administración de coberturas.

El único dato que **sí** es compartido es el **precio**, y por eso tiene verificación propia
(sección D).

## Arquitectura — Entrega 1

### A. `src/app/data/planes.ts` (nuevo, landing)

Fuente única del copy comercial. Sin JSX, solo datos y tipos.

```ts
export type Estado = 'incluido' | 'coseguro' | 'no-incluido'

export interface Prestacion {
  label: string
  estado: Estado
  /** Aclaración del coseguro: "1 consulta sin cargo · luego $18.000" */
  detalle?: string
  /** Dato sin confirmar por el cliente. Se pinta en rojo. NO debe llegar a producción. */
  pendiente?: boolean
}

export interface PlanComercial {
  id: 'nexo-1' | 'nexo-2' | 'nexo-3'
  nombre: string
  precio: number
  bajada: string
  recomendado?: boolean
  prestaciones: Prestacion[]
}

export const PLANES: PlanComercial[]
export const ON_DEMAND: ServicioOnDemand[]
```

**`'no-incluido'` es un estado explícito, no una ausencia.** Nexo III no tiene Emergencias ni
Farmacia. Si eso se comunica solo por omisión, el usuario que compara tres columnas no lo
registra, y el que compra Nexo III cree que tiene ambulancia. Se renderiza tachado o en gris,
presente en la card.

### B. `src/app/components/Planes.tsx` (nuevo, landing)

Reemplaza a `<PlanBase />` en `App.tsx:151`. Grid de 3 cards, chip "Recomendado" en Nexo I,
prestaciones agrupadas por estado. Reusa el lenguaje visual de `MenuLanding.tsx` (mismas cards,
mismo tratamiento de secciones y del flag pendiente).

`PlanBase.tsx` se elimina: su único consumidor es `App.tsx`, queda como código muerto.

Reglas duras de `AGENTS.md §6` que aplican:
- Ningún render inicial condicionado a `useIsMobile()` o `window` — rompe la hidratación del SSG.
- Diferencias mobile/desktop por media query en `theme.css`, no por estado JS.
- Formateo de miles con `formatearMiles()` (regex propia), **no** `toLocaleString`: el locale
  difiere entre Node (build SSG) y el browser y produce mismatch al hidratar.
- Imágenes con `loading="eager"` + `fetchpriority="low"` y `srcSet` vía imagetools.

Consumidores secundarios del mismo dato:
- **`ALaCarta.tsx`** — pasa a listar los servicios On Demand reales desde `ON_DEMAND`.
- **`Footer.tsx`** — ya acepta la prop `servicios` (`Footer.tsx:200`); se le pasan los 3 planes.

### C. Selección de plan en el alta (landing)

`Onboarding.tsx` suma un paso de selección de plan y manda `plan_id` en el `PATCH` a
`/api/leads/[id]`. **Sin esto la entrega no se puede publicar**: sería cobrar $7.000 a quien
compró un plan de $20.000.

**La landing no maneja UUIDs.** `plan_id` es un UUID de Supabase; hacer que la landing lo
resuelva en build time la volvería dependiente del portal para poder buildear, que es
exactamente el acoplamiento que se descartó. En su lugar:

- Se agrega `slug text unique` a `plans` (`'nexo-1'`, `'nexo-2'`, `'nexo-3'`).
- `PATCH /api/leads/[id]` acepta `plan_slug` además de `plan_id`, y resuelve el UUID del lado
  del servidor. `plan_id` se mantiene para no romper `RegistroForm.tsx`, que ya lo manda.
- La landing manda `plan_slug: 'nexo-1'`, un literal que ya vive en `planes.ts`.

Así el identificador que cruza el límite entre los dos sistemas es estable, legible en los logs,
y no obliga a la landing a hablar con Supabase ni en build ni en runtime.

### D. Consistencia de precio landing ↔ Supabase

- **`GET /api/planes`** (nuevo en `nexo-portal`): público, read-only, devuelve `slug`, `name` y
  `price` de los planes con `is_active = true`. No expone el UUID: nadie fuera del portal lo
  necesita. Es información que de todas formas está publicada en la landing.
- **`scripts/check-precios.mjs`** (landing): compara `PLANES` contra ese endpoint y falla si un
  precio difiere, si un `slug` de `planes.ts` no existe del lado del portal, o si el portal
  tiene un plan activo que la landing no muestra.

Corre **como check de CI, no como paso del build**. Si el portal está caído, el deploy de la
landing igual sale; lo que no sale es un merge con precios desfasados.

### E. Migración en el portal

```sql
alter table public.plans add column slug text unique;

-- Grandfathering: la fila vieja conserva su precio. Solo se renombra para que el socio
-- existente vea "Nexo I" en su credencial (CredentialCard.tsx:103), y se desactiva para
-- que no aparezca en el alta. Sin slug: no se puede contratar.
update public.plans
   set name = 'Nexo I', is_active = false
 where name = 'Plan Base Nexo';

insert into public.plans (slug, name, price, description, is_active) values
  ('nexo-1', 'Nexo I',   20000, 'Emergencias · Guardia odontológica · Farmacia · Doc24', true),
  ('nexo-2', 'Nexo II',  12000, 'Seguro de Salud I · Farmacia · Óptica · Doc24',         true),
  ('nexo-3', 'Nexo III',  7000, 'Seguro de Salud II · Óptica · Doc24',                   true);
```

Y en `registro/page.tsx:9`, agregar `.eq('is_active', true)`.

**Tradeoff asumido:** quedan dos filas llamadas "Nexo I" — una a $19.500 inactiva (los
grandfathered) y otra a $20.000 activa (altas nuevas). Es lo que permite que el socio viejo vea
el nombre correcto del producto en su credencial y siga pagando su precio. En `/admin/planes` se
distinguen por precio y por cantidad de afiliados, que esa pantalla ya muestra.

**`is_active` no existe en el admin.** Verificado: no aparece ni en `admin/planes/PlansClient.tsx`,
ni en `admin/planes/actions.ts`, ni en el tipo `Plan` de `lib/types.ts`. La columna está en la
base desde el esquema inicial pero nunca se expuso. Se agrega en esta entrega: sin eso, activar
o desactivar un plan requiere entrar a Supabase a mano, y este diseño depende de que el plan
legacy quede inactivo.

## Arquitectura — Entrega 2 (no se implementa ahora)

Se documenta para que la segunda entrega arranque sin re-discutir el modelo.

```sql
create table public.plan_services (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.plans(id) on delete cascade,
  service_key text not null,          -- 'teleconsultas' | 'urgencias' | 'farmacias' | ...
  estado text not null check (estado in ('incluido', 'coseguro', 'no-incluido')),
  cant_cubierta integer,
  valor_cubierto integer,
  valor_no_cubierto integer,
  nota text,
  unique (plan_id, service_key)
);
```

`service_key` usa los mismos identificadores que ya existen en `ServiceCards.tsx`
(`teleconsultas`, `urgencias`, `farmacias`, `odontologia`, `psicologia`, `seguro-hogar`,
`arbol-de-vida`), para no introducir un segundo vocabulario.

Cambios: `portal/page.tsx` trae la matriz junto con el afiliado y se la pasa a `ServiceCards`;
`ServiceCards` filtra los `'no-incluido'` y renderiza el coseguro en los `'coseguro'`;
`/admin/planes` suma la edición de la matriz.

**Punto abierto para esa entrega:** qué ve el socio con un servicio `no-incluido`. Ocultarlo
(portal limpio) o mostrarlo bloqueado con un CTA de upgrade (oportunidad comercial). Se decide
al empezar la entrega 2, no ahora.

## Verificación

El repo de la landing **no tiene infraestructura de tests**: `package.json` solo define `build`
y `dev`. No se monta un framework de testing como parte de esta entrega.

- **`scripts/check-precios.mjs`** sí lleva test: es lógica pura, sin DOM, y es exactamente lo
  que cubre el riesgo de que la landing diga $20.000 mientras MP cobra otra cosa.
- **Build SSG limpio** (`npm run build`) — detecta los mismatches de hidratación que las reglas
  de `AGENTS.md §6` previenen.
- **Revisión visual en el deploy de staging**, mobile y desktop: las tres cards, los estados
  `no-incluido` legibles como tales, y los pendientes en rojo.
- **Prueba de punta a punta del alta**: elegir Nexo I en la landing y confirmar que el checkout
  de Mercado Pago dice $20.000. Es la verificación que cubre el bug de `plan_id`.

## Fuera de alcance

- Ajustar las suscripciones de Mercado Pago de los afiliados existentes.
- Migrar afiliados actuales entre planes.
- El upgrade/downgrade de plan por autogestión desde el portal.
- Publicar en producción: esta entrega termina en staging, con los datos pendientes marcados.
