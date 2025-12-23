
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type ViewState = 
  | { type: 'home' }
  | { type: 'dashboard' };

export interface ConversionState {
  original: string | null;
  transformed: string | null;
  isProcessing: boolean;
  error: string | null;
}

// Added ChatMessage interface for Assistant component
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

// Added KnowledgeItem interface for Product components
export interface KnowledgeItem {
  id: string;
  title: string;
  sourceType: string;
  content: string;
  tags: string[];
  timestamp: number;
  linkedItemIds: string[];
  language?: string;
  importance?: number;
  url?: string;
  meta: {
    repoStars?: number;
    resolvedStatus?: boolean;
  };
}

// Added Paper interface for Checkout and CartDrawer components
export interface Paper extends KnowledgeItem {
  publisher: string;
  authors: string[];
  abstract: string;
  abstractPreview: string;
  publicationDate: string;
  category: string;
  doi: string;
  whyMatters: string;
  upvotes: number;
  aiInsights: string[];
  publisherLogo: string;
  readTime?: string;
}

// Added JournalArticle interface for Journal components
export interface JournalArticle {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}
