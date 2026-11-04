import React, { useState } from 'react';
import { Droplet, Snowflake, Zap, CheckCircle2, ShieldCheck, MessageCircle, ArrowRight } from 'lucide-react';
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
  features: WaterFeatureDetail[];
}

const WATER_OPTIONS: WaterTypeConfig[] = [
  {
    id: 'alcalina',
    name: 'Água Alcalina',
    shortLabel: 'pH 8,5 a 9,5',
    icon: Droplet,
    tagline: 'Equilíbrio mineral e alcalinização contínua para o dia a dia',
    features: [
      {
        title: 'Faixa de pH Alcalino 8,5 a 9,5',
        badge: 'pH Balanceado',
        description: 'Estabilização do pH que neutraliza a acidez comum da água tratada convencional através de leito mineral natural.',
      },
      {
        title: 'Elemento Mineral Zeolife',
        badge: 'Filtragem Mineral',
        description: 'Mídia filtrante com elemento mineral Zeolife e carvão ativado de casca de coco impregnado com prata coloidal.',
      },
      {
        title: 'Redução Superior a 75% do Cloro',
        badge: 'Pureza Comprovada',
        description: 'Retenção profunda de cloro livre, sabores e odores desagradáveis da rede de abastecimento público.',
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
    name: 'Água Gelada',
    shortLabel: 'Refrigeração R-134a',
    icon: Snowflake,
    tagline: 'Refrigeração de alta potência por compressor para água fria constante',
    features: [
      {
        title: 'Compressor com Gás R-134a',
        badge: 'Compressor Ecológico',
        description: 'Refrigeração mecânica potente e silenciosa com gás ecológico R-134a, garantindo água verdadeiramente gelada.',
      },
      {
        title: 'Vazão Contínua de 45 a 60 L/h',
        badge: 'Alto Rendimento',
        description: 'Capacidade de atendimento constante de 45 a 60 litros por hora para atender toda a família ou equipes em empresas.',
      },
      {
        title: 'Reservatório Interno Vedado',
        badge: 'Vedação Higiênica',
        description: 'Armazenamento seguro em reservatório atóxico livre de bisfenol, protegido contra qualquer contaminação externa.',
      },
      {
        title: 'Baixo Consumo de Energia',
        badge: 'Apenas 2,28 a 4,98 kWh/mês',
        description: 'Alta eficiência energética comprovada em testes de fábrica, com consumo elétrico equivalente a uma pequena lâmpada LED.',
      },
    ],
  },
  {
    id: 'ozonizada',
    name: 'Água Ozonizada',
    shortLabel: 'Ozônio Ativo O₃',
    icon: Zap,
    tagline: 'Poder esterilizante do gás ozônio puro sob demanda no painel',
    features: [
      {
        title: 'Esterilização Ativa por Ozônio O₃',
        badge: 'Gás Natural O₃',
        description: 'Gás ozônio de ação bactericida e oxidante natural, eliminando microrganismos de forma rápida e segura.',
      },
      {
        title: 'Concentração Média de 0,25 mg/L',
        badge: 'Dosagem Controlada',
        description: 'Concentração padronizada e segura que age com alta eficácia sem produzir resíduos químicos secundários.',
      },
      {
        title: 'Higienização de Frutas e Alimentos',
        badge: 'Uso Culinário',
        description: 'Ideal para lavar saladas, frutas, verduras e carnes, auxiliando na remoção de impurezas e resíduos superficiais.',
      },
      {
        title: 'Acionamento Prático Sob Demanda',
        badge: 'Controle no Painel',
        description: 'Sistema ativado por botão independente que gera a água ozonizada instantaneamente quando você necessitar.',
      },
    ],
  },
];

export const WaterCharacteristicsSection: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<WaterOption>('alcalina');

  const activeConfig = WATER_OPTIONS.find((opt) => opt.id === selectedOption) || WATER_OPTIONS[0];

  const handleSelect = (option: WaterOption) => {
    soundManager.playHudClick();
    setSelectedOption(option);
  };

  const whatsappMsg = `Olá! Gostaria de tirar dúvidas sobre os purificadores Top Life com foco em ${activeConfig.name}. Poderiam me orientar?`;

  return (
    <section
      id="caracteristicas-agua"
      className="relative py-12 sm:py-16 bg-[#F4F9FD] text-slate-900 overflow-hidden border-b border-sky-100"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho compacto da seção */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-sky-200 text-[#003B66] text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
            <Droplet className="w-3.5 h-3.5 text-[#0077CC]" />
            <span>ESPECIFICAÇÕES TÉCNICAS DA ÁGUA</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#002D52] tracking-tight">
            Características da Água Top Life
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Selecione uma das 3 opções abaixo para conferir as 4 características técnicas comprovadas.
          </p>
        </div>

        {/* 3 OPÇÕES PRINCIPAIS DE SELEÇÃO: ÁGUA ALCALINA, ÁGUA GELADA, ÁGUA OZONIZADA */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
          {WATER_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedOption === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`flex items-center space-x-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-xs ${
                  isSelected
                    ? 'bg-[#003B66] text-white shadow-md shadow-[#003B66]/20 scale-105 border border-[#0077CC]'
                    : 'bg-white text-slate-700 border border-sky-200 hover:bg-sky-50/60 hover:border-sky-300'
                }`}
                aria-pressed={isSelected}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#0077CC]'}`} />
                <span>{opt.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold hidden sm:inline ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-sky-100 text-[#003B66]'
                  }`}
                >
                  {opt.shortLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tagline informativa da opção selecionada */}
        <div className="text-center mb-6">
          <p className="text-xs sm:text-sm font-semibold text-[#005B9A] italic">
            "{activeConfig.tagline}"
          </p>
        </div>

        {/* AS 4 CARACTERÍSTICAS DA OPÇÃO SELECIONADA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {activeConfig.features.map((feat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-sky-100 shadow-xs hover:border-[#0077CC] hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-100 text-[#003B66] flex items-center justify-center font-black text-xs">
                    0{idx + 1}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#003B66] bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-extrabold text-[#002D52] mb-2 leading-snug">
                  {feat.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center space-x-1.5 text-emerald-600 text-[11px] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Especificação Confirmada</span>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé da seção: Chamada rápida de WhatsApp */}
        <div className="mt-8 pt-6 border-t border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-slate-600 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-[#0077CC] shrink-0" />
            <span>Todas as especificações técnicas seguem os padrões de qualidade e documentação Top Life.</span>
          </div>

          <a
            href={createWhatsAppUrl(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playHudClick()}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-sm hover:shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Consultar Modelos com {activeConfig.name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
