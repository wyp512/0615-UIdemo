import React from 'react';
import type { HistoryRecord } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  historyRecords: HistoryRecord[];
  currentHistoryId: number | null;
  onLoadHistory: (recordId: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  historyRecords, 
  currentHistoryId, 
  onLoadHistory
}) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}分钟前`;
    } else if (hours < 24) {
      return `${hours}小时前`;
    } else {
      return `${days}天前`;
    }
  };

  return (
    <>
      {/* 背景遮罩 */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* 侧边栏 */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* 侧边栏头部 */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">历史记录</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* 侧边栏内容 */}
        <div className="p-4 h-full overflow-y-auto">
          {historyRecords.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              <div className="mb-2">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto opacity-50">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <p>暂无历史记录</p>
              <p className="text-sm mt-1">开始对话后这里将显示聊天历史</p>
            </div>
          ) : (
            <div className="space-y-2">
              {historyRecords.map((record) => (
                <div
                  key={record.id}
                  onClick={() => onLoadHistory(record.id)}
                  className={`
                    p-3 rounded-lg cursor-pointer transition-colors
                    ${currentHistoryId === record.id 
                      ? 'bg-blue-50 border-blue-200 border' 
                      : 'hover:bg-gray-50 border border-gray-100'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className={`
                        text-sm font-medium truncate
                        ${currentHistoryId === record.id ? 'text-blue-700' : 'text-gray-900'}
                      `}>
                        {record.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(record.timestamp)}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {record.messages.length} 条消息
                      </p>
                    </div>
                    {currentHistoryId === record.id && (
                      <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar; 