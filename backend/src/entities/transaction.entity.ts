import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Item } from './item.entity';
import { PriceHistory } from './price-history.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  datetime: Date;

  @Column({ nullable: true })
  merchant: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total_amount: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ nullable: true })
  payment_method: string;

  @Column({ nullable: true })
  category: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column({ nullable: true })
  receipt_images: string;

  @Column({ nullable: true })
  invoice_no: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  tax: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  shipping_fee: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Item, item => item.transaction)
  items: Item[];
}
