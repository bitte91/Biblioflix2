import React, { useState } from 'react';

interface AiMediaStudioProps {
  onClose: () => void;
}

export const AiMediaStudio: React.FC<AiMediaStudioProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');

  // Image Generation State (gemini-3-pro-image-preview)
  const [imagePrompt, setImagePrompt] = useState('Uma ilustração cinematográfica impressionante da travessia do Mar Vermelho, luz divina dourada nas águas altas, estilo arte bíblica hiper-detalhada');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('2K');
  const [imageAspect, setImageAspect] = useState<'1:1' | '16:9' | '9:16'>('1:1');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  // Video Generation State (veo-3.1-fast-generate-preview)
  const [videoPrompt, setVideoPrompt] = useState('Animação cinematográfica em câmera lenta, água em movimento realista, partículas de luz brilhantes e névoa épica sobre o cenário');
  const [videoAspect, setVideoAspect] = useState<'16:9' | '9:16'>('16:9');
  const [customImageBase64, setCustomImageBase64] = useState<string | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [videoStatusMsg, setVideoStatusMsg] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  // Handle Image Generation API Call
  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    setIsGeneratingImage(true);
    setImageError(null);

    try {
      const res = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: imagePrompt,
          size: imageSize,
          aspectRatio: imageAspect,
        }),
      });

      const data = await res.json();
      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
      } else {
        setImageError(data.error || 'Erro inesperado ao gerar imagem.');
      }
    } catch (err: any) {
      setImageError(err.message || 'Falha ao conectar com o servidor.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Handle Video Generation API Call (Veo 3.1)
  const handleGenerateVideo = async () => {
    setIsGeneratingVideo(true);
    setVideoError(null);
    setVideoStatusMsg('Iniciando renderização de vídeo Veo (veo-3.1-fast-generate-preview)...');

    try {
      const imageToAnimate = customImageBase64 || generatedImage || undefined;

      const res = await fetch('/api/ai/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: videoPrompt,
          imageBase64: imageToAnimate,
          aspectRatio: videoAspect,
        }),
      });

      const data = await res.json();
      if (data.videoUrl) {
        setGeneratedVideoUrl(data.videoUrl);
        setVideoStatusMsg('Vídeo gerado com sucesso!');
      } else if (data.message) {
        setVideoStatusMsg(data.message);
      } else {
        setVideoError(data.error || 'Erro ao processar vídeo Veo.');
      }
    } catch (err: any) {
      setVideoError(err.message || 'Falha ao comunicar com o modelo Veo.');
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  // Handle Image Upload for Veo animation
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0b0d0d] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl my-6">
        {/* Header */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-black font-bold shadow-lg shadow-amber-500/20">
              <span className="material-symbols-outlined">movie</span>
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                IA Studio <span className="text-xs font-sans font-semibold bg-amber-500/20 text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-500/30">Gemini 3 Pro & Veo 3.1</span>
              </h2>
              <p className="text-xs text-zinc-400">
                Gere ilustrações bíblicas em alta definição e anime imagens em vídeos cinematográficos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black transition-all flex items-center justify-center text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Studio Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-black/50">
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 py-3.5 text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2 ${
              activeTab === 'image'
                ? 'border-amber-500 text-amber-400 bg-amber-500/10'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-lg">image</span>
            1. Gerar Ilustrações e Capas (Gemini 3 Pro - 1K, 2K, 4K)
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`flex-1 py-3.5 text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2 ${
              activeTab === 'video'
                ? 'border-red-500 text-red-400 bg-red-500/10'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-lg">movie</span>
            2. Animar Imagem em Vídeo (Veo 3.1 - 16:9 / 9:16)
          </button>
        </div>

        {/* Tab 1: Image Generation */}
        {activeTab === 'image' && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Controls Form */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                    Descrição da Cena / Ilustração
                  </label>
                  <textarea
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    rows={4}
                    placeholder="Descreva a cena bíblica, capa de livro ou ilustração desejada..."
                    className="w-full bg-zinc-900 border border-white/10 rounded-2xl p-3.5 text-xs md:text-sm text-white focus:outline-none focus:border-amber-500 transition-all resize-none"
                  />
                </div>

                {/* MANDATORY AFFORDANCE FOR IMAGE SIZE: 1K, 2K, 4K */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center justify-between">
                    <span>Resolução de Imagem (gemini-3-pro-image-preview)</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Alta Precisão</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['1K', '2K', '4K'] as const).map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setImageSize(sz)}
                        className={`py-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-0.5 transition-all ${
                          imageSize === sz
                            ? 'bg-amber-500 text-black border-amber-400 shadow-md shadow-amber-500/20'
                            : 'bg-zinc-900 border-white/10 text-zinc-300 hover:border-amber-500/50'
                        }`}
                      >
                        <span className="text-sm">{sz}</span>
                        <span className="text-[9px] opacity-75 font-mono">
                          {sz === '1K' ? '1024px' : sz === '2K' ? '2048px' : '3840px'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aspect Ratio */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Proporção da Imagem
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: '1:1', label: '1:1 (Quadrado)' },
                      { id: '16:9', label: '16:9 (Paisagem)' },
                      { id: '9:16', label: '9:16 (Retrato)' },
                    ].map((asp) => (
                      <button
                        key={asp.id}
                        type="button"
                        onClick={() => setImageAspect(asp.id as any)}
                        className={`py-2 rounded-xl border text-xs font-semibold transition-all ${
                          imageAspect === asp.id
                            ? 'bg-zinc-700 border-amber-500 text-amber-300'
                            : 'bg-zinc-900 border-white/10 text-zinc-400'
                        }`}
                      >
                        {asp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Prompts */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-2">Sugestões de Prompts Bíblicos & Literários:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Cena bíblica da Arca de Noé ao amanhecer',
                      'Davi e Golias no vale de Elá estilo neo-renascentista',
                      'Capa futurista para livro de Inteligência Artificial no Trabalho',
                      'A Arca da Aliança brilhando em ouro no Tabernáculo',
                    ].map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => setImagePrompt(preset)}
                        className="text-[10px] bg-zinc-900 border border-white/10 hover:border-amber-500/50 text-zinc-300 px-2.5 py-1 rounded-lg transition-all text-left"
                      >
                        + {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-amber-500/20 disabled:opacity-50 transition-all text-sm uppercase tracking-wider"
                >
                  {isGeneratingImage ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">sync</span>
                      Gerando Imagem {imageSize} com Gemini 3 Pro...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">auto_awesome</span>
                      Gerar Imagem de Alta Qualidade ({imageSize})
                    </>
                  )}
                </button>

                {imageError && (
                  <p className="text-xs text-red-400 bg-red-950/50 p-3 rounded-xl border border-red-500/30">
                    {imageError}
                  </p>
                )}
              </div>

              {/* Image Preview Canvas */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center bg-zinc-950 border border-white/10 rounded-2xl p-6 min-h-[360px] relative">
                {generatedImage ? (
                  <div className="w-full space-y-4 flex flex-col items-center">
                    <div className="relative rounded-2xl overflow-hidden border border-amber-500/40 shadow-2xl max-h-[400px]">
                      <img
                        src={generatedImage}
                        alt="Imagem Gerada"
                        className="w-full h-full object-contain"
                      />
                      <span className="absolute top-3 right-3 bg-black/80 text-amber-400 font-mono text-[10px] font-bold px-2 py-1 rounded border border-amber-500/30">
                        QUALIDADE {imageSize}
                      </span>
                    </div>

                    <div className="flex gap-3 w-full">
                      <a
                        href={generatedImage}
                        download="biblioflix-ilustracao.jpg"
                        className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all text-center"
                      >
                        <span className="material-symbols-outlined text-sm">download</span>
                        Baixar Imagem {imageSize}
                      </a>
                      <button
                        onClick={() => {
                          setCustomImageBase64(generatedImage);
                          setActiveTab('video');
                        }}
                        className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 hover:brightness-110 transition-all"
                      >
                        <span className="material-symbols-outlined text-sm">movie</span>
                        Animar no Veo Vídeo
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-3 p-6 text-zinc-500">
                    <span className="material-symbols-outlined text-5xl text-amber-500/40">
                      palette
                    </span>
                    <p className="text-xs max-w-xs">
                      Sua ilustração ou capa gerada em {imageSize} pelo modelo <strong className="text-amber-400">gemini-3-pro-image-preview</strong> aparecerá aqui.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Video Generation (Veo) */}
        {activeTab === 'video' && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Video Controls */}
              <div className="lg:col-span-6 space-y-5">
                {/* Upload or Selected Image preview */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-red-400 mb-2">
                    1. Imagem de Origem para Animar
                  </label>
                  <div className="flex items-center gap-4 p-3 bg-zinc-900 rounded-2xl border border-white/10">
                    <div className="w-16 h-16 rounded-xl bg-zinc-800 overflow-hidden flex-shrink-0 border border-white/10 relative">
                      {customImageBase64 || generatedImage ? (
                        <img
                          src={customImageBase64 || generatedImage || ''}
                          alt="Origin"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600">
                          <span className="material-symbols-outlined">image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-xs font-semibold text-white truncate">
                        {customImageBase64 ? 'Imagem Carregada do Computador' : generatedImage ? 'Imagem Gerada pelo Gemini 3 Pro' : 'Nenhuma imagem selecionada'}
                      </p>
                      <label className="inline-block text-[11px] text-amber-400 hover:underline cursor-pointer font-bold">
                        <span>Carregar outra imagem...</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Video Prompt */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-red-400 mb-2">
                    2. Instruções de Animação / Movimento
                  </label>
                  <textarea
                    value={videoPrompt}
                    onChange={(e) => setVideoPrompt(e.target.value)}
                    rows={3}
                    placeholder="Descreva o movimento da câmera, ventos, luzes e efeitos cinematográficos..."
                    className="w-full bg-zinc-900 border border-white/10 rounded-2xl p-3.5 text-xs md:text-sm text-white focus:outline-none focus:border-red-500 transition-all resize-none"
                  />
                </div>

                {/* MANDATORY ASPECT RATIO SELECTION FOR VEO: 16:9 vs 9:16 */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                    Proporção do Vídeo Veo (veo-3.1-fast-generate-preview)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setVideoAspect('16:9')}
                      className={`py-3.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        videoAspect === '16:9'
                          ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30'
                          : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-red-500/50'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">tv</span>
                      16:9 (Paisagem / Cinema)
                    </button>

                    <button
                      type="button"
                      onClick={() => setVideoAspect('9:16')}
                      className={`py-3.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        videoAspect === '9:16'
                          ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30'
                          : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-red-500/50'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">smartphone</span>
                      9:16 (Retrato / Stories)
                    </button>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={handleGenerateVideo}
                  disabled={isGeneratingVideo}
                  className="w-full py-4 bg-gradient-to-r from-red-600 via-orange-600 to-amber-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-red-600/30 disabled:opacity-50 transition-all text-sm uppercase tracking-wider"
                >
                  {isGeneratingVideo ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">sync</span>
                      Processando Vídeo Veo 3.1 ({videoAspect})...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">movie</span>
                      Gerar Vídeo com Veo 3.1 Fast ({videoAspect})
                    </>
                  )}
                </button>

                {videoStatusMsg && (
                  <p className="text-xs text-amber-300 bg-amber-950/40 p-3 rounded-xl border border-amber-500/30 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">info</span>
                    {videoStatusMsg}
                  </p>
                )}

                {videoError && (
                  <p className="text-xs text-red-400 bg-red-950/50 p-3 rounded-xl border border-red-500/30">
                    {videoError}
                  </p>
                )}
              </div>

              {/* Video Preview Canvas */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center bg-zinc-950 border border-white/10 rounded-2xl p-6 min-h-[360px] relative">
                {generatedVideoUrl ? (
                  <div className="w-full space-y-4 flex flex-col items-center">
                    <div
                      className={`relative rounded-2xl overflow-hidden border border-red-500/40 shadow-2xl bg-black ${
                        videoAspect === '9:16' ? 'max-w-[240px] aspect-[9/16]' : 'w-full aspect-[16/9]'
                      }`}
                    >
                      <video
                        src={generatedVideoUrl}
                        controls
                        autoPlay
                        loop
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <a
                      href={generatedVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all text-center"
                    >
                      <span className="material-symbols-outlined text-sm">download</span>
                      Baixar Vídeo Veo ({videoAspect})
                    </a>
                  </div>
                ) : (
                  <div className="text-center space-y-3 p-6 text-zinc-500">
                    <span className="material-symbols-outlined text-5xl text-red-500/40">
                      movie_filter
                    </span>
                    <p className="text-xs max-w-xs">
                      O vídeo Veo animado no formato <strong className="text-red-400">{videoAspect}</strong> com o modelo <strong className="text-amber-400">veo-3.1-fast-generate-preview</strong> será exibido aqui.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
