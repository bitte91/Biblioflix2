import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { BookDetailModal } from './components/BookDetailModal';
import { ReaderCanvas } from './components/ReaderCanvas';
import { AiMediaStudio } from './components/AiMediaStudio';
import { PremiumModal } from './components/PremiumModal';
import { BOOKS_DATABASE, CATEGORIES, Book, Chapter } from './data/libraryData';

export default function App() {
  const [currentView, setCurrentView] = useState('inicio');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Modals & States
  const [selectedBookModal, setSelectedBookModal] = useState<Book | null>(null);
  const [activeReaderBook, setActiveReaderBook] = useState<Book | null>(null);
  const [readerChapterIndex, setReaderChapterIndex] = useState(0);

  // Streaming Audio
  const [audioBook, setAudioBook] = useState<Book | null>(BOOKS_DATABASE[0]);
  const [audioChapter, setAudioChapter] = useState<Chapter | null>(BOOKS_DATABASE[0].chapters[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // User State: Favorites & Highlights
  const [favoriteBookIds, setFavoriteBookIds] = useState<string[]>([
    'biblia-estudo-global',
    'pai-rico-pai-pobre',
    'foco',
  ]);
  const [savedHighlights, setSavedHighlights] = useState<any[]>([
    {
      id: '1',
      bookTitle: 'Bíblia de Estudo Global',
      verseOrParagraph: 'Salmos 23:1',
      text: 'O SENHOR é o meu pastor; nada me faltará.',
      color: '#f59e0b',
      note: 'Minha passagem de confiança diária.',
      date: '21/07/2026',
    },
    {
      id: '2',
      bookTitle: 'Pai Rico, Pai Pobre',
      verseOrParagraph: 'Capítulo 1',
      text: 'A verdadeira riqueza vem da criação de ativos que geram renda passiva.',
      color: '#38bdf8',
      note: 'Conceito chave sobre ativos vs passivos.',
      date: '20/07/2026',
    },
  ]);

  // AI Media Studio Modal State
  const [showMediaStudio, setShowMediaStudio] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  // Toggle favorite
  const handleToggleFavorite = (bookId: string) => {
    setFavoriteBookIds((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  // Start reading
  const handleStartReading = (book: Book, chapterIndex: number = 0) => {
    setActiveReaderBook(book);
    setReaderChapterIndex(chapterIndex);
    setSelectedBookModal(null);
  };

  // Audio Playback
  const handlePlayAudio = (book: Book, chapter?: Chapter) => {
    setAudioBook(book);
    setAudioChapter(chapter || book.chapters[0]);
    setIsPlayingAudio(true);
  };

  // Save highlight note
  const handleSaveHighlight = (item: any) => {
    setSavedHighlights((prev) => [item, ...prev]);
  };

  // Filter books based on search & category
  const filteredBooks = BOOKS_DATABASE.filter((b) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      !selectedCategory ||
      b.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const favoriteBooks = BOOKS_DATABASE.filter((b) => favoriteBookIds.includes(b.id));
  const continueReadingBooks = BOOKS_DATABASE.filter((b) => (b.progressPercent || 0) > 0);
  const fixedBibles = BOOKS_DATABASE.filter((b) => b.type === 'bible');

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Top Bar Navigation */}
      <Header
        currentView={currentView}
        setCurrentView={(v) => {
          setCurrentView(v);
          setSelectedCategory(null);
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenMediaStudio={() => setShowMediaStudio(true)}
        savedNotesCount={savedHighlights.length}
        favoritesCount={favoriteBookIds.length}
      />

      <div className="flex flex-1 pt-16 pb-24">
        {/* Left Navigation Rail / Sidebar */}
        <Sidebar
          currentView={currentView}
          setCurrentView={(v) => {
            setCurrentView(v);
            setSelectedCategory(null);
          }}
          onOpenMediaStudio={() => setShowMediaStudio(true)}
          onOpenPremiumModal={() => setShowPremiumModal(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 md:ml-64 px-4 sm:px-8 lg:px-12 py-8 overflow-x-hidden">
          {/* 1. INÍCIO (HOME VIEW) */}
          {currentView === 'inicio' && (
            <div className="space-y-12 animate-fade-in">
              {/* Featured Hero Card (Immersive UI Banner) */}
              <section className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border border-amber-500/30 p-8 sm:p-12 shadow-2xl flex items-center group">
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10"></div>
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700"></div>

                {/* Background Ambient Blur */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none z-10"></div>

                <div className="relative z-20 max-w-2xl space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold tracking-widest uppercase rounded-full border border-amber-500/30 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                      Lançamento Exclusivo & Bíblia Fixa
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
                    Aprenda no seu ritmo com o Biblioflix
                  </h1>

                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                    Acesse Bíblias de estudo com contexto arqueológico, comentários exegéticos e e-books selecionados para acelerar seu conhecimento com IA.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      onClick={() => handleStartReading(BOOKS_DATABASE[0], 0)}
                      className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-full hover:brightness-110 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                        play_arrow
                      </span>
                      Começar Leitura
                    </button>

                    <button
                      onClick={() => setSelectedBookModal(BOOKS_DATABASE[0])}
                      className="px-8 py-3.5 bg-zinc-900/80 backdrop-blur text-white font-semibold rounded-full border border-white/20 hover:bg-zinc-800 transition-all"
                    >
                      Ver Detalhes da Bíblia
                    </button>
                  </div>
                </div>
              </section>

              {/* Bíblias Fixas Highlighting Row */}
              <section className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-amber-400 block mb-1">
                      Edições Principais
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-white">Bíblias Fixas de Estudo</h2>
                  </div>
                  <button
                    onClick={() => setCurrentView('biblias')}
                    className="text-amber-400 hover:underline text-xs font-bold flex items-center gap-1"
                  >
                    Ver todas <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fixedBibles.map((bible) => (
                    <div
                      key={bible.id}
                      onClick={() => setSelectedBookModal(bible)}
                      className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/90 to-black border border-amber-500/30 hover:border-amber-500 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-center gap-6 group shadow-xl"
                    >
                      <div className="w-28 h-40 rounded-xl overflow-hidden border border-white/10 shadow-2xl flex-shrink-0 relative">
                        <img
                          src={bible.coverUrl}
                          alt={bible.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <span className="absolute top-2 left-2 bg-amber-500 text-black font-bold text-[9px] px-1.5 py-0.5 rounded">
                          FIXA
                        </span>
                      </div>
                      <div className="space-y-2 flex-1 text-center sm:text-left">
                        <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                          {bible.category}
                        </span>
                        <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                          {bible.title}
                        </h3>
                        <p className="text-xs text-zinc-400 line-clamp-2">{bible.synopsis}</p>
                        <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartReading(bible, 0);
                            }}
                            className="px-4 py-2 bg-amber-500 text-black font-bold text-xs rounded-lg hover:brightness-110 transition-all flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-sm">menu_book</span>
                            Ler Bíblia
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayAudio(bible);
                            }}
                            className="px-4 py-2 bg-zinc-800 text-white font-semibold text-xs rounded-lg border border-white/10 hover:bg-zinc-700 transition-all flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-sm">volume_up</span>
                            Audiobíblia
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Continue Lendo Carousel Section */}
              {continueReadingBooks.length > 0 && (
                <section className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-amber-400">history</span>
                      Continue Lendo
                    </h2>
                    <span className="text-xs text-zinc-500 font-mono">Progresso Salvo</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
                    {continueReadingBooks.map((book) => (
                      <div
                        key={book.id}
                        onClick={() => setSelectedBookModal(book)}
                        className="group cursor-pointer bg-zinc-900/60 rounded-2xl p-3 border border-white/5 hover:border-amber-500/40 transition-all"
                      >
                        <div className="aspect-[2/3] rounded-xl overflow-hidden mb-3 relative bg-zinc-800">
                          <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartReading(book, 0);
                              }}
                              className="w-full py-1.5 bg-amber-500 text-black font-bold text-xs rounded-lg shadow"
                            >
                              Retomar Leitura
                            </button>
                          </div>
                        </div>

                        <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                          {book.title}
                        </h4>
                        <p className="text-[10px] text-zinc-400 mb-2">{book.author}</p>

                        {/* Progress bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                            <span>Concluído</span>
                            <span className="text-amber-400 font-bold">{book.progressPercent}%</span>
                          </div>
                          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                              style={{ width: `${book.progressPercent}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Categorias Bento Grid */}
              <section className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-white">Principais Categorias</h2>
                    <p className="text-xs text-zinc-400">Selecione uma área para filtrar os materiais</p>
                  </div>
                  <button
                    onClick={() => setCurrentView('categorias')}
                    className="text-amber-400 text-xs font-bold hover:underline flex items-center gap-1"
                  >
                    Ver todas
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {CATEGORIES.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setCurrentView('biblioteca');
                      }}
                      className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-amber-500/60 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-lg relative overflow-hidden"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-amber-400 text-2xl">
                          {cat.icon}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">{cat.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* All Books Carousel / Grid */}
              <section className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-serif font-bold text-white">Recomendados no Streaming</h2>
                  <button
                    onClick={() => setCurrentView('biblioteca')}
                    className="text-amber-400 hover:underline text-xs font-bold"
                  >
                    Explorar Acervo Completo
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                  {BOOKS_DATABASE.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => setSelectedBookModal(book)}
                      className="group cursor-pointer"
                    >
                      <div className="aspect-[2/3] rounded-xl overflow-hidden mb-2 relative border border-white/10 bg-zinc-800 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-amber-500/50 shadow-xl">
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartReading(book, 0);
                            }}
                            className="w-full py-2 bg-amber-500 text-black font-bold text-xs rounded-lg shadow"
                          >
                            Ler Agora
                          </button>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                        {book.title}
                      </p>
                      <p className="text-[10px] text-zinc-400">{book.author}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Banner Novidade Exclusiva */}
              <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-red-950/40 via-zinc-900 to-black border border-red-600/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                <div className="space-y-4 max-w-xl">
                  <span className="px-3 py-1 bg-red-600/20 text-red-400 font-bold text-[10px] uppercase tracking-widest rounded border border-red-600/30">
                    Novidade Exclusiva Biblioflix
                  </span>
                  <h2 className="text-3xl font-serif font-bold text-white">Marketing para Vender Mais</h2>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    O guia definitivo para transformar tráfego em vendas reais através de copywriting estratégico e análise de dados em tempo real.
                  </p>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => handleStartReading(BOOKS_DATABASE.find((b) => b.id === 'marketing-vender-mais') || BOOKS_DATABASE[0])}
                      className="px-6 py-3 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-500 transition-all shadow-lg shadow-red-600/20"
                    >
                      Começar Leitura
                    </button>
                    <button
                      onClick={() => setSelectedBookModal(BOOKS_DATABASE.find((b) => b.id === 'marketing-vender-mais') || null)}
                      className="px-6 py-3 bg-zinc-800 text-zinc-300 font-bold text-xs rounded-xl border border-white/10 hover:text-white"
                    >
                      Mais Informações
                    </button>
                  </div>
                </div>

                <div className="w-48 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-red-500/40 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkVIyxkRrKbqBTT1qV8S4119i6BL5ftaS7hXLHLNZWvWfWp3rbIiQ7x-LS3_bvbNE9IWZ8Pg0dEWo2ClyrxLGrKTWVlRR7Q1xZenR0ODn8bWpXNayuwRsg7WLX-bcQPP5gV9-nYH5tnENkWWXpxbwXafgK3FQOkoPFwbYz8XVfD6vPWv3L_xoH3nR7OmYJ3IBAQXAJVOOIaHJzUmnA7JdHmmAFY13THTSUnoSdEbJlw0bsx5F4pw1eig"
                    alt="Marketing para Vender Mais"
                    className="w-full h-full object-cover"
                  />
                </div>
              </section>
            </div>
          )}

          {/* 2. BIBLIOTECA (FULL CATALOG VIEW) */}
          {currentView === 'biblioteca' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-white">Acervo da Biblioteca</h1>
                  <p className="text-xs text-zinc-400">
                    Explore Bíblias de estudo, literatura e-books e originais do streaming
                  </p>
                </div>

                {/* Category Pills Filter */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      !selectedCategory
                        ? 'bg-amber-500 text-black'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    Todos
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        selectedCategory === cat.name
                          ? 'bg-amber-500 text-black'
                          : 'bg-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Books Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => setSelectedBookModal(book)}
                    className="group cursor-pointer bg-zinc-900/50 p-3 rounded-2xl border border-white/5 hover:border-amber-500/40 transition-all"
                  >
                    <div className="aspect-[2/3] rounded-xl overflow-hidden mb-3 relative bg-zinc-800 shadow-xl">
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      {book.type === 'bible' && (
                        <span className="absolute top-2 left-2 bg-amber-500 text-black text-[9px] font-bold px-2 py-0.5 rounded shadow">
                          BÍBLIA
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartReading(book, 0);
                          }}
                          className="w-full py-2 bg-amber-500 text-black font-bold text-xs rounded-lg"
                        >
                          Ler
                        </button>
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs text-zinc-400">{book.author}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. BÍBLIAS FIXAS VIEW */}
          {currentView === 'biblias' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-white/10 pb-6">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                  Texto Sagrado no Streaming
                </span>
                <h1 className="text-3xl font-serif font-bold text-white">Bíblias de Estudo Fixas</h1>
                <p className="text-xs text-zinc-400">
                  Edições definitivas para estudo comparativo, devocionais diários e narração por áudio
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {fixedBibles.map((bible) => (
                  <div
                    key={bible.id}
                    className="p-8 rounded-3xl bg-zinc-900/80 border border-amber-500/30 space-y-6 shadow-2xl relative overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row gap-6 items-center">
                      <div className="w-36 h-52 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex-shrink-0">
                        <img
                          src={bible.coverUrl}
                          alt={bible.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-3 flex-1 text-center sm:text-left">
                        <span className="px-3 py-1 bg-amber-500/20 text-amber-400 font-bold text-[10px] uppercase rounded-full border border-amber-500/30">
                          {bible.author}
                        </span>
                        <h2 className="text-2xl font-serif font-bold text-white">{bible.title}</h2>
                        <p className="text-xs text-zinc-300 leading-relaxed">{bible.synopsis}</p>
                        <div className="flex flex-wrap gap-3 pt-2">
                          <button
                            onClick={() => handleStartReading(bible, 0)}
                            className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-xs rounded-xl hover:brightness-110 flex items-center gap-1.5"
                          >
                            <span className="material-symbols-outlined text-sm">menu_book</span>
                            Abrir Leitor
                          </button>
                          <button
                            onClick={() => handlePlayAudio(bible)}
                            className="px-5 py-2.5 bg-zinc-800 border border-white/10 text-white font-semibold text-xs rounded-xl hover:bg-zinc-700 flex items-center gap-1.5"
                          >
                            <span className="material-symbols-outlined text-amber-400 text-sm">volume_up</span>
                            Ouvir Audiobíblia
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <h4 className="text-xs font-bold uppercase text-amber-400 mb-3 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">auto_stories</span>
                        Capítulos e Passagens Rápidas
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {bible.chapters.map((chap, cIdx) => (
                          <button
                            key={cIdx}
                            onClick={() => handleStartReading(bible, cIdx)}
                            className="p-2.5 rounded-xl bg-black/60 border border-white/5 hover:border-amber-500/50 text-left transition-all text-xs"
                          >
                            <p className="font-bold text-white">{chap.title}</p>
                            <p className="text-[10px] text-zinc-400 truncate">{chap.subtitle}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. CATEGORIAS VIEW */}
          {currentView === 'categorias' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-white/10 pb-6">
                <h1 className="text-3xl font-serif font-bold text-white">Navegar por Categorias</h1>
                <p className="text-xs text-zinc-400">Escolha uma área de conhecimento para filtrar</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setCurrentView('biblioteca');
                    }}
                    className="p-6 rounded-2xl bg-zinc-900 border border-white/10 hover:border-amber-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-xl"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-400 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{cat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. MINHA LISTA VIEW */}
          {currentView === 'minha-lista' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-white/10 pb-6">
                <h1 className="text-3xl font-serif font-bold text-white">Minha Lista de Favoritos</h1>
                <p className="text-xs text-zinc-400">Bíblias e livros salvos para acesso rápido</p>
              </div>

              {favoriteBooks.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {favoriteBooks.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => setSelectedBookModal(book)}
                      className="group cursor-pointer bg-zinc-900/50 p-3 rounded-2xl border border-white/5 hover:border-amber-500/40 transition-all"
                    >
                      <div className="aspect-[2/3] rounded-xl overflow-hidden mb-3 relative bg-zinc-800">
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="text-xs font-bold text-white line-clamp-1">{book.title}</h3>
                      <p className="text-[10px] text-zinc-400">{book.author}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 space-y-3 text-zinc-500">
                  <span className="material-symbols-outlined text-5xl">bookmark_border</span>
                  <p className="text-sm">Nenhum título adicionado à sua lista ainda.</p>
                </div>
              )}
            </div>
          )}

          {/* 6. ANOTAÇÕES & MARCAÇÕES VIEW */}
          {currentView === 'anotacoes' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-white/10 pb-6 flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-white">Anotações & Destaques</h1>
                  <p className="text-xs text-zinc-400">Seus trechos marcados e reflexões salvas no leitor</p>
                </div>
                <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full border border-amber-500/30">
                  {savedHighlights.length} Nota(s)
                </span>
              </div>

              <div className="space-y-4">
                {savedHighlights.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 rounded-2xl bg-zinc-900/80 border-l-4 border-y border-r border-white/10 shadow-lg space-y-3"
                    style={{ borderLeftColor: item.color }}
                  >
                    <div className="flex justify-between items-center text-xs text-zinc-400 font-mono">
                      <span className="font-bold text-amber-400">{item.bookTitle}</span>
                      <span>{item.date}</span>
                    </div>

                    <blockquote className="text-sm md:text-base text-white italic bg-black/40 p-4 rounded-xl border border-white/5 leading-relaxed">
                      "{item.text}"
                    </blockquote>

                    {item.note && (
                      <div className="text-xs text-zinc-300 flex items-start gap-2 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                        <span className="material-symbols-outlined text-amber-400 text-sm">edit_note</span>
                        <div>
                          <strong className="block text-[10px] uppercase text-amber-400">Sua Nota:</strong>
                          <span>{item.note}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Persistent Audio Streaming Player Bar */}
      <AudioPlayerBar
        currentBook={audioBook}
        currentChapter={audioChapter}
        isPlaying={isPlayingAudio}
        onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
      />

      {/* Book Detail Modal */}
      {selectedBookModal && (
        <BookDetailModal
          book={selectedBookModal}
          onClose={() => setSelectedBookModal(null)}
          onStartReading={handleStartReading}
          onPlayAudio={handlePlayAudio}
          isFavorite={favoriteBookIds.includes(selectedBookModal.id)}
          onToggleFavorite={handleToggleFavorite}
          allBooks={BOOKS_DATABASE}
          onSelectSimilarBook={(b) => setSelectedBookModal(b)}
        />
      )}

      {/* Interactive Fullscreen Reader Canvas Mode */}
      {activeReaderBook && (
        <ReaderCanvas
          book={activeReaderBook}
          initialChapterIndex={readerChapterIndex}
          onClose={() => setActiveReaderBook(null)}
          onSaveHighlight={handleSaveHighlight}
          onPlayAudioChapter={handlePlayAudio}
        />
      )}

      {/* AI Media Studio (1K/2K/4K Images with Gemini 3 Pro & Veo Video Animation) */}
      {showMediaStudio && <AiMediaStudio onClose={() => setShowMediaStudio(false)} />}

      {/* Premium Subscription Modal */}
      {showPremiumModal && <PremiumModal onClose={() => setShowPremiumModal(false)} />}
    </div>
  );
}
