import React, { useState } from 'react';
import { TrendItem } from '../types';
import { TrendingUp, Copy, Check, RefreshCw, Clock, BarChart2 } from 'lucide-react';

interface Props {
  items: TrendItem[];
  onRefresh?: () => void;
  isRefreshing?: boolean;
  lastUpdated?: Date | null;
  onAnalyze?: (item: TrendItem) => void;
}

export const TrendList: React.FC<Props> = ({ items, onRefresh, isRefreshing = false, lastUpdated, onAnalyze }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-emerald-700">
          <TrendingUp className="w-5 h-5" />
          <div>
            <h2 className="text-xl font-bold leading-none">الوسوم المتداولة اليوم</h2>
            {lastUpdated && (
              <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 font-medium">
                <Clock className="w-3 h-3" />
                تحديث: {lastUpdated.toLocaleTimeString('ar-AE', { hour: '2-digit', minute: '2-digit' })}
              </p>
            )}
          </div>
        </div>
        
        {onRefresh && (
          <button 
            onClick={onRefresh}
            disabled={isRefreshing}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
              ${isRefreshing 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800'
              }`}
            title="تحديث القائمة الآن"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'جاري التحديث...' : 'تحديث يومي'}
          </button>
        )}
      </div>

      {/* List Content */}
      <div className={`grid gap-3 transition-opacity duration-300 ${isRefreshing ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        {items.length > 0 ? items.map((item, index) => (
          <div 
            key={item.id} 
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 group gap-4 sm:gap-0"
          >
            <div className="flex items-center gap-4">
              <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${item.isRising ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                {index + 1}
              </span>
              <div>
                <div className="flex items-center gap-2">
                   <p className="font-bold text-slate-800 text-lg dir-ltr text-right break-all">{item.text}</p>
                   {item.isRising && <span className="text-[10px] bg-red-50 text-red-500 px-1.5 py-0.5 rounded-md font-bold whitespace-nowrap">صاعد</span>}
                </div>
                {item.volume && <p className="text-xs text-slate-500 mt-1">{item.volume}</p>}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:self-center self-end">
              {onAnalyze && (
                <button
                  onClick={() => onAnalyze(item)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all shadow-sm"
                >
                  <BarChart2 className="w-4 h-4" />
                  تحليل الجمهور
                </button>
              )}
              <button
                onClick={() => handleCopy(item.text, item.id)}
                className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all border border-transparent hover:border-emerald-100"
                title="نسخ الوسم"
              >
                {copiedId === item.id ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )) : (
          <div className="text-center py-8 text-slate-400">
            لا توجد بيانات متاحة حالياً.
          </div>
        )}
      </div>
      
      <div className="mt-6 text-center">
        <button 
          onClick={() => {
            const allTags = items.map(i => i.text).join(' ');
            navigator.clipboard.writeText(allTags);
            alert('تم نسخ جميع الوسوم!');
          }}
          className="text-sm text-emerald-600 hover:text-emerald-800 font-medium underline underline-offset-4"
        >
          نسخ الكل
        </button>
      </div>
    </div>
  );
};