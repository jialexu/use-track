import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Item, ItemStatus } from '@/entities';
import { CreateItemDto, UpdateItemDto } from './dto/create-item.dto';

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

  async findAll(
    skip: number = 0,
    take: number = 20,
    status?: ItemStatus,
  ): Promise<{ data: Item[]; total: number }> {
    const query = this.itemsRepository.createQueryBuilder('i');

    if (status) {
      query.where('i.status = :status', { status });
    }

    const [data, total] = await query
      .leftJoinAndSelect('i.usage_logs', 'logs')
      .orderBy('i.purchase_date', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return { data, total };
  }

  async findOne(id: string): Promise<Item> {
    return this.itemsRepository.findOne({
      where: { id },
      relations: ['usage_logs'],
    });
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    await this.itemsRepository.update(id, updateItemDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.itemsRepository.delete(id);
  }

  // 获取闲置物品（30天未使用）
  async getIdleItems(days: number = 30): Promise<Item[]> {
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - days);

    const items = await this.itemsRepository
      .createQueryBuilder('i')
      .leftJoinAndSelect('i.usage_logs', 'logs')
      .where('i.status = :status', { status: ItemStatus.ACTIVE })
      .getMany();

    return items.filter(item => {
      const lastUsed = item.last_used;
      if (!lastUsed) {
        return new Date(item.purchase_date) < threshold;
      }
      return new Date(lastUsed) < threshold;
    });
  }

  // 物品价值排行（按每次使用成本）
  async getValueRanking(): Promise<any[]> {
    const items = await this.itemsRepository.find({
      relations: ['usage_logs'],
      where: { status: ItemStatus.ACTIVE },
      order: { purchase_date: 'DESC' },
    });

    return items.map(item => ({
      id: item.id,
      name: item.name,
      purchase_price: item.purchase_price,
      usage_count: item.usage_count,
      cost_per_use: item.cost_per_use,
      last_used: item.last_used,
      idle_days: item.idle_days,
    })).sort((a, b) => b.cost_per_use - a.cost_per_use);
  }

  // 获取最常使用的物品
  async getMostUsedItems(limit: number = 10): Promise<Item[]> {
    const items = await this.itemsRepository.find({
      relations: ['usage_logs'],
      where: { status: ItemStatus.ACTIVE },
    });

    return items
      .sort((a, b) => b.usage_count - a.usage_count)
      .slice(0, limit);
  }

  // 按分类统计
  async getCategoryStats(): Promise<any> {
    return this.itemsRepository
      .createQueryBuilder('i')
      .select('i.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .addSelect('SUM(i.purchase_price)', 'total_value')
      .where('i.status = :status', { status: ItemStatus.ACTIVE })
      .groupBy('i.category')
      .orderBy('count', 'DESC')
      .getRawMany();
  }
}
