import React, { useState } from 'react';
import { MessageCircle, Check, ArrowUpRight, X, ChevronRight } from 'lucide-react';
import { PURIFIER_MODELS, PRODUCT_CATEGORIES, createProductWhatsAppUrl } from '../data/purifiers';
import { PurifierModel, ProductCategory } from '../types';
import { soundManager } from '../utils/soundEffects';

export const ProductCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Todos os produtos');
  const [selectedSpecModel, setSelectedSpecModel] = useState<PurifierModel | null>(null);
  const [colorOverrides, setColorOverrides] = useState<Record<string, string>>({});
  const [modalActiveImage, setModalActiveImage] = useState<string | null>(null);

  const filteredModels =
    selectedCategory === 'Todos os produtos'
      ? PURIFIER_MODELS
      : PURIFIER_MODELS.filter((m) => m.categories.includes(selectedCategory));

  const handleCategorySelect = (cat: ProductCategory) => {
    soundManager.playHudClick();
    setSelectedCategory(cat);
  };

  const handleColorChange = (modelId: string, imgUrl?: string) => {
    soundManager.playHudClick();
    if (imgUrl) {
      setColorOverrides((prev) => ({ ...prev, [modelId]: imgUrl }));
    }
  };

  const openSpecModal = (model: PurifierModel) => {
    soundManager.playHudClick();
    setSelectedSpecModel(model);
    setModalActiveImage(colorOverrides[model.id] || model.image);
  };

  return (
    <section id="modelos" className="relative py-16 sm:py-24 bg-white text-slate-900 overflow-hidden border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-[#003B66] text-xs font-semibold tracking-wider uppercase mb-3 shadow-xs">
            <span>CATÁLOGO OFICIAL TOP LIFE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#002D52] tracking-tight">
            Purificadores, Refis e Garrafas
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Selecione uma categoria para filtrar o catálogo completo com fotografias reais e fichas técnicas oficiais.
          </p>
        </div>

        {/* 9 Categorias Conforme Master Prompt */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-xs ${
                  isSelected
                    ? 'bg-[#003B66] text-white font-bold shadow-md shadow-[#003B66]/20 border border-[#0077CC]'
                    : 'bg-[#F4F9FD] text-slate-700 hover:text-[#005B9A] border border-sky-100 hover:bg-sky-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid de Produtos - Carregamento Imediato Sem Delays */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {filteredModels.map((model, idx) => {
            const displayImage = colorOverrides[model.id] || model.image;
            const whatsappUrl = createProductWhatsAppUrl(model.name);

            return (
              <div
                key={model.id}
                className="group relative rounded-3xl bg-white border border-sky-100 hover:border-[#0077CC] p-5 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Contêiner da Imagem com object-contain */}
                  <div className="relative rounded-2xl overflow-hidden bg-[#F4F9FD] border border-sky-100/80 mb-4 h-52 sm:h-56 flex items-center justify-center p-3">
                    <img
                      src={displayImage}
                      alt={model.name}
                      loading={idx < 4 ? 'eager' : 'lazy'}
                      decoding="sync"
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain select-none drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white/95 border border-sky-100 text-[10px] font-bold text-[#003B66] uppercase shadow-xs">
                      {model.category}
                    </div>

                    {model.priceConfirmed && (
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-emerald-100 border border-emerald-200 text-[10px] font-bold text-emerald-800 uppercase shadow-xs">
                        Preço Confirmado
                      </div>
                    )}
                  </div>

                  {/* Seletor de Cores (se houver variantes) */}
                  {model.colors && model.colors.length > 0 && (
                    <div className="flex items-center space-x-1.5 mb-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Cores:</span>
                      <div className="flex items-center space-x-1">
                        {model.colors.map((c) => (
                          <button
                            key={c.name}
                            title={c.name}
                            onClick={() => handleColorChange(model.id, c.image)}
                            className={`w-4 h-4 rounded-full border transition-transform cursor-pointer ${
                              colorOverrides[model.id] === c.image || (!colorOverrides[model.id] && model.colors![0].name === c.name)
                                ? 'scale-125 border-[#003B66] ring-1 ring-[#0077CC]'
                                : 'border-slate-300 hover:scale-110'
                            }`}
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Nome e Tagline */}
                  <h3 className="text-base sm:text-lg font-bold text-[#002D52] group-hover:text-[#0077CC] transition-colors leading-snug">
                    {model.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 font-medium">
                    {model.tagline}
                  </p>

                  {/* Destaques Técnicos Resumidos */}
                  <div className="mt-3.5 space-y-1.5 border-t border-slate-100 pt-3">
                    {model.features.slice(0, 3).map((ft, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-1.5 text-xs font-medium text-slate-700">
                        <Check className="w-3.5 h-3.5 text-[#0077CC] shrink-0" />
                        <span className="truncate">{ft}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preço e Botões de Ação */}
                <div className="mt-5 pt-3.5 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        {model.priceConfirmed ? 'Preço de Venda' : 'Disponibilidade'}
                      </span>
                      <span className={`font-black ${model.priceConfirmed ? 'text-xl text-[#002D52]' : 'text-sm text-[#005B9A]'}`}>
                        {model.price}
                      </span>
                    </div>
                    <button
                      onClick={() => openSpecModal(model)}
                      className="text-xs text-[#0077CC] hover:text-[#003B66] flex items-center space-x-1 font-bold cursor-pointer"
                    >
                      <span>Ficha Técnica</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playHudClick()}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-xs hover:shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Consultar no WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal / Ficha Técnica Completa */}
      {selectedSpecModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001830]/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-sky-100 p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Fechar modal */}
            <button
              onClick={() => setSelectedSpecModel(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabeçalho do modal */}
            <div>
              <span className="text-xs font-bold text-[#0077CC] uppercase tracking-wider block mb-1">
                {selectedSpecModel.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#002D52]">
                {selectedSpecModel.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {selectedSpecModel.tagline}
              </p>
            </div>

            {/* Imagem Principal do Modal & Miniaturas */}
            <div className="space-y-3">
              <div className="rounded-2xl bg-[#F4F9FD] border border-sky-100 p-4 h-64 flex items-center justify-center">
                <img
                  src={modalActiveImage || selectedSpecModel.image}
                  alt={selectedSpecModel.name}
                  loading="eager"
                  decoding="sync"
                  className="max-h-full max-w-full object-contain drop-shadow-sm select-none"
                />
              </div>

              {selectedSpecModel.images.length > 1 && (
                <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                  {selectedSpecModel.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setModalActiveImage(img)}
                      className={`w-16 h-16 rounded-xl border p-1 bg-white shrink-0 cursor-pointer transition-all ${
                        (modalActiveImage || selectedSpecModel.image) === img
                          ? 'border-[#0077CC] ring-2 ring-sky-200'
                          : 'border-slate-200 hover:border-sky-300'
                      }`}
                    >
                      <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Descrição */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Descrição Oficial</h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedSpecModel.description}
              </p>
            </div>

            {/* Ficha Técnica Organizada */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Especificações Técnicas</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedSpecModel.specs.pH && (
                  <div className="p-2.5 rounded-xl bg-[#F4F9FD] border border-sky-100 flex justify-between">
                    <span className="text-slate-500">Faixa de pH:</span>
                    <span className="font-bold text-[#002D52]">{selectedSpecModel.specs.pH}</span>
                  </div>
                )}
                {selectedSpecModel.specs.cooling && (
                  <div className="p-2.5 rounded-xl bg-[#F4F9FD] border border-sky-100 flex justify-between">
                    <span className="text-slate-500">Refrigeração:</span>
                    <span className="font-bold text-[#002D52]">{selectedSpecModel.specs.cooling}</span>
                  </div>
                )}
                {selectedSpecModel.specs.capacity && (
                  <div className="p-2.5 rounded-xl bg-[#F4F9FD] border border-sky-100 flex justify-between">
                    <span className="text-slate-500">Vazão:</span>
                    <span className="font-bold text-[#002D52]">{selectedSpecModel.specs.capacity}</span>
                  </div>
                )}
                {selectedSpecModel.specs.filtration && (
                  <div className="p-2.5 rounded-xl bg-[#F4F9FD] border border-sky-100 flex justify-between">
                    <span className="text-slate-500">Vida Útil:</span>
                    <span className="font-bold text-[#002D52]">{selectedSpecModel.specs.filtration}</span>
                  </div>
                )}
                {selectedSpecModel.specs.dimensions && (
                  <div className="p-2.5 rounded-xl bg-[#F4F9FD] border border-sky-100 flex justify-between">
                    <span className="text-slate-500">Dimensões:</span>
                    <span className="font-bold text-[#002D52]">{selectedSpecModel.specs.dimensions}</span>
                  </div>
                )}
                {selectedSpecModel.specs.weight && (
                  <div className="p-2.5 rounded-xl bg-[#F4F9FD] border border-sky-100 flex justify-between">
                    <span className="text-slate-500">Peso:</span>
                    <span className="font-bold text-[#002D52]">{selectedSpecModel.specs.weight}</span>
                  </div>
                )}
                {selectedSpecModel.specs.voltage && (
                  <div className="p-2.5 rounded-xl bg-[#F4F9FD] border border-sky-100 flex justify-between">
                    <span className="text-slate-500">Tensão:</span>
                    <span className="font-bold text-[#002D52]">{selectedSpecModel.specs.voltage}</span>
                  </div>
                )}
                {selectedSpecModel.specs.reservoir && (
                  <div className="p-2.5 rounded-xl bg-[#F4F9FD] border border-sky-100 flex justify-between">
                    <span className="text-slate-500">Reservatório:</span>
                    <span className="font-bold text-[#002D52]">{selectedSpecModel.specs.reservoir}</span>
                  </div>
                )}
                {selectedSpecModel.specs.retention && (
                  <div className="p-2.5 rounded-xl bg-[#F4F9FD] border border-sky-100 flex justify-between">
                    <span className="text-slate-500">Retenção:</span>
                    <span className="font-bold text-[#002D52]">{selectedSpecModel.specs.retention}</span>
                  </div>
                )}
                {selectedSpecModel.compatibility && (
                  <div className="p-2.5 rounded-xl bg-[#F4F9FD] border border-sky-100 flex justify-between sm:col-span-2">
                    <span className="text-slate-500">Compatibilidade:</span>
                    <span className="font-bold text-[#002D52]">{selectedSpecModel.compatibility}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Preço e Botão WhatsApp */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  {selectedSpecModel.priceConfirmed ? 'Preço de Venda Confirmado' : 'Valor'}
                </span>
                <span className="text-2xl font-black text-[#002D52]">
                  {selectedSpecModel.price}
                </span>
                {selectedSpecModel.installment && (
                  <span className="block text-xs text-slate-500">ou {selectedSpecModel.installment}</span>
                )}
              </div>

              <a
                href={createProductWhatsAppUrl(selectedSpecModel.name)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playHudClick()}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Pedir no WhatsApp</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
