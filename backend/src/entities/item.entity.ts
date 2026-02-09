import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Transaction } from './transaction.entity';
import { UsageLog } from './usage-log.entity';

export enum ItemStatus {
  ACTIVE = 'active',
  SOLD = 'sold',
  GIFTED = 'gifted',
  BROKEN = 'broken',
  LOST = 'lost',
}

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  model: string;

  @Column({ nullable: true })
  category: string;

  @Column()
  purchase_date: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  purchase_price: number;

  @Column({ default: 1 })
  quantity: number;

  @Column({ nullable: true })
  warranty_end: Date;

  @Column({ nullable: true })
  return_deadline: Date;

  @Column({ nullable: true })
  serial_no: string;

  @Column({ nullable: true })
  storage_location: string;

  @Column({
    type: 'enum',
    enum: ItemStatus,
    default: ItemStatus.ACTIVE,
  })
  status: ItemStatus;

  @Column({ nullable: true })
  transaction_id: string;

  @ManyToOne(() => Transaction, transaction => transaction.items, { nullable: true })
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction;

  @OneToMany(() => UsageLog, log => log.item)
  usage_logs: UsageLog[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // 计算属性：使用次数
  get usage_count(): number {
    return this.usage_logs?.length || 0;
  }

  // 计算属性：最后使用时间
  get last_used(): Date | null {
    if (!this.usage_logs || this.usage_logs.length === 0) return null;
    return this.usage_logs.reduce((latest, log) => {
      return new Date(log.date) > new Date(latest.date) ? log : latest;
    }).date;
  }

  // 计算属性：闲置天数
  get idle_days(): number {
    if (!this.last_used) {
      return Math.floor((Date.now() - new Date(this.purchase_date).getTime()) / (1000 * 60 * 60 * 24));
    }
    return Math.floor((Date.now() - new Date(this.last_used).getTime()) / (1000 * 60 * 60 * 24));
  }

  // 计算属性：每次使用成本
  get cost_per_use(): number {
    return this.usage_count > 0 ? this.purchase_price / this.usage_count : this.purchase_price;
  }
}
