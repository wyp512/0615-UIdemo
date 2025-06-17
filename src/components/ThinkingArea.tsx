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
  showContent?: boolean;
}

const ThinkingArea: React.FC<ThinkingAreaProps> = ({
  currentThinking,
  messages,
  formatTime,
  mockThinkingSteps,
  selectedCodeBlock,
  showContent = true
}) => {
  return (
    <div className="flex-1 bg-gray-50 border border-gray-300 rounded-2xl flex flex-col m-4 shadow-lg">
      <ThinkingHeader />
      
      {showContent ? (
        <ThinkingContent 
          currentThinking={currentThinking}
          messages={messages}
          formatTime={formatTime}
          mockThinkingSteps={mockThinkingSteps}
          selectedCodeBlock={selectedCodeBlock}
        />
      ) : (
        <div className="flex-1"></div>
      )}
    </div>
  );
};

export default ThinkingArea; 