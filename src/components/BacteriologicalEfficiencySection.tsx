import React from 'react';

export const BacteriologicalEfficiencySection: React.FC = () => {
  return (
    <section id="eficiencia-bacteriologica" className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-[#00223d] via-[#003156] to-[#001c33] text-white border-b border-sky-300/30">
      
      {/* Fundo Mais Aceso com Iluminação Ciano e Azul Vibrante */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_rgba(0,158,235,0.28)_0%,_transparent_75%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-[#009EEB]/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* APRESENTAÇÃO TÉCNICA LIMPA E ILUMINADA */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-sm">
            EFICIÊNCIA BACTERIOLÓGICA
          </h2>
          <p className="mt-4 text-sky-100 text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            Retenção e controle microbiológico conforme normas ABNT e ensaios laboratoriais atestados pelo INMETRO.
          </p>

          {/* Dados Técnicos em Linha Mais Acesa */}
          <div className="mt-10 pt-8 border-t border-sky-300/30 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-5 rounded-2xl bg-[#002d50]/80 border border-sky-300/30 shadow-md backdrop-blur-xs flex items-start space-x-3.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-300 mt-1.5 shrink-0 shadow-xs shadow-sky-300 animate-pulse" />
              <div>
                <h4 className="text-white font-bold text-base">Retenção Aprovada</h4>
                <p className="text-xs sm:text-sm text-sky-100 mt-1 leading-relaxed">
                  Avaliação laboratorial rigorosa de retenção de microrganismos e partículas.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#002d50]/80 border border-sky-300/30 shadow-md backdrop-blur-xs flex items-start space-x-3.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-300 mt-1.5 shrink-0 shadow-xs shadow-sky-300 animate-pulse" />
              <div>
                <h4 className="text-white font-bold text-base">Ação Bacteriostática</h4>
                <p className="text-xs sm:text-sm text-sky-100 mt-1 leading-relaxed">
                  Nanopartículas de prata coloidal inibem a colonização bacteriana interna.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#002d50]/80 border border-sky-300/30 shadow-md backdrop-blur-xs flex items-start space-x-3.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-300 mt-1.5 shrink-0 shadow-xs shadow-sky-300 animate-pulse" />
              <div>
                <h4 className="text-white font-bold text-base">Barreira Física</h4>
                <p className="text-xs sm:text-sm text-sky-100 mt-1 leading-relaxed">
                  Bloqueio eficaz de biofilmes, limo e resíduos oriundos de tubulações e caixas.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
