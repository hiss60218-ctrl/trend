import React from 'react';
import { SongItem } from '../types';
import { Music, PlayCircle } from 'lucide-react';

interface Props {
  songs: SongItem[];
}

export const SongList: React.FC<Props> = ({ songs }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full">
      <div className="flex items-center gap-2 mb-6 text-purple-600">
        <Music className="w-5 h-5" />
        <h2 className="text-xl font-bold">أغانٍ رائجة (UAE Region)</h2>
      </div>

      <div className="space-y-4">
        {songs.map((song, index) => (
          <div key={song.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors cursor-default">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0">
               <Music className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-800 truncate">{song.title}</p>
              <p className="text-sm text-slate-500 truncate">{song.artist}</p>
            </div>
            <div className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
              {song.usageCount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
