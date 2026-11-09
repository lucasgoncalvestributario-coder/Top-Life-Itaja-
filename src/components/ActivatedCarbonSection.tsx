import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { PHONE_NUMBER } from '../data/purifiers';
import { soundManager } from '../utils/soundEffects';

export const ActivatedCarbonSection: React.FC = () => {
  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
    'Olá! Gostaria de consultar os modelos de purificadores com carvão ativado da Top Life.'
  )}`;

  return (
    <section id="carvao-ativado" className="relative py-20 sm:py-28 overflow-hidden bg-[#001426] text-white border-y border-sky-400/20">
      {/* Background texture overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-screen pointer-events-none"
        style={{ backgroundImage: `url('/images/backgrounds/bg-carbon-tech.jpg')` }}
      />
      
      {/* Soft blue water glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(0,119,204,0.15)_0%,_transparent_65%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            CARVÃO ATIVADO
          </h2>
          <p className="mt-4 text-sky-200/90 text-sm sm:text-base leading-relaxed">
            Estrutura microporosa de casca de coco associada à prata coloidal para retenção de cloro livre, sabores e odores, preservando os minerais essenciais.
          </p>
        </div>

        {/* 2 Colunas: Fotografia sem nenhum título à Esquerda + Informações à Direita */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Lado Esquerdo: Somente a foto, sem nenhum título */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[480px] aspect-square rounded-3xl overflow-hidden bg-gradient-to-b from-[#00223d] to-[#001830] border border-sky-400/25 shadow-2xl p-4 sm:p-6 flex items-center justify-center">
              
              {/* Efeito de iluminação suave */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,158,235,0.15)_0%,_transparent_70%)] pointer-events-none" />

              {/* Fotografia — SOMENTE A FOTO, SEM NENHUM TÍTULO */}
              <img
                src="/images/banner/banner-2.jpg"
                alt="Purificador e carvão ativado Top Life"
                loading="eager"
                decoding="sync"
                className="max-h-full max-w-full object-contain select-none drop-shadow-xl"
              />
            </div>
          </div>

          {/* Lado Direito: Informações Técnicas e Ação Direta */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Adsorção Físico-Química e Ação Bacteriostática
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                As moléculas de cloro e compostos que provocam sabor ou odor na água aderem aos microporos do carvão ativado vegetal, enquanto a prata coloidal atua impedindo a proliferação de microrganismos no interior do refil.
              </p>
            </div>

            {/* Pontos Técnicos Objetivos */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200">
                  <strong>Origem vegetal em casca de coco:</strong> pureza elevada e alta capacidade de retenção superficial.
                </span>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200">
                  <strong>Impregnação com prata coloidal:</strong> proteção bacteriostática contínua por todo o período de uso.
                </span>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200">
                  <strong>Manutenção dos minerais:</strong> água equilibrada sem desmineralização prejudicial à hidratação.
                </span>
              </div>
            </div>

            {/* Botão Único */}
            <div className="pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playHudClick()}
                className="inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-emerald-950/30 transition-all duration-200 cursor-pointer transform hover:scale-105"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Consultar modelos com carvão ativado</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
