# 📖 UseTrack 完整文档索引

## 🎯 第一次使用？从这里开始！

### 1️⃣ **立即开始** (3 分钟)
→ 📄 [`QUICK_START.md`](QUICK_START.md)
- 三步启动项目
- 常用操作示例
- 快速 API 参考

### 2️⃣ **项目概览** (5 分钟)
→ 📄 [`README.md`](README.md)
- 项目目标和特性
- 技术栈介绍
- 完整项目结构

### 3️⃣ **详细功能** (15 分钟)
→ 📄 [`docs/README.md`](docs/README.md)
- 所有核心特性详解
- 数据模型说明
- 可视化看板介绍
- 下一步开发计划

### 4️⃣ **API 文档** (查询用)
→ 📄 [`docs/API.md`](docs/API.md)
- 40+ API 端点完整列表
- 请求/响应示例
- 错误处理说明
- 分页说明

### 5️⃣ **开发指南** (编写代码用)
→ 📄 [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md)
- 代码规范和最佳实践
- 如何添加新功能
- 测试和调试方法
- 性能优化建议

---

## 📚 按场景查找

### 🚀 我想立即运行项目
```
1. QUICK_START.md (步骤 1-3: 启动数据库、后端、前端)
2. 打开 http://localhost:3000
```

### 🔌 我想调用 API
```
1. docs/API.md (找到对应的端点)
2. 使用 Postman 或 REST Client 测试
3. 参考示例的请求/响应格式
```

### 💻 我想添加新功能
```
1. docs/DEVELOPMENT.md (了解代码结构)
2. 参考现有模块（如 items/ 目录）
3. 按照"添加新模块"流程实现
```

### 🐛 出现问题？
```
1. QUICK_START.md 的故障排除部分
2. 检查 .env 配置文件
3. 查看 Docker 或 PostgreSQL 状态
```

### 📊 我想理解数据模型
```
1. README.md 中的"数据模型"部分
2. 查看 backend/src/entities/ 目录
3. 参考 docs/README.md 中的详细说明
```

### 🎨 我想定制前端
```
1. frontend/src/app/page.tsx (参考页面结构)
2. frontend/src/styles/globals.css (修改样式)
3. frontend/src/services/api.ts (添加 API 调用)
```

---

## 📋 文件导航树

```
UseTrack/
│
├── 📖 README.md
│   └── 项目总览、快速开始、技术栈
│
├── 🚀 QUICK_START.md
│   └── 三步启动、常用操作、快速参考
│
├── 📊 PROJECT_SUMMARY.md
│   └── 详细的项目完成情况和交付物清单
│
├── 📝 DELIVERY_REPORT.md
│   └── 完整的项目交付报告
│
├── 📚 docs/
│   ├── README.md
│   │   └── 完整的功能和架构文档
│   │
│   ├── API.md
│   │   └── 所有 40+ API 端点的参考文档 ⭐
│   │
│   └── DEVELOPMENT.md
│       └── 代码规范、开发流程、最佳实践
│
├── 🔧 backend/
│   ├── src/
│   │   ├── entities/ (数据模型)
│   │   ├── transactions/ (消费记录)
│   │   ├── items/ (物品库)
│   │   ├── usage-logs/ (使用追踪)
│   │   ├── watchlists/ (关注清单)
│   │   └── dashboard/ (看板聚合)
│   │
│   ├── package.json (30+ 依赖)
│   ├── tsconfig.json (TypeScript 配置)
│   └── .env (环境配置)
│
├── 🎨 frontend/
│   ├── src/
│   │   ├── app/ (页面目录)
│   │   │   ├── page.tsx (首页)
│   │   │   ├── transactions/page.tsx
│   │   │   ├── items/page.tsx
│   │   │   └── watchlists/page.tsx
│   │   │
│   │   ├── services/ (API 客户端)
│   │   ├── store/ (状态管理)
│   │   ├── lib/ (工具函数)
│   │   └── styles/ (样式)
│   │
│   ├── package.json (20+ 依赖)
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── .env.local
│
└── 🛠️ setup.sh
    └── 自动化启动脚本
```

---

## 🎯 按用户角色导航

### 👤 项目经理 / 非技术人员
```
阅读顺序:
1. README.md - 了解项目
2. PROJECT_SUMMARY.md - 看完成情况
3. 运行 setup.sh 看效果
```

### 👨‍💻 后端开发者
```
阅读顺序:
1. QUICK_START.md - 快速运行
2. docs/README.md - 理解架构
3. docs/API.md - 了解所有端点
4. docs/DEVELOPMENT.md - 编写代码
5. backend/src/ - 阅读源代码
```

### 🎨 前端开发者
```
阅读顺序:
1. QUICK_START.md - 快速运行
2. README.md - 了解总体
3. docs/API.md - 了解后端接口
4. frontend/src/ - 阅读源代码
5. docs/DEVELOPMENT.md - 学习规范
```

### 🧪 测试工程师
```
阅读顺序:
1. QUICK_START.md - 运行项目
2. docs/API.md - 测试所有端点
3. PROJECT_SUMMARY.md - 了解覆盖范围
4. 使用 Postman/REST Client 创建测试用例
```

### 🚀 DevOps / 部署人员
```
阅读顺序:
1. QUICK_START.md - 本地运行验证
2. DELIVERY_REPORT.md - 了解交付物
3. README.md 的"部署建议" - 生产部署
4. backend/ 和 frontend/ - 了解构建过程
```

---

## 🔍 快速查找表

| 我要... | 查看这个文件 |
|-------|-----------|
| 运行项目 | `QUICK_START.md` |
| 了解项目 | `README.md` |
| 查看功能 | `docs/README.md` |
| 调用 API | `docs/API.md` ⭐⭐⭐ |
| 写代码 | `docs/DEVELOPMENT.md` |
| 看交付物 | `PROJECT_SUMMARY.md` |
| 看详细报告 | `DELIVERY_REPORT.md` |
| 看后端代码 | `backend/src/` |
| 看前端代码 | `frontend/src/` |
| 自动启动 | `setup.sh` |

---

## 📊 核心概念速查

### 数据流
```
User Input
    ↓
Frontend (Next.js React)
    ↓
API Client (Axios)
    ↓
Backend (NestJS)
    ↓
Database (PostgreSQL)
```

### 最常用的 3 个 API
```
1. POST /usage-logs/quick/:itemId
   → 一键打卡（最常用！）

2. GET /dashboard/home-cards
   → 首页 3 张卡片

3. GET /items/stats/value-ranking
   → 物品价值排行
```

### 核心实体
```
Transaction (消费) → Item (物品) → UsageLog (使用)
                  ↓
              Watchlist (关注) → PriceHistory (价格)
```

---

## 🎓 推荐学习路径

### 第 1 天：基础认识
- [ ] 阅读 `README.md`
- [ ] 运行 `setup.sh` 启动项目
- [ ] 浏览 http://localhost:3000

### 第 2 天：理解设计
- [ ] 阅读 `docs/README.md`
- [ ] 了解 5 个数据模型
- [ ] 查看 `PROJECT_SUMMARY.md`

### 第 3 天：了解 API
- [ ] 阅读 `docs/API.md`
- [ ] 使用 Postman 测试 API
- [ ] 在 `QUICK_START.md` 中找到常用操作

### 第 4-5 天：开始开发
- [ ] 阅读 `docs/DEVELOPMENT.md`
- [ ] 研究后端模块结构
- [ ] 研究前端组件结构
- [ ] 修改现有功能或添加新功能

### 第 6-7 天：深入优化
- [ ] 添加新的 API 端点
- [ ] 改进前端界面
- [ ] 优化性能
- [ ] 编写测试

---

## 💡 常见问题

**Q: 我应该从哪里开始？**
A: 从 `QUICK_START.md` 开始，3 分钟启动项目。

**Q: 我想了解所有 API？**
A: 查看 `docs/API.md`，包含 40+ 端点的完整文档。

**Q: 我想添加新功能？**
A: 查看 `docs/DEVELOPMENT.md` 中的"添加新模块"部分。

**Q: 项目出问题了？**
A: 查看 `QUICK_START.md` 中的"故障排除"部分。

**Q: 如何部署到生产？**
A: 查看 `README.md` 中的"部署建议"部分。

---

## 🔗 相关链接

### 官方文档
- [NestJS 文档](https://docs.nestjs.com)
- [Next.js 文档](https://nextjs.org/docs)
- [TypeORM 文档](https://typeorm.io)
- [PostgreSQL 文档](https://www.postgresql.org/docs)

### 开发工具
- [VS Code](https://code.visualstudio.com)
- [Postman](https://www.postman.com)
- [pgAdmin](https://www.pgadmin.org)
- [Docker](https://www.docker.com)

### 学习资源
- [TypeScript 手册](https://www.typescriptlang.org/docs)
- [React 官方文档](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

## 📞 获得帮助

### 如果卡住了：
1. 检查对应的文档（使用上面的表格）
2. 查看代码注释
3. 查看错误信息和日志
4. 使用搜索功能在文档中查找关键词

### 调试技巧：
- 使用 `npm run start:debug` 启用后端调试
- 使用浏览器 DevTools 调试前端
- 查看网络请求（Network 标签）
- 查看数据库内容（pgAdmin）

---

## ✅ 项目清单

项目已包含：
- ✅ 完整的后端 API（40+ 端点）
- ✅ 现代化的前端应用（4 页面）
- ✅ 5 个核心数据模型
- ✅ 自动化启动脚本
- ✅ 完整的文档（1000+ 行）
- ✅ 代码示例和教程
- ✅ API 参考手册
- ✅ 开发指南和最佳实践

---

## 🚀 立即开始

```bash
# 方式 1：自动启动（推荐）
cd /Users/jasonxu/Desktop/UseTrack
bash setup.sh

# 方式 2：手动启动
cd /Users/jasonxu/Desktop/UseTrack
# 查看 QUICK_START.md 中的"三步启动"部分
```

然后访问 **http://localhost:3000**

---

**祝你编码愉快！** 🚀✨

*最后更新: 2026-02-09*
*项目状态: Production Ready ✅*
