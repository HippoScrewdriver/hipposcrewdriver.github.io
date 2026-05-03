/* Vesper Photo — script.js */

/* ── LANGUAGE ── */
let currentLang = 'zh';

function setLang(lang) {
  currentLang = lang;
  document.body.setAttribute('data-lang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  document.querySelectorAll('[data-zh][data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) {
      if (text.includes('&')) { el.innerHTML = text; }
      else { el.textContent = text; }
    }
  });
  document.querySelectorAll('.zh-text').forEach(el => { el.style.display = lang === 'zh' ? '' : 'none'; });
  document.querySelectorAll('.en-text').forEach(el => { el.style.display = lang === 'en' ? '' : 'none'; });
  try { localStorage.setItem('vesper-lang', lang); } catch(e) {}
}

(function () {
  try { const s = localStorage.getItem('vesper-lang'); if (s === 'en') setLang('en'); } catch(e) {}
})();

/* ── NAV ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── MOBILE MENU ── */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const open = menu.classList.toggle('open');
  document.body.style.overflow = open ? 'hidden' : '';
}
window.addEventListener('resize', () => {
  if (window.innerWidth > 960) {
    document.getElementById('mobileMenu').classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.1 });

/* ── GALLERY — loads from photos.json, any filename ── */
let lightboxImages = [];
let lightboxIndex  = 0;

async function initGallery() {
  const gallery = document.getElementById('gallery');

  let photos = [];
  try {
    const res = await fetch('photos.json');
    if (!res.ok) throw new Error('not found');
    photos = await res.json();
  } catch (e) {
    gallery.innerHTML = '<p style="text-align:center;color:#ccb0b0;padding:60px 0;font-size:13px;letter-spacing:0.08em;">请在 photos.json 中填入照片文件名。</p>';
    return;
  }

  if (!Array.isArray(photos) || photos.length === 0) {
    gallery.innerHTML = '<p style="text-align:center;color:#ccb0b0;padding:60px 0;font-size:13px;letter-spacing:0.08em;">photos.json 为空，请添加照片。</p>';
    return;
  }

  lightboxImages = photos.map(f => `images/${f}`);

  photos.forEach((filename, i) => {
    const slot = document.createElement('div');
    slot.className = 'photo-slot';
    const img = document.createElement('img');
    img.src     = `images/${filename}`;
    img.alt     = `Wedding photo ${i + 1}`;
    img.loading = 'lazy';
    const overlay = document.createElement('div');
    overlay.className = 'photo-overlay';
    slot.appendChild(img);
    slot.appendChild(overlay);
    slot.addEventListener('click', () => openLightbox(i));
    gallery.appendChild(slot);
  });
}

/* ── LIGHTBOX ── */
function openLightbox(index) {
  lightboxIndex = index;
  document.getElementById('lbImg').src = lightboxImages[lightboxIndex];
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function lightboxNav(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  const img = document.getElementById('lbImg');
  img.style.opacity = '0';
  setTimeout(() => { img.src = lightboxImages[lightboxIndex]; img.style.opacity = '1'; }, 150);
}
document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'ArrowRight') lightboxNav(1);
  if (e.key === 'ArrowLeft')  lightboxNav(-1);
  if (e.key === 'Escape')     closeLightbox();
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
  });
});

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  document.querySelectorAll('.about-inner, .section-header, .pull-quote').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
});
