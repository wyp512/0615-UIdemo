// 定义消息类型
export interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  thinking?: string[];
} 