import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compararPlanes, extraerPlanesLocales, extraerPreciosOnDemand, resolverApiUrl, preciosHuerfanos } from './check-precios.mjs';

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

test('resolverApiUrl cae al default si la env var no está definida', () => {
  assert.equal(resolverApiUrl(undefined), 'https://nexo.portal.previncasalud.com.ar');
});

test('resolverApiUrl cae al default si la env var llega vacía (caso GitHub Actions)', () => {
  assert.equal(resolverApiUrl(''), 'https://nexo.portal.previncasalud.com.ar');
});

test('resolverApiUrl respeta el valor cuando está configurado', () => {
  assert.equal(resolverApiUrl('https://algo'), 'https://algo');
});

test('extraerPreciosOnDemand lee los precios del bloque ON_DEMAND', () => {
  const fuente = `
export const PLANES = [
  { slug: 'nexo-1', nombre: 'Nexo I', precio: 20000 },
];
export const ON_DEMAND = [
  { id: 'salud-1', nombre: 'Seguro de Salud I', precio: 6000 },
  { id: 'arbol-de-vida', nombre: 'Árbol de Vida', precio: 5000, pendiente: true },
];
export const LS_PLAN_KEY = 'nexo_plan_slug';
`;
  assert.deepEqual(extraerPreciosOnDemand(fuente), [6000, 5000]);
});

test('extraerPreciosOnDemand no devuelve nada si el archivo no tiene el bloque ON_DEMAND', () => {
  assert.deepEqual(extraerPreciosOnDemand('export const OTRA_COSA = [];'), []);
});

test('preciosHuerfanos detecta un precio hardcodeado que ya no existe en ningún plan', () => {
  const html = '<title>Previnca Nexo — Tu plan de salud completo · $19.500/mes</title>';
  const preciosConocidos = [20000, 12000, 7000];
  assert.deepEqual(preciosHuerfanos(html, preciosConocidos), ['19.500']);
});

test('preciosHuerfanos no devuelve nada cuando todos los precios del HTML son válidos', () => {
  const html = '<title>Previnca Nexo — Desde $7.000/mes</title><meta content="El plan completo, $20.000/mes">';
  const preciosConocidos = [20000, 12000, 7000];
  assert.deepEqual(preciosHuerfanos(html, preciosConocidos), []);
});

test('preciosHuerfanos no repite el mismo precio huérfano si aparece más de una vez', () => {
  const html = '$19.500/mes ... $19.500/mes de nuevo';
  assert.deepEqual(preciosHuerfanos(html, [20000, 12000, 7000]), ['19.500']);
});
