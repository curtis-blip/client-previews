/*
 * Grapple accessibility panel (grapple/kit/a11y/a11y-panel.js).
 *
 * ONE file for a client's site and for their mockups, so the client reviews the panel
 * they will get. The theme kit enqueues it with its settings printed by PHP; a mockup
 * page includes it after a11y/config.js (grapple/kit/a11y/mockup_bundle.py writes both).
 * Settings: window.GrappleA11y, or a JSON island <script type="application/json"
 * id="grapple-a11y">. Nothing here is client-specific; the prefix, labels, token map,
 * the client's own setting CSS and the feature switches all arrive in the settings.
 *
 * The settings are classes on <html> ({P}a11y-text-1, {P}a11y-contrast, ...), saved in
 * this browser only (localStorage "{P}a11y"). A small <head> script (a11y/head.js)
 * applies them before first paint; this file applies them again, builds the panel
 * (unless the page printed one), and runs Listen, Jump to section and the reading guide.
 * Styles: grapple/css/a11y-panel.css.tmpl. Nothing starts by itself.
 */
(function () {
  'use strict';
  var d = document, html = d.documentElement, body = d.body;
  if (!body || window.__grappleA11y) return;
  window.__grappleA11y = true;
  var SRC = (d.currentScript && d.currentScript.src) || '';

  // ------------------------------------------------------------------ settings
  var C = window.GrappleA11y;
  if (!C || typeof C !== 'object') {
    C = {};
    var island = d.getElementById('grapple-a11y');
    if (island) { try { C = JSON.parse(island.textContent) || {}; } catch (e) { C = {}; } }
  }
  var P = typeof C.prefix === 'string' ? C.prefix : 'gk-';
  var F = C.features || {};
  var feat = function (k) { return F[k] !== false; };
  var LABELS = {
    open: 'Accessibility', title: 'Accessibility settings', close: 'Close accessibility settings',
    text: 'Text size', text_0: 'Default', text_1: 'Large', text_2: 'Largest',
    display: 'Reading and display', contrast: 'Higher contrast', readable: 'Easier-to-read type',
    spacing: 'More space between lines and letters', underline: 'Underline all links',
    focus: 'Stronger keyboard focus outline', motion: 'Stop animation and background video',
    font: 'Readable font (Atkinson Hyperlegible)', guide: 'Reading guide',
    note: 'Saved in this browser only. Your device settings for zoom and reduced motion are respected as well.',
    reset: 'Reset', done: 'Done', jump: 'Jump to section',
    listen: 'Listen', read: 'Read this page', pause: 'Pause', resume: 'Resume', stop: 'Stop',
    speed: 'Speed', slower: 'Slower', normal: 'Normal', faster: 'Faster',
    reading: 'Reading', paused: 'Paused', finished: 'Finished', stopped: 'Stopped', image: 'Image'
  };
  var L = function (k) { return C.labels && typeof C.labels[k] === 'string' && C.labels[k] ? C.labels[k] : LABELS[k]; };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return '&#' + c.charCodeAt(0) + ';'; }); };
  var KEY = typeof C.storage === 'string' && C.storage ? C.storage : P + 'a11y';
  var OPTS = ['contrast', 'readable', 'spacing', 'underline', 'focus', 'motion']
    .concat(feat('font') ? ['font'] : [], feat('guide') ? ['guide'] : []);

  var reduceMotion = function () {
    return html.classList.contains(P + 'a11y-motion') ||
      !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  };
  var one = function (sel, root) { try { return sel ? (root || d).querySelector(sel) : null; } catch (e) { return null; } };
  var contentRoot = function () {
    var root = null;
    String(C.root || 'main, .entry-content, #primary').split(',').some(function (s) { root = one(s.trim()); return !!root; });
    return root;
  };
  var addStyle = function (id, css) {
    if (!css) return null;
    var s = d.getElementById(id) || d.createElement('style');
    s.id = id;
    s.textContent = css;
    if (!s.parentNode) (d.head || html).appendChild(s);
    return s;
  };

  // The design's scope class (a mockup body has none), its tokens, and the client's own
  // setting CSS (a mockup's contrast rules; a site keeps them in its stylesheet).
  var SITE = typeof C.site_class === 'string' && C.site_class ? C.site_class : P + 'site';
  if (!body.classList.contains(SITE)) body.classList.add(SITE);
  if (C.tokens && typeof C.tokens === 'object') {
    addStyle(P + 'a11y-tokens', '.' + SITE + '{' + Object.keys(C.tokens).map(function (k) {
      return '--' + P + 'a11y-' + k + ':' + C.tokens[k] + ';';
    }).join('') + '}');
  }
  if (typeof C.css === 'string') addStyle(P + 'a11y-css', C.css);

  // Readable font: declared here, beside this file, so it is only downloaded when the
  // setting puts it to use (font-display: swap; Latin subset; SIL OFL, see fonts/).
  if (feat('font')) {
    var fbase = typeof C.fonts === 'string' && C.fonts ? C.fonts : SRC.replace(/[^\/]*$/, '') + 'fonts/atkinson-hyperlegible/';
    var RANGE = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD';
    addStyle(P + 'a11y-fonts', [['normal', 400, '400'], ['italic', 400, '400-italic'], ['normal', 700, '700'], ['italic', 700, '700-italic']].map(function (f) {
      return '@font-face{font-family:"Atkinson Hyperlegible";font-style:' + f[0] + ';font-weight:' + f[1] +
        ';font-display:swap;src:url("' + fbase + 'atkinson-hyperlegible-' + f[2] + '.woff2") format("woff2");unicode-range:' + RANGE + '}';
    }).join('\n'));
  }

  // Text size needs every font-size multiplied by var(--{P}fs). On a site the stylesheet
  // already does it (mockcss.py writes calc(X * var(--{P}fs, 1))). A mockup's stylesheet
  // does not, and must never be edited for it (mockcss converts it for the build, where a
  // scale written in would double), so each same-origin rule that sets a font-size gets
  // an override here: same selector, same @media / @supports, same !important, last.
  var scaleFonts = function () {
    var mode = C.font_scale || 'auto';
    if (mode === 'off') return;
    var VAR = 'var(--' + P + 'fs', out = [], uses = false;
    var walk = function (rules, wrap) {
      for (var i = 0; i < rules.length; i++) {
        var r = rules[i];
        if (r.selectorText !== undefined && r.style) {
          var v = r.style.getPropertyValue('font-size');
          if (!v) continue;
          v = v.trim();
          if (v.indexOf(VAR) >= 0) { uses = true; continue; }
          if (/^(inherit|initial|unset|revert|revert-layer)$/.test(v)) continue;
          var imp = r.style.getPropertyPriority('font-size') === 'important' ? ' !important' : '';
          var css = r.selectorText + '{font-size:calc(' + v + ' * var(--' + P + 'fs, 1))' + imp + '}';
          for (var w = wrap.length - 1; w >= 0; w--) css = wrap[w] + '{' + css + '}';
          out.push(css);
        } else if (r.cssRules && r.cssText) {
          var prelude = r.cssText.slice(0, r.cssText.indexOf('{')).trim();
          if (/^@(media|supports|container|layer)\b/.test(prelude)) walk(r.cssRules, wrap.concat([prelude]));
        }
      }
    };
    Array.prototype.forEach.call(d.styleSheets, function (s) {
      var node = s.ownerNode;
      if (node && node.id && node.id.indexOf(P + 'a11y') === 0) return;  // the panel's own sheets
      var rules;
      try { rules = s.cssRules; } catch (e) { return; }                   // another origin's sheet
      if (rules) walk(rules, []);
    });
    if ((uses && mode === 'auto') || !out.length) return;
    var st = d.getElementById(P + 'a11y-fs') || d.createElement('style');
    st.id = P + 'a11y-fs';
    st.textContent = out.join('\n');
    body.appendChild(st);
  };

  // ------------------------------------------------------------------ the saved settings
  var load = function () { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; } };
  var save = function (s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} };
  // quiet: the classes only (at start-up the <head> script already set them); otherwise
  // also tell the page's own script ({P}a11y-change: the hero video listens for motion).
  var apply = function (s, quiet) {
    [P + 'a11y-text-1', P + 'a11y-text-2'].forEach(function (c) { html.classList.remove(c); });
    if (s.text && s.text !== '0') html.classList.add(P + 'a11y-text-' + s.text);
    OPTS.forEach(function (k) { html.classList.toggle(P + 'a11y-' + k, !!s[k]); });
    if (quiet) return;
    var ev;
    try { ev = new Event(P + 'a11y-change'); } catch (e) { ev = d.createEvent('Event'); ev.initEvent(P + 'a11y-change', false, false); }
    html.dispatchEvent(ev);
  };

  // ------------------------------------------------------------------ the panel
  var panel = d.getElementById(P + 'a11y-panel');
  if (!panel) {
    var opt = function (k) { return '<label class="' + P + 'a11y__opt"><input type="checkbox" data-' + P + 'a11y="' + k + '"> ' + esc(L(k)) + '</label>'; };
    var radio = function (name, value, label, checked) {
      return '<label><input type="radio" name="' + P + name + '" value="' + value + '"' + (checked ? ' checked' : '') + '> ' + esc(label) + '</label>';
    };
    var labelsJson = {};
    ['read', 'pause', 'resume', 'reading', 'paused', 'finished', 'stopped', 'image'].forEach(function (k) { labelsJson[k] = L(k); });
    body.insertAdjacentHTML('beforeend',
      '<div class="' + P + 'a11y ' + P + 'chrome">' +
        '<button type="button" class="' + P + 'a11y__open" aria-haspopup="dialog" aria-controls="' + P + 'a11y-panel" hidden>' +
          '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="4.2" r="2.1" fill="currentColor"/><path d="M4 8.2c2.7.8 5.3 1.2 8 1.2s5.3-.4 8-1.2M12 9.4v5.1m0 0-3 6.5m3-6.5 3 6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '<span class="' + P + 'a11y__label">' + esc(L('open')) + '</span>' +
        '</button>' +
        '<dialog class="' + P + 'a11y__panel" id="' + P + 'a11y-panel" aria-labelledby="' + P + 'a11y-title">' +
          '<div class="' + P + 'a11y__head">' +
            '<h2 class="' + P + 'a11y__title" id="' + P + 'a11y-title">' + esc(L('title')) + '</h2>' +
            '<button type="button" class="' + P + 'a11y__close" aria-label="' + esc(L('close')) + '">' +
              '<svg viewBox="0 0 14 14" aria-hidden="true" focusable="false"><path d="M1 1l12 12M13 1 1 13" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>' +
            '</button>' +
          '</div>' +
          '<fieldset class="' + P + 'a11y__group"><legend>' + esc(L('text')) + '</legend><div class="' + P + 'a11y__sizes">' +
            radio('a11y-text', '0', L('text_0'), true) + radio('a11y-text', '1', L('text_1')) + radio('a11y-text', '2', L('text_2')) +
          '</div></fieldset>' +
          '<fieldset class="' + P + 'a11y__group"><legend>' + esc(L('display')) + '</legend>' + OPTS.map(opt).join('') + '</fieldset>' +
          (feat('listen') ?
            '<fieldset class="' + P + 'a11y__group ' + P + 'a11y__listen" data-' + P + 'labels="' + esc(JSON.stringify(labelsJson)) + '" hidden>' +
              '<legend>' + esc(L('listen')) + '</legend>' +
              '<div class="' + P + 'a11y__speak">' +
                '<button type="button" class="' + P + 'a11y__read">' + esc(L('read')) + '</button>' +
                '<button type="button" class="' + P + 'a11y__stop" disabled>' + esc(L('stop')) + '</button>' +
              '</div>' +
              '<fieldset class="' + P + 'a11y__rate"><legend>' + esc(L('speed')) + '</legend><div class="' + P + 'a11y__sizes">' +
                radio('a11y-rate', '0.85', L('slower')) + radio('a11y-rate', '1', L('normal'), true) + radio('a11y-rate', '1.2', L('faster')) +
              '</div></fieldset>' +
              '<p class="' + P + 'a11y__status" role="status" aria-live="polite"></p>' +
            '</fieldset>' : '') +
          (feat('jump') ?
            '<section class="' + P + 'a11y__group ' + P + 'a11y__jump" aria-labelledby="' + P + 'a11y-jump-h" hidden>' +
              '<h3 class="' + P + 'a11y__legend" id="' + P + 'a11y-jump-h">' + esc(L('jump')) + '</h3>' +
              '<ul class="' + P + 'a11y__jumps"></ul>' +
            '</section>' : '') +
          '<p class="' + P + 'a11y__note">' + esc(L('note')) + '</p>' +
          '<div class="' + P + 'a11y__actions">' +
            '<button type="button" class="' + P + 'a11y__reset">' + esc(L('reset')) + '</button>' +
            '<button type="button" class="' + P + 'a11y__done">' + esc(L('done')) + '</button>' +
          '</div>' +
        '</dialog>' +
      '</div>');
    panel = d.getElementById(P + 'a11y-panel');
  }
  var open = one('.' + P + 'a11y__open');
  var state = load();
  apply(state, true);
  scaleFonts();
  if (!open || !panel || typeof panel.showModal !== 'function') return;  // no <dialog>: the panel stays hidden

  open.hidden = false;
  var jumpTo = null;  // a heading chosen in Jump to section: it gets focus when the panel closes
  var sync = function () {
    Array.prototype.forEach.call(panel.querySelectorAll('input[name="' + P + 'a11y-text"]'), function (r) { r.checked = String(state.text || '0') === r.value; });
    Array.prototype.forEach.call(panel.querySelectorAll('input[data-' + P + 'a11y]'), function (c) { c.checked = !!state[c.getAttribute('data-' + P + 'a11y')]; });
    Array.prototype.forEach.call(panel.querySelectorAll('input[name="' + P + 'a11y-rate"]'), function (r) { r.checked = String(state.rate || '1') === r.value; });
  };
  open.addEventListener('click', function () { sync(); if (fillJumps) fillJumps(); panel.showModal(); });
  var close = function () { panel.close(); };
  panel.addEventListener('close', function () {
    if (jumpTo) { var h = jumpTo; jumpTo = null; h.focus({ preventScroll: true }); } else open.focus();
  });
  panel.querySelector('.' + P + 'a11y__close').addEventListener('click', close);
  panel.querySelector('.' + P + 'a11y__done').addEventListener('click', close);
  panel.addEventListener('click', function (e) { if (e.target === panel) close(); });  // backdrop
  panel.querySelector('.' + P + 'a11y__reset').addEventListener('click', function () { state = {}; save(state); apply(state); sync(); });
  panel.addEventListener('change', function (e) {
    var t = e.target;
    if (t.name === P + 'a11y-text') state.text = t.value;
    else if (t.name === P + 'a11y-rate') state.rate = t.value;
    else if (t.hasAttribute('data-' + P + 'a11y')) state[t.getAttribute('data-' + P + 'a11y')] = t.checked;
    save(state); apply(state);
  });

  // Shared by Listen and Jump to section: is an element drawn at all?
  var drawn = function (el) {
    if (el.hidden || el.getAttribute('aria-hidden') === 'true') return false;
    var cs = window.getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.visibility === 'collapse') return false;
    if (cs.display !== 'contents' && el.checkVisibility && !el.checkVisibility({ visibilityProperty: true })) return false;
    return true;
  };
  var words = function (el) { return (el.textContent || '').replace(/\s+/g, ' ').trim(); };

  // ------------------------------------------------------------------ jump to section
  // The content's h2s (none inside a dialog or hidden), as links. Choosing one closes the
  // panel, scrolls to the heading below the fixed header and moves focus to it.
  var fillJumps = null;
  var jumpGroup = panel.querySelector('.' + P + 'a11y__jump');
  if (jumpGroup && feat('jump')) {
    var jumpList = jumpGroup.querySelector('ul');
    var slug = function (s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'section'; };
    var fixedHeader = function () {
      var hd = one(C.header || '') || one('#' + P + 'hdr');
      if (!hd) hd = Array.prototype.filter.call(d.querySelectorAll('header, [role="banner"]'), function (h) { var p = window.getComputedStyle(h).position; return p === 'fixed' || p === 'sticky'; })[0];
      return hd || null;
    };
    // Where the heading sits in the layout, without transforms: a reveal-on-scroll
    // animation would otherwise leave it under the header once it settles.
    var layoutTop = function (el) { var y = 0; for (var n = el; n; n = n.offsetParent) y += n.offsetTop; return y; };
    var goTo = function (h) {
      jumpTo = h;
      close();
      // the page's scroll-padding when it has one (a site), else the fixed header's height
      var pad = parseFloat(window.getComputedStyle(html).scrollPaddingTop) || 0;
      if (!pad) { var hd = fixedHeader(); pad = Math.ceil(hd ? Math.max(0, hd.getBoundingClientRect().bottom) : 0) + 16; }
      if (!h.hasAttribute('tabindex')) h.setAttribute('tabindex', '-1');
      var top = Math.max(0, layoutTop(h) - pad);
      try { window.scrollTo({ top: top, behavior: reduceMotion() ? 'auto' : 'smooth' }); } catch (e) { window.scrollTo(0, top); }
      h.focus({ preventScroll: true });
    };
    fillJumps = function () {
      var root = contentRoot();
      var hs = root ? Array.prototype.filter.call(root.querySelectorAll('h2'), function (h) {
        if (h.closest('dialog, [hidden], [aria-hidden="true"], .' + P + 'a11y')) return false;
        for (var n = h; n && n !== root; n = n.parentElement) if (!drawn(n)) return false;
        return !!words(h);
      }) : [];
      jumpList.innerHTML = '';
      jumpGroup.hidden = hs.length < 3;
      hs.forEach(function (h) {
        if (!h.id) { var base = P + 'sec-' + slug(words(h)), id = base, n = 2; while (d.getElementById(id)) id = base + '-' + n++; h.id = id; }
        var li = d.createElement('li'), a = d.createElement('a');
        a.href = '#' + h.id;
        a.textContent = words(h);
        a.addEventListener('click', function (e) { e.preventDefault(); goTo(h); });
        li.appendChild(a);
        jumpList.appendChild(li);
      });
    };
  }

  // ------------------------------------------------------------------ reading guide
  // A clear band about three lines tall, the page above and below it dimmed. It follows
  // the mouse or a finger, and focus for keyboard users; it never takes a click.
  if (feat('guide')) {
    var guide = null, gy = null;
    var band = function () {
      // three lines of the body copy: the first paragraph of some length in the content
      var p = Array.prototype.filter.call((contentRoot() || body).querySelectorAll('p'), function (x) { return x.offsetParent && words(x).length > 60; })[0];
      var cs = window.getComputedStyle(p || body);
      var lh = parseFloat(cs.lineHeight) || (parseFloat(cs.fontSize) || 16) * 1.5;
      return Math.round(Math.min(Math.max(lh * 3, 48), 160));
    };
    var place = function (y) {
      if (!html.classList.contains(P + 'a11y-guide')) return;
      if (!guide) {
        guide = d.createElement('div');
        guide.className = P + 'a11y__guide';
        guide.setAttribute('aria-hidden', 'true');
        guide.innerHTML = '<div class="' + P + 'a11y__guide-above"></div><div class="' + P + 'a11y__guide-below"></div>';
        body.appendChild(guide);
      }
      var h = band();
      gy = y == null ? (gy == null ? window.innerHeight * 0.4 : gy) : y;
      guide.style.setProperty('--' + P + 'guide-top', Math.round(Math.max(0, Math.min(window.innerHeight - h, gy - h / 2))) + 'px');
      guide.style.setProperty('--' + P + 'guide-h', h + 'px');
    };
    // After a focus change the band stays on the focused element, also while the page
    // scrolls it into view (smoothly, on most designs), until the pointer moves again.
    var follow = null;
    var onFocused = function () {
      if (!follow) return;
      var r = follow.getBoundingClientRect();
      if (r.height || r.width) place(r.top + r.height / 2);
    };
    window.addEventListener('pointermove', function (e) { follow = null; place(e.clientY); }, { passive: true });
    window.addEventListener('touchmove', function (e) { follow = null; if (e.touches && e.touches[0]) place(e.touches[0].clientY); }, { passive: true });
    d.addEventListener('focusin', function (e) {
      var t = e.target;
      if (!t || !t.getBoundingClientRect || t === d.body || !html.classList.contains(P + 'a11y-guide')) return;
      follow = t;
      requestAnimationFrame(onFocused);
    });
    window.addEventListener('scroll', onFocused, { passive: true });
    html.addEventListener(P + 'a11y-change', function () { place(null); });
    place(null);
  }

  // ------------------------------------------------------------------ listen
  // The browser's own speech (Web Speech API): nothing leaves the page, no service, no
  // keys, never starts by itself. The content is read in DOM order, one utterance per
  // block, long blocks in sentences of at most `chunk` characters (Chrome's online voices
  // stop after about 15 seconds of one utterance). An informative image is read as
  // "Image: <alt>" where it sits. Pause cancels and remembers the sentence and Resume
  // says it again: a real pause() is unreliable on Chrome's online voices.
  var lgroup = panel.querySelector('.' + P + 'a11y__listen');
  var synth = window.speechSynthesis;
  if (lgroup && feat('listen') && synth && typeof synth.speak === 'function' && typeof window.SpeechSynthesisUtterance === 'function') {
    html.classList.add(P + 'can-speak');
    lgroup.hidden = false;
    var LB = {};
    try { LB = JSON.parse(lgroup.getAttribute('data-' + P + 'labels') || '{}') || {}; } catch (e) { LB = {}; }
    var lab = function (k) { return typeof LB[k] === 'string' && LB[k] ? LB[k] : L(k); };
    var readBtn = lgroup.querySelector('.' + P + 'a11y__read');
    var stopBtn = lgroup.querySelector('.' + P + 'a11y__stop');
    var status = lgroup.querySelector('.' + P + 'a11y__status');
    var SPEAKING = P + 'speaking';
    var CHUNK = Math.max(60, parseInt(C.chunk, 10) || 220);
    var queue = [], at = 0, mode = 'idle', gen = 0, current = null, voice = null, index = null;

    // Text counts only inside a readable block; a block inside another (a list inside a
    // list item, the paragraph inside a quote) is its own item, and the outer block's
    // remaining text (the quote's cite) follows it: nothing is read twice, all in DOM order.
    var BLOCK = /^(h[1-6]|p|li|blockquote|figcaption|dt|dd|summary)$/;
    var NEVER = /^(nav|script|style|noscript|template|svg|button|select|textarea|input|option|form|iframe|video|audio|canvas|object|embed|map)$/;
    var SKIP = typeof C.skip === 'string' ? C.skip : '.' + P + '3p, .' + P + 'a11y, .' + P + 'sr, .screen-reader-text, .sr-only, .visually-hidden, .skip-link';
    var skipped = function (el) {
      var tag = el.localName;
      if (NEVER.test(tag)) return true;
      // the page's own header and footer (a header inside an article or section is content)
      if ((tag === 'header' || tag === 'footer') && !(el.parentElement && el.parentElement.closest('article, aside, main, nav, section'))) return true;
      if (tag === 'dialog' && !el.open) return true;
      try { if (SKIP && el.matches(SKIP)) return true; } catch (e) {}
      if (!drawn(el)) return true;
      // visually hidden, screen-reader-only text: a positioned box of 1px or less (a box-less
      // display: contents wrapper, such as a converted figure, measures 0 and is not one)
      var cs = window.getComputedStyle(el);
      return cs.display !== 'contents' && (cs.position === 'absolute' || cs.position === 'fixed') && el.offsetWidth <= 1 && el.offsetHeight <= 1;
    };
    var collect = function () {
      var root = contentRoot(), items = [], cur = null, stack = [];
      var flush = function () {
        if (!cur || !cur.parts.length) return;
        var t = cur.parts.join('').replace(/\s+/g, ' ').trim();
        cur.parts = [];
        if (t) items.push({ el: cur.el, text: t });
      };
      var visit = function (n) {
        if (n.nodeType === 3) { if (cur) cur.parts.push(n.nodeValue); return; }
        if (n.nodeType !== 1 || skipped(n)) return;
        var tag = n.localName;
        if (tag === 'img') {
          var alt = (n.getAttribute('alt') || '').replace(/\s+/g, ' ').trim();
          if (alt) { flush(); items.push({ el: n, text: lab('image') + ': ' + alt }); }
          return;
        }
        if (tag === 'br') { if (cur) cur.parts.push(' '); return; }
        var block = BLOCK.test(tag);
        if (block) { flush(); stack.push(cur); cur = { el: n, parts: [] }; }
        // A closed <details> shows only its summary.
        var kids = tag === 'details' && !n.open ? Array.prototype.filter.call(n.children, function (c) { return c.localName === 'summary'; }) : n.childNodes;
        for (var i = 0; i < kids.length; i++) visit(kids[i]);
        if (block) { flush(); cur = stack.pop(); }
      };
      if (root) visit(root);
      return items;
    };
    // Sentences, packed up to CHUNK characters; a longer sentence breaks at a comma,
    // semicolon or colon, else at a space.
    var chunks = function (text) {
      if (text.length <= CHUNK) return [text];
      var out = [], acc = '';
      text.replace(/([.!?]["'\u201d\u2019)\]]*)\s+/g, '$1\u0000').split('\u0000').forEach(function (s) {
        s = s.trim();
        while (s.length > CHUNK) {
          var cut = Math.max(s.lastIndexOf(', ', CHUNK), s.lastIndexOf('; ', CHUNK), s.lastIndexOf(': ', CHUNK));
          if (cut < CHUNK / 2) cut = s.lastIndexOf(' ', CHUNK);
          if (cut <= 0) cut = CHUNK;
          if (acc) { out.push(acc); acc = ''; }
          out.push(s.slice(0, cut + 1).trim());
          s = s.slice(cut + 1).trim();
        }
        if (!s) return;
        if (acc && acc.length + 1 + s.length > CHUNK) { out.push(acc); acc = s; }
        else acc = acc ? acc + ' ' + s : s;
      });
      if (acc) out.push(acc);
      return out;
    };
    var build = function () {
      queue = [];
      index = new Map();
      collect().forEach(function (it) {
        if (!index.has(it.el)) index.set(it.el, queue.length);
        chunks(it.text).forEach(function (t) { queue.push({ el: it.el, text: t }); });
      });
    };
    // The page language's best voice: Natural, Premium, Enhanced or Neural in the name
    // first, then voices on the device, then the default. Chrome lists voices late.
    var pickVoice = function () {
      var vs = synth.getVoices ? synth.getVoices() : [];
      if (!vs || !vs.length) return null;
      var norm = function (l) { return String(l || '').toLowerCase().replace(/_/g, '-'); };
      var lang = norm(html.getAttribute('lang') || navigator.language || 'en'), base = lang.split('-')[0];
      var exact = vs.filter(function (v) { return norm(v.lang) === lang; });
      var same = exact.length ? exact : vs.filter(function (v) { return norm(v.lang).split('-')[0] === base; });
      var pool = same.length ? same : vs;
      var score = function (v) { return (/natural|premium|enhanced|neural/i.test(v.name || '') ? 4 : 0) + (v.localService ? 2 : 0) + (v.default ? 1 : 0); };
      return pool.map(function (v, i) { return { v: v, s: score(v), i: i }; })
        .sort(function (x, y) { return y.s - x.s || x.i - y.i; })[0].v;
    };
    var newVoices = function () { voice = pickVoice(); };
    if (synth.addEventListener) synth.addEventListener('voiceschanged', newVoices); else synth.onvoiceschanged = newVoices;
    newVoices();
    var rate = function () {
      var r = lgroup.querySelector('input[name="' + P + 'a11y-rate"]:checked');
      var v = r ? parseFloat(r.value) : 1;
      return v > 0 ? v : 1;
    };
    // Following along: the block being read wears SPEAKING (on its nearest ancestor with a
    // box, for a display: contents wrapper) and is scrolled to when it is off screen.
    var mark = function (el) {
      while (el && el !== body && window.getComputedStyle(el).display === 'contents') el = el.parentElement;
      if (current === el) return;
      if (current) current.classList.remove(SPEAKING);
      current = el;
      if (!el) return;
      el.classList.add(SPEAKING);
      var r = el.getBoundingClientRect();
      if (r.top < 80 || r.bottom > window.innerHeight - 20) {
        try { el.scrollIntoView({ block: 'center', behavior: reduceMotion() ? 'auto' : 'smooth' }); } catch (e) { el.scrollIntoView(); }
      }
    };
    var setMode = function (m, msg) {
      mode = m;
      readBtn.textContent = m === 'reading' ? lab('pause') : m === 'paused' ? lab('resume') : lab('read');
      stopBtn.disabled = m === 'idle';
      if (msg !== undefined) status.textContent = msg;
    };
    var halt = function () { gen++; synth.cancel(); };
    var finish = function () { halt(); mark(null); setMode('idle', lab('finished')); };
    var stop = function () { halt(); mark(null); setMode('idle', lab('stopped')); };
    var pause = function () { halt(); setMode('paused', lab('paused')); };
    var next = function (my) {
      if (my !== gen) return;
      if (at >= queue.length) { finish(); return; }
      var q = queue[at];
      mark(q.el);
      var u = new window.SpeechSynthesisUtterance(q.text);
      if (!voice) voice = pickVoice();
      if (voice) { u.voice = voice; u.lang = voice.lang; } else { u.lang = html.getAttribute('lang') || ''; }
      u.rate = rate();
      u.onend = function () { if (my !== gen) return; at++; next(my); };
      u.onerror = function (e) {
        if (my !== gen || (e && (e.error === 'interrupted' || e.error === 'canceled'))) return;
        at++; next(my);
      };
      synth.speak(u);
    };
    var speakFrom = function (i) {
      var my = ++gen;
      synth.cancel();
      at = Math.max(0, i);
      if (at >= queue.length) { finish(); return; }
      setMode('reading', lab('reading'));
      setTimeout(function () { next(my); }, 60);  // Chrome can drop an utterance queued in the task that cancelled
    };
    readBtn.addEventListener('click', function () {
      if (mode === 'reading') pause();
      else if (mode === 'paused') speakFrom(at);
      else { build(); speakFrom(0); }
    });
    stopBtn.addEventListener('click', function () { if (mode !== 'idle') stop(); });
    // A new speed takes effect at once: the current sentence starts again.
    lgroup.addEventListener('change', function (e) { if (e.target.name === P + 'a11y-rate' && mode === 'reading') speakFrom(at); });
    // Reset also stops speech (the speed returns to Normal with the other settings).
    panel.querySelector('.' + P + 'a11y__reset').addEventListener('click', function () { if (mode !== 'idle') stop(); });
    // While reading or paused, a click or tap on a readable block reads from there.
    d.addEventListener('click', function (e) {
      if (mode === 'idle' || !index || !e.target || !e.target.closest) return;
      if (e.target.closest('a, button, input, select, textarea, label, summary, [role="button"], [contenteditable], dialog')) return;
      for (var n = e.target; n && n !== body; n = n.parentElement) {
        if (index.has(n)) { speakFrom(index.get(n)); return; }
      }
    });
    // Escape stops reading, unless a dialog is open (Escape is that dialog's).
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mode !== 'idle' && !d.querySelector('dialog[open]')) stop();
    });
    // Leaving the page stops speech (a page restored from the back-forward cache is idle).
    window.addEventListener('pagehide', function () { if (mode !== 'idle') stop(); });
  }
})();
