import React from 'react';
import type { Message } from '../types';
import CodeExecutionBlock from './CodeExecutionBlock';
import OptionTabs from './OptionTabs';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  formatTime: (date: Date) => string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onCodeBlockView: (blockType: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  isTyping,
  formatTime,
  messagesEndRef,
  onCodeBlockView
}) => {
  const renderUserMessage = (message: Message) => (
    <div className="mb-4">
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
        <div className="text-gray-800 text-sm leading-relaxed">
          {message.content}
        </div>
      </div>
    </div>
  );

  const renderAssistantMessage = (message: Message) => {
    // 检查是否是第一个历史记录的咖啡相关消息（通过 ID 和内容判断）
    const isCoffeeResearchMessage = message.id === 2 && message.content.includes('您好！我很乐意帮助您进行咖啡新品风味的用户研究');
    
    return (
      <div className="mb-6">
        <div className="text-gray-800 text-sm leading-relaxed mb-4">
          您好！我很乐意帮助您进行咖啡新品风味的用户研究。我理解您是咖啡品牌的新品研发人员，正在考虑为白领推出一款融合风味的冻干咖啡，并希望了解哪种风味组合更受欢迎。
        </div>
        <div className="text-gray-800 text-sm leading-relaxed mb-4">
          让我先调研一些问题来更好地了解您的研究背景，以便提供更有针对性的调研服务。
        </div>
        
        {/* 为AI消息添加代码执行块 */}
        <CodeExecutionBlock
          message={message}
          userMessage={messages.find(m => m.type === 'user' && m.id < message.id)}
          formatTime={formatTime}
          variant="chat"
          contentType="scene"
          onCodeBlockView={onCodeBlockView}
          blockId="scene"
        />
        
        {/* 添加咖啡消费场景选项卡 */}
        <OptionTabs
          title="你希望这款咖啡主要在什么场景下被消费？"
          options={[
            "办公室快速冲泡",
            "家庭休闲享用", 
            "户外/旅行便携",
            "社交场合分享"
          ]}
          onOptionSelect={(option) => {
            console.log('选择了场景:', option);
          }}
        />
        
        {/* 添加新的文字段落 */}
        <div className="text-gray-800 text-sm leading-relaxed mb-4">
          谢谢您的回答！了解到这款冻干咖啡主要面向办公室快速冲泡、户外/旅行便携以及家庭休闲享用场景。让我再了解一下关于目标消费者的信息：
        </div>
        
        {/* 在指定文字下方添加代码执行块 */}
        <CodeExecutionBlock
          message={message}
          userMessage={messages.find(m => m.type === 'user' && m.id < message.id)}
          formatTime={formatTime}
          variant="chat"
          contentType="consumer"
          onCodeBlockView={onCodeBlockView}
          blockId="consumer"
        />
      </div>
    );
  };

  const renderSkincareResearchMessage = (message: Message) => {
    return (
      <div className="mb-6">
        <div className="text-gray-800 text-sm leading-relaxed mb-4">
          {message.content}
        </div>
        
        {/* 第一个代码执行块：市场方面选择 */}
        <CodeExecutionBlock
          message={message}
          userMessage={messages.find(m => m.type === 'user' && m.id < message.id)}
          formatTime={formatTime}
          variant="chat"
          onCodeBlockView={onCodeBlockView}
          blockId="skincare-market"
        />
        
        {/* 添加护肤市场调研选项卡 */}
        <OptionTabs
          title="您对东南亚美妆市场的哪个方面最感兴趣？"
          options={[
            "消费者购买决策因素",
            "主流美妆品类偏好", 
            "线上vs线下购物渠道偏好",
            "本土vs国际品牌偏好"
          ]}
          onOptionSelect={(option) => {
            console.log('选择了调研方向:', option);
          }}
        />
      </div>
    );
  };

  const renderRegularAssistantMessage = (message: Message) => (
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
        onCodeBlockView={onCodeBlockView}
        blockId={`message-${message.id}`}
      />
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-white">
      {/* 只渲染传入的消息列表 */}
      {messages.length > 0 && messages.map((message) => (
        <div key={message.id}>
          {message.type === 'user' ? (
            renderUserMessage(message)
          ) : (
            // 检查是否是特殊的咖啡研究消息
            message.id === 2 && message.content.includes('您好！我很乐意帮助您进行咖啡新品风味的用户研究') ? 
              renderAssistantMessage(message) : 
            // 检查是否是护肤研究的第一个消息
            message.id === 4 && message.content.includes('您好！我很乐意帮您调研东南亚地区的美妆消费者画像和偏好') ?
              renderSkincareResearchMessage(message) :
              renderRegularAssistantMessage(message)
          )}
        </div>
      ))}
      
      {/* 如果没有消息，显示空状态 */}
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <div className="mb-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto opacity-50">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <p>开始对话吧</p>
            <p className="text-sm mt-1">在下方输入框中输入您的问题</p>
          </div>
        </div>
      )}
      
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