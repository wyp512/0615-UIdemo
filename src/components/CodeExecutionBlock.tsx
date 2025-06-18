import React, { useState } from 'react';
import type { Message } from '../types';

interface CodeExecutionBlockProps {
  message: Message;
  userMessage?: Message;
  formatTime: (date: Date) => string;
  variant?: 'chat' | 'console';
  contentType?: 'scene' | 'consumer' | 'default';
  onCodeBlockView?: (blockType: string) => void;
  blockId?: string;
}

const CodeExecutionBlock: React.FC<CodeExecutionBlockProps> = ({
  message: _message,
  userMessage,
  formatTime: _formatTime,
  variant = 'chat',
  contentType = 'default',
  onCodeBlockView,
  blockId
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // 根据内容类型生成不同的执行数据
  const getExecutionData = () => {
    // 根据blockId优先判断护肤研究的特殊内容
    if (blockId === 'skincare-market') {
      return {
        question: '您对东南亚美妆市场的哪个方面最感兴趣？',
        options: ["消费者购买决策因素", "主流美妆品类偏好", "线上vs线下购物渠道偏好", "本土vs国际品牌偏好"],
        answer: ["主流美妆品类偏好"],
        message: ["主流美妆品类偏好"]
      };
    } else if (blockId === 'geographic-scope') {
      return {
        question: '您希望调研的地理或人口范围是？',
        options: ["整个东南亚地区", "特定国家(如泰国、新加坡、印尼等)", "城市vs乡村市场对比", "不同年龄层的偏好对比"],
        answer: ["整个东南亚地区"],
        message: ["整个东南亚地区"]
      };
    } else if (blockId === 'analyst-assignment') {
      return {
        question: '',
        options: [],
        answer: [],
        message: [],
        specialFormat: {
          args: {
            role: "美妆市场研究专家",
            topic: "东南亚地区护肤类产品消费者画像与偏好研究"
          },
          result: {
            analystId: "7672"
          },
          message: '{"analystId":7672,"role":"美妆市场研究专家","topic":"东南亚地区护肤类产品消费者画像与偏好研究"}'
        }
      };
    } else if (blockId === 'skincare-product') {
      return {
        question: '您希望重点了解哪类美妆产品的消费者偏好？',
        options: ["护肤类产品", "彩妆类产品", "香水和身体护理类", "所有美妆品类的整体偏好"],
        answer: ["护肤类产品"],
        message: ["护肤类产品"]
      };
    } else if (blockId === 'message-6') {
      // 第二个历史记录的第二个AI消息
      return {
        question: '您希望重点了解哪类美妆产品的消费者偏好？',
        options: ["护肤类产品", "彩妆类产品", "香水和身体护理类", "所有美妆品类的整体偏好"],
        answer: ["护肤类产品"],
        message: ["护肤类产品"]
      };
    } else if (contentType === 'consumer') {
      return {
        question: '您的目标消费者主要是哪类人群？',
        options: ["追求新鲜风味的尝鲜一族", "注重健康但不想放弃品质的消费者", "忙碌白领寻找高效能量来源", "喜欢尝试独特风味的咖啡爱好者"],
        answer: ["追求新鲜风味的尝鲜一族", "忙碌白领寻找高效能量来源", "喜欢尝试独特风味的咖啡爱好者"],
        message: ["追求新鲜风味的尝鲜一族", "忙碌白领寻找高效能量来源", "喜欢尝试独特风味的咖啡爱好者"]
      };
    } else if (contentType === 'scene') {
      return {
        question: '您希望这款冻干咖啡主要在什么场景下被消费？',
        options: ["办公室快速冲泡", "家庭休闲享用", "户外/旅行便携", "社交场合分享"],
        answer: ["办公室快速冲泡", "户外/旅行便携", "家庭休闲享用"],
        message: ["办公室快速冲泡", "户外/旅行便携", "家庭休闲享用"]
      };
    } else {
      // 默认根据用户问题生成选项
      const generateOptionsBasedOnQuestion = (question: string) => {
        if (question.includes('React') || question.includes('useState')) {
          return ["基础语法解释", "实际代码示例", "最佳实践指导", "常见问题解答"];
        } else if (question.includes('咖啡')) {
          return ["办公室快速冲泡", "家庭休闲享用", "户外/旅行便携", "社交场合分享"];
        } else {
          return ["详细解释说明", "提供具体示例", "相关知识扩展", "实用建议指导"];
        }
      };
      
      const userQuestion = userMessage?.content || '如何更好地理解这个问题？';
      const options = generateOptionsBasedOnQuestion(userQuestion);
      const selectedOptions = options.slice(0, 3);
      
      return {
        question: '您希望这款冻干咖啡主要在什么场景下被消费？',
        options: selectedOptions,
        answer: selectedOptions,
        message: selectedOptions
      };
    }
  };

  const executionData = getExecutionData();

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };

  // 聊天区域样式
  if (variant === 'chat') {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 relative">
        {/* 右上角的查看过程按钮 */}
        <div 
          className="absolute top-3 right-3 flex items-center space-x-1 text-gray-500 text-xs cursor-pointer hover:text-gray-700"
          onClick={() => onCodeBlockView && blockId && onCodeBlockView(blockId)}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
          </svg>
          <span>查看过程</span>
        </div>
        
        <div 
          className="flex items-center space-x-2 cursor-pointer p-2 rounded mb-2"
          onClick={toggleExpanded}
        >
                      <span className="text-gray-500 text-xs">
              {isExpanded ? '∨' : '>_'}
            </span>
          <span className="exec-request-interaction">exec requestInteraction</span>
        </div>
        
        {isExpanded && (
          <>
            {executionData.specialFormat ? (
              <>
                {/* 分析师分配特殊格式 */}
                <div className="mb-3">
                  <div className="text-xs text-gray-600 mb-1">{'>'}_  args</div>
                  <div className="text-xs text-gray-700 pl-2">
                    <div><span className="text-blue-600">role:</span> <span className="text-green-600">{executionData.specialFormat.args.role}</span></div>
                    <div><span className="text-blue-600">topic:</span> <span className="text-green-600">{executionData.specialFormat.args.topic}</span></div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="text-xs text-gray-600 mb-1">{'>'}_  result</div>
                  <div className="text-xs text-gray-700 pl-2">
                    <div><span className="text-blue-600">analystId:</span> <span className="text-green-600">{executionData.specialFormat.result.analystId}</span></div>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-600 mb-1">{'>'}_  message</div>
                  <div className="text-xs text-gray-700 pl-2">
                    <span className="text-green-600">{executionData.specialFormat.message}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* 参数部分 */}
                <div className="mb-3">
                  <div className="text-xs text-gray-600 mb-1">{'>'}_  args</div>
                  <div className="text-xs text-gray-700">
                    <span className="text-blue-600">options:</span> [
                    {executionData.options.map((option, index) => (
                      <span key={index} className="text-green-600">
                        "{option}"{index < executionData.options.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                    ]
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="text-xs text-gray-600 mb-1">{'>'}_  question:</div>
                  <div className="text-xs text-gray-700">
                    <span className="text-green-600">"{executionData.question}"</span>
                  </div>
                </div>
                
                {/* 结果部分 */}
                <div className="mb-3">
                  <div className="text-xs text-gray-600 mb-1">{'>'}_  result</div>
                  <div className="text-xs text-gray-700">
                    <span className="text-blue-600">answer:</span> [
                    {executionData.answer.map((answer, index) => (
                      <span key={index} className="text-green-600">
                        "{answer}"{index < executionData.answer.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                    ]
                  </div>
                </div>
                
                {/* 消息部分 */}
                <div>
                  <div className="text-xs text-gray-600 mb-1">{'>'}_  message</div>
                  <div className="text-xs text-gray-700">
                    [
                    {executionData.message.map((msg, index) => (
                      <span key={index} className="text-green-600">
                        "{msg}"{index < executionData.message.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                    ]
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    );
  }

  // 控制台样式
  return (
    <div className="pl-4 space-y-3 bg-white rounded-lg p-3 border border-gray-200">
      {executionData.specialFormat ? (
        <>
          {/* 分析师分配控制台特殊格式 */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-gray-500 text-xs">{'>'}_</span>
              <span className="text-gray-700 font-medium">args</span>
            </div>
            <div className="pl-4 text-xs">
              <div><span className="text-blue-600">role:</span> <span className="text-green-600">{executionData.specialFormat.args.role}</span></div>
              <div><span className="text-blue-600">topic:</span> <span className="text-green-600">{executionData.specialFormat.args.topic}</span></div>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-gray-500 text-xs">{'>'}_</span>
              <span className="text-gray-700 font-medium">result</span>
            </div>
            <div className="pl-4 text-xs">
              <div><span className="text-blue-600">analystId:</span> <span className="text-green-600">{executionData.specialFormat.result.analystId}</span></div>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-gray-500 text-xs">{'>'}_</span>
              <span className="text-gray-700 font-medium">message</span>
            </div>
            <div className="pl-4 text-xs">
              <span className="text-green-600">{executionData.specialFormat.message}</span>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* args 部分 */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-gray-500 text-xs">{'>'}_</span>
              <span className="text-gray-700 font-medium">args</span>
            </div>
            <div className="pl-4 space-y-2 text-xs">
              <div>
                <span className="text-blue-600">options</span>
                <span className="text-gray-600">: [</span>
              </div>
              <div className="pl-4">
                {executionData.options.map((option, index) => (
                  <div key={index} className="text-green-600">
                    "{option}"{index < executionData.options.length - 1 ? ',' : ''}
                  </div>
                ))}
              </div>
              <div className="text-gray-600">]</div>
              
              <div className="pt-2">
                <span className="text-blue-600">question</span>
                <span className="text-gray-600">: </span>
                <span className="text-green-600">"{executionData.question}"</span>
              </div>
            </div>
          </div>

          {/* result 部分 */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-gray-500 text-xs">{'>'}_</span>
              <span className="text-gray-700 font-medium">result</span>
            </div>
            <div className="pl-4 text-xs">
              <div>
                <span className="text-blue-600">answer</span>
                <span className="text-gray-600">: [</span>
              </div>
              <div className="pl-4">
                {executionData.answer.map((answer, index) => (
                  <div key={index} className="text-green-600">
                    "{answer}"{index < executionData.answer.length - 1 ? ',' : ''}
                  </div>
                ))}
              </div>
              <div className="text-gray-600">]</div>
            </div>
          </div>

          {/* message 部分 */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-gray-500 text-xs">{'>'}_</span>
              <span className="text-gray-700 font-medium">message</span>
            </div>
            <div className="pl-4 text-xs">
              <div className="text-gray-600">[</div>
              <div className="pl-4">
                {executionData.message.map((msg, index) => (
                  <div key={index} className="text-green-600">
                    "{msg}"{index < executionData.message.length - 1 ? ',' : ''}
                  </div>
                ))}
              </div>
              <div className="text-gray-600">]</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CodeExecutionBlock; 