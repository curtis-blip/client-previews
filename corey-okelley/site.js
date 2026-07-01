/* O'Kelley CRE — shared interactions (all pages) */
(function(){
  // sticky nav + mobile burger + dropdowns
  var nav=document.getElementById('nav');
  if(nav){
    var s=function(){nav.classList.toggle('scrolled',window.scrollY>60)};s();
    window.addEventListener('scroll',s,{passive:true});
    var b=nav.querySelector('.nav-burger');
    if(b)b.addEventListener('click',function(){var o=nav.classList.toggle('open');b.setAttribute('aria-expanded',o)});
    nav.querySelectorAll('.nav-group>.nav-top').forEach(function(t){
      t.addEventListener('click',function(e){
        if(window.innerWidth<=880){e.preventDefault();var g=t.parentElement;var o=g.classList.toggle('open');t.setAttribute('aria-expanded',o)}
      });
    });
  }
  // FAQ accordion
  document.querySelectorAll('.faq .q').forEach(function(q){
    q.setAttribute('aria-expanded','false');
    q.addEventListener('click',function(){
      var item=q.parentElement,a=item.querySelector('.a'),open=item.classList.toggle('open');
      q.setAttribute('aria-expanded',open);
      a.style.maxHeight=open?(a.scrollHeight+'px'):'0';
    });
  });
  // Mockup forms: never actually submit, show a confirmation note
  document.querySelectorAll('form[data-mock]').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var n=f.querySelector('.form-note');
      if(n){n.style.display='block';n.scrollIntoView({behavior:'smooth',block:'center'});}
    });
  });
})();
