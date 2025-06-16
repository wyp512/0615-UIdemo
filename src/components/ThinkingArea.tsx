import React from 'react';
import type { Message } from '../types';
import ThinkingHeader from './ThinkingHeader';
import ThinkingContent from './ThinkingContent';

interface ThinkingAreaProps {
  currentThinking: string[];
  messages: Message[];
  formatTime: (date: Date) => string;
  mockThinkingSteps: string[];
  selectedCodeBlock: string | null;
}

const ThinkingArea: React.FC<ThinkingAreaProps> = ({
  currentThinking,
  messages,
  formatTime,
  mockThinkingSteps,
  selectedCodeBlock
}) => {
  return (
    <div className="flex-1 bg-gray-50 border border-gray-300 rounded-2xl flex flex-col m-4 shadow-lg">
      <ThinkingHeader />
      
      <ThinkingContent 
        currentThinking={currentThinking}
        messages={messages}
        formatTime={formatTime}
        mockThinkingSteps={mockThinkingSteps}
        selectedCodeBlock={selectedCodeBlock}
      />
    </div>
  );
};

export default ThinkingArea; 