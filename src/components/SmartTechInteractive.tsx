import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Wind, Snowflake, TrendingUp, Cpu, ChevronRight, Droplet, MessageCircle } from 'lucide-react';
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

export const SmartTechInteractive: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<SmartTechnology>(SMART_TECHNOLOGIES[0]);
  const [hoveredTech, setHoveredTech] = useState<SmartTechnology | null>(null);

  const activeTech = hoveredTech || selectedTech;

  const handleTechClick = (tech: SmartTechnology) => {
    soundManager.playLaserScan();
    setSelectedTech(tech);
  };

  const whatsappMsg = `Olá! Gostaria de entender mais sobre a tecnologia de ${activeTech.title} dos purificadores Top Life. Poderiam me explicar?`;

  return (
    <section id="tecnologias" className="relative py-16 sm:py-20 bg-white text-slate-900 overflow-hidden border-b border-sky-100">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-[#003B66] text-xs font-semibold tracking-wider uppercase mb-3 shadow-xs">
            <Droplet className="w-3.5 h-3.5 text-[#0077CC]" />
            <span>ENGENHARIA E FILTRAGEM TOP LIFE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#002D52]">
            Tecnologias de Purificação de Alto Rendimento
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Clique nos módulos do sistema para explorar as tecnologias de filtragem, alcalinização e refrigeração.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Interactive Core Circle */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[420px] sm:min-h-[480px]">
            {/* Outer Subtle Rotating Ring */}
            <div
              className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border border-dashed border-sky-200 pointer-events-none"
            />
            
            {/* Secondary Ring */}
            <div
              className="absolute w-[250px] h-[250px] sm:w-[340px] sm:h-[340px] rounded-full border border-sky-100 pointer-events-none"
            />

            {/* Central Core */}
            <div className="relative z-20 w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-[#009EEB] via-[#005B9A] to-[#003B66] border-2 border-white p-3 shadow-xl shadow-[#003B66]/20 flex flex-col items-center justify-center text-center">
              <div className="relative z-10 space-y-1">
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-sky-200 uppercase block">
                  TOP LIFE TECH
                </span>
                <span className="text-lg sm:text-xl font-black text-white block drop-shadow-xs">
                  {activeTech.title}
                </span>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] sm:text-[11px] font-semibold text-white">
                  {activeTech.metric}
                </span>
              </div>
            </div>

            {/* 6 Surrounding Module Buttons */}
            {SMART_TECHNOLOGIES.map((tech, idx) => {
              const total = SMART_TECHNOLOGIES.length;
              const angleRad = ((idx * (360 / total) - 90) * Math.PI) / 180;
              const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 135 : 185;
              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;

              const isSelected = selectedTech.id === tech.id;
              const isHovered = hoveredTech?.id === tech.id;
              const Icon = ICON_MAP[tech.iconName] || Droplet;

              return (
                <React.Fragment key={tech.id}>
                  {/* Connecting Line */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" aria-hidden="true">
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`calc(50% + ${x}px)`}
                      y2={`calc(50% + ${y}px)`}
                      stroke={isSelected || isHovered ? '#0077CC' : 'rgba(186, 230, 253, 0.7)'}
                      strokeWidth={isSelected || isHovered ? '2' : '1'}
                      strokeDasharray={isSelected || isHovered ? 'none' : '3 3'}
                    />
                  </svg>

                  {/* Module Button Node */}
                  <button
                    onClick={() => handleTechClick(tech)}
                    onMouseEnter={() => {
                      soundManager.playHudClick();
                      setHoveredTech(tech);
                    }}
                    onMouseLeave={() => setHoveredTech(null)}
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    className={`absolute top-1/2 left-1/2 z-30 p-2.5 sm:p-3 rounded-2xl transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                      isSelected || isHovered
                        ? 'bg-[#003B66] text-white shadow-lg shadow-[#003B66]/25 scale-105 border border-[#0077CC]'
                        : 'bg-white text-slate-700 border border-sky-100 hover:border-sky-300 hover:bg-sky-50/50 shadow-xs'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span className="hidden sm:inline text-xs font-bold tracking-tight whitespace-nowrap">
                      {tech.title}
                    </span>
                  </button>
                </React.Fragment>
              );
            })}
          </div>

          {/* Right HUD Panel */}
          <div className="lg:col-span-5">
            <div
              key={activeTech.id}
              className="relative p-6 sm:p-7 rounded-3xl bg-[#F4F9FD] border border-sky-100 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-sky-100 text-[#003B66] text-xs font-bold border border-sky-200">
                  {activeTech.subtitle}
                </span>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  TECNOLOGIA #{SMART_TECHNOLOGIES.findIndex((t) => t.id === activeTech.id) + 1}
                </span>
              </div>

              <h3 className="text-2xl font-black text-[#002D52]">
                {activeTech.title}
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {activeTech.description}
              </p>

              {/* Details Checklist */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#003B66] block">
                  Especificações Técnicas
                </span>
                {activeTech.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs font-medium text-slate-700">
                    <ChevronRight className="w-3.5 h-3.5 text-[#0077CC] shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {/* Metric Box & Action */}
              <div className="pt-3 p-3.5 rounded-2xl bg-white border border-sky-100 flex items-center justify-between shadow-xs">
                <div>
                  <span className="block text-[10px] font-bold uppercase text-slate-400">
                    {activeTech.metricLabel}
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#005B9A]">
                    {activeTech.metric}
                  </span>
                </div>

                <a
                  href={createWhatsAppUrl(whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playHudClick()}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Tirar Dúvidas</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
