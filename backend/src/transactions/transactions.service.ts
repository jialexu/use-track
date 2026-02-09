import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Transaction } from '@/entities';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const transaction = this.transactionsRepository.create(createTransactionDto);
    return this.transactionsRepository.save(transaction);
  }

  async findAll(
    skip: number = 0,
    take: number = 20,
    startDate?: Date,
    endDate?: Date,
  ): Promise<{ data: Transaction[]; total: number }> {
    const query = this.transactionsRepository.createQueryBuilder('t');

    if (startDate && endDate) {
      query.where('t.datetime BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const [data, total] = await query
      .orderBy('t.datetime', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return { data, total };
  }

  async findOne(id: string): Promise<Transaction> {
    return this.transactionsRepository.findOneBy({ id });
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction> {
    await this.transactionsRepository.update(id, updateTransactionDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.transactionsRepository.delete(id);
  }

  async getMonthlyStats(year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const transactions = await this.transactionsRepository.find({
      where: {
        datetime: Between(startDate, endDate),
      },
    });

    // 按分类统计
    const byCategory = {};
    let totalAmount = 0;

    transactions.forEach(t => {
      const category = t.category || 'Uncategorized';
      byCategory[category] = (byCategory[category] || 0) + t.total_amount;
      totalAmount += t.total_amount;
    });

    // 按商家统计
    const byMerchant = {};
    transactions.forEach(t => {
      const merchant = t.merchant || 'Unknown';
      byMerchant[merchant] = (byMerchant[merchant] || 0) + t.total_amount;
    });

    return {
      totalAmount,
      transactionCount: transactions.length,
      byCategory,
      byMerchant,
      avgTransaction: totalAmount / transactions.length || 0,
    };
  }

  async getCategoryStats(): Promise<any> {
    const result = await this.transactionsRepository
      .createQueryBuilder('t')
      .select('t.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .addSelect('SUM(t.total_amount)', 'total')
      .where('t.category IS NOT NULL')
      .groupBy('t.category')
      .orderBy('total', 'DESC')
      .getRawMany();

    return result;
  }

  async getMerchantsStats(): Promise<any> {
    const result = await this.transactionsRepository
      .createQueryBuilder('t')
      .select('t.merchant', 'merchant')
      .addSelect('COUNT(*)', 'count')
      .addSelect('SUM(t.total_amount)', 'total')
      .where('t.merchant IS NOT NULL')
      .groupBy('t.merchant')
      .orderBy('total', 'DESC')
      .take(10)
      .getRawMany();

    return result;
  }
}
