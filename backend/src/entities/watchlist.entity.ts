import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { PriceHistory } from './price-history.entity';

@Entity('watchlists')
export class Watchlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  target_price: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  current_price: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column()
  vendor: string;

  @Column({ default: 0 })
  priority: number; // 0-10, higher is more important

  @Column({ default: 'watching' })
  status: string; // watching, purchased, cancelled, out_of_stock

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => PriceHistory, history => history.watchlist)
  price_history: PriceHistory[];
}
