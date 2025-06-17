// 定义消息类型
export interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  thinking?: string[];
}

// 定义历史记录类型
export interface HistoryRecord {
  id: number;
  title: string;
  messages: Message[];
  timestamp: Date;
} 