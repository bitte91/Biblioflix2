import React from 'react';

interface PremiumModalProps {
  onClose: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-3xl bg-[#0f1112] border border-amber-500/40 rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black transition-all flex items-center justify-center text-white"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="text-center space-y-3 mb-8">
          <span className="px-3 py-1 bg-amber-500/20 text-amber-400 font-bold text-xs uppercase tracking-widest rounded-full border border-amber-500/30">
            Biblioflix VIP Pass
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
            Eleve sua Leitura & Estudo ao Próximo Nível
          </h2>
          <p className="text-sm text-zinc-400 max-w-lg mx-auto">
            Acesso ilimitado ao acervo completo de Bíblias de Estudo, Audiobíblias, Análise de Texto com IA e Geração de Vídeos Veo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Plan 1 */}
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-white/10 hover:border-amber-500/40 transition-all space-y-4">
            <h3 className="text-lg font-bold text-white">Plano Anual Premium</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-amber-400">R$ 29,90</span>
              <span className="text-xs text-zinc-400">/ mês (faturado anualmente)</span>
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-300">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 text-sm">check_circle</span>
                Acesso ilimitado a todas as Bíblias e Livros
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 text-sm">check_circle</span>
                Assistente Biblioflix AI em tempo real
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 text-sm">check_circle</span>
                Geração de imagens em 1K, 2K e 4K (Gemini 3 Pro)
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 text-sm">check_circle</span>
                Renderização de Vídeos Veo 3.1 em 16:9 e 9:16
              </li>
            </ul>
            <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-xl hover:brightness-110 shadow-lg shadow-amber-500/20 text-xs uppercase tracking-wider">
              Assinar Plano Anual
            </button>
          </div>

          {/* Plan 2 */}
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-amber-500/20 transition-all space-y-4">
            <h3 className="text-lg font-bold text-white">Plano Mensal</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-white">R$ 39,90</span>
              <span className="text-xs text-zinc-400">/ mês</span>
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                Bíblias & Livros no Streaming
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                Assistente IA Básico
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                Sem fidelidade, cancele quando quiser
              </li>
            </ul>
            <button className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all">
              Assinar Mensal
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] text-zinc-500">
          Pagamento seguro via Cartão de Crédito ou PIX. Satisfação garantida de 7 dias.
        </p>
      </div>
    </div>
  );
};
