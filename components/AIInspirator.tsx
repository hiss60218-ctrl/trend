import React, { useState } from 'react';
import { Platform, GeneratedIdea } from '../types';
import { generateUAETrendIdea } from '../services/geminiService';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';

interface Props {
  platform: Platform;
}

export const AIInspirator: React.FC<Props> = ({ platform }) => {
  const [loading, setLoading] = useState(false);
  const [idea, setIdea] = useState<GeneratedIdea | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateUAETrendIdea(platform);
    setIdea(result);
    setLoading(false);
  };

  return (
    <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-emerald-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            اقتراح ترند إماراتي ذكي
          </h3>
          <p className="text-emerald-700/80 text-sm mt-1">
            دع الذكاء الاصطناعي يحلل البيانات ويقترح عليك فكرة محتوى مناسبة لـ {platform}.
          </p>
        </div>
      </div>

      {!idea && !loading && (
        <button
          onClick={handleGenerate}
          className="w-full py-4 bg-white hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl border border-emerald-200 shadow-sm transition-all flex items-center justify-center gap-2 group"
        >
          <span>توليد فكرة الآن</span>
          <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </button>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-8 text-emerald-600">
          <Loader2 className="w-8 h-8 animate-spin mb-2" />
          <p className="text-sm font-medium animate-pulse">جاري تحليل السوق الإماراتي...</p>
        </div>
      )}

      {idea && !loading && (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-emerald-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h4 className="font-bold text-lg text-slate-800 mb-2">{idea.title}</h4>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            {idea.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {idea.suggestedHashtags.map((tag, idx) => (
              <span key={idx} className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          <button 
            onClick={handleGenerate}
            className="mt-4 text-xs text-emerald-600 hover:underline font-medium"
          >
            اقتراح فكرة أخرى
          </button>
        </div>
      )}
    </div>
  );
};
