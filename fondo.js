document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'canvas-bg';
  document.getElementById('background').appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let mouseX = 0;
  let mouseY = 0;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const spheres = [];
  const nodeCount = 80;

  for (let i = 0; i < nodeCount; i++) {
    spheres.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 150 + 50,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 2
    });
  }

  function drawSphere(s) {
    const scale = 100 / (100 + s.z);
    const x = s.x + (mouseX - canvas.width / 2) * (s.z / 1000); // suavizado
    const y = s.y + (mouseY - canvas.height / 2) * (s.z / 1000);
    const radius = s.r * scale;

    const glow = ctx.createRadialGradient(x, y, 0, x, y, radius * 4);
    glow.addColorStop(0, `rgba(0, 255, 255, 0.2)`);
    glow.addColorStop(1, `rgba(0, 255, 255, 0)`);

    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, radius * 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawConnections() {
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = spheres[i].x - spheres[j].x;
        const dy = spheres[i].y - spheres[j].y;
        const dz = spheres[i].z - spheres[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 120) {
          const x1 = spheres[i].x + (mouseX - canvas.width / 2) * (spheres[i].z / 1000);
          const y1 = spheres[i].y + (mouseY - canvas.height / 2) * (spheres[i].z / 1000);
          const x2 = spheres[j].x + (mouseX - canvas.width / 2) * (spheres[j].z / 1000);
          const y2 = spheres[j].y + (mouseY - canvas.height / 2) * (spheres[j].z / 1000);

          ctx.strokeStyle = `rgba(0, 255, 255, ${1 - dist / 120})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawConnections();

    for (let s of spheres) {
      drawSphere(s);
      s.x += s.vx;
      s.y += s.vy;

      if (s.x < 0 || s.x > canvas.width) s.vx *= -1;
      if (s.y < 0 || s.y > canvas.height) s.vy *= -1;
    }

    requestAnimationFrame(animate);
  }

  animate();
});
