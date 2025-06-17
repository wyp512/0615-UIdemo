import React, { useState, useRef, useEffect } from 'react';
import ChatArea from './components/ChatArea';
import ThinkingArea from './components/ThinkingArea';
import Sidebar from './components/Sidebar';
import type { Message } from './types';

// 模拟聊天数据
const mockChatMessages: Message[] = [];

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
  const [selectedCodeBlock, setSelectedCodeBlock] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const handleCodeBlockView = (blockType: string) => {
    setSelectedCodeBlock(blockType);
  };

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 侧边栏 */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      
      <div className="h-screen flex">
        {/* 左侧聊天区域 - 占一半宽度 */}
        <ChatArea 
          messages={messages}
          isTyping={isTyping}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyDown}
          formatTime={formatTime}
          messagesEndRef={messagesEndRef}
          onCodeBlockView={handleCodeBlockView}
          onOpenSidebar={handleOpenSidebar}
        />

        {/* 右侧思考过程区域 - 占一半宽度 */}
        <ThinkingArea 
          currentThinking={currentThinking}
          messages={messages}
          formatTime={formatTime}
          mockThinkingSteps={mockThinkingSteps}
          selectedCodeBlock={selectedCodeBlock}
        />
      </div>
    </div>
  );
};

export default App;
