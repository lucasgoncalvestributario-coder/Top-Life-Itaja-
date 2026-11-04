import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Shield, Droplet, ArrowRight, Check } from 'lucide-react';
import { PURIFIER_MODELS, createWhatsAppUrl } from '../data/purifiers';
import { soundManager } from '../utils/soundEffects';

interface WaterParticle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  drift: number;
  phase: number;
  alpha: number;
}

export const HeroWidescreenBillboard: React.FC = () => {
  // Flagship featured models for the main hero showcase
  const featuredModels = PURIFIER_MODELS.filter((m) =>
    ['blue-he-oxi', 'platinum-compact', 'new-he-oxi', 'he-oxi-mg-h2', 'he-oxi-k'].includes(m.id)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedColorImg, setSelectedColorImg] = useState<string | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  const activeModel = featuredModels[currentIndex] || featuredModels[0];

  // Pre-instantiate images in memory so switching slides or colors happens instantaneously
  useEffect(() => {
    featuredModels.forEach((m) => {
      const img = new Image();
      img.src = m.image;
      if (m.colors) {
        m.colors.forEach((c) => {
          if (c.image) {
            const cImg = new Image();
            cImg.src = c.image;
          }
        });
      }
    });
  }, [featuredModels]);

  // Reset selected color image when active slide changes
  useEffect(() => {
    setSelectedColorImg(null);
  }, [currentIndex]);

  // Auto-advance slider every 6 seconds
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredModels.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay, featuredModels.length]);

  // High performance, continuous delicate water particles animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const heroSection = heroRef.current;
    if (!canvas || !heroSection) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = (canvas.width = heroSection.offsetWidth);
    let height = (canvas.height = heroSection.offsetHeight);

    const handleResize = () => {
      if (!canvas || !heroSection) return;
      width = canvas.width = heroSection.offsetWidth;
      height = canvas.height = heroSection.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 40;
    const particles: WaterParticle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 1.0,
      speedY: Math.random() * 0.8 + 0.35,
      drift: (Math.random() - 0.5) * 0.25,
      phase: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.22 + 0.1,
    }));

    let time = 0;
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !prefersReducedMotion) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(heroSection);

    const render = () => {
      if (!isVisible) return;
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.y -= p.speedY;
          p.x += Math.sin(time + p.phase) * 0.3 + p.drift;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 119, 204, ${p.alpha})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleNext = () => {
    soundManager.playHudClick();
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % featuredModels.length);
  };

  const handlePrev = () => {
    soundManager.playHudClick();
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + featuredModels.length) % featuredModels.length);
  };

  const handleSelectSlide = (idx: number) => {
    soundManager.playHudClick();
    setIsAutoPlay(false);
    setCurrentIndex(idx);
  };

  const currentDisplayImage = selectedColorImg || activeModel.image;
  const whatsappMsg = `Olá! Gostaria de saber mais sobre o ${activeModel.name}. Poderiam me informar a disponibilidade e o preço?`;

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[90vh] pt-32 pb-16 sm:pb-20 flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#EBF5FB] via-white to-slate-50 text-slate-900 select-none border-b border-sky-100"
    >
      {/* Background Interactive Delicate Water Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header Tagline & Brand Callout */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-[#003B66] text-xs font-semibold tracking-wider uppercase mb-3 shadow-xs">
            <Droplet className="w-3.5 h-3.5 text-[#0077CC]" />
            <span>PURIFICAÇÃO DE ALTA PERFORMANCE TOP LIFE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#002D52] max-w-4xl mx-auto leading-tight">
            Água Pura, Alcalina e Ozonizada com Tecnologia Oficial Top Life
          </h1>
          <p className="mt-3 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-normal">
            Purificadores refrigerados por compressor, retenção profunda de cloro e impurezas e enriquecimento mineral para sua saúde.
          </p>
        </div>

        {/* ELEGANT BILLBOARD CARD EM AZUL E BRANCO */}
        <div className="relative mx-auto max-w-5xl">
          <div className="relative rounded-3xl bg-white shadow-xl shadow-[#003B66]/10 border border-sky-100 p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
              
              {/* Left Column: Model Info & Actions */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                {/* Model Category Badge */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-100 text-[#003B66] border border-sky-200">
                    {activeModel.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
                    <Shield className="w-3.5 h-3.5 text-[#0077CC]" />
                    <span>PADRÃO CERTIFICADO DE FÁBRICA</span>
                  </span>
                </div>

                {/* Model Title */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002D52] tracking-tight">
                  {activeModel.name}
                </h2>

                <p className="text-[#005B9A] text-xs sm:text-sm font-semibold italic">
                  "{activeModel.tagline}"
                </p>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  {activeModel.description}
                </p>

                {/* Color Variant Selector if model has colors */}
                {activeModel.colors && activeModel.colors.length > 0 && (
                  <div className="pt-1">
                    <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Cores Disponíveis:
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {activeModel.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => {
                            soundManager.playHudClick();
                            if (c.image) setSelectedColorImg(c.image);
                          }}
                          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            (selectedColorImg === c.image || (!selectedColorImg && activeModel.colors![0].name === c.name))
                              ? 'bg-sky-50 border-[#0077CC] text-[#003B66] shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Feature Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeModel.features.slice(0, 4).map((ft, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-sky-50/70 border border-sky-100 text-xs font-medium text-slate-700"
                    >
                      <Check className="w-3.5 h-3.5 text-[#0077CC] shrink-0" />
                      <span>{ft}</span>
                    </div>
                  ))}
                </div>

                {/* Price & Contact Action */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 border-t border-slate-100">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {activeModel.priceConfirmed ? 'Preço de Venda Confirmado' : 'Valor'}
                    </span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl sm:text-3xl font-black text-[#002D52]">
                        {activeModel.price}
                      </span>
                      {activeModel.priceConfirmed && (
                        <span className="text-xs text-[#0077CC] font-bold">À vista</span>
                      )}
                    </div>
                    {activeModel.installment && (
                      <span className="block text-xs text-slate-500 font-medium">
                        ou {activeModel.installment}
                      </span>
                    )}
                  </div>

                  {/* WhatsApp CTA Button */}
                  <a
                    href={createWhatsAppUrl(whatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playHudClick()}
                    className="group relative inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-emerald-950/20 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white group-hover:rotate-12 transition-transform duration-200" />
                    <span>Falar no WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Right Column: High Quality Product Photo - Exibição Imediata Sem Delays */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative group w-full max-w-sm rounded-2xl overflow-hidden border border-sky-100 bg-[#F4F9FD] p-4 shadow-sm flex items-center justify-center min-h-[300px]">
                  <img
                    key={currentDisplayImage}
                    src={currentDisplayImage}
                    alt={`Purificador ${activeModel.name}`}
                    loading="eager"
                    decoding="sync"
                    fetchPriority="high"
                    referrerPolicy="no-referrer"
                    className="max-h-72 w-auto object-contain rounded-xl select-none drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Floating Specs Pill */}
                  {activeModel.specs.pH && (
                    <div className="absolute bottom-3 left-3 right-3 p-2 rounded-xl bg-white/95 border border-sky-100 text-[11px] font-semibold text-slate-800 flex items-center justify-between shadow-xs">
                      <span className="text-[#003B66]">pH: {activeModel.specs.pH}</span>
                      <span className="text-[#0077CC]">Vazão: {activeModel.specs.capacity}</span>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Left / Right Navigation Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white border border-sky-200 text-slate-700 hover:text-[#0077CC] hover:border-[#0077CC] transition-all z-20 cursor-pointer shadow-md"
              aria-label="Modelo anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white border border-sky-200 text-slate-700 hover:text-[#0077CC] hover:border-[#0077CC] transition-all z-20 cursor-pointer shadow-md"
              aria-label="Próximo modelo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Bottom Slider Control Bar */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {featuredModels.map((model, idx) => (
                  <button
                    key={model.id}
                    onClick={() => handleSelectSlide(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      currentIndex === idx
                        ? 'bg-[#003B66] text-white font-bold shadow-xs'
                        : 'bg-white text-slate-600 hover:text-[#005B9A] border border-slate-200 hover:border-sky-300'
                    }`}
                  >
                    {model.name}
                  </button>
                ))}
              </div>

              {/* Progress Dots */}
              <div className="flex items-center space-x-1.5">
                {featuredModels.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                      currentIndex === idx ? 'w-6 bg-[#0077CC]' : 'w-2 bg-slate-200'
                    }`}
                    aria-label={`Ir para modelo ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
