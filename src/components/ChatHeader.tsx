import React from 'react';

const ChatHeader: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white p-3 shadow-lg">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mr-3">
          A
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold">atypica.AI</h1>
          <p className="text-gray-300 text-xs">AI智能助手</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader; 