# AI智能体 Demo

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC.svg)](https://tailwindcss.com/)

一个现代化的AI智能体演示平台，提供直观的聊天界面和AI思考过程展示，专注于产品研发咨询对话体验。

## ✨ 功能特性

### 🎨 界面设计
- **左右分栏布局**：聊天区域与AI思考控制台并列显示
- **响应式设计**：完美适配桌面端、平板和移动设备
- **现代化UI**：基于Tailwind CSS的精美界面设计
- **深色主题**：护眼的深色配色方案

### 💬 聊天功能
- **实时消息**：支持文本消息的发送与接收
- **代码执行块**：内置代码展示和执行功能
- **选项卡交互**：多样化的用户交互选项
- **消息历史**：完整的聊天记录管理

### 🧠 AI思考展示
- **结构化思考**：可视化AI的思考过程
- **执行日志**：详细的操作步骤记录
- **实时更新**：动态展示AI处理状态

### 📋 会话管理
- **侧边栏历史**：便捷的会话历史管理
- **会话切换**：快速在不同对话间切换
- **数据持久化**：会话数据本地存储

## 🛠 技术栈

| 技术 | 版本 | 描述 |
|------|------|------|
| **React** | 18.x | 现代化的前端框架，组件化开发 |
| **TypeScript** | 5.x | 静态类型检查，提升代码质量 |
| **Vite** | 5.x | 极速的构建工具和开发服务器 |
| **Tailwind CSS** | 3.x | 原子化CSS框架，快速样式开发 |
| **ESLint** | 最新 | 代码规范检查和质量保障 |

## 📁 项目结构

```
0615-UIdemo/
├── public/                 # 静态资源
│   ├── vite.svg           # 应用图标
│   └── *.png              # 其他图片资源
├── src/
│   ├── components/        # React组件
│   │   ├── ChatArea.tsx   # 聊天区域主组件
│   │   ├── ChatHeader.tsx # 聊天头部
│   │   ├── ChatInput.tsx  # 消息输入框
│   │   ├── MessageList.tsx # 消息列表
│   │   ├── ThinkingArea.tsx # AI思考区域
│   │   ├── Sidebar.tsx    # 侧边栏
│   │   └── ...           # 其他组件
│   ├── types/            # TypeScript类型定义
│   │   └── index.ts      # 全局类型
│   ├── App.tsx           # 根组件
│   ├── main.tsx          # 应用入口
│   └── index.css         # 全局样式
├── package.json          # 项目配置
├── vite.config.ts        # Vite配置
├── tailwind.config.js    # Tailwind配置
└── tsconfig.json         # TypeScript配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装与运行

```bash
# 1. 克隆项目（如果从git仓库）
git clone <repository-url>
cd 0615-UIdemo

# 2. 安装依赖
npm install
# 或者使用 yarn
yarn install

# 3. 启动开发服务器
npm run dev
# 或者使用 yarn
yarn dev

# 4. 在浏览器中访问
# 通常是 http://localhost:5173
```

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 生产文件将在 dist/ 目录中
```

## 🔧 开发指南

### 代码规范

```bash
# 检查代码规范
npm run lint

# 自动修复代码问题
npm run lint:fix
```

### 组件开发

- 所有组件使用TypeScript编写
- 遵循React Hooks最佳实践
- 使用Tailwind CSS进行样式开发
- 保持组件的单一职责原则

### 自定义配置

- **主题配置**：修改 `tailwind.config.js`
- **构建配置**：修改 `vite.config.ts`
- **类型定义**：添加到 `src/types/index.ts`

## 📝 更新日志

### v1.0.0
- ✅ 基础聊天界面实现
- ✅ AI思考过程展示
- ✅ 响应式设计支持
- ✅ 侧边栏历史记录功能

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 📧 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 [Issue](../../issues)
- 发送邮件至：[your-email@example.com]

---

⭐ 如果这个项目对您有帮助，请给它一个星标！
