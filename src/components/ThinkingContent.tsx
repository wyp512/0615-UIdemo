import React, { useState } from 'react';
import type { Message } from '../types';
import CodeExecutionBlock from './CodeExecutionBlock';

interface ThinkingContentProps {
  currentThinking: string[];
  messages: Message[];
  formatTime: (date: Date) => string;
  mockThinkingSteps: string[];
  selectedCodeBlock: string | null;
}

const ThinkingContent: React.FC<ThinkingContentProps> = ({
  currentThinking,
  messages,
  formatTime,
  mockThinkingSteps: _mockThinkingSteps,
  selectedCodeBlock
}) => {
  const [isExecExpanded, setIsExecExpanded] = useState<boolean>(false);

  const toggleExecSection = () => {
    setIsExecExpanded(prev => !prev);
  };

  const latestAssistantMessage = messages
    .filter(msg => msg.type === 'assistant')
    .slice(-1)[0];

  const latestUserMessage = messages
    .filter(msg => msg.type === 'user')
    .slice(-1)[0];

  // 根据selectedCodeBlock获取对应的消息和用户消息
  const getSelectedCodeBlockMessages = () => {
    if (!selectedCodeBlock) {
      return {
        message: latestAssistantMessage,
        userMessage: latestUserMessage
      };
    }

    // 根据blockId确定对应的消息
    if (selectedCodeBlock === 'skincare-market') {
      // 第二个历史记录的第一个AI消息
      const message = messages.find(msg => msg.id === 4) || latestAssistantMessage;
      const userMessage = messages.find(msg => msg.id === 3) || latestUserMessage;
      return { message, userMessage };
    } else if (selectedCodeBlock === 'message-6') {
      // 第二个历史记录的第二个AI消息
      const message = messages.find(msg => msg.id === 6) || latestAssistantMessage;
      const userMessage = messages.find(msg => msg.id === 3) || latestUserMessage;
      return { message, userMessage };
    } else if (selectedCodeBlock === 'scene') {
      // 第一个历史记录的场景选择代码块
      const message = messages.find(msg => msg.id === 2) || latestAssistantMessage;
      const userMessage = messages.find(msg => msg.id === 1) || latestUserMessage;
      return { message, userMessage };
    } else if (selectedCodeBlock === 'consumer') {
      // 第一个历史记录的消费者选择代码块
      const message = messages.find(msg => msg.id === 2) || latestAssistantMessage;
      const userMessage = messages.find(msg => msg.id === 1) || latestUserMessage;
      return { message, userMessage };
    } else if (selectedCodeBlock === 'persona-search') {
      // persona-search 代码块的处理 - 清空内容
      return {
        message: null,
        userMessage: null
      };
    } else {
      return {
        message: latestAssistantMessage,
        userMessage: latestUserMessage
      };
    }
  };

  // 创建示例消息数据（作为后备）
  const exampleMessage: Message = {
    id: 999,
    type: 'assistant',
    content: '示例内容',
    timestamp: new Date()
  };

  const exampleUserMessage: Message = {
    id: 998,
    type: 'user', 
    content: '您希望这款冻干咖啡主要在什么场景下被消费？',
    timestamp: new Date()
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 font-mono text-sm rounded-b-2xl">
      {currentThinking.length > 0 ? (
        <div className="p-4 space-y-2">
          <div className="exec-request-interaction">{'>'}_  exec requestInteraction</div>
          {currentThinking.map((step, index) => (
            <div key={index} className="text-gray-600 pl-4">
              {step}
            </div>
          ))}
        </div>
      ) : selectedCodeBlock ? (
        <div className="p-4 space-y-2">
          {selectedCodeBlock === 'persona-search' ? (
            // persona-search 的专门显示内容
            <div className="space-y-8">
              <div className="bg-blue-50 rounded-lg p-4 shadow-sm">
                <div 
                  className="text-base font-sans mb-2"
                  style={{ 
                    color: 'oklch(0.145 0 0)',
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  帮我寻找东南亚地区护肤产品消费者的画像特征，包括人口统计学特征、消费习惯、产品偏好、品牌偏好等
                </div>
              </div>
              
              <div className="mt-10 space-y-6">
                <div 
                  className="text-base font-sans"
                  style={{ 
                    color: 'oklch(0.145 0 0)',
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  好的，收到！我将立即开始为您搜索和分析东南亚地区护肤产品消费者的画像特征。
                </div>
                
                <div 
                  className="text-base font-sans"
                  style={{ 
                    color: 'oklch(0.145 0 0)',
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  我将主要通过搜索社交媒体平台上的相关内容，来收集用户数据，分析他们的人口统计学特征、消费习惯、产品和品牌偏好等信息。
                </div>
                
                <div 
                  className="text-base font-sans"
                  style={{ 
                    color: 'oklch(0.145 0 0)',
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  首先，我将在小红书上搜索关键词"东南亚护肤"。
                </div>
              </div>
              
              <div className="mt-8">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div 
                    className="flex items-center space-x-2 cursor-pointer p-2 rounded mb-2"
                    onClick={() => setIsExecExpanded(!isExecExpanded)}
                  >
                    <span className="text-gray-500 text-xs">
                      {isExecExpanded ? '∨' : '>_'}
                    </span>
                    <span className="exec-request-interaction">exec xhsSearch</span>
                  </div>
                  
                  {isExecExpanded && (
                    <div className="space-y-3">
                      {/* args 部分 */}
                      <div>
                        <div className="text-xs text-gray-600 mb-1">{'>'}_  args</div>
                        <div className="text-xs text-gray-700 pl-2">
                          <div><span className="text-blue-600">keyword:</span></div>
                          <div className="pl-2"><span className="text-green-600">东南亚护肤</span></div>
                        </div>
                      </div>
                      
                      {/* result 部分 */}
                      <div>
                        <div className="text-xs text-gray-600 mb-1">{'>'}_  result</div>
                        <div className="text-xs text-gray-700 pl-2">
                          <div><span className="text-blue-600">notes:</span></div>
                          <div className="pl-2"><span className="text-green-600">[{'"id":"66dd2e6900000000120111a4","desc":"#好用泰国护肤品  #泰国  #好物测评  #泰国必买  #泰国旅行  #泰国711  #泰国旅游攻略  #美白 #护肤","type":"video","user":{"image":"https://sns-avatar-qc.xhscdn.com/avatar/64127a722fa7055bf34726a1...显示更多'}</span></div>
                        </div>
                      </div>
                      
                      {/* message 部分 */}
                      <div>
                        <div className="text-xs text-gray-600 mb-1">{'>'}_  message</div>
                        <div className="text-xs text-gray-700 pl-2">
                          <span className="text-green-600">[{'"noteid":"66dd2e6900000000120111a4","userid":"641279c800000000110210d2","nickname":"江酱Nuna","title":"大排雷!泰国 🇹🇭711必买好物，怼脸开测!","desc":"#好用泰国护肤品  #泰国  #好物测评  #泰国必买  #泰国旅行  #泰国711  #泰国旅游攻略  #美白 #护肤","...'}]</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8">
                <div className="flex gap-4 overflow-x-auto pb-2">
                  <div className="flex-shrink-0">
                    <img 
                      src="/d6a18de59f2882fe7fd40efd5787adc9.png" 
                      alt="泰国护肤产品1" 
                      className="object-cover rounded-lg shadow-sm"
                      style={{ width: '150px', height: '250px' }}
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="/881ca34d365ca3b26cc4f17d8e6fe388.png" 
                      alt="泰国护肤产品2" 
                      className="object-cover rounded-lg shadow-sm"
                      style={{ width: '150px', height: '250px' }}
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="/e5950c4a7eab4b19945a69771785aae9.png" 
                      alt="东南亚护肤产品3" 
                      className="object-cover rounded-lg shadow-sm"
                      style={{ width: '150px', height: '250px' }}
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="/0f0aba9883c7b70ddf646a03da472ca2.png" 
                      alt="护肤品牌产品4" 
                      className="object-cover rounded-lg shadow-sm"
                      style={{ width: '150px', height: '250px' }}
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="/8f10bb138b662cddf04b8ba610744f42.png" 
                      alt="护肤品牌产品5" 
                      className="object-cover rounded-lg shadow-sm"
                      style={{ width: '150px', height: '250px' }}
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="/7bfddb263666a24e26adceda93e27f41.png" 
                      alt="TikTok美妆个护" 
                      className="object-cover rounded-lg shadow-sm"
                      style={{ width: '150px', height: '250px' }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-8 space-y-6">
                <div 
                  className="text-base font-sans"
                  style={{ 
                    color: 'oklch(0.145 0 0)',
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  好的，我已经看到了初步的搜索结果，包含了一些关于泰国711必买好物、菲律宾美白水、新加坡草本护肤以及东南亚美妆个护趋势的笔记。
                </div>
                
                <div 
                  className="text-base font-sans"
                  style={{ 
                    color: 'oklch(0.145 0 0)',
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  为了更深入地了解东南亚护肤品消费者的具体特征和偏好，我将进一步分析这些笔记的内容和评论。我先从评论数比较多的笔记入手，看看大家都在讨论些什么。
                </div>
                
                <div 
                  className="text-base font-sans"
                  style={{ 
                    color: 'oklch(0.145 0 0)',
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  我将查看笔记"新人博主 Day1昭告天下粉丝0"（noteid: 68076943000000001c012ac3）和"新加坡🇸🇬｜草本护肤真的很值得啊！"（noteid: 680606e4000000000d014bc5）的评论。
                </div>
              </div>
              
              <div className="mt-8">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div 
                    className="flex items-center space-x-2 cursor-pointer p-2 rounded mb-2"
                    onClick={() => setIsExecExpanded(!isExecExpanded)}
                  >
                    <span className="text-gray-500 text-xs">
                      {isExecExpanded ? '∨' : '>_'}
                    </span>
                    <span className="exec-request-interaction">exec getComments</span>
                  </div>
                  
                  {isExecExpanded && (
                    <div className="space-y-3">
                      {/* args 部分 */}
                      <div>
                        <div className="text-xs text-gray-600 mb-1">{'>'}_  args</div>
                        <div className="text-xs text-gray-700 pl-2">
                          <div><span className="text-blue-600">noteid:</span></div>
                          <div className="pl-2"><span className="text-green-600">68076943000000001c012ac3</span></div>
                        </div>
                      </div>
                      
                      {/* result 部分 */}
                      <div>
                        <div className="text-xs text-gray-600 mb-1">{'>'}_  result</div>
                        <div className="text-xs text-gray-700 pl-2">
                          <div><span className="text-blue-600">comments:</span></div>
                          <div className="pl-2"><span className="text-green-600">[{'"id":"6809089d000000001200bd1d","user":{"image":"https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31fu8of5pg02g5prjslb63g25l0ljkr8?imageView2/2/w/120/format/jpg","userid":"6773e556000000001801c045","...'}</span></div>
                        </div>
                      </div>
                      
                      {/* message 部分 */}
                      <div>
                        <div className="text-xs text-gray-600 mb-1">{'>'}_  message</div>
                        <div className="text-xs text-gray-700 pl-2">
                          <span className="text-green-600">[{`"userid":"6773e556000000001801c045","nickname":"嘉嘉","content":"贴贴[红色心形R][星R]","like_count":0,"sub_comment_count":2`},{`"userid":"6707b8f4000000001d03221a","nickname":"柠檬和暖暖的生活日记","content":"加油[派对R]滴滴么..."`}]</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8">
                <img 
                  src="/67e353a6d2873656c5abfc6eb33d27cd.png" 
                  alt="小红书评论截图" 
                  className="w-full rounded-lg shadow-sm border border-gray-200"
                />
              </div>
              
              <div className="mt-8">
                <div 
                  className="text-base font-sans"
                  style={{ 
                    color: 'oklch(0.145 0 0)',
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  好的，我查看了第一篇笔记"新人博主 Day1昭告天下粉丝0"的评论，发现评论内容多为博主间的互动和鼓励，与护肤品消费特征关联不大。
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* 显示选中的代码执行块 */}
              <div 
                className="flex items-center space-x-2 cursor-pointer p-2 rounded"
                onClick={toggleExecSection}
              >
                <span className="text-gray-500 text-xs">
                  {isExecExpanded ? '∨' : '>_'}
                </span>
                <span className="exec-request-interaction">exec requestInteraction</span>
              </div>

              {isExecExpanded && (
                <CodeExecutionBlock
                  message={getSelectedCodeBlockMessages().message || exampleMessage}
                  userMessage={getSelectedCodeBlockMessages().userMessage || exampleUserMessage}
                  formatTime={formatTime}
                  variant="console"
                  blockId={selectedCodeBlock}
                />
              )}
            </>
          )}
        </div>
      ) : latestAssistantMessage ? (
        <div className="p-4 space-y-2">
          {/* exec 命令 - 可折叠 */}
          <div 
            className="flex items-center space-x-2 cursor-pointer p-2 rounded"
            onClick={toggleExecSection}
          >
            <span className="text-gray-500 text-xs">
              {isExecExpanded ? '∨' : '>_'}
            </span>
            <span className="exec-request-interaction">exec requestInteraction</span>
          </div>

          {isExecExpanded && (
            <CodeExecutionBlock
              message={latestAssistantMessage}
              userMessage={latestUserMessage}
              formatTime={formatTime}
              variant="console"
            />
          )}
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {/* 控制台示例 */}
          <div 
            className="flex items-center space-x-2 cursor-pointer p-2 rounded"
            onClick={toggleExecSection}
          >
            <span className="text-gray-500 text-xs">
              {isExecExpanded ? '∨' : '>_'}
            </span>
            <span className="exec-request-interaction">exec requestInteraction</span>
          </div>

          {isExecExpanded && (
            <CodeExecutionBlock
              message={exampleMessage}
              userMessage={exampleUserMessage}
              formatTime={formatTime}
              variant="console"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ThinkingContent; 