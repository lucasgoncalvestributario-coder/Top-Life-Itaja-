import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { PHONE_NUMBER } from '../data/purifiers';
import { soundManager } from '../utils/soundEffects';
import { WhatsAppIcon } from './WhatsAppIcon';

interface InteractiveBubble {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  alpha: number;
  maxLife: number;
  life: number;
}

export const FinalCtaSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bubblesRef = useRef<InteractiveBubble[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Bolhas contínuas de fundo
    for (let i = 0; i < 24; i++) {
      bubblesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 5 + 2,
        speedY: Math.random() * 1.0 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.25 + 0.1,
        maxLife: Infinity,
        life: 0,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = bubblesRef.current.length - 1; i >= 0; i--) {
        const b = bubblesRef.current[i];
        b.y -= b.speedY;
        b.x += b.speedX;
        b.life++;

        // Se for bolha interativa temporária
        if (b.maxLife !== Infinity) {
          b.alpha *= 0.985;
          b.radius += 0.05;
          if (b.alpha < 0.02 || b.y < -15) {
            bubblesRef.current.splice(i, 1);
            continue;
          }
        } else {
          // Bolha contínua reciclável
          if (b.y < -15) {
            b.y = height + 10;
            b.x = Math.random() * width;
          }
        }

        // Desenhar bolha de água translúcida com reflexo
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 158, 235, ${b.alpha * 0.25})`;
        ctx.fill();

        ctx.strokeStyle = `rgba(0, 119, 204, ${b.alpha * 0.6})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Ponto de brilho interno
        ctx.beginPath();
        ctx.arc(b.x - b.radius * 0.35, b.y - b.radius * 0.35, b.radius * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.9})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Criação de bolhas interativas conforme o usuário passa o mouse por cima
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Gerar 2 a 3 bolhas suaves ao redor da posição do cursor
    for (let i = 0; i < 2; i++) {
      bubblesRef.current.push({
        x: mouseX + (Math.random() - 0.5) * 28,
        y: mouseY + (Math.random() - 0.5) * 28,
        radius: Math.random() * 6 + 3,
        speedY: Math.random() * 1.6 + 0.8,
        speedX: (Math.random() - 0.5) * 0.8,
        alpha: Math.random() * 0.45 + 0.25,
        maxLife: 120,
        life: 0,
      });
    }

    // Limitar total de bolhas para alta performance
    if (bubblesRef.current.length > 90) {
      bubblesRef.current.splice(0, 10);
    }
  };

  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
    'Olá! Conheci a Top Life e gostaria de falar com um especialista.'
  )}`;

  return (
    <section
      id="contato"
      onMouseMove={handleMouseMove}
      className="relative py-24 sm:py-36 bg-white text-slate-900 overflow-hidden border-t border-sky-100 select-none"
    >
      {/* CANVAS COM BOLHAS DE ÁGUA INTERATIVAS CONFORME PASSA O MOUSE */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Brilho Sutil de Fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/40 via-transparent to-sky-50/30 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
        
        {/* Título Protagonista */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-3xl mx-auto text-[#002D52]">
          <span className="inline-block bg-gradient-to-r from-[#002D52] via-[#009EEB] via-50% to-[#002D52] bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer-light">
            A qualidade da água começa com a escolha certa.
          </span>
        </h2>

        {/* Frase Curta e Direta */}
        <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-normal max-w-xl mx-auto leading-relaxed">
          Conheça nossas soluções e converse com nossa equipe.
        </p>

        {/* Único Botão de Ação: Falar com Especialista */}
        <div className="pt-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playHudClick()}
            className="group inline-flex items-center space-x-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-lg shadow-emerald-950/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-emerald-400/40"
          >
            <WhatsAppIcon className="w-5 h-5 fill-white group-hover:rotate-12 transition-transform duration-200" />
            <span>Falar com especialista</span>
            <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>

      </div>

      <style>{`
        @keyframes shimmerLight {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-shimmer-light {
          animation: shimmerLight 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
