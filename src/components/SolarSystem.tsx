import { useEffect, useRef } from 'react';

/**
 * Pure CSS/Canvas solar system background
 */
export function SolarSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const stars: { x: number; y: number; r: number; speed: number; phase: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.005 + 0.001,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const planets = [
      { orbitRadius: 60, size: 4, color: '#a0a0a0', speed: 0.02, name: 'Mercury' },
      { orbitRadius: 95, size: 6, color: '#e8c76a', speed: 0.015, name: 'Venus' },
      { orbitRadius: 135, size: 7, color: '#4d9de0', speed: 0.012, name: 'Earth' },
      { orbitRadius: 175, size: 5, color: '#e06c4d', speed: 0.009, name: 'Mars' },
      { orbitRadius: 240, size: 14, color: '#d4a373', speed: 0.005, name: 'Jupiter' },
      { orbitRadius: 310, size: 12, color: '#c9b06b', speed: 0.003, name: 'Saturn', rings: true },
      { orbitRadius: 370, size: 9, color: '#7ec8e3', speed: 0.002, name: 'Uranus' },
      { orbitRadius: 420, size: 8, color: '#4169e1', speed: 0.001, name: 'Neptune' },
    ];

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Stars
      stars.forEach((s) => {
        const opacity = 0.3 + 0.7 * Math.sin(time * s.speed * 100 + s.phase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      });

      const cx = canvas.width * 0.5;
      const cy = canvas.height * 0.5;

      // Sun
      const sunGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      sunGrad.addColorStop(0, '#fff7e0');
      sunGrad.addColorStop(0.3, '#ffd24d');
      sunGrad.addColorStop(0.7, '#ff8c00');
      sunGrad.addColorStop(1, 'rgba(255,140,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.fill();

      // Sun glow
      const glowGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 80);
      glowGrad.addColorStop(0, 'rgba(255,200,50,0.15)');
      glowGrad.addColorStop(1, 'rgba(255,200,50,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, 80, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Orbits and planets
      planets.forEach((p) => {
        // Orbit path
        ctx.beginPath();
        ctx.arc(cx, cy, p.orbitRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Planet position
        const angle = time * p.speed;
        const px = cx + Math.cos(angle) * p.orbitRadius;
        const py = cy + Math.sin(angle) * p.orbitRadius;

        // Saturn rings
        if (p.rings) {
          ctx.beginPath();
          ctx.ellipse(px, py, p.size * 2.2, p.size * 0.6, Math.PI / 6, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(201,176,107,0.4)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Planet
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Planet glow
        const pGlow = ctx.createRadialGradient(px, py, p.size * 0.5, px, py, p.size * 2.5);
        pGlow.addColorStop(0, p.color + '40');
        pGlow.addColorStop(1, p.color + '00');
        ctx.beginPath();
        ctx.arc(px, py, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = pGlow;
        ctx.fill();
      });

      time += 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
