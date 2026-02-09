# 🚀 UseTrack 操作指南

## 📦 项目已完全搭建！

你现在拥有一个**生产级别的 MVP**，包含：

- ✅ **后端**: NestJS + PostgreSQL（40+ API 端点）
- ✅ **前端**: Next.js + React + Tailwind（4 个核心页面）
- ✅ **数据库**: 5 个核心数据模型
- ✅ **文档**: 完整的开发和 API 文档

## 🎯 三步启动

### 步骤 1: 启动数据库（选择一种）

**方式 A: 使用 Docker（推荐）**
```bash
docker run --name usetrack-postgres \
  -e POSTGRES_PASSWORD=usetrack_password \
  -e POSTGRES_DB=usetrack_db \
  -p 5432:5432 \
  -d postgres:15
```

**方式 B: 使用 Homebrew（macOS）**
```bash
brew services start postgresql
```

### 步骤 2: 启动后端

**终端 1:**
```bash
cd /Users/jasonxu/Desktop/UseTrack/backend

# 首次运行
npm install

# 启动开发服务器（支持热重载）
npm run start:dev

# 输出应该显示：
# ✓ UseTrack API running on http://localhost:3001
```

### 步骤 3: 启动前端

**终端 2:**
```bash
cd /Users/jasonxu/Desktop/UseTrack/frontend

# 首次运行
npm install

# 启动开发服务器
npm run dev

# 输出应该显示：
# ▲ Next.js 14.0.0
# ✓ Ready in 1234ms
```

**打开浏览器**: http://localhost:3000 🎉

---

## 📊 功能演示

### 1. 首页（Home）
- 显示 3 张关键卡片
  - 本月支出（例如：$3,500）
  - 闲置物品数（例如：8 个）
  - 价格降价数（例如：2 个）
- 快速操作按钮
- 导航链接

### 2. 消费记录页面（Transactions）
- 显示所有消费列表
- 按日期排序
- 展示商家、分类、金额、标签

### 3. 物品库页面（Items）
- 显示所有物品卡片
- 快速打卡按钮（最常用功能！）
- 过滤按钮（按状态）
- 显示购买价、数量、类别

### 4. 关注清单页面（Watchlists）
- 显示关注的产品
- 当前价 vs 目标价对比
- 颜色提示（绿色 = 达成目标）
- 优先级和状态指示

---

## 🎮 常用操作

### 1. 快速记录物品使用（最常用）
```bash
# 方式 A: 通过 UI
1. 进入 Items 页面
2. 找到要记录的物品
3. 点击 "+ Log Usage" 按钮
4. ✅ 一秒钟完成记录！

# 方式 B: 通过 API（Postman）
POST http://localhost:3001/usage-logs/quick/[item-id]?count=1&duration=30
```

### 2. 创建消费记录
```bash
# 通过 API
POST http://localhost:3001/transactions
Content-Type: application/json

{
  "datetime": "2024-02-09T10:30:00Z",
  "merchant": "Amazon",
  "total_amount": 99.99,
  "currency": "USD",
  "category": "Electronics",
  "tags": ["office", "equipment"],
  "note": "Laptop stand"
}
```

### 3. 添加物品
```bash
POST http://localhost:3001/items
Content-Type: application/json

{
  "name": "MacBook Pro",
  "brand": "Apple",
  "purchase_date": "2024-01-15",
  "purchase_price": 2499.99,
  "category": "Electronics",
  "quantity": 1
}
```

### 4. 创建关注清单
```bash
POST http://localhost:3001/watchlists
Content-Type: application/json

{
  "name": "Sony Headphones",
  "url": "https://amazon.com/dp/xxx",
  "current_price": 199.99,
  "target_price": 149.99,
  "currency": "USD",
  "vendor": "Amazon",
  "priority": 8
}
```

### 5. 查看统计数据
```bash
# 月度统计
GET http://localhost:3001/transactions/stats/monthly?year=2024&month=2

# 物品价值排行
GET http://localhost:3001/items/stats/value-ranking

# 闲置物品
GET http://localhost:3001/items/stats/idle?days=30

# 价格降幅排行
GET http://localhost:3001/watchlists/alerts/recent-drops?days=7

# 首页 3 张卡片
GET http://localhost:3001/dashboard/home-cards
```

---

## 🛠️ 开发工具

### 推荐工具

1. **Postman** - API 测试
   - 导入 API 端点进行测试
   - 参考 `docs/API.md`

2. **pgAdmin** - 数据库管理
   - 连接到 localhost:5432
   - 用户名: usetrack
   - 密码: usetrack_password

3. **VS Code Extensions**
   - REST Client - 在 VS Code 中测试 API
   - Thunder Client - 轻量级 API 工具
   - PostgreSQL - 数据库浏览

### VS Code 快速测试（不需要 Postman）

创建 `test.http` 文件：
```http
### 创建消费
POST http://localhost:3001/transactions
Content-Type: application/json

{
  "datetime": "2024-02-09T10:30:00Z",
  "merchant": "Amazon",
  "total_amount": 99.99,
  "currency": "USD",
  "category": "Electronics"
}

### 获取消费列表
GET http://localhost:3001/transactions

### 首页卡片
GET http://localhost:3001/dashboard/home-cards
```

然后点击 "Send Request" 按钮！

---

## 📚 文档速查

| 文档 | 说明 |
|-----|------|
| [`README.md`](README.md) | 项目总览和快速开始 |
| [`PROJECT_SUMMARY.md`](PROJECT_SUMMARY.md) | 详细的项目完成情况 |
| [`docs/API.md`](docs/API.md) | 完整的 API 参考（最有用！） |
| [`docs/README.md`](docs/README.md) | 项目详细文档 |
| [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) | 开发指南和最佳实践 |

---

## 🔧 常见操作

### 重置数据库
```bash
# 重置数据库（删除所有数据）
dropdb usetrack_db
createdb usetrack_db

# 重启后端服务（会自动创建所有表）
# Ctrl+C 停止后端
npm run start:dev
```

### 查看数据库数据
```bash
# 连接到数据库
psql -U usetrack -d usetrack_db -h localhost

# 查看所有表
\dt

# 查看消费记录
SELECT * FROM transactions LIMIT 10;

# 查看物品
SELECT * FROM items LIMIT 10;

# 退出
\q
```

### 调试后端
```bash
# 开启调试模式
npm run start:debug

# 在 VS Code 中设置断点
# F5 attach debugger
```

### 构建生产版本
```bash
# 后端
cd backend
npm run build
npm run start:prod

# 前端
cd frontend
npm run build
npm run start
```

---

## 💡 关键概念

### 物品生命周期
```
购入 → 使用 → [闲置/频繁使用] → 转售/损坏/丢失
  ↓        ↓        ↓
 Item   UsageLog  状态更新
```

### 计算属性自动维护
```
Item {
  usage_count: 物品使用次数（自动统计）
  last_used: 最后使用时间（自动更新）
  idle_days: 闲置天数（自动计算）
  cost_per_use: 每次使用成本（自动计算）
}
```

### 快速打卡原理
```
GET /usage-logs/quick/:itemId?count=1&duration=30

→ 1. 创建 UsageLog 记录
  2. 自动更新 Item.last_used
  3. 自动更新 Item.usage_count
  4. 自动重新计算 Item.cost_per_use
```

---

## 📊 数据查询示例

### 查询示例 1: 本月支出排行
```bash
curl http://localhost:3001/transactions/stats/monthly?year=2024&month=2
```

**响应**:
```json
{
  "totalAmount": 3500.50,
  "transactionCount": 45,
  "avgTransaction": 77.78,
  "byCategory": {
    "Electronics": 1200,
    "Food": 800,
    "Transport": 500
  },
  "byMerchant": {
    "Amazon": 900,
    "Walmart": 500
  }
}
```

### 查询示例 2: 物品价值排行
```bash
curl http://localhost:3001/items/stats/value-ranking
```

**响应**: 按每次使用成本排序
```json
[
  {
    "id": "xxx",
    "name": "MacBook Pro",
    "purchase_price": 2500,
    "usage_count": 5,
    "cost_per_use": 500,
    "idle_days": 1
  },
  {
    "id": "yyy",
    "name": "Running Shoes",
    "purchase_price": 150,
    "usage_count": 100,
    "cost_per_use": 1.5,
    "idle_days": 0
  }
]
```

### 查询示例 3: 闲置物品（30+ 天）
```bash
curl http://localhost:3001/items/stats/idle?days=30
```

**响应**:
```json
{
  "data": [
    {
      "id": "xxx",
      "name": "Yoga Mat",
      "idle_days": 45,
      "last_used": "2024-01-01T10:00:00Z"
    }
  ],
  "total": 8
}
```

---

## 🎯 后续开发路线

### 本周 (Week 1)
- [ ] 测试所有 API 端点
- [ ] 完成前端表单（新增/编辑）
- [ ] 部署验证

### 第 2-3 周 (Week 2-3)
- [ ] 自动价格爬取
- [ ] CSV 账单导入
- [ ] 增强图表可视化

### 第 4-6 周 (Week 4-6)
- [ ] 浏览器插件
- [ ] 移动端 PWA
- [ ] 高级搜索

### 更长期 (V2+)
- [ ] 多用户支持
- [ ] AI 智能建议
- [ ] 第三方集成

---

## ✅ 完整清单

```
项目结构
├── ✅ backend/ - NestJS API
├── ✅ frontend/ - Next.js UI
├── ✅ docs/ - 完整文档
├── ✅ README.md - 项目总览
├── ✅ PROJECT_SUMMARY.md - 完成总结
├── ✅ setup.sh - 自动启动脚本
└── ✅ QUICK_START.md - 本文件

后端模块
├── ✅ Transactions - 消费记录
├── ✅ Items - 物品库
├── ✅ UsageLogs - 使用追踪
├── ✅ Watchlists - 关注清单
└── ✅ Dashboard - 看板聚合

前端页面
├── ✅ 首页 (/)
├── ✅ 消费记录 (/transactions)
├── ✅ 物品库 (/items)
└── ✅ 关注清单 (/watchlists)

API 端点
├── ✅ 40+ 个 RESTful 端点
├── ✅ 统计和聚合接口
├── ✅ 快捷操作接口
└── ✅ 仪表板接口
```

---

## 🚨 故障排除

### 问题 1: 无法连接数据库
```
错误: connect ECONNREFUSED 127.0.0.1:5432

解决:
1. 确保 PostgreSQL 正在运行
   docker ps | grep postgres
2. 检查 .env 配置
3. 尝试手动连接
   psql -U usetrack -d usetrack_db -h localhost
```

### 问题 2: 前端无法调用 API
```
错误: CORS error / API not found

解决:
1. 确保后端运行在 http://localhost:3001
2. 检查 frontend/.env.local 中的 NEXT_PUBLIC_API_URL
3. 检查浏览器 Network 标签中的请求 URL
```

### 问题 3: 端口被占用
```
错误: listen EADDRINUSE :::3001

解决:
# 杀死占用端口的进程
lsof -i :3001
kill -9 <PID>

# 或改变端口
export PORT=3002
npm run start:dev
```

### 问题 4: 依赖安装失败
```
解决:
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 获取帮助

1. **查看文档**: `docs/` 目录
2. **查看 API 文档**: `docs/API.md`
3. **查看开发指南**: `docs/DEVELOPMENT.md`
4. **检查环境配置**: `.env` 文件
5. **查看项目总结**: `PROJECT_SUMMARY.md`

---

## 🎉 准备好了！

**现在就开始吧**:

```bash
# 自动化启动
bash setup.sh

# 或手动启动（参考上面的"三步启动"）
```

**然后访问**: http://localhost:3000

---

## 📈 关键 API 速查

| 功能 | 端点 |
|-----|------|
| 快速打卡 ⭐⭐⭐ | `POST /usage-logs/quick/:itemId` |
| 首页卡片 | `GET /dashboard/home-cards` |
| 月度统计 | `GET /transactions/stats/monthly` |
| 物品排行 | `GET /items/stats/value-ranking` |
| 闲置检测 | `GET /items/stats/idle` |
| 价格跟踪 | `GET /watchlists/alerts/recent-drops` |

---

祝你编码愉快！🚀✨

*最后更新: 2026-02-09*
