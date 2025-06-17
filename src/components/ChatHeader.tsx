import React from 'react';

interface ChatHeaderProps {
  onOpenSidebar: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onOpenSidebar }) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
      <div className="flex items-center">
        <button
          onClick={onOpenSidebar}
          className="mr-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="打开历史记录"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-800">AI智能体 demo</h1>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader; 