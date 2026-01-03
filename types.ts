
export enum Sentiment {
  POSITIVE = 'Positive',
  NEUTRAL = 'Neutral',
  NEGATIVE = 'Negative'
}

export enum Emotion {
  JOY = 'Joy',
  TRUST = 'Trust',
  FRUSTRATION = 'Frustration',
  ANGER = 'Anger',
  SURPRISE = 'Surprise',
  SADNESS = 'Sadness'
}

export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface Aspect {
  name: string;
  sentiment: number; // -1 to 1
  importance: number; // 0 to 1
  mentions: number;
}

export interface ProductModule {
  title: string;
  desc: string;
  input: string;
  output: string;
}

export interface BusinessImpact {
  title: string;
  text: string;
}

export interface ProductProfile {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  modules: ProductModule[];
  architecture: string;
  capabilities: string[];
  impacts: BusinessImpact[];
  metrics: {
    label: string;
    value: string;
    trend: string;
  }[];
  uxDescription: string;
  whyMatters: string;
}

export interface Review {
  id: string;
  productId: string;
  text: string;
  rating: number;
  timestamp: string;
  source: string;
  analysis: {
    sentiment: Sentiment;
    score: number; // 0-100 derived from Enterprise Framework
    confidence: number;
    breakdownText: string; // The strict SENTIMENT METRICS BREAKDOWN output
    emotions: Record<string, number>;
    aspects: Aspect[];
    risks: {
      churn: RiskLevel;
      brand: RiskLevel;
      support: RiskLevel;
      reason: string;
    };
  };
}

export enum Tab {
  SHOWCASE = 'Platform Profile',
  INGESTION = 'Review Ingestion',
  SENTIMENT = 'Sentiment Spectrum',
  ASPECTS = 'Aspect Matrix',
  RISKS = 'Risk Center',
  SCORE = 'Sentag Score Engine',
  EXECUTIVE = 'Executive Insights',
  ASSISTANT = 'Sentag AI Assistant',
  SETTINGS = 'Settings'
}
