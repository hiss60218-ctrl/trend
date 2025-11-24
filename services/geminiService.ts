import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedIdea, Platform, TrendItem } from "../types";

// Note: In a real environment, allow the user to input the key or use a proxy.
// For this setup, we assume process.env.API_KEY is available.

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateUAETrendIdea = async (platform: Platform): Promise<GeneratedIdea | null> => {
  try {
    const ai = getClient();
    if (!ai) return null;

    const prompt = `
      بصفتك خبير استراتيجي في وسائل التواصل الاجتماعي متخصص في سوق الإمارات العربية المتحدة (أبوظبي، دبي، الشارقة)،
      قم باقتراح فكرة محتوى "ترند" واحدة فقط لمنصة ${platform}.
      
      يجب أن تكون الفكرة:
      1. مرتبطة بالثقافة المحلية أو الأحداث الحالية في الإمارات (مثل الشتاء، الفعاليات، التطور التكنولوجي، التراث).
      2. قابلة للتنفيذ وتجذب تفاعلاً عالياً من الجمهور الإماراتي والمقيمين.
      3. باللغة العربية.

      Output JSON format:
      {
        "title": "عنوان الفكرة",
        "description": "شرح مختصر للفكرة وكيفية تنفيذها",
        "suggestedHashtags": ["#وسم1", "#وسم2"]
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            suggestedHashtags: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            }
          },
          required: ["title", "description", "suggestedHashtags"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;

    return JSON.parse(text) as GeneratedIdea;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

export const getDailyTrends = async (platform: Platform): Promise<TrendItem[]> => {
  try {
    const ai = getClient();
    if (!ai) return [];

    const today = new Date().toLocaleDateString('ar-AE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const prompt = `
      Today is ${today}.
      Generate a list of 6 currently trending hashtags or topics for ${platform} specifically in the UAE (Dubai, Abu Dhabi, Sharjah).
      Focus on:
      1. Real-time local events, news, weather, or viral challenges happening NOW in UAE.
      2. Mix of Arabic and English tags used by locals.
      3. Realistic volume numbers (e.g., "10K Posts", "500K Views").

      Output JSON format (Array of objects):
      [
        {
          "id": "unique_id",
          "text": "#HashtagOrTopic",
          "volume": "10K posts",
          "category": "Hashtag", 
          "isRising": true
        }
      ]
      Category must be one of: 'Hashtag', 'Topic', 'Song'.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING },
              volume: { type: Type.STRING },
              category: { type: Type.STRING },
              isRising: { type: Type.BOOLEAN }
            },
            required: ["id", "text", "category", "isRising"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];

    const data = JSON.parse(text) as any[];
    
    // Map to ensure types match strictly
    return data.map((item, index) => ({
      id: item.id || `gen-${index}`,
      text: item.text,
      volume: item.volume,
      category: (item.category === 'Song' || item.category === 'Topic') ? item.category : 'Hashtag',
      isRising: item.isRising
    }));

  } catch (error) {
    console.error("Gemini Daily Trends Error:", error);
    return [];
  }
};
