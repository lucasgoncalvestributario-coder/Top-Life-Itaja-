import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { createWhatsAppUrl } from '../data/purifiers';
import { soundManager } from '../utils/soundEffects';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpenTooltip, setIsOpenTooltip] = useState(true);

  const defaultMsg = 'Olá! Quero solicitar atendimento e informações sobre os purificadores Top Life.';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Quick Tooltip Popup */}
      {isOpenTooltip && (
        <div className="pointer-events-auto mb-3 max-w-xs p-3.5 rounded-2xl bg-white border border-slate-200 text-slate-800 text-xs shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 relative">
          <button
            onClick={() => setIsOpenTooltip(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            aria-label="Fechar mensagem"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center space-x-2 text-emerald-600 font-bold text-[11px] mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ATENDIMENTO ONLINE</span>
          </div>
          <p className="pr-4 leading-relaxed font-medium">
            Dúvidas sobre o purificador ideal para a sua casa ou empresa? Fale conosco no WhatsApp!
          </p>
        </div>
      )}

      {/* Persistent Floating Button */}
      <a
        href={createWhatsAppUrl(defaultMsg)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => soundManager.playHudClick()}
        className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/30 transition-all duration-300 transform hover:scale-110 cursor-pointer"
        aria-label="Falar no WhatsApp"
      >
        <div className="absolute inset-0 rounded-full border-2 border-emerald-400 opacity-60 animate-ping" />
        <MessageCircle className="w-7 h-7 fill-white group-hover:rotate-12 transition-transform duration-300" />
      </a>
    </div>
  );
};

