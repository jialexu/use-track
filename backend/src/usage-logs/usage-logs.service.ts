import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { UsageLog } from '@/entities';
import { CreateUsageLogDto, UpdateUsageLogDto } from './dto/create-usage-log.dto';

@Injectable()
export class UsageLogsService {
  constructor(
    @InjectRepository(UsageLog)
    private usageLogsRepository: Repository<UsageLog>,
  ) {}

  async create(createUsageLogDto: CreateUsageLogDto): Promise<UsageLog> {
    const usageLog = this.usageLogsRepository.create(createUsageLogDto);
    return this.usageLogsRepository.save(usageLog);
  }

  async findAll(
    itemId: string,
    skip: number = 0,
    take: number = 20,
  ): Promise<{ data: UsageLog[]; total: number }> {
    const [data, total] = await this.usageLogsRepository.findAndCount({
      where: { item_id: itemId },
      order: { date: 'DESC' },
      skip,
      take,
    });

    return { data, total };
  }

  async findOne(id: string): Promise<UsageLog> {
    return this.usageLogsRepository.findOneBy({ id });
  }

  async update(id: string, updateUsageLogDto: UpdateUsageLogDto): Promise<UsageLog> {
    await this.usageLogsRepository.update(id, updateUsageLogDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usageLogsRepository.delete(id);
  }

  // 获取指定日期范围的使用统计
  async getUsageStats(itemId: string, startDate: Date, endDate: Date): Promise<any> {
    const logs = await this.usageLogsRepository.find({
      where: {
        item_id: itemId,
        date: Between(startDate, endDate),
      },
    });

    const totalCount = logs.reduce((sum, log) => sum + (log.count || 1), 0);
    const totalDuration = logs.reduce((sum, log) => sum + (log.duration_minutes || 0), 0);
    const avgSatisfaction = logs.length > 0
      ? logs.filter(l => l.satisfaction).reduce((sum, log) => sum + log.satisfaction, 0) / logs.length
      : 0;

    return {
      logsCount: logs.length,
      totalCount,
      totalDuration,
      avgSatisfaction,
      logs,
    };
  }

  // 获取最近使用趋势（7天、30天）
  async getUsageTrend(itemId: string, days: number = 30): Promise<any[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const endDate = new Date();

    const logs = await this.usageLogsRepository.find({
      where: {
        item_id: itemId,
        date: Between(startDate, endDate),
      },
      order: { date: 'ASC' },
    });

    // 按日期分组
    const grouped: { [key: string]: number } = {};
    logs.forEach(log => {
      const dateStr = log.date.toISOString().split('T')[0];
      grouped[dateStr] = (grouped[dateStr] || 0) + (log.count || 1);
    });

    return Object.entries(grouped).map(([date, count]) => ({
      date,
      count,
    }));
  }

  // 一键快速记录（用于小组件/快捷方式）
  async quickLog(itemId: string, count: number = 1, duration: number = null): Promise<UsageLog> {
    const usageLog = this.usageLogsRepository.create({
      item_id: itemId,
      date: new Date(),
      count,
      duration_minutes: duration,
    });
    return this.usageLogsRepository.save(usageLog);
  }
}
