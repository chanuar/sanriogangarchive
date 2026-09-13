# SanrioGang Archive

Landing de Astro con collage responsive, fotos reales optimizadas, cuatro canciones de YouTube, carpetas de lore, lightbox y reproducción manual del fragmento Mimosas v3.

## Arranque

Node >= 22.12.0, npm.

```sh
npm ci
npm run dev -- --background
```

Abrir http://localhost:4321. El servidor se gestiona con:

```sh
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
npm run build
```

`dist/` es la salida estática. No se ha realizado un despliegue.

## Editar contenido

- `src/content/site.json`: navegación, links, canciones, release, medios, carpetas, notas y miembros. Los estados `demo`, `pending`, `supplied` y `approved` conservan la procedencia editorial.
- `src/pages/index.astro`: estructura y etiquetas de interfaz. `src/styles/`: composición y responsive. `src/scripts/site.ts`: menú, diálogos, galería y control de efectos.
- `public/assets/`: logo, WebP, MP4 y textura SVG original. Las fuentes se sirven localmente mediante Fontsource (licencias OFL incluidas en sus paquetes).
- Añadir medios a `media` con ID único, ruta, tipo, dimensiones y descripción. Los vídeos necesitan `poster` y `audioVersion`. Se incorporan a la galería y al lightbox.
- Añadir entradas a `lore` con `collectionId` de una carpeta y `mediaIds` existentes. Los recuentos se calculan. Mantener textos no aprobados como demo.
- `members` admite `{ id, name, photo?, role?, bio? }`. Las fotos actuales son un collage documental, no fichas biográficas. La selección visual del collage está en `gangPhotos`, en la página.
- `featuredRelease.spotifyUrl`: URL oficial de Spotify. Solo se aceptan URLs `https://open.spotify.com/{tipo}/{id}` para construir el embed; permanece un estado pendiente cuando no hay URL válida. Hay enlace directo de respaldo al configurar el embed.

Los cuatro títulos de canciones se obtuvieron del oEmbed oficial de las URLs proporcionadas; su fuente queda registrada en los datos. No se han inferido integrantes a partir de los créditos.

Los originales PNG y las imágenes de inspiración están conservados localmente en `.codex/uploads/`. El handoff sigue en `.codex/handoff/`. `.codex/` está ignorado por Git y queda fuera del build. No es necesario para ejecutar ni editar el contenido de la web.

## Pruebas y capturas

```sh
npm test
```

Construye la página, asegura el servidor en background y ejecuta cinco pruebas Playwright. La configuración usa Microsoft Edge instalado (`channel: 'msedge'`). Para otro entorno se puede cambiar a Chromium e instalar su navegador con `npx playwright install chromium`.

Se comprueban 360, 390, 768, 1024 y 1440 px, rutas de assets, enlaces, ausencia de desbordamiento, menú, carpetas, lightbox, foco/Escape, preferencias de movimiento, galería y reproducción real del MP4. Las capturas quedan en `output/home-{ancho}.png` y `output/video-dialog.png`; no se versionan.

Resultados y límites de la revisión: [QUALITY-REVIEW.md](QUALITY-REVIEW.md).

## Pendientes editoriales

- Confirmar título, portada y condición de último lanzamiento de Mimosas v3. Los 4,08 segundos son la duración del fragmento, no del tema.
- URL oficial de Spotify; Instagram y contacto si se desean. No hay destinos inventados.
- Nombres, roles y biografías; aprobación del copy y del lore demo.
- Dominio, imagen social definitiva y publicación. No hay backend, CMS, login, tienda ni formulario.

Los efectos usan CSS e IntersectionObserver, sin GSAP, scroll secuestrado ni autoplay. El botón de efectos persiste localmente y la preferencia de movimiento reducido del sistema prevalece. La reproducción del vídeo requiere una acción explícita y se pausa al cerrar el diálogo.
