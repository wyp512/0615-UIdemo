import React, { useState } from 'react';
import type { Message } from '../types';
import CodeExecutionBlock from './CodeExecutionBlock';

interface ThinkingContentProps {
  currentThinking: string[];
  messages: Message[];
  formatTime: (date: Date) => string;
  mockThinkingSteps: string[];
  selectedCodeBlock: string | null;
}

const ThinkingContent: React.FC<ThinkingContentProps> = ({
  currentThinking,
  messages,
  formatTime,
  mockThinkingSteps: _mockThinkingSteps,
  selectedCodeBlock
}) => {
  const [isExecExpanded, setIsExecExpanded] = useState<boolean>(false);

  const toggleExecSection = () => {
    setIsExecExpanded(prev => !prev);
  };

  const latestAssistantMessage = messages
    .filter(msg => msg.type === 'assistant')
    .slice(-1)[0];

  const latestUserMessage = messages
    .filter(msg => msg.type === 'user')
    .slice(-1)[0];

  // 根据selectedCodeBlock获取对应的消息和用户消息
  const getSelectedCodeBlockMessages = () => {
    if (!selectedCodeBlock) {
      return {
        message: latestAssistantMessage,
        userMessage: latestUserMessage
      };
    }

    // 根据blockId确定对应的消息
    if (selectedCodeBlock === 'skincare-market') {
      // 第二个历史记录的第一个AI消息
      const message = messages.find(msg => msg.id === 4) || latestAssistantMessage;
      const userMessage = messages.find(msg => msg.id === 3) || latestUserMessage;
      return { message, userMessage };
    } else if (selectedCodeBlock === 'message-6') {
      // 第二个历史记录的第二个AI消息
      const message = messages.find(msg => msg.id === 6) || latestAssistantMessage;
      const userMessage = messages.find(msg => msg.id === 3) || latestUserMessage;
      return { message, userMessage };
    } else if (selectedCodeBlock === 'scene') {
      // 第一个历史记录的场景选择代码块
      const message = messages.find(msg => msg.id === 2) || latestAssistantMessage;
      const userMessage = messages.find(msg => msg.id === 1) || latestUserMessage;
      return { message, userMessage };
    } else if (selectedCodeBlock === 'consumer') {
      // 第一个历史记录的消费者选择代码块
      const message = messages.find(msg => msg.id === 2) || latestAssistantMessage;
      const userMessage = messages.find(msg => msg.id === 1) || latestUserMessage;
      return { message, userMessage };
    } else {
      return {
        message: latestAssistantMessage,
        userMessage: latestUserMessage
      };
    }
  };

  // 创建示例消息数据（作为后备）
  const exampleMessage: Message = {
    id: 999,
    type: 'assistant',
    content: '示例内容',
    timestamp: new Date()
  };

  const exampleUserMessage: Message = {
    id: 998,
    type: 'user', 
    content: '您希望这款冻干咖啡主要在什么场景下被消费？',
    timestamp: new Date()
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 font-mono text-sm rounded-b-2xl">
      {currentThinking.length > 0 ? (
        <div className="p-4 space-y-2">
          <div className="exec-request-interaction">{'>'}_  exec requestInteraction</div>
          {currentThinking.map((step, index) => (
            <div key={index} className="text-gray-600 pl-4">
              {step}
            </div>
          ))}
        </div>
      ) : selectedCodeBlock ? (
        <div className="p-4 space-y-2">
          {/* 显示选中的代码执行块 */}
          <div 
            className="flex items-center space-x-2 cursor-pointer p-2 rounded"
            onClick={toggleExecSection}
          >
            <span className="text-gray-500 text-xs">
              {isExecExpanded ? '∨' : '>_'}
            </span>
            <span className="exec-request-interaction">exec requestInteraction</span>
          </div>

          {isExecExpanded && (
            <CodeExecutionBlock
              message={getSelectedCodeBlockMessages().message || exampleMessage}
              userMessage={getSelectedCodeBlockMessages().userMessage || exampleUserMessage}
              formatTime={formatTime}
              variant="console"
              blockId={selectedCodeBlock}
            />
          )}
        </div>
      ) : latestAssistantMessage ? (
        <div className="p-4 space-y-2">
          {/* exec 命令 - 可折叠 */}
          <div 
            className="flex items-center space-x-2 cursor-pointer p-2 rounded"
            onClick={toggleExecSection}
          >
            <span className="text-gray-500 text-xs">
              {isExecExpanded ? '∨' : '>_'}
            </span>
            <span className="exec-request-interaction">exec requestInteraction</span>
          </div>

          {isExecExpanded && (
            <CodeExecutionBlock
              message={latestAssistantMessage}
              userMessage={latestUserMessage}
              formatTime={formatTime}
              variant="console"
            />
          )}
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {/* 控制台示例 */}
          <div 
            className="flex items-center space-x-2 cursor-pointer p-2 rounded"
            onClick={toggleExecSection}
          >
            <span className="text-gray-500 text-xs">
              {isExecExpanded ? '∨' : '>_'}
            </span>
            <span className="exec-request-interaction">exec requestInteraction</span>
          </div>

          {isExecExpanded && (
            <CodeExecutionBlock
              message={exampleMessage}
              userMessage={exampleUserMessage}
              formatTime={formatTime}
              variant="console"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ThinkingContent; 