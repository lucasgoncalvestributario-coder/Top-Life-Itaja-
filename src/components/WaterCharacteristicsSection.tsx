import React, { useState } from 'react';
import { Droplet, Snowflake, Zap, CheckCircle2, ShieldCheck, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { createWhatsAppUrl } from '../data/purifiers';

type WaterOption = 'alcalina' | 'gelada' | 'ozonizada';

interface WaterFeatureDetail {
  title: string;
  badge: string;
  description: string;
}

interface WaterTypeConfig {
  id: WaterOption;
  name: string;
  shortLabel: string;
  icon: React.FC<{ className?: string }>;
  tagline: string;
  badgeColor: string;
  glowColor: string;
  gradient: string;
  features: WaterFeatureDetail[];
}

const WATER_OPTIONS: WaterTypeConfig[] = [
  {
    id: 'alcalina',
    name: 'Água Alcalina Ionizada',
    shortLabel: 'pH 8,5 a 9,5',
    icon: Droplet,
    tagline: 'Equilíbrio mineral e alcalinização contínua para o organismo',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
    glowColor: 'rgba(0, 240, 255, 0.4)',
    gradient: 'from-cyan-500/20 via-sky-500/10 to-transparent',
    features: [
      {
        title: 'Faixa de pH Alcalino 8,5 a 9,5',
        badge: 'pH Balanceado',
        description: 'Estabilização contínua do pH que neutraliza a acidez comum da água tratada convencional através de leito mineral natural.',
      },
      {
        title: 'Elemento Mineral Zeolife',
        badge: 'Filtragem Mineral',
        description: 'Mídia filtrante com elemento mineral Zeolife e carvão ativado vegetal impregnado com prata coloidal.',
      },
      {
        title: 'Redução Superior a 75% do Cloro',
        badge: 'Pureza Comprovada',
        description: 'Retenção profunda de cloro livre, sabores químicos e odores desagradáveis da rede de abastecimento público.',
      },
      {
        title: 'Retenção de Partículas Classe D',
        badge: 'Classe D (15–30 µm)',
        description: 'Barreira física de alta precisão que retém micropartículas sólidas, sedimentos e ferrugem entre 15 e 30 micra.',
      },
    ],
  },
  {
    id: 'gelada',
    name: 'Água Gelada por Compressor',
    shortLabel: 'Refrigeração R-134a',
    icon: Snowflake,
    tagline: 'Refrigeração de alta potência ecológica para água fria ininterrupta',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    glowColor: 'rgba(0, 229, 163, 0.4)',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    features: [
      {
        title: 'Compressor Silencioso com Gás R-134a',
        badge: 'Ecológico & Eficiente',
        description: 'Garante água na temperatura ideal com baixo consumo de energia elétrica e sem agredir a camada de ozônio.',
      },
      {
        title: 'Vazão Contínua de até 45 L/h',
        badge: 'Alto Fluxo',
        description: 'Atende com eficiência residências de famílias numerosas, escritórios, consultórios e estabelecimentos comerciais.',
      },
      {
        title: 'Reservatório Interno Higiênico',
        badge: 'Proteção Total',
        description: 'Tanque vedado que impede contaminação externa, mantendo a temperatura fria preservada por longos períodos.',
      },
      {
        title: 'Termostato de Ajuste de Temperatura',
        badge: 'Controle Térmico',
        description: 'Permite regular a intensidade de resfriamento de acordo com a preferência pessoal e a estação do ano.',
      },
    ],
  },
  {
    id: 'ozonizada',
    name: 'Água Ozonizada (O₃)',
    shortLabel: 'Gás Ozônio Puro',
    icon: Zap,
    tagline: 'Higienização e esterilização profunda com tecnologia de oxigênio ativo',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
    glowColor: 'rgba(192, 132, 252, 0.4)',
    gradient: 'from-purple-500/20 via-fuchsia-500/10 to-transparent',
    features: [
      {
        title: 'Concentração Controlada de 0,25 mg/L',
        badge: 'Dose Segura',
        description: 'Potente ação germicida e bactericida gerada sob demanda através de descarga de alta frequência no fluxo de água.',
      },
      {
        title: 'Higienização Profunda de Alimentos',
        badge: 'Esterilização',
        description: 'Ideal para lavar frutas, verduras e legumes, auxiliando na redução de agrotóxicos e eliminando até 99,9% das bactérias.',
      },
      {
        title: 'Esterilização de Utensílios e Mamadeiras',
        badge: 'Segurança Familiar',
        description: 'Ação rápida na desinfecção de chupetas, mamadeiras, escovas e utensílios culinários sem deixar qualquer resíduo químico.',
      },
      {
        title: 'Degradação Natural em Oxigênio Puro',
        badge: '100% Limpo',
        description: 'Após agir na água, o ozônio se reconverte naturalmente em oxigênio puro (O₂), não deixando compostos residuais.',
      },
    ],
  },
];

export const WaterCharacteristicsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<WaterOption>('alcalina');

  const currentOption = WATER_OPTIONS.find((opt) => opt.id === activeTab) || WATER_OPTIONS[0];

  const handleTabChange = (optId: WaterOption) => {
    soundManager.playWaterRipple();
    setActiveTab(optId);
  };

  const whatsappMsg = `Olá! Gostaria de tirar dúvidas sobre os purificadores com ${currentOption.name}. Poderiam me atender?`;

  return (
    <section
      id="caracteristicas-agua"
      className="relative py-20 sm:py-28 bg-[#000814] text-white overflow-hidden border-b border-white/10"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-purple-500/10 border border-white/15 text-cyan-300 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-mono mb-3 backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>PROPRIEDADES & BENEFÍCIOS PARA A SAÚDE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            Três Dimensões da Água Top Life
          </h2>
          <p className="mt-3 text-slate-300 text-xs sm:text-sm md:text-base font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Água alcalina com minerais essenciais, refrigeração contínua por compressor e esterilização profunda com ozônio ativo.
          </p>
        </div>

        {/* Tab Selector Buttons with Colorful Themes */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14 sm:mb-16">
          {WATER_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = activeTab === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleTabChange(opt.id)}
                className={`flex items-center space-x-3 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-500 text-[#000a17] font-bold shadow-[0_0_30px_rgba(0,240,255,0.5)] scale-105'
                    : 'bg-white/[0.04] text-slate-300 border border-white/10 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#000a17]' : 'text-cyan-400'}`} />
                <span>{opt.name}</span>
                <span className={`text-[10px] font-mono ${isSelected ? 'text-[#000a17]/80' : 'text-slate-400'}`}>
                  ({opt.shortLabel})
                </span>
              </button>
            );
          })}
        </div>

        {/* Feature Cards Grid for Active Water Option */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {currentOption.features.map((feat, idx) => (
            <div
              key={idx}
              className={`group p-6 sm:p-8 rounded-3xl bg-gradient-to-b ${currentOption.gradient} to-[#001026]/90 border border-white/10 hover:border-cyan-400/50 backdrop-blur-2xl shadow-xl transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-xl border text-[10px] font-mono uppercase tracking-wider font-semibold ${currentOption.badgeColor}`}>
                  {feat.badge}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  0{idx + 1}
                </span>
              </div>

              <h3 className="text-xl font-light text-white tracking-tight mb-2.5">
                {feat.title}
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Banner with WhatsApp Consultation */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#00142e] to-[#001838] border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-xl shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-13 h-13 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center shrink-0 text-cyan-300 shadow-[0_0_20px_rgba(0,210,255,0.3)]">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-light text-white">
                Qual tecnologia de purificação melhor atende sua rotina?
              </h4>
              <p className="text-xs text-slate-300 font-light mt-0.5">
                Nossos consultores tiram suas dúvidas sobre pH alcalino, ozônio culinário e modelos de compressor.
              </p>
            </div>
          </div>

          <a
            href={createWhatsAppUrl(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playHudClick()}
            className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/40 transition-all shrink-0 border border-white/20"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Falar com Especialista</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
