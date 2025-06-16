import React from 'react';
import type { Message } from '../types';
import CodeExecutionBlock from './CodeExecutionBlock';

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
  // 模拟的咖啡研发对话内容
  const mockMessages = [
    {
      id: 1,
      type: 'user' as const,
      content: '我是咖啡品牌的新品研发，需要针对白领推出一款融合风味的冻干咖啡，需要独特一些，哪种风味更受大家喜爱：1. 椰子+凤梨 2. 西瓜+芒果 3. 苹果+水蜜桃 4. 香蕉+荔枝',
      timestamp: new Date('2024-12-19 10:30:00')
    }
  ];

  const mockAssistantMessage = {
    id: 2,
    type: 'assistant' as const,
    content: '您好！我很乐意帮助您进行咖啡新品风味的用户研究。我理解您是咖啡品牌的新品研发人员，正在考虑为白领推出一款融合风味的冻干咖啡，并希望了解哪种风味组合更受欢迎。',
    timestamp: new Date('2024-12-19 10:31:00')
  };

  const renderUserMessage = (message: any) => (
    <div className="mb-4">
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
        <div className="text-gray-800 text-sm leading-relaxed">
          {message.content}
        </div>
      </div>
    </div>
  );

  const renderAssistantMessage = () => (
    <div className="mb-6">
      <div className="text-gray-800 text-sm leading-relaxed mb-4">
        您好！我很乐意帮助您进行咖啡新品风味的用户研究。我理解您是咖啡品牌的新品研发人员，正在考虑为白领推出一款融合风味的冻干咖啡，并希望了解哪种风味组合更受欢迎。
      </div>
      <div className="text-gray-800 text-sm leading-relaxed mb-4">
        让我先调研一些问题来更好地了解您的研究背景，以便提供更有针对性的调研服务。
      </div>
      
      {/* 使用共享的代码执行块组件 */}
      <CodeExecutionBlock
        message={mockAssistantMessage}
        userMessage={mockMessages[0]}
        formatTime={formatTime}
        variant="chat"
      />
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {/* 渲染模拟消息 */}
      {mockMessages.map((message) => (
        <div key={message.id}>
          {renderUserMessage(message)}
        </div>
      ))}
      
      {/* AI回答 */}
      {renderAssistantMessage()}
      
      {/* 动态消息列表 - 使用相同的白色样式 */}
      {messages.length > 0 && messages.map((message) => (
        <div key={message.id}>
          {message.type === 'user' ? (
            renderUserMessage(message)
          ) : (
            <div className="mb-6">
              <div className="text-gray-800 text-sm leading-relaxed mb-4">
                {message.content}
              </div>
              
              {/* 为AI消息添加代码执行块 */}
              <CodeExecutionBlock
                message={message}
                userMessage={messages.find(m => m.type === 'user' && m.id < message.id)}
                formatTime={formatTime}
                variant="chat"
              />
            </div>
          )}
        </div>
      ))}
      
      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className="text-sm text-gray-600 ml-2">AI正在思考...</span>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList; 