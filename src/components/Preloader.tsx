import React, { useState, useEffect } from 'react';
import { PURIFIER_MODELS } from '../data/purifiers';

interface PreloaderProps {
  onLoaded: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 1. Extração dinâmica de 100% de todas as imagens do site
    const productImages = PURIFIER_MODELS.flatMap((m) => [
      m.image,
      ...m.images,
      ...(m.colors?.map((c) => c.image).filter(Boolean) as string[] || []),
    ]);

    const allSiteImages = Array.from(
      new Set([
        '/images/brand/top-life-logo.png',
        '/images/banner/banner-1.jpg',
        '/images/banner/banner-2.jpg',
        '/images/banner/banner-3.jpg',
        '/images/banner/banner-4.jpg',
        '/images/backgrounds/bg-water-watercolor.jpg',
        '/images/backgrounds/bg-carbon-tech.jpg',
        '/images/backgrounds/bg-fluid-foam.jpg',
        '/images/backgrounds/bg-smoke-blue.jpg',
        ...productImages,
      ].filter(Boolean))
    );

    let loadedCount = 0;
    const total = allSiteImages.length;

    const handleItemLoaded = () => {
      loadedCount++;
      const currentPct = Math.round((loadedCount / total) * 100);
      setProgress((prev) => Math.max(prev, currentPct));

      // Quando 100% das imagens estiverem carregadas e decodificadas na memória
      if (loadedCount >= total) {
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            onLoaded();
          }, 350);
        }, 150);
      }
    };

    // Pré-carregamento concorrente com decode() para pintura imediata
    allSiteImages.forEach((src) => {
      const img = new Image();
      img.src = src;

      if (typeof img.decode === 'function') {
        img
          .decode()
          .then(handleItemLoaded)
          .catch(handleItemLoaded);
      } else {
        (img as HTMLImageElement).onload = handleItemLoaded;
        (img as HTMLImageElement).onerror = handleItemLoaded;
      }
    });

    // Timeout de segurança para conexões lentas (máximo 2.5s)
    const fallbackTimer = setTimeout(() => {
      setProgress(100);
      setIsFading(true);
      setTimeout(() => {
        onLoaded();
      }, 300);
    }, 2500);

    return () => clearTimeout(fallbackTimer);
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#001830] transition-opacity duration-300 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-xs w-full px-6">
        {/* Logo Oficial da Top Life */}
        <img
          src="/images/brand/top-life-logo.png"
          alt="Top Life Purificadores"
          className="h-16 sm:h-20 w-auto object-contain mb-8 drop-shadow-xl select-none"
        />

        {/* Barra de Progresso Fina e Sofisticada */}
        <div className="w-full h-1.5 bg-[#002D52] rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#0077CC] via-[#009EEB] to-sky-300 transition-all duration-150 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Indicador de 100% Carregado */}
        <div className="mt-3 flex items-center justify-between w-full text-[11px] font-bold text-sky-200">
          <span>Carregando Fotografias</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};
