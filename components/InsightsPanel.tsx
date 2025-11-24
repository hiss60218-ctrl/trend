import React from 'react';
import { MarketInsight } from '../types';
import { Clock, Users, MapPin, Lightbulb } from 'lucide-react';

interface Props {
  data: MarketInsight;
}

export const InsightsPanel: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-emerald-400">
        <Lightbulb className="w-5 h-5" />
        رؤى السوق الإماراتي 🇦🇪
      </h3>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-slate-300 mb-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>أفضل وقت للنشر (توقيت الإمارات)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.bestTime.map((time, idx) => (
              <span key={idx} className="bg-white/10 px-3 py-1 rounded-md text-sm font-medium border border-white/10">
                {time}
              </span>
            ))}
          </div>
        </div>

        <div>
           <div className="flex items-center gap-2 text-slate-300 mb-2 text-sm">
            <Users className="w-4 h-4" />
            <span>الفئة النشطة</span>
          </div>
          <p className="font-medium">{data.activeDemographic}</p>
        </div>

         <div>
           <div className="flex items-center gap-2 text-slate-300 mb-2 text-sm">
            <MapPin className="w-4 h-4" />
            <span>المدن الأكثر تفاعلاً</span>
          </div>
           <div className="flex flex-wrap gap-2">
            {data.topCities.map((city, idx) => (
              <span key={idx} className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">
                {city}
              </span>
            ))}
          </div>
        </div>
        
        <div className="pt-4 border-t border-white/10">
           <div className="text-xs text-slate-400 mb-1">نوع المحتوى الرائج:</div>
           <p className="text-sm italic text-slate-200">"{data.contentType}"</p>
        </div>
      </div>
    </div>
  );
};
