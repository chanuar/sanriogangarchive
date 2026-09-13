<p align="center">
  <img src="public/assets/logo-sanriogang.webp" alt="SanrioGang" width="320" />
</p>

# SanrioGang Archive

El archivo digital de SanrioGang: música, fotos, vídeos y lore de un colectivo de trap under. Una web con estética de collage, influencias emo y cultura de internet.

[Escuchar en YouTube](https://youtube.com/@sanriogangarchive)

## Stack

Astro, TypeScript y CSS. Sitio estático con diseño responsive, galería de medios y animaciones que respetan las preferencias de movimiento reducido.

## Desarrollo local

Requiere Node.js 22.12 o superior y npm.

```sh
npm ci
npm run dev -- --background
```

Disponible en http://localhost:4321.

```sh
npm run astro -- dev stop   # Detener el servidor
npm run build              # Generar el sitio en dist/
npm run preview            # Previsualizar el build
```

## Estructura

- `src/content/site.json`: canciones, enlaces, medios y entradas del archivo.
- `src/pages/`: páginas de Astro.
- `src/components/`: componentes visuales.
- `src/styles/`: estilos y composición responsive.
- `src/scripts/`: interacciones del sitio.
- `public/assets/`: imágenes, vídeos y recursos gráficos.
