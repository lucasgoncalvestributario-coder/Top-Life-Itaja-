import React, { useState } from 'react';
import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { MainBannerHero } from './components/MainBannerHero';
import { BrandTicker } from './components/BrandTicker';
import { ActivatedCarbonSection } from './components/ActivatedCarbonSection';
import { BacteriologicalEfficiencySection } from './components/BacteriologicalEfficiencySection';
import { ProductCatalog } from './components/ProductCatalog';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#001830] text-slate-100 font-sans selection:bg-[#0077CC] selection:text-white">
      {/* 1. Preloader Screen: Logo Oficial + Barra de Progresso Fina + Pré-carregamento Real de Imagens */}
      {!isReady && <Preloader onLoaded={() => setIsReady(true)} />}

      {/* 2. Header Oficial: Acabamento em Resina Branca com Veios Fluidos Azuis e Pretos */}
      <Header onNavigate={handleNavigate} />

      {/* 3. Banner Principal: 2 Colunas (Esquerda: Tipografia TOP LIFE com Iluminação em Luz; Direita: Quadrado 1:1 com Carrossel de Fotos) */}
      <MainBannerHero />

      {/* 4. Faixa de Slogans em Movimento Contínuo com Mini Logo Top Life */}
      <BrandTicker />

      {/* 5. Destaque Especial: Carvão Ativado Direto com Fotografia Real e Botão Único */}
      <ActivatedCarbonSection />

      {/* 6. Destaque Especial: Eficiência Bacteriológica (Visual Tecnológico Escuro) & Comparação Cinematográfica */}
      <BacteriologicalEfficiencySection />

      {/* 7. Catálogo: Purificadores | Refis | Garrafas (Cards Compactos, Cores Estáticas Não Clicáveis e Botão Falar com Especialista) */}
      <ProductCatalog />

      {/* 8. CTA Final: "A qualidade da água começa com a escolha certa" sem Fotos e Foco Tipográfico */}
      <FinalCtaSection />

      {/* 9. Rodapé Oficial Completo */}
      <Footer />

      {/* 10. Botão Flutuante de WhatsApp Oficial */}
      <FloatingWhatsApp />
    </div>
  );
}
