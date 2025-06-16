import React from 'react';

const ThinkingHeader: React.FC = () => {
  return (
    <div className="p-6 border-b border-purple-200 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
      <h2 className="text-xl font-bold flex items-center">
        <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></div>
        思考过程
      </h2>
      <p className="text-purple-100 text-sm mt-1">AI的推理过程实时展示</p>
    </div>
  );
};

export default ThinkingHeader; 