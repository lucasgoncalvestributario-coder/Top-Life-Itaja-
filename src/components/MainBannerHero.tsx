import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { PHONE_NUMBER } from '../data/purifiers';
import { soundManager } from '../utils/soundEffects';

const HERO_PHOTOS = [
  { id: 'photo-1', image: '/images/banner/banner-1.jpg', alt: 'Purificador Top Life' },
  { id: 'photo-2', image: '/images/banner/banner-2.jpg', alt: 'Purificador Top Life' },
  { id: 'photo-3', image: '/images/banner/banner-3.jpg', alt: 'Purificador Top Life' },
  { id: 'photo-4', image: '/images/banner/banner-4.jpg', alt: 'Purificador Top Life' },
  { id: 'photo-5', image: '/images/products/Whats-App-Image-2026-10-12-at-11-05-51.jpg', alt: 'Purificador Top Life' },
];

export const MainBannerHero: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animação de bolhas de água / gás subindo no fundo branco
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

    // Bolhas e microbolhas de gás subindo
    interface Bubble {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      wobbleSpeed: number;
      wobbleAmp: number;
      alpha: number;
      phase: number;
    }

    const bubbleCount = 42;
    const bubbles: Bubble[] = Array.from({ length: bubbleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 4 + 1.5,
      speedY: Math.random() * 1.4 + 0.8,
      wobbleSpeed: Math.random() * 0.04 + 0.02,
      wobbleAmp: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.28 + 0.12,
      phase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      bubbles.forEach((b) => {
        b.y -= b.speedY;
        b.phase += b.wobbleSpeed;
        const currentX = b.x + Math.sin(b.phase) * b.wobbleAmp;

        if (b.y < -10) {
          b.y = height + 10;
          b.x = Math.random() * width;
        }

        // Desenhar bolha de gás de água com reflexo suave
        ctx.beginPath();
        ctx.arc(currentX, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 158, 235, ${b.alpha * 0.35})`;
        ctx.fill();

        ctx.strokeStyle = `rgba(0, 119, 204, ${b.alpha * 0.7})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Ponto de luz interno na bolha
        ctx.beginPath();
        ctx.arc(currentX - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.9})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Transição do carrossel
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_PHOTOS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handlePrev = () => {
    soundManager.playHudClick();
    setIsAutoPlay(false);
    setCurrentIdx((prev) => (prev - 1 + HERO_PHOTOS.length) % HERO_PHOTOS.length);
  };

  const handleNext = () => {
    soundManager.playHudClick();
    setIsAutoPlay(false);
    setCurrentIdx((prev) => (prev + 1) % HERO_PHOTOS.length);
  };

  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
    'Olá! Gostaria de falar com um especialista sobre os purificadores de água Top Life.'
  )}`;

  return (
    <section id="hero" className="relative w-full pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 overflow-hidden bg-white text-slate-900 border-b border-sky-100">
      
      {/* FUNDO BRANCO COM ÁGUAS / BOLHAS DE GÁS SUBINDO POR TRÁS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Brilho Suave de Fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/40 via-transparent to-white pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LADO ESQUERDO: COMPOSIÇÃO TIPOGRÁFICA ELEGANTE */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-7 text-center lg:text-left">
            <div>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none text-[#002D52]">
                <span className="inline-block bg-gradient-to-r from-[#002D52] via-[#009EEB] via-50% to-[#002D52] bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer-light">
                  TOP LIFE
                </span>
              </h1>

              <p className="mt-4 sm:mt-6 text-xl sm:text-2xl lg:text-3xl font-bold text-[#003B66] tracking-tight leading-snug">
                Água de qualidade. Tecnologia em cada detalhe.
              </p>

              <p className="mt-3 text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                Purificadores desenvolvidos para transformar a experiência de cuidar da água.
              </p>
            </div>

            {/* Ação: Falar com Especialista */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playHudClick()}
                className="group inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-emerald-950/20 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer border border-emerald-400/40"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white shrink-0 group-hover:rotate-12 transition-transform duration-200" />
                <span className="font-extrabold uppercase tracking-wider">Falar com especialista</span>
                <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform duration-200" />
              </a>

              <a
                href="#modelos"
                onClick={() => soundManager.playHudClick()}
                className="text-xs sm:text-sm font-bold text-[#0077CC] hover:text-[#002D52] transition-colors py-2 px-3"
              >
                Ver purificadores e refis ↓
              </a>
            </div>
          </div>

          {/* LADO DIREITO: SOMENTE A FOTO PASSANDO, SEM MOLDURA, SEM TÍTULO, APENAS COM UMA SETINHA */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Contêiner da foto sem qualquer moldura ou borda */}
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
              
              {/* Fotos passando sem títulos */}
              {HERO_PHOTOS.map((item, idx) => {
                const isActive = idx === currentIdx;
                return (
                  <div
                    key={item.id}
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                      isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="eager"
                      decoding="sync"
                      className="max-h-full max-w-full w-auto h-auto object-contain select-none drop-shadow-xl"
                    />
                  </div>
                );
              })}

              {/* Setinhas laterais para mudar a foto se quiser */}
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#002D52] border border-sky-200 shadow-md backdrop-blur-xs transition-all cursor-pointer z-20 hover:scale-110"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#002D52] border border-sky-200 shadow-md backdrop-blur-xs transition-all cursor-pointer z-20 hover:scale-110"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

            </div>

          </div>

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
