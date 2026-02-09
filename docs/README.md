# UseTrack - Personal Consumption & Item Lifecycle Tracking System

一个完整的个人消费和物品生命周期追踪系统，帮助你智能化地管理支出、追踪物品使用情况，并监控心愿单价格变化。

## 🎯 核心特性

### 1. 消费记录 (Transactions)
- 记录每笔消费（金额、商家、分类、标签）
- 支持账单拆分（一单多件）
- 支持小票和发票上传
- 自动分类和标签建议

### 2. 物品库 (Items)
- 物品信息管理（品牌、型号、保修期等）
- 物品生命周期追踪（使用、转售、损坏等）
- 每次使用成本计算
- 闲置物品检测

### 3. 使用追踪 (Usage Logs)
- 快速记录物品使用（一键打卡）
- 使用频率和时长统计
- 满意度评分
- 使用趋势分析

### 4. 关注清单 (Watchlist)
- 添加感兴趣的产品
- 自动价格跟踪
- 价格降幅提醒
- 价格历史曲线

### 5. 可视化看板
- 首页 3 张卡片：月支出、闲置物品数、降价提醒数
- 支出看板：按分类/商家统计
- 物品看板：每次使用成本排行、闲置检测
- 关注清单看板：价格曲线、降价排行

## 🏗️ 技术架构

### 后端 (Backend)
- **框架**: NestJS
- **数据库**: PostgreSQL
- **ORM**: TypeORM
- **验证**: class-validator
- **认证**: JWT (可选扩展)

### 前端 (Frontend)
- **框架**: Next.js 14
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **图表**: ECharts / Recharts
- **HTTP**: Axios

### 可选服务
- 价格跟踪队列：Bull + Redis
- 定时任务：cron
- 文件上传：AWS S3 / 本地存储

## 📦 项目结构

```
UseTrack/
├── backend/                 # NestJS 后端
│   ├── src/
│   │   ├── entities/       # 数据库模型
│   │   ├── transactions/   # 消费记录模块
│   │   ├── items/          # 物品库模块
│   │   ├── usage-logs/     # 使用追踪模块
│   │   ├── watchlists/     # 关注清单模块
│   │   ├── dashboard/      # 看板模块
│   │   ├── app.module.ts   # 主模块
│   │   └── main.ts         # 启动入口
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                # 环境配置
├── frontend/               # Next.js 前端
│   ├── src/
│   │   ├── app/           # Next.js 应用
│   │   ├── components/    # React 组件
│   │   ├── services/      # API 客户端
│   │   ├── store/         # Zustand 状态管理
│   │   ├── lib/           # 工具函数
│   │   └── styles/        # 全局样式
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── .env.local         # 环境配置
└── docs/                   # 文档
    ├── API.md             # API 文档
    ├── SETUP.md           # 设置指南
    └── DEVELOPMENT.md     # 开发指南
```

## 🚀 快速开始

### 前置要求
- Node.js 18+
- npm 或 yarn
- PostgreSQL 12+

### 安装步骤

#### 1. 克隆或创建项目
```bash
cd /Users/jasonxu/Desktop/UseTrack
```

#### 2. 启动 PostgreSQL
```bash
# macOS (使用 Homebrew)
brew services start postgresql

# 或使用 Docker
docker run --name usetrack-postgres -e POSTGRES_PASSWORD=usetrack_password -e POSTGRES_DB=usetrack_db -p 5432:5432 -d postgres:15
```

#### 3. 后端设置
```bash
cd backend

# 安装依赖
npm install

# 启动开发服务器
npm run start:dev

# API 将在 http://localhost:3001 运行
```

#### 4. 前端设置
```bash
cd ../frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 应用将在 http://localhost:3000 运行
```

## 📚 API 文档

### Transactions (消费记录)
```
POST   /transactions              # 创建消费
GET    /transactions              # 获取消费列表
GET    /transactions/:id          # 获取单笔消费
PATCH  /transactions/:id          # 更新消费
DELETE /transactions/:id          # 删除消费

GET    /transactions/stats/monthly        # 月度统计
GET    /transactions/stats/categories     # 分类统计
GET    /transactions/stats/merchants      # 商家统计
```

### Items (物品库)
```
POST   /items                     # 创建物品
GET    /items                     # 获取物品列表
GET    /items/:id                 # 获取单个物品
PATCH  /items/:id                 # 更新物品
DELETE /items/:id                 # 删除物品

GET    /items/stats/categories    # 分类统计
GET    /items/stats/idle          # 闲置物品
GET    /items/stats/most-used     # 最常使用物品
GET    /items/stats/value-ranking # 物品价值排行
```

### Usage Logs (使用追踪)
```
POST   /usage-logs                # 创建使用记录
POST   /usage-logs/quick/:itemId  # 快速记录（一键打卡）
GET    /usage-logs/item/:itemId   # 获取物品使用记录
GET    /usage-logs/:id            # 获取单条记录
PATCH  /usage-logs/:id            # 更新记录
DELETE /usage-logs/:id            # 删除记录

GET    /usage-logs/stats/:itemId        # 使用统计
GET    /usage-logs/stats/trend/:itemId  # 使用趋势
```

### Watchlists (关注清单)
```
POST   /watchlists                # 创建关注
GET    /watchlists                # 获取清单
GET    /watchlists/:id            # 获取清单详情
PATCH  /watchlists/:id            # 更新清单
DELETE /watchlists/:id            # 删除清单

POST   /watchlists/:id/price-history    # 添加价格记录
GET    /watchlists/stats/:id            # 价格统计
GET    /watchlists/alerts/price-drops   # 降价提醒
GET    /watchlists/alerts/recent-drops  # 最近降价
```

### Dashboard (看板)
```
GET    /dashboard/home-cards      # 首页 3 张卡片
GET    /dashboard/spending        # 支出看板
GET    /dashboard/items           # 物品看板
GET    /dashboard/watchlist       # 关注清单看板
GET    /dashboard                 # 综合看板
```

## 🔧 配置

### 后端 (.env)
```env
# 数据库
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=usetrack
DATABASE_PASSWORD=usetrack_password
DATABASE_NAME=usetrack_db

# JWT 认证
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d

# 服务器
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000

# 价格跟踪（可选）
PRICE_TRACKING_ENABLED=true
PRICE_CHECK_INTERVAL_HOURS=6
```

### 前端 (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📊 数据模型

### Transaction (消费记录)
```typescript
{
  id: UUID;
  datetime: Date;
  merchant?: string;
  total_amount: number;
  currency: string;
  payment_method?: string;
  category?: string;
  note?: string;
  tags?: string[];
  receipt_images?: string;
  invoice_no?: string;
  tax?: number;
  shipping_fee?: number;
}
```

### Item (物品)
```typescript
{
  id: UUID;
  name: string;
  brand?: string;
  model?: string;
  category?: string;
  purchase_date: Date;
  purchase_price: number;
  quantity: number;
  warranty_end?: Date;
  return_deadline?: Date;
  serial_no?: string;
  storage_location?: string;
  status: ItemStatus;  // active | sold | gifted | broken | lost
  transaction_id?: UUID;
  usage_count: number;
  last_used?: Date;
  idle_days: number;
  cost_per_use: number;
}
```

### UsageLog (使用记录)
```typescript
{
  id: UUID;
  item_id: UUID;
  date: Date;
  duration_minutes?: number;
  count: number;
  context_tags?: string[];
  satisfaction?: number;  // 1-5
  note?: string;
}
```

### Watchlist (关注清单)
```typescript
{
  id: UUID;
  name: string;
  url: string;
  target_price?: number;
  current_price?: number;
  currency: string;
  vendor: string;
  priority: number;
  status: string;  // watching | purchased | cancelled
  price_history: PriceHistory[];
}
```

### PriceHistory (价格历史)
```typescript
{
  id: UUID;
  watchlist_id: UUID;
  datetime: Date;
  price: number;
  availability?: string;
  shipping?: number;
  vendor: string;
}
```

## 🎨 功能亮点

### MVP 核心功能
- ✅ 手动录入消费
- ✅ 物品入库和生命周期管理
- ✅ 使用打卡（快速记录）
- ✅ 基础统计和可视化
- ✅ 关注清单和价格跟踪
- ✅ 首页 3 张卡片

### V2 计划功能
- 🔄 自动价格跟踪（网页爬取/API/第三方服务）
- 📱 移动端快捷指令和小组件
- 🏦 账单自动导入（CSV/Plaid）
- 📈 高级趋势分析
- 🎯 支出优化建议

## 🔐 安全性

- JWT 认证（可选扩展）
- CORS 跨域保护
- 输入验证和清理
- 环境变量隔离
- SQL 注入防护（TypeORM）

## 🚧 下一步

1. **数据库初始化**: 连接 PostgreSQL 后自动创建表
2. **测试数据**: 运行 seed 脚本加入示例数据
3. **前端表单**: 实现新增/编辑表单
4. **价格爬取**: 集成网页爬取或 API
5. **移动适配**: 优化移动端体验
6. **部署**: Docker + 云服务（AWS/Azure/阿里云）

## 📝 开发指南

### 添加新功能

1. **后端**: 添加实体 → 创建模块 → 实现服务 → 添加控制器
2. **前端**: 创建 API 调用 → 构建组件 → 连接状态管理
3. **测试**: 编写单元测试和集成测试

### 代码规范

- TypeScript 严格模式
- ESLint + Prettier
- Git Commit Message 规范
- PR 代码审查

## 📞 支持

有问题？查看项目文档或提交 Issue。

## 📄 许可证

MIT

---

**Happy Tracking!** 🎯💰📊
