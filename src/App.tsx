import React, { useState, useRef, useEffect } from 'react';
import ChatArea from './components/ChatArea';
import ThinkingArea from './components/ThinkingArea';
import type { Message } from './types';

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

// 定义消息类型
// export interface Message {
//   id: number;
//   type: 'user' | 'assistant';
//   content: string;
//   timestamp: Date;
//   thinking?: string[];
// }

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(mockChatMessages);
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="h-screen flex">
            {/* 左侧聊天区域 */}
            <ChatArea 
              messages={messages}
              isTyping={isTyping}
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSendMessage={handleSendMessage}
              handleKeyPress={handleKeyDown}
              formatTime={formatTime}
              messagesEndRef={messagesEndRef}
            />

            {/* 右侧思考过程区域 */}
            <ThinkingArea 
              currentThinking={currentThinking}
              messages={messages}
              formatTime={formatTime}
              mockThinkingSteps={mockThinkingSteps}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
