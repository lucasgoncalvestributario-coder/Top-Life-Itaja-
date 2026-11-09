import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin, Youtube, ShieldCheck } from 'lucide-react';
import { createWhatsAppUrl } from '../data/purifiers';
import { soundManager } from '../utils/soundEffects';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Footer: React.FC = () => {
  const whatsappMsg = 'Olá! Gostaria de entrar em contato com a equipe da Top Life Purificadores.';

  return (
    <footer className="relative bg-[#001830] text-slate-300 pt-16 pb-12 overflow-hidden border-t border-[#002D52]">
      {/* Background Texture Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none mix-blend-screen"
        style={{ backgroundImage: `url('/images/backgrounds/bg-smoke-blue.jpg')` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/images/brand/top-life-logo.png"
                alt="Top Life Purificadores de Água"
                loading="eager"
                decoding="sync"
                className="h-14 sm:h-16 w-auto object-contain select-none"
              />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Especialista em purificadores de água de alta performance, filtragem avançada por carvão ativado, eficiência bacteriológica, refrigeração por compressor e ionização alcalina para sua família e empresa.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#002847] text-slate-300 hover:text-white hover:bg-[#003B66] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#002847] text-slate-300 hover:text-white hover:bg-[#003B66] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#002847] text-slate-300 hover:text-white hover:bg-[#003B66] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#002847] text-slate-300 hover:text-white hover:bg-[#003B66] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <span className="block text-white font-bold uppercase tracking-wider mb-2">Navegação</span>
            <ul className="space-y-2.5">
              <li><a href="#hero" className="hover:text-sky-300 transition-colors">Início</a></li>
              <li><a href="#carvao-ativado" className="hover:text-sky-300 transition-colors">Carvão Ativado</a></li>
              <li><a href="#eficiencia-bacteriologica" className="hover:text-sky-300 transition-colors">Eficiência Bacteriológica</a></li>
              <li><a href="#modelos" className="hover:text-sky-300 transition-colors">Purificadores & Refis</a></li>
              <li><a href="#contato" className="hover:text-sky-300 transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <span className="block text-white font-bold uppercase tracking-wider mb-2">Atendimento</span>
            
            <div className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>Itajaí - SC • Atendimento e Entregas em todo o Brasil</span>
            </div>

            <div className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-sky-400 shrink-0" />
              <span>(47) 9143-0843</span>
            </div>

            <div className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <span>contato@toplifepurificadores.com.br</span>
            </div>

            <div className="pt-2">
              <a
                href={createWhatsAppUrl(whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playHudClick()}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-950/20"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Falar com especialista</span>
              </a>
            </div>
          </div>

          {/* Col 4: Top Life Guarantee */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <span className="block text-white font-bold uppercase tracking-wider">Garantia de Qualidade</span>
            <div className="p-4 rounded-2xl bg-[#00223d] border border-sky-400/20 space-y-2">
              <div className="flex items-center space-x-2 text-sky-300 font-bold">
                <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0" />
                <span>Padrão Top Life Oficial</span>
              </div>
              <p className="text-slate-300 font-medium leading-relaxed">
                Purificadores de água produzidos com materiais atóxicos certificados, eficiência bacteriológica e garantia oficial de fábrica.
              </p>
              <span className="inline-block text-[10px] font-bold text-sky-400 uppercase tracking-wide">
                ✔ Saúde, Segurança & Durabilidade
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Top Life Purificadores de Água. Todos os direitos reservados.</p>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-slate-200 transition-colors">Termos de Uso</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-200 transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
