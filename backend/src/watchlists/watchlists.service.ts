import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Watchlist, PriceHistory } from '@/entities';
import { CreateWatchlistDto, UpdateWatchlistDto } from './dto/create-watchlist.dto';

@Injectable()
export class WatchlistsService {
  constructor(
    @InjectRepository(Watchlist)
    private watchlistsRepository: Repository<Watchlist>,
    @InjectRepository(PriceHistory)
    private priceHistoryRepository: Repository<PriceHistory>,
  ) {}

  async create(createWatchlistDto: CreateWatchlistDto): Promise<Watchlist> {
    const watchlist = this.watchlistsRepository.create(createWatchlistDto);
    const saved = await this.watchlistsRepository.save(watchlist);

    // 创建初始价格记录
    if (saved.current_price) {
      await this.priceHistoryRepository.save({
        watchlist_id: saved.id,
        datetime: new Date(),
        price: saved.current_price,
        vendor: saved.vendor,
        availability: 'available',
      });
    }

    return saved;
  }

  async findAll(
    skip: number = 0,
    take: number = 20,
    status?: string,
  ): Promise<{ data: Watchlist[]; total: number }> {
    const query = this.watchlistsRepository.createQueryBuilder('w');

    if (status) {
      query.where('w.status = :status', { status });
    }

    const [data, total] = await query
      .leftJoinAndSelect('w.price_history', 'history', 'history.id IS NOT NULL')
      .orderBy('w.priority', 'DESC')
      .addOrderBy('w.created_at', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return { data, total };
  }

  async findOne(id: string): Promise<Watchlist> {
    return this.watchlistsRepository.findOne({
      where: { id },
      relations: ['price_history'],
      order: {
        price_history: {
          datetime: 'DESC',
        },
      },
    });
  }

  async update(id: string, updateWatchlistDto: UpdateWatchlistDto): Promise<Watchlist> {
    await this.watchlistsRepository.update(id, updateWatchlistDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.watchlistsRepository.delete(id);
  }

  // 添加价格记录
  async addPriceHistory(
    watchlistId: string,
    price: number,
    availability?: string,
    shipping?: number,
  ): Promise<PriceHistory> {
    // 更新当前价格
    await this.watchlistsRepository.update(watchlistId, { current_price: price });

    // 创建历史记录
    const history = this.priceHistoryRepository.create({
      watchlist_id: watchlistId,
      datetime: new Date(),
      price,
      availability,
      shipping,
      vendor: (await this.findOne(watchlistId)).vendor,
    });

    return this.priceHistoryRepository.save(history);
  }

  // 获取价格统计
  async getPriceStats(watchlistId: string, days: number = 30): Promise<any> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const histories = await this.priceHistoryRepository.find({
      where: {
        watchlist_id: watchlistId,
        datetime: new Date(),
      },
      order: { datetime: 'ASC' },
    });

    const prices = histories.map(h => h.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = prices.reduce((a, b) => a + b) / prices.length;

    const watchlist = await this.findOne(watchlistId);
    const targetPrice = watchlist.target_price;
    const currentPrice = watchlist.current_price;

    return {
      current_price: currentPrice,
      target_price: targetPrice,
      min_price: minPrice,
      max_price: maxPrice,
      avg_price: avgPrice,
      price_drop_percent: targetPrice ? ((targetPrice - currentPrice) / targetPrice * 100).toFixed(2) : 0,
      price_history_count: histories.length,
    };
  }

  // 获取降价清单（目标价及以下）
  async getPriceDropItems(): Promise<Watchlist[]> {
    const watchlists = await this.watchlistsRepository.find({
      where: { status: 'watching' },
    });

    return watchlists.filter(w => {
      if (!w.target_price || !w.current_price) return false;
      return w.current_price <= w.target_price;
    });
  }

  // 获取最近降价的项目（价格变化）
  async getRecentPriceDrops(days: number = 7): Promise<any[]> {
    const watchlists = await this.watchlistsRepository.find({
      relations: ['price_history'],
    });

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const results = [];

    for (const watchlist of watchlists) {
      const oldPrice = watchlist.price_history.find(h => h.datetime < startDate);
      if (oldPrice && watchlist.current_price < oldPrice.price) {
        results.push({
          id: watchlist.id,
          name: watchlist.name,
          old_price: oldPrice.price,
          current_price: watchlist.current_price,
          drop_amount: (oldPrice.price - watchlist.current_price).toFixed(2),
          drop_percent: ((oldPrice.price - watchlist.current_price) / oldPrice.price * 100).toFixed(2),
        });
      }
    }

    return results.sort((a, b) => parseFloat(b.drop_percent) - parseFloat(a.drop_percent));
  }
}
