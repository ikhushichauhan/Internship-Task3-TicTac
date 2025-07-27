let fireworksActive = false;
let particles = [];

function startFireworks() {
  fireworksActive = true;
  requestAnimationFrame(updateFireworks);
  createParticles();
}

function stopFireworks() {
  fireworksActive = false;
  particles = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function createParticles() {
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      dx: Math.random() * 4 - 2,
      dy: Math.random() * -4 - 1,
      size: Math.random() * 3 + 1,
      life: 100,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`
    });
  }
}

function updateFireworks() {
  if (!fireworksActive) return;
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    p.life--;
  });

  particles = particles.filter(p => p.life > 0);

  if (particles.length > 0) {
    requestAnimationFrame(updateFireworks);
  }
}
