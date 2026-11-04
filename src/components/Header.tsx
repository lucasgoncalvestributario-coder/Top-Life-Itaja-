import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, MapPin, Droplet, Phone, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { createWhatsAppUrl } from '../data/purifiers';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
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
    { label: 'Tecnologia', id: 'tecnologias' },
    { label: 'Tipos de Água', id: 'caracteristicas-agua' },
    { label: 'Catálogo de Produtos', id: 'modelos' },
    { label: 'Vantagens', id: 'beneficios' },
    { label: 'Contato', id: 'contato' },
  ];

  const defaultWhatsappMsg = 'Olá! Gostaria de solicitar um orçamento dos purificadores de água Top Life.';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-[#002D52]/98 shadow-xl shadow-[#001830]/25 backdrop-blur-md border-b border-sky-400/20'
          : 'bg-[#003B66]/95 backdrop-blur-md border-b border-sky-400/20'
      }`}
    >
      {/* 1. TOP BAR (AZUL ESCURO PROFUNDO & INFO ESSENCIAL) */}
      <div
        className={`transition-all duration-300 bg-[#001830] text-white text-[10px] sm:text-[11px] font-medium px-4 sm:px-8 border-b border-white/10 ${
          isScrolled ? 'h-0 opacity-0 overflow-hidden py-0' : 'h-7 flex items-center justify-between'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-6">
            <span className="flex items-center space-x-1.5 text-sky-200">
              <MapPin className="w-3 h-3 text-sky-400" />
              <span>Itajaí - SC • Entregas para Todo o Brasil</span>
            </span>
            <span className="hidden sm:flex items-center space-x-1.5 text-sky-200">
              <Droplet className="w-3 h-3 text-sky-400 fill-sky-400/30" />
              <span>Água Alcalina, Gelada e Ozonizada</span>
            </span>
          </div>

          <div className="flex items-center space-x-1.5 text-sky-200">
            <Phone className="w-3 h-3 text-sky-400" />
            <span>Atendimento Comercial Especializado</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className={`transition-all duration-300 ${isScrolled ? 'py-1.5 sm:py-2' : 'py-2.5 sm:py-3.5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LOGOTIPO TOP LIFE: VISÍVEL IMEDIATAMENTE, FLUTUANTE E SEM QUADRADO */}
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
                className={`w-auto object-contain transition-all duration-300 drop-shadow-md select-none group-hover:scale-105 ${
                  isScrolled
                    ? 'h-11 sm:h-13 md:h-14'
                    : 'h-13 sm:h-16 md:h-18 lg:h-20'
                }`}
              />
            </button>

            {/* NAVEGAÇÃO DESKTOP COM TEXTO BRANCO E HOVER AZUL-CLARO */}
            <nav className="hidden md:flex items-center space-x-5 lg:space-x-7">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="relative py-1 text-xs sm:text-sm font-semibold text-white/90 hover:text-sky-300 transition-colors duration-200 cursor-pointer group"
                >
                  <span>{item.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-sky-300 group-hover:w-full transition-all duration-200 rounded-full" />
                </button>
              ))}
            </nav>

            {/* AÇÃO PRINCIPAL: WHATSAPP */}
            <div className="flex items-center space-x-2.5">
              <a
                href={createWhatsAppUrl(defaultWhatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playHudClick()}
                className="group relative inline-flex items-center space-x-1.5 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-md shadow-emerald-950/20 hover:shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer border border-emerald-400/30"
              >
                <MessageCircle className="w-4 h-4 fill-white shrink-0 group-hover:rotate-12 transition-transform duration-200" />
                <span className="font-extrabold uppercase tracking-wider text-[10px] sm:text-[11px]">
                  Solicitar Orçamento
                </span>
                <ArrowRight className="w-3 h-3 text-white/90 group-hover:translate-x-1 transition-transform duration-200 hidden sm:inline" />
              </a>

              {/* Botão de Menu Mobile */}
              <button
                onClick={() => {
                  soundManager.playHudClick();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="md:hidden p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 cursor-pointer transition-colors"
                aria-label="Abrir Menu de Navegação"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* MENU MOBILE EXPANSÍVEL */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-3 p-4 bg-[#00223d] border border-sky-400/20 rounded-2xl shadow-2xl backdrop-blur-2xl">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="text-left px-4 py-3 rounded-xl text-sm font-semibold text-white hover:bg-sky-500/20 hover:text-sky-300 transition-colors border border-transparent hover:border-sky-400/30"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-3 border-t border-white/15 mt-2">
                  <a
                    href={createWhatsAppUrl(defaultWhatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Falar no WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
