const $ = (s) => document.querySelector(s);

const target = new Date('2026-12-18T17:00:00+05:00').getTime();
function tick() {
  const d = Math.max(0, target - Date.now());
  const vals = {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d % 86400000) / 3600000),
    minutes: Math.floor((d % 3600000) / 60000),
    seconds: Math.floor((d % 60000) / 1000)
  };
  for (const [id, value] of Object.entries(vals)) {
    $('#' + id).textContent = String(value).padStart(2, '0');
  }
}
tick();
setInterval(tick, 1000);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

$('#openInvite').addEventListener('click', () => {
  $('#invitation').scrollIntoView({ behavior: 'smooth' });
  $('#toast').classList.add('show');
  setTimeout(() => $('#toast').classList.remove('show'), 2200);
});

// Lightweight decorative gold particles.
const canvas = $('#particles');
const ctx = canvas.getContext('2d');
let w, h, particles = [];
function resize() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.width = innerWidth * ratio;
  h = canvas.height = innerHeight * ratio;
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  particles = Array.from(
    { length: Math.min(65, Math.floor(innerWidth / 14)) },
    () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 1.5 + 0.4) * ratio,
      a: Math.random() * 0.6 + 0.15,
      speed: (Math.random() * 0.22 + 0.05) * ratio
    })
  );
}
resize();
addEventListener('resize', resize);
function draw() {
  ctx.clearRect(0, 0, w, h);
  for (const p of particles) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(231,183,105,${p.a})`;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y -= p.speed;
    if (p.y < 0) {
      p.y = h;
      p.x = Math.random() * w;
    }
  }
  requestAnimationFrame(draw);
}
draw();


// The Blue Danube Waltz — Johann Strauss II.
// 1928 orchestral recording marked public domain on Wikimedia Commons.
const music = document.getElementById('bgMusic');
let musicEnabled = false;
$('#sound').addEventListener('click', async () => {
  const button = $('#sound');
  button.disabled = true;
  try {
    if (musicEnabled) {
      music.pause();
      music.currentTime = 0;
      musicEnabled = false;
      $('#sound span').textContent = 'МУЗЫКА ВЫКЛ.';
      button.setAttribute('aria-label', 'Включить новогоднюю музыку');
    } else {
      await music.play();
      musicEnabled = true;
      $('#sound span').textContent = 'МУЗЫКА ВКЛ.';
      button.setAttribute('aria-label', 'Выключить новогоднюю музыку');
    }
  } catch (error) {
    console.error('Не удалось запустить музыку:', error);
    $('#sound span').textContent = 'НЕТ СВЯЗИ';
  } finally {
    button.disabled = false;
  }
});
