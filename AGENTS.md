# Repository guide

## Project map

SanrioGang Archive is a static Astro site with Spanish-first copy and a pink, dark collage aesthetic.

- `src/pages/index.astro`: homepage markup, metadata, and content rendering.
- `src/content/site.json`: editorial copy, links, media metadata, and approval states; imported directly, not an Astro content collection.
- `src/components/Doodle.astro`: shared decorative SVGs.
- `src/scripts/site.ts`: menus, dialogs, gallery navigation, and motion preferences.
- `src/styles/site.css` and `src/styles/texture.css`: layout, visual styling, and effects.
- `public/assets/`: published images and video; files here are copied into the build.
- `tests/home.spec.ts`: Playwright coverage for responsive layout, assets, navigation, dialogs, media, and motion.

## Development

Use Node.js 22.12+ and npm. Install dependencies with `npm ci`; keep `package-lock.json` in sync when dependencies change.

Always start the dev server in background mode (`astro dev --background`). Run the local Astro CLI through npm:

```sh
npm run dev -- --background
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

The local site runs at `http://localhost:4321`. Check status before starting another server; stop servers you started when finished unless the user needs them left running.

## Making changes

- Follow the existing Astro, TypeScript, and plain CSS patterns. React is installed, but current interactions use native browser APIs; reuse these before adding components or dependencies.
- Keep changes focused. Read the affected rendering, content, styles, and event handlers together; preserve matching IDs and `data-*` hooks.
- Preserve the site's visual identity and Spanish-first copy unless a redesign or language change is requested. Save text as UTF-8.
- Keep unknown facts and URLs as `null` or empty arrays. Preserve demo/pending labels until content is confirmed; do not invent release metadata, member identities, or official links.
- Use supplied media and descriptive alt text. Keep private references and working assets outside `public/`; retain image dimensions and lazy loading where appropriate.
- Preserve keyboard access, visible focus, dialog focus restoration, reduced-motion support, and the effects toggle. Media playback must remain user initiated and pause when its dialog closes.

## Validation

- Run `npm run build` after changes to source, content, assets, or configuration.
- Run `npm test` for UI or interaction changes. It builds the site, starts Astro in the background, and runs Playwright against port 4321; it leaves the server running.
- Playwright uses installed Microsoft Edge (`channel: "msedge"` in `playwright.config.ts`). If Edge is missing, install it with `npx playwright install msedge`.
- For visual changes, inspect the screenshots in `output/` across the tested widths (360, 390, 768, 1024, and 1440 px). Check overflow, legibility, and keyboard behavior relevant to the change.
- Update existing tests when intended behavior changes; add a focused regression check for bug fixes. Do not weaken assertions just to make a failure pass.
- For documentation-only changes, review the diff and run `git diff --check`; no app build is needed. Report checks run and any blockers accurately.

## Git hygiene

- Preserve unrelated work and stage only task-related files. Review the staged diff before committing.
- Do not commit secrets, `.env` files, dependencies, build output, screenshots, or test reports; follow `.gitignore`.
- Commit and push when requested. Use the current branch and its configured upstream unless instructed otherwise; do not force-push.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content collections](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
