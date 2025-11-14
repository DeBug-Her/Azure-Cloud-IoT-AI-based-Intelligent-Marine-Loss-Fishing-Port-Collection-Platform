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

      {/* 홈/검색 버튼 */}
      <div className="flex gap-2">
        <button
          onClick={() => setCurrentView('home')}
          className={`flex-1 py-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
            currentView === 'home'
              ? 'gradient-bg-blue text-white shadow-lg'
              : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-650' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs font-semibold">홈</span>
        </button>
        <button
          onClick={() => setCurrentView('search')}
          className={`flex-1 py-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
            currentView === 'search'
              ? 'gradient-bg-blue text-white shadow-lg'
              : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-650' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-xs font-semibold">검색</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
