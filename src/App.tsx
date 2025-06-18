import React, { useState, useRef, useEffect } from 'react';
import ChatArea from './components/ChatArea';
import ThinkingArea from './components/ThinkingArea';
import Sidebar from './components/Sidebar';
import type { Message, HistoryRecord } from './types';

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

// 模拟历史记录数据
const mockHistoryRecords: HistoryRecord[] = [
  {
    id: 1,
    title: "白领市场融合水果风味冻干咖啡偏好研究",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30分钟前
    messages: [
      {
        id: 1,
        type: 'user',
        content: '我是咖啡品牌的新品研发，需要针对白领推出一款融合风味的冻干咖啡，需要独特一些，哪种风味更受大家喜爱：1. 椰子+凤梨 2. 西瓜+芒果 3. 苹果+水蜜桃 4. 香蕉+荔枝',
        timestamp: new Date('2024-12-19 10:30:00')
      },
      {
        id: 2,
        type: 'assistant',
        content: '您好！我很乐意帮助您进行咖啡新品风味的用户研究。我理解您是咖啡品牌的新品研发人员，正在考虑为白领推出一款融合风味的冻干咖啡，并希望了解哪种风味组合更受欢迎。\n\n让我先调研一些问题来更好地了解您的研究背景，以便提供更有针对性的调研服务。\n\n**您希望这款冻干咖啡主要在什么场景下被消费？**\n- 办公室快速冲泡\n- 家庭休闲享用\n- 户外/旅行便携\n- 社交场合分享\n\n谢谢您的回答！了解到这款冻干咖啡主要面向办公室快速冲泡、户外/旅行便携以及家庭休闲享用场景。让我再了解一下关于目标消费者的信息。',
        timestamp: new Date('2024-12-19 10:31:00'),
        thinking: ['分析咖啡市场需求', '研究目标用户群体', '设计调研问题', '整理风味偏好', '构建研究框架']
      }
    ]
  },
  {
    id: 2,
    title: "东南亚地区护肤类产品消费者画像与偏好研究",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2小时前
    messages: [
      {
        id: 3,
        type: 'user',
        content: '请分析东南亚地区护肤类产品消费者的画像和偏好情况',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
      },
      {
        id: 4,
        type: 'assistant',
        content: '您好！我很乐意帮您调研东南亚地区的美妆消费者画像和偏好。为了更好地了解您的需求背景，我想先通过几个问题来明确调研方向。',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60),
        thinking: ['分析东南亚市场特点', '研究消费者行为', '整理调研数据', '构建用户画像', '总结偏好趋势']
      },
      {
        id: 6,
        type: 'assistant',
        content: '感谢您的选择！了解到您对东南亚美妆市场的主流美妆品类偏好特别感兴趣。为了进一步明确调研方向，我想再了解一下：',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 6),
        thinking: ['分析各国市场环境', '对比消费行为差异', '研究文化影响因素', '整理品牌偏好数据', '总结区域特色']
      }
    ]
  }
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
  const [historyRecords, setHistoryRecords] = useState<HistoryRecord[]>(mockHistoryRecords);
  const [currentHistoryId, setCurrentHistoryId] = useState<number | null>(null);
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

  // 保存当前对话为历史记录
  const saveCurrentAsHistory = () => {
    if (messages.length === 0) return;
    
    const newRecord: HistoryRecord = {
      id: Date.now(),
      title: messages[0]?.content.slice(0, 20) + '...' || '新对话',
      messages: [...messages],
      timestamp: new Date()
    };
    
    setHistoryRecords(prev => [newRecord, ...prev]);
    setCurrentHistoryId(newRecord.id);
  };

  // 在应用启动时，如果有消息但没有历史记录ID，自动保存
  useEffect(() => {
    if (messages.length > 0 && currentHistoryId === null) {
      const currentSessionRecord: HistoryRecord = {
        id: Date.now(),
        title: "当前会话内容",
        messages: [...messages],
        timestamp: new Date()
      };
      
      setHistoryRecords(prev => [currentSessionRecord, ...prev]);
      setCurrentHistoryId(currentSessionRecord.id);
    }
  }, [messages, currentHistoryId]);

  // 加载历史记录
  const loadHistoryRecord = (recordId: number) => {
    const record = historyRecords.find(r => r.id === recordId);
    if (record) {
      setMessages(record.messages);
      setCurrentHistoryId(recordId);
      setIsSidebarOpen(false);
      // 清空之前选中的代码块，确保控制台显示正确的内容
      setSelectedCodeBlock(null);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // 如果当前没有历史记录ID，先保存当前对话
    if (messages.length > 0 && currentHistoryId === null) {
      saveCurrentAsHistory();
    }

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

    setMessages(prev => {
      const newMessages = [...prev, aiResponse];
      
      // 更新当前历史记录
      if (currentHistoryId) {
        setHistoryRecords(prevRecords => 
          prevRecords.map(record => 
            record.id === currentHistoryId 
              ? { ...record, messages: newMessages, timestamp: new Date() }
              : record
          )
        );
      }
      
      return newMessages;
    });
    
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
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={handleCloseSidebar}
        historyRecords={historyRecords}
        currentHistoryId={currentHistoryId}
        onLoadHistory={loadHistoryRecord}
      />
      
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

        {/* 右侧思考过程区域 - 框架一直显示，内容根据消息情况显示 */}
        <ThinkingArea 
          currentThinking={currentThinking}
          messages={messages}
          formatTime={formatTime}
          mockThinkingSteps={mockThinkingSteps}
          selectedCodeBlock={selectedCodeBlock}
          showContent={messages.length > 0}
        />
      </div>
    </div>
  );
};

export default App;
