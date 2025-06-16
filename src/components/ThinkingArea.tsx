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
    <div className="w-96 bg-gradient-to-b from-purple-50 to-purple-100 border-l border-purple-200 flex flex-col">
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