import React from 'react';
import { OracleResponse } from '../types';
import { ScrollText, Award, Star, CheckCircle2, ExternalLink, Sparkles, ChevronRight } from 'lucide-react';

interface OracleResultProps {
  data: OracleResponse;
  onReset: () => void;
}

const OracleResult: React.FC<OracleResultProps> = ({ data, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
      
      {/* 箴言 Section */}
      <div className="bg-amber-50 border-y-4 border-double border-amber-200 p-8 rounded-lg shadow-sm mb-10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <ScrollText size={120} className="text-red-900" />
        </div>
        <h3 className="text-xl font-bold text-red-800 mb-4 serif-font flex items-center justify-center gap-2">
          <span className="w-8 h-[1px] bg-red-800"></span>
          聖帝箴言
          <span className="w-8 h-[1px] bg-red-800"></span>
        </h3>
        <p className="text-2xl md:text-3xl font-black text-gray-800 leading-relaxed serif-font tracking-wide">
          「{data.advice}」
        </p>
      </div>

      {/* 職位推薦 Section */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 serif-font pl-2 border-l-4 border-red-600">
          職位推薦清單
        </h3>
        
        <div className="grid grid-cols-1 gap-6">
          {data.recommendations.map((job, index) => {
            const isTopPick = index === 0;
            return (
              <div 
                key={index}
                className={`relative bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg border 
                  ${isTopPick ? 'border-yellow-400 ring-1 ring-yellow-100' : 'border-gray-200'}`}
              >
                {isTopPick && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-red-900 text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-red-900" /> 上上籤 (首選)
                  </div>
                )}
                
                <div className="p-6 flex flex-col md:flex-row md:items-start gap-4">
                  {/* Rank Badge */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold serif-font border-4
                    ${isTopPick ? 'bg-red-50 border-red-100 text-red-700' : 'bg-gray-50 border-gray-100 text-gray-500'}`}>
                    {job.rank}
                  </div>

                  <div className="flex-grow space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <h4 className="text-xl font-bold text-gray-900 hover:text-red-700 transition-colors cursor-pointer">
                        {job.title}
                      </h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {job.industry}
                      </span>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 font-bold mb-1 flex items-center gap-1">
                        <Award className="w-4 h-4" /> 關鍵技能要求：
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                        {job.skills}
                      </p>
                    </div>
                    
                    <div className="pt-2 flex items-center text-xs text-green-600 font-medium">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> 符合您的求職條件
                    </div>
                  </div>

                  {/* Apply Button (Search Link) */}
                  <div className="flex-shrink-0 mt-4 md:mt-0 md:self-center">
                    <a 
                      href={`https://global.cake.me/l6phVX?q=${encodeURIComponent(job.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full md:w-auto px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 font-medium text-sm transition-colors items-center justify-center gap-1"
                    >
                      查看詳情 <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 錦囊妙計 Section */}
      {data.toolGuide && (
        <div className="mb-12 bg-gradient-to-r from-red-800 to-red-900 rounded-xl shadow-xl overflow-hidden text-white relative">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
            <Sparkles size={200} />
          </div>
          
          <div className="p-8 md:p-10 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 bg-white/10 p-4 rounded-full border border-white/20 backdrop-blur-sm">
                <ScrollText className="w-12 h-12 text-yellow-300" />
              </div>
              
              <div className="flex-grow text-center md:text-left space-y-3">
                <h3 className="text-2xl font-bold text-yellow-300 serif-font tracking-wider">
                  關聖帝君賜予錦囊妙計
                </h3>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium serif-font">
                  「{data.toolGuide.advice}」
                </p>
              </div>

              <div className="flex-shrink-0 mt-4 md:mt-0">
                <a 
                  href={data.toolGuide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-red-900 rounded-full font-bold hover:bg-yellow-300 transition-all shadow-lg transform hover:scale-105 active:scale-95"
                >
                  領取錦囊 <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-12 pb-12">
        <button 
          onClick={onReset}
          className="text-gray-500 hover:text-red-700 font-medium underline decoration-dotted underline-offset-4 transition-colors"
        >
          再次祈求指引
        </button>
      </div>
    </div>
  );
};

export default OracleResult;