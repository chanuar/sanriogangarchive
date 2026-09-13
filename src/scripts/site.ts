const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const effectsButton = document.querySelector<HTMLButtonElement>('.effects-toggle')!;
let preference: string | null = null;
try { preference = localStorage.getItem('sg-effects'); } catch { /* Storage is optional. */ }
function updateEffects() {
  const enabled = !reduced.matches && preference !== 'off';
  document.documentElement.dataset.effects = enabled ? 'on' : 'off';
  effectsButton.textContent = `EFECTOS: ${enabled ? 'ON' : 'OFF'}`;
  effectsButton.setAttribute('aria-pressed', String(enabled));
  effectsButton.title = reduced.matches ? 'Movimiento reducido por la preferencia del sistema' : 'Activar o reducir transiciones';
}
effectsButton.addEventListener('click', () => {
  preference = document.documentElement.dataset.effects === 'on' ? 'off' : 'on';
  try { localStorage.setItem('sg-effects', preference); } catch { /* Storage is optional. */ }
  updateEffects();
});
reduced.addEventListener('change', updateEffects);
updateEffects();
const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
const navigation = document.querySelector<HTMLElement>('#navigation')!;
function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'MENÚ +';
  navigation.classList.remove('is-open');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'CERRAR −' : 'MENÚ +';
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
matchMedia('(min-width: 801px)').addEventListener('change', () => closeMenu());
document.querySelectorAll<HTMLButtonElement>('[data-dialog]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const dialog = document.getElementById(trigger.dataset.dialog!) as HTMLDialogElement;
    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>('[data-close]')?.focus();
    dialog.addEventListener('close', () => trigger.focus(), { once: true });
  });
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll<HTMLElement>('button, a[href], video[controls], [tabindex="0"]')];
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => dialog.querySelector('video')?.pause());
});
const strip = document.querySelector<HTMLElement>('.fragment-strip')!;
document.querySelectorAll<HTMLButtonElement>('[data-gallery-step]').forEach(button => {
  button.addEventListener('click', () => strip.scrollBy({ left: Number(button.dataset.galleryStep) * strip.clientWidth * .8, behavior: document.documentElement.dataset.effects === 'on' ? 'smooth' : 'instant' }));
});
const reveal = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    if (document.documentElement.dataset.effects === 'on') entry.target.classList.add('in-view');
    reveal.unobserve(entry.target);
  });
}, { threshold: .08 });
document.querySelectorAll('main > section:not(.hero)').forEach(section => reveal.observe(section));
