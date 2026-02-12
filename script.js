// Gallery: carga la lista desde gallery-images.json (generada con node generate-gallery.js)
var GALLERY_IMAGES = [];
var GALLERY_VISIBLE = 3;
var galleryStartIndex = 0;
var gallerySlotsEl = document.querySelector('.gallery-slots');
var galleryPrevBtn = document.querySelector('.gallery-arrow-prev');
var galleryNextBtn = document.querySelector('.gallery-arrow-next');

function renderGallerySlots() {
  if (!gallerySlotsEl) return;
  var total = GALLERY_IMAGES.length;
  gallerySlotsEl.innerHTML = '';
  for (var i = 0; i < GALLERY_VISIBLE; i++) {
    var idx = galleryStartIndex + i;
    var item = document.createElement('div');
    item.className = 'gallery-item';
    if (idx < total) {
      var src = 'images/gallery/' + GALLERY_IMAGES[idx];
      item.innerHTML = '<img src="' + src + '" alt="Medanos" loading="lazy">';
    } else {
      item.classList.add('is-empty');
    }
    gallerySlotsEl.appendChild(item);
  }
  if (galleryPrevBtn) {
    galleryPrevBtn.disabled = galleryStartIndex === 0;
    galleryPrevBtn.style.visibility = total <= GALLERY_VISIBLE ? 'hidden' : 'visible';
  }
  if (galleryNextBtn) {
    galleryNextBtn.disabled = galleryStartIndex + GALLERY_VISIBLE >= total;
    galleryNextBtn.style.visibility = total <= GALLERY_VISIBLE ? 'hidden' : 'visible';
  }
}

function initGallery(images) {
  GALLERY_IMAGES = Array.isArray(images) ? images : [];
  galleryStartIndex = 0;
  renderGallerySlots();
}

if (gallerySlotsEl) {
  fetch('gallery-images.json')
    .then(function (r) { return r.ok ? r.json() : []; })
    .catch(function () { return []; })
    .then(function (list) {
      initGallery(list);
    });
  if (galleryPrevBtn) {
    galleryPrevBtn.addEventListener('click', function () {
      galleryStartIndex = Math.max(0, galleryStartIndex - GALLERY_VISIBLE);
      renderGallerySlots();
    });
  }
  if (galleryNextBtn) {
    galleryNextBtn.addEventListener('click', function () {
      galleryStartIndex = Math.min(
        Math.max(0, GALLERY_IMAGES.length - GALLERY_VISIBLE),
        galleryStartIndex + GALLERY_VISIBLE
      );
      renderGallerySlots();
    });
  }
  gallerySlotsEl.addEventListener('click', function (e) {
    var img = e.target.closest('.gallery-item:not(.is-empty) img');
    if (img && typeof openLightbox === 'function') openLightbox(img.src, img.alt);
  });
}

// Gallery lightbox
var lightbox = document.getElementById('lightbox');
var lightboxImg = lightbox && lightbox.querySelector('.lightbox-img');
var lightboxClose = lightbox && lightbox.querySelector('.lightbox-close');
var lightboxBackdrop = lightbox && lightbox.querySelector('.lightbox-backdrop');

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
