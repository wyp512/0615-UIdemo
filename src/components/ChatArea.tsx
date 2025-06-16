import React from 'react';
import type { Message } from '../types';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

interface ChatAreaProps {
  messages: Message[];
  isTyping: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  formatTime: (date: Date) => string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onCodeBlockView: (blockType: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  isTyping,
  inputValue,
  setInputValue,
  handleSendMessage,
  handleKeyPress,
  formatTime,
  messagesEndRef,
  onCodeBlockView
}) => {
  return (
    <div className="flex-1 flex flex-col bg-white">
      <ChatHeader />
      
      <MessageList 
        messages={messages}
        isTyping={isTyping}
        formatTime={formatTime}
        messagesEndRef={messagesEndRef}
        onCodeBlockView={onCodeBlockView}
      />
      
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={handleSendMessage}
        handleKeyPress={handleKeyPress}
        isTyping={isTyping}
      />
    </div>
  );
};

export default ChatArea; 