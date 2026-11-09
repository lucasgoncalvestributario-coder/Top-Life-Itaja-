import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  pulsePhase: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

const PARTICLE_COLORS = [
  'rgba(0, 240, 255, ',    // Electric Cyan
  'rgba(0, 229, 163, ',    // Vibrant Mint Emerald
  'rgba(0, 150, 255, ',    // Vivid Lagoon Blue
  'rgba(168, 85, 247, ',   // Radiant Ozone Violet
  'rgba(255, 170, 50, ',   // Golden Mineral Amber
];

export const LivingWaterBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const ripples: Ripple[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleClick = (e: MouseEvent) => {
      // Add interactive color ripple on click
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: Math.random() * 80 + 100,
        alpha: 0.6,
        color: Math.random() > 0.5 ? 'rgba(0, 240, 255,' : 'rgba(0, 229, 163,',
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    // Chromatic sparkling micro-particles
    const particleCount = 55;
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.45 + 0.15,
      speedX: (Math.random() - 0.5) * 0.35,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      alpha: Math.random() * 0.4 + 0.15,
      baseAlpha: Math.random() * 0.35 + 0.15,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    let step = 0;

    const render = () => {
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Deep rich oceanic gradient foundation
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#000817');
      grad.addColorStop(0.35, '#00142e');
      grad.addColorStop(0.7, '#000b1d');
      grad.addColorStop(1, '#000511');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Vibrant Luminous Color Aura Orbs (Bioluminescent fluid blooms)
      step += 1;

      // Orb 1: Electric Cyan (top right)
      const orb1X = width * 0.75 + Math.sin(step * 0.007) * 90;
      const orb1Y = height * 0.25 + Math.cos(step * 0.008) * 70;
      const gradOrb1 = ctx.createRadialGradient(orb1X, orb1Y, 10, orb1X, orb1Y, 480);
      gradOrb1.addColorStop(0, 'rgba(0, 210, 255, 0.16)');
      gradOrb1.addColorStop(0.5, 'rgba(0, 140, 255, 0.08)');
      gradOrb1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradOrb1;
      ctx.fillRect(0, 0, width, height);

      // Orb 2: Emerald Mint (bottom left)
      const orb2X = width * 0.2 + Math.cos(step * 0.009) * 80;
      const orb2Y = height * 0.75 + Math.sin(step * 0.006) * 90;
      const gradOrb2 = ctx.createRadialGradient(orb2X, orb2Y, 10, orb2X, orb2Y, 450);
      gradOrb2.addColorStop(0, 'rgba(0, 229, 163, 0.13)');
      gradOrb2.addColorStop(0.6, 'rgba(0, 160, 200, 0.06)');
      gradOrb2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradOrb2;
      ctx.fillRect(0, 0, width, height);

      // Orb 3: Radiant Ozone Violet (center-right)
      const orb3X = width * 0.5 + Math.sin(step * 0.005) * 120;
      const orb3Y = height * 0.55 + Math.cos(step * 0.007) * 80;
      const gradOrb3 = ctx.createRadialGradient(orb3X, orb3Y, 10, orb3X, orb3Y, 420);
      gradOrb3.addColorStop(0, 'rgba(147, 51, 234, 0.10)');
      gradOrb3.addColorStop(0.5, 'rgba(59, 130, 246, 0.05)');
      gradOrb3.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradOrb3;
      ctx.fillRect(0, 0, width, height);

      // Mouse Parallax Glow
      const mouseGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 250);
      mouseGrad.addColorStop(0, 'rgba(0, 240, 255, 0.10)');
      mouseGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');
      ctx.fillStyle = mouseGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Interactive Click Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 2.2;
        r.alpha -= 0.012;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${r.color} ${r.alpha})`;
        ctx.lineWidth = 1.8;
        ctx.shadowColor = 'rgba(0, 240, 255, 0.7)';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();
      }

      // Render Chromatic Water Particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX + Math.sin(step * 0.02 + p.pulsePhase) * 0.25;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Interactive cursor repulsion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160 && dist > 0) {
          const force = (160 - dist) / 160;
          p.x += (dx / dist) * force * 1.0;
          p.y += (dy / dist) * force * 1.0;
        }

        const currentAlpha =
          p.baseAlpha + Math.sin(step * 0.03 + p.pulsePhase) * 0.18;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.05, Math.min(0.85, currentAlpha))})`;
        ctx.shadowColor = 'rgba(0, 240, 255, 0.6)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1] select-none"
      aria-hidden="true"
    />
  );
};
