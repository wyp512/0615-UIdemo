import React from 'react';
import type { Message } from '../types';
import ThinkingHeader from './ThinkingHeader';
import ThinkingContent from './ThinkingContent';

interface ThinkingAreaProps {
  currentThinking: string[];
  messages: Message[];
  formatTime: (date: Date) => string;
  mockThinkingSteps: string[];
}

const ThinkingArea: React.FC<ThinkingAreaProps> = ({
  currentThinking,
  messages,
  formatTime,
  mockThinkingSteps
}) => {
  return (
    <div className="flex-1 bg-white border border-gray-300 rounded-lg flex flex-col m-4 shadow-sm">
      <ThinkingHeader />
      
      <ThinkingContent 
        currentThinking={currentThinking}
        messages={messages}
        formatTime={formatTime}
        mockThinkingSteps={mockThinkingSteps}
      />
    </div>
  );
};

export default ThinkingArea; 