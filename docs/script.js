/* Vesper Photo — script.js */

/* ── LANGUAGE SYSTEM ── */
let currentLang = 'zh';

function setLang(lang) {
  currentLang = lang;
  document.body.setAttribute('data-lang', lang);

  // Update toggle buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Update all elements with data-zh / data-en attributes
  document.querySelectorAll('[data-zh][data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) el.textContent = text;
  });

  // Handle innerHTML for elements with HTML entities (e.g. &ldquo;)
  document.querySelectorAll('[data-zh]').forEach(el => {
    const en = el.getAttribute('data-en');
    if (!en) return;
    if (lang === 'en' && en.includes('&')) {
      el.innerHTML = en;
    }
  });

  // Show/hide zh-text / en-text story paragraphs
  document.querySelectorAll('.zh-text').forEach(el => {
    el.style.display = lang === 'zh' ? '' : 'none';
  });
  document.querySelectorAll('.en-text').forEach(el => {
    el.style.display = lang === 'en' ? '' : 'none';
  });

  // Persist preference
  try { localStorage.setItem('vesper-lang', lang); } catch(e) {}
}

// Restore saved preference on load
(function() {
  try {
    const saved = localStorage.getItem('vesper-lang');
    if (saved === 'en') setLang('en');
  } catch(e) {}
})();


/* ── NAVIGATION SCROLL EFFECT ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


/* ── MOBILE MENU ── */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('hamburger');
  const open = menu.classList.toggle('open');
  btn.style.opacity = open ? '0.6' : '1';
  document.body.style.overflow = open ? 'hidden' : '';
}

// Close on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 960) {
    document.getElementById('mobileMenu').classList.remove('open');
    document.body.style.overflow = '';
  }
});


/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function initReveal() {
  const targets = document.querySelectorAll(
    '.service-card, .about-inner, .contact-inner, .section-header, .intro-strip-text, .pull-quote'
  );
  targets.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}


/* ── PORTFOLIO LIGHTBOX ── */
let lightboxImages = [];
let lightboxIndex = 0;

function initGallery() {
  const slots = document.querySelectorAll('.photo-slot');
  lightboxImages = [];

  slots.forEach((slot, i) => {
    const img = slot.querySelector('img');
    if (img && img.src && !slot.classList.contains('placeholder')) {
      lightboxImages.push(img.src);
      slot.addEventListener('click', () => openLightbox(i));
    }
  });
}

function openLightbox(index) {
  if (lightboxImages.length === 0) return;
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
  setTimeout(() => {
    img.src = lightboxImages[lightboxIndex];
    img.style.opacity = '1';
  }, 150);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'ArrowRight') lightboxNav(1);
  if (e.key === 'ArrowLeft') lightboxNav(-1);
  if (e.key === 'Escape') closeLightbox();
});


/* ── CONTACT FORM ── */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  const success = document.getElementById('formSuccess');
  const lang = currentLang;

  btn.disabled = true;
  btn.querySelector('span').textContent = lang === 'zh' ? '送出中…' : 'Sending…';

  // Simulate submission delay (replace with real form service like Formspree or Netlify)
  setTimeout(() => {
    e.target.reset();
    btn.disabled = false;
    btn.querySelector('span').textContent = lang === 'zh' ? '送出訊息' : 'Send Message';
    success.classList.add('show');
    setTimeout(() => success.classList.remove('show'), 5000);
  }, 800);

  // To use Formspree: set your form action to https://formspree.io/f/YOUR_ID
  // and remove this preventDefault + setTimeout block.
}


/* ── SMOOTH ANCHOR OFFSET (accounts for fixed nav) ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initGallery();
});
