import React, { useState } from 'react';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onSearchSubmit: (query: string) => void;
  notesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onSearchSubmit,
  notesCount,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
    }
  };

  const handleSearchClick = () => {
    if (searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
    } else {
      onNavigate('search');
    }
  };

  return (
    <header id="biblioflix-header" className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#121414]/85 border-b border-white/10 flex justify-between items-center w-full px-4 md:px-12 py-3">
      {/* Brand Logo */}
      <div className="flex items-center gap-6">
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e10111] to-amber-600 flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg shadow-red-900/30 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-2xl">menu_book</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-serif font-black tracking-tight text-white uppercase group-hover:text-red-500 transition-colors">
              BIBLIO<span className="text-[#e10111]">FLIX</span>
            </span>
            <span className="text-[9px] font-mono-caps text-amber-400 tracking-widest uppercase -mt-1 font-bold">
              STREAMING & BÍBLIA
            </span>
          </div>
        </div>

        {/* Desktop Main Navigation */}
        <nav className="hidden lg:flex items-center gap-6 ml-6 text-sm font-medium">
          <button
            id="nav-home-btn"
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded-full transition-all font-mono-caps text-xs uppercase tracking-wider ${
              currentView === 'home'
                ? 'bg-[#e10111] text-white font-bold shadow-md shadow-red-600/30'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Início
          </button>
          <button
            id="nav-library-btn"
            onClick={() => onNavigate('library')}
            className={`px-3 py-1.5 rounded-full transition-all font-mono-caps text-xs uppercase tracking-wider ${
              currentView === 'library'
                ? 'bg-[#e10111] text-white font-bold shadow-md shadow-red-600/30'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Biblioteca
          </button>
          <button
            id="nav-bible-btn"
            onClick={() => onNavigate('bible')}
            className={`px-3 py-1.5 rounded-full transition-all font-mono-caps text-xs uppercase tracking-wider flex items-center gap-1.5 ${
              currentView === 'bible'
                ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-600/30'
                : 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 border border-amber-500/20'
            }`}
          >
            <span className="material-symbols-outlined text-sm">auto_stories</span>
            Bíblia Sagrada
          </button>
          <button
            id="nav-categories-btn"
            onClick={() => onNavigate('categories')}
            className={`px-3 py-1.5 rounded-full transition-all font-mono-caps text-xs uppercase tracking-wider ${
              currentView === 'categories'
                ? 'bg-[#e10111] text-white font-bold shadow-md shadow-red-600/30'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Categorias
          </button>
          <button
            id="nav-notes-btn"
            onClick={() => onNavigate('notes')}
            className={`px-3 py-1.5 rounded-full transition-all font-mono-caps text-xs uppercase tracking-wider flex items-center gap-1.5 ${
              currentView === 'notes'
                ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-500/30'
                : 'text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10'
            }`}
          >
            <span className="material-symbols-outlined text-sm">edit_note</span>
            Anotações {notesCount > 0 && <span className="bg-cyan-500 text-black font-bold text-[10px] px-1.5 py-0.2 rounded-full">{notesCount}</span>}
          </button>
          <button
            id="nav-media-btn"
            onClick={() => onNavigate('media_studio')}
            className={`px-3 py-1.5 rounded-full transition-all font-mono-caps text-xs uppercase tracking-wider flex items-center gap-1.5 ${
              currentView === 'media_studio'
                ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-500/30'
                : 'text-purple-300 hover:text-purple-200 hover:bg-purple-500/10'
            }`}
          >
            <span className="material-symbols-outlined text-sm">movie</span>
            Estúdio IA (Imagem/Vídeo)
          </button>
        </nav>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        <div className="relative group hidden sm:block">
          <input
            id="global-search-input"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchKey}
            placeholder="Buscar livros, versículos, salmos..."
            className="bg-[#1e2020] border border-white/10 text-xs rounded-full pl-4 pr-10 py-2 w-48 lg:w-72 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
          />
          <button
            id="global-search-submit-btn"
            onClick={handleSearchClick}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-cyan-400 transition-colors"
            title="Buscar"
          >
            <span className="material-symbols-outlined text-lg">search</span>
          </button>
        </div>

        <button
          onClick={() => onNavigate('search')}
          className="sm:hidden p-2 rounded-full hover:bg-white/10 text-gray-300"
          title="Pesquisar"
        >
          <span className="material-symbols-outlined text-xl">search</span>
        </button>

        <button id="notifications-btn" className="relative p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300">
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#e10111] rounded-full animate-pulse"></span>
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-white/10 cursor-pointer group">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-400/60 overflow-hidden bg-[#1a1c1c] group-hover:border-cyan-400 transition-colors">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1T9lUu5A1g7uasHRYI85hjb-GP8RGMG4e0Ne6r8xA0vmqkedoh5r5J8481EjiiOfasiE_llXz_1IErArpG9Knjan1rJOTlswubBP24v01n1c6Baw7suxr1EHOArvdBZh37OfThOIAhHP5q67GQx6eH_1mNJGnZnkUOa177EkLkYy98aiB-67iDVa6nRL6TZn3Bnw1uedviKCZ2l-icSC_ELweK-DA9d6Hd8cV0GyqOAigOGWiMyT96A"
              alt="Gabriel"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs font-medium text-gray-200 hidden md:block group-hover:text-cyan-300 transition-colors">
            Olá, Gabriel
          </span>
        </div>
      </div>
    </header>
  );
};
