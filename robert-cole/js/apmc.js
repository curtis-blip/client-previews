/*!
 * AgenticPress Mortgage Calculator
 * Dependency-free. Multi-instance safe. Config via data-attributes.
 * Any element with [data-apmc] is initialised automatically.
 */
(function () {
  'use strict';

  var seq = 0;

  function numAttr(root, name, fallback) {
    var v = parseFloat(root.getAttribute('data-' + name));
    return isFinite(v) ? v : fallback;
  }
  function boolAttr(root, name, fallback) {
    var v = root.getAttribute('data-' + name);
    if (v === null) return fallback;
    return v !== '0' && v !== 'false' && v !== '';
  }
  function clamp(v, lo, hi) {
    return Math.min(hi, Math.max(lo, v));
  }

  function init(root) {
    if (root.__apmcReady) return;
    root.__apmcReady = true;

    var uid = 'apmc' + ++seq;

    var cfg = {
      price: numAttr(root, 'price', 325000),
      downPct: numAttr(root, 'down', 20),
      rate: numAttr(root, 'rate', 6.5),
      term: numAttr(root, 'term', 30),
      taxPct: numAttr(root, 'tax', 1.1),
      insurance: numAttr(root, 'insurance', 1400),
      hoa: numAttr(root, 'hoa', 0),
      extra: numAttr(root, 'extra', 0),
      pmiRate: numAttr(root, 'pmi-rate', 0.55) / 100,
      pmiThreshold: numAttr(root, 'pmi-threshold', 20),
      priceMin: numAttr(root, 'price-min', 75000),
      priceMax: numAttr(root, 'price-max', 1500000),
      priceStep: numAttr(root, 'price-step', 5000),
      rateMin: numAttr(root, 'rate-min', 2),
      rateMax: numAttr(root, 'rate-max', 12),
      downMax: numAttr(root, 'down-max', 80),
      locale: root.getAttribute('data-locale') || 'en-US',
      currency: root.getAttribute('data-currency') || 'USD',
      showPmi: boolAttr(root, 'show-pmi', true),
      showExtra: boolAttr(root, 'show-extra', true)
    };

    var money;
    try {
      money = new Intl.NumberFormat(cfg.locale, {
        style: 'currency',
        currency: cfg.currency,
        maximumFractionDigits: 0
      });
    } catch (e) {
      money = { format: function (n) { return '$' + Math.round(n).toLocaleString('en-US'); } };
    }
    function fmt(n) { return money.format(n); }

    function el(name) { return root.querySelector('[data-apmc-el="' + name + '"]'); }

    // Wire up label/input pairs with unique ids so multiple instances stay accessible.
    Array.prototype.forEach.call(root.querySelectorAll('[data-apmc-el]'), function (node) {
      node.id = uid + '-' + node.getAttribute('data-apmc-el');
    });
    Array.prototype.forEach.call(root.querySelectorAll('[data-apmc-for]'), function (label) {
      label.setAttribute('for', uid + '-' + label.getAttribute('data-apmc-for'));
    });

    var priceR = el('price'), priceN = el('priceNum'),
        downR = el('down'), downN = el('downNum'), downHint = el('downHint'),
        rateR = el('rate'), rateN = el('rateNum'),
        termS = el('term'), taxN = el('tax'), insN = el('ins'),
        hoaN = el('hoa'), extraN = el('extra');

    if (!priceR || !priceN || !downR || !downN || !rateR || !rateN || !termS) return;

    var totalEl = el('total'), piEl = el('pi'), taxMEl = el('taxM'), insMEl = el('insM'),
        hoaMEl = el('hoaM'), hoaRow = el('hoaRow'), pmiMEl = el('pmiM'), pmiRow = el('pmiRow'),
        loanEl = el('loanAmt'), downAmtEl = el('downAmt'), totalIntEl = el('totalInt'),
        pmiFlag = el('pmiFlag'), extraFlag = el('extraFlag');

    // Seed control ranges and starting values from config.
    priceR.min = cfg.priceMin; priceR.max = cfg.priceMax; priceR.step = cfg.priceStep;
    rateR.min = cfg.rateMin; rateR.max = cfg.rateMax;
    downR.max = cfg.downMax;

    var downPct = clamp(cfg.downPct, 0, 100);

    priceN.value = cfg.price;
    priceR.value = clamp(cfg.price, cfg.priceMin, cfg.priceMax);
    downN.value = Math.round(cfg.price * (downPct / 100));
    downR.value = clamp(downPct, 0, cfg.downMax);
    rateN.value = cfg.rate;
    rateR.value = clamp(cfg.rate, cfg.rateMin, cfg.rateMax);

    // Apply the configured term if that option exists, so data-term is authoritative
    // whether or not the markup pre-selected it server-side.
    var wantedTerm = String(cfg.term);
    if ( Array.prototype.some.call( termS.options, function ( o ) { return o.value === wantedTerm; } ) ) {
      termS.value = wantedTerm;
    }

    if (taxN) taxN.value = cfg.taxPct;
    if (insN) insN.value = cfg.insurance;
    if (hoaN) hoaN.value = cfg.hoa;
    if (extraN) extraN.value = cfg.extra;

    [priceN, downN, rateN, taxN, insN, hoaN, extraN].forEach(function (node) {
      if (node) node.defaultValue = node.value;
    });

    var lock = false;

    function read(node, fallback) {
      if (!node) return fallback;
      var v = parseFloat(node.value);
      return (isFinite(v) && v >= 0) ? v : fallback;
    }
    function setFill(node) {
      var lo = parseFloat(node.min), hi = parseFloat(node.max);
      var v = clamp(parseFloat(node.value), lo, hi);
      var pct = (hi > lo) ? ((v - lo) / (hi - lo)) * 100 : 0;
      node.style.setProperty('--apmc-fill', pct + '%');
    }
    function payment(loan, r, n) {
      if (!(n > 0)) return 0;
      if (r === 0) return loan / n;
      var p = Math.pow(1 + r, n);
      return loan * r * p / (p - 1);
    }
    function plural(n, word) { return n + ' ' + word + (n === 1 ? '' : 's'); }

    function calc() {
      var price = clamp(read(priceN, cfg.price), 1000, 100000000);
      var ratePct = clamp(read(rateN, cfg.rate), 0, 30);
      var years = parseInt(termS.value, 10) || 30;
      var taxPct = clamp(read(taxN, 0), 0, 10);
      var insYr = clamp(read(insN, 0), 0, 1000000);
      var hoa = clamp(read(hoaN, 0), 0, 100000);
      var extra = clamp(read(extraN, 0), 0, 1000000);

      var downAmt = price * (downPct / 100);
      var loan = price - downAmt;
      var n = years * 12;
      var r = (ratePct / 100) / 12;

      var pi = payment(loan, r, n);
      var taxM = price * (taxPct / 100) / 12;
      var insM = insYr / 12;
      var needsPmi = cfg.showPmi && (cfg.pmiThreshold - downPct > 0) && (loan > 0);
      var pmiM = needsPmi ? loan * cfg.pmiRate / 12 : 0;
      var totalInterest = pi * n - loan;

      // Round each line first, then sum, so the breakdown always adds up to the headline.
      var piR = Math.round(pi), taxR = Math.round(taxM), insR = Math.round(insM),
          hoaR = Math.round(hoa), pmiR = Math.round(pmiM);
      var total = piR + taxR + insR + hoaR + pmiR;

      if (downHint) downHint.textContent = (Math.round(downPct * 10) / 10) + '% down';
      priceR.setAttribute('aria-valuetext', fmt(price));
      downR.setAttribute('aria-valuetext', Math.round(downPct) + ' percent, ' + fmt(downAmt));
      rateR.setAttribute('aria-valuetext', ratePct.toFixed(2) + ' percent');

      if (totalEl) totalEl.textContent = fmt(total);
      if (piEl) piEl.textContent = fmt(piR);
      if (taxMEl) taxMEl.textContent = fmt(taxR);
      if (insMEl) insMEl.textContent = fmt(insR);
      if (hoaMEl) hoaMEl.textContent = fmt(hoaR);
      if (hoaRow) hoaRow.hidden = !(hoa > 0);
      if (pmiMEl) pmiMEl.textContent = fmt(pmiR);
      if (pmiRow) pmiRow.hidden = !(pmiM > 0);
      if (loanEl) loanEl.textContent = fmt(Math.round(loan));
      if (downAmtEl) downAmtEl.textContent = fmt(Math.round(downAmt));
      if (totalIntEl) totalIntEl.textContent = fmt(Math.round(totalInterest));

      // PMI drop-off: walk the schedule until the balance reaches the equity threshold.
      if (pmiFlag) {
        if (pmiM > 0) {
          var bal = loan, target = price * (1 - cfg.pmiThreshold / 100), m = 0;
          while (bal > target && n > m) { bal = bal + bal * r - pi; m++; }
          var yrs = Math.max(0.1, Math.round((m / 12) * 10) / 10);
          pmiFlag.innerHTML = 'Under ' + cfg.pmiThreshold + '% down, so <strong>' + fmt(pmiR) +
            '/mo</strong> in mortgage insurance applies. At this rate you reach ' + cfg.pmiThreshold +
            '% equity in about <strong>' + yrs + ' years</strong>, when PMI typically comes off.';
          pmiFlag.hidden = false;
        } else {
          pmiFlag.hidden = true;
        }
      }

      // Extra payment: months to payoff with the larger payment.
      if (extraFlag) {
        var shown = false;
        if (extra > 0 && loan > 0 && pi > 0) {
          var m2;
          if (r === 0) {
            m2 = loan / (pi + extra);
          } else {
            var denom = 1 - (loan * r) / (pi + extra);
            m2 = (denom > 0) ? (-Math.log(denom) / Math.log(1 + r)) : n;
          }
          m2 = clamp(m2, 0, n);
          var saved = n - m2;
          var intSaved = (pi * n - loan) - ((pi + extra) * m2 - loan);
          if (saved >= 1 && intSaved > 0) {
            var sy = Math.floor(saved / 12), sm = Math.round(saved % 12);
            if (sm === 12) { sy++; sm = 0; }
            var when = (sy > 0 ? plural(sy, 'year') : '') +
                       (sy > 0 && sm > 0 ? ' ' : '') +
                       (sm > 0 ? plural(sm, 'month') : '');
            extraFlag.innerHTML = 'Paying <strong>' + fmt(Math.round(extra)) +
              '/mo</strong> extra pays this off <strong>' + when +
              '</strong> sooner and saves <strong>' + fmt(Math.round(intSaved)) + '</strong> in interest.';
            extraFlag.hidden = false;
            shown = true;
          }
        }
        if (!shown) extraFlag.hidden = true;
      }

      setFill(priceR); setFill(downR); setFill(rateR);

      root.dispatchEvent(new CustomEvent('apmc:change', {
        bubbles: true,
        detail: {
          price: price, downPercent: downPct, downAmount: downAmt, loan: loan,
          rate: ratePct, termYears: years,
          monthly: { principalInterest: piR, tax: taxR, insurance: insR, hoa: hoaR, pmi: pmiR, total: total },
          totalInterest: Math.round(totalInterest)
        }
      }));
    }

    function currentPrice() { return clamp(read(priceN, cfg.price), 1000, 100000000); }

    function fromPriceRange() {
      if (lock) return; lock = true;
      priceN.value = priceR.value;
      downN.value = Math.round(parseFloat(priceR.value) * (downPct / 100));
      lock = false; calc();
    }
    function fromPriceNum() {
      if (lock) return; lock = true;
      var v = currentPrice();
      priceR.value = clamp(v, cfg.priceMin, cfg.priceMax);
      downN.value = Math.round(v * (downPct / 100));
      lock = false; calc();
    }
    function fromDownRange() {
      if (lock) return; lock = true;
      downPct = clamp(parseFloat(downR.value) || 0, 0, 100);
      downN.value = Math.round(currentPrice() * (downPct / 100));
      lock = false; calc();
    }
    function fromDownNum() {
      if (lock) return; lock = true;
      var price = currentPrice();
      var amt = clamp(read(downN, 0), 0, price);
      downPct = price > 0 ? (amt / price) * 100 : 0;
      downR.value = clamp(downPct, 0, cfg.downMax);
      lock = false; calc();
    }
    function fromRateRange() {
      if (lock) return; lock = true;
      rateN.value = rateR.value;
      lock = false; calc();
    }
    function fromRateNum() {
      if (lock) return; lock = true;
      rateR.value = clamp(read(rateN, cfg.rate), cfg.rateMin, cfg.rateMax);
      lock = false; calc();
    }

    function on(node, fn) {
      if (!node) return;
      node.addEventListener('input', fn);
      node.addEventListener('change', fn);
    }
    on(priceR, fromPriceRange); on(priceN, fromPriceNum);
    on(downR, fromDownRange);   on(downN, fromDownNum);
    on(rateR, fromRateRange);   on(rateN, fromRateNum);
    on(termS, calc); on(taxN, calc); on(insN, calc); on(hoaN, calc); on(extraN, calc);

    [priceN, downN, rateN, taxN, insN, hoaN, extraN].forEach(function (node) {
      if (!node) return;
      node.addEventListener('blur', function () {
        if (node.value === '' || !isFinite(parseFloat(node.value))) {
          node.value = node.defaultValue;
          calc();
        }
      });
    });

    calc();
  }

  function boot(scope) {
    var host = scope || document;
    Array.prototype.forEach.call(host.querySelectorAll('[data-apmc]'), init);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { boot(); });
  } else {
    boot();
  }

  window.AgenticPressMortgageCalculator = { refresh: boot };
})();
