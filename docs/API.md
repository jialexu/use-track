# API 文档

## 基础信息

- **基 URL**: `http://localhost:3001`
- **内容类型**: `application/json`
- **认证**: JWT (可选，当前未启用)

## 响应格式

所有 API 返回 JSON 格式。成功响应返回数据，错误响应包含错误信息。

## Transactions API

### 创建消费
```
POST /transactions

请求体:
{
  "datetime": "2024-02-09T10:30:00Z",
  "merchant": "Amazon",
  "total_amount": 99.99,
  "currency": "USD",
  "payment_method": "credit_card",
  "category": "Electronics",
  "note": "Laptop stand",
  "tags": ["office", "equipment"]
}

响应:
{
  "id": "uuid",
  "datetime": "2024-02-09T10:30:00Z",
  "merchant": "Amazon",
  "total_amount": 99.99,
  ...
}
```

### 获取消费列表
```
GET /transactions?skip=0&take=20&startDate=2024-01-01&endDate=2024-02-09

查询参数:
- skip: 分页起始位置 (默认: 0)
- take: 每页数量 (默认: 20)
- startDate: 开始日期 (YYYY-MM-DD)
- endDate: 结束日期 (YYYY-MM-DD)

响应:
{
  "data": [...],
  "total": 150
}
```

### 月度统计
```
GET /transactions/stats/monthly?year=2024&month=2

响应:
{
  "totalAmount": 3500.50,
  "transactionCount": 45,
  "avgTransaction": 77.78,
  "byCategory": {
    "Electronics": 1200,
    "Food": 800,
    ...
  },
  "byMerchant": {
    "Amazon": 900,
    "Walmart": 500,
    ...
  }
}
```

### 分类统计
```
GET /transactions/stats/categories

响应:
[
  {
    "category": "Electronics",
    "count": 12,
    "total": 1500.00
  },
  ...
]
```

### 商家统计
```
GET /transactions/stats/merchants

响应:
[
  {
    "merchant": "Amazon",
    "count": 25,
    "total": 2000.00
  },
  ...
]
```

## Items API

### 创建物品
```
POST /items

请求体:
{
  "name": "MacBook Pro",
  "brand": "Apple",
  "model": "M3 Pro",
  "category": "Electronics",
  "purchase_date": "2024-01-15",
  "purchase_price": 2499.99,
  "quantity": 1,
  "warranty_end": "2025-01-15",
  "serial_no": "ABC123XYZ",
  "storage_location": "Office Desk"
}

响应:
{
  "id": "uuid",
  "name": "MacBook Pro",
  ...
  "usage_count": 0,
  "last_used": null,
  "idle_days": 25,
  "cost_per_use": 2499.99
}
```

### 获取物品列表
```
GET /items?skip=0&take=20&status=active

查询参数:
- skip: 分页起始位置 (默认: 0)
- take: 每页数量 (默认: 20)
- status: 物品状态 (active | sold | gifted | broken | lost)

响应:
{
  "data": [...],
  "total": 50
}
```

### 闲置物品 (30+ 天未使用)
```
GET /items/stats/idle?days=30

响应:
{
  "data": [
    {
      "id": "uuid",
      "name": "Item Name",
      "idle_days": 45,
      "last_used": "2024-01-01T10:00:00Z"
    },
    ...
  ],
  "total": 8
}
```

### 物品价值排行
```
GET /items/stats/value-ranking

响应:
[
  {
    "id": "uuid",
    "name": "Item Name",
    "purchase_price": 1000,
    "usage_count": 5,
    "cost_per_use": 200,
    "last_used": "2024-02-08T15:00:00Z",
    "idle_days": 1
  },
  ...
]
```

## Usage Logs API

### 创建使用记录
```
POST /usage-logs

请求体:
{
  "item_id": "uuid",
  "date": "2024-02-09",
  "duration_minutes": 120,
  "count": 1,
  "context_tags": ["office", "meeting"],
  "satisfaction": 5,
  "note": "Great performance!"
}

响应:
{
  "id": "uuid",
  "item_id": "uuid",
  "date": "2024-02-09",
  ...
}
```

### 快速记录（一键打卡）
```
POST /usage-logs/quick/:itemId?count=1&duration=30

响应:
{
  "id": "uuid",
  "item_id": "uuid",
  "date": "2024-02-09T14:32:00Z",
  "count": 1,
  "duration_minutes": 30
}
```

### 获取使用记录列表
```
GET /usage-logs/item/:itemId?skip=0&take=20

响应:
{
  "data": [...],
  "total": 42
}
```

### 使用趋势
```
GET /usage-logs/stats/trend/:itemId?days=30

响应:
[
  {
    "date": "2024-02-01",
    "count": 3
  },
  {
    "date": "2024-02-02",
    "count": 1
  },
  ...
]
```

## Watchlists API

### 创建关注
```
POST /watchlists

请求体:
{
  "name": "Sony Headphones",
  "url": "https://example.com/product/123",
  "current_price": 199.99,
  "target_price": 149.99,
  "currency": "USD",
  "vendor": "Amazon",
  "priority": 8,
  "status": "watching"
}

响应:
{
  "id": "uuid",
  "name": "Sony Headphones",
  ...
}
```

### 获取关注清单
```
GET /watchlists?skip=0&take=20&status=watching

查询参数:
- status: watching | purchased | cancelled

响应:
{
  "data": [...],
  "total": 15
}
```

### 添加价格记录
```
POST /watchlists/:id/price-history

请求体:
{
  "price": 189.99,
  "availability": "available",
  "shipping": 0
}

响应:
{
  "id": "uuid",
  "watchlist_id": "uuid",
  "datetime": "2024-02-09T10:00:00Z",
  "price": 189.99,
  ...
}
```

### 价格统计
```
GET /watchlists/stats/:id?days=30

响应:
{
  "current_price": 189.99,
  "target_price": 149.99,
  "min_price": 149.99,
  "max_price": 199.99,
  "avg_price": 179.99,
  "price_drop_percent": "26.68",
  "price_history_count": 15
}
```

### 降价提醒（达成目标价的）
```
GET /watchlists/alerts/price-drops

响应:
{
  "data": [
    {
      "id": "uuid",
      "name": "Product Name",
      "current_price": 145.00,
      "target_price": 149.99,
      "status": "watching"
    },
    ...
  ],
  "total": 2
}
```

### 最近降价排行
```
GET /watchlists/alerts/recent-drops?days=7

响应:
[
  {
    "id": "uuid",
    "name": "Product Name",
    "old_price": 199.99,
    "current_price": 179.99,
    "drop_amount": "20.00",
    "drop_percent": "10.00"
  },
  ...
]
```

## Dashboard API

### 首页 3 张卡片
```
GET /dashboard/home-cards

响应:
{
  "monthly_expense": 3500.50,
  "idle_items_count": 8,
  "price_drop_alerts": 2
}
```

### 支出看板
```
GET /dashboard/spending?month=2&year=2024

响应:
{
  "total_amount": 3500.50,
  "transaction_count": 45,
  "avg_transaction": 77.78,
  "avg_daily": 116.68,
  "by_category": {
    "Electronics": 1200,
    "Food": 800,
    ...
  },
  "top_merchants": {
    "Amazon": 900,
    "Walmart": 500,
    ...
  }
}
```

### 物品看板
```
GET /dashboard/items

响应:
{
  "total_items": 50,
  "total_value": 25000.00,
  "cost_per_use_ranking": [
    {
      "id": "uuid",
      "name": "Item",
      "purchase_price": 2000,
      "usage_count": 2,
      "cost_per_use": 1000
    },
    ...
  ],
  "most_used": [...],
  "idle_items": [...]
}
```

### 关注清单看板
```
GET /dashboard/watchlist

响应:
{
  "total_watched": 15,
  "watching_count": 12,
  "price_drops_count": 3,
  "target_achieved_count": 2,
  "price_drops": [...],
  "target_achieved": [...]
}
```

### 综合看板
```
GET /dashboard

响应:
{
  "home_cards": {...},
  "spending": {...},
  "items": {...},
  "watchlist": {...}
}
```

## 错误处理

错误响应示例：
```json
{
  "statusCode": 400,
  "message": "Invalid request data",
  "error": "Bad Request"
}
```

常见错误码：
- `400` - 请求参数错误
- `404` - 资源不存在
- `500` - 服务器错误

## 分页

分页通过 `skip` 和 `take` 参数实现：
- `skip`: 跳过的记录数
- `take`: 返回的记录数

总页数计算: `Math.ceil(total / take)`

## 日期格式

- ISO 8601: `2024-02-09T10:30:00Z`
- 日期: `YYYY-MM-DD`

