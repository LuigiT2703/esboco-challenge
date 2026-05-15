// ── Mobile nav toggle ──
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('aberto');
  });
  navLinks.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('aberto');
    })
  );
}

// ── Scroll fade-in ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── Counter animation ──
function animarContador(el, alvo, dur) {
  dur = dur || 1800;
  var inicio = null;
  function tick(ts) {
    if (!inicio) inicio = ts;
    var prog = Math.min((ts - inicio) / dur, 1);
    el.textContent = Math.floor(prog * alvo).toLocaleString('pt-BR');
    if (prog < 1) requestAnimationFrame(tick);
    else el.textContent = alvo.toLocaleString('pt-BR');
  }
  requestAnimationFrame(tick);
}

var contadores = document.querySelectorAll('[data-count]');
if (contadores.length) {
  var contObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting && !e.target.dataset.animado) {
        e.target.dataset.animado = '1';
        animarContador(e.target, parseInt(e.target.dataset.count));
      }
    });
  }, { threshold: 0.5 });
  contadores.forEach(function(c) { contObs.observe(c); });
}

// ── FAQ Accordion ──
document.querySelectorAll('.faq-item').forEach(function(item) {
  var btn = item.querySelector('.faq-pergunta');
  if (!btn) return;
  btn.addEventListener('click', function() {
    var aberto = item.classList.contains('aberto');
    document.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('aberto'); });
    if (!aberto) item.classList.add('aberto');
  });
});

// ── Contato form ──
var form = document.querySelector('.contato-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var nome  = form.querySelector('#nome').value.trim();
    var email = form.querySelector('#email').value.trim();
    var msg   = form.querySelector('#mensagem').value.trim();
    var aviso = form.querySelector('.form-aviso');
    if (!nome || !email || !msg) {
      aviso.textContent = 'Por favor, preencha todos os campos.';
      aviso.style.color = '#e74c3c';
      return;
    }
    aviso.textContent = '✅ Mensagem enviada com sucesso! Entraremos em contato em breve.';
    aviso.style.color = '#27ae60';
    form.reset();
  });
}

// ── Dashboard: registrar ação ──
document.querySelectorAll('.acao-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var pts  = parseInt(btn.dataset.pts);
    var nome = btn.dataset.nome;
    var totalEl = document.querySelector('.dash-total-pts');
    if (totalEl) {
      var atual = parseInt(totalEl.textContent.replace(/\D/g,'')) || 0;
      totalEl.textContent = (atual + pts).toLocaleString('pt-BR');
    }
    btn.textContent = '✅ +' + pts + ' pts';
    btn.style.background = 'var(--green)';
    btn.style.color = '#fff';
    btn.disabled = true;
    setTimeout(function() {
      btn.textContent = nome + ' +' + pts + ' pts';
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
    }, 2500);
  });
});

// ── Ranking tabs ──
document.querySelectorAll('.tab-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('ativo'); });
    btn.classList.add('ativo');
  });
});
