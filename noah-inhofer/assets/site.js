/* Noah Inhofer, Real Estate Hippie: the one script every page runs (2026-11-25).
   Each part does nothing when its markup is not on the page. Built from the approved home and Longmont pages. */
(function () {
  var doc = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) doc.classList.add('js');

  /* the header: sticky always, white once the page moves; the phone menu */
  var hdr = document.getElementById('hdr');
  var onScroll = function () { hdr.classList.toggle('is-stuck', window.scrollY > 40); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    hdr.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  document.querySelectorAll('.nav__item.has-drop .nav__toggle').forEach(function (t) {
    t.addEventListener('click', function (e) {
      if (window.innerWidth > 1279) return;
      e.preventDefault();
      var item = t.closest('.nav__item');
      var open = item.classList.toggle('open');
      t.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  (function () {
    /* the hero loop: it starts once the page has loaded (the still is its first frame, so the start is seamless), never
       inside a frame (the house checks measure the page in frames, where a playing video holds them up), and never with
       reduced motion; a pause button either way (WCAG 2.2.2) */
    var vid = document.getElementById('hero-video');
    var pauseBtn = document.getElementById('hero-pause');
    if (vid && pauseBtn) {
    var setPaused = function (p) {
      if (p) { vid.pause(); } else { vid.preload = 'auto'; var pr = vid.play(); if (pr && pr.catch) pr.catch(function () {}); }
      pauseBtn.classList.toggle('is-paused', p);
      pauseBtn.setAttribute('aria-label', p ? 'Play the background video' : 'Pause the background video');
    };
    setPaused(true);
    if (!reduce && window.self === window.top) {
      var start = function () { setPaused(false); };
      if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
    }
    pauseBtn.addEventListener('click', function () { setPaused(!vid.paused); });
    }
  })();

  (function () {
    /* reveal as the page scrolls */
    if (doc.classList.contains('js')) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -8% 0px' });
      document.querySelectorAll('.r').forEach(function (el) { io.observe(el); });
    }
  })();

  (function () {
    /* a sliding row (the newest listings): its two arrows move it one card at a time */
    document.querySelectorAll('.rail').forEach(function (rail) {
      var track = rail.querySelector('.rail__track');
      rail.querySelectorAll('.rail__nav .rail__btn').forEach(function (b) {
        b.addEventListener('click', function () {
          var card = track.querySelector('li');
          var stepW = card ? card.getBoundingClientRect().width + 20 : 300;
          track.scrollBy({ left: b.classList.contains('rail__btn--prev') ? -stepW : stepW, behavior: reduce ? 'auto' : 'smooth' });
        });
      });
    });
  })();

  (function () {
    /* the video player */
    var vdlg = document.getElementById('video-dlg');
    var vframe = document.getElementById('video-dlg-frame');
    var vtitle = document.getElementById('video-dlg-h');
    var openVideo = function (id, title) {
      vtitle.textContent = title;
      vframe.innerHTML = '';
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      f.title = title;
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      vframe.appendChild(f);
      if (!vdlg.open) vdlg.showModal();
    };
    var stopVideo = function () { vframe.innerHTML = ''; };          /* taking the player out is what stops the sound */
    vdlg.addEventListener('close', stopVideo);
    window.addEventListener('pagehide', stopVideo);
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-modal="video-dlg"]');
      if (!b) return;
      e.preventDefault();
      openVideo(b.getAttribute('data-yt'), (b.getAttribute('aria-label') || '').replace(/^Play: /, ''));
    });
    document.querySelectorAll('.dlg__close').forEach(function (c) {
      c.addEventListener('click', function () { stopVideo(); c.closest('dialog').close(); });
    });
    document.querySelectorAll('dialog.dlg').forEach(function (d) {
      d.addEventListener('click', function (e) { if (e.target === d) { stopVideo(); d.close(); } });
    });
  })();

  (function () {
    /* the section bar: it sticks under the header, and marks the section on screen */
    var jump = document.getElementById('jump');
    if (jump) {
      var setHdr = function () { doc.style.setProperty('--hdr-h', Math.round(hdr.getBoundingClientRect().height) + 'px'); };
      setHdr();
      window.addEventListener('scroll', setHdr, { passive: true });
      window.addEventListener('resize', setHdr);
      hdr.addEventListener('transitionend', setHdr);
      var jumpList = document.getElementById('jump-list');
      var jumpLinks = Array.prototype.slice.call(jump.querySelectorAll('.jump__link'));
      var jumpMarks = jumpLinks.map(function (a) { var h = document.getElementById(a.getAttribute('href').slice(1)); return h ? h.closest('section') : null; });
      var mark = function (i) {
        jumpLinks.forEach(function (a, k) { if (k === i) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
        if (i >= 0) jumpList.scrollTo({ left: jumpLinks[i].offsetLeft - 20, behavior: reduce ? 'auto' : 'smooth' });
      };
      if ('IntersectionObserver' in window) {
        var spy = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) mark(jumpMarks.indexOf(e.target)); });
        }, { rootMargin: '-35% 0px -60% 0px' });
        jumpMarks.forEach(function (m) { if (m) spy.observe(m); });
      }
    }
  })();

  (function () {
    /* the soft prompt: up once the visitor reaches Noah's listings, away over the closing call to action, closed for the visit once dismissed */
    var nudge = document.getElementById('nudge');
    if (nudge && 'IntersectionObserver' in window) (function () {
      var closed = false, past = false, atEnd = false;
      try { closed = window.sessionStorage.getItem('rh-nudge') === 'closed'; } catch (e) {}
      var showNudge = function () {
        var on = past && !atEnd && !closed;
        if (on) { nudge.hidden = false; void nudge.offsetWidth; nudge.classList.add('is-open'); }
        else { nudge.classList.remove('is-open'); }
      };
      var from = ['own-h', 'homes-h', 'versus-h', 'check-h'].map(function (id) { return document.getElementById(id); }).filter(Boolean)[0]
        || (document.querySelectorAll('main section')[2] || null);
      var until = document.getElementById('closing-h');
      if (!from) return;
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting || e.boundingClientRect.top < 0) past = true; });
        showNudge();
      }, { rootMargin: '0px 0px -30% 0px' }).observe(from.closest('section') || from);
      if (until) new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { atEnd = e.isIntersecting || e.boundingClientRect.top < 0; });
        showNudge();
      }).observe(until.closest('section'));
      document.getElementById('nudge-close').addEventListener('click', function () {
        closed = true;
        try { window.sessionStorage.setItem('rh-nudge', 'closed'); } catch (e) {}
        showNudge();
      });
    })();
  })();

  (function () {
    /* the area map: real town boundaries, highways and lakes (Census TIGERweb), drawn from assets/map/noah-inhofer-area-map.js.
       Move over a town to preview it; a click, the list or the arrows keep it. The preview card beside the map follows. */
    var M = window.RH_AREA_MAP;
    var canvas = document.getElementById('amap-canvas');
    var pick = document.getElementById('amap-select');
    if (M && canvas && pick) {
      var NS = 'http://www.w3.org/2000/svg';
      var el = function (tag, attrs, parent) {
        var n = document.createElementNS(NS, tag);
        for (var k in attrs) n.setAttribute(k, attrs[k]);
        if (parent) parent.appendChild(n);
        return n;
      };
      var fixed = function (cls, x, y, parent) {          /* a group drawn at one size on screen, wherever the map scales */
        var g = el('g', { 'class': 'amap__k ' + cls }, parent);
        g.style.setProperty('--x', x + 'px');
        g.style.setProperty('--y', y + 'px');
        return g;
      };
      var stage = canvas.parentNode, tag = document.getElementById('amap-tag');
      var by = {}, shapes = {}, labels = {}, pins = {};
      var svg = el('svg', { viewBox: '0 0 ' + M.w + ' ' + M.h, 'class': 'amap__svg', role: 'img',
        'aria-label': 'Map of the 17 towns Noah covers along Interstate 25, from Fort Collins and Windsor in the north to Arvada and Commerce City in the south. Use Choose a town to preview each one.' });
      el('path', { d: M.band, 'class': 'amap__band' }, svg);
      el('path', { d: M.peaks, 'class': 'amap__peaks' }, svg);
      el('path', { d: M.snow, 'class': 'amap__snow' }, svg);
      el('path', { d: M.pines, 'class': 'amap__pines' }, svg);
      el('path', { d: M.counties, 'class': 'amap__county' }, svg);
      var lakes = el('g', { 'class': 'amap__lakes' }, svg);
      M.lakes.forEach(function (l) { el('path', { d: l.d }, lakes); });
      var roads = el('g', { 'class': 'amap__roads' }, svg);
      [3, 2, 1].forEach(function (tier) {
        M.roads.forEach(function (r) { if (r.tier === tier) el('path', { d: r.d, 'class': 'amap__road amap__road--' + tier }, roads); });
      });
      var gTowns = el('g', { 'class': 'amap__towns' }, svg);
      var hotShape = el('path', { d: '', 'class': 'amap__hot' }, svg);
      var marks = el('g', { 'class': 'amap__marks' }, svg);
      var ICONS = { peak: 'M-16 10L-4 -10L2 -1L7 -8L18 10M-8 -3L-4 -10L-1 -5', down: 'M0 -6L0 6M-4.5 1.5L0 6L4.5 1.5',
        plane: 'M0 -9C1.4 -9 2 -7 2 -5L2 -2L9 3L9 5L2 2.6L2 6.4L4.4 8.4L4.4 9.6L0 8.4L-4.4 9.6L-4.4 8.4L-2 6.4L-2 2.6L-9 5L-9 3L-2 -2L-2 -5C-2 -7 -1.4 -9 0 -9Z' };
      M.notes.forEach(function (n) {
        el('path', { d: ICONS[n.icon], 'class': 'amap__note-icon amap__note-icon--' + n.icon, transform: 'translate(' + n.ix + ' ' + n.iy + ')' }, marks);
        var g = fixed('amap__note', n.x, n.y, marks);
        el('text', { 'text-anchor': n.a }, g).textContent = n.t.toUpperCase();
      });
      M.shields.forEach(function (sh) {
        var g = fixed('amap__shield amap__shield--' + sh.k, sh.x, sh.y, marks), w = 12 + 7.6 * sh.t.length;
        el('rect', { x: -w / 2, y: -9, width: w, height: 18, rx: 3 }, g);
        el('text', { 'text-anchor': 'middle', y: 4.4 }, g).textContent = sh.t;
      });
      var gLabels = el('g', { 'class': 'amap__labels' }, svg);
      var cur = 'longmont', hot = null, shown = 'longmont';
      var reduceMotion = reduce;
      var card = document.getElementById('amap-card');
      var paint = function () {
        var show = hot || cur, t = by[show];
        M.towns.forEach(function (x) {
          var isSel = x.slug === cur, isHot = x.slug === hot && !isSel;
          shapes[x.slug].classList.toggle('is-sel', isSel);
          labels[x.slug].classList.toggle('is-sel', isSel);
          labels[x.slug].classList.toggle('is-hot', isHot);
          if (pins[x.slug]) {
            pins[x.slug].classList.toggle('is-sel', isSel);
            pins[x.slug].classList.toggle('is-hot', isHot);
            pins[x.slug].classList.toggle('is-on', x.slug === show);
          }
        });
        var d = hot && hot !== cur ? by[hot].d : '';
        if (hotShape.getAttribute('d') !== d) {
          hotShape.setAttribute('d', d);
          if (d && !reduceMotion && hotShape.animate) {
            hotShape.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.045)' }], { duration: 260, easing: 'cubic-bezier(.2,.7,.1,1)', fill: 'forwards' });
          }
        }
        if (shown !== show) {
          shown = show;
          document.getElementById('amap-card-img').src = 'assets/video-thumbs/' + t.video + '.jpg';
          var play = document.getElementById('amap-card-play');
          play.setAttribute('data-yt', t.video);
          play.setAttribute('aria-label', 'Play: ' + t.title);
          document.getElementById('amap-card-kicker').textContent = (t.kind === 'town' ? 'Town guide' : 'Regional guide') + ' · ' + t.len;
          document.getElementById('amap-card-name').textContent = t.name;
          document.getElementById('amap-card-title').textContent = t.title;
          var link = document.getElementById('amap-card-link');
          link.href = t.file;
          link.textContent = 'Explore ' + t.name;
          if (!reduceMotion && card.animate) {
            card.animate([{ opacity: .35, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.2,.7,.1,1)' });
          }
        }
        tag.textContent = t.name;
        var pt = svg.createSVGPoint();
        pt.x = t.px; pt.y = t.py;
        var ctm = svg.getScreenCTM();
        if (ctm) {
          var p = pt.matrixTransform(ctm), r = stage.getBoundingClientRect();
          tag.style.left = (p.x - r.left) + 'px';
          tag.style.top = (p.y - r.top) + 'px';
        }
      };
      var choose = function (slug) { cur = slug; hot = null; pick.value = slug; paint(); };
      var wire = function (node, slug) {
        node.addEventListener('pointerenter', function (e) { if (e.pointerType !== 'touch') { hot = slug; paint(); } });
        node.addEventListener('pointerleave', function () { if (hot === slug) { hot = null; paint(); } });
        node.addEventListener('click', function () { choose(slug); });
      };
      M.towns.forEach(function (t) {
        by[t.slug] = t;
        var p = el('path', { d: t.d, 'class': 'amap__shape' }, gTowns);
        p.style.setProperty('--i', t.n);
        shapes[t.slug] = p;
        wire(p, t.slug);
        if (t.leader) el('path', { d: 'M' + t.leader[0] + ' ' + t.leader[1] + 'L' + t.leader[2] + ' ' + t.leader[3], 'class': 'amap__leader' }, gLabels);
        if (t.pin) {
          var pin = fixed('amap__pin', t.pin[0], t.pin[1], gLabels);
          el('circle', { r: 6.4, 'class': 'amap__ring' }, pin);
          el('circle', { r: 6.4, 'class': 'amap__pin-dot' }, pin);
          el('path', { d: 'M-2.2 -3.3L3.4 0L-2.2 3.3Z', 'class': 'amap__pin-play' }, pin);
          pins[t.slug] = pin;
          wire(pin, t.slug);
        }
        var lab = fixed('amap__label amap__label--' + (t.out ? 'out' : 'in'), t.lx, t.ly, gLabels);
        el('text', { 'text-anchor': t.la, y: 4.4 }, lab).textContent = t.name.toUpperCase();
        labels[t.slug] = lab;
        wire(lab, t.slug);
      });
      canvas.innerHTML = '';
      canvas.appendChild(svg);
      var order = M.towns.map(function (t) { return t.slug; });
      pick.addEventListener('change', function () { choose(pick.value); });
      document.querySelectorAll('.amap__step').forEach(function (b) {
        b.addEventListener('click', function (e) {
          e.stopPropagation();
          var i = order.indexOf(cur) + (b.classList.contains('rail__btn--prev') ? -1 : 1);
          choose(order[(i + order.length) % order.length]);
        });
      });
      var fit = function () { stage.style.setProperty('--amap-k', (M.w / (canvas.clientWidth || 540)).toFixed(3)); paint(); };
      if ('ResizeObserver' in window) new ResizeObserver(fit).observe(canvas); else window.addEventListener('resize', fit);
      fit();
    }
  })();

  (function () {
    /* the town tour: the map of the town itself (Census city limits, streets, creek and lakes, from
       assets/map/noah-inhofer-{{slug}}-map.js) sits beside the stops, which are tabs: a numbered route, one stop on show
       at a time. The stop on show lights up on the map; a tab, a pin or the Next button moves to another stop. */
    var M = window.RH_TOWN_MAP;
    var canvas = document.getElementById('tmap-canvas');
    var tmap = document.getElementById('tmap');
    if (M && canvas && tmap) {
      var NS = 'http://www.w3.org/2000/svg';
      var el = function (tag, attrs, parent) {
        var n = document.createElementNS(NS, tag);
        for (var k in attrs) n.setAttribute(k, attrs[k]);
        if (parent) parent.appendChild(n);
        return n;
      };
      var fixed = function (cls, x, y, parent) {          /* a group drawn at one size on screen, wherever the map scales */
        var g = el('g', { 'class': 'amap__k ' + cls }, parent);
        g.style.setProperty('--x', x + 'px');
        g.style.setProperty('--y', y + 'px');
        return g;
      };
      var svg = el('svg', { viewBox: '0 0 ' + M.w + ' ' + M.h, 'class': 'tmap__svg', role: 'img',
        'aria-label': 'Map of ' + M.town + ' with the tour stops numbered in order. The arrows under the map move from stop to stop.' });
      el('path', { d: M.limits, 'class': 'tmap__limits' }, svg);
      el('path', { d: M.county, 'class': 'amap__county' }, svg);
      el('path', { d: M.streets, 'class': 'tmap__street' }, svg);
      el('path', { d: M.rail, 'class': 'tmap__rail' }, svg);
      var lakes = el('g', { 'class': 'amap__lakes' }, svg);
      M.lakes.forEach(function (l) { el('path', { d: l.d }, lakes); });
      M.creeks.forEach(function (c) { el('path', { d: c.d, 'class': 'tmap__creek tmap__creek--' + c.tier }, svg); });
      var roads = el('g', { 'class': 'tmap__roads' }, svg);
      [2, 1].forEach(function (tier) {
        M.roads.forEach(function (r) { if (r.tier === tier) el('path', { d: r.d, 'class': 'amap__road amap__road--' + tier }, roads); });
      });
      var ring = el('circle', { r: 44, 'class': 'tmap__area' }, svg);          /* the area the stop's saved search covers (an illustration) */
      var hl = el('path', { d: '', 'class': 'tmap__hl' }, svg);
      var gLegs = el('g', { 'class': 'tmap__legs' }, svg);
      var legs = M.loop.map(function (d) { return el('path', { d: d, 'class': 'tmap__leg' }, gLegs); });
      var marks = el('g', { 'class': 'tmap__marks' }, svg);
      M.shields.forEach(function (sh) {
        var g = fixed('amap__shield amap__shield--' + sh.k, sh.x, sh.y, marks), w = 12 + 7.6 * sh.t.length;
        el('rect', { x: -w / 2, y: -9, width: w, height: 18, rx: 3 }, g);
        el('text', { 'text-anchor': 'middle', y: 4.4 }, g).textContent = sh.t;
      });
      M.counties.concat(M.ways).forEach(function (n) {
        var g = fixed('tmap__way', n.x, n.y, marks);
        el('text', { x: n.dx || 0, y: n.dy || 0, 'text-anchor': n.a }, g).textContent = n.t.toUpperCase();
      });
      M.places.forEach(function (p) {
        var g = fixed('tmap__place', p.x, p.y, marks);
        el('circle', { r: 3, 'class': 'tmap__place-dot' }, g);
        el('text', { x: p.dx, y: p.dy, 'text-anchor': p.a }, g).textContent = p.t;
      });
      var gLabels = el('g', { 'class': 'tmap__labels' }, svg);
      var gPins = el('g', { 'class': 'tmap__pins' }, svg);
      var pins = [], labels = [];
      var cards = M.stops.map(function (s) { return document.getElementById('stop-' + s.id); });
      cards.push(document.getElementById('stop-drive'));          /* the last panel is the whole loop, with no pin */
      var nears = M.stops.map(function (s) { return document.getElementById('near-' + s.id); });
      var tablist = document.getElementById('tour-tabs');
      var tabs = Array.prototype.slice.call(tablist.querySelectorAll('.tour__tab'));
      var cur = -1;
      var setStop = function (i, focus) {
        if (i === cur || i < 0 || i >= cards.length) return;
        var first = cur === -1;
        cur = i;
        var s = M.stops[i];
        cards.forEach(function (c, k) { c.hidden = k !== i; c.classList.toggle('is-on', k === i); });
        tabs.forEach(function (t, k) {
          t.setAttribute('aria-selected', k === i ? 'true' : 'false');
          t.tabIndex = k === i ? 0 : -1;
          t.classList.toggle('is-done', k < i);
        });
        pins.forEach(function (p, k) { p.classList.toggle('is-on', k === i); labels[k].classList.toggle('is-on', k === i); });
        legs.forEach(function (l, k) { l.classList.toggle('is-done', s ? k < i : true); });
        tmap.classList.toggle('is-all', !s);
        nears.forEach(function (n, k) { if (n) n.hidden = k !== i; });
        if (s) { ring.setAttribute('cx', s.x); ring.setAttribute('cy', s.y); }
        ring.style.display = s ? '' : 'none';
        hl.setAttribute('d', s ? s.hl : '');
        hl.classList.toggle('is-fill', !!(s && s.fill));
        if (first) return;
        tablist.scrollTo({ left: tabs[i].offsetLeft - (tablist.clientWidth - tabs[i].offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
        if (!reduce && cards[i].animate) {
          cards[i].animate([{ opacity: 0, transform: 'translateX(24px)' }, { opacity: 1, transform: 'none' }], { duration: 450, easing: 'cubic-bezier(.2,.7,.1,1)' });
          if (s && hl.animate) hl.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, easing: 'cubic-bezier(.2,.7,.1,1)' });
          if (s && nears[i] && nears[i].animate) nears[i].animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 500, easing: 'cubic-bezier(.2,.7,.1,1)' });
        }
        if (focus) tabs[i].focus();
      };
      var goTo = function (i) { setStop(i); };
      M.stops.forEach(function (s, i) {
        var lab = fixed('tmap__label', s.x, s.y, gLabels);
        el('text', { x: s.dx, y: s.dy, 'text-anchor': s.a }, lab).textContent = s.name.toUpperCase();
        var pin = fixed('tmap__pin', s.x, s.y, gPins);
        pin.style.setProperty('--i', i);
        el('circle', { r: 11, 'class': 'amap__ring' }, pin);
        el('circle', { r: 11, 'class': 'tmap__pin-dot' }, pin);
        el('text', { 'text-anchor': 'middle', y: 4.6 }, pin).textContent = s.n;
        [pin, lab].forEach(function (n) { n.addEventListener('click', function () { goTo(i); }); });
        pins.push(pin);
        labels.push(lab);
      });
      canvas.innerHTML = '';
      canvas.appendChild(svg);
      tabs.forEach(function (t, k) {
        t.addEventListener('click', function () { setStop(k); });
        t.addEventListener('keydown', function (e) {
          var to = e.key === 'ArrowRight' ? k + 1 : e.key === 'ArrowLeft' ? k - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : -1;
          if (to < 0 || to >= tabs.length) return;
          e.preventDefault();
          setStop(to, true);
        });
      });
      document.querySelectorAll('.stop__next').forEach(function (b) {
        b.addEventListener('click', function () {
          setStop(cur + 1);
          if (tablist.getBoundingClientRect().top < 0) tablist.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        });
      });
      setStop(0);
      /* a map taller or wider than the canvas is fitted inside it, so its screen scale is set by the side that limits it */
      var fit = function () {
        var k = Math.max(M.w / (canvas.clientWidth || 560), M.h / (canvas.clientHeight || 458));
        tmap.style.setProperty('--amap-k', k.toFixed(3));
      };
      if ('ResizeObserver' in window) new ResizeObserver(fit).observe(canvas); else window.addEventListener('resize', fit);
      fit();
    }
  })();
})();
