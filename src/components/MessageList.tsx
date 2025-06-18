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
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm">
        <div className="text-gray-800 text-sm leading-relaxed">
          {message.content}
        </div>
      </div>
    </div>
  );

  const renderAssistantMessage = (message: Message) => {
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

  const renderBeautyPreferenceMessage = (message: Message) => {
    return (
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
        
        {/* 添加美妆产品消费者偏好选项卡 */}
        <OptionTabs
          title="您希望重点了解哪类美妆产品的消费者偏好？"
          options={[
            "护肤类产品",
            "彩妆类产品", 
            "香水和身体护理类",
            "所有美妆品类的整体偏好"
          ]}
          onOptionSelect={(option) => {
            console.log('选择了美妆产品类型:', option);
          }}
        />
        
        {/* 添加衔接文字 */}
        <div className="text-gray-800 text-sm leading-relaxed mb-4">
          非常好！最后一个问题，这将帮助我们更精准地定位调研范围：
        </div>
        
        {/* 添加地理范围调研代码执行块 */}
        <CodeExecutionBlock
          message={message}
          userMessage={messages.find(m => m.type === 'user' && m.id < message.id)}
          formatTime={formatTime}
          variant="chat"
          onCodeBlockView={onCodeBlockView}
          blockId="geographic-scope"
        />
        
        {/* 添加地理或人口范围选项卡 */}
        <OptionTabs
          title="您希望调研的地理或人口范围是？"
          options={[
            "整个东南亚地区",
            "特定国家(如泰国、新加坡、印尼等)",
            "城市vs乡村市场对比",
            "不同年龄层的偏好对比"
          ]}
          onOptionSelect={(option) => {
            console.log('选择了调研范围:', option);
          }}
        />
        
        {/* 添加结尾感谢文字 */}
        <div className="text-gray-800 text-sm leading-relaxed mb-4">
          感谢您的回答！根据您的选择，我将为您调研整个东南亚地区的护肤类产品消费者画像和偏好。
        </div>
        
        {/* 添加分析师分配代码执行块 */}
        <CodeExecutionBlock
          message={message}
          userMessage={messages.find(m => m.type === 'user' && m.id < message.id)}
          formatTime={formatTime}
          variant="chat"
          onCodeBlockView={onCodeBlockView}
          blockId="analyst-assignment"
        />
        
        {/* 添加护肤研究标题 */}
        <div className="mt-4">
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 shadow-sm">
            <div className="text-gray-800 text-sm font-medium">
              📝 东南亚地区护肤类产品消费者画像与偏好研究
            </div>
          </div>
        </div>
        
        {/* 添加研究计划概要 */}
        <div className="mt-4 text-gray-800 text-base leading-relaxed">
          <div className="mb-4">
            <div className="font-bold text-lg mb-2">研究计划概要</div>
            <div className="mb-3">我们将开展东南亚地区护肤类产品消费者画像与偏好研究，以下是工作流程和预期产出：</div>
          </div>
          
          <div className="mb-4">
            <div className="font-bold mb-2">📋 工作流程</div>
            <div className="pl-3">
              <div>1. 收集东南亚护肤市场消费者数据</div>
              <div>2. 分析消费者画像特征</div>
              <div>3. 研究护肤产品偏好趋势</div>
              <div>4. 总结关键发现并生成报告</div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="font-bold mb-2">🔄 关键环节</div>
            <div className="pl-3">
              <div>· 消费者人口统计学特征分析</div>
              <div>· 护肤产品购买行为研究</div>
              <div>· 品牌偏好与决策因素探索</div>
              <div>· 区域差异性比较</div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="font-bold mb-2">📊 最终产出</div>
            <div className="pl-3">
              <div>· 东南亚护肤消费者画像全景图</div>
              <div>· 主流护肤产品偏好分析</div>
              <div>· 市场趋势与机会洞察</div>
              <div>· actionable建议</div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="font-bold mb-2">⏱️ 预计耗时</div>
            <div className="pl-3">
              <div>· 约30分钟完成全部研究与报告生成</div>
            </div>
          </div>
          
          <div className="mt-4 text-gray-600">
            现在我将开始收集相关数据，请稍候...
          </div>
        </div>
        
        {/* 添加消费者画像搜索代码执行块 */}
        <div className="mt-6">
          <CodeExecutionBlock
            message={message}
            userMessage={messages.find(m => m.type === 'user' && m.id < message.id)}
            formatTime={formatTime}
            variant="chat"
            onCodeBlockView={onCodeBlockView}
            blockId="persona-search"
          />
        </div>
      </div>
    );
  };

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
            // 检查是否是护肤研究的第二个消息（id为6）
            message.id === 6 && message.content.includes('感谢您的选择！了解到您对东南亚美妆市场的主流美妆品类偏好特别感兴趣') ?
              renderBeautyPreferenceMessage(message) :
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
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm">
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