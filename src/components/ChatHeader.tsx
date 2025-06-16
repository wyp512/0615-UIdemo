import React from 'react';

const ChatHeader: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
          A
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-800">atypica.AI</h1>
          <p className="text-gray-500 text-sm">AI智能助手</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader; 