import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Wind, Snowflake, TrendingUp, Cpu, Droplet, ArrowRight, MessageCircle } from 'lucide-react';
import { SMART_TECHNOLOGIES } from '../data/technologies';
import { SmartTechnology } from '../types';
import { soundManager } from '../utils/soundEffects';
import { createWhatsAppUrl } from '../data/purifiers';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  ShieldCheck,
  Sparkles,
  Wind,
  Snowflake,
  TrendingUp,
  Cpu,
};

const TECH_THEMES: Record<string, { gradient: string; glow: string; text: string; border: string }> = {
  'filtragem-avancada': {
    gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
    glow: 'rgba(0, 229, 163, 0.4)',
    text: 'text-emerald-400',
    border: 'border-emerald-400/50',
  },
  'agua-alcalina': {
    gradient: 'from-cyan-500/20 via-sky-500/20 to-blue-500/20',
    glow: 'rgba(0, 240, 255, 0.4)',
    text: 'text-cyan-300',
    border: 'border-cyan-400/50',
  },
  'ozonio': {
    gradient: 'from-purple-500/20 via-fuchsia-500/20 to-pink-500/20',
    glow: 'rgba(192, 132, 252, 0.4)',
    text: 'text-purple-300',
    border: 'border-purple-400/50',
  },
  'refrigeracao': {
    gradient: 'from-sky-500/20 via-cyan-500/20 to-indigo-500/20',
    glow: 'rgba(56, 189, 248, 0.4)',
    text: 'text-sky-300',
    border: 'border-sky-400/50',
  },
  'economia': {
    gradient: 'from-amber-500/20 via-orange-500/20 to-yellow-500/20',
    glow: 'rgba(251, 191, 36, 0.4)',
    text: 'text-amber-300',
    border: 'border-amber-400/50',
  },
  'durabilidade': {
    gradient: 'from-rose-500/20 via-pink-500/20 to-purple-500/20',
    glow: 'rgba(244, 63, 94, 0.4)',
    text: 'text-rose-300',
    border: 'border-rose-400/50',
  },
};

export const SmartTechInteractive: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<SmartTechnology>(SMART_TECHNOLOGIES[0]);
  const [hoveredTech, setHoveredTech] = useState<SmartTechnology | null>(null);

  const activeTech = hoveredTech || selectedTech;
  const currentTheme = TECH_THEMES[activeTech.id] || TECH_THEMES['filtragem-avancada'];

  const handleTechClick = (tech: SmartTechnology) => {
    soundManager.playLaserScan();
    setSelectedTech(tech);
  };

  const whatsappMsg = `Olá! Gostaria de entender mais sobre a tecnologia de ${activeTech.title} dos purificadores Top Life. Poderiam me explicar?`;

  return (
    <section
      id="tecnologias"
      className="relative py-20 sm:py-28 bg-[#000a18] text-white overflow-hidden border-b border-white/10"
    >
      {/* Background ambient radial glow matching active tech */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none blur-3xl transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${currentTheme.glow}, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10 border border-white/15 text-cyan-300 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-mono mb-3 backdrop-blur-xl shadow-lg">
            <Droplet className="w-3.5 h-3.5 text-cyan-400" />
            <span>ENGENHARIA E FILTRAGEM DE PRECISÃO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            Ciência & Eficiência em Cada Gota
          </h2>
          <p className="mt-3 text-slate-300 text-xs sm:text-sm md:text-base font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Selecione os módulos interativos para conhecer os padrões de retenção, alcalinidade, ozonização ativa e refrigeração ecológica.
          </p>
        </div>

        {/* Interactive Radial Display + Technical Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Futuristic Orbital Holographic Core */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
            {/* Spinning Outer Ring */}
            <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full border border-dashed border-white/20 pointer-events-none animate-[spin_90s_linear_infinite]" />
            <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full border border-cyan-400/30 pointer-events-none animate-[spin_60s_linear_infinite_reverse]" />

            {/* Central Glowing Core */}
            <div
              className={`relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-b from-[#001838] to-[#000a17] border ${currentTheme.border} p-6 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(0,210,255,0.3)] transition-all duration-500`}
            >
              <span className="text-[10px] font-mono tracking-widest text-slate-300 uppercase mb-1">
                {activeTech.metricLabel}
              </span>
              <span className={`text-2xl sm:text-3xl font-light tracking-tight ${currentTheme.text}`}>
                {activeTech.metric}
              </span>
              <div className="mt-2 w-12 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              <span className="mt-2 text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                Parâmetro Testado
              </span>
            </div>

            {/* Orbiting Interactive Node Buttons */}
            {SMART_TECHNOLOGIES.map((tech) => {
              const IconComponent = ICON_MAP[tech.iconName] || ShieldCheck;
              const isCurrent = activeTech.id === tech.id;
              const theme = TECH_THEMES[tech.id] || TECH_THEMES['filtragem-avancada'];
              
              // Calculate circular orbit coordinates
              const radius = 160;
              const rad = (tech.angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              return (
                <button
                  key={tech.id}
                  onClick={() => handleTechClick(tech)}
                  onMouseEnter={() => setHoveredTech(tech)}
                  onMouseLeave={() => setHoveredTech(null)}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  className={`absolute z-20 w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? `bg-white text-slate-900 scale-125 shadow-[0_0_25px_rgba(0,240,255,0.9)] border-2 ${theme.border}`
                      : 'bg-[#00142e] text-slate-300 border border-white/15 hover:border-cyan-400 hover:text-white hover:scale-110'
                  }`}
                  title={tech.title}
                  aria-label={tech.title}
                >
                  <IconComponent className="w-5 h-5" />
                </button>
              );
            })}
          </div>

          {/* Right: Technical Dossier Card */}
          <div className="lg:col-span-6 space-y-6">
            <div
              className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-b ${currentTheme.gradient} to-[#000a17]/95 border ${currentTheme.border} backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,10,35,0.7)] transition-all duration-500`}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase block">
                    Módulo em Exibição
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight mt-1">
                    {activeTech.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block">
                    {activeTech.metricLabel}
                  </span>
                  <span className={`text-xl sm:text-2xl font-light font-mono ${currentTheme.text}`}>
                    {activeTech.metric}
                  </span>
                </div>
              </div>

              <p className="text-cyan-200 text-xs sm:text-sm font-medium mb-3">
                {activeTech.subtitle}
              </p>

              <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                {activeTech.description}
              </p>

              {/* Technical Specifications */}
              <div className="space-y-2.5 mb-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-2">
                  Diferenciais Comprovados de Fábrica:
                </span>
                {activeTech.details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-light text-slate-200"
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {/* Consultation Button */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-300 font-light">
                  Dúvidas sobre a instalação deste sistema?
                </div>
                <a
                  href={createWhatsAppUrl(whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playHudClick()}
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-950/40"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Tirar Dúvidas no WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

            {/* Quick module selection buttons list */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SMART_TECHNOLOGIES.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => handleTechClick(tech)}
                  className={`p-3 rounded-2xl text-left text-xs transition-all cursor-pointer border ${
                    activeTech.id === tech.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border-cyan-400 text-white shadow-md'
                      : 'bg-white/[0.03] border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <span className="block font-medium truncate">{tech.title}</span>
                  <span className="block text-[10px] text-cyan-300 font-mono mt-0.5">{tech.metric}</span>
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
