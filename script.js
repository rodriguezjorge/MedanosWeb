// --- Idiomas: español e inglés ---
const STORAGE_KEY = 'medanos-lang';

const translations = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Nosotros',
      video: 'Video',
      members: 'Integrantes',
      music: 'Música',
      listen: 'Escuchar',
      menuOpen: 'Abrir menú',
      menuClose: 'Cerrar menú',
    },
    hero: {
      spotify: 'Escuchar en Spotify',
    },
    about: {
      title: 'Nosotros',
      para: 'Medanos es una banda alternativa punk rock con sede en Chicago formada por Vladimir (voz principal y guitarra), George (guitarra, sintetizador y coros), kharim (guitarra), Jesús (bajo y coros) y Stephanie (batería).',
    },
    members: {
      title: 'Integrantes',
      voiceGuitar: 'Voz & guitarra',
      guitarBacking: 'Guitarra & coros',
      guitar: 'Guitarra',
      bassBacking: 'Bajo & coros',
      drums: 'Batería',
    },
    music: {
      title: 'Música',
      intro: 'Algunos temas y lanzamientos recientes.',
      latest: 'Último lanzamiento',
    },
    listen: {
      title: 'Escuchar',
      spotify: 'Abrir en Spotify',
      instagram: 'Seguir en Instagram',
      spotifyTitle: 'Medanos en Spotify',
    },
    footer: {
      copy: 'Chicago · Alternative Punk Rock',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      video: 'Video',
      members: 'Members',
      music: 'Music',
      listen: 'Listen',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
    },
    hero: {
      spotify: 'Listen on Spotify',
    },
    about: {
      title: 'About',
      para: 'Medanos is a Chicago-based alternative punk rock band consisting of Vladimir (lead vocals & guitar), George (guitar, synthesizer & backing vocals), kharim (guitar), Jesús (bass & backing vocals), and Stephanie (drums).',
    },
    members: {
      title: 'Members',
      voiceGuitar: 'Lead vocals & guitar',
      guitarBacking: 'Guitar & backing vocals',
      guitar: 'Guitar',
      bassBacking: 'Bass & backing vocals',
      drums: 'Drums',
    },
    music: {
      title: 'Music',
      intro: 'Some tracks and recent releases.',
      latest: 'Latest release',
    },
    listen: {
      title: 'Listen',
      spotify: 'Open on Spotify',
      instagram: 'Follow on Instagram',
      spotifyTitle: 'Medanos on Spotify',
    },
    footer: {
      copy: 'Chicago · Alternative Punk Rock',
    },
  },
};

function getText(obj, key) {
  const keys = key.split('.');
  let v = obj;
  for (const k of keys) {
    v = v?.[k];
  }
  return v != null ? String(v) : '';
}

function detectLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'es' || saved === 'en') return saved;
  const browser = (navigator.language || navigator.userLanguage || '').toLowerCase();
  if (browser.startsWith('es')) return 'es';
  return 'en';
}

function applyLanguage(lang) {
  const t = translations[lang] || translations.en;
  const actualLang = lang === 'es' ? 'es' : 'en';

  document.documentElement.lang = actualLang === 'es' ? 'es' : 'en';

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = actualLang === 'es'
      ? 'Medanos es una banda alternativa punk rock con sede en Chicago. Vladimir, George, kharim, Jesús y Stephanie.'
      : 'Medanos is a Chicago-based alternative punk rock band. Vladimir, George, kharim, Jesús and Stephanie.';
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = getText(t, key);
    if (text) el.textContent = text;
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    const text = getText(t, key);
    if (text) el.setAttribute('aria-label', text);
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const text = getText(t, key);
    if (text) el.setAttribute('title', text);
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.getAttribute('data-lang') === actualLang);
  });
}

// Menú móvil
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('.nav');

function getCurrentTranslations() {
  const lang = document.documentElement.lang || 'es';
  return translations[lang] || translations.es;
}

function closeMobileMenu() {
  if (!navLinks || !navToggle) return;
  if (!navLinks.classList.contains('is-open')) return;

  navLinks.classList.remove('is-open');
  const t = getCurrentTranslations();
  navToggle.setAttribute('aria-label', t.nav.menuOpen);
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('is-open');
    const t = getCurrentTranslations();
    navToggle.setAttribute('aria-label',
      navLinks.classList.contains('is-open') ? t.nav.menuClose : t.nav.menuOpen
    );
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => closeMobileMenu());
  });

  // Cerrar menú si se hace click/tap fuera
  document.addEventListener('click', (e) => {
    if (!navLinks.classList.contains('is-open')) return;

    const target = e.target;
    if (!(target instanceof Node)) return;

    const clickedInsideNav = (nav && nav.contains(target)) || navLinks.contains(target) || navToggle.contains(target);
    if (!clickedInsideNav) closeMobileMenu();
  });
}

// Selector de idioma y detección inicial
document.addEventListener('DOMContentLoaded', () => {
  const lang = detectLanguage();
  applyLanguage(lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const newLang = btn.getAttribute('data-lang');
      localStorage.setItem(STORAGE_KEY, newLang);
      applyLanguage(newLang);
    });
  });
});
