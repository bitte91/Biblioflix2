import React, { useState, useEffect } from 'react';
import { Book, Chapter } from '../data/libraryData';

interface AudioPlayerBarProps {
  currentBook: Book | null;
  currentChapter: Chapter | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentBook,
  currentChapter,
  isPlaying,
  onTogglePlay,
}) => {
  const [progress, setProgress] = useState(35);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!currentBook) return null;

  const title = currentBook.title;
  const subtitle = currentChapter ? `${currentChapter.number}. ${currentChapter.title || ''}` : currentBook.author;
  const coverImage = currentBook.coverUrl;

  return (
    <footer id="audio-player-bar" className="fixed bottom-0 left-0 right-0 z-40 h-20 bg-black/90 backdrop-blur-xl border-t border-white/10 px-4 md:px-8 flex items-center justify-between">
      {/* Left info */}
      <div className="w-1/3 flex items-center gap-4">
        <div className="w-12 h-12 bg-zinc-800 rounded-xl overflow-hidden border border-white/10 flex-shrink-0 flex items-center justify-center">
          {coverImage ? (
            <img src={coverImage} alt={title} className="w-full h-full object-cover" />
          ) : (
            <span className="material-symbols-outlined text-amber-400">auto_stories</span>
          )}
        </div>
        <div className="hidden sm:block overflow-hidden">
          <p className="text-sm font-medium text-white truncate">{title}</p>
          <p className="text-xs text-gray-400 truncate">{subtitle}</p>
        </div>
      </div>

      {/* Middle Controls */}
      <div className="w-1/3 flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-lg">skip_previous</span>
          </button>

          <button
            onClick={onTogglePlay}
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-white/10"
            title={isPlaying ? 'Pausar' : 'Reproduzir Áudio'}
          >
            <span className="material-symbols-outlined text-xl">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <button className="text-gray-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-lg">skip_next</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full flex items-center gap-3">
          <span className="text-[10px] text-gray-500 font-mono-caps">12:45</span>
          <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden cursor-pointer relative">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-[#e10111] to-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all"
            />
          </div>
          <span className="text-[10px] text-gray-500 font-mono-caps">45:00</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="w-1/3 flex justify-end items-center gap-4">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="text-gray-400 hover:text-white transition-colors hidden sm:block"
        >
          <span className="material-symbols-outlined text-lg">
            {isMuted ? 'volume_off' : 'volume_up'}
          </span>
        </button>

        <div className="w-20 h-1 bg-zinc-800 rounded-full hidden sm:block overflow-hidden">
          <div
            className={`h-full bg-white ${isMuted ? 'w-0' : 'w-2/3'}`}
          />
        </div>
      </div>
    </footer>
  );
};
