import React, { useState, useRef, useEffect } from 'react';
import { Book, Chapter, Verse } from '../data/libraryData';

interface HighlightItem {
  id: string;
  bookId: string;
  bookTitle: string;
  chapterNumber: number;
  verseOrParagraph: string;
  text: string;
  color: string;
  note?: string;
  date: string;
}

interface ReaderCanvasProps {
  book: Book;
  initialChapterIndex?: number;
  onClose: () => void;
  onSaveHighlight: (item: HighlightItem) => void;
  onPlayAudioChapter: (book: Book, chapter: Chapter) => void;
}

export const ReaderCanvas: React.FC<ReaderCanvasProps> = ({
  book,
  initialChapterIndex = 0,
  onClose,
  onSaveHighlight,
  onPlayAudioChapter,
}) => {
  const [chapterIndex, setChapterIndex] = useState(initialChapterIndex);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans' | 'mono'>('serif');
  const [paperTheme, setPaperTheme] = useState<'dark' | 'sepia' | 'obsidian'>('dark');

  // Text selection floating menu state
  const [selectedText, setSelectedText] = useState('');
  const [selectionPosition, setSelectionPosition] = useState<{ x: number; y: number } | null>(null);
  const [highlightColor, setHighlightColor] = useState('#f59e0b');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState('');

  // AI Assistant Sidebar state
  const [showAiSidebar, setShowAiSidebar] = useState(true);
  const [aiChatMessages, setAiChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `Olá! Sou a Biblioflix AI. Como posso ajudar com a sua leitura de "${book.title}"? Selecione trechos do texto para resumir, traduzir ou tirar dúvidas em tempo real.`,
    },
  ]);
  const [aiInput, setAiInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Text to speech
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentChapter = book.chapters[chapterIndex] || book.chapters[0];
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Handle Text Selection in Reader
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      const text = selection.toString().trim();
      setSelectedText(text);

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectionPosition({
        x: rect.left + rect.width / 2,
        y: Math.max(80, rect.top - 60),
      });
    } else {
      // Don't close immediately if clicking inside highlight popup
      if (!showNoteInput) {
        setSelectionPosition(null);
      }
    }
  };

  // Call Express Gemini API endpoint
  const askGemini = async (prompt: string, context?: string) => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          contextText: context || selectedText || currentChapter.verses?.map((v) => v.text).join(' ') || currentChapter.content?.join(' '),
          systemInstruction: `Você é a Biblioflix AI, um assistente teológico e literário erudito, empático e claro. Responda em Português sobre o livro "${book.title}".`,
        }),
      });

      const data = await res.json();
      if (data.text) {
        setAiChatMessages((prev) => [...prev, { sender: 'ai', text: data.text }]);
      } else {
        setAiChatMessages((prev) => [...prev, { sender: 'ai', text: data.error || 'Não foi possível obter resposta da IA.' }]);
      }
    } catch (err: any) {
      setAiChatMessages((prev) => [...prev, { sender: 'ai', text: 'Erro ao conectar ao serviço Biblioflix AI.' }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Quick AI Actions
  const handleQuickAction = (actionType: 'resumir' | 'citar' | 'traduzir' | 'questionario') => {
    const textToUse = selectedText || `Capítulo ${currentChapter.number}: ${currentChapter.title || ''}`;
    let prompt = '';

    if (actionType === 'resumir') {
      prompt = `Faça um resumo analítico, claro e direto em tópicos do trecho a seguir:`;
    } else if (actionType === 'citar') {
      prompt = `Gere uma citação acadêmica formatada (ABNT/APA e citação bíblica formal se aplicável) do trecho:`;
    } else if (actionType === 'traduzir') {
      prompt = `Forneça a tradução detalhada para o Inglês e Espanhol (e analise o significado original em Hebraico/Grego se for texto bíblico):`;
    } else if (actionType === 'questionario') {
      prompt = `Crie 3 perguntas e respostas de estudo bíblico/compreensão de leitura sobre o seguinte trecho:`;
    }

    setAiChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: `[Ação Rápida: ${actionType.toUpperCase()}] ${textToUse.slice(0, 100)}...` },
    ]);
    askGemini(prompt, textToUse);
    setShowAiSidebar(true);
    setSelectionPosition(null);
  };

  const handleSaveHighlightAction = () => {
    if (!selectedText) return;
    const newHighlight: HighlightItem = {
      id: Date.now().toString(),
      bookId: book.id,
      bookTitle: book.title,
      chapterNumber: currentChapter.number,
      verseOrParagraph: `Capítulo ${currentChapter.number}`,
      text: selectedText,
      color: highlightColor,
      note: noteText,
      date: new Date().toLocaleDateString('pt-BR'),
    };
    onSaveHighlight(newHighlight);
    setSelectionPosition(null);
    setShowNoteInput(false);
    setNoteText('');
  };

  // Text-to-speech for chapter
  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const fullText =
        currentChapter.verses?.map((v) => `${v.number}. ${v.text}`).join(' ') ||
        currentChapter.content?.join(' ') ||
        '';

      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Paper styling class
  const getPaperBg = () => {
    if (paperTheme === 'sepia') return 'bg-[#1a1815] text-[#e8ded1] border-amber-900/40';
    if (paperTheme === 'dark') return 'bg-[#121414] text-[#e2e2e2] border-white/10';
    return 'bg-[#050505] text-[#f1f1f1] border-zinc-800';
  };

  const getFontSizeClass = () => {
    if (fontSize === 'sm') return 'text-sm leading-relaxed';
    if (fontSize === 'lg') return 'text-lg leading-loose';
    if (fontSize === 'xl') return 'text-xl leading-loose';
    return 'text-base leading-relaxed';
  };

  const getFontFamilyClass = () => {
    if (fontFamily === 'sans') return 'font-sans';
    if (fontFamily === 'mono') return 'font-mono';
    return 'font-serif';
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] text-white flex flex-col h-screen overflow-hidden">
      {/* Top Reader Navbar */}
      <header className="h-16 bg-[#080808]/90 backdrop-blur-md border-b border-white/10 px-4 md:px-8 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-amber-500 hover:text-black transition-all flex items-center gap-1 text-xs font-bold"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Sair do Leitor
          </button>

          <div className="hidden sm:flex flex-col">
            <h2 className="text-sm font-bold text-white line-clamp-1">{book.title}</h2>
            <p className="text-[11px] text-amber-400">
              Capítulo {currentChapter.number} {currentChapter.title ? `— ${currentChapter.title}` : ''}
            </p>
          </div>
        </div>

        {/* Reader Customization Toolbar */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Chapter Selector */}
          <select
            value={chapterIndex}
            onChange={(e) => setChapterIndex(Number(e.target.value))}
            className="bg-zinc-900 border border-white/10 rounded-lg px-2 py-1 text-xs text-amber-400 font-semibold focus:outline-none focus:border-amber-500"
          >
            {book.chapters.map((chap, idx) => (
              <option key={idx} value={idx}>
                Cap. {chap.number} {chap.title ? `(${chap.title.slice(0, 20)}...)` : ''}
              </option>
            ))}
          </select>

          {/* Font Size controls */}
          <div className="hidden lg:flex items-center bg-zinc-900 border border-white/10 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setFontSize('sm')}
              className={`px-2 py-1 rounded ${fontSize === 'sm' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400'}`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('base')}
              className={`px-2 py-1 rounded ${fontSize === 'base' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400'}`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-2 py-1 rounded ${fontSize === 'lg' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400'}`}
            >
              A+
            </button>
          </div>

          {/* Audio TTS Button */}
          <button
            onClick={toggleSpeech}
            className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold ${
              isSpeaking
                ? 'bg-amber-500 text-black border-amber-400 shadow-md shadow-amber-500/30 animate-pulse'
                : 'bg-zinc-900 text-zinc-300 border-white/10 hover:text-white'
            }`}
            title="Ouvir Narração por Voz"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isSpeaking ? 'pause_circle' : 'volume_up'}
            </span>
            <span className="hidden sm:inline">{isSpeaking ? 'Pausar Áudio' : 'Ouvir Capítulo'}</span>
          </button>

          {/* Stream Audio Bar Trigger */}
          <button
            onClick={() => onPlayAudioChapter(book, currentChapter)}
            className="p-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-xs flex items-center gap-1 hover:brightness-110 shadow-md shadow-red-600/20"
            title="Tocar na Barra de Streaming de Áudio"
          >
            <span className="material-symbols-outlined text-[18px]">graphic_eq</span>
            <span className="hidden md:inline">Modo Stream Áudio</span>
          </button>

          {/* Toggle AI Sidebar */}
          <button
            onClick={() => setShowAiSidebar(!showAiSidebar)}
            className={`p-2 rounded-xl border transition-all flex items-center gap-1 text-xs font-bold ${
              showAiSidebar
                ? 'bg-sky-500/20 text-sky-400 border-sky-500'
                : 'bg-zinc-900 text-zinc-400 border-white/10'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">psychology</span>
            <span className="hidden sm:inline">Biblioflix AI</span>
          </button>
        </div>
      </header>

      {/* Reader Layout Main Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Book / Bible Page Canvas */}
        <div
          className="flex-1 overflow-y-auto p-4 md:p-10 flex justify-center custom-scrollbar"
          onMouseUp={handleMouseUp}
        >
          <div
            ref={textContainerRef}
            className={`w-full max-w-3xl p-6 md:p-12 rounded-3xl border ${getPaperBg()} ${getFontSizeClass()} ${getFontFamilyClass()} shadow-2xl transition-all my-4 relative min-h-[80vh]`}
          >
            {/* Header info inside book */}
            <div className="text-center mb-8 border-b border-white/10 pb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-500 font-bold block mb-1">
                {book.type === 'bible' ? 'Bíblia Sagrada' : 'Ebook Digital'}
              </span>
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight font-serif text-white mb-2">
                {currentChapter.title || `Capítulo ${currentChapter.number}`}
              </h1>
              {currentChapter.subtitle && (
                <p className="text-xs md:text-sm text-amber-400/80 font-mono italic">
                  {currentChapter.subtitle}
                </p>
              )}
            </div>

            {/* Verses mode (Bible) */}
            {currentChapter.verses && currentChapter.verses.length > 0 ? (
              <div className="space-y-4 text-justify">
                {currentChapter.verses.map((verse) => (
                  <p key={verse.number} className="group hover:bg-amber-500/10 p-1.5 rounded transition-colors relative">
                    <span className="font-bold text-amber-500 text-xs font-mono mr-2 select-none">
                      {verse.number}
                    </span>
                    <span>{verse.text}</span>
                  </p>
                ))}
              </div>
            ) : (
              /* Paragraphs mode (Ebook) */
              <div className="space-y-6 text-justify">
                {currentChapter.content?.map((paragraph, pIdx) => (
                  <p key={pIdx} className="first-letter:text-4xl first-letter:font-bold first-letter:text-amber-500 first-letter:mr-2 first-letter:float-left leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Bottom Chapter Navigation */}
            <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center text-xs font-bold text-zinc-400">
              <button
                disabled={chapterIndex === 0}
                onClick={() => setChapterIndex((i) => Math.max(0, i - 1))}
                className="px-4 py-2 rounded-xl bg-zinc-800 border border-white/10 disabled:opacity-30 hover:text-amber-400 flex items-center gap-1 transition-all"
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
                Capítulo Anterior
              </button>

              <span className="text-zinc-500 font-mono">
                {chapterIndex + 1} de {book.chapters.length}
              </span>

              <button
                disabled={chapterIndex === book.chapters.length - 1}
                onClick={() => setChapterIndex((i) => Math.min(book.chapters.length - 1, i + 1))}
                className="px-4 py-2 rounded-xl bg-zinc-800 border border-white/10 disabled:opacity-30 hover:text-amber-400 flex items-center gap-1 transition-all"
              >
                Próximo Capítulo
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Text Selection Popup Menu */}
        {selectionPosition && (
          <div
            style={{
              position: 'fixed',
              left: `${Math.min(window.innerWidth - 320, Math.max(20, selectionPosition.x - 150))}px`,
              top: `${selectionPosition.y}px`,
            }}
            className="z-50 bg-[#161818] border border-cyan-500/40 rounded-2xl p-2.5 shadow-2xl shadow-cyan-500/10 flex flex-col gap-2 w-72 animate-fade-in"
          >
            {!showNoteInput ? (
              <>
                <div className="flex items-center justify-between border-b border-white/10 pb-2 px-1">
                  <span className="text-[11px] font-bold text-cyan-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">edit</span>
                    Ferramentas do Texto
                  </span>
                  <button
                    onClick={() => setSelectionPosition(null)}
                    className="text-zinc-500 hover:text-white"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>

                {/* Color swatches */}
                <div className="flex items-center justify-around py-1">
                  {['#f59e0b', '#38bdf8', '#4ade80', '#f472b6', '#a855f7', '#e10111'].map((col) => (
                    <button
                      key={col}
                      onClick={() => {
                        setHighlightColor(col);
                        handleSaveHighlightAction();
                      }}
                      className="w-5 h-5 rounded-full border border-white/20 hover:scale-125 transition-transform"
                      style={{ backgroundColor: col }}
                      title="Marcar Texto"
                    />
                  ))}
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <button
                    onClick={() => setShowNoteInput(true)}
                    className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-amber-400 text-sm">edit_note</span>
                    Adicionar Nota
                  </button>
                  <button
                    onClick={() => handleQuickAction('resumir')}
                    className="px-2.5 py-1.5 rounded-lg bg-cyan-600/30 border border-cyan-500/40 hover:bg-cyan-600/50 text-xs font-semibold text-cyan-300 flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">psychology</span>
                    Perguntar à IA
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-2 p-1">
                <div className="flex justify-between items-center text-xs font-bold text-amber-400">
                  <span>Escrever Anotação:</span>
                  <button onClick={() => setShowNoteInput(false)} className="text-zinc-400">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Escreva seus comentários, reflexões ou insights..."
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-amber-500 resize-none h-16"
                />
                <button
                  onClick={handleSaveHighlightAction}
                  className="w-full py-1.5 bg-amber-500 text-black font-bold text-xs rounded-xl hover:brightness-110"
                >
                  Salvar Marcação
                </button>
              </div>
            )}
          </div>
        )}

        {/* Biblioflix AI Assistant Sidebar */}
        {showAiSidebar && (
          <aside className="w-80 lg:w-96 border-l border-white/10 bg-[#0c0f0f] flex flex-col h-full shadow-2xl relative">
            {/* AI Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-zinc-900/50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-bold">
                  <span className="material-symbols-outlined text-sm">graphic_eq</span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-1">
                    Biblioflix AI
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </h3>
                  <p className="text-[10px] text-zinc-400">Assistente Teológico & Literário</p>
                </div>
              </div>
              <button
                onClick={() => setShowAiSidebar(false)}
                className="text-zinc-500 hover:text-white"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {/* Quick Action Chips */}
            <div className="p-3 border-b border-white/5 bg-black/40 flex flex-wrap gap-1.5">
              <button
                onClick={() => handleQuickAction('resumir')}
                className="px-2.5 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-300 text-[11px] font-semibold hover:bg-red-600/40 transition-colors"
              >
                Resumir
              </button>
              <button
                onClick={() => handleQuickAction('citar')}
                className="px-2.5 py-1 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-300 text-[11px] font-semibold hover:bg-sky-500/40 transition-colors"
              >
                Citar
              </button>
              <button
                onClick={() => handleQuickAction('traduzir')}
                className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-semibold hover:bg-amber-500/40 transition-colors"
              >
                Traduzir
              </button>
              <button
                onClick={() => handleQuickAction('questionario')}
                className="px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[11px] font-semibold hover:bg-purple-500/40 transition-colors"
              >
                Gerar Questionário
              </button>
            </div>

            {/* Messages Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {aiChatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-500/20 text-amber-100 border border-amber-500/30 ml-6'
                      : 'bg-zinc-900 border border-white/10 text-zinc-200 mr-2'
                  }`}
                >
                  <p className="font-bold text-[10px] text-zinc-400 mb-1 uppercase tracking-wider">
                    {msg.sender === 'user' ? 'Você' : 'Biblioflix AI'}
                  </p>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              ))}

              {isAiLoading && (
                <div className="p-3 rounded-2xl bg-zinc-900 border border-white/10 text-xs text-cyan-400 flex items-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                  Biblioflix AI está analisando o contexto...
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-white/10 bg-zinc-900/80">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!aiInput.trim() || isAiLoading) return;
                  const text = aiInput.trim();
                  setAiChatMessages((prev) => [...prev, { sender: 'user', text }]);
                  setAiInput('');
                  askGemini(text);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Pergunte algo sobre este capítulo..."
                  className="flex-1 bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  disabled={isAiLoading}
                  className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold rounded-xl hover:brightness-110 disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </form>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
