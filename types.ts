export enum Platform {
  INSTAGRAM = 'Instagram',
  TIKTOK = 'TikTok',
  X = 'X'
}

export interface TrendItem {
  id: string;
  text: string; // Hashtag or Topic
  volume?: string; // e.g., "50K posts"
  category: 'Hashtag' | 'Song' | 'Topic';
  isRising: boolean;
}

export interface SongItem {
  id: string;
  title: string;
  artist: string;
  usageCount: string;
}

export interface MarketInsight {
  bestTime: string[];
  activeDemographic: string;
  contentType: string;
  topCities: string[];
}

export interface GeneratedIdea {
  title: string;
  description: string;
  suggestedHashtags: string[];
}

export interface TrendAnalytics {
  trendId: string;
  demographics: {
    ageGroups: { label: string; percentage: number }[]; // e.g. "18-24", 45
    gender: { male: number; female: number }; // Percentage
  };
  growth: {
    followersGrowth: string; // e.g. "+12% this week"
    engagementRate: string; // e.g. "5.4%"
    totalReach: string; // e.g. "2.1M"
  };
  topContent: {
    id: string;
    author: string;
    previewText: string;
    metrics: string; // e.g. "150K Likes"
    type: 'Video' | 'Image' | 'Text';
  }[];
}