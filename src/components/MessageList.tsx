import React from 'react';
import type { Message } from '../types';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  formatTime: (date: Date) => string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  isTyping,
  formatTime,
  messagesEndRef
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`max-w-2xl rounded-2xl p-4 shadow-md transform transition-all duration-300 hover:scale-105 ${
            message.type === 'user' 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-auto' 
              : 'bg-white border border-gray-200 text-gray-800'
          }`}>
            <div className="whitespace-pre-wrap break-words leading-relaxed">
              {message.content}
            </div>
            <div className={`text-xs mt-3 ${
              message.type === 'user' ? 'text-blue-100' : 'text-gray-400'
            }`}>
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      ))}
      
      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-md">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className="text-sm text-gray-500 ml-2">AI正在思考...</span>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList; 