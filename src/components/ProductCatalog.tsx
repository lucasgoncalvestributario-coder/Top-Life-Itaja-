import React, { useState } from 'react';
import { ArrowUpRight, X, Check, ChevronRight } from 'lucide-react';
import { PURIFIER_MODELS, PRODUCT_CATEGORIES, createProductWhatsAppUrl } from '../data/purifiers';
import { PurifierModel, ProductCategory } from '../types';
import { soundManager } from '../utils/soundEffects';
import { WhatsAppIcon } from './WhatsAppIcon';

export const ProductCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Todos os produtos');
  const [selectedSpecModel, setSelectedSpecModel] = useState<PurifierModel | null>(null);
  const [modalActiveImage, setModalActiveImage] = useState<string | null>(null);

  const filteredModels =
    selectedCategory === 'Todos os produtos'
      ? PURIFIER_MODELS
      : PURIFIER_MODELS.filter((m) => m.categories.includes(selectedCategory));

  const handleCategorySelect = (cat: ProductCategory) => {
    soundManager.playHudClick();
    setSelectedCategory(cat);
  };

  const openSpecModal = (model: PurifierModel) => {
    soundManager.playHudClick();
    setSelectedSpecModel(model);
    setModalActiveImage(model.image);
  };

  return (
    <section id="modelos" className="relative py-20 sm:py-28 bg-[#F4F9FD] text-slate-900 overflow-hidden border-b border-sky-100">
      {/* Luz ambiente suave de fundo claro */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-50/50 to-[#F4F9FD] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título Principal */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-5xl font-black text-[#002D52] tracking-tight">
            Purificadores | Refis | Garrafas
          </h2>
          <p className="mt-3 text-slate-600 text-xs sm:text-sm font-normal">
            Selecione uma categoria para filtrar os modelos com fotos originais e especificações de fábrica.
          </p>
        </div>

        {/* Sistema de Navegação / Categorias */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-12 sm:mb-16">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#003B66] text-white shadow-md shadow-[#003B66]/25 border border-[#0077CC]'
                    : 'bg-white text-slate-700 hover:text-[#005B9A] border border-sky-200 hover:bg-sky-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid de Produtos: Fundo Claro, Imagem Ocupando Todo o Quadrado e Título Destacado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {filteredModels.map((model, idx) => {
            const whatsappUrl = createProductWhatsAppUrl(model.name);

            return (
              <div
                key={model.id}
                className="group relative rounded-3xl bg-white border border-sky-200/80 hover:border-[#0077CC] p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* FOTOGRAFIA OCUPANDO TODO O QUADRADINHO */}
                  <div className="relative rounded-2xl overflow-hidden bg-[#FAFCFF] border border-sky-100 mb-3.5 h-60 sm:h-64 w-full flex items-center justify-center p-2">
                    <img
                      src={model.image}
                      alt={model.name}
                      loading="eager"
                      decoding="sync"
                      className="w-full h-full object-contain select-none transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Categoria Discreta */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-white/95 border border-sky-200 text-[10px] font-extrabold text-[#003B66] uppercase shadow-xs">
                      {model.category}
                    </div>
                  </div>

                  {/* Cores Disponíveis: Apenas Informação Visual Estática (NÃO CLICÁVEIS) */}
                  {model.colors && model.colors.length > 0 && (
                    <div className="mb-2 flex items-center space-x-2 text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-400">Cores:</span>
                      <div className="flex items-center space-x-1.5 pointer-events-none select-none">
                        {model.colors.map((c) => (
                          <span
                            key={c.name}
                            title={c.name}
                            className="inline-block w-3.5 h-3.5 rounded-full border border-slate-300 shadow-xs"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TÍTULO BASTANTE DESTACADO SEM DOMINAR O ESPAÇO */}
                  <h3 className="text-lg sm:text-xl font-black text-[#002D52] group-hover:text-[#0077CC] transition-colors leading-tight">
                    {model.name}
                  </h3>

                  {/* Tagline Reduzida */}
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed font-normal">
                    {model.tagline}
                  </p>

                  {/* Informações Técnicas Essenciais */}
                  <div className="mt-3 space-y-1 border-t border-slate-100 pt-2.5">
                    {model.features.slice(0, 2).map((ft, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-1.5 text-xs text-slate-600 font-medium">
                        <Check className="w-3.5 h-3.5 text-[#0077CC] shrink-0" />
                        <span className="truncate">{ft}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bloco de Valor e Ações */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase block">
                        Valor
                      </span>
                      <span className="font-black text-lg text-[#002D52]">
                        {model.price}
                      </span>
                    </div>

                    <button
                      onClick={() => openSpecModal(model)}
                      className="text-xs text-[#0077CC] hover:text-[#003B66] flex items-center space-x-1 font-bold cursor-pointer py-1 px-2 rounded-lg hover:bg-sky-50 transition-colors"
                    >
                      <span>Ver detalhes</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Botão Oficial: Falar com Especialista */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playHudClick()}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-xs hover:shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer transform hover:scale-[1.02]"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                    <span>Falar com especialista</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal de Detalhes Técnicos */}
      {selectedSpecModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001830]/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-sky-100 p-6 sm:p-8 shadow-2xl text-slate-900 space-y-6">
            
            {/* Fechar modal */}
            <button
              onClick={() => setSelectedSpecModel(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabeçalho */}
            <div>
              <span className="text-xs font-bold text-[#0077CC] uppercase tracking-wider block mb-1">
                {selectedSpecModel.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#002D52]">
                {selectedSpecModel.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {selectedSpecModel.tagline}
              </p>
            </div>

            {/* Imagem Principal do Modal & Galeria de Fotos */}
            <div className="space-y-3">
              <div className="rounded-2xl bg-[#F4F9FD] border border-sky-100 p-4 h-64 sm:h-72 flex items-center justify-center">
                <img
                  src={modalActiveImage || selectedSpecModel.image}
                  alt={selectedSpecModel.name}
                  loading="eager"
                  decoding="sync"
                  className="max-h-full max-w-full object-contain select-none drop-shadow-sm"
                />
              </div>

              {/* Informação Estática de Cores (NÃO CLICÁVEL) */}
              {selectedSpecModel.colors && selectedSpecModel.colors.length > 0 && (
                <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-100 text-xs text-slate-700 flex items-center justify-between">
                  <span className="font-semibold text-slate-500">Cores disponíveis:</span>
                  <span className="font-bold text-[#003B66]">
                    {selectedSpecModel.colors.map((c) => c.name).join(', ')}
                  </span>
                </div>
              )}

              {/* Galeria de Fotos (Miniaturas daquele modelo) */}
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

            {/* Descrição Oficial */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Descrição</h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {selectedSpecModel.description}
              </p>
            </div>

            {/* Especificações Técnicas Oficiais */}
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

            {/* Valor e Botão Falar com Especialista */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  Valor
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
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all cursor-pointer transform hover:scale-105"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Falar com especialista</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
