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

/**
 * Resuelve la URL del portal a partir de la env var. En GitHub Actions, una
 * variable de repo (`vars.*`) sin configurar llega como string VACÍO, no como
 * `undefined` — así que `??` no alcanza para caer al default. Se valida
 * explícitamente con `trim() || default`.
 */
export function resolverApiUrl(env) {
  return (env || '').trim() || 'https://nexo.portal.previncasalud.com.ar';
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

  let remotos;
  try {
    const res = await fetch(`${apiUrl}/api/planes`);
    if (!res.ok) {
      console.error(`✖ El portal respondió ${res.status} en ${apiUrl}/api/planes`);
      process.exit(1);
    }
    const body = await res.json();
    remotos = body?.planes;
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
  if (errores.length > 0) {
    console.error('✖ Precios desincronizados entre la landing y el portal:\n');
    for (const e of errores) console.error(`  · ${e}`);
    process.exit(1);
  }

  console.log(`✔ ${locales.length} planes con precios sincronizados.`);
}
