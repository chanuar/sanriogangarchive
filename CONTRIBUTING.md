# Contributing to SanrioGang Archive

Bug fixes, content corrections, and improvements are welcome. Keep changes focused; open an issue before starting a substantial feature or redesign.

## Local setup

Use Node.js 22.22.3+, 24.16.0+, or 26.3.0+ (see the supported ranges in `package.json`) and npm. Fork or clone the repository, then run these commands from its root:

```sh
npm ci
npm run dev -- --background
```

Open http://localhost:4321. Always run the development server in background mode. Manage it with:

```sh
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

## Where to make changes

- `src/pages/index.astro`: homepage markup and rendering.
- `src/components/`: reusable Astro components.
- `src/content/site.json`: archive content, media metadata, and links.
- `src/scripts/site.ts`: navigation, dialogs, gallery, and effects controls.
- `src/styles/`: layout, typography, textures, and motion.
- `public/assets/`: published images and video.
- `tests/home.spec.ts`: browser checks for layout, assets, and interactions.

Follow the surrounding code style and reuse existing components and native browser features. See [AGENTS.md](AGENTS.md) for project instructions and links to the relevant Astro guides before changing routing, components, content, or styles.

Preserve the site's Spanish-first copy and pink collage identity. Keep keyboard navigation, focus behavior, descriptive image text, and reduced-motion support working.

For content changes, follow the policies in `src/content/site.json`: leave unknown values as `null` or empty arrays, keep demo content marked as such, and publish only confirmed facts and links. Keep private references and working files out of `public/`, whose contents are published with the site.

## Check your changes

Run formatting, lint, Astro/TypeScript diagnostics, and the production build together:

```sh
npm run validate
```

Prettier formats Astro, TypeScript, JavaScript, CSS, JSON, and Markdown. ESLint uses the recommended JavaScript, TypeScript, and Astro rules, with `eslint-config-prettier` preventing formatting conflicts. Generated output, dependencies, and published assets are excluded. Install the recommended VS Code extensions for formatting and ESLint fixes on save.

```sh
npm run format        # Apply formatting
npm run format:check  # Check formatting without writing
npm run lint          # Check code; warnings fail the command
npm run lint:fix      # Apply available ESLint fixes
```

Build the static site separately:

```sh
npm run build
```

For changes to content, layout, assets, or behavior, also run:

```sh
npm test
```

The test script checks types, builds the site, starts the background development server, and runs Playwright. Tests currently require Microsoft Edge (`channel: "msedge"` in `playwright.config.ts`) and use http://localhost:4321. They leave screenshots in `output/` and the server running; stop it with `npm run astro -- dev stop` when finished.

Check visual changes at mobile and desktop widths. Exercise any affected menus, dialogs, media, and keyboard controls. Update existing tests when intended behavior changes. Run `npm run check` for standalone Astro and TypeScript diagnostics.

## Submit a pull request

1. Create a branch for one focused change.
2. Explain the problem and what your change does; link any related issue.
3. Include the checks you ran and screenshots for visual changes. Mention anything you could not verify.
4. Commit source files only; leave generated files such as `dist/`, `.astro/`, `output/`, and `test-results/` out of the pull request. Include `package-lock.json` when changing dependencies.

For bug reports, include reproduction steps, expected and actual behavior, and the browser and viewport size when relevant.
