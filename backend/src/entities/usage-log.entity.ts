import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity('usage_logs')
export class UsageLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  item_id: string;

  @Column()
  date: Date;

  @Column({ nullable: true })
  duration_minutes: number;

  @Column({ default: 1 })
  count: number;

  @Column('simple-array', { nullable: true })
  context_tags: string[];

  @Column('int', { nullable: true })
  satisfaction: number; // 1-5 rating

  @Column({ type: 'text', nullable: true })
  note: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Item, item => item.usage_logs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'item_id' })
  item: Item;
}
