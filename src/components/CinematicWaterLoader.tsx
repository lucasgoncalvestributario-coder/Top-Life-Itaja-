import React, { useEffect, useRef, useState } from 'react';
import { soundManager } from '../utils/soundEffects';

interface CinematicWaterLoaderProps {
  onComplete: () => void;
}

export const CinematicWaterLoader: React.FC<CinematicWaterLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Smooth progress counter from 0 to 100 over ~2.4 seconds
    const startTime = performance.now();
    const duration = 2400;

    let animId: number;
    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        animId = requestAnimationFrame(updateProgress);
      } else {
        // Complete! Trigger audio cue & cinematic dissolve
        soundManager.playWaterDrop();
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            onComplete();
          }, 700);
        }, 300);
      }
    };

    animId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  // Interactive liquid wave & bubble physics inside the loader container
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const width = (canvas.width = 380);
    const height = (canvas.height = 140);

    let step = 0;

    // Small bubbles rising inside the liquid
    const bubbles = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 40,
      radius: Math.random() * 2 + 1,
      speed: Math.random() * 1.5 + 0.8,
      drift: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.6 + 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Liquid level based on current progress percentage
      const fillHeight = (progress / 100) * height;
      const waterLevel = height - fillHeight;

      // Draw secondary softer back wave
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 4) {
        const y =
          waterLevel +
          Math.sin(x * 0.025 + step * 0.05) * 4 +
          Math.cos(x * 0.015 - step * 0.03) * 2;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 119, 204, 0.35)';
      ctx.fill();
      ctx.restore();

      // Draw primary crisp front wave with cyan gradient
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 4) {
        const y =
          waterLevel +
          Math.sin(x * 0.035 - step * 0.06) * 5 +
          Math.cos(x * 0.02 + step * 0.04) * 3;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, waterLevel, 0, height);
      gradient.addColorStop(0, 'rgba(0, 210, 255, 0.7)');
      gradient.addColorStop(0.3, 'rgba(0, 150, 235, 0.55)');
      gradient.addColorStop(1, 'rgba(0, 45, 82, 0.85)');
      ctx.fillStyle = gradient;
      ctx.fill();

      // White reflective foam crest line
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.stroke();
      ctx.restore();

      // Bubbles ascending
      if (progress > 5) {
        ctx.save();
        bubbles.forEach((b) => {
          b.y -= b.speed;
          b.x += b.drift;

          if (b.y < waterLevel) {
            b.y = height + Math.random() * 20;
            b.x = Math.random() * width;
          }

          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224, 247, 255, ${b.alpha})`;
          ctx.fill();
        });
        ctx.restore();
      }

      step += 1;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [progress]);

  const handleSkip = () => {
    soundManager.playWaterDrop();
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#000a17] transition-all duration-700 ease-in-out ${
        isFadingOut
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100 pointer-events-auto'
      }`}
    >
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,rgba(0,119,204,0.18),transparent_70%)] pointer-events-none" />

      {/* Subtle coordinate grid lines for high-tech digital studio aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6">
        {/* Top Studio Label */}
        <div className="flex items-center space-x-2 text-[10px] tracking-[0.35em] text-sky-400/80 uppercase font-light mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>TOP LIFE • ENGENHARIA DA ÁGUA PURA</span>
        </div>

        {/* Logo Container with Water Filling Animation */}
        <div className="relative w-72 sm:w-80 h-28 sm:h-32 flex items-center justify-center mb-6">
          {/* Logo silhouette base */}
          <img
            src="/images/brand/top-life-logo.png"
            alt="Top Life"
            className="w-full h-full object-contain filter brightness-90 contrast-125 z-10 select-none pointer-events-none drop-shadow-[0_10px_25px_rgba(0,119,204,0.35)]"
          />

          {/* Liquid Wave Overlay behind the logo */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl pointer-events-none z-0">
            <canvas ref={canvasRef} className="w-full h-full opacity-60" />
          </div>
        </div>

        {/* Progress percentage & progress bar */}
        <div className="w-64 sm:w-72 space-y-2 text-center">
          <div className="flex items-center justify-between text-xs tracking-widest text-slate-400 font-mono">
            <span className="text-cyan-400/90 font-light">CARREGANDO SISTEMA</span>
            <span className="text-white font-medium text-sm">
              {String(progress).padStart(2, '0')}%
            </span>
          </div>

          {/* Ultra fine progress bar */}
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-cyan-300 to-white transition-all duration-100 ease-out shadow-[0_0_8px_rgba(0,210,255,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="pt-2 text-[10px] tracking-[0.25em] text-slate-500 uppercase font-light">
            Água Alcalina • Ozonizada • Refrigeração R-134a
          </div>
        </div>

        {/* Discreet skip button */}
        <button
          onClick={handleSkip}
          className="mt-8 text-[11px] tracking-widest uppercase font-light text-slate-400 hover:text-cyan-300 transition-colors duration-200 cursor-pointer border-b border-transparent hover:border-cyan-400/50 pb-0.5"
        >
          Pular Introdução →
        </button>
      </div>

      {/* Footer subtle imprint */}
      <div className="absolute bottom-6 text-[9px] tracking-[0.25em] text-slate-400 uppercase font-light">
        Itajaí • Santa Catarina • Brasil
      </div>
    </div>
  );
};
