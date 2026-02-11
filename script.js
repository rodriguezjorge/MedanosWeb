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
