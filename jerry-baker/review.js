/* ============================================================
   REVIEW EDITOR  ·  Black Hawk Real Estate mockups
   Multi-page version of the single-file reviewer. Notes are stored for the
   whole site under one key, each tagged with the page it belongs to, so you
   can walk all 22 pages and export one feedback document at the end.

   Loaded only when the URL carries ?review  (see the gate in site.js).
   Nothing here runs on the client-facing site.

   Behaviour that was specifically asked for and must not regress:
     - EVERY meaningful element is taggable, not just top-level blocks
     - the hover chip NAMES the element so you never describe a location
     - clicking a pin reopens that note for editing
     - a stray click while typing NEVER discards the draft
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'bhre-review-notes';
  var DRAFT = 'bhre-review-draft';
  var PAGE = (location.pathname.split('/').pop() || 'index.html');

  var body = document.body;
  var notes = [];
  try { notes = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { notes = []; }

  /* ---------------------------------------------------------------- chrome */
  var PAGES = [
    ['01-home.html', 'Home'], ['02-about.html', 'About'],
    ['03-meet-the-team.html', 'Meet the Team'], ['04-buyers-guide.html', "Buyer's Guide"],
    ['05-sellers-guide.html', "Seller's Guide"], ['06-home-value.html', 'Home Value'],
    ['07-communities.html', 'Communities'], ['08-featured-listings.html', 'Featured Listings'],
    ['09-home-search.html', 'Home Search'], ['10-testimonials.html', 'Testimonials'],
    ['11-contact.html', 'Contact'], ['12-privacy.html', 'Privacy'],
    ['13-terms.html', 'Terms'], ['14-land-and-mining-claims.html', 'Land & Claims'],
    ['20-black-hawk.html', 'Hotsheet: Black Hawk'], ['21-central-city.html', 'Hotsheet: Central City'],
    ['22-evergreen.html', 'Hotsheet: Evergreen'], ['23-golden.html', 'Hotsheet: Golden'],
    ['24-idaho-springs.html', 'Hotsheet: Idaho Springs'], ['25-nederland.html', 'Hotsheet: Nederland'],
    ['26-pinecliffe.html', 'Hotsheet: Pinecliffe'], ['27-rollinsville.html', 'Hotsheet: Rollinsville'],
    ['preview-index.html', 'Preview index']
  ];

  var opts = PAGES.map(function (p) {
    var n = notes.filter(function (x) { return x.page === p[0]; }).length;
    return '<option value="' + p[0] + '"' + (p[0] === PAGE ? ' selected' : '') + '>'
      + p[1] + (n ? '  (' + n + ')' : '') + '</option>';
  }).join('');

  var chrome = document.createElement('div');
  chrome.innerHTML =
    '<div id="hl"></div><div id="hlLabel"></div><div id="pinLayer"></div>' +
    '<div class="pc">' +
      '<span class="pc__tag">Review</span>' +
      '<select id="pcPage" aria-label="Jump to page">' + opts + '</select>' +
      '<button id="reviewBtn">Review mode</button>' +
      '<button id="panelBtn">Notes<span class="pc__count" id="cnt">0</span></button>' +
      '<button id="exitBtn">Exit</button>' +
    '</div>' +
    '<aside class="rp">' +
      '<div class="rp__head"><h2>Feedback <span id="cntAll" style="color:#35C4B5"></span></h2>' +
        '<button class="rp__x" id="rpClose" aria-label="Close">&times;</button></div>' +
      '<div class="rp__list" id="rpList"></div>' +
      '<div class="rp__foot">' +
        '<button class="primary" id="copyBtn">Copy all feedback</button>' +
        '<button id="jsonBtn">Copy as JSON</button>' +
        '<button id="clearBtn">Clear all notes</button>' +
      '</div>' +
    '</aside>' +
    '<div class="cmt" id="cmt">' +
      '<div class="cmt__where" id="cmtWhere"></div>' +
      '<textarea id="cmtText" placeholder="What should change here?"></textarea>' +
      '<div class="cmt__row">' +
        '<button id="cmtDelete" style="display:none">Delete</button>' +
        '<button id="cmtCancel">Cancel</button>' +
        '<button class="save" id="cmtSave">Save</button>' +
      '</div>' +
    '</div>';
  while (chrome.firstChild) body.appendChild(chrome.firstChild);

  var hl = document.getElementById('hl');
  var hlLabel = document.getElementById('hlLabel');
  var pinLayer = document.getElementById('pinLayer');
  var cmt = document.getElementById('cmt');
  var cmtText = document.getElementById('cmtText');
  var cmtWhere = document.getElementById('cmtWhere');
  var cmtDelete = document.getElementById('cmtDelete');
  var listEl = document.getElementById('rpList');
  var cntEl = document.getElementById('cnt');
  var cntAllEl = document.getElementById('cntAll');
  var reviewBtn = document.getElementById('reviewBtn');

  var hoverTarget = null, pending = null, editIndex = null;

  /* keep review mode across navigation */
  document.querySelectorAll('a[href$=".html"]').forEach(function (a) {
    var h = a.getAttribute('href');
    if (h && h.indexOf('://') === -1 && h.indexOf('?') === -1) a.setAttribute('href', h + '?review=1');
  });
  document.getElementById('pcPage').addEventListener('change', function () {
    location.href = this.value + '?review=1';
  });
  document.getElementById('exitBtn').addEventListener('click', function () {
    location.href = PAGE;
  });

  /* ------------------------------------------------------- element naming */
  var TAGGABLE = [
    'h1', 'h2', 'h3', 'h4', 'p', 'img', 'figure', 'blockquote', 'li', 'dt', 'dd',
    'a', 'button', 'input', 'textarea', 'select', 'svg', 'form',
    '.eyebrow', '.btn', '.btn-text', '.needs',
    '.statrail__cell', '.statrail__n', '.statrail__l', '.statrail__caption',
    '.path', '.path__media', '.path__body', '.path__list', '.paths__head',
    '.about__media', '.about__body', '.about__inline', '.sig', '.bio__creds', '.ph-portrait',
    '.it', '.it__media', '.it__body', '.itg__item', '.itl',
    '.svc__card', '.proc__row', '.proc__media', '.proc__body', '.ph-media',
    '.cmp__col', '.cmp__list', '.mkt__cell', '.np__form', '.np__out', '.np__row', '.np__total',
    '.comm__row', '.comm__media', '.comm__panel', '.comm__idx', '.comm__name', '.comm__blurb',
    '.comm__card', '.comm__cards__grid', '.cgrid', '.cgrid__card',
    '.ask', '.ask__item', '.ask__q', '.tst__card', '.tst__stars', '.tst__meta',
    '.hv__inner', '.cta__media', '.cta__card', '.xf__inner',
    '.idx', '.idx__tag', '.res', '.res__link', '.press',
    '.foot__office', '.foot__col', '.foot__legal', '.foot__badges', '.badge',
    '.nav__logo', '.nav__menu', '.nav__cta', '.nav__item', '.nav__drop',
    '.phero__inner', '.phero__media', '.hero__inner', '.hero__media', '.legal',
    'section', 'header', 'footer'
  ].join(',');

  var NAMED = {
    'hero__media': 'Hero image', 'hero__inner': 'Hero copy', 'hero__sub': 'Hero subhead',
    'phero__media': 'Page hero image', 'phero__inner': 'Page hero copy', 'phero__sub': 'Page hero subhead',
    'statrail__cell': 'Stat cell', 'statrail__n': 'Stat number', 'statrail__l': 'Stat label',
    'statrail__caption': 'Stat caption',
    'paths__head': 'Section heading block', 'path': 'Path row', 'path__media': 'Path image',
    'path__body': 'Path copy', 'path__list': 'Path bullets',
    'about__media': 'Portrait', 'about__body': 'About copy', 'about__inline': 'Credentials',
    'sig': 'Signature', 'bio__creds': 'Credentials list', 'ph-portrait': 'Portrait placeholder',
    'it': 'Image and text row', 'it__media': 'Image', 'it__body': 'Copy',
    'itg__item': 'Feature item', 'itl': 'Icon list',
    'svc__card': 'Service card', 'proc__row': 'Process step', 'proc__media': 'Step image',
    'proc__body': 'Step copy', 'ph-media': 'Image placeholder',
    'cmp__col': 'Comparison column', 'cmp__list': 'Comparison list',
    'mkt__cell': 'Marketing pillar',
    'np__form': 'Calculator inputs', 'np__out': 'Calculator output', 'np__row': 'Calculator line',
    'np__total': 'Calculator total',
    'comm__row': 'Town band', 'comm__media': 'Town image', 'comm__panel': 'Town panel',
    'comm__idx': 'Index number', 'comm__name': 'Town name', 'comm__blurb': 'Town blurb',
    'comm__card': 'Town card', 'cgrid': 'Town grid', 'cgrid__card': 'Town card',
    'ask': 'FAQ block', 'ask__item': 'FAQ item', 'ask__q': 'FAQ question',
    'tst__card': 'Testimonial card', 'tst__stars': 'Star rating', 'tst__meta': 'Attribution',
    'hv__inner': 'Home value copy', 'cta__media': 'CTA image', 'cta__card': 'CTA card',
    'xf__inner': 'Cross funnel copy',
    'idx': 'IDX placeholder zone', 'idx__tag': 'IDX tag', 'res': 'Resources strip',
    'res__link': 'Resource link', 'press': 'Press strip',
    'foot__office': 'Office card', 'foot__col': 'Footer column', 'foot__legal': 'Legal line',
    'foot__badges': 'Compliance badges', 'badge': 'Badge', 'needs': 'Needs-client chip',
    'nav__logo': 'Logo', 'nav__menu': 'Nav menu', 'nav__cta': 'Nav contact button',
    'nav__item': 'Nav item', 'nav__drop': 'Nav dropdown', 'legal': 'Legal body'
  };

  function isChrome(el) {
    if (!el || typeof el.closest !== 'function') return false;
    return !!(el.closest('.pc') || el.closest('.rp') || el.closest('.cmt') ||
              el.closest('.pin') || el.id === 'hl' || el.id === 'hlLabel');
  }

  function roleOf(el) {
    if (el.classList) {
      for (var i = 0; i < el.classList.length; i++) {
        if (NAMED[el.classList[i]]) return NAMED[el.classList[i]];
      }
    }
    var t = el.tagName.toLowerCase();
    if (t === 'img') return 'Image';
    if (t === 'svg') return 'Icon';
    if (/^h[1-4]$/.test(t)) return t.toUpperCase();
    if (t === 'p') return 'Paragraph';
    if (t === 'li') return 'List item';
    if (t === 'blockquote') return 'Quote';
    if (t === 'dt' || t === 'dd') return 'Detail';
    if (t === 'figure') return 'Image frame';
    if (t === 'input' || t === 'textarea' || t === 'select') return 'Form field';
    if (t === 'form') return 'Form';
    if (t === 'button' || el.classList.contains('btn')) return 'Button';
    if (el.classList.contains('btn-text')) return 'Text link';
    if (t === 'a') return 'Link';
    if (el.classList.contains('eyebrow')) return 'Eyebrow';
    if (t === 'section') return 'Whole section';
    if (t === 'header') return 'Header';
    if (t === 'footer') return 'Footer';
    var cls = (typeof el.className === 'string' ? el.className : '').split(/\s+/)[0] || t;
    return cls.replace(/^[a-z]+__/, '').replace(/[-_]/g, ' ')
              .replace(/^./, function (c) { return c.toUpperCase(); }) || t;
  }

  function labelText(el) {
    if (el.tagName.toLowerCase() === 'img') return el.getAttribute('alt') || el.src.split('/').pop();
    var s = (el.textContent || '').replace(/\s+/g, ' ').trim();
    return s.length > 48 ? s.slice(0, 48) + '…' : s;
  }

  /* a selector precise enough to act on without guessing */
  function cssPath(el) {
    var parts = [], n = el, guard = 0;
    while (n && n !== document.body && guard++ < 14) {
      var s = n.tagName.toLowerCase();
      var cls = (typeof n.className === 'string' ? n.className : '')
        .split(/\s+/).filter(function (c) { return c && c.indexOf('is-') !== 0 && c !== 'review'; })[0];
      if (cls) s += '.' + cls;
      var p = n.parentElement;
      if (p) {
        var sibs = Array.prototype.filter.call(p.children, function (x) { return x.tagName === n.tagName; });
        if (sibs.length > 1) s += ':nth-of-type(' + (sibs.indexOf(n) + 1) + ')';
      }
      parts.unshift(s);
      n = p;
    }
    return parts.join(' > ');
  }

  function nearestSection(el) {
    var s = el.closest('section, header, footer');
    if (!s) return '';
    var h = s.querySelector('h1, h2, h3');
    if (h) return h.textContent.replace(/\s+/g, ' ').trim().slice(0, 40);
    var c = (typeof s.className === 'string' ? s.className : '').split(/\s+/)[0];
    return c || s.tagName.toLowerCase();
  }

  function describe(el) {
    return {
      role: roleOf(el), label: labelText(el),
      path: cssPath(el), section: nearestSection(el)
    };
  }

  function positionHighlight(el) {
    var r = el.getBoundingClientRect();
    hl.style.left = (r.left + window.scrollX) + 'px';
    hl.style.top = (r.top + window.scrollY) + 'px';
    hl.style.width = r.width + 'px';
    hl.style.height = r.height + 'px';
    hl.classList.add('on');
  }

  function clearHover() {
    hoverTarget = null;
    hl.classList.remove('on');
    hlLabel.classList.remove('on');
  }

  document.addEventListener('mousemove', function (e) {
    if (!body.classList.contains('review')) return;
    if (cmt.classList.contains('is-open')) return;   /* freeze while writing */
    var el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el || isChrome(el)) { clearHover(); return; }
    var t = el.closest(TAGGABLE);
    if (!t) { clearHover(); return; }
    hoverTarget = t;
    positionHighlight(t);
    var d = describe(t);
    hlLabel.innerHTML = '<b>' + esc(d.role) + '</b>' +
      (d.section ? ' &nbsp;<i>in ' + esc(d.section) + '</i>' : '') +
      (d.label ? '<br>' + esc(d.label) : '');
    hlLabel.classList.add('on');
    hlLabel.style.left = Math.max(6, Math.min(e.clientX + 16, window.innerWidth - 356)) + 'px';
    hlLabel.style.top = Math.max(6, Math.min(e.clientY + 18, window.innerHeight - 82)) + 'px';
  }, true);

  document.addEventListener('click', function (e) {
    if (!body.classList.contains('review')) return;
    if (isChrome(e.target)) return;

    /* DRAFT PROTECTION: a stray click must never discard what is being typed */
    if (cmt.classList.contains('is-open')) { e.preventDefault(); e.stopPropagation(); return; }

    var t = hoverTarget || (e.target.closest && e.target.closest(TAGGABLE));
    if (!t) return;
    e.preventDefault(); e.stopPropagation();

    var r = t.getBoundingClientRect();
    var d = describe(t);
    pending = {
      page: PAGE, role: d.role, label: d.label, path: d.path, section: d.section,
      xPct: +(((e.clientX - r.left) / Math.max(r.width, 1)) * 100).toFixed(1),
      yPct: +(((e.clientY - r.top) / Math.max(r.height, 1)) * 100).toFixed(1),
      viewport: window.innerWidth
    };
    openCmt(pending, null, e.clientX, e.clientY);
  }, true);

  /* ----------------------------------------------------------- comment box */
  function openCmt(target, idx, cx, cy) {
    editIndex = (typeof idx === 'number') ? idx : null;
    cmtWhere.textContent = target.role
      + (target.section ? ' in ' + target.section : '')
      + (target.label ? ' · ' + target.label : '');
    cmtText.value = (editIndex !== null) ? notes[editIndex].text : (loadDraft() || '');
    cmtDelete.style.display = (editIndex !== null) ? '' : 'none';
    cmt.style.left = Math.max(8, Math.min((cx != null ? cx : window.innerWidth / 2) + 14, window.innerWidth - 326)) + 'px';
    cmt.style.top = Math.max(8, Math.min((cy != null ? cy : 140) + 14, window.innerHeight - 236)) + 'px';
    cmt.classList.add('is-open');
    clearHover();
    cmtText.focus();
  }
  function hideCmt() { cmt.classList.remove('is-open'); pending = null; editIndex = null; clearDraft(); }
  function saveDraft() { try { localStorage.setItem(DRAFT, cmtText.value); } catch (e) {} }
  function loadDraft() { try { return localStorage.getItem(DRAFT) || ''; } catch (e) { return ''; } }
  function clearDraft() { try { localStorage.removeItem(DRAFT); } catch (e) {} }

  cmtText.addEventListener('input', saveDraft);
  cmtDelete.addEventListener('click', function () {
    if (editIndex === null) return;
    notes.splice(editIndex, 1); persist(); hideCmt(); render();
  });
  document.getElementById('cmtCancel').addEventListener('click', hideCmt);
  document.getElementById('cmtSave').addEventListener('click', save);
  cmtText.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) save();
    if (e.key === 'Escape') hideCmt();
  });

  function save() {
    var txt = cmtText.value.trim();
    if (!txt) { hideCmt(); return; }
    if (editIndex !== null) notes[editIndex].text = txt;
    else if (pending) { pending.text = txt; notes.push(pending); }
    persist(); hideCmt(); render();
  }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(notes)); } catch (e) {} }

  /* ---------------------------------------------------------------- render */
  function render() {
    var mine = notes.filter(function (n) { return n.page === PAGE; });
    cntEl.textContent = mine.length;
    cntAllEl.textContent = notes.length > mine.length ? '(' + mine.length + ' here of ' + notes.length + ')' : '';

    pinLayer.innerHTML = '';
    mine.forEach(function (n) {
      var el = null;
      try { el = document.querySelector(n.path); } catch (e) { el = null; }
      if (!el) return;
      var r = el.getBoundingClientRect();
      var pin = document.createElement('div');
      pin.className = 'pin';
      pin.textContent = (notes.indexOf(n) + 1);
      pin.style.left = (r.left + window.scrollX + r.width * (n.xPct / 100)) + 'px';
      pin.style.top = (r.top + window.scrollY + r.height * (n.yPct / 100)) + 'px';
      pin.title = n.role + ': ' + n.text;
      pin.addEventListener('click', function (ev) {
        ev.stopPropagation(); ev.preventDefault();
        body.classList.add('review-panel');
        openCmt(n, notes.indexOf(n), ev.clientX, ev.clientY);
      });
      pinLayer.appendChild(pin);
    });

    if (!notes.length) {
      listEl.innerHTML = '<p class="rp__empty">No notes yet. Turn on Review mode, then hover anything, a heading, an image, a bullet, a stat, a placeholder, and the chip tells you exactly what you are about to tag. Click to pin a note. Click a pin later to edit it. Notes are kept for the whole site, so you can walk every page and export once at the end.</p>';
      return;
    }
    listEl.innerHTML = '';
    notes.forEach(function (n, i) {
      var row = document.createElement('div');
      row.className = 'rp__item';
      row.innerHTML = '<div class="rp__num">' + (i + 1) + '</div>' +
        '<div class="rp__body"><div class="rp__where">' + esc(n.role) +
        (n.section ? ' · ' + esc(n.section) : '') +
        (n.page !== PAGE ? ' <span class="rp__pg">· ' + esc(n.page.replace('.html', '')) + '</span>' : '') +
        '</div><div class="rp__txt">' + esc(n.text) + '</div></div>';
      var b = row.querySelector('.rp__body');
      b.style.cursor = 'pointer';
      b.addEventListener('click', function () {
        if (n.page !== PAGE) { location.href = n.page + '?review=1'; return; }
        openCmt(n, i, null, null);
      });
      var del = document.createElement('button');
      del.className = 'rp__del'; del.innerHTML = '&times;'; del.title = 'Delete';
      del.addEventListener('click', function (ev) {
        ev.stopPropagation(); notes.splice(i, 1); persist(); render();
      });
      row.appendChild(del);
      listEl.appendChild(row);
    });
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function asMarkdown() {
    var byPage = {};
    notes.forEach(function (n) { (byPage[n.page] = byPage[n.page] || []).push(n); });
    var out = ['# Black Hawk Real Estate, preview feedback', '',
               notes.length + ' notes across ' + Object.keys(byPage).length + ' pages', ''];
    PAGES.forEach(function (p) {
      var list = byPage[p[0]];
      if (!list) return;
      out.push('## ' + p[1] + '  (' + p[0] + ')', '');
      list.forEach(function (n, i) {
        out.push((i + 1) + '. **' + n.role + (n.section ? ' in ' + n.section : '') + '**'
          + (n.label ? ' · "' + n.label + '"' : ''));
        out.push('   Target: `' + n.path + '`');
        out.push('   At ' + n.xPct + '% across, ' + n.yPct + '% down · ' + n.viewport + 'px');
        out.push('   ' + n.text, '');
      });
    });
    return out.join('\n');
  }

  function copy(text, btn, label) {
    var done = function () {
      var o = btn.textContent; btn.textContent = 'Copied';
      setTimeout(function () { btn.textContent = o; }, 1400);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text, done); });
    } else fallback(text, done);
  }
  function fallback(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (e) {}
    document.body.removeChild(ta);
  }

  /* ---------------------------------------------------------------- wiring */
  reviewBtn.addEventListener('click', function () {
    var on = body.classList.toggle('review');
    reviewBtn.classList.toggle('is-live', on);
    reviewBtn.textContent = on ? 'Review ON' : 'Review mode';
    /* the panel is 380px fixed right and would cover the nav, so it does not
       auto-open. Open it deliberately with the Notes button. */
    if (on) render(); else body.classList.remove('review-panel');
    hideCmt(); clearHover();
  });
  document.getElementById('panelBtn').addEventListener('click', function () {
    body.classList.toggle('review-panel'); render();
  });
  document.getElementById('rpClose').addEventListener('click', function () {
    body.classList.remove('review-panel');
  });
  document.getElementById('copyBtn').addEventListener('click', function () {
    copy(asMarkdown(), this);
  });
  document.getElementById('jsonBtn').addEventListener('click', function () {
    copy(JSON.stringify(notes, null, 2), this);
  });
  document.getElementById('clearBtn').addEventListener('click', function () {
    if (!notes.length) return;
    if (!confirm('Delete all ' + notes.length + ' notes across every page?')) return;
    notes = []; persist(); render();
  });
  window.addEventListener('resize', render);

  render();
  /* start in review mode, that is why you opened this URL */
  reviewBtn.click();
})();
