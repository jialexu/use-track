# UseTrack - Personal Consumption & Item Lifecycle Tracking System

**Track your spending and items intelligently** 💰 📊 ✨

## 🎯 What is UseTrack?

UseTrack 是一个完整的个人消费和物品生命周期追踪系统。相比传统记账软件，它提供：

- **智能消费记录**：不仅记金额，还追踪"买了什么—用得怎么样—值不值"
- **物品生命周期管理**：从购入到转售/损坏的完整追踪
- **使用频率分析**：快速识别闲置物品和真实使用成本
- **价格监控**：自动追踪心愿单上的产品价格变化

## 🚀 快速开始

### 最简单的方式（推荐）

```bash
# 1. 进入项目目录
cd /Users/jasonxu/Desktop/UseTrack

# 2. 运行启动脚本
bash setup.sh

# 3. 按照提示在两个终端分别启动后端和前端
```

### 手动启动

**前置要求**:
- Node.js 18+
- PostgreSQL 12+（或 Docker）

**步骤 1: 启动数据库**
```bash
# 方式 A: 使用 Homebrew（macOS）
brew services start postgresql

# 方式 B: 使用 Docker
docker run --name usetrack-postgres \
  -e POSTGRES_PASSWORD=usetrack_password \
  -e POSTGRES_DB=usetrack_db \
  -p 5432:5432 \
  -d postgres:15
```

**步骤 2: 启动后端**
```bash
cd backend
npm install
npm run start:dev
# 后端运行在 http://localhost:3001
```

**步骤 3: 启动前端**
```bash
cd frontend
npm install
npm run dev
# 前端运行在 http://localhost:3000
```

打开浏览器访问 **http://localhost:3000** ✨

## 📂 项目结构

```
UseTrack/
├── backend/          # NestJS API 服务
│   ├── src/
│   │   ├── entities/     # 数据模型
│   │   ├── transactions/ # 消费记录模块
│   │   ├── items/        # 物品库模块
│   │   ├── usage-logs/   # 使用追踪模块
│   │   ├── watchlists/   # 关注清单模块
│   │   └── dashboard/    # 看板模块
│   └── package.json
├── frontend/         # Next.js 前端应用
│   ├── src/
│   │   ├── app/          # 页面
│   │   ├── components/   # 组件
│   │   ├── services/     # API 客户端
│   │   ├── store/        # 状态管理
│   │   └── lib/          # 工具函数
│   └── package.json
├── docs/            # 文档
│   ├── README.md       # 完整文档
│   ├── API.md         # API 参考
│   └── DEVELOPMENT.md  # 开发指南
└── setup.sh         # 自动化启动脚本
```

## 🎨 核心功能

### MVP 功能（已完成）
- ✅ 消费记录：记录每笔消费（商家、分类、标签）
- ✅ 物品库：管理已购物品及生命周期
- ✅ 使用打卡：快速记录物品使用（一键打卡）
- ✅ 基础看板：支出、物品、关注清单统计
- ✅ 关注清单：监控感兴趣产品的价格

### 首页 3 张卡片
| 本月支出 | 闲置物品数 | 价格降价数 |
|--------|---------|--------|
| 💰 $3,500 | 📦 8 个 | 🎉 2 个 |

### 支出看板
- 按分类统计（饼图）
- 按商家排行（Top 10）
- 月度趋势（折线图）

### 物品看板
- 每次使用成本排行（识别"鸡肋"购买）
- 最常使用物品（TOP 10）
- 闲置检测（>30 天未使用）

### 关注清单看板
- 价格曲线图
- 最近 30 天最低价对比
- 降价排行（按幅度）

## 📊 数据模型

### Transactions (消费记录)
```
ID | 日期 | 商家 | 金额 | 分类 | 标签 | 发票 | 备注
```

### Items (物品库)
```
ID | 名称 | 品牌 | 购买日期 | 购价 | 状态 | 使用次数 | 闲置天数 | 每次成本
```

### UsageLogs (使用记录)
```
ID | 物品ID | 日期 | 时长 | 次数 | 满意度 | 上下文
```

### Watchlists (关注清单)
```
ID | 名称 | URL | 当前价 | 目标价 | 供应商 | 优先级 | 状态
```

### PriceHistory (价格历史)
```
ID | 清单ID | 时间 | 价格 | 库存 | 供应商
```

## 🔌 API 示例

### 快速记录使用（最常用）
```bash
# 一键打卡：记录物品使用
POST /usage-logs/quick/:itemId?count=1&duration=30
```

### 查询统计
```bash
# 月度支出统计
GET /transactions/stats/monthly?year=2024&month=2

# 物品价值排行
GET /items/stats/value-ranking

# 闲置物品（>30天）
GET /items/stats/idle?days=30

# 价格降幅排行
GET /watchlists/alerts/recent-drops?days=7

# 首页 3 张卡片
GET /dashboard/home-cards
```

完整 API 文档：[docs/API.md](docs/API.md)

## 🛠️ 开发指南

### 后端开发（NestJS）

```bash
# 热重载开发
npm run start:dev

# 编译生产版本
npm run build

# 运行生产版本
npm run start:prod

# 执行迁移
npm run typeorm:migration:run
```

**添加新模块流程**:
1. 创建 Entity (`src/entities/new.entity.ts`)
2. 创建 DTO (`src/new-module/dto/create-new.dto.ts`)
3. 创建 Service (`src/new-module/new-module.service.ts`)
4. 创建 Controller (`src/new-module/new-module.controller.ts`)
5. 创建 Module (`src/new-module/new-module.module.ts`)
6. 在 `app.module.ts` 中导入

### 前端开发（Next.js）

```bash
# 开发服务器（热重载）
npm run dev

# 生产构建
npm run build

# 生产运行
npm run start

# 类型检查
npm run type-check
```

**添加新页面**:
1. 创建 `src/app/page-name/page.tsx`
2. 在 `src/services/api.ts` 添加 API 调用（如需）
3. 使用 Zustand 管理全局状态（如需）

详细开发指南：[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)

## 📝 配置

### 后端 (backend/.env)
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=usetrack
DATABASE_PASSWORD=usetrack_password
DATABASE_NAME=usetrack_db

JWT_SECRET=your-secret-key
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 前端 (frontend/.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🎯 Next Steps (V2 计划)

### Phase 1: 自动化增强
- [ ] 自动价格爬取（网页 + API）
- [ ] 账单 CSV 导入
- [ ] 移动端快捷指令
- [ ] 浏览器插件

### Phase 2: AI & 洞察
- [ ] 异常支出检测
- [ ] 支出优化建议
- [ ] 物品推荐置换
- [ ] 预测分析

### Phase 3: 社区 & 集成
- [ ] 多用户支持
- [ ] 家庭账本
- [ ] 第三方集成（Plaid、银行 API）
- [ ] 数据导出

## 🐛 常见问题

**Q: 为什么连接不到数据库？**
A: 确保 PostgreSQL 正在运行。如果使用 Docker，运行上面的 docker 命令。

**Q: 如何重置数据库？**
A: 删除数据库并重新创建：
```bash
dropdb usetrack_db
createdb usetrack_db
# 然后重启后端服务
```

**Q: 如何调试后端代码？**
A: 运行 `npm run start:debug` 并在 VS Code 中设置断点。

**Q: 前端无法连接后端？**
A: 检查 `.env.local` 中的 `NEXT_PUBLIC_API_URL` 是否正确。

## 📚 文档

- [完整文档](docs/README.md) - 所有功能和架构详解
- [API 参考](docs/API.md) - 完整的 REST API 文档
- [开发指南](docs/DEVELOPMENT.md) - 贡献代码指南

## 📞 技术栈

| 层级 | 技术 |
|-----|------|
| **前端** | Next.js 14, React 18, TypeScript, Tailwind CSS, Zustand |
| **后端** | NestJS 10, TypeORM, PostgreSQL, JWT |
| **可视化** | ECharts, Recharts |
| **工具** | Axios, Day.js, Class-validator |

## 📄 许可证

MIT - 自由使用和修改

---

**Made with ❤️ for smarter spending and item management**

有问题？查看文档或提交 Issue！
