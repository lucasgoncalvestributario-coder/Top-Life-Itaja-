import { PurifierModel, ProductCategory } from '../types';

export const PHONE_NUMBER = '5511999998888';

export const createWhatsAppUrl = (message: string) => {
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const createProductWhatsAppUrl = (productName: string) => {
  return createWhatsAppUrl(
    `Olá! Gostaria de saber mais sobre o ${productName}. Poderiam me informar a disponibilidade e o preço?`
  );
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'Todos os produtos',
  'Purificadores',
  'Purificadores premium',
  'Purificadores compactos e slim',
  'Purificadores residenciais',
  'Purificadores empresariais e acessíveis',
  'Refis para purificadores',
  'Garrafas e squeezes',
  'Cápsulas e refis para garrafas',
];

export const PURIFIER_MODELS: PurifierModel[] = [
  // PRODUTO 01 — BLUE HE OXI
  {
    id: 'blue-he-oxi',
    name: 'Blue HE OXI',
    category: 'Purificador com alcalinização e ozônio',
    categories: [
      'Todos os produtos',
      'Purificadores',
      'Purificadores compactos e slim',
      'Purificadores residenciais',
    ],
    tagline: 'Água alcalina ionizada com ozônio em design compacto e alta eficiência',
    description:
      'Purificador de água alcalina ionizada com ozônio. Modelo compacto, com filtragem avançada e função de ozonização para água natural pura e ozonizada sob demanda. Redução comprovada de cloro livre, impurezas e odores.',
    priceConfirmed: true,
    price: 'R$ 949,00',
    installment: '12x de R$ 87,50 sem juros',
    image: '/images/products/Whats-App-Image-2026-10-12-at-11-05-51.jpg',
    images: [
      '/images/products/Whats-App-Image-2026-10-12-at-11-05-51.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-11-05-38.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-11-05-22.jpg',
    ],
    features: [
      'Alcalinização da água com pH 8,5 a 9,5',
      'Função de ozonização ativa sob demanda',
      'Redução de cloro livre, impurezas e odores',
      'Uso versátil: residencial e comercial',
    ],
    specs: {
      pH: '8,5 – 9,5 (conforme água de entrada)',
      capacity: '45 L/h (vazão máxima)',
      warranty: '12 meses de garantia de fábrica',
      filtration: '3.000 litros ou 12 meses',
      dimensions: '21,2 × 27 × 20 cm',
      weight: '2 kg',
      voltage: '127 V',
      pressure: '0,029 – 0,039 MPa',
      protection: 'IPX0',
    },
    highlightColor: '#009EEB',
  },

  // PRODUTO 02 — TOP LIFE PLATINUM COMPACT
  {
    id: 'platinum-compact',
    name: 'Top Life Platinum Compact',
    category: 'Purificador compacto refrigerado',
    categories: [
      'Todos os produtos',
      'Purificadores',
      'Purificadores compactos e slim',
      'Purificadores residenciais',
    ],
    tagline: 'Refrigeração potente por compressor em formato compacto para sua cozinha ou escritório',
    description:
      'Purificador refrigerado por compressor com gás ecológico R-134a, destinado a residências e escritórios, com fornecimento contínuo de água natural e fria. Reservatório interno de 1,24 L e alta retenção de partículas.',
    priceConfirmed: true,
    price: 'R$ 1.650,00',
    installment: '12x de R$ 152,00 sem juros',
    image: '/images/products/Whats-App-Image-2026-10-12-at-11-10-54.jpg',
    images: [
      '/images/products/Whats-App-Image-2026-10-12-at-11-10-54.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-11-10-29.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-11-13-40.jpg',
    ],
    colors: [
      {
        name: 'Branco',
        hex: '#FFFFFF',
        image: '/images/products/Whats-App-Image-2026-10-12-at-11-10-54.jpg',
      },
      {
        name: 'Preto',
        hex: '#1E293B',
        image: '/images/products/Whats-App-Image-2026-10-12-at-11-10-29.jpg',
      },
      {
        name: 'Prata / Cinza',
        hex: '#94A3B8',
        image: '/images/products/Whats-App-Image-2026-10-12-at-11-13-40.jpg',
      },
    ],
    features: [
      'Compressor de alto rendimento com gás R-134a',
      'Fornecimento de água natural e gelada',
      'Reservatório interno higiênico de 1,24 L',
      'Retenção de partículas Classe D (15–30 micra)',
    ],
    specs: {
      cooling: 'Compressor R-134a (0,8 L/h)',
      reservoir: '1,24 L',
      capacity: '45 L/h',
      warranty: '12 meses de garantia de fábrica',
      filtration: '3.000 litros ou 12 meses',
      dimensions: '30,5 × 26,5 × 40 cm',
      weight: '11,67 kg',
      power: '100 W',
      voltage: '127 V ou 220 V (conforme versão)',
      consumption: 'Aprox. 4,77 kWh/mês (220V) / 4,98 kWh/mês (127V)',
      pressure: '3 – 40 m.c.a.',
      retention: 'Classe D (15–30 micra)',
    },
    highlightColor: '#0284C7',
  },

  // PRODUTO 03 — TOP LIFE NEW HE OXI
  {
    id: 'new-he-oxi',
    name: 'Top Life New HE OXI',
    category: 'Purificador refrigerado com alcalinização e ozônio',
    categories: [
      'Todos os produtos',
      'Purificadores',
      'Purificadores premium',
      'Purificadores residenciais',
    ],
    tagline: 'Água natural, fria e misturada com alcalinização e ozonização integrada',
    description:
      'Purificador refrigerado com sistema avançado de alcalinização/ionização e função de ozonização ativa. Equipado com compressor R-134a, filtragem com Zeolife e carvão ativado com prata coloidal.',
    priceConfirmed: false,
    price: 'Consulte o preço',
    image: '/images/products/Whats-App-Image-2026-10-12-at-11-16-51.jpg',
    images: [
      '/images/products/Whats-App-Image-2026-10-12-at-11-16-51.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-11-16-35.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-11-16-25.jpg',
    ],
    colors: [
      {
        name: 'Branco',
        hex: '#FFFFFF',
        image: '/images/products/Whats-App-Image-2026-10-12-at-11-16-51.jpg',
      },
      {
        name: 'Prata',
        hex: '#CBD5E1',
        image: '/images/products/Whats-App-Image-2026-10-12-at-11-16-35.jpg',
      },
      {
        name: 'Preto',
        hex: '#0F172A',
        image: '/images/products/Whats-App-Image-2026-10-12-at-11-16-25.jpg',
      },
      {
        name: 'Vermelho',
        hex: '#DC2626',
      },
    ],
    features: [
      'Água natural, fria e misturada com regulagem',
      'Função de ozonização sob demanda (aprox. 0,25 mg/L)',
      'Alcalinização e ionização com pH 8,5 a 9,5',
      'Filtragem com elemento Zeolife e prata coloidal',
    ],
    specs: {
      pH: '8,5 – 9,5',
      ozoneConcentration: 'Aprox. 0,25 mg/L',
      reservoir: 'Aprox. 2,4 L',
      capacity: '45 L/h',
      cooling: 'Compressor R-134a',
      warranty: '12 meses de garantia de fábrica',
      filtration: '3.000 litros ou 12 meses',
      dimensions: '29 × 38,6 × 39,4 cm',
      weight: 'Aprox. 12 kg',
      power: '100 W',
      voltage: '127 V ou 220 V (conforme versão)',
      consumption: 'Aprox. 3,90 kWh/mês',
      pressure: '0,5 – 4 bar',
      retention: 'Classe D (15–30 micra)',
    },
    highlightColor: '#009EEB',
  },

  // PRODUTO 04 — TOP LIFE HE OXI Mg+ H₂
  {
    id: 'he-oxi-mg-h2',
    name: 'Top Life HE OXI Mg+ H₂',
    category: 'Purificador premium mineralizado',
    categories: [
      'Todos os produtos',
      'Purificadores',
      'Purificadores premium',
      'Purificadores residenciais',
    ],
    tagline: 'Purificação de alta tecnologia com enriquecimento de Magnésio e Hidrogênio molecular',
    description:
      'Purificador refrigerado topo de linha da Top Life com enriquecimento mineral de magnésio (Mg+) e hidrogênio molecular. Fornece água natural e fria, ozonização ativa e alta capacidade de refrigeração de 2,4 L/h.',
    priceConfirmed: false,
    price: 'Consulte o preço',
    image: '/images/products/Whats-App-Image-2026-10-12-at-11-22-20.jpg',
    images: [
      '/images/products/Whats-App-Image-2026-10-12-at-11-22-20.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-11-22-09.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-11-21-59.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-11-21-49.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-11-21-34.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-11-21-21.jpg',
    ],
    colors: [
      {
        name: 'Branco',
        hex: '#FFFFFF',
        image: '/images/products/Whats-App-Image-2026-10-12-at-11-22-20.jpg',
      },
      {
        name: 'Prata',
        hex: '#CBD5E1',
        image: '/images/products/Whats-App-Image-2026-10-12-at-11-22-09.jpg',
      },
      {
        name: 'Preto',
        hex: '#0F172A',
        image: '/images/products/Whats-App-Image-2026-10-12-at-11-21-59.jpg',
      },
      {
        name: 'Vermelho',
        hex: '#DC2626',
        image: '/images/products/Whats-App-Image-2026-10-12-at-11-21-49.jpg',
      },
    ],
    features: [
      'Enriquecimento mineral exclusivo com Magnésio (Mg+)',
      'Hidrogênio molecular com pH alcalino 8,3 a 9,5',
      'Ozonização sob demanda com concentração de 0,25 mg/L',
      'Alta refrigeração por compressor R-134a (2,4 L/h)',
    ],
    specs: {
      pH: '8,3 – 9,5',
      ozoneConcentration: 'Aprox. 0,25 mg/L',
      cooling: 'Compressor R-134a (2,4 L/h)',
      capacity: '45 L/h',
      warranty: '12 meses de garantia de fábrica',
      filtration: '3.000 litros ou 12 meses',
      dimensions: '29 × 38,6 × 39,4 cm',
      weight: 'Aprox. 11 – 12 kg',
      power: '100 W',
      voltage: '127 V ou 220 V (conforme versão)',
      consumption: '2,28 kWh/mês (220V) / 2,31 kWh/mês (127V)',
      pressure: '0,049 – 0,39 MPa',
      retention: 'Classe D (15–30 micra)',
    },
    highlightColor: '#0284C7',
  },

  // PRODUTO 05 — TOP LIFE HE OXI K+ / NEW HE OXI K+
  {
    id: 'he-oxi-k',
    name: 'Top Life HE OXI K+ / New HE OXI K+',
    category: 'Purificador premium com potássio',
    categories: [
      'Todos os produtos',
      'Purificadores',
      'Purificadores premium',
      'Purificadores residenciais',
    ],
    tagline: 'Mineralização enriquecida com Potássio (K+), refrigeração eficiente e ozônio',
    description:
      'Purificador refrigerado por compressor R-134a com mineralização por esferas de potássio K+. Fornece água natural e fria, ozonização ativa e faixa de pH 8,5 a 9,5.',
    priceConfirmed: false,
    price: 'Consulte o preço',
    image: '/images/products/Whats-App-Image-2026-10-12-at-11-35-59.jpg',
    images: [
      '/images/products/Whats-App-Image-2026-10-12-at-11-35-59.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-11-35-58-1.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-11-35-58.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-11-35-57.jpg',
    ],
    colors: [
      {
        name: 'Branco',
        hex: '#FFFFFF',
        image: '/images/products/Whats-App-Image-2026-10-12-at-11-35-59.jpg',
      },
      {
        name: 'Prata',
        hex: '#CBD5E1',
        image: '/images/products/Whats-App-Image-2026-10-12-at-11-35-58-1.jpg',
      },
      {
        name: 'Preto',
        hex: '#0F172A',
        image: '/images/products/Whats-App-Image-2026-10-12-at-11-35-58.jpg',
      },
      {
        name: 'Vermelho',
        hex: '#DC2626',
        image: '/images/products/Whats-App-Image-2026-10-12-at-11-35-57.jpg',
      },
    ],
    features: [
      'Enriquecimento mineralizado com Potássio K+',
      'Água natural e fria refrigerada por compressor',
      'Sistema de ozonização O3 ativa',
      'Faixa de pH alcalino equilibrado 8,5 a 9,5',
    ],
    specs: {
      pH: '8,5 – 9,5',
      ozoneConcentration: 'Aprox. 0,25 mg/L',
      cooling: 'Compressor R-134a (2,4 L/h)',
      capacity: '45 L/h',
      warranty: '12 meses de garantia de fábrica',
      filtration: '3.000 litros ou 12 meses',
      dimensions: '29 × 38,6 × 39,4 cm',
      weight: 'Aprox. 12 kg',
      power: '100 W',
      voltage: '127 V ou 220 V (conforme versão)',
      consumption: '3,90 kWh/mês (127V) / 2,28 kWh/mês (220V)',
      pressure: '0,049 – 0,39 MPa',
      retention: 'Classe D (15–30 micra)',
    },
    highlightColor: '#0284C7',
  },

  // PRODUTO 06 — TOP LIFE TOP 40 CONJUGADO ACESSÍVEL
  {
    id: 'top-40-conjugado',
    name: 'Top Life TOP 40 Conjugado Acessível',
    category: 'Purificador empresarial e acessível',
    categories: [
      'Todos os produtos',
      'Purificadores',
      'Purificadores empresariais e acessíveis',
    ],
    tagline: 'Bebedouro de coluna em aço inox com duas alturas, acessível para cadeirantes',
    description:
      'Bebedouro/purificador de coluna com duas alturas de utilização em aço inox/Kromanox. Possui bico ergonômico acessível para cadeirantes e pessoas de diferentes estaturas. Indicado para empresas, clínicas e escolas de até 60 pessoas.',
    priceConfirmed: false,
    price: 'Consulte o preço',
    image: '/images/products/Whats-App-Image-2026-10-12-at-11-38-02.jpg',
    images: ['/images/products/Whats-App-Image-2026-10-12-at-11-38-02.jpg'],
    features: [
      'Duas torneiras tipo jato em alturas diferentes',
      'Acessibilidade garantida para cadeirantes',
      'Construção reforçada em aço inox / Kromanox',
      'Capacidade de refrigeração de 4 L/h para até 60 pessoas',
    ],
    specs: {
      cooling: 'Compressor R-134a (4 L/h)',
      reservoir: '2 L',
      capacity: '60 L/h',
      warranty: '12 meses de garantia corporativa',
      filtration: '3.000 litros ou 12 meses',
      dimensions: '69 × 101 × 32 cm',
      weight: 'Aprox. 22 kg',
      power: '100 W',
      voltage: '127 V ou 220 V (conforme versão)',
      pressure: '3 – 40 m.c.a.',
      protection: 'IPX4 (uso interno / externo protegido)',
      retention: 'Classe D (15–30 micra)',
    },
    highlightColor: '#0284C7',
  },

  // PRODUTO 07 — TOP LIFE TOP 40 SIMPLES / NÃO CONJUGADO
  {
    id: 'top-40-simples',
    name: 'Top Life TOP 40 Simples',
    category: 'Purificador empresarial',
    categories: [
      'Todos os produtos',
      'Purificadores',
      'Purificadores empresariais e acessíveis',
    ],
    tagline: 'Coluna simples em aço inox para alto fluxo em empresas, academias e indústrias',
    description:
      'Bebedouro/purificador de coluna simples para uso comercial e industrial de médio fluxo. Construído em aço inox/Kromanox com compressor ecológico R-134a e duas torneiras (jato e enchedor de copos/garrafas).',
    priceConfirmed: false,
    price: 'Consulte o preço',
    image: '/images/products/Whats-App-Image-2026-10-12-at-11-41-23-1.jpg',
    images: ['/images/products/Whats-App-Image-2026-10-12-at-11-41-23-1.jpg'],
    features: [
      'Duas torneiras: uma tipo jato e outra para copos e garrafas',
      'Estrutura durável em aço inox / Kromanox',
      'Dimensionado para atendimento de até 60 pessoas',
      'Refrigeração contínua por compressor R-134a',
    ],
    specs: {
      cooling: 'Compressor R-134a (4 L/h)',
      reservoir: '2 L',
      capacity: '60 L/h',
      warranty: '12 meses de garantia corporativa',
      filtration: '3.000 litros ou 12 meses',
      dimensions: '34,5 × 101 × 32 cm',
      weight: 'Aprox. 16 kg',
      power: '100 W',
      voltage: '127 V ou 220 V (conforme versão)',
      pressure: '3 – 40 m.c.a.',
      protection: 'IPX4',
      retention: 'Classe D (15–30 micra)',
    },
    highlightColor: '#0284C7',
  },

  // PRODUTO 08 — REFIL ALCALINO COM OZÔNIO TOP LIFE
  {
    id: 'refil-alcalino-ozonio',
    name: 'Refil Alcalino com Ozônio Top Life',
    category: 'Refil para purificadores',
    categories: ['Todos os produtos', 'Refis para purificadores'],
    tagline: 'Elemento filtrante oficial com Zeolife e carvão ativado com prata coloidal',
    description:
      'Refil de reposição oficial compatível com os modelos New HE OXI, Blue HE OXI, Platinum OXI e linha OXI. Realiza retenção de partículas, alcalinização e redução de cloro para água 100% pronta para ozonização.',
    priceConfirmed: false,
    price: 'Consulte o preço',
    image: '/images/products/Whats-App-Image-2026-10-12-at-11-43-40.jpg',
    images: ['/images/products/Whats-App-Image-2026-10-12-at-11-43-40.jpg'],
    compatibility: 'New HE OXI, Blue HE OXI, Platinum OXI e modelos da linha OXI',
    features: [
      'Mídias filtrantes: carvão com prata coloidal e elemento mineral Zeolife',
      'Faixa de pH alcalino balanceado de 8,5 a 9,5',
      'Filtragem profunda de sedimentos, odores e sabores',
      'Preparação otimizada da água para o processo de ozonização',
    ],
    specs: {
      filtration: '3.000 litros ou 12 meses',
      pH: '8,5 – 9,5',
      warranty: 'Garantia original Top Life',
      capacity: '45 L/h',
    },
    highlightColor: '#009EEB',
  },

  // PRODUTO 09 — LINHA DE REFIS MINERALIZADOS ESPECIAIS
  {
    id: 'linha-refis-mineralizados',
    name: 'Linha de Refis Mineralizados Especiais (Mg+ / H₂ / K+)',
    category: 'Refis premium',
    categories: ['Todos os produtos', 'Refis para purificadores'],
    tagline: 'Versões especiais com mineralização específica: Magnésio, Hidrogênio ou Potássio',
    description:
      'Família de refis especiais com enriquecimento mineral específico por versão: Mg+ (magnésio), H2 / Mg+ H2 (hidrogênio molecular) e K+ (potássio). Compatíveis com a linha HE OXI correspondente.',
    priceConfirmed: false,
    price: 'Consulte o preço',
    image: '/images/products/Whats-App-Image-2026-10-12-at-11-44-31.jpg',
    images: ['/images/products/Whats-App-Image-2026-10-12-at-11-44-31.jpg'],
    compatibility: 'HE OXI Mg+, HE OXI H2 e HE OXI K+ (conforme versão selecionada)',
    features: [
      'Versão Mg+: enriquecimento ativo com magnésio',
      'Versão H2: tecnologia com hidrogênio molecular',
      'Versão K+: esferas mineralizadoras de potássio',
      'Vida útil de 3.000 litros ou 12 meses de uso',
    ],
    specs: {
      filtration: '3.000 litros ou 12 meses',
      warranty: 'Garantia original Top Life',
      capacity: '45 L/h',
    },
    highlightColor: '#0284C7',
  },

  // PRODUTO 10 — REFIL ALCALINO IONIZADO K+ TOP LIFE
  {
    id: 'refil-alcalino-k',
    name: 'Refil Alcalino Ionizado K+ Top Life',
    category: 'Refil para purificadores',
    categories: ['Todos os produtos', 'Refis para purificadores'],
    tagline: 'Refil bacteriológico com esfera mineralizadora de potássio K+',
    description:
      'Refil bacteriológico com carvão ativado de casca de coco com prata coloidal, Zeolife e esfera de potássio K+. Redução de cloro superior a 75%, retenção de partículas classe D e pH alcalino balanceado.',
    priceConfirmed: false,
    price: 'Consulte o preço',
    image: '/images/products/Whats-App-Image-2026-10-12-at-11-56-09-2.jpg',
    images: [
      '/images/products/Whats-App-Image-2026-10-12-at-11-56-09-2.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-11-56-09-1.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-11-56-09.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-11-56-08.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-11-54-41.jpg',
    ],
    features: [
      'Carvão ativado de casca de coco com prata coloidal',
      'Zeolife mineral e esfera de potássio K+',
      'Redução de cloro livre superior a 75%',
      'Retenção de partículas Classe D (15–30 micra)',
    ],
    specs: {
      filtration: '3.000 litros ou 12 meses',
      capacity: '45 – 60 L/h (vazão recomendada)',
      pressure: '0,5 – 4 bar',
      pH: '8,3 – 9,5',
      retention: 'Classe D (15–30 micra)',
    },
    highlightColor: '#0284C7',
  },

  // PRODUTO 11 — GARRAFA SQUEEZE ALCALINA E IONIZADA TOP LIFE
  {
    id: 'garrafa-squeeze-alcalina',
    name: 'Garrafa Squeeze Alcalina e Ionizada Top Life',
    category: 'Garrafas e squeezes',
    categories: ['Todos os produtos', 'Garrafas e squeezes'],
    tagline: 'Hidratação alcalina portátil em qualquer lugar, livre de BPA com tampa com trava',
    description:
      'Squeeze portátil de alta durabilidade com cápsula mineralizadora interna em polímero livre de BPA. Alcaliniza e ioniza a água em 5 a 15 minutos em qualquer lugar com pH de 8,5 a 9,5.',
    priceConfirmed: true,
    price: 'R$ 249,90',
    installment: '3x de R$ 83,30 sem juros',
    image: '/images/products/Whats-App-Image-2026-10-12-at-11-56-09-1.jpg',
    images: [
      '/images/products/Whats-App-Image-2026-10-12-at-11-56-09-1.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-11-56-09.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-11-56-08.jpg',
    ],
    colors: [
      { name: 'Preto', hex: '#0F172A' },
      { name: 'Azul', hex: '#0284C7' },
      { name: 'Rosa', hex: '#EC4899' },
      { name: 'Prata / Inox', hex: '#E2E8F0' },
      { name: 'Vermelho', hex: '#DC2626' },
    ],
    features: [
      'Capacidade de 650 a 700 ml em polímero livre de BPA',
      'Cápsula mineralizadora interna alcalina (pH 8,5–9,5)',
      'Ação rápida: água alcalinizada em 5 a 15 minutos',
      'Tampa com trava de segurança e anel de silicone antivazamento',
    ],
    specs: {
      capacity: '650 – 700 ml',
      filtration: 'Cápsula interna: 6 a 12 meses (aprox. 500–800 recargas)',
      pH: '8,5 – 9,5',
      dimensions: '7,5 cm diâmetro × 24 cm altura',
      weight: 'Aprox. 180 g (vazia)',
      warranty: 'Garantia de fábrica Top Life',
    },
    highlightColor: '#009EEB',
  },

  // PRODUTO 12 — REFIL/CÁPSULA PARA GARRAFA ALCALINA TOP LIFE
  {
    id: 'refil-capsula-garrafa-alcalina',
    name: 'Refil / Cápsula para Garrafa Alcalina Top Life',
    category: 'Cápsulas e refis para garrafas',
    categories: ['Todos os produtos', 'Cápsulas e refis para garrafas'],
    tagline: 'Cápsula de reposição original com turmalina negra e esferas alcalinizantes',
    description:
      'Cartucho perfurado em aço inox ou polímero com esferas minerais, turmalina negra e elementos alcalinizantes. Compatível com garrafas e squeezes alcalinos Top Life de 600 a 750 ml.',
    priceConfirmed: false,
    price: 'Consulte o preço',
    image: '/images/products/Whats-App-Image-2026-10-12-at-11-57-27.jpg',
    images: ['/images/products/Whats-App-Image-2026-10-12-at-11-57-27.jpg'],
    compatibility: 'Garrafas e squeezes alcalinos Top Life de 600 a 750 ml',
    features: [
      'Composição: turmalina negra, magnésio e esferas alcalinizantes',
      'Vida útil estimada de 6 a 12 meses (aprox. 600 a 800 recargas)',
      'Tempo de contato rápido: 5 a 15 minutos',
      'Estrutura perfurada de alta vazão',
    ],
    specs: {
      dimensions: '2 cm diâmetro × 8 cm altura',
      weight: 'Aprox. 45 g',
      filtration: '6 – 12 meses (600–800 recargas)',
    },
    highlightColor: '#009EEB',
  },

  // PRODUTO 13 — GARRAFA ALCALINA PORTÁTIL COM MAGNÉSIO TOP LIFE
  {
    id: 'garrafa-alcalina-magnesio',
    name: 'Garrafa Alcalina Portátil com Magnésio Top Life',
    category: 'Garrafas e squeezes',
    categories: ['Todos os produtos', 'Garrafas e squeezes'],
    tagline: 'Enriquecimento com Magnésio por cápsula interna em squeeze de 650 ml livre de BPA',
    description:
      'Garrafa squeeze de 650 ml livre de BPA com mineralização de magnésio por cápsula interna. Tampa com trava e anel de silicone para transporte seguro e prático na rotina diária.',
    priceConfirmed: false,
    price: 'Consulte o preço',
    image: '/images/products/Whats-App-Image-2026-10-12-at-12-01-49-2.jpg',
    images: [
      '/images/products/Whats-App-Image-2026-10-12-at-12-01-49-2.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-12-01-50-1.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-12-01-50.jpg',
    ],
    features: [
      'Mineralização enriquecida com Magnésio por cápsula',
      'Capacidade de 650 ml em polímero livre de BPA',
      'Faixa de pH alcalino de 8,5 a 9,5 em 5 a 10 minutos',
      'Tampa com trava e anel de silicone estanque',
    ],
    specs: {
      capacity: '650 ml',
      filtration: 'Cápsula interna: 6 a 12 meses (600–800 recargas)',
      pH: '8,5 – 9,5',
      warranty: 'Garantia oficial Top Life',
    },
    highlightColor: '#0284C7',
  },

  // PRODUTO 14 — REFIL/CÁPSULA DE MAGNÉSIO PARA GARRAFA TOP LIFE
  {
    id: 'refil-capsula-magnesio',
    name: 'Refil / Cápsula de Magnésio para Garrafa Top Life',
    category: 'Cápsulas e refis para garrafas',
    categories: ['Todos os produtos', 'Cápsulas e refis para garrafas'],
    tagline: 'Cápsula de reposição com esferas minerais de magnésio para squeeze Top Life',
    description:
      'Cápsula mineralizadora interna com esferas minerais de magnésio, cerâmicas alcalinizantes e turmalina. Compatível com garrafas e squeezes Top Life de 650 ml.',
    priceConfirmed: false,
    price: 'Consulte o preço',
    image: '/images/products/Whats-App-Image-2026-10-12-at-12-01-49-1.jpg',
    images: [
      '/images/products/Whats-App-Image-2026-10-12-at-12-01-49-1.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-12-01-49.jpg',
    ],
    compatibility: 'Garrafas e squeezes Top Life de 650 ml',
    features: [
      'Esferas minerais de magnésio e cerâmicas alcalinizantes',
      'Vida útil estimada de 6 a 12 meses (600–800 recargas)',
      'Tempo de contato: 5 a 10 minutos',
      'Dimensões compactas: 2 × 8 cm',
    ],
    specs: {
      dimensions: '2 cm diâmetro × 8 cm altura',
      weight: 'Aprox. 50 g',
      filtration: '6 – 12 meses (600–800 recargas)',
    },
    highlightColor: '#0284C7',
  },

  // PRODUTO 15 — GARRAFA SQUEEZE ALCALINA COM POTÁSSIO K+ TOP LIFE
  {
    id: 'garrafa-squeeze-potassio',
    name: 'Garrafa Squeeze Alcalina com Potássio K+ Top Life',
    category: 'Garrafas e squeezes',
    categories: ['Todos os produtos', 'Garrafas e squeezes'],
    tagline: 'Garrafa squeeze de 650 ml com cápsula mineralizadora de potássio K+',
    description:
      'Garrafa squeeze de 650 ml livre de BPA com mineralização de potássio por cápsula interna. Faixa de pH anunciada de 8,5 a 9,5 com preparo rápido em 5 a 10 minutos.',
    priceConfirmed: false,
    price: 'Consulte o preço',
    image: '/images/products/Whats-App-Image-2026-10-12-at-12-03-46-1.jpg',
    images: [
      '/images/products/Whats-App-Image-2026-10-12-at-12-03-46-1.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-12-03-46.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-12-03-45.jpg',
    ],
    colors: [
      { name: 'Preto', hex: '#0F172A' },
      { name: 'Azul', hex: '#0284C7' },
      { name: 'Vermelho', hex: '#DC2626' },
      { name: 'Prata / Transparente', hex: '#E2E8F0' },
    ],
    features: [
      'Mineralização enriquecida com Potássio (K+)',
      'Capacidade de 650 ml em polímero livre de BPA',
      'Faixa de pH alcalino 8,5 a 9,5',
      'Design esportivo com pegada anatômica',
    ],
    specs: {
      capacity: '650 ml',
      dimensions: '7,5 cm diâmetro × 24 cm altura',
      weight: 'Aprox. 180 g (vazia)',
      filtration: 'Cápsula: 6 a 12 meses (600–800 recargas)',
      pH: '8,5 – 9,5',
    },
    highlightColor: '#0284C7',
  },

  // PRODUTO 16 — REFIL/CÁPSULA DE POTÁSSIO K+ PARA GARRAFA TOP LIFE
  {
    id: 'refil-capsula-potassio',
    name: 'Refil / Cápsula de Potássio K+ para Garrafa Top Life',
    category: 'Cápsulas e refis para garrafas',
    categories: ['Todos os produtos', 'Cápsulas e refis para garrafas'],
    tagline: 'Cápsula de reposição com esferas minerais de potássio K+ e turmalina negra',
    description:
      'Cápsula interna de reposição com esferas minerais de potássio, esferas cerâmicas e turmalina negra. Compatível com garrafas e squeezes alcalinos Top Life de 650 ml.',
    priceConfirmed: false,
    price: 'Consulte o preço',
    image: '/images/products/Whats-App-Image-2026-10-12-at-12-05-50-1.jpg',
    images: [
      '/images/products/Whats-App-Image-2026-10-12-at-12-05-50-1.jpg',
      '/images/products/Whats-App-Image-2026-10-12-at-12-05-50.jpg',
    ],
    compatibility: 'Garrafas e squeezes alcalinos Top Life de 650 ml',
    features: [
      'Esferas minerais de potássio K+ e turmalina negra',
      'Vida útil estimada de 6 a 12 meses (600 a 800 recargas)',
      'Tempo de contato: 5 a 10 minutos',
      'Substituição prática sem necessidade de ferramentas',
    ],
    specs: {
      dimensions: '2 cm diâmetro × 8 cm altura',
      weight: 'Aprox. 50 g',
      filtration: '6 – 12 meses (600–800 recargas)',
    },
    highlightColor: '#0284C7',
  },
];
