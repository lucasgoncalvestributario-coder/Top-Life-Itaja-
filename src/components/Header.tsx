import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Droplet, Phone, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { createWhatsAppUrl } from '../data/purifiers';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    soundManager.playHudClick();
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  const navItems = [
    { label: 'Início', id: 'hero' },
    { label: 'Carvão Ativado', id: 'carvao-ativado' },
    { label: 'Eficiência Bacteriológica', id: 'eficiencia-bacteriologica' },
    { label: 'Purificadores & Refis', id: 'modelos' },
    { label: 'Contato', id: 'contato' },
  ];

  const defaultWhatsappMsg = 'Olá! Gostaria de falar com um especialista sobre os purificadores de água Top Life.';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'shadow-md shadow-sky-900/10' : ''
      }`}
    >
      {/* 1. PARTE DE CIMA: PRETO COM DETALHES AZUIS */}
      <div
        className={`transition-all duration-300 bg-black text-slate-300 text-[10px] sm:text-[11px] font-medium px-4 sm:px-8 border-b border-sky-500/20 ${
          isScrolled ? 'h-0 opacity-0 overflow-hidden py-0' : 'h-7 sm:h-8 flex items-center justify-between'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-6">
            <span className="flex items-center space-x-1.5 text-slate-300">
              <MapPin className="w-3 h-3 text-[#009EEB]" />
              <span>Itajaí - SC • <strong className="text-sky-400 font-semibold">Entrega em todo o Brasil</strong></span>
            </span>
            <span className="hidden sm:flex items-center space-x-1.5 text-slate-300">
              <Droplet className="w-3 h-3 text-[#009EEB] fill-[#009EEB]/30" />
              <span>Água Alcalina, Gelada e Ozonizada</span>
            </span>
          </div>

          <div className="flex items-center space-x-2 text-slate-300 font-medium">
            <Phone className="w-3 h-3 text-[#009EEB]" />
            <span>(47) 9143-0843 • <span className="text-sky-400 font-bold">Comercial Top Life</span></span>
          </div>
        </div>
      </div>

      {/* 2. CABEÇALHO PRINCIPAL: DEGRADÊ DO BRANCO ATÉ O AZUL CLARO EM FORMA DE ESPIRAL */}
      <div className="relative overflow-hidden header-spiral-bg border-b border-sky-200/80 shadow-xs">
        
        {/* Camada Espiral de Gradiente Branco para Azul Claro */}
        <div
          className="absolute inset-0 pointer-events-none opacity-90 header-spiral-swirl"
          style={{
            background: `
              conic-gradient(
                from 140deg at 50% 50%,
                #ffffff 0deg,
                #e0f2fe 45deg,
                #ffffff 90deg,
                #bae6fd 140deg,
                #ffffff 190deg,
                #7dd3fc 240deg,
                #ffffff 300deg,
                #e0f2fe 340deg,
                #ffffff 360deg
              )
            `,
          }}
        />

        {/* Brilho Suave Translúcido */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-transparent to-white/60 pointer-events-none backdrop-blur-xs" />

        <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'py-1.5 sm:py-2' : 'py-2.5 sm:py-3.5'}`}>
          <div className="flex items-center justify-between">
            
            {/* LOGOTIPO TOP LIFE: VISÍVEL IMEDIATAMENTE, FLUTUANTE E SEM MOLDURA */}
            <button
              onClick={() => handleNavClick('hero')}
              className="group relative flex items-center cursor-pointer focus:outline-none"
              aria-label="Página Inicial Top Life Purificadores"
            >
              <img
                src="/images/brand/top-life-logo.png"
                alt="Top Life Purificadores de Água"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                className={`w-auto object-contain transition-all duration-300 select-none group-hover:scale-105 ${
                  isScrolled
                    ? 'h-11 sm:h-13 md:h-14'
                    : 'h-13 sm:h-16 md:h-18 lg:h-20'
                }`}
              />
            </button>

            {/* NAVEGAÇÃO DESKTOP: TEXTOS ESCUROS (#002D52) COM HOVER EM AZUL */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="relative py-1 text-xs sm:text-sm font-bold text-[#002D52] hover:text-[#0077CC] transition-colors duration-200 cursor-pointer group"
                >
                  <span>{item.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0077CC] group-hover:w-full transition-all duration-200 rounded-full" />
                </button>
              ))}
            </nav>

            {/* AÇÃO PRINCIPAL: BOTÃO OFICIAL WHATSAPP */}
            <div className="flex items-center space-x-2.5">
              <a
                href={createWhatsAppUrl(defaultWhatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playHudClick()}
                className="group relative inline-flex items-center space-x-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-md shadow-emerald-900/15 hover:shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer border border-emerald-400/40"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white shrink-0 group-hover:rotate-12 transition-transform duration-200" />
                <span className="font-extrabold uppercase tracking-wider text-[10px] sm:text-[11px]">
                  Falar com especialista
                </span>
                <ArrowRight className="w-3 h-3 text-white/90 group-hover:translate-x-1 transition-transform duration-200 hidden sm:inline" />
              </a>

              {/* Botão de Menu Mobile */}
              <button
                onClick={() => {
                  soundManager.playHudClick();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="md:hidden p-2 rounded-xl bg-white/70 border border-sky-200 text-[#002D52] hover:bg-white cursor-pointer transition-colors"
                aria-label="Abrir Menu de Navegação"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* MENU MOBILE EXPANSÍVEL */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-3 p-4 bg-white/98 border border-sky-200 rounded-2xl shadow-xl backdrop-blur-md">
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="text-left px-4 py-2.5 rounded-xl text-sm font-bold text-[#002D52] hover:bg-sky-50 hover:text-[#0077CC] transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-3 border-t border-slate-100 mt-2">
                  <a
                    href={createWhatsAppUrl(defaultWhatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-md"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>Falar no WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spiralRotate {
          0% { transform: scale(1.1) rotate(0deg); }
          50% { transform: scale(1.15) rotate(180deg); }
          100% { transform: scale(1.1) rotate(360deg); }
        }
        .header-spiral-swirl {
          animation: spiralRotate 60s linear infinite;
        }
      `}</style>
    </header>
  );
};
