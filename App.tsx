import React, { useState, useEffect } from 'react';
import { Platform, TrendItem } from './types';
import { PLATFORM_INSIGHTS, MOCK_HASHTAGS, MOCK_SONGS, MOCK_ANALYTICS } from './constants';
import { PlatformSelector } from './components/PlatformSelector';
import { TrendList } from './components/TrendList';
import { InsightsPanel } from './components/InsightsPanel';
import { SongList } from './components/SongList';
import { AIInspirator } from './components/AIInspirator';
import { AnalyticsModal } from './components/AnalyticsModal';
import { getDailyTrends } from './services/geminiService';
import { BarChart3 } from 'lucide-react';

const App: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>(Platform.TIKTOK);
  
  // State for trends logic
  const [currentTrends, setCurrentTrends] = useState<TrendItem[]>(MOCK_HASHTAGS[Platform.TIKTOK]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  // State for Analytics Modal
  const [selectedTrend, setSelectedTrend] = useState<TrendItem | null>(null);

  // Reset trends when platform changes to default mock data initially
  useEffect(() => {
    setCurrentTrends(MOCK_HASHTAGS[platform]);
    setLastUpdated(null); // Reset time as we are back to "default" mock
  }, [platform]);

  const handleRefreshTrends = async () => {
    setIsRefreshing(true);
    const dailyTrends = await getDailyTrends(platform);
    
    if (dailyTrends && dailyTrends.length > 0) {
      setCurrentTrends(dailyTrends);
      setLastUpdated(new Date());
    } else {
      alert("تعذر تحديث البيانات. يرجى التأكد من إعداد مفتاح API.");
    }
    
    setIsRefreshing(false);
  };

  const handleAnalyzeTrend = (trend: TrendItem) => {
    setSelectedTrend(trend);
  };

  const handleCloseModal = () => {
    setSelectedTrend(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-12 relative">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-emerald-200 shadow-lg">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">نبض ترند الإمارات</h1>
              <p className="text-xs text-slate-500 font-medium mt-1">UAE Trend Pulse AI</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
              تحديث مباشر: دبي، أبوظبي، الشارقة
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 pt-8">
        
        {/* Intro */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">اكتشف ما يتصدر المشهد في الإمارات</h2>
          <p className="text-slate-500 text-lg">
            أدوات تحليلية متقدمة تساعدك على الوصول للجمهور المحلي باستخدام بيانات دقيقة وذكاء اصطناعي متخصص.
          </p>
        </div>

        {/* Platform Selector */}
        <PlatformSelector selected={platform} onSelect={setPlatform} />

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Trend List (Main) */}
          <div className="lg:col-span-2 space-y-6">
            <TrendList 
              items={currentTrends} 
              onRefresh={handleRefreshTrends}
              isRefreshing={isRefreshing}
              lastUpdated={lastUpdated}
              onAnalyze={handleAnalyzeTrend}
            />
            
            {/* Show Songs only for TikTok */}
            {platform === Platform.TIKTOK && (
              <SongList songs={MOCK_SONGS} />
            )}
            
            {/* AI Generator */}
            <AIInspirator platform={platform} />
          </div>

          {/* Right Column: Insights (Sidebar) */}
          <div className="lg:col-span-1 space-y-6">
            <InsightsPanel data={PLATFORM_INSIGHTS[platform]} />
            
            {/* Ad / Info Box */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
              <h3 className="font-bold text-slate-800 mb-2">هل تحتاج API حقيقي؟</h3>
              <p className="text-sm text-slate-500 mb-4">
                يمكنك الآن استخدام زر "تحديث يومي" لجلب بيانات حية باستخدام الذكاء الاصطناعي، أو ربط النظام بـ TikTok Research API لاحقاً.
              </p>
              <div className="text-xs bg-slate-100 p-2 rounded text-slate-600 font-mono dir-ltr">
                services/geminiService.ts
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 py-8 text-center text-slate-400 text-sm">
        <p>© 2024 UAE Trend Pulse. Designed for UAE Creators.</p>
        <div className="flex justify-center gap-4 mt-2">
          <span>دبي</span>
          <span>•</span>
          <span>أبوظبي</span>
          <span>•</span>
          <span>الشارقة</span>
        </div>
      </footer>

      {/* Analytics Modal */}
      {selectedTrend && (
        <AnalyticsModal 
          trend={selectedTrend}
          // Use specific analytics if id matches, otherwise default
          analytics={MOCK_ANALYTICS[selectedTrend.id] || MOCK_ANALYTICS['default']}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;