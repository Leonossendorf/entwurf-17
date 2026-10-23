// Dachplan: Positionen und Legende verbinden
(function () {
  var pins = document.querySelectorAll('.pin');
  var items = document.querySelectorAll('.legend li[data-pos]');
  function select(n, scroll) {
    pins.forEach(function (p) { p.classList.toggle('is-on', p.dataset.pos === n); });
    items.forEach(function (li) { li.classList.toggle('is-on', li.dataset.pos === n); });
    if (scroll && window.innerWidth <= 1020) {
      var li = document.querySelector('.legend li[data-pos="' + n + '"]');
      if (li) li.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  pins.forEach(function (p) { p.addEventListener('click', function () { select(p.dataset.pos, true); }); });
  items.forEach(function (li) { li.addEventListener('click', function () { select(li.dataset.pos, false); }); });
  select('2', false);

  // Objekte filtern
  var chips = document.querySelectorAll('.filter .chip');
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      chips.forEach(function (x) { x.classList.toggle('is-on', x === c); });
      document.querySelectorAll('.obj').forEach(function (o) {
        o.classList.toggle('is-off', c.dataset.f !== 'alle' && o.dataset.c !== c.dataset.f);
      });
    });
  });

  // Anliegen vorwählen (Kran, Ausbildung)
  document.querySelectorAll('[data-anliegen]').forEach(function (a) {
    a.addEventListener('click', function () {
      var r = document.querySelector('input[name="anliegen"][value="' + a.dataset.anliegen + '"]');
      if (r) r.checked = true;
    });
  });

  // Formular: im Entwurf nichts senden
  var f = document.getElementById('reqForm');
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('formOk').hidden = false;
  });
})();
