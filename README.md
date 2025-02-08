# React Native Quick Starter

一个功能完整的 React Native 启动模板，包含主题切换、认证系统、导航等特性。

## 主要功能

### 1. 主题系统 🎨

- [x] 深色/浅色模式切换
- [x] 多种预设颜色主题（默认、蓝色、橙色、灰色、粉色）
- [x] 主题持久化存储
- [x] 主题切换动画
- [x] 响应系统主题变化

### 2. 认证系统 🔐

- [x] 登录/注册流程
- [x] 表单验证
- [x] 认证状态持久化
- [x] 加载状态和错误处理
- [x] 自动登录检查

### 3. 导航系统 🧭

- [x] 抽屉导航（从右侧滑出）
- [x] 堆栈导航
- [x] 认证路由保护
- [x] 自定义抽屉内容（头像、用户信息）

### 4. 组件系统 🧩

- [x] Button
  - [x] 多种变体（primary、secondary、outline、text）
  - [x] 支持图标（左侧/右侧）
  - [x] 加载状态（带动画）
  - [x] 禁用状态
  - [x] 动态文本
  - [x] 自定义样式
- [x] Text（支持多种变体和颜色）
- [x] TextInput（支持错误状态和图标）
- [x] Toast（支持多种类型的提示）
- [x] 自定义抽屉内容
      已经迁移到 useTheme 的组件：
      ✅ Button
      ✅ Text
      ✅ TextInput
      ✅ Card
      ✅ ScreenContainer
      ✅ List & ListItem
      ✅ Divider
      ✅ CustomDrawerContent
      ✅ DrawerToggleButton
      ✅ Row
      ✅ Column
      ✅ SettingsScreen
      ✅ ComponentsShowcase

### 5. 状态管理 📊

- [x] 主题状态（使用 Context）
- [x] 认证状态（使用 Zustand）
- [x] Toast 状态
- [x] 网络状态监听
- [x] 应用状态监听

### 6. 工具函数 🛠

- [x] 表单验证
- [x] 网络状态检测
- [x] 应用状态监听
- [x] 主题工具函数

## 待办功能

### 1. 数据持久化 💾

- [ ] 通用的存储管理器
- [ ] 数据缓存策略
- [ ] 离线支持

### 2. 国际化支持 🌍

- [ ] 多语言支持
- [ ] 自动检测系统语言
- [ ] 语言切换动画

### 3. 错误处理 🐛

- [ ] 全局错误边界
- [ ] 错误日志收集
- [ ] 优雅的错误展示

### 4. 性能优化 ⚡

- [ ] 组件懒加载
- [ ] 图片优化
- [ ] 性能监控
- [ ] 内存泄漏检测

### 5. 测试支持 ✅

- [ ] 单元测试
- [ ] 集成测试
- [ ] E2E 测试
- [ ] 测试覆盖率报告

### 6. 其他功能 🎯

- [ ] 推送通知
- [ ] 文件上传
- [ ] 社交分享
- [ ] 应用内更新

## 使用技术

- React Native
- TypeScript
- React Navigation
- Zustand
- Expo
- React Native Reanimated

## 开始使用

1. 克隆项目
2. 安装依赖
3. 运行项目

## 项目结构

src/
├── api/ # API 请求
├── components/ # 通用组件
├── hooks/ # 自定义 Hooks
├── navigation/ # 导航配置
├── screens/ # 页面组件
├── store/ # 状态管理
├── themes/ # 主题相关
└── utils/ # 工具函数

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可

MIT License
