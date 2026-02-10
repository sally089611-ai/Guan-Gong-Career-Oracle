import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import LoadingView from './components/LoadingView';
import OracleResult from './components/OracleResult';
import { UserCriteria, OracleResponse, AppState } from './types';
import { fetchDivineGuidance } from './services/geminiService';
import { AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<OracleResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFormSubmit = async (criteria: UserCriteria) => {
    setAppState(AppState.LOADING);
    setErrorMsg(null);
    setResult(null);

    try {
      const response = await fetchDivineGuidance(criteria);
      setResult(response);
      setAppState(AppState.SUCCESS);
    } catch (error) {
      console.error(error);
      setAppState(AppState.ERROR);
      setErrorMsg("神諭傳輸受阻，請檢查網路連接或稍後再試。");
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setResult(null);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-stone-50 bg-pattern flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-4 md:py-8">
        
        {appState === AppState.IDLE && (
          <div className="animate-fade-in-up">
            <InputForm onSubmit={handleFormSubmit} appState={appState} />
          </div>
        )}

        {appState === AppState.LOADING && (
          <LoadingView />
        )}

        {appState === AppState.ERROR && (
          <div className="max-w-xl mx-auto text-center mt-10 p-6 bg-red-50 border border-red-200 rounded-xl">
             <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
             <h3 className="text-lg font-bold text-red-800 mb-2">發生錯誤</h3>
             <p className="text-gray-600 mb-6">{errorMsg}</p>
             <button 
               onClick={handleReset}
               className="px-6 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors"
             >
               重新嘗試
             </button>
          </div>
        )}

        {appState === AppState.SUCCESS && result && (
          <OracleResult data={result} onReset={handleReset} />
        )}

      </main>

      <footer className="w-full py-6 text-center text-gray-400 text-sm bg-stone-100 border-t border-stone-200">
        <p>&copy; {new Date().getFullYear()} 關聖帝君職涯引導所 | Powered by Gemini & Cake.me Mock Data</p>
      </footer>
    </div>
  );
};

export default App;