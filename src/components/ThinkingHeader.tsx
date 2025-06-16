import React from 'react';

const ThinkingHeader: React.FC = () => {
  return (
    <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
      <h2 className="text-lg font-bold text-gray-800">
        atypica.AI Console
      </h2>
      <button className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md border border-gray-300 transition-colors duration-200 flex items-center">
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        跟随最新进度
      </button>
    </div>
  );
};

export default ThinkingHeader; 