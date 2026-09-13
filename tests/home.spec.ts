import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";

test("responsive collage, assets, navigation and captures", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "SanrioGang ArchiveARCHIVE",
    );
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBe(width);
    await expect(page.locator(".song-list a")).toHaveCount(5);
    await expect(page.locator('.song-list a[href="https://youtu.be/T8Ah398lVDE"]')).toContainText("estoy enamorado - el suke");
    await expect(page.locator(".spotify-pending")).toContainText(
      "enlace oficial",
    );
    await expect(page.locator("iframe")).toHaveCount(0);
    await expect(page.locator("video[autoplay]")).toHaveCount(0);
    // Scroll through the real page so lazy assets are present in full-page captures.
    for (const section of await page.locator("main > section, footer").all())
      await section.scrollIntoViewIfNeeded();
    // Horizontal offscreen thumbnails are intentionally lazy; load them for asset QA.
    await page.locator("main img, footer img").evaluateAll((images) =>
      Promise.all(
        images.map((image) => {
          const img = image as HTMLImageElement;
          img.loading = "eager";
          return img.decode();
        }),
      ),
    );
    const broken = await page
      .locator("main img, footer img")
      .evaluateAll((images) =>
        images
          .filter((image) => !(image as HTMLImageElement).naturalWidth)
          .map((image) => image.getAttribute("src")),
      );
    expect(broken).toEqual([]);
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: `output/home-${width}.png`, fullPage: true });
  }
  expect(errors).toEqual([]);
  const links = await page
    .locator('a[href^="#"]')
    .evaluateAll((anchors) => anchors.map((a) => a.getAttribute("href")!));
  for (const href of links) await expect(page.locator(href)).toHaveCount(1);
  await expect(page.locator('a[href*="@sanriogangarchive"]')).toHaveCount(2);
});

test("folders, empty states, keyboard containment and focus restoration", async ({
  page,
}) => {
  await page.goto("/");
  for (const button of await page.locator(".folder").all()) {
    await button.focus();
    await page.keyboard.press("Enter");
    const dialog = page.locator("dialog[open]");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("[data-close]")).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    expect(
      await page.evaluate(
        () => !!document.activeElement?.closest("dialog[open]"),
      ),
    ).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(button).toBeFocused();
  }
  await page.getByRole("button", { name: /PARTY.EXE/ }).click();
  await expect(page.locator("dialog[open]")).toContainText(
    "todavía está vacía",
  );
  await page.locator("dialog[open] [data-close]").click();
});

test("image lightbox and actual local video playback", async ({ page }) => {
  await page.goto("/");
  await page.locator(".gang-photo").first().click();
  await expect(page.locator("dialog[open] img")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".gang-photo").first()).toBeFocused();
  await page.locator(".video-preview").click();
  const video = page.locator("dialog[open] video");
  await expect(video).toBeVisible();
  expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  // Explicit user-triggered playback, native controls remain available.
  await video.evaluate((v: HTMLVideoElement) => v.play());
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
    .toBeGreaterThan(0.1);
  expect(await video.evaluate((v: HTMLVideoElement) => v.duration)).toBeCloseTo(
    4.08,
    1,
  );
  await page.screenshot({ path: "output/video-dialog.png" });
  await page.keyboard.press("Escape");
  await expect
    .poll(() =>
      page.locator("video").evaluate((v: HTMLVideoElement) => v.paused),
    )
    .toBe(true);
  await expect(page.locator(".video-preview")).toBeFocused();
});

test("mobile menu, effects persistence, system preference and gallery", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 650 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.locator(".menu-toggle").click();
  await expect(page.locator("#navigation")).toBeVisible();
  await page.locator('#navigation a[href="#archive"]').click();
  await expect(page.locator(".menu-toggle")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await page.locator(".menu-toggle").click();
  await page.keyboard.press("Escape");
  await expect(page.locator(".menu-toggle")).toBeFocused();
  await page.locator(".effects-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("data-effects", "off");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-effects", "off");
  await page.locator(".effects-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("data-effects", "on");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-effects", "off");
  await page.locator('[data-gallery-step="1"]').click();
  await expect
    .poll(() => page.locator(".fragment-strip").evaluate((e) => e.scrollLeft))
    .toBeGreaterThan(0);
  await page.locator('[data-gallery-step="-1"]').click();
  await expect
    .poll(() => page.locator(".fragment-strip").evaluate((e) => e.scrollLeft))
    .toBeLessThanOrEqual(3);
});

test("built assets exclude private references and preserve confirmed destinations", async () => {
  const html = await fs.readFile("dist/index.html", "utf8");
  for (const text of [
    "son mi religi\u00f3n",
    "hacer buena m\u00fasica",
    "Actuaci\u00f3n en un escenario bajo luces azules y humo.",
  ])
    expect(html).toContain(text);
  for (const id of ["ReupqkPcEPw", "Ga_T2miUscU", "ivkO6KhnciI", "FPbgrZ8qRxU", "T8Ah398lVDE"])
    expect(html).toContain(`https://youtu.be/${id}`);
  expect(html).not.toMatch(/href="#"|SHOP|EST\. 2024|7 tracks/);
  const assets = await fs.readdir("dist/assets");
  expect(assets.some((name) => /inspo|mock|^img.*\.png/.test(name))).toBe(
    false,
  );
  const sources = [
    ...html.matchAll(/(?:src|poster)="(\/assets\/[^\"]+)"/g),
  ].map((match) => match[1]);
  for (const src of new Set(sources))
    expect((await fs.stat(`dist${src}`)).size).toBeGreaterThan(0);
});
