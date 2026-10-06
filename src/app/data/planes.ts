// Catálogo comercial del landing. Producción vende un único plan ("Previnca
// Nexo") a $19.500. El array queda abierto para sumar planes sin tocar el
// Onboarding, que se apoya en PLANES / PlanComercial para resolver el plan por
// slug (coincide con la columna `slug` de la tabla `plans` del portal).

export interface PlanComercial {
  slug: 'nexo-1';
  nombre: string;
  precio: number;
}

export const PLANES: PlanComercial[] = [
  {
    slug: 'nexo-1',
    nombre: 'Previnca Nexo',
    precio: 19500,
  },
];

// Separador de miles manual: toLocaleString difiere entre Node (SSG) y browser
// y rompe el matching inicial al hidratar.
export function formatearMiles(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Key de sessionStorage del plan elegido. El Onboarding la lee para
// sobrevivir un reload a mitad del wizard; App.tsx la escribe cuando el
// usuario elige plan desde una card. Hoy producción tiene un solo plan y nadie
// la escribe, pero el Onboarding igual la consulta como primera precedencia.
export const LS_PLAN_KEY = 'nexo_plan_slug';
