import React from 'react';
import { Droplet, TrendingUp, ShieldCheck, Zap, Wrench, Headphones, Award, Sparkles } from 'lucide-react';

interface BenefitCard {
  id: string;
  icon: React.FC<{ className?: string }>;
  title: string;
  desc: string;
  metric: string;
  metricLabel: string;
  gradient: string;
  glow: string;
  iconColor: string;
}

export const BENEFITS_LIST: BenefitCard[] = [
  {
    id: 'agua-pura',
    icon: Droplet,
    title: 'Água Pura e Cristalina',
    desc: 'Filtragem de alta precisão que reduz o cloro livre em mais de 75%, eliminando sabores e odores desagradáveis da rede pública.',
    metric: '>75%',
    metricLabel: 'Redução de Cloro Livre',
    gradient: 'from-cyan-500/15 via-sky-500/10 to-transparent',
    glow: 'rgba(0, 240, 255, 0.3)',
    iconColor: 'text-cyan-400',
  },
  {
    id: 'economia',
    icon: TrendingUp,
    title: 'Economia Comprovada',
    desc: 'Elimine os custos recorrentes e o esforço de transportar galões plásticos pesados. Água pura diretamente no seu ponto de uso.',
    metric: '3.000 L',
    metricLabel: 'Rendimento por Refil',
    gradient: 'from-amber-500/15 via-orange-500/10 to-transparent',
    glow: 'rgba(251, 191, 36, 0.3)',
    iconColor: 'text-amber-400',
  },
  {
    id: 'saude',
    icon: ShieldCheck,
    title: 'pH Alcalino Balanceado',
    desc: 'Água com pH estabilizado entre 8,5 e 9,5 através de leito mineral Zeolife para maior equilíbrio orgânico diário.',
    metric: 'pH 8,5–9,5',
    metricLabel: 'Alcalinidade Otimizada',
    gradient: 'from-emerald-500/15 via-teal-500/10 to-transparent',
    glow: 'rgba(0, 229, 163, 0.3)',
    iconColor: 'text-emerald-400',
  },
  {
    id: 'ozonio-tech',
    icon: Zap,
    title: 'Tecnologia com Ozônio O₃',
    desc: 'Opção de ozonização ativa para esterilização e higienização profunda de alimentos e vegetais sob demanda.',
    metric: '0,25 mg/L',
    metricLabel: 'Ozônio Ativo Seguro',
    gradient: 'from-purple-500/15 via-fuchsia-500/10 to-transparent',
    glow: 'rgba(192, 132, 252, 0.3)',
    iconColor: 'text-purple-400',
  },
  {
    id: 'instalacao-rapida',
    icon: Wrench,
    title: 'Instalação Ágil e Segura',
    desc: 'Conexões universais de engate rápido antivazamento com vedação de grau técnico para bancadas ou parede.',
    metric: 'Engate Rápido',
    metricLabel: 'Padrão Antivazamento',
    gradient: 'from-blue-500/15 via-indigo-500/10 to-transparent',
    glow: 'rgba(59, 130, 246, 0.3)',
    iconColor: 'text-blue-400',
  },
  {
    id: 'atendimento-especializado',
    icon: Headphones,
    title: 'Suporte & Peças Originais',
    desc: 'Garantia oficial de fábrica e fornecimento contínuo de refis originais de reposição para todas as linhas Top Life.',
    metric: '12 Meses',
    metricLabel: 'Garantia de Fábrica',
    gradient: 'from-rose-500/15 via-pink-500/10 to-transparent',
    glow: 'rgba(244, 63, 94, 0.3)',
    iconColor: 'text-rose-400',
  },
];

export const BenefitsSection: React.FC = () => {
  return (
    <section
      id="beneficios"
      className="relative py-20 sm:py-28 bg-[#000a18] text-white overflow-hidden border-b border-white/10"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10 border border-white/15 text-emerald-300 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-mono mb-3 backdrop-blur-xl">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>VANTAGENS EXCLUSIVAS & PROCEDÊNCIA</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            Excelência Comprovada em Cada Detalhe
          </h2>
          <p className="mt-3 text-slate-300 text-xs sm:text-sm md:text-base font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Desenvolvido para oferecer máxima retenção de cloro, saúde celular para toda a família e durabilidade prolongada.
          </p>
        </div>

        {/* Benefits Grid with Colorful Glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BENEFITS_LIST.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.id}
                className={`group relative p-7 sm:p-8 rounded-3xl bg-gradient-to-b ${benefit.gradient} to-[#001026]/90 border border-white/10 hover:border-cyan-400/50 backdrop-blur-2xl shadow-xl transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-white/[0.05] border border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                      <Icon className={`w-6 h-6 ${benefit.iconColor}`} />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-light text-white tracking-tight mb-2.5 group-hover:text-cyan-300 transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-baseline justify-between">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
                    {benefit.metricLabel}
                  </span>
                  <span className={`text-base sm:text-lg font-mono font-bold ${benefit.iconColor}`}>
                    {benefit.metric}
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
