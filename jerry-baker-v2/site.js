/* Black Hawk Real Estate · shared behaviour
   Identical on every page. Keep this file the single source of truth. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Nav: transparent hero nav goes solid on scroll ------------------- */
  var nav = document.getElementById('nav');
  var navLogo = document.getElementById('navLogo');
  if (nav && nav.classList.contains('nav--transparent')) {
    var onScroll = function () {
      var solid = window.scrollY > 60;
      nav.classList.toggle('is-solid', solid);
      if (navLogo) {
        navLogo.src = solid ? 'assets/logo-transparent.png' : 'assets/logo-white.png';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Nav: mobile menu ------------------------------------------------- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      if (nav) nav.classList.toggle('is-solid', open || window.scrollY > 60);
    });
  }

  /* --- Nav: dropdowns tap-to-open below 1040px -------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('.nav__item'), function (item) {
    var link = item.querySelector('.nav__link');
    var dd = item.querySelector('.nav__dropdown');
    if (!link || !dd) return;
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 1040) {
        e.preventDefault();
        item.classList.toggle('is-open');
      }
    });
  });

  /* --- FAQ accordions (single-open per group) --------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('.faq'), function (group) {
    Array.prototype.forEach.call(group.querySelectorAll('.faq__q'), function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.parentElement;
        var isOpen = item.classList.contains('is-open');
        Array.prototype.forEach.call(group.querySelectorAll('.faq__item'), function (other) {
          other.classList.remove('is-open');
          var q = other.querySelector('.faq__q');
          if (q) q.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  /* --- Scroll reveal ---------------------------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  var showAll = function () {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-visible'); });
  };
  if (reduced || !('IntersectionObserver' in window)) {
    showAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
    // Safety net: nothing on this site should ever stay invisible.
    setTimeout(showAll, 2500);
  }

  /* --- Community modals ------------------------------------------------- */
  var lastFocused = null;
  function openModal(id) {
    var modal = document.querySelector('.modal[data-community="' + id + '"]');
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    var close = modal.querySelector('.modal__close');
    if (close) close.focus();
  }
  function closeModal(modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }
  Array.prototype.forEach.call(document.querySelectorAll('[data-community-modal]'), function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      openModal(trigger.getAttribute('data-community-modal'));
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll('.modal'), function (modal) {
    var close = modal.querySelector('.modal__close');
    var backdrop = modal.querySelector('.modal__backdrop');
    if (close) close.addEventListener('click', function () { closeModal(modal); });
    if (backdrop) backdrop.addEventListener('click', function () { closeModal(modal); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = document.querySelector('.modal.is-open');
    if (open) closeModal(open);
  });

  /* --- Ambient sound toggle --------------------------------------------
     OFF by default, never autoplays. The audio source is NEEDS_CLIENT, so
     the control reports its own state honestly rather than failing silently. */
  var ambient = document.getElementById('ambientToggle');
  var audio = document.getElementById('ambientAudio');
  if (ambient) {
    ambient.addEventListener('click', function () {
      var on = ambient.getAttribute('aria-pressed') === 'true';
      var next = !on;
      ambient.setAttribute('aria-pressed', String(next));
      if (audio && audio.currentSrc) {
        if (next) { audio.play().catch(function () {}); } else { audio.pause(); }
      }
    });
  }
})();
