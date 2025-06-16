import React from 'react';

const ChatHeader: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
      <div className="flex items-center">
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-800">AI智能体 demo</h1>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader; 