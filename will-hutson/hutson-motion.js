/* ============================================================
   HUTSON MOTION SYSTEM (JS) — shared by every page
   Pairs with hutson-motion.css. See that file for the API.
   ============================================================ */
(function(){
 'use strict';
 var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
 var hasIO = 'IntersectionObserver' in window;
 if(!hasIO) return; // no-JS / ancient: CSS leaves everything visible

 document.documentElement.classList.add('m-on');

 /* ---- header drop-in ---- */
 addEventListener('load',function(){
  var h = document.querySelector('.hdr');
  if(h) requestAnimationFrame(function(){ h.classList.add('in'); });
 });

 /* ---- per-element delay/duration overrides ---- */
 document.querySelectorAll('[data-delay]').forEach(function(el){
  el.style.transitionDelay = parseInt(el.dataset.delay,10)+'ms';
 });
 document.querySelectorAll('[data-dur]').forEach(function(el){
  el.style.transitionDuration = parseInt(el.dataset.dur,10)+'ms';
 });

 /* ---- stagger: assign child delays ---- */
 document.querySelectorAll('[data-stagger]').forEach(function(p){
  var step = parseInt(p.dataset.staggerStep,10) || 90;
  Array.prototype.forEach.call(p.children,function(c,i){
   if(!c.hasAttribute('data-delay')) c.style.transitionDelay = (i*step)+'ms';
  });
 });

 /* ---- count-up ---- */
 function ease(t){ return 1-Math.pow(1-t,3); }
 function runCount(el){
  var target = parseFloat(el.dataset.count);
  if(isNaN(target)) return;
  var prefix = el.dataset.prefix||'', suffix = el.dataset.suffix||'';
  var comma = el.hasAttribute('data-comma');
  var dur = parseInt(el.dataset.countDur,10) || 1600;
  if(reduced){ el.textContent = prefix+(comma?target.toLocaleString('en-US'):target)+suffix; return; }
  var t0 = null;
  function frame(ts){
   if(t0===null) t0 = ts;
   var k = Math.min((ts-t0)/dur,1);
   var v = Math.round(target*ease(k));
   el.textContent = prefix+(comma?v.toLocaleString('en-US'):v)+suffix;
   if(k<1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
 }

 /* ---- reveal observer (elements + stagger parents) ---- */
 var io = new IntersectionObserver(function(es){
  es.forEach(function(e){
   if(!e.isIntersecting) return;
   e.target.classList.add('in');
   e.target.querySelectorAll('[data-count]').forEach(runCount);
   if(e.target.hasAttribute('data-count')) runCount(e.target);
   io.unobserve(e.target);
  });
 },{threshold:.15,rootMargin:'0px 0px -4% 0px'});
 document.querySelectorAll('[data-reveal],[data-stagger],.rule-draw').forEach(function(el){ io.observe(el); });

 /* ---- parallax: writes --plx, composed by CSS ---- */
 var plx = Array.prototype.slice.call(document.querySelectorAll('[data-plx]'));
 if(plx.length && !reduced && innerWidth > 720){
  var items = plx.map(function(el){
   return { el: el, ref: el.parentElement || el, speed: parseFloat(el.dataset.plx)||0 };
  });
  var ticking = false;
  function apply(){
   ticking = false;
   var vh = innerHeight;
   items.forEach(function(it){
    var r = it.ref.getBoundingClientRect();
    if(r.bottom < -200 || r.top > vh+200) return;
    var base = r.top + r.height/2 - vh/2;
    it.el.style.setProperty('--plx',(base*it.speed).toFixed(1)+'px');
   });
  }
  function onScroll(){ if(!ticking){ ticking = true; requestAnimationFrame(apply); } }
  addEventListener('scroll',onScroll,{passive:true});
  addEventListener('resize',onScroll);
  apply();
 }
})();
