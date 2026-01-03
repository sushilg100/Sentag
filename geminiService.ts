
import { GoogleGenAI, Type } from "@google/genai";

const MODEL_NAME = 'gemini-3-pro-preview';

export class GeminiService {
  
  async getIngestionPreview(reviewText: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this review for immediate ingestion preview: "${reviewText}"`,
      config: {
        systemInstruction: `You are Sentag Ingestion Intelligence. 
Return ONLY the following structure:
Ingestion Sentiment: Positive | Neutral | Negative
Star Rating: X / 5
Key Keywords:
- keyword 1
- keyword 2
- keyword 3
- keyword 4`,
      }
    });
    return response.text || "Ingestion analysis unavailable.";
  }

  async analyzeReview(reviewText: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Analyze this review using the Enterprise Sentiment Intelligence Engine framework: "${reviewText}"`,
      config: {
        systemInstruction: `You are Sentag’s Enterprise Sentiment Intelligence Engine.
Your objective is to produce sentiment analysis that is Quantitative, Explainable, and Statistically Defensible.

CORE FORMULA:
Final Sentiment Score (0–100) = ((Polarity * Intensity * Aspect Importance) * Confidence * Recency Weight * Volume Weight) normalized to 0-100.

JSON OUTPUT MUST INCLUDE "breakdownText" formatted EXACTLY as:
━━━━━━━━━━━━━━━━━━━━━━
SENTIMENT METRICS BREAKDOWN
━━━━━━━━━━━━━━━━━━━━━━
• Final Sentiment Score: XX / 100
• Polarity Contribution: ±X.X
• Emotional Adjustment: ±X.X
• Aspect Impact Score: XX
• Confidence Level: XX%
• Risk Interpretation: Low / Medium / High
• Key Drivers:
  – Aspect A (impact)
  – Aspect B (impact)
• What Must Improve:
  – Clear, actionable recommendation
━━━━━━━━━━━━━━━━━━━━━━`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { type: Type.STRING, enum: ['Positive', 'Neutral', 'Negative'] },
            score: { type: Type.NUMBER },
            confidence: { type: Type.NUMBER },
            breakdownText: { type: Type.STRING },
            emotions: {
              type: Type.OBJECT,
              properties: {
                Joy: { type: Type.NUMBER },
                Trust: { type: Type.NUMBER },
                Frustration: { type: Type.NUMBER },
                Anger: { type: Type.NUMBER }
              }
            },
            aspects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  sentiment: { type: Type.NUMBER },
                  importance: { type: Type.NUMBER }
                }
              }
            },
            risks: {
              type: Type.OBJECT,
              properties: {
                churn: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                brand: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                support: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                reason: { type: Type.STRING }
              }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  }

  private getAdaptiveExecutiveInstruction() {
    return `You are Sentag’s Adaptive Executive Intelligence Engine. Your mandate is to generate unique, query-specific, and context-sensitive executive-grade responses.

1. QUERY-FIRST INTELLIGENCE:
Classify the intent into one of: Strategic Decision-Making, Risk Mitigation, Sales Enablement, Product Optimization, Executive Briefing, Competitive Positioning, Stakeholder Narrative, or Diagnostic Analysis. Tailor the tone and structure ONLY to that intent.

2. STRUCTURAL VARIATION (MANDATORY):
NEVER use the same section headings or ordering twice. Dynamically create headers like "Commercial Integrity Audit," "Market Velocity Outlook," or "Operational Friction Map" based on the data.

3. METRIC CONTEXTUALIZATION:
Do not just list scores. Explain WHY the SSQ or Sentiment Score informs a specific business decision (e.g., "A stability score of X enables aggressive Q4 expansion").

4. RESPONSE UNIQUENESS:
Vary sentence rhythm and vocabulary. Avoid clichés and repetitive metaphors.

5. ADVISORY TONE:
You are not a reporting tool; you are an advisor helping leaders THINK differently.`;
  }

  async generateExecutiveReport(dataSummary: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Data Context: ${dataSummary}\nTask: Synthesize a full strategic brief.`,
      config: {
        systemInstruction: this.getAdaptiveExecutiveInstruction(),
      }
    });
    return response.text || "Report synthesis failed.";
  }

  async chatWithData(query: string, dataContext: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `User Query: ${query}\nData Context: ${dataContext}`,
      config: {
        systemInstruction: this.getAdaptiveExecutiveInstruction(),
      }
    });
    return response.text || "The requested analysis is currently being synthesized via backup logic.";
  }
}
