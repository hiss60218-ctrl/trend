import React from 'react';
import { Platform } from '../types';
import { Instagram, Twitter, Music2 } from 'lucide-react';

interface Props {
  selected: Platform;
  onSelect: (p: Platform) => void;
}

export const PlatformSelector: React.FC<Props> = ({ selected, onSelect }) => {
  const platforms = [
    { id: Platform.INSTAGRAM, icon: Instagram, label: 'Instagram', color: 'text-pink-600' },
    { id: Platform.X, icon: Twitter, label: 'X (Twitter)', color: 'text-gray-900' },
    { id: Platform.TIKTOK, icon: Music2, label: 'TikTok', color: 'text-black' },
  ];

  return (
    <div className="flex justify-center gap-4 mb-8 flex-wrap">
      {platforms.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect(p.id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 shadow-sm border
            ${selected === p.id 
              ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-200' 
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
        >
          <p.icon className={`w-5 h-5 ${selected === p.id ? 'text-white' : p.color}`} />
          <span className="font-bold">{p.label}</span>
        </button>
      ))}
    </div>
  );
};
