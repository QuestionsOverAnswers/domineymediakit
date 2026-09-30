// Dominey Drew media kit — small interactions (no libraries).

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Biography "Read More"
(function () {
  var btn = document.querySelector('.read-more');
  var more = document.getElementById('bio-more');
  if (!btn || !more) return;
  btn.addEventListener('click', function () {
    var open = more.hidden;
    more.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    btn.innerHTML = open ? 'Read Less... <span aria-hidden="true">↑</span>' : 'Read More... <span aria-hidden="true">↓</span>';
  });
})();

// Gallery carousel: arrows, dots, autoplay every 5s (pauses on hover/touch)
(function () {
  var root = document.querySelector('.carousel');
  if (!root) return;
  var track = root.querySelector('.carousel__track');
  var slides = Array.prototype.slice.call(track.children);
  var dotsWrap = root.querySelector('.carousel__dots');
  var paused = false;

  function perView() {
    var w = slides[0].getBoundingClientRect().width;
    return Math.max(1, Math.round(track.clientWidth / w));
  }
  function step() { return slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth; }
  function index() { return Math.round(track.scrollLeft / step()); }
  function maxIndex() { return Math.max(0, slides.length - perView()); }
  function go(i) {
    var max = maxIndex();
    if (i > max) i = 0;
    if (i < 0) i = max;
    track.scrollTo({ left: i * step(), behavior: 'smooth' });
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (var i = 0; i <= maxIndex(); i++) {
      var b = document.createElement('button');
      b.type = 'button';
      b.tabIndex = -1;
      b.addEventListener('click', go.bind(null, i));
      dotsWrap.appendChild(b);
    }
    markDot();
  }
  function markDot() {
    var cur = index();
    Array.prototype.forEach.call(dotsWrap.children, function (d, i) {
      d.setAttribute('aria-current', i === cur ? 'true' : 'false');
    });
  }

  root.querySelector('.carousel__btn--prev').addEventListener('click', function () { go(index() - 1); });
  root.querySelector('.carousel__btn--next').addEventListener('click', function () { go(index() + 1); });
  track.addEventListener('scroll', function () { window.requestAnimationFrame(markDot); });
  ['mouseenter', 'touchstart', 'focusin'].forEach(function (e) { root.addEventListener(e, function () { paused = true; }, { passive: true }); });
  ['mouseleave', 'focusout'].forEach(function (e) { root.addEventListener(e, function () { paused = false; }); });
  window.addEventListener('resize', buildDots);

  buildDots();
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(function () { if (!paused && !document.hidden) go(index() + 1); }, 5000);
  }
})();

// Only one testimonial video plays at a time
document.querySelectorAll('video').forEach(function (v) {
  v.addEventListener('play', function () {
    document.querySelectorAll('video').forEach(function (o) { if (o !== v) o.pause(); });
  });
});
