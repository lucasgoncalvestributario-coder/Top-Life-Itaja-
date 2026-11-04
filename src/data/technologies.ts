import { SmartTechnology } from '../types';

export const SMART_TECHNOLOGIES: SmartTechnology[] = [
  {
    id: 'filtragem-avancada',
    title: 'Filtragem Avançada',
    subtitle: 'Retenção Profunda de Cloro e Impurezas',
    description: 'Sistema com carvão ativado vegetal impregnado com prata coloidal e elemento Zeolife. Retém partículas sólidas, reduz o cloro livre em mais de 75% e elimina sabores estranhos.',
    iconName: 'ShieldCheck',
    angle: 0,
    metric: '>75%',
    metricLabel: 'Redução de Cloro Livre',
    details: [
      'Carvão ativado de casca de coco com prata coloidal',
      'Elemento mineral Zeolife de alta retenção',
      'Retenção de partículas Classe D (15–30 micra)'
    ]
  },
  {
    id: 'agua-alcalina',
    title: 'Água Alcalina',
    subtitle: 'Estabilização de pH 8,5 a 9,5',
    description: 'Eleva e estabiliza o pH da água entre 8,5 e 9,5 através de leito mineral natural, proporcionando uma água equilibrada e com baixíssimo teor de sódio.',
    iconName: 'Sparkles',
    angle: 60,
    metric: 'pH 8,5–9,5',
    metricLabel: 'Faixa de pH Equilibrado',
    details: [
      'Estabilização mineral natural contínua',
      'Compatível com consumo diário familiar',
      'Leito enriquecedor de minerais essenciais'
    ]
  },
  {
    id: 'ozonio',
    title: 'Ozônio Ativo (O₃)',
    subtitle: 'Higienização e Esterilização Sob Demanda',
    description: 'Sistema gerador de gás ozônio (O₃) puro com concentração aproximada de 0,25 mg/L. Ideal para higienização profunda de frutas, vegetais e utensílios culinários.',
    iconName: 'Wind',
    angle: 120,
    metric: '0,25 mg/L',
    metricLabel: 'Concentração de Ozônio O₃',
    details: [
      'Eliminação eficiente de bactérias em alimentos',
      'Degradação rápida sem deixar resíduo químico',
      'Acionamento instantâneo independente no painel'
    ]
  },
  {
    id: 'refrigeracao',
    title: 'Refrigeração R-134a',
    subtitle: 'Compressor Ecológico e Alto Rendimento',
    description: 'Refrigeração de alto desempenho com compressor silencioso e gás ecológico R-134a, fornecendo água fria e refrescante em vazão contínua.',
    iconName: 'Snowflake',
    angle: 180,
    metric: '45 L/h',
    metricLabel: 'Vazão Contínua',
    details: [
      'Gás refrigerante ecológico R-134a',
      'Reservatório interno higiênico e vedado',
      'Temperatura controlada e refrescante'
    ]
  },
  {
    id: 'economia',
    title: 'Economia Diária',
    subtitle: 'Sustentabilidade e Menor Custo',
    description: 'Elimine os custos recorrentes e o incômodo da compra, transporte e armazenamento de galões plásticos, gerando economia expressiva para sua casa ou empresa.',
    iconName: 'TrendingUp',
    angle: 240,
    metric: '3.000 L',
    metricLabel: 'Capacidade do Refil',
    details: [
      'Equivale a até 150 galões de 20 litros',
      'Baixo consumo elétrico mensal',
      'Menos descarte de embalagens plásticas'
    ]
  },
  {
    id: 'durabilidade',
    title: 'Qualidade Construtiva',
    subtitle: 'Materiais Certificados e Alta Resistência',
    description: 'Gabinete reforçado em polímero técnico e aço inox/Kromanox com conexões seguras de engate rápido e certificação nos padrões Inmetro.',
    iconName: 'Cpu',
    angle: 300,
    metric: '12 Meses',
    metricLabel: 'Garantia de Fábrica',
    details: [
      'Componentes atóxicos livres de BPA',
      'Conexões seguras de engate rápido',
      'Assistência técnica e refis de reposição originais'
    ]
  }
];
