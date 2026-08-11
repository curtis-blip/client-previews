/* Black Hawk Real Estate · shared page behaviour
   Loaded by every page. Every handler guards on element existence so a page
   without a given block is a no-op rather than a console error. */
(function () {
  'use strict';

  /* ---- review editor loader ----
     Injects review.css + review.js ONLY when the URL carries ?review.
     Curtis reviews at ?review=1; Jerry and Rachael never see the chrome even
     though the two files sit in the same directory. */
  if (/[?&]review\b/.test(location.search)) {
    var css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = 'review.css';
    document.head.appendChild(css);
    var js = document.createElement('script');
    js.src = 'review.js'; js.defer = true;
    document.head.appendChild(js);
  }

  /* ---- nav: transparent over a hero, solid everywhere else ---- */
  var nav = document.getElementById('nav');
  if (nav) {
    var hasHero = !!document.querySelector('.hero, .phero:not(.phero--flat)');
    if (!hasHero) {
      nav.classList.remove('is-top');
      nav.classList.add('is-solid');
    } else {
      var trigger = function () {
        var h = document.querySelector('.hero') ? window.innerHeight * 0.72
              : (document.querySelector('.phero') || {}).offsetHeight * 0.6 || 240;
        if (window.scrollY > h) {
          nav.classList.remove('is-top');
          nav.classList.add('is-solid');
        } else {
          nav.classList.add('is-top');
          nav.classList.remove('is-solid');
        }
      };
      window.addEventListener('scroll', trigger, { passive: true });
      trigger();
    }
  }

  /* ---- mobile menu ---- */
  var burger = document.querySelector('.nav__burger');
  var menu = document.querySelector('.nav__menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---- accordion, single open ---- */
  var qs = document.querySelectorAll('.ask__q');
  Array.prototype.forEach.call(qs, function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var wasOpen = item.classList.contains('is-open');
      var siblings = item.parentElement.querySelectorAll('.ask__item');
      Array.prototype.forEach.call(siblings, function (i) { i.classList.remove('is-open'); });
      if (!wasOpen) item.classList.add('is-open');
    });
  });

  /* ---- community modals ---- */
  var triggers = document.querySelectorAll('[data-modal]');
  Array.prototype.forEach.call(triggers, function (t) {
    t.addEventListener('click', function () {
      var d = document.getElementById(t.getAttribute('data-modal'));
      if (d && typeof d.showModal === 'function') d.showModal();
    });
  });
  var closers = document.querySelectorAll('[data-modal-close]');
  Array.prototype.forEach.call(closers, function (c) {
    c.addEventListener('click', function () {
      var d = c.closest('dialog');
      if (d) d.close();
    });
  });
  /* click the backdrop to dismiss */
  var dialogs = document.querySelectorAll('dialog.cmodal');
  Array.prototype.forEach.call(dialogs, function (d) {
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
  });

  /* ---- net proceeds estimator ----
     Self-contained arithmetic on user inputs, no external feed, so a real
     working estimator is within our control. Unlike IDX and valuation widgets,
     which stay as labelled placeholders. */
  var np = document.getElementById('np');
  if (np) {
    var fields = ['npPrice', 'npMortgage', 'npCommission', 'npClosing', 'npRepairs'];
    var fmt = function (n) {
      return '$' + Math.round(n).toLocaleString('en-US');
    };
    var calc = function () {
      var val = function (id) {
        var el = document.getElementById(id);
        var v = parseFloat(String(el && el.value).replace(/[^0-9.]/g, ''));
        return isNaN(v) ? 0 : v;
      };
      var price = val('npPrice');
      var mortgage = val('npMortgage');
      var commissionPct = val('npCommission');
      var closingPct = val('npClosing');
      var repairs = val('npRepairs');

      var commission = price * (commissionPct / 100);
      var closing = price * (closingPct / 100);
      var costs = commission + closing + repairs;
      var net = price - mortgage - costs;

      var set = function (id, v) { var e = document.getElementById(id); if (e) e.textContent = v; };
      set('npOutPrice', fmt(price));
      set('npOutMortgage', '-' + fmt(mortgage));
      set('npOutCommission', '-' + fmt(commission));
      set('npOutClosing', '-' + fmt(closing));
      set('npOutRepairs', '-' + fmt(repairs));
      set('npOutNet', fmt(net < 0 ? 0 : net));
    };
    fields.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', calc);
    });
    calc();
  }
})();
