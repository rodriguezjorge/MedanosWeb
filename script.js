// Gallery lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox && lightbox.querySelector('.lightbox-img');
const lightboxClose = lightbox && lightbox.querySelector('.lightbox-close');
const lightboxBackdrop = lightbox && lightbox.querySelector('.lightbox-backdrop');

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (lightbox && lightboxImg) {
  document.querySelectorAll('.gallery-item img').forEach(function (img) {
    img.addEventListener('click', function (e) {
      e.preventDefault();
      openLightbox(this.src, this.alt);
    });
  });
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) closeLightbox();
  });
}

// Mobile menu
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('.nav');

function closeMobileMenu() {
  if (!navLinks || !navToggle) return;
  if (!navLinks.classList.contains('is-open')) return;
  navLinks.classList.remove('is-open');
  navToggle.setAttribute('aria-label', 'Open menu');
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('is-open');
    navToggle.setAttribute(
      'aria-label',
      navLinks.classList.contains('is-open') ? 'Close menu' : 'Open menu'
    );
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => closeMobileMenu());
  });

  document.addEventListener('click', (e) => {
    if (!navLinks.classList.contains('is-open')) return;
    const target = e.target;
    if (!(target instanceof Node)) return;
    const clickedInsideNav =
      (nav && nav.contains(target)) ||
      navLinks.contains(target) ||
      navToggle.contains(target);
    if (!clickedInsideNav) closeMobileMenu();
  });
}
