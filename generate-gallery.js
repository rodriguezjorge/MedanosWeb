/**
 * Genera gallery-images.json con todas las imágenes en images/gallery/
 * Ejecuta: node generate-gallery.js
 * Luego la galería en la web cargará automáticamente esa lista.
 */

const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, 'images', 'gallery');
const outputFile = path.join(__dirname, 'gallery-images.json');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);

let names = [];
try {
  names = fs.readdirSync(galleryDir)
    .filter(function (name) {
      const ext = path.extname(name).toLowerCase();
      return imageExtensions.has(ext);
    })
    .sort();
} catch (err) {
  console.error('Error leyendo images/gallery:', err.message);
  process.exit(1);
}

fs.writeFileSync(outputFile, JSON.stringify(names, null, 2), 'utf8');
console.log('gallery-images.json actualizado con', names.length, 'imagen(es):', names.join(', '));
