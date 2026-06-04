# 🏛️ UX/UI System & Code Review Rules

## 1. Design Philosophy (The Core)
- **Extreme Minimalism:** Eliminar cualquier borde, sombra, línea o elemento decorativo que no cumpla una función estructural o narrativa directa.
- **Negative Space (Whitespace):** El espacio vacío es un elemento de diseño activo. Duplicar el padding/margin estándar entre secciones para permitir que los componentes "respiren". Nunca amontonar elementos.
- **Dark Mode First:** La interfaz debe ser pensada nativamente en un entorno oscuro, utilizando tonos negros profundos (ej. `#0A0A0A` a `#121212`) para el fondo y grises de altísimo contraste para el texto, evitando el blanco puro `#FFFFFF` para reducir la fatiga visual (usar `#EDEDED` o `#F5F5F5`).

## 2. Typography System (Strict Hierarchy)
Utilizar fuentes sans-serif geométricas y modernas de alta legibilidad. La escala tipográfica debe ser matemáticamente proporcional (idealmente basada en rems/Tailwind):
- **Tracking & Leading:** Los títulos grandes (H1/H2) deben tener un *letter-spacing* ligeramente negativo (ej. `-0.02em`) y un *line-height* ajustado (1.1 o 1.2). El texto de párrafo debe tener un *line-height* amplio y relajado (1.6 o 1.75).
- **Scale:**
  - `H1`: 3.5rem a 4.5rem (Font-weight: 600/700). Uso exclusivo para el Hero.
  - `H2`: 2.5rem a 3rem (Font-weight: 500/600). Títulos de sección.
  - `H3`: 1.5rem a 2rem (Font-weight: 500). Tarjetas o bloques clave.
  - `Body / P`: 1rem a 1.125rem (Font-weight: 400). Texto regular.
  - `Caption / Small`: 0.875rem (Font-weight: 400). Elementos secundarios.

## 3. Spacing & Grid (The 8pt System)
Todo margen, padding y tamaño debe ser un múltiplo de 8 (8, 16, 24, 32, 48, 64, 96, 128px).
- **Micro-espacios (dentro de un componente):** 8px, 16px.
- **Macro-espacios (entre componentes):** 32px, 48px.
- **Secciones (Layout gap):** Mínimo 96px a 128px de separación vertical entre grandes bloques de contenido.
- **Border-radius:** Mantener consistencia. O se usan bordes completamente rectos (0px) para un look brutalista/editorial, o curvas sutiles (6px/8px). Evitar curvas extremas a menos que sea un botón tipo "pill".

## 4. UI Components & Interactivity
- **Botones & CTAs:** Deben tener un padding horizontal generoso (ej. `px-6 py-3`). Si hay dos botones juntos, establecer jerarquía clara: uno primario (fondo sólido) y uno secundario (outline sutil o texto plano).
- **Bordes & Separadores:** Evitar líneas divisorias sólidas (`border-solid`). Usar diferencias sutiles de color de fondo o márgenes amplios para separar secciones.
- **Animaciones (Vibe & Feel):** Las interacciones (hover, focus, page load) deben sentirse fluidas y físicas. Utilizar curvas de animación tipo *spring* (resorte) sutiles, no transiciones lineales aburridas.

## 5. Code Implementation (Strict Quality)
- Si se usa Tailwind CSS, mantener las clases lógicamente ordenadas (Layout -> Spacing -> Typography -> Visuals).
- Extraer componentes visuales repetitivos (botones, tarjetas) en archivos o componentes funcionales separados para mantener los archivos principales cortos y legibles.
- No utilizar estilos en línea (`style={{...}}`) bajo ninguna circunstancia.
- El código debe ser autodescriptivo; el diseño debe hablar por sí mismo sin necesidad de exceso de comentarios.
