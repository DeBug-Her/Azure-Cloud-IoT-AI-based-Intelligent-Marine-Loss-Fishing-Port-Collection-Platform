import React from 'react';

const Header = ({ isDarkMode, setIsDarkMode, currentView, setCurrentView }) => {
  return (
    <div className={`p-5 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} sticky top-0 z-10 ${isDarkMode ? 'glass-effect-dark' : 'glass-effect'}`}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 gradient-bg-blue rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">🌊</span>
          </div>
          <div>
            <h1 className="text-lg font-bold">Marine Monitor</h1>
            <p className="text-xs opacity-60">실시간 해양 모니터링</p>
          </div>
        </div>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-200`}
        >
          <span className="text-xl">{isDarkMode ? '☀️' : '🌙'}</span>
        </button>
      </div>

      {/* 탐지/수거 버튼 */}
      <div className="flex gap-2">
        <button
          onClick={() => setCurrentView('detection')}
          className={`flex-1 py-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
            currentView === 'detection'
              ? 'gradient-bg-blue text-white shadow-lg'
              : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-650' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-xs font-semibold">탐지</span>
        </button>
        <button
          onClick={() => setCurrentView('collection')}
          className={`flex-1 py-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
            currentView === 'collection'
              ? 'gradient-bg-blue text-white shadow-lg'
              : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-650' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span className="text-xs font-semibold">수거</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
