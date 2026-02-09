import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageLog } from '@/entities';
import { UsageLogsService } from './usage-logs.service';
import { UsageLogsController } from './usage-logs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsageLog])],
  controllers: [UsageLogsController],
  providers: [UsageLogsService],
  exports: [UsageLogsService],
})
export class UsageLogsModule {}
