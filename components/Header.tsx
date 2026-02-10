import React from 'react';
import { Scroll } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-red-700"></div>
      
      <div className="flex items-center gap-3 mb-2 animate-fade-in-down">
        <Scroll className="w-8 h-8 text-red-700" />
        <h1 className="text-4xl md:text-5xl font-black text-red-800 tracking-widest serif-font drop-shadow-sm">
          職涯神諭
        </h1>
        <Scroll className="w-8 h-8 text-red-700 scale-x-[-1]" />
      </div>
      
      <div className="flex items-center gap-2 mt-2">
        <div className="h-[1px] w-12 bg-yellow-600"></div>
        <h2 className="text-lg md:text-xl font-bold text-yellow-700 serif-font">關聖帝君指路</h2>
        <div className="h-[1px] w-12 bg-yellow-600"></div>
      </div>

      <p className="mt-4 text-gray-500 max-w-md px-4 text-sm md:text-base">
        誠心祈求，文衡帝君將依汝之資歷與願景，賜予職涯錦囊三策。
      </p>
    </header>
  );
};

export default Header;