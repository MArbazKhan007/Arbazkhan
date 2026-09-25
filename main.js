// Progressive enhancements for the portfolio. The page is fully usable without JS.

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const root = document.documentElement;

/* ─── Theme toggle ─── */
function initTheme() {
  const btn = $('[data-theme-toggle]');
  if (!btn) return;
  const media = matchMedia('(prefers-color-scheme: dark)');
  const isDark = () => (root.dataset.theme ?? (media.matches ? 'dark' : 'light')) === 'dark';
  const sync = () => btn.setAttribute('aria-pressed', String(isDark()));

  btn.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    const apply = () => {
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch {}
      sync();
    };
    // View Transitions API for a smooth cross-fade where supported and motion is OK
    if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  });
  media.addEventListener('change', sync);
  sync();
}

/* ─── Mobile navigation (disclosure pattern) ─── */
function initNav() {
  const toggle = $('[data-nav-toggle]');
  const menu = $('#nav-menu');
  if (!toggle || !menu) return;

  const setOpen = (open) => toggle.setAttribute('aria-expanded', String(open));
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  toggle.addEventListener('click', () => setOpen(!isOpen()));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) { setOpen(false); toggle.focus(); }
  });
  document.addEventListener('click', (e) => {
    if (isOpen() && !e.target.closest('.site-nav')) setOpen(false);
  });
  matchMedia('(width >= 60rem)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
}

/* ─── Header shadow + current-section highlighting ─── */
function initScrollState() {
  const header = $('[data-header]');
  if (header) {
    const onScroll = () => header.toggleAttribute('data-scrolled', scrollY > 8);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  const links = new Map($$('.nav-menu a[href^="#"]').map((a) => [a.hash.slice(1), a]));
  const observer = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      for (const a of links.values()) a.removeAttribute('aria-current');
      links.get(target.id)?.setAttribute('aria-current', 'true');
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  for (const id of links.keys()) {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  }
}

/* ─── Project filters ─── */
function initFilters() {
  const group = $('[data-filters]');
  const projects = $$('[data-projects] > li');
  const status = $('[data-filter-status]');
  if (!group || !projects.length) return;

  group.hidden = false; // filters only make sense with JS

  group.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    const filter = btn.dataset.filter;

    for (const b of $$('[data-filter]', group)) b.setAttribute('aria-pressed', String(b === btn));

    let shown = 0;
    for (const card of projects) {
      const match = filter === 'all' || card.dataset.category.split(' ').includes(filter);
      card.hidden = !match;
      if (match) shown++;
    }
    if (status) {
      const label = filter === 'all' ? 'all categories' : btn.textContent.trim();
      status.textContent = `Showing ${shown} project${shown === 1 ? '' : 's'} in ${label}.`;
    }
  });
}

/* ─── Footer year ─── */
function initYear() {
  const el = $('[data-year]');
  if (el) el.textContent = String(new Date().getFullYear());
}

initTheme();
initNav();
initScrollState();
initFilters();
initYear();
