import React, { useState } from 'react';
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
  const [isExecExpanded, setIsExecExpanded] = useState<boolean>(true);

  const toggleExecSection = () => {
    setIsExecExpanded(prev => !prev);
  };

  // 模拟控制台执行过程
  const generateConsoleLog = (message: Message, userMessage?: Message) => {
    if (message.type !== 'assistant') return null;

    // 根据用户问题生成相关的选项
    const generateOptionsBasedOnQuestion = (question: string) => {
      if (question.includes('React') || question.includes('useState')) {
        return ["基础语法解释", "实际代码示例", "最佳实践指导", "常见问题解答"];
      } else if (question.includes('咖啡')) {
        return ["办公室快速冲泡", "家庭休闲享用", "户外/旅行便携", "社交场合分享"];
      } else {
        return ["详细解释说明", "提供具体示例", "相关知识扩展", "实用建议指导"];
      }
    };

    const userQuestion = userMessage?.content || '如何更好地理解这个问题？';
    const options = generateOptionsBasedOnQuestion(userQuestion);
    const selectedOptions = options.slice(0, 3);

    return {
      question: `基于用户问题"${userQuestion}"，您希望获得哪些类型的帮助？`,
      options: selectedOptions,
      answer: selectedOptions,
      message: selectedOptions
    };
  };

  const latestAssistantMessage = messages
    .filter(msg => msg.type === 'assistant')
    .slice(-1)[0];

  const latestUserMessage = messages
    .filter(msg => msg.type === 'user')
    .slice(-1)[0];

  const consoleData = latestAssistantMessage ? generateConsoleLog(latestAssistantMessage, latestUserMessage) : null;

  return (
    <div className="flex-1 overflow-y-auto bg-white font-mono text-sm">
      {currentThinking.length > 0 ? (
        <div className="p-4 space-y-2">
          <div className="text-blue-600 font-semibold">▶ exec requestInteraction</div>
          {currentThinking.map((step, index) => (
            <div key={index} className="text-gray-600 pl-4">
              {step}
            </div>
          ))}
        </div>
      ) : consoleData ? (
        <div className="p-4 space-y-3">
          {/* exec 命令 - 可折叠 */}
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
            onClick={toggleExecSection}
          >
            <span className="text-gray-400">
              {isExecExpanded ? '▼' : '▶'}
            </span>
            <span className="text-blue-600 font-semibold">exec requestInteraction</span>
          </div>

          {isExecExpanded && (
            <div className="pl-6 space-y-3">
              {/* args 部分 - 直接显示，不可折叠 */}
              <div>
                <div className="text-gray-700 font-medium mb-2">▸ args</div>
                <div className="pl-4 space-y-1">
                  <div className="text-gray-600">
                    <span className="text-purple-600">options</span>: [
                    {consoleData.options.map((option, index) => (
                      <span key={index} className="text-green-600">
                        "{option}"{index < consoleData.options.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                    ]
                  </div>
                  <div className="text-gray-600">
                    <span className="text-purple-600">question</span>: <span className="text-green-600">"{consoleData.question}"</span>
                  </div>
                </div>
              </div>

              {/* result 部分 - 直接显示，不可折叠 */}
              <div>
                <div className="text-gray-700 font-medium mb-2">▸ result</div>
                <div className="pl-4">
                  <div className="text-gray-600">
                    <span className="text-purple-600">answer</span>: [
                    {consoleData.answer.map((answer, index) => (
                      <span key={index} className="text-green-600">
                        "{answer}"{index < consoleData.answer.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                    ]
                  </div>
                </div>
              </div>

              {/* message 部分 - 直接显示，不可折叠 */}
              <div>
                <div className="text-gray-700 font-medium mb-2">▸ message</div>
                <div className="pl-4">
                  <div className="text-gray-600">
                    [
                    {consoleData.message.map((msg, index) => (
                      <span key={index} className="text-green-600">
                        "{msg}"{index < consoleData.message.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                    ]
                  </div>
                </div>
              </div>

              {/* 时间戳 */}
              <div className="text-xs text-gray-400 pt-2 border-t border-gray-200">
                执行时间: {latestAssistantMessage ? formatTime(latestAssistantMessage.timestamp) : ''}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 text-gray-500 text-center">
          等待执行请求...
        </div>
      )}
    </div>
  );
};

export default ThinkingContent; 