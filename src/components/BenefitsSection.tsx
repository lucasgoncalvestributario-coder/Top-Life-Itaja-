import React from 'react';
import { Droplet, TrendingUp, ShieldCheck, Zap, Wrench, Headphones } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface BenefitCard {
  id: string;
  icon: React.FC<{ className?: string }>;
  title: string;
  desc: string;
  metric: string;
  metricLabel: string;
}

export const BENEFITS_LIST: BenefitCard[] = [
  {
    id: 'agua-pura',
    icon: Droplet,
    title: 'Água Pura e Cristalina',
    desc: 'Filtragem de alta precisão que reduz o cloro livre em mais de 75%, eliminando sabores e odores indesejados.',
    metric: '>75%',
    metricLabel: 'Redução de Cloro Livre',
  },
  {
    id: 'economia',
    icon: TrendingUp,
    title: 'Economia Comprovada',
    desc: 'Elimine os custos e o esforço de carregar e estocar galões plásticos. Água pura diretamente no seu ponto de uso.',
    metric: '3.000 L',
    metricLabel: 'Rendimento por Refil',
  },
  {
    id: 'saude',
    icon: ShieldCheck,
    title: 'pH Alcalino Balanceado',
    desc: 'Água com pH estabilizado entre 8,5 e 9,5 através de leito mineral Zeolife para maior equilíbrio diário.',
    metric: 'pH 8,5–9,5',
    metricLabel: 'Alcalinidade Otimizada',
  },
  {
    id: 'ozonio-tech',
    icon: Zap,
    title: 'Tecnologia com Ozônio O₃',
    desc: 'Opção de ozonização ativa para esterilização e higienização profunda de alimentos e vegetais sob demanda.',
    metric: '0,25 mg/L',
    metricLabel: 'Ozônio Ativo Seguro',
  },
  {
    id: 'instalacao-rapida',
    icon: Wrench,
    title: 'Instalação Prática',
    desc: 'Conexões universais de engate rápido padrão Inmetro para bancadas ou parede com total vedação.',
    metric: 'Engate Rápido',
    metricLabel: 'Padrão Antivazamento',
  },
  {
    id: 'atendimento-especializado',
    icon: Headphones,
    title: 'Suporte & Peças Originais',
    desc: 'Garantia de fábrica e fornecimento contínuo de refis oficiais de reposição para todas as linhas Top Life.',
    metric: '12 Meses',
    metricLabel: 'Garantia de Fábrica',
  },
];

export const BenefitsSection: React.FC = () => {
  return (
    <section id="beneficios" className="relative py-16 sm:py-24 bg-[#F4F9FD] text-slate-900 overflow-hidden border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200 text-[#003B66] text-xs font-semibold tracking-wider uppercase mb-3 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0077CC]" />
            <span>VANTAGENS COMPROVADAS TOP LIFE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#002D52] tracking-tight">
            Por que Escolher a Top Life?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Qualidade construtiva, refrigeração por compressor e filtragem avançada para sua casa ou empresa.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BENEFITS_LIST.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onMouseEnter={() => soundManager.playHudClick()}
                className="group relative p-6 sm:p-7 rounded-3xl bg-white border border-sky-100 hover:border-[#0077CC] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-200 p-2.5 flex items-center justify-center text-[#003B66] group-hover:scale-105 transition-transform duration-200">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-[#002D52] group-hover:text-[#0077CC] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    {item.metricLabel}
                  </span>
                  <span className="text-base sm:text-lg font-black text-[#005B9A]">
                    {item.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
