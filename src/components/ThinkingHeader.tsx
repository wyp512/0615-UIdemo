import React from 'react';

const ThinkingHeader: React.FC = () => {
  return (
    <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-800">
        atypica.AI Console
      </h2>
      <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200 flex items-center">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.13 8.13 0 01-2.939-.539l-2.122 2.122A1 1 0 017.5 21H3a1 1 0 01-1-1v-4.5a1 1 0 01.439-.858l2.122-2.122A8.13 8.13 0 015 10c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
        </svg>
      </button>
    </div>
  );
};

export default ThinkingHeader; 