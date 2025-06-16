import React from 'react';

const ChatHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 shadow-lg">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold text-xl mr-4">
          A
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">atypica.AI</h1>
          <p className="text-blue-100 text-sm">AI智能助手</p>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
          <span className="text-blue-100 text-sm">在线</span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader; 