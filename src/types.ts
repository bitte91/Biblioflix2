export type ViewMode = 
  | 'home' 
  | 'library' 
  | 'bible' 
  | 'categories' 
  | 'my_list' 
  | 'notes' 
  | 'reader' 
  | 'search' 
  | 'media_studio';

export interface BibleVerse {
  id?: string;
  number?: number;
  verseNumber?: number;
  text: string;
  bookId?: string;
  bookName?: string;
  testament?: 'VT' | 'NT' | string;
  chapter?: number;
}

export interface Chapter {
  id?: string;
  number?: number;
  title: string;
  subtitle?: string;
  chapterNumber?: number;
  content: string | string[];
  verses?: BibleVerse[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  year?: number | string;
  category: string;
  type?: 'bible' | 'book' | 'original';
  coverUrl?: string;
  coverImage?: string;
  description?: string;
  synopsis?: string;
  rating?: number;
  ratingCount?: string;
  reviewsCount?: string;
  isBestseller?: boolean;
  isBestSeller?: boolean;
  isOriginal?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  isBible?: boolean;
  format?: string;
  readTime?: string;
  readingTime?: string;
  aiInsights?: string;
  chapters: Chapter[];
  audioUrl?: string;
  audioDuration?: string;
  progressPercent?: number;
  tags?: string[];
}

export type HighlightColor = 'cyan' | 'red' | 'green' | 'amber' | 'purple';

export interface BookmarkNote {
  id: string;
  bookId: string;
  bookTitle: string;
  chapterId?: string;
  chapterTitle: string;
  verseNumber?: number;
  selectedText: string;
  noteText?: string;
  highlightColor: HighlightColor;
  createdAt: string;
  updatedAt?: string;
}

export interface SearchResult {
  id: string;
  type: 'book' | 'bible_verse' | 'chapter';
  title: string;
  subtitle: string;
  matchText: string;
  bookId: string;
  chapterId?: string;
  verseNumber?: number;
  category?: string;
}

export interface MediaGenOptions {
  prompt: string;
  aspectRatio: '1:1' | '16:9' | '9:16' | '4:3';
  imageSize?: '1K' | '2K' | '4K';
  sourceImage?: string;
}

export interface VideoGenProgress {
  status: 'idle' | 'generating' | 'polling' | 'downloading' | 'completed' | 'error';
  operationName?: string;
  progressMessage?: string;
  videoUrl?: string;
  error?: string;
}
