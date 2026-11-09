import React from 'react';

const SLOGANS = [
  'TOP LIFE — Água que transforma.',
  'Tecnologia para cuidar de você.',
  'Sua água, sua qualidade de vida.',
  'Inovação em cada gota.',
  'Mais cuidado em cada detalhe.',
  'Purificação de alto padrão.',
];

export const BrandTicker: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#001830] via-[#002D52] to-[#001830] border-y border-sky-400/20 py-2.5 select-none z-20 shadow-md">
      {/* Glow lines */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />

      <div className="flex w-max animate-ticker items-center">
        {/* Render 3 identical sets to ensure infinite seamless looping */}
        {[...Array(3)].map((_, loopIdx) => (
          <div key={loopIdx} className="flex items-center space-x-8 sm:space-x-12 px-4 sm:px-6">
            {SLOGANS.map((slogan, sIdx) => (
              <div key={sIdx} className="flex items-center space-x-3 text-xs sm:text-sm font-semibold tracking-wide text-sky-100 whitespace-nowrap">
                <img
                  src="/images/brand/top-life-logo.png"
                  alt="Top Life"
                  className="h-4 sm:h-5 w-auto object-contain shrink-0 drop-shadow-xs"
                />
                <span className="text-sky-300/60 font-light">•</span>
                <span className="tracking-wide text-white font-medium">{slogan}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }
        .animate-ticker {
          animation: ticker 32s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
