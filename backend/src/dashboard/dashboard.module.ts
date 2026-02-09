import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction, Item, Watchlist, UsageLog } from '@/entities';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Item, Watchlist, UsageLog])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
