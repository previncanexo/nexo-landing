import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  // SSG (vite-react-ssg): desactivar la extracción de CSS crítico.
  // Con critical CSS, el resto del CSS carga async y en conexiones lentas el contenido
  // below-the-fold (y el overlay del menú, oculto por clase) se ve SIN ESTILO/roto hasta
  // que llega. Cargando el CSS completo render-blocking (~14KB gzip, instantáneo) todo
  // sale con estilo desde el primer pintado.
  ssgOptions: {
    beastiesOptions: false,
  },
  plugins: [
    figmaAssetResolver(),
    // Genera variantes responsive (srcset) de las imágenes en build.
    imagetools(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
