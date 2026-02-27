import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

/**
 * Pure CSS/Canvas solar system background
 */
export function SolarSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

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

    const skills = [
      { orbitRadius: 70, size: 5, color: '#61dafb', speed: 0.012, name: 'React', iconPath: 'https://cdn.simpleicons.org/react/61DAFB' },
      { orbitRadius: 115, size: 5, color: '#3178c6', speed: 0.010, name: 'TypeScript', iconPath: 'https://cdn.simpleicons.org/typescript/3178C6' },
      { orbitRadius: 165, size: 5, color: '#38bdf8', speed: 0.008, name: 'Tailwind CSS', iconPath: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
      { orbitRadius: 215, size: 5, color: '#646cff', speed: 0.007, name: 'Vite', iconPath: 'https://cdn.simpleicons.org/vite/646CFF' },
      { orbitRadius: 270, size: 5, color: '#8cc84b', speed: 0.006, name: 'Node.js', iconPath: 'https://cdn.simpleicons.org/nodedotjs/339933' },
      { orbitRadius: 330, size: 5, color: '#ffffff', speed: 0.005, name: 'Next.js', iconPath: 'https://cdn.simpleicons.org/nextdotjs/white' },
      { orbitRadius: 390, size: 5, color: '#f34f29', speed: 0.004, name: 'Git', iconPath: 'https://cdn.simpleicons.org/git/F05032' },
      { orbitRadius: 460, size: 5, color: '#f24e1e', speed: 0.003, name: 'Figma', iconPath: 'https://cdn.simpleicons.org/figma/F24E1E' },
      { orbitRadius: 530, size: 5, color: '#3776ab', speed: 0.002, name: 'Python', iconPath: 'https://cdn.simpleicons.org/python/3776AB' },
    ];

    const loadedImages = new Map<string, HTMLImageElement>();

    // Initialize skill icon images
    skills.forEach(skill => {
      const img = new Image();
      img.src = skill.iconPath;
      loadedImages.set(skill.name, img);
    });

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Stars
      stars.forEach((s) => {
        const opacity = (0.3 + 0.7 * Math.sin(time * s.speed * 100 + s.phase)) * (isDark ? 1 : 0.6);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(255,255,255,${opacity})` : `rgba(0,0,0,${opacity})`;
        ctx.fill();
      });

      const cx = canvas.width * 0.5;
      const cy = canvas.height * 0.5;

      // Central glowing core
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 35);
      if (isDark) {
        coreGrad.addColorStop(0, '#ffffff');
        coreGrad.addColorStop(0.3, '#e0e7ff');
        coreGrad.addColorStop(0.8, '#818cf8');
        coreGrad.addColorStop(1, 'rgba(99,102,241,0)');
      } else {
        coreGrad.addColorStop(0, '#4f46e5');
        coreGrad.addColorStop(0.3, '#818cf8');
        coreGrad.addColorStop(0.8, '#c7d2fe');
        coreGrad.addColorStop(1, 'rgba(99,102,241,0)');
      }
      ctx.beginPath();
      ctx.arc(cx, cy, 35, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Core text
      ctx.fillStyle = isDark ? '#1e1b4b' : '#ffffff';
      ctx.font = 'bold 12px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SKILLS', cx, cy);

      // Core glow
      const glowGrad = ctx.createRadialGradient(cx, cy, 25, cx, cy, 90);
      if (isDark) {
        glowGrad.addColorStop(0, 'rgba(99,102,241,0.25)');
        glowGrad.addColorStop(1, 'rgba(99,102,241,0)');
      } else {
        glowGrad.addColorStop(0, 'rgba(79,70,229,0.15)');
        glowGrad.addColorStop(1, 'rgba(79,70,229,0)');
      }
      ctx.beginPath();
      ctx.arc(cx, cy, 90, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Orbits and skills
      skills.forEach((p) => {
        // Orbit path
        ctx.beginPath();
        ctx.arc(cx, cy, p.orbitRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Position
        const angle = time * p.speed;
        const px = cx + Math.cos(angle) * p.orbitRadius;
        const py = cy + Math.sin(angle) * p.orbitRadius;

        // Skill node
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Skill node glow
        const pGlow = ctx.createRadialGradient(px, py, p.size * 0.5, px, py, p.size * 3.5);
        pGlow.addColorStop(0, p.color + '80');
        pGlow.addColorStop(1, p.color + '00');
        ctx.beginPath();
        ctx.arc(px, py, p.size * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = pGlow;
        ctx.fill();

        // Skill name icon/image
        const img = loadedImages.get(p.name);
        if (img && img.complete) {
          const imgSize = 24; // Draw the icon with 24x24 dimensions
          ctx.drawImage(img, px + p.size + 8, py - imgSize / 2, imgSize, imgSize);
        }
      });

      time += 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]); // Re-run effect when theme changes to redraw completely

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
