import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Watchlist } from './watchlist.entity';

@Entity('price_histories')
export class PriceHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  watchlist_id: string;

  @Column()
  datetime: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  availability: string; // 'available', 'out_of_stock', 'discontinued'

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  shipping: number;

  @Column()
  vendor: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Watchlist, watchlist => watchlist.price_history, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'watchlist_id' })
  watchlist: Watchlist;
}
