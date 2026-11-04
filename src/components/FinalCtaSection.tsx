import React, { useRef, useEffect } from 'react';
import { MessageCircle, CheckCircle2, Droplet, ArrowRight } from 'lucide-react';
import { PURIFIER_MODELS, createWhatsAppUrl } from '../data/purifiers';
import { soundManager } from '../utils/soundEffects';

export const FinalCtaSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const featuredModel = PURIFIER_MODELS[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const dotCount = 20;
    const dots = Array.from({ length: dotCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 1.0,
      speedY: Math.random() * 0.5 + 0.25,
      alpha: Math.random() * 0.18 + 0.08,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      dots.forEach((d) => {
        d.y -= d.speedY;
        if (d.y < -5) {
          d.y = height + 5;
          d.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 119, 204, ${d.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const whatsappMsg = 'Olá! Quero solicitar atendimento e orçamento do purificador Top Life pelo WhatsApp.';

  return (
    <section id="contato" className="relative py-20 sm:py-24 bg-gradient-to-b from-white via-sky-50/50 to-sky-100/40 text-slate-900 overflow-hidden border-t border-sky-100">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Tagline */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-[#003B66] text-xs font-semibold tracking-wider uppercase mb-5 shadow-xs">
          <Droplet className="w-3.5 h-3.5 text-[#0077CC]" />
          <span>ATENDIMENTO OFICIAL TOP LIFE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-[#002D52] tracking-tight leading-tight max-w-3xl mx-auto">
          Pronto para Transformar a Água da sua Família e Empresa?
        </h2>

        <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-normal">
          Fale diretamente com a equipe Top Life no WhatsApp e tire todas as suas dúvidas sobre modelos, refis e instalação.
        </p>

        {/* Featured Purifier Image (object-contain sem cortes, carregamento imediato) */}
        <div className="relative my-8 max-w-sm mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-sky-100 bg-white p-4 shadow-md flex items-center justify-center h-64">
            <img
              src={featuredModel.image}
              alt="Purificador Top Life"
              loading="eager"
              decoding="sync"
              referrerPolicy="no-referrer"
              className="max-h-full max-w-full object-contain drop-shadow-xs select-none"
            />
          </div>
        </div>

        {/* WhatsApp Button */}
        <div className="relative inline-block">
          <a
            href={createWhatsAppUrl(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playHudClick()}
            className="group relative inline-flex items-center space-x-2.5 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base tracking-wide shadow-md shadow-emerald-950/20 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 fill-white group-hover:rotate-12 transition-transform duration-200" />
            <span>Falar no WhatsApp com um Especialista</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Guarantees Row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Atendimento Rápido</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Orçamento Gratuito</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Garantia Oficial de Fábrica</span>
          </span>
        </div>
      </div>
    </section>
  );
};
