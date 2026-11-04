export type ProductCategory =
  | 'Todos os produtos'
  | 'Purificadores'
  | 'Purificadores premium'
  | 'Purificadores compactos e slim'
  | 'Purificadores residenciais'
  | 'Purificadores empresariais e acessíveis'
  | 'Refis para purificadores'
  | 'Garrafas e squeezes'
  | 'Cápsulas e refis para garrafas';

export interface ProductColorVariant {
  name: string;
  hex: string;
  image?: string;
}

export interface PurifierModel {
  id: string;
  name: string;
  category: string;
  categories: string[];
  tagline: string;
  description: string;
  priceConfirmed: boolean;
  price: string;
  installment?: string;
  image: string;
  images: string[];
  colors?: ProductColorVariant[];
  features: string[];
  specs: {
    pH?: string;
    filtration?: string;
    capacity?: string;
    cooling?: string;
    warranty?: string;
    dimensions?: string;
    weight?: string;
    power?: string;
    voltage?: string;
    consumption?: string;
    pressure?: string;
    reservoir?: string;
    retention?: string;
    ozoneConcentration?: string;
    protection?: string;
  };
  compatibility?: string;
  boxContents?: string;
  highlightColor?: string;
}

export interface SmartTechnology {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  angle: number;
  metric: string;
  metricLabel: string;
  details: string[];
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  statNumber: string;
  statLabel: string;
}
