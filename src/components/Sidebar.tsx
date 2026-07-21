import React from 'react';
import { ViewMode } from '../types/index';

interface SidebarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  notesCount: number;
  myListCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  notesCount,
  myListCount,
}) => {
  return (
    <aside 
      id="biblioflix-sidebar"
      className="hidden md:flex flex-col h-screen w-60 fixed left-0 top-0 z-40 bg-[#121414] border-r border-white/10 pt-20 pb-6 overflow-y-auto custom-scrollbar"
    >
      <div className="flex-1 px-3 space-y-1">
        <button
          id="sidebar-home-btn"
          onClick={() => onNavigate('home')}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
            currentView === 'home'
              ? 'bg-[#e10111] text-white font-bold shadow-lg shadow-red-900/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-xl">home</span>
          <span>Início</span>
        </button>

        <button
          id="sidebar-library-btn"
          onClick={() => onNavigate('library')}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
            currentView === 'library'
              ? 'bg-[#e10111] text-white font-bold shadow-lg shadow-red-900/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-xl">menu_book</span>
          <span>Biblioteca</span>
        </button>

        <button
          id="sidebar-bible-btn"
          onClick={() => onNavigate('bible')}
          className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
            currentView === 'bible'
              ? 'bg-amber-600 text-white font-bold shadow-lg shadow-amber-900/40 border border-amber-400/30'
              : 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-xl">auto_stories</span>
            <span>Bíblia Sagrada</span>
          </div>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30 font-mono-caps font-bold">
            66
          </span>
        </button>

        <button
          id="sidebar-categories-btn"
          onClick={() => onNavigate('categories')}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
            currentView === 'categories'
              ? 'bg-[#e10111] text-white font-bold shadow-lg shadow-red-900/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-xl">grid_view</span>
          <span>Categorias</span>
        </button>

        <button
          id="sidebar-mylist-btn"
          onClick={() => onNavigate('my_list')}
          className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
            currentView === 'my_list'
              ? 'bg-[#e10111] text-white font-bold shadow-lg shadow-red-900/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-xl">bookmark</span>
            <span>Minha Lista</span>
          </div>
          {myListCount > 0 && (
            <span className="bg-red-900/60 text-red-200 text-xs px-2 py-0.5 rounded-full font-mono-caps">
              {myListCount}
            </span>
          )}
        </button>

        <div className="my-3 border-t border-white/10 mx-2"></div>

        <button
          id="sidebar-notes-btn"
          onClick={() => onNavigate('notes')}
          className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
            currentView === 'notes'
              ? 'bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-900/40 border border-cyan-400/30'
              : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-xl text-cyan-400">edit_note</span>
            <span>Anotações & Marcadores</span>
          </div>
          {notesCount > 0 && (
            <span className="bg-cyan-500 text-black font-bold text-xs px-2 py-0.5 rounded-full">
              {notesCount}
            </span>
          )}
        </button>

        <button
          id="sidebar-media-btn"
          onClick={() => onNavigate('media_studio')}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
            currentView === 'media_studio'
              ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-900/40 border border-purple-400/30'
              : 'text-purple-400 hover:text-purple-300 hover:bg-purple-500/10'
          }`}
        >
          <span className="material-symbols-outlined text-xl">movie</span>
          <span>Estúdio IA (Veo & Gemini)</span>
        </button>

        <button
          id="sidebar-search-btn"
          onClick={() => onNavigate('search')}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
            currentView === 'search'
              ? 'bg-[#e10111] text-white font-bold'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-xl">search</span>
          <span>Busca Robusta</span>
        </button>

        <div className="my-3 border-t border-white/10 mx-2"></div>

        <button className="flex items-center gap-3 w-full px-3 py-2 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
          <span className="material-symbols-outlined text-lg">stars</span>
          <span>Destaques</span>
        </button>

        <button className="flex items-center gap-3 w-full px-3 py-2 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
          <span className="material-symbols-outlined text-lg">history</span>
          <span>Histórico de Leitura</span>
        </button>
      </div>

      {/* Premium Plan Card in SideNav */}
      <div className="mx-3 my-4 p-4 rounded-2xl glass-card border border-amber-500/30 relative overflow-hidden group">
        <div className="absolute -top-8 -right-8 w-20 h-20 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all"></div>
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-amber-400 text-xl">workspace_premium</span>
          <span className="font-serif font-bold text-sm text-white">Plano Premium</span>
        </div>
        <p className="text-[11px] text-gray-400 leading-tight mb-3">
          Acesso ilimitado a 100+ obras, Bíblia interativa e áudios em HD.
        </p>
        <button className="w-full py-1.5 bg-gradient-to-r from-[#e10111] to-amber-600 text-white text-xs font-bold rounded-lg hover:scale-[1.02] transition-transform neon-glow-red">
          Ver Planos
        </button>
      </div>

      {/* Logout button */}
      <div className="px-3 pt-2">
        <button className="flex items-center gap-3 text-gray-400 hover:text-red-400 w-full px-3 py-2 rounded-xl text-xs font-medium transition-colors hover:bg-red-500/10">
          <span className="material-symbols-outlined text-lg">logout</span>
          <span>Sair da Conta</span>
        </button>
      </div>
    </aside>
  );
};
