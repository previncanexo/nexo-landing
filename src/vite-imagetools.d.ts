// Tipos para los imports de vite-imagetools con `?...&as=srcset` → devuelven un string srcset.
declare module '*&as=srcset' {
  const srcset: string
  export default srcset
}
declare module '*?as=srcset' {
  const srcset: string
  export default srcset
}
