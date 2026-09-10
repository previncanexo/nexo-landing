/**
 * Falla si los precios de `src/app/data/planes.ts` no coinciden con los que el
 * portal cobra realmente. Desincronizarlo significa publicar un precio y
 * cobrar otro.
 *
 * El precio YA NO es el único dato que la landing y el portal comparten
 * (`/api/planes` ahora también trae `prestaciones` por plan) — pero sigue
 * siendo el único que este script compara. Comparar prestaciones queda fuera
 * de este guardarraíl a propósito, por ahora.
 *
 * Cubre dos superficies: los planes de cuota mensual (`PLANES` vs. `plans` del
 * portal, con `compararPlanes`) y los servicios on-demand (`ON_DEMAND` vs.
 * `onDemand` del portal, con `compararOnDemand`). Esta segunda comparación se
 * sumó después de que la discrepancia de precio del Árbol de Vida ($5.000 en
 * la landing vs. $4.500 en el portal) viviera meses sin que nadie la
 * detectara: el guardarraíl original solo cubría `PLANES`, nunca on-demand.
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
 * Compara los servicios on-demand locales (`ON_DEMAND`) contra los del portal
 * (`onDemand`), simétrico a `compararPlanes`. Match por `id`.
 *
 * Los ids de la landing son fijos: `salud-1`, `arbol-de-vida`, `hogar-1`,
 * `hogar-2`, `vida`. Los del portal los está definiendo otro cambio en
 * paralelo (repo separado) y todavía no hay mapeo documentado acá. Por eso un
 * id que no matchea de ningún lado NO se trata como bug de este script: se
 * reporta como error de datos, legible, en el array de retorno — igual que
 * hace `compararPlanes` con slugs. Nunca tira excepción por un id
 * desconocido; si los ids terminan siendo distintos entre landing y portal,
 * este mensaje es la señal para corregir el mapeo, no el comparador.
 */
export function compararOnDemand(locales, remotos) {
  const errores = [];
  const porId = new Map(remotos.map((r) => [r.id, r]));

  for (const local of locales) {
    const remoto = porId.get(local.id);
    if (!remoto) {
      errores.push(
        `on-demand "${local.id}" está en la landing pero no existe en el portal (¿id distinto entre landing y portal? revisar mapeo de ids).`,
      );
      continue;
    }
    if (remoto.precio !== local.precio) {
      errores.push(`on-demand "${local.id}": la landing dice ${local.precio} y el portal cobra ${remoto.precio}.`);
    }
  }

  const idsLocales = new Set(locales.map((l) => l.id));
  for (const remoto of remotos) {
    if (!idsLocales.has(remoto.id)) {
      errores.push(
        `on-demand "${remoto.id}" está en el portal pero no se muestra en la landing (¿id distinto entre landing y portal? revisar mapeo de ids).`,
      );
    }
  }

  return errores;
}

/**
 * Decide si corresponde comparar on-demand o directamente omitir con un
 * aviso. Separado de `compararOnDemand` en una función pura para poder
 * testear la degradación graciosa sin mockear `fetch`: cuando el portal
 * todavía no manda `onDemand` (deploy aditivo en progreso, repo separado del
 * de la landing), no hay array remoto para comparar — y eso NO es un error de
 * precios, es ausencia de dato. Devuelve `warning` en vez de sumar a
 * `errores`, para que el caller lo loguee con `console.warn` y el chequeo de
 * `PLANES` siga determinando el exit code por su cuenta.
 */
export function evaluarOnDemand(localesOnDemand, remotosOnDemand) {
  if (!Array.isArray(remotosOnDemand)) {
    return { errores: [], warning: 'onDemand-ausente' };
  }
  return { errores: compararOnDemand(localesOnDemand, remotosOnDemand), warning: null };
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

/**
 * Resuelve la URL del portal a partir de la env var. En GitHub Actions, una
 * variable de repo (`vars.*`) sin configurar llega como string VACÍO, no como
 * `undefined` — así que `??` no alcanza para caer al default. Se valida
 * explícitamente con `trim() || default`.
 */
export function resolverApiUrl(env) {
  return (env || '').trim() || 'https://nexo.portal.previncasalud.com.ar';
}

/**
 * Extrae `{ id, precio }` de `ON_DEMAND` (servicios que se pagan por fuera de
 * la cuota) de la misma forma que `extraerPlanesLocales` extrae `PLANES`: sin
 * compilar TypeScript, acotando el bloque para no arrastrar nada de fuera.
 *
 * Antes solo existía `extraerPreciosOnDemand`, que devolvía nada más los
 * números — alcanzaba para el chequeo de huérfanos en el HTML, pero no para
 * comparar contra el portal (`compararOnDemand` necesita el id para matchear).
 * Esta función reemplaza esa extracción y `extraerPreciosOnDemand` pasa a
 * derivar de acá, en vez de mantener dos regex casi iguales apuntando al
 * mismo bloque.
 */
export function extraerOnDemandLocales(fuente) {
  const inicio = fuente.indexOf('export const ON_DEMAND');
  if (inicio === -1) return [];
  const fin = fuente.indexOf('export const LS_PLAN_KEY', inicio);
  const bloque = fuente.slice(inicio, fin === -1 ? undefined : fin);

  const items = [];
  const re = /id:\s*'([^']+)'[\s\S]*?precio:\s*(\d+)/g;
  let m;
  while ((m = re.exec(bloque)) !== null) {
    items.push({ id: m[1], precio: Number(m[2]) });
  }
  return items;
}

/**
 * Solo los precios de `ON_DEMAND`, para el guardarraíl de huérfanos en el
 * HTML (que necesita los números, no los ids). Deriva de
 * `extraerOnDemandLocales` para no duplicar la regex que acota el bloque.
 */
export function extraerPreciosOnDemand(fuente) {
  return extraerOnDemandLocales(fuente).map((item) => item.precio);
}

/**
 * Formatea un número con puntos de miles, igual que `formatearMiles` de
 * `data/planes.ts`. Se replica acá (en vez de importarla) porque este script
 * lee el `.ts` como texto plano, sin transpilar — ver `extraerPlanesLocales`.
 */
function formatearMilesLocal(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Guardarraíl del Critical de $19.500: busca en el HTML estático precios con
 * formato `$N.NNN` y devuelve los que no coinciden con ningún precio conocido
 * (`PLANES` + `ON_DEMAND`). Un precio "huérfano" así es exactamente lo que
 * causó el incidente — un número que quedó pegado en el HTML después de que
 * el plan que lo tenía cambió de precio o dejó de existir.
 */
export function preciosHuerfanos(html, preciosConocidos) {
  const conocidos = new Set(preciosConocidos.map((n) => formatearMilesLocal(n)));
  const encontrados = html.match(/\$(\d{1,3}(?:\.\d{3})+)/g) ?? [];
  const huerfanos = encontrados
    .map((p) => p.slice(1))
    .filter((p) => !conocidos.has(p));
  return [...new Set(huerfanos)];
}

// Solo corre la parte de E/S cuando se invoca directo, no cuando lo importa el test.
if (process.argv[1] && process.argv[1].endsWith('check-precios.mjs')) {
  const { readFileSync } = await import('node:fs');
  const apiUrl = resolverApiUrl(process.env.NEXO_API_URL);

  const fuente = readFileSync(new URL('../src/app/data/planes.ts', import.meta.url), 'utf8');
  const locales = extraerPlanesLocales(fuente);

  if (locales.length === 0) {
    console.error('✖ No se pudo leer ningún plan de src/app/data/planes.ts');
    process.exit(1);
  }

  // Guardarraíl del Critical de $19.500: un precio hardcodeado en index.html
  // que no existe en ningún plan ni servicio on-demand tiene que romper el
  // build, no esperar a que alguien lo note a ojo en una revisión final.
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const preciosConocidos = [
    ...locales.map((p) => p.precio),
    ...extraerPreciosOnDemand(fuente),
  ];
  const huerfanos = preciosHuerfanos(html, preciosConocidos);
  if (huerfanos.length > 0) {
    console.error('✖ index.html menciona precios que no existen en ningún plan:\n');
    for (const p of huerfanos) console.error(`  · $${p}`);
    process.exit(1);
  }

  let remotos;
  let remotosOnDemand;
  try {
    const res = await fetch(`${apiUrl}/api/planes`);
    if (!res.ok) {
      console.error(`✖ El portal respondió ${res.status} en ${apiUrl}/api/planes`);
      process.exit(1);
    }
    const body = await res.json();
    remotos = body?.planes;
    remotosOnDemand = body?.onDemand;
  } catch (err) {
    // Portal caído, DNS, JSON inválido: importa que el mensaje diga QUÉ falló,
    // no que Node vomite un stack trace en el log de CI.
    console.error(`✖ No se pudo consultar ${apiUrl}/api/planes: ${err.message}`);
    process.exit(1);
  }

  if (!Array.isArray(remotos)) {
    console.error(`✖ ${apiUrl}/api/planes no devolvió { planes: [...] }`);
    process.exit(1);
  }

  const errores = compararPlanes(locales, remotos);

  // El portal está agregando `onDemand` a esta respuesta de forma aditiva, en
  // un deploy separado de este repo (landing y portal salen por CI distintos).
  // Si todavía no salió, `body.onDemand` no viene — y eso NO puede tumbar el
  // chequeo de PLANES, que sí tiene datos completos. Se avisa con un warning
  // y se sigue: el CI de la landing no depende del calendario de deploy del
  // portal.
  const localesOnDemand = extraerOnDemandLocales(fuente);
  const { errores: erroresOnDemand, warning } = evaluarOnDemand(localesOnDemand, remotosOnDemand);
  errores.push(...erroresOnDemand);
  if (warning) {
    console.warn(
      `⚠ ${apiUrl}/api/planes todavía no devuelve "onDemand" — se omite el chequeo de precios on-demand (¿portal sin deployar con el cambio todavía?).`,
    );
  }

  if (errores.length > 0) {
    console.error('✖ Precios desincronizados entre la landing y el portal:\n');
    for (const e of errores) console.error(`  · ${e}`);
    process.exit(1);
  }

  const resumenOnDemand = Array.isArray(remotosOnDemand)
    ? ` y ${localesOnDemand.length} servicios on-demand`
    : '';
  console.log(`✔ ${locales.length} planes${resumenOnDemand} con precios sincronizados.`);
}
