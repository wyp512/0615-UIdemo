import React from 'react';
import type { Message } from '../types';

interface ThinkingContentProps {
  currentThinking: string[];
  messages: Message[];
  formatTime: (date: Date) => string;
  mockThinkingSteps: string[];
}

const ThinkingContent: React.FC<ThinkingContentProps> = ({
  currentThinking,
  messages,
  formatTime,
  mockThinkingSteps
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      {currentThinking.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-800 mb-4">当前思考步骤:</h3>
          {currentThinking.map((step, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm transform transition-all duration-300 hover:shadow-md">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm text-gray-700 leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-purple-800">最近的思考过程:</h3>
          {messages
            .filter(msg => msg.type === 'assistant' && msg.thinking)
            .slice(-1)
            .map((message) => (
              <div key={message.id} className="space-y-3">
                <div className="text-xs text-purple-400 mb-3 font-medium">
                  {formatTime(message.timestamp)}
                </div>
                {message.thinking?.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700 leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            ))
          }
          
          <div className="mt-8 p-4 bg-white rounded-xl shadow-sm border border-purple-200">
            <h4 className="text-sm font-semibold text-purple-800 mb-3">思考流程模板:</h4>
            <div className="space-y-2">
              {mockThinkingSteps.map((step, index) => (
                <div key={index} className="text-xs text-gray-600 flex items-center">
                  <span className="w-5 h-5 bg-purple-500 text-white rounded-full text-xs flex items-center justify-center mr-3 font-bold">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThinkingContent; 