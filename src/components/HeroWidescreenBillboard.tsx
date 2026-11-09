import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Shield, Droplet, ArrowRight, Check, Sparkles, Activity, Award } from 'lucide-react';
import { PURIFIER_MODELS, createWhatsAppUrl } from '../data/purifiers';
import { soundManager } from '../utils/soundEffects';

export const HeroWidescreenBillboard: React.FC = () => {
  const featuredModels = PURIFIER_MODELS.filter((m) =>
    ['blue-he-oxi', 'platinum-compact', 'new-he-oxi', 'he-oxi-mg-h2', 'he-oxi-k'].includes(m.id)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [simulatedPh, setSimulatedPh] = useState<number>(9.5);

  const activeModel = featuredModels[currentIndex] || featuredModels[0];

  // Auto-advance slider every 7.5 seconds
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredModels.length);
    }, 7500);
    return () => clearInterval(interval);
  }, [isAutoPlay, featuredModels.length]);

  const handleNext = () => {
    soundManager.playWaterRipple();
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % featuredModels.length);
  };

  const handlePrev = () => {
    soundManager.playWaterRipple();
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + featuredModels.length) % featuredModels.length);
  };

  const handleSelectSlide = (idx: number) => {
    soundManager.playWaterDrop();
    setIsAutoPlay(false);
    setCurrentIndex(idx);
  };

  const whatsappMsg = `Olá! Gostaria de saber mais sobre o ${activeModel.name}. Poderiam me informar a disponibilidade e as opções de pagamento?`;

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] pt-32 pb-20 sm:pb-28 flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#000817] via-[#001026] to-[#000a18] text-white select-none border-b border-white/10"
    >
      {/* VIBRANT CHROMATIC AURA SPOTS (COLORFUL LUXURY EFFECT) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.20),transparent_70%)] pointer-events-none blur-3xl animate-pulse" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.18),transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(0,229,163,0.15),transparent_70%)] pointer-events-none blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* EDITORIAL BRAND HEADER WITH COLORFUL ACCENT */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-sky-500/15 to-emerald-500/10 border border-cyan-400/40 text-cyan-300 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-mono mb-4 backdrop-blur-xl shadow-[0_0_20px_rgba(0,240,255,0.25)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>ENGENHARIA DA ÁGUA PURA • TOP LIFE OFICIAL</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Água Alcalina, Ozonizada e Gelada em{' '}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-sky-200 drop-shadow-[0_0_25px_rgba(0,229,163,0.3)]">
              Perfeição Biológica
            </span>
          </h1>

          <p className="mt-4 text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
            Elimine o cloro, regule o pH entre 8,5 e 9,5 com elemento mineral Zeolife e desfrute de refrigeração por compressor de alto rendimento.
          </p>
        </div>

        {/* HERO ARCHITECTURAL SHOWCASE CARD WITH COLORFUL GLASSMORPHISM */}
        <div className="relative mx-auto max-w-6xl">
          <div className="relative rounded-3xl bg-gradient-to-b from-[#00142e]/90 via-[#001026]/90 to-[#000817]/95 border border-cyan-500/30 p-6 sm:p-10 lg:p-12 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,10,35,0.85)]">
            
            {/* Top HUD Status Bar */}
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-8 text-[11px] font-mono tracking-wider gap-3">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-0.5 rounded-md bg-gradient-to-r from-cyan-500/20 to-sky-500/20 border border-cyan-400/40 text-cyan-300 font-bold">
                  MODELO 0{currentIndex + 1}
                </span>
                <span className="text-white/20">/</span>
                <span className="uppercase text-slate-300 font-light">{activeModel.category}</span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1.5 text-emerald-400">
                  <Award className="w-4 h-4" />
                  <span className="hidden sm:inline">12 MESES DE GARANTIA</span>
                </span>
                <span className="flex items-center space-x-1.5 text-cyan-300">
                  <Shield className="w-3.5 h-3.5" />
                  <span>PADRÃO OFICIAL INMETRO</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Product Dossier & Specifications */}
              <div className="lg:col-span-7 space-y-6">
                
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
                    {activeModel.name}
                  </h2>
                  <p className="mt-2 text-cyan-300 text-xs sm:text-sm font-medium italic tracking-wide">
                    "{activeModel.tagline}"
                  </p>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                  {activeModel.description}
                </p>

                {/* PALETA DE CORES INDICATIVA (SOMENTE VISUAL, NÃO CLICÁVEL, SEM TROCA DE IMAGENS) */}
                {activeModel.colors && activeModel.colors.length > 0 && (
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] font-mono tracking-widest text-slate-300 uppercase">
                        Acabamentos de Fábrica Disponíveis:
                      </span>
                      <span className="text-[9px] text-cyan-400 font-mono">
                        Paleta Visual Indicativa
                      </span>
                    </div>
                    {/* Non-clickable swatches palette */}
                    <div className="flex flex-wrap items-center gap-2">
                      {activeModel.colors.map((c) => (
                        <div
                          key={c.name}
                          className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-light text-slate-200 select-none shadow-xs"
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                            style={{ backgroundColor: c.hex }}
                            aria-hidden="true"
                          />
                          <span className="text-[11px] font-medium tracking-wide">{c.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* MINI SIMULADOR COLORIDO DE pH INTERATIVO */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#001838] to-[#00142e] border border-cyan-500/20">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-slate-300 flex items-center space-x-1.5">
                      <Activity className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Simulador Interativo de pH da Água:</span>
                    </span>
                    <span className="text-cyan-300 font-bold">
                      pH {simulatedPh.toFixed(1)} {simulatedPh >= 8.5 ? '• Alcalina Pura Top Life' : '• Água Convencional'}
                    </span>
                  </div>

                  {/* Gradient Spectrum Bar from Acidic Red/Yellow to Alkaline Purple */}
                  <div className="relative h-3 w-full rounded-full bg-gradient-to-r from-amber-500 via-green-400 via-cyan-400 to-purple-500 shadow-inner overflow-hidden mb-2">
                    <div
                      className="absolute top-0 bottom-0 w-3 -ml-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,1)] border border-slate-900 transition-all duration-150"
                      style={{ left: `${((simulatedPh - 6.0) / 4.0) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <button
                      onClick={() => {
                        soundManager.playWaterDrop();
                        setSimulatedPh(6.0);
                      }}
                      className="hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      Água Torneira (pH 6.0)
                    </button>
                    <button
                      onClick={() => {
                        soundManager.playChime();
                        setSimulatedPh(9.5);
                      }}
                      className="text-cyan-300 font-bold hover:text-emerald-300 transition-colors cursor-pointer"
                    >
                      Água Top Life (pH 9.5) ✨
                    </button>
                  </div>
                </div>

                {/* Feature Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {activeModel.features.slice(0, 4).map((ft, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2.5 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-light text-slate-200"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="leading-snug">{ft}</span>
                    </div>
                  ))}
                </div>

                {/* Price & Commercial Action */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-400">
                      {activeModel.priceConfirmed ? 'Preço de Venda Confirmado' : 'Investimento'}
                    </span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl sm:text-4xl font-extralight text-white tracking-tight">
                        {activeModel.price}
                      </span>
                      {activeModel.priceConfirmed && (
                        <span className="text-xs text-emerald-400 font-mono uppercase font-bold tracking-wider">
                          À vista
                        </span>
                      )}
                    </div>
                    {activeModel.installment && (
                      <span className="block text-xs text-cyan-300 font-light mt-0.5">
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
                    className="group relative inline-flex items-center justify-center space-x-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_10px_30px_rgba(0,229,163,0.35)] hover:shadow-[0_12px_35px_rgba(0,240,255,0.5)] transition-all duration-300 transform hover:scale-103 cursor-pointer border border-white/20"
                  >
                    <MessageCircle className="w-5 h-5 fill-white group-hover:rotate-12 transition-transform duration-200" />
                    <span className="font-extrabold uppercase tracking-wider">
                      Solicitar Orçamento
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

              </div>

              {/* Right Column: Studio Spotlight Product Showcase */}
              <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
                
                <div className="relative w-full max-w-sm flex flex-col items-center justify-center p-4">
                  {/* Chromatic Spotlight Ring behind product */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.22),transparent_65%)] pointer-events-none rounded-full blur-xl" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_75%)] pointer-events-none rounded-full blur-2xl" />

                  {/* Official Product Photo */}
                  <img
                    key={activeModel.id}
                    src={activeModel.image}
                    alt={`Purificador Top Life ${activeModel.name}`}
                    loading="eager"
                    decoding="sync"
                    fetchPriority="high"
                    className="relative z-10 max-h-80 sm:max-h-96 w-auto object-contain select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:scale-105"
                  />

                  {/* Luminous reflection base */}
                  <div className="w-52 h-5 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.5),transparent_70%)] blur-md mt-2" />

                  {/* Floating Spec HUD Pills */}
                  <div className="mt-4 w-full grid grid-cols-2 gap-2 text-[10px] font-mono">
                    {activeModel.specs.pH && (
                      <div className="px-3 py-2 rounded-xl bg-white/[0.04] border border-cyan-500/30 text-slate-200 flex items-center justify-between">
                        <span className="text-slate-400">pH:</span>
                        <span className="text-cyan-300 font-bold">{activeModel.specs.pH.split(' ')[0]}</span>
                      </div>
                    )}
                    {activeModel.specs.capacity && (
                      <div className="px-3 py-2 rounded-xl bg-white/[0.04] border border-emerald-500/30 text-slate-200 flex items-center justify-between">
                        <span className="text-slate-400">Vazão:</span>
                        <span className="text-emerald-300 font-bold">{activeModel.specs.capacity.split(' ')[0]} L/h</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-[#001026] border border-cyan-400/40 text-slate-200 hover:text-cyan-300 hover:border-cyan-400 hover:scale-110 transition-all z-20 cursor-pointer shadow-[0_4px_20px_rgba(0,210,255,0.3)] backdrop-blur-xl"
              aria-label="Modelo anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-[#001026] border border-cyan-400/40 text-slate-200 hover:text-cyan-300 hover:border-cyan-400 hover:scale-110 transition-all z-20 cursor-pointer shadow-[0_4px_20px_rgba(0,210,255,0.3)] backdrop-blur-xl"
              aria-label="Próximo modelo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Bottom Slider Control Bar */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {featuredModels.map((model, idx) => (
                  <button
                    key={model.id}
                    onClick={() => handleSelectSlide(idx)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-light tracking-wider transition-all duration-200 cursor-pointer ${
                      currentIndex === idx
                        ? 'bg-gradient-to-r from-cyan-500/30 to-emerald-500/30 text-cyan-200 border border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.35)] font-medium'
                        : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/10 hover:bg-white/[0.06]'
                    }`}
                  >
                    <span className="font-mono text-[10px] text-cyan-400 mr-1.5">0{idx + 1}</span>
                    <span>{model.name}</span>
                  </button>
                ))}
              </div>

              {/* Progress Dots */}
              <div className="flex items-center space-x-1.5">
                {featuredModels.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? 'w-8 bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-[0_0_10px_rgba(0,240,255,0.8)]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
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
