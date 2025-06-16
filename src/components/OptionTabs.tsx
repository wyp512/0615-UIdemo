import React, { useState } from 'react';

interface OptionTabsProps {
  title: string;
  options: string[];
  onOptionSelect?: (option: string) => void;
}

const OptionTabs: React.FC<OptionTabsProps> = ({ 
  title, 
  options, 
  onOptionSelect 
}) => {
  // 默认选中前三个选项
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    options.slice(0, 3)
  );

  const handleOptionClick = (option: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(option)) {
        // 如果已选中，则取消选择
        return prev.filter(item => item !== option);
      } else {
        // 如果未选中，则添加到选择列表
        return [...prev, option];
      }
    });
    onOptionSelect?.(option);
  };

  return (
    <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-4">
      {/* 标题 */}
      <div className="text-gray-800 text-sm font-medium mb-3">
        {title}
      </div>
      
      {/* 选项卡 - 改为竖直排列 */}
      <div className="flex flex-col gap-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-200 border text-left ${
              selectedOptions.includes(option)
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OptionTabs; 