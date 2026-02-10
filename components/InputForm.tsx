import React, { useState } from 'react';
import { UserCriteria, AppState } from '../types';
import { Briefcase, Building2, UserCheck, Sparkles, ChevronRight } from 'lucide-react';

interface InputFormProps {
  onSubmit: (criteria: UserCriteria) => void;
  appState: AppState;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, appState }) => {
  const [formData, setFormData] = useState<UserCriteria>({
    experienceYears: 1,
    industry: '',
    jobTitle: '',
    otherRequirements: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, experienceYears: parseInt(e.target.value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (appState === AppState.LOADING) return;
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl border-t-4 border-red-700 overflow-hidden">
      <div className="bg-red-50 p-4 border-b border-red-100">
        <h3 className="text-red-800 font-bold flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          請輸入求職條件
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        
        {/* Industry & Job Title Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 flex items-center gap-1">
              <Building2 className="w-4 h-4 text-gray-500" /> 產業類別
            </label>
            <input
              type="text"
              name="industry"
              required
              placeholder="例如：金融科技 / 軟體業"
              value={formData.industry}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 flex items-center gap-1">
              <Briefcase className="w-4 h-4 text-gray-500" /> 職位名稱
            </label>
            <input
              type="text"
              name="jobTitle"
              required
              placeholder="例如：前端工程師"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-gray-50"
            />
          </div>
        </div>

        {/* Experience Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-bold text-gray-700 flex items-center gap-1">
              <UserCheck className="w-4 h-4 text-gray-500" /> 年資要求
            </label>
            <span className="text-red-700 font-bold bg-red-50 px-3 py-1 rounded-full text-sm">
              {formData.experienceYears} 年
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            step="1"
            value={formData.experienceYears}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
          <div className="flex justify-between text-xs text-gray-400 px-1">
            <span>社會新鮮人</span>
            <span>資深老鳥</span>
          </div>
        </div>

        {/* Other Requirements */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700">額外條件 (選填)</label>
          <textarea
            name="otherRequirements"
            rows={2}
            placeholder="例如：需具備 TypeScript 經驗、希望是外商文化..."
            value={formData.otherRequirements}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-gray-50"
          />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={appState === AppState.LOADING}
          className={`w-full py-4 px-6 rounded-lg text-white font-bold text-lg shadow-md transition-all transform hover:translate-y-[-2px] flex items-center justify-center gap-2
            ${appState === AppState.LOADING 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800 hover:to-red-700'
            }`}
        >
          {appState === AppState.LOADING ? (
            <>
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              請神中...
            </>
          ) : (
            <>
              誠心祈求指引 <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;