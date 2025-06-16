import React, { useState } from 'react';
import type { Message } from '../types';

interface CodeExecutionBlockProps {
  message: Message;
  userMessage?: Message;
  formatTime: (date: Date) => string;
  variant?: 'chat' | 'console';
}

const CodeExecutionBlock: React.FC<CodeExecutionBlockProps> = ({
  message,
  userMessage,
  formatTime,
  variant = 'chat'
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

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

  const executionData = {
    question: `您希望这款冻干咖啡主要在什么场景下被消费？`,
    options: selectedOptions,
    answer: selectedOptions,
    message: selectedOptions
  };

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };

  // 聊天区域样式
  if (variant === 'chat') {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
        <div 
          className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded mb-2"
          onClick={toggleExpanded}
        >
          <span className="text-gray-500 text-xs">
            {isExpanded ? '⯆' : '⯈'}
          </span>
          <span className="text-blue-600 font-semibold">exec requestInteraction</span>
        </div>
        
        {isExpanded && (
          <>
            {/* 参数部分 */}
            <div className="mb-3">
              <div className="text-xs text-gray-600 mb-1">▶ args</div>
              <div className="bg-white border border-gray-200 rounded p-2 text-xs text-gray-700">
                <span className="text-blue-600">options:</span> [
                {executionData.options.map((option, index) => (
                  <span key={index} className="text-green-600">
                    "{option}"{index < executionData.options.length - 1 ? ', ' : ''}
                  </span>
                ))}
                ]
              </div>
            </div>
            
            <div className="mb-3">
              <div className="text-xs text-gray-600 mb-1">▶ question:</div>
              <div className="bg-white border border-gray-200 rounded p-2 text-xs text-gray-700">
                <span className="text-green-600">"{executionData.question}"</span>
              </div>
            </div>
            
            {/* 结果部分 */}
            <div className="mb-3">
              <div className="text-xs text-gray-600 mb-1">▶ result</div>
              <div className="bg-white border border-gray-200 rounded p-2 text-xs text-gray-700">
                <span className="text-blue-600">answer:</span> [
                {executionData.answer.map((answer, index) => (
                  <span key={index} className="text-green-600">
                    "{answer}"{index < executionData.answer.length - 1 ? ', ' : ''}
                  </span>
                ))}
                ]
              </div>
            </div>
            
            {/* 消息部分 */}
            <div>
              <div className="text-xs text-gray-600 mb-1">▶ message</div>
              <div className="bg-white border border-gray-200 rounded p-2 text-xs text-gray-700">
                [
                {executionData.message.map((msg, index) => (
                  <span key={index} className="text-green-600">
                    "{msg}"{index < executionData.message.length - 1 ? ', ' : ''}
                  </span>
                ))}
                ]
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // 控制台样式
  return (
    <div className="pl-4 space-y-3 bg-white rounded-lg p-3 border border-gray-200">
      {/* args 部分 */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-gray-500 text-xs">⯈</span>
          <span className="text-gray-700 font-medium">args</span>
        </div>
        <div className="pl-4 space-y-2 text-xs">
          <div>
            <span className="text-blue-600">options</span>
            <span className="text-gray-600">: [</span>
          </div>
          <div className="pl-4">
            {executionData.options.map((option, index) => (
              <div key={index} className="text-green-600">
                "{option}"{index < executionData.options.length - 1 ? ',' : ''}
              </div>
            ))}
          </div>
          <div className="text-gray-600">]</div>
          
          <div className="pt-2">
            <span className="text-blue-600">question</span>
            <span className="text-gray-600">: </span>
            <span className="text-green-600">"{executionData.question}"</span>
          </div>
        </div>
      </div>

      {/* result 部分 */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-gray-500 text-xs">⯈</span>
          <span className="text-gray-700 font-medium">result</span>
        </div>
        <div className="pl-4 text-xs">
          <div>
            <span className="text-blue-600">answer</span>
            <span className="text-gray-600">: [</span>
          </div>
          <div className="pl-4">
            {executionData.answer.map((answer, index) => (
              <div key={index} className="text-green-600">
                "{answer}"{index < executionData.answer.length - 1 ? ',' : ''}
              </div>
            ))}
          </div>
          <div className="text-gray-600">]</div>
        </div>
      </div>

      {/* message 部分 */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-gray-500 text-xs">⯈</span>
          <span className="text-gray-700 font-medium">message</span>
        </div>
        <div className="pl-4 text-xs">
          <div className="text-gray-600">[</div>
          <div className="pl-4">
            {executionData.message.map((msg, index) => (
              <div key={index} className="text-green-600">
                "{msg}"{index < executionData.message.length - 1 ? ',' : ''}
              </div>
            ))}
          </div>
          <div className="text-gray-600">]</div>
        </div>
      </div>
    </div>
  );
};

export default CodeExecutionBlock; 