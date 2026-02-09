import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto, UpdateItemDto } from './dto/create-item.dto';
import { ItemStatus } from '@/entities';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  async findAll(
    @Query('skip') skip: number = 0,
    @Query('take') take: number = 20,
    @Query('status') status?: ItemStatus,
  ) {
    return this.itemsService.findAll(skip, take, status);
  }

  @Get('stats/categories')
  async getCategoryStats() {
    return this.itemsService.getCategoryStats();
  }

  @Get('stats/idle')
  async getIdleItems(@Query('days') days: number = 30) {
    const items = await this.itemsService.getIdleItems(days);
    return { data: items, total: items.length };
  }

  @Get('stats/most-used')
  async getMostUsedItems(@Query('limit') limit: number = 10) {
    const items = await this.itemsService.getMostUsedItems(limit);
    return { data: items, total: items.length };
  }

  @Get('stats/value-ranking')
  async getValueRanking() {
    return this.itemsService.getValueRanking();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.itemsService.remove(id);
    return { success: true };
  }
}
