import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { UsageLogsService } from './usage-logs.service';
import { CreateUsageLogDto, UpdateUsageLogDto } from './dto/create-usage-log.dto';

@Controller('usage-logs')
export class UsageLogsController {
  constructor(private readonly usageLogsService: UsageLogsService) {}

  @Post()
  async create(@Body() createUsageLogDto: CreateUsageLogDto) {
    return this.usageLogsService.create(createUsageLogDto);
  }

  @Post('quick/:itemId')
  async quickLog(
    @Param('itemId') itemId: string,
    @Query('count') count: number = 1,
    @Query('duration') duration?: number,
  ) {
    return this.usageLogsService.quickLog(itemId, count, duration);
  }

  @Get('item/:itemId')
  async findAll(
    @Param('itemId') itemId: string,
    @Query('skip') skip: number = 0,
    @Query('take') take: number = 20,
  ) {
    return this.usageLogsService.findAll(itemId, skip, take);
  }

  @Get('stats/trend/:itemId')
  async getUsageTrend(
    @Param('itemId') itemId: string,
    @Query('days') days: number = 30,
  ) {
    return this.usageLogsService.getUsageTrend(itemId, days);
  }

  @Get('stats/:itemId')
  async getUsageStats(
    @Param('itemId') itemId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.usageLogsService.getUsageStats(
      itemId,
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usageLogsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUsageLogDto: UpdateUsageLogDto,
  ) {
    return this.usageLogsService.update(id, updateUsageLogDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usageLogsService.remove(id);
    return { success: true };
  }
}
