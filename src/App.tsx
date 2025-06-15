import React, { useState, useRef, useEffect } from 'react';

// 模拟聊天数据
const mockChatMessages = [
  {
    id: 1,
    type: 'user' as const,
    content: '你好，请帮我解释一下React的useState钩子',
    timestamp: new Date(Date.now() - 300000)
  },
  {
    id: 2,
    type: 'assistant' as const,
    content: 'useState是React中最基础的Hook之一，它让你在函数组件中添加状态。当状态改变时，组件会重新渲染。',
    timestamp: new Date(Date.now() - 280000),
    thinking: [
      '用户询问useState钩子',
      '这是React基础概念',
      '需要简洁明了地解释',
      '可以提供示例代码',
      '说明状态更新机制'
    ]
  },
  {
    id: 3,
    type: 'user' as const,
    content: '能给个具体的例子吗？',
    timestamp: new Date(Date.now() - 180000)
  },
  {
    id: 4,
    type: 'assistant' as const,
    content: '当然！这里是一个简单的计数器例子：\n\n```javascript\nconst [count, setCount] = useState(0);\n\nreturn (\n  <button onClick={() => setCount(count + 1)}>\n    点击次数: {count}\n  </button>\n);\n```',
    timestamp: new Date(Date.now() - 120000),
    thinking: [
      '用户要求具体例子',
      '计数器是最经典的useState示例',
      '展示解构赋值语法',
      '说明setter函数的使用',
      '包含JSX中的状态显示'
    ]
  }
];

const mockThinkingSteps = [
  '分析用户问题类型',
  '检索相关知识点',
  '构建回答结构',
  '选择合适的示例',
  '组织语言表达',
  '验证回答完整性'
];

const App: React.FC = () => {
  const [messages, setMessages] = useState(mockChatMessages);
  const [inputValue, setInputValue] = useState('');
  const [currentThinking, setCurrentThinking] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setCurrentThinking([]);

    // 模拟思考过程
    const thinkingSteps = [
      '正在分析您的问题...',
      '搜索相关知识库...',
      '整理回答思路...',
      '构建最佳回答...',
      '检查回答质量...'
    ];

    for (let i = 0; i < thinkingSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setCurrentThinking(prev => [...prev, thinkingSteps[i]]);
    }

    // 模拟AI回答
    await new Promise(resolve => setTimeout(resolve, 1000));
    const aiResponse = {
      id: Date.now() + 1,
      type: 'assistant' as const,
      content: `您的问题很有趣："${inputValue}"。基于我的分析，这涉及到多个方面的考虑。让我为您详细解答...`,
      timestamp: new Date(),
      thinking: [...thinkingSteps, '生成最终回答']
    };

    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
    setCurrentThinking([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 测试Tailwind样式 */}
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="h-screen flex">
            {/* 左侧聊天区域 */}
            <div className="flex-1 flex flex-col bg-white">
              {/* 聊天头部 */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 shadow-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold text-xl mr-4">
                    A
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold">atypica.AI</h1>
                    <p className="text-blue-100 text-sm">AI智能助手</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-blue-100 text-sm">在线</span>
                  </div>
                </div>
              </div>

              {/* 聊天消息区域 */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-2xl rounded-2xl p-4 shadow-md transform transition-all duration-300 hover:scale-105 ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-auto' 
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}>
                      <div className="whitespace-pre-wrap break-words leading-relaxed">
                        {message.content}
                      </div>
                      <div className={`text-xs mt-3 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-md">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-sm text-gray-500 ml-2">AI正在思考...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* 输入区域 */}
              <div className="bg-white border-t border-gray-200 p-6">
                <div className="flex items-end space-x-4">
                  <div className="flex-1">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="输入您的问题..."
                      className="w-full resize-none border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      rows={1}
                      style={{ minHeight: '48px', maxHeight: '120px' }}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg disabled:transform-none disabled:shadow-none font-medium"
                  >
                    发送
                  </button>
                </div>
              </div>
            </div>

            {/* 右侧思考过程区域 */}
            <div className="w-96 bg-gradient-to-b from-purple-50 to-purple-100 border-l border-purple-200 flex flex-col">
              {/* 思考过程头部 */}
              <div className="p-6 border-b border-purple-200 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <h2 className="text-xl font-bold flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></div>
                  思考过程
                </h2>
                <p className="text-purple-100 text-sm mt-1">AI的推理过程实时展示</p>
              </div>

              {/* 思考内容区域 */}
              <div className="flex-1 overflow-y-auto p-6">
                {currentThinking.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-purple-800 mb-4">当前思考步骤:</h3>
                    {currentThinking.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm transform transition-all duration-300 hover:shadow-md">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700 leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-purple-800">最近的思考过程:</h3>
                    {messages
                      .filter(msg => msg.type === 'assistant' && msg.thinking)
                      .slice(-1)
                      .map((message) => (
                        <div key={message.id} className="space-y-3">
                          <div className="text-xs text-purple-400 mb-3 font-medium">
                            {formatTime(message.timestamp)}
                          </div>
                          {message.thinking?.map((step, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700 leading-relaxed">{step}</span>
                            </div>
                          ))}
                        </div>
                      ))
                    }
                    
                    <div className="mt-8 p-4 bg-white rounded-xl shadow-sm border border-purple-200">
                      <h4 className="text-sm font-semibold text-purple-800 mb-3">思考流程模板:</h4>
                      <div className="space-y-2">
                        {mockThinkingSteps.map((step, index) => (
                          <div key={index} className="text-xs text-gray-600 flex items-center">
                            <span className="w-5 h-5 bg-purple-500 text-white rounded-full text-xs flex items-center justify-center mr-3 font-bold">
                              {index + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 统计信息 */}
              <div className="p-6 border-t border-purple-200 bg-white">
                <div className="text-sm text-gray-600 space-y-3">
                  <div className="flex justify-between items-center p-2 bg-purple-50 rounded-lg">
                    <span>对话轮次:</span>
                    <span className="font-bold text-purple-600">{Math.floor(messages.length / 2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-purple-50 rounded-lg">
                    <span>平均响应时间:</span>
                    <span className="font-bold text-purple-600">2.3秒</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-purple-50 rounded-lg">
                    <span>思考深度:</span>
                    <span className="font-bold text-purple-600">5层</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
