# Sanrio Gang Archive

Base estática con Astro, React y TypeScript estricto.

## Desarrollo

Requiere Node.js 22.12 o superior (se recomienda Node.js 24 LTS).

```sh
npm ci
npm run dev
```

En Windows, si PowerShell bloquea `npm.ps1`, utiliza `npm.cmd` en lugar de `npm`.

## Compilación

```sh
npm run build
npm run preview
```

El sitio compilado se genera en `dist/`.

## Estructura

- `src/pages/index.astro`: página inicial.
- `astro.config.mjs`: salida estática e integración de React.
- `tsconfig.json`: configuración de TypeScript y JSX.

Los componentes React pueden guardarse en `src/components/` como archivos `.tsx`
e importarse desde una página Astro. Añade `client:load` al componente cuando
necesite interactividad en el navegador.

## Cloudflare Pages

- Rama de producción: `main`.
- Directorio raíz: raíz del repositorio.
- Comando de compilación: `npm run build`.
- Directorio de salida: `dist`.
- Variable de entorno: `NODE_VERSION=24`.

La salida es estática y no necesita un adaptador de servidor.
