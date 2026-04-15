/* Vesper Photo — main.js */
(function () {
  'use strict';

  /* ─── Language Toggle ─── */
  var lang = 'en';

  function setLang(l) {
    lang = l;
    document.documentElement.lang = l === 'zh' ? 'zh-TW' : 'en';

    /* elements with data-en / data-zh attributes (text content) */
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var val = el.getAttribute('data-' + l);
      if (val) el.textContent = val;
    });

    /* about bio paragraphs */
    var bioEn = document.querySelector('.about__bio:not(.about__bio--zh)');
    var bioZh = document.querySelector('.about__bio--zh');
    if (bioEn) bioEn.style.display = l === 'zh' ? 'none' : '';
    if (bioZh) bioZh.style.display = l === 'zh' ? '' : 'none';

    /* select options */
    document.querySelectorAll('select option[data-' + l + ']').forEach(function (opt) {
      opt.textContent = opt.getAttribute('data-' + l);
    });

    /* toggle button label */
    var btn = document.getElementById('langToggle');
    if (btn) btn.textContent = l === 'zh' ? 'EN / 繁中' : 'EN / 繁中';

    /* form placeholders */
    if (l === 'zh') {
      var name = document.getElementById('name');
      var msg  = document.getElementById('message');
      if (name) name.placeholder = '新人姓名';
      if (msg)  msg.placeholder  = '婚禮場地在哪裡？這一天什麼對你最重要？';
    } else {
      var name2 = document.getElementById('name');
      var msg2  = document.getElementById('message');
      if (name2) name2.placeholder = 'Jane & John';
      if (msg2)  msg2.placeholder  = 'Where is your venue? What matters most to you on the day?';
    }
  }

  var toggle = document.getElementById('langToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      setLang(lang === 'en' ? 'zh' : 'en');
    });
  }

  /* ─── Nav scroll state ─── */
  var nav = document.getElementById('nav');
  function updateNav() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ─── Hamburger menu ─── */
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  /* ─── Lightbox ─── */
  var lightbox     = document.getElementById('lightbox');
  var lightboxImg  = document.getElementById('lightboxImg');
  var lightboxClose= document.getElementById('lightboxClose');
  var lightboxPrev = document.getElementById('lightboxPrev');
  var lightboxNext = document.getElementById('lightboxNext');
  var items        = Array.from(document.querySelectorAll('.masonry__item'));
  var currentIdx   = 0;

  function openLightbox(idx) {
    currentIdx = idx;
    var img = items[idx].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showAdjacent(dir) {
    currentIdx = (currentIdx + dir + items.length) % items.length;
    var img = items[currentIdx].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }

  items.forEach(function (item, i) {
    item.addEventListener('click', function () { openLightbox(i); });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev)  lightboxPrev.addEventListener('click',  function () { showAdjacent(-1); });
  if (lightboxNext)  lightboxNext.addEventListener('click',  function () { showAdjacent(1); });

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft')  showAdjacent(-1);
    if (e.key === 'ArrowRight') showAdjacent(1);
  });

  /* ─── Scroll Reveal ─── */
  var revealEls = document.querySelectorAll(
    '.about__text, .about__image-wrap, .service-card, .contact-form, .contact__aside, .section-header'
  );

  revealEls.forEach(function (el) {
    el.classList.add('reveal');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (i * 0.07) + 's';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(function (el) { observer.observe(el); });

  /* Masonry items reveal */
  var masonryItems = document.querySelectorAll('.masonry__item');
  masonryItems.forEach(function (el) { el.classList.add('reveal'); });
  var masonryObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        masonryObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  masonryItems.forEach(function (el) { masonryObserver.observe(el); });

  /* ─── Contact Form (static — opens mailto) ─── */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name    = (document.getElementById('name')    || {}).value || '';
      var email   = (document.getElementById('email')   || {}).value || '';
      var wdate   = (document.getElementById('wdate')   || {}).value || '';
      var pkg     = (document.getElementById('pkg')     || {}).value || '';
      var message = (document.getElementById('message') || {}).value || '';

      var body = encodeURIComponent(
        'Name: '          + name    + '\n' +
        'Email: '         + email   + '\n' +
        'Wedding Date: '  + wdate   + '\n' +
        'Package: '       + pkg     + '\n\n' +
        message
      );

      window.location.href = 'mailto:hello@vesperpho.to?subject=Wedding%20Enquiry&body=' + body;
    });
  }

})();
