# Revisión de calidad — 13 septiembre 2026

Se revisó la checklist del handoff y se compararon capturas con `homepage-mock.png`. La referencia define composición y tono; no se usó como fondo ni se extrajeron personas, portada o controles del raster.

## Comprobado

- Logo original, fotos suministradas y fotogramas reales. Ornamentos SVG propios y textura estática. Negro/fucsia, gótica, condensada, manuscrita y mono; collage recompuesto en móvil.
- Orden: header, hero, release, archive/lore, gang, fragments y enlaces. Sin tienda, formulario, backend ni destinos ficticios.
- Cuatro canciones y canal de YouTube proporcionados por el usuario. Títulos recuperados desde oEmbed oficial. Spotify, portada, fecha y condición de último lanzamiento pendientes explícitamente; biografías no inferidas. Lore y copy marcados como demo.
- `npm test`: build correcto y **5 pruebas Playwright aprobadas**, Microsoft Edge headless. Reproducción del MP4 comprobada mediante avance del tiempo y duración de aproximadamente 4,08 s; pausa tras cerrar el diálogo.
- Anchos **360, 390, 768, 1024 y 1440 px**: anchura del documento igual al viewport, sin desbordamiento global. Imágenes decodificadas y rutas presentes en el build.
- Menú abre/cierra y responde a Escape; carpetas con contenido o estado vacío; lightbox; foco inicial, contención de Tab/Shift+Tab, Escape y retorno al activador. Foco visible definido en CSS.
- Control de efectos con persistencia, cambios de `prefers-reduced-motion`, flechas de galería y enlaces a anclas reales. El sistema prevalece sobre la preferencia local de animación.
- No hay autoplay, vídeo decorativo continuo, scroll secuestrado ni flashes. El vídeo utiliza controles nativos. Spotify no se simula con un reproductor falso.
- Los PNG originales e inspiraciones están en `.codex/uploads/`, fuera del build y de Git. La aplicación usa derivados WebP con dimensiones y carga diferida.
- Revisión adicional a **720 × 450** con menú abierto: sin desbordamiento ni controles de menú cortados. Es una prueba de viewport bajo/reflow; no equivale a una prueba de ampliación de texto del sistema.
- Revisión visual de legibilidad sobre fondos y del hover de las fotos: se conservó tinta oscura en las etiquetas claras al pasar el ratón. Nota lateral ajustada para separar el dibujo del texto.

## Capturas locales

Generadas por `npm test`, excluidas de Git:

- `output/home-360.png`, `home-390.png`, `home-768.png`, `home-1024.png`, `home-1440.png`.
- `output/video-dialog.png`.
- Comprobaciones adicionales: `output/short-viewport-menu.png` y `output/reflow-release.png`.

## Medición puntual y límites

En una carga de desarrollo a 1440 × 900, Resource Timing registró aproximadamente **1,63 MB de recursos transferidos**, incluyendo el cliente de desarrollo de Vite. **Cero solicitudes MP4** en esa medición. No es una medición de producción ni un resultado Lighthouse. Las imágenes cercanas al viewport pueden precargarse por la heurística nativa de lazy loading.

No se ha realizado una auditoría WCAG, una medición exhaustiva de contraste sobre cada textura, pruebas con lector de pantalla, ampliación de texto del sistema ni validación en Safari/Firefox o dispositivos físicos. Las pruebas de navegador se ejecutaron contra el servidor de desarrollo; se comprobó por separado la construcción y las rutas de archivos de `dist/`.

El estado pendiente de Spotify se probó; **la reproducción del embed no puede validarse sin una URL oficial**. El enlace directo de respaldo se renderiza al configurar una URL válida. No se comprobó la disponibilidad regional o reproducción de los vídeos externos de YouTube.

## Antes de publicación

Confirmar el release, portada y metadatos; aportar Spotify y otros enlaces opcionales; aprobar copy/lore y miembros. Revisar imagen social y dominio, reproducción del embed, accesibilidad asistida y dispositivos finales. La página está ejecutable localmente; no se ha desplegado.
