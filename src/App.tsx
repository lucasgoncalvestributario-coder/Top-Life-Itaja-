import React from 'react';
import { Header } from './components/Header';
import { HeroWidescreenBillboard } from './components/HeroWidescreenBillboard';
import { SmartTechInteractive } from './components/SmartTechInteractive';
import { WaterCharacteristicsSection } from './components/WaterCharacteristicsSection';
import { ProductCatalog } from './components/ProductCatalog';
import { BenefitsSection } from './components/BenefitsSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#0077CC] selection:text-white">
      {/* 1. Header Bar em Azul Profundo Oficial com Logotipo Flutuante e Destaque */}
      <Header onNavigate={handleNavigate} />

      {/* 2. Hero Widescreen Showcase com Efeito de Água Delicado e Contínuo */}
      <HeroWidescreenBillboard />

      {/* 3. Seções Principais - Renderização Imediata e Direta Sem Atrasos */}
      {/* Seção – Tecnologias de Filtragem e Engenharia */}
      <SmartTechInteractive />

      {/* Seção – Características da Água (Alcalina, Gelada, Ozonizada) */}
      <WaterCharacteristicsSection />

      {/* Seção – Catálogo Completo Top Life (16 Produtos / 9 Categorias) */}
      <ProductCatalog />

      {/* Seção – Vantagens e Benefícios Comprovados */}
      <BenefitsSection />

      {/* Seção – CTA Final de Atendimento */}
      <FinalCtaSection />

      {/* Rodapé Oficial em Azul Noturno com Logotipo Livre e Destaque */}
      <Footer />

      {/* Botão Flutuante de WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
