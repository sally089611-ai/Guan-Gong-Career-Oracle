import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingView: React.FC = () => {
  return (
    <div className="w-full py-20 flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        {/* 背景脈衝效果 */}
        <div className="absolute inset-0 bg-red-100 rounded-full scale-150 animate-ping opacity-50"></div>
        {/* 旋轉 Icon */}
        <Loader2 className="w-16 h-16 text-red-800 animate-spin relative z-10" />
      </div>

      <div className="text-center space-y-3 z-20">
        <h3 className="text-2xl md:text-3xl font-black text-red-800 serif-font tracking-widest animate-pulse">
          神諭推演中
        </h3>
        <p className="text-stone-500 font-medium text-sm md:text-base flex flex-col gap-1">
          <span>關聖帝君正在審視職涯因緣</span>
          <span className="text-xs text-stone-400">請稍候，指引即將降臨...</span>
        </p>
      </div>
    </div>
  );
};

export default LoadingView;