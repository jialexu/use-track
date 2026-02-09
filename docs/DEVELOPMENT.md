# 开发指南

## 代码风格和规范

### TypeScript

- 启用严格模式 (`strict: true`)
- 为所有函数参数和返回值提供类型注解
- 避免使用 `any` 类型

```typescript
// ✅ Good
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ Bad
function calculateTotal(items: any): any {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

### NestJS 最佳实践

1. **模块化**：每个功能独立为一个模块
2. **依赖注入**：使用 NestJS DI 容器
3. **验证**：使用 DTOs 和 class-validator
4. **错误处理**：自定义异常过滤器

```typescript
// Entity with relations
@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => UsageLog, log => log.item)
  usage_logs: UsageLog[];
}

// DTO with validation
export class CreateItemDto {
  @IsString()
  name: string;

  @IsNumber()
  purchase_price: number;
}

// Service with database operations
@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const item = this.itemsRepository.create(createItemDto);
    return this.itemsRepository.save(item);
  }
}
```

### Next.js / React 最佳实践

1. **组件化**：小的、可复用的组件
2. **类型安全**：使用 TypeScript 接口
3. **性能优化**：使用 `memo`、`useCallback`
4. **状态管理**：Zustand 用于全局状态

```typescript
// Component with props interface
interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDelete,
}) => {
  return (
    <div>
      {transactions.map((tx) => (
        <div key={tx.id}>
          {tx.merchant} - {tx.total_amount}
          <button onClick={() => onDelete(tx.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
```

## 添加新模块

### 后端：添加新的 API 端点

1. **创建 Entity**：`src/entities/new-entity.entity.ts`
2. **创建 DTO**：`src/new-module/dto/create-new.dto.ts`
3. **创建 Service**：`src/new-module/new-module.service.ts`
4. **创建 Controller**：`src/new-module/new-module.controller.ts`
5. **创建 Module**：`src/new-module/new-module.module.ts`
6. **在 AppModule 中导入**

```typescript
// Entity
@Entity('new_entities')
export class NewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}

// DTO
export class CreateNewDto {
  @IsString()
  name: string;
}

// Service
@Injectable()
export class NewModuleService {
  constructor(
    @InjectRepository(NewEntity)
    private repository: Repository<NewEntity>,
  ) {}

  async create(dto: CreateNewDto): Promise<NewEntity> {
    return this.repository.save(this.repository.create(dto));
  }
}

// Controller
@Controller('new-entities')
export class NewModuleController {
  constructor(private readonly service: NewModuleService) {}

  @Post()
  create(@Body() createDto: CreateNewDto) {
    return this.service.create(createDto);
  }
}

// Module
@Module({
  imports: [TypeOrmModule.forFeature([NewEntity])],
  controllers: [NewModuleController],
  providers: [NewModuleService],
})
export class NewModule {}
```

### 前端：添加新页面

1. **创建页面**：`src/app/new-page/page.tsx`
2. **创建 API 客户端**（如需）：`src/services/api.ts` 中添加
3. **创建组件**（如需）：`src/components/...`
4. **连接状态管理**（如需）：`src/store/app.ts`

```typescript
// Page component
'use client';

import React, { useState, useEffect } from 'react';
import { newApi } from '@/services/api';

export default function NewPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await newApi.getAll();
        setItems(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>New Page</h1>
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

## 数据库迁移

### 创建新表

1. 定义 Entity
2. 启用自动同步（开发模式）或创建迁移脚本

```typescript
// TypeORM 会在开发模式自动创建表
// 生产环境需要手动迁移：
// npx typeorm migration:generate src/migrations/CreateNewTable
```

## API 客户端扩展

在 `src/services/api.ts` 中添加新的 API 调用：

```typescript
export const newApi = {
  getAll: () => apiClient.get('/new-entities'),
  getOne: (id: string) => apiClient.get(`/new-entities/${id}`),
  create: (data: any) => apiClient.post('/new-entities', data),
  update: (id: string, data: any) => apiClient.patch(`/new-entities/${id}`, data),
  delete: (id: string) => apiClient.delete(`/new-entities/${id}`),
};
```

## 状态管理

使用 Zustand 管理全局状态：

```typescript
interface AppState {
  currentItem: string | null;
  setCurrentItem: (item: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentItem: null,
  setCurrentItem: (item) => set({ currentItem: item }),
}));

// 在组件中使用
const { currentItem, setCurrentItem } = useAppStore();
```

## 测试

### 后端单元测试

```typescript
describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService],
    })
      .overrideProvider(getRepositoryToken(Item))
      .useValue(mockRepository)
      .compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should create an item', async () => {
    const createDto = { name: 'Test Item', purchase_price: 100 };
    const result = await service.create(createDto);
    expect(result).toEqual(expect.objectContaining(createDto));
  });
});
```

### 前端组件测试

```typescript
import { render, screen } from '@testing-library/react';
import { ItemCard } from '@/components/ItemCard';

describe('ItemCard', () => {
  it('renders item name', () => {
    const item = { id: '1', name: 'Test Item', purchase_price: 100 };
    render(<ItemCard item={item} />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });
});
```

## 调试

### 后端调试

1. 在 `launch.json` 中配置 Node 调试器
2. 在代码中设置断点
3. 运行 `npm run start:debug`

### 前端调试

1. 使用浏览器开发者工具
2. 使用 React DevTools
3. 查看网络请求（Network 标签）

## 性能优化

### 数据库查询

```typescript
// ✅ 使用 relations 一次性加载关联数据
const item = await this.itemsRepository.findOne({
  where: { id },
  relations: ['usage_logs'],
});

// ❌ 避免 N+1 查询
const items = await this.itemsRepository.find();
for (const item of items) {
  item.usage_logs = await this.usageLogsRepository.find({
    where: { item_id: item.id },
  });
}
```

### 前端性能

```typescript
// ✅ 使用 React.memo 避免不必要的重新渲染
const ItemCard = React.memo(({ item }: { item: Item }) => (
  <div>{item.name}</div>
));

// ✅ 使用 useCallback 避免创建新函数
const handleClick = useCallback(() => {
  doSomething();
}, []);
```

## 安全性

1. **验证所有输入**：使用 DTOs 和 class-validator
2. **SQL 注入防护**：使用 ORM（TypeORM）
3. **CORS**：配置正确的跨域策略
4. **环境变量**：敏感信息存储在 .env
5. **错误处理**：不要在错误消息中泄露内部信息

## 部署准备

1. **构建生产版本**
   ```bash
   # Backend
   npm run build
   npm run start:prod

   # Frontend
   npm run build
   npm run start
   ```

2. **环境配置**：设置生产环境变量
3. **数据库迁移**：运行迁移脚本
4. **日志和监控**：配置日志系统
5. **性能测试**：进行负载测试

## 常见问题

**Q: 如何添加新的数据库表？**
A: 创建 Entity → 在 Module 中导入 → TypeORM 自动同步

**Q: 如何调用后端 API？**
A: 在 `src/services/api.ts` 中定义 API 调用函数，在组件中使用

**Q: 如何管理全局状态？**
A: 使用 Zustand，在 `src/store/app.ts` 中定义状态

**Q: 如何调试后端代码？**
A: 使用 VS Code 调试器，设置断点并运行 `npm run start:debug`

