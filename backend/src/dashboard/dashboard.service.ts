import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, Item, Watchlist, UsageLog } from '@/entities';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    @InjectRepository(Watchlist)
    private watchlistsRepository: Repository<Watchlist>,
    @InjectRepository(UsageLog)
    private usageLogsRepository: Repository<UsageLog>,
  ) {}

  // 首页3张卡片
  async getHomeCards(): Promise<any> {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // 1. 本月支出
    const monthlyTransactions = await this.transactionsRepository.find({
      where: {
        datetime: new Date(),
      },
    });
    const monthlyExpense = monthlyTransactions.reduce((sum, t) => sum + t.total_amount, 0);

    // 2. 闲置物品数（30天未使用）
    const allItems = await this.itemsRepository.find({
      relations: ['usage_logs'],
    });
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - 30);

    const idleCount = allItems.filter(item => {
      const lastUsed = item.usage_logs?.length > 0
        ? item.usage_logs.reduce((latest, log) => {
            return new Date(log.date) > new Date(latest.date) ? log : latest;
          }).date
        : null;

      if (!lastUsed) {
        return new Date(item.purchase_date) < threshold;
      }
      return new Date(lastUsed) < threshold;
    }).length;

    // 3. 关注清单中降价的数量
    const watchlists = await this.watchlistsRepository.find();
    const priceDropCount = watchlists.filter(
      w => w.target_price && w.current_price && w.current_price <= w.target_price,
    ).length;

    return {
      monthly_expense: parseFloat(monthlyExpense.toFixed(2)),
      idle_items_count: idleCount,
      price_drop_alerts: priceDropCount,
    };
  }

  // 支出看板数据
  async getSpendingDashboard(month?: number, year?: number): Promise<any> {
    const now = new Date();
    const targetMonth = month || now.getMonth() + 1;
    const targetYear = year || now.getFullYear();

    const startDate = new Date(targetYear, targetMonth - 1, 1);
    const endDate = new Date(targetYear, targetMonth, 0);

    const transactions = await this.transactionsRepository.find({
      where: {
        datetime: new Date(),
      },
    });

    // 按分类
    const byCategory = {};
    let totalAmount = 0;
    transactions.forEach(t => {
      const category = t.category || 'Uncategorized';
      byCategory[category] = (byCategory[category] || 0) + t.total_amount;
      totalAmount += t.total_amount;
    });

    // 按商家（Top 10）
    const byMerchant = {};
    transactions.forEach(t => {
      const merchant = t.merchant || 'Unknown';
      byMerchant[merchant] = (byMerchant[merchant] || 0) + t.total_amount;
    });

    const topMerchants = Object.entries(byMerchant)
      .sort((a: any, b: any) => b[1] - a[1])
      .slice(0, 10);

    // 日均支出
    const days = endDate.getDate();
    const avgDaily = totalAmount / days;

    return {
      total_amount: parseFloat(totalAmount.toFixed(2)),
      transaction_count: transactions.length,
      avg_transaction: parseFloat((totalAmount / transactions.length).toFixed(2)),
      avg_daily: parseFloat(avgDaily.toFixed(2)),
      by_category: byCategory,
      top_merchants: Object.fromEntries(topMerchants),
    };
  }

  // 物品价值看板
  async getItemsDashboard(): Promise<any> {
    const items = await this.itemsRepository.find({
      relations: ['usage_logs'],
      order: { purchase_date: 'DESC' },
    });

    // 每次使用成本排行
    const costPerUse = items
      .filter(i => i.usage_count > 0)
      .map(i => ({
        id: i.id,
        name: i.name,
        purchase_price: i.purchase_price,
        usage_count: i.usage_count,
        cost_per_use: parseFloat(i.cost_per_use.toFixed(2)),
      }))
      .sort((a, b) => b.cost_per_use - a.cost_per_use)
      .slice(0, 10);

    // 最常使用物品
    const mostUsed = items
      .filter(i => i.usage_count > 0)
      .sort((a, b) => b.usage_count - a.usage_count)
      .slice(0, 10)
      .map(i => ({
        id: i.id,
        name: i.name,
        usage_count: i.usage_count,
        last_used: i.last_used,
        satisfaction: i.usage_logs
          ?.filter(l => l.satisfaction)
          .reduce((sum, l) => sum + l.satisfaction, 0) / i.usage_logs.filter(l => l.satisfaction).length || 0,
      }));

    // 闲置排行
    const idleItems = items
      .map(i => ({
        id: i.id,
        name: i.name,
        idle_days: i.idle_days,
        last_used: i.last_used,
        purchase_date: i.purchase_date,
      }))
      .sort((a, b) => b.idle_days - a.idle_days)
      .slice(0, 10);

    // 总资产价值
    const totalValue = items.reduce((sum, i) => sum + i.purchase_price, 0);

    return {
      total_items: items.length,
      total_value: parseFloat(totalValue.toFixed(2)),
      cost_per_use_ranking: costPerUse,
      most_used: mostUsed,
      idle_items: idleItems,
    };
  }

  // 关注清单看板
  async getWatchlistDashboard(): Promise<any> {
    const watchlists = await this.watchlistsRepository.find({
      relations: ['price_history'],
    });

    // 价格降幅排行
    const priceDrops = watchlists
      .filter(w => w.price_history && w.price_history.length > 1)
      .map(w => {
        const sorted = [...w.price_history].sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
        const current = sorted[0];
        const previous = sorted[1];
        const dropPercent = ((previous.price - current.price) / previous.price * 100).toFixed(2);
        return {
          id: w.id,
          name: w.name,
          current_price: current.price,
          previous_price: previous.price,
          drop_percent: parseFloat(dropPercent),
          target_price: w.target_price,
        };
      })
      .filter(w => parseFloat(w.drop_percent) > 0)
      .sort((a, b) => b.drop_percent - a.drop_percent)
      .slice(0, 10);

    // 价格达成目标的
    const targetAchieved = watchlists.filter(
      w => w.target_price && w.current_price && w.current_price <= w.target_price,
    );

    return {
      total_watched: watchlists.length,
      watching_count: watchlists.filter(w => w.status === 'watching').length,
      price_drops_count: priceDrops.length,
      target_achieved_count: targetAchieved.length,
      price_drops: priceDrops,
      target_achieved: targetAchieved,
    };
  }

  // 综合看板
  async getComprehensiveDashboard(): Promise<any> {
    const [homeCards, spending, items, watchlist] = await Promise.all([
      this.getHomeCards(),
      this.getSpendingDashboard(),
      this.getItemsDashboard(),
      this.getWatchlistDashboard(),
    ]);

    return {
      home_cards: homeCards,
      spending: spending,
      items: items,
      watchlist: watchlist,
    };
  }
}
