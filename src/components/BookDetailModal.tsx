import React from 'react';
import { Book } from '../data/libraryData';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
  onStartReading: (book: Book, chapterIndex?: number) => void;
  onPlayAudio: (book: Book) => void;
  isFavorite: boolean;
  onToggleFavorite: (bookId: string) => void;
  allBooks: Book[];
  onSelectSimilarBook: (book: Book) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  onStartReading,
  onPlayAudio,
  isFavorite,
  onToggleFavorite,
  allBooks,
  onSelectSimilarBook,
}) => {
  if (!book) return null;

  const similarBooks = allBooks
    .filter((b) => b.id !== book.id && (b.category === book.category || b.type === book.type))
    .slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#0e1010] border border-white/10 rounded-3xl overflow-hidden shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/10 text-white hover:bg-amber-500 hover:text-black flex items-center justify-center transition-all"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Top Hero Section */}
        <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-gradient-to-b from-zinc-900/80 to-transparent relative">
          {/* Ambient Glow */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Left Cover */}
          <div className="md:col-span-4 relative group max-w-xs mx-auto md:max-w-none">
            <div className="aspect-[2/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-800 relative">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-[10px] text-amber-400 font-mono tracking-widest uppercase">
                  {book.type === 'bible' ? 'Texto Sagrado' : 'Edição Digital'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Details */}
          <div className="md:col-span-8 flex flex-col justify-center space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              {book.isBestSeller && (
                <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Best Seller
                </span>
              )}
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {book.category}
              </span>
              <span className="bg-sky-500/20 text-sky-400 border border-sky-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {book.type === 'bible' ? 'Bíblia Sagrada' : 'Ebook Streaming'}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
              {book.title}
            </h1>

            <p className="text-base font-medium text-zinc-400">
              {book.author} {book.year ? `• ${book.year}` : ''}
            </p>

            {/* Rating & Tag */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-amber-400">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="font-bold">{book.rating}</span>
                <span className="text-zinc-500 text-xs">({book.ratingCount} avaliações)</span>
              </div>
              <span className="text-zinc-600">|</span>
              <span className="text-emerald-400 font-semibold text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                100% Disponível no Streaming
              </span>
            </div>

            {/* Synopsis */}
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed max-w-2xl">
              {book.synopsis}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onStartReading(book, 0)}
                className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-amber-500/20"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  menu_book
                </span>
                Começar a Ler
              </button>

              <button
                onClick={() => onPlayAudio(book)}
                className="px-6 py-3.5 bg-zinc-800/80 border border-white/10 text-white font-semibold rounded-xl flex items-center gap-2 hover:bg-zinc-700 transition-all"
              >
                <span className="material-symbols-outlined text-amber-400">
                  volume_up
                </span>
                Ouvir Áudio
              </button>

              <button
                onClick={() => onToggleFavorite(book.id)}
                className={`p-3.5 rounded-xl border transition-all flex items-center justify-center ${
                  isFavorite
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                    : 'bg-zinc-800/80 border-white/10 text-zinc-300 hover:text-white'
                }`}
                title={isFavorite ? 'Remover da Minha Lista' : 'Adicionar à Minha Lista'}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}>
                  bookmark
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Insight Cards (Bento Style from Screenshots) */}
        <div className="p-6 md:p-10 border-t border-white/10 bg-black/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="p-5 rounded-2xl bg-zinc-900/70 border-l-4 border-amber-500 border-y border-r border-white/5">
              <span className="material-symbols-outlined text-amber-400 mb-2">psychology</span>
              <h3 className="text-sm font-bold text-white mb-1">AI Insights</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{book.aiInsights}</p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/70 border-l-4 border-red-500 border-y border-r border-white/5">
              <span className="material-symbols-outlined text-red-400 mb-2">timer</span>
              <h3 className="text-sm font-bold text-white mb-1">Tempo de Leitura</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Estimado em {book.readingTime} para absorção total dos conceitos e anotações ativas.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/70 border-l-4 border-sky-400 border-y border-r border-white/5">
              <span className="material-symbols-outlined text-sky-400 mb-2">auto_stories</span>
              <h3 className="text-sm font-bold text-white mb-1">Formato Disponível</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {book.format}. Suporta assistente IA em tempo real e narração por voz.
              </p>
            </div>
          </div>

          {/* Chapters / Sections List */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400">list_alt</span>
              Índice de Capítulos ({book.chapters.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {book.chapters.map((chap, idx) => (
                <button
                  key={idx}
                  onClick={() => onStartReading(book, idx)}
                  className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5 hover:border-amber-500/50 hover:bg-zinc-800 text-left transition-all flex items-center justify-between group"
                >
                  <div>
                    <p className="text-xs font-bold text-amber-400 mb-0.5">
                      Capítulo {chap.number}
                    </p>
                    <p className="text-sm font-medium text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {chap.title || `Capítulo ${chap.number}`}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-zinc-500 group-hover:text-amber-400 transition-colors text-lg">
                    arrow_forward
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Similar Books */}
          {similarBooks.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  EXPANDIR CONHECIMENTO
                </span>
                <h3 className="text-lg font-serif font-bold text-white">Livros & Bíblias Similares</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {similarBooks.map((simBook) => (
                  <div
                    key={simBook.id}
                    onClick={() => onSelectSimilarBook(simBook)}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-[2/3] rounded-xl overflow-hidden mb-2 relative border border-white/10 bg-zinc-800 transition-transform duration-300 group-hover:-translate-y-1 group-hover:border-amber-500/50">
                      <img
                        src={simBook.coverUrl}
                        alt={simBook.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                        <span className="text-[11px] font-bold text-amber-400 text-center">
                          Ver Detalhes
                        </span>
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                      {simBook.title}
                    </p>
                    <p className="text-[10px] text-zinc-400 line-clamp-1">{simBook.author}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
