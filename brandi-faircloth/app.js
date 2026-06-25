// Faircloth Home Team — shared interactions
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.menu');
  if (toggle && menu) toggle.addEventListener('click', function () { menu.classList.toggle('open'); });

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () { q.parentElement.classList.toggle('open'); });
  });

  // Team bio expand
  document.querySelectorAll('.member .more').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.member');
      card.classList.toggle('open');
      btn.textContent = card.classList.contains('open') ? 'Close' : 'Read Bio';
    });
  });

  // Community modals
  document.querySelectorAll('[data-modal]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var d = document.getElementById(trigger.getAttribute('data-modal'));
      if (d && typeof d.showModal === 'function') d.showModal();
    });
  });
  document.querySelectorAll('dialog .d-close').forEach(function (c) {
    c.addEventListener('click', function () { c.closest('dialog').close(); });
  });
  document.querySelectorAll('dialog').forEach(function (d) {
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
  });
});
