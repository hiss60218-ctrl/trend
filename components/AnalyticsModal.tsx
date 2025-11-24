import React from 'react';
import { TrendItem, TrendAnalytics } from '../types';
import { X, Users, TrendingUp, BarChart2, Video, Image as ImageIcon, Heart, UserPlus } from 'lucide-react';

interface Props {
  trend: TrendItem;
  analytics: TrendAnalytics;
  onClose: () => void;
}

export const AnalyticsModal: React.FC<Props> = ({ trend, analytics, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur z-10 border-b border-slate-100 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <BarChart2 className="w-6 h-6 text-emerald-600" />
              تحليل الجمهور: <span className="text-emerald-700 dir-ltr">{trend.text}</span>
            </h2>
            <p className="text-slate-500 text-sm mt-1">بيانات تفصيلية عن الفئة المستهدفة وأداء المحتوى في الإمارات</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Section 1: Demographics (Age & Gender) */}
          <div className="space-y-8">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                توزيع الأعمار والجنس
              </h3>
              
              {/* Age Bars */}
              <div className="space-y-4 mb-8">
                {analytics.demographics.ageGroups.map((group, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                      <span>{group.label} سنة</span>
                      <span>{group.percentage}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: `${group.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Gender Split */}
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                  <span className="block text-2xl font-bold text-blue-700">{analytics.demographics.gender.male}%</span>
                  <span className="text-xs text-blue-500 font-bold">ذكور</span>
                </div>
                <div className="flex-1 bg-pink-50 rounded-xl p-4 text-center border border-pink-100">
                  <span className="block text-2xl font-bold text-pink-700">{analytics.demographics.gender.female}%</span>
                  <span className="text-xs text-pink-500 font-bold">إناث</span>
                </div>
              </div>
            </div>

            {/* Growth Stats */}
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
              <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                نمو المتابعين والتفاعل
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-emerald-100/50 shadow-sm">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>نمو المتابعين</span>
                  </div>
                  <p className="text-lg font-bold text-emerald-600">{analytics.growth.followersGrowth}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-100/50 shadow-sm">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Heart className="w-3.5 h-3.5" />
                    <span>معدل التفاعل</span>
                  </div>
                  <p className="text-lg font-bold text-emerald-600">{analytics.growth.engagementRate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Content Models */}
          <div>
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-purple-600" />
              أكثر المحتويات نجاحاً (نماذج)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              إليك أمثلة للمنشورات التي حققت أعلى انتشار مع هذا الترند، يمكنك استخدامها كإلهام.
            </p>

            <div className="space-y-4">
              {analytics.topContent.map((content) => (
                <div key={content.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-bold">
                        {content.author.substring(1,3).toUpperCase()}
                      </div>
                      <div>
                         <p className="font-bold text-sm text-slate-900 dir-ltr text-right">{content.author}</p>
                         <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                           {content.type === 'Video' ? 'فيديو 🎥' : 'صورة 📷'}
                         </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                      {content.metrics}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 group-hover:bg-purple-50/30 transition-colors">
                    "{content.previewText}"
                  </p>
                  
                  <div className="mt-3 flex justify-end">
                    <button className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1">
                      محاكاة هذا النموذج
                      <span className="text-lg">←</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

             <div className="mt-6 bg-yellow-50 p-4 rounded-xl border border-yellow-100">
               <h4 className="font-bold text-yellow-800 text-sm mb-2">💡 نصيحة للانتشار</h4>
               <p className="text-xs text-yellow-700 leading-relaxed">
                 استناداً إلى البيانات، ركز على الفئة العمرية الأكبر في الرسم البياني واستخدم أسلوب المحتوى (فيديو/صورة) الأكثر تكراراً في القائمة أعلاه لضمان وصول أعلى.
               </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};