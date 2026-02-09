import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { WatchlistsService } from './watchlists.service';
import { CreateWatchlistDto, UpdateWatchlistDto } from './dto/create-watchlist.dto';

@Controller('watchlists')
export class WatchlistsController {
  constructor(private readonly watchlistsService: WatchlistsService) {}

  @Post()
  async create(@Body() createWatchlistDto: CreateWatchlistDto) {
    return this.watchlistsService.create(createWatchlistDto);
  }

  @Get()
  async findAll(
    @Query('skip') skip: number = 0,
    @Query('take') take: number = 20,
    @Query('status') status?: string,
  ) {
    return this.watchlistsService.findAll(skip, take, status);
  }

  @Get('alerts/price-drops')
  async getPriceDropItems() {
    const items = await this.watchlistsService.getPriceDropItems();
    return { data: items, total: items.length };
  }

  @Get('alerts/recent-drops')
  async getRecentPriceDrops(@Query('days') days: number = 7) {
    return this.watchlistsService.getRecentPriceDrops(days);
  }

  @Get('stats/:id')
  async getPriceStats(
    @Param('id') id: string,
    @Query('days') days: number = 30,
  ) {
    return this.watchlistsService.getPriceStats(id, days);
  }

  @Post(':id/price-history')
  async addPriceHistory(
    @Param('id') id: string,
    @Body() body: { price: number; availability?: string; shipping?: number },
  ) {
    return this.watchlistsService.addPriceHistory(id, body.price, body.availability, body.shipping);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.watchlistsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWatchlistDto: UpdateWatchlistDto,
  ) {
    return this.watchlistsService.update(id, updateWatchlistDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.watchlistsService.remove(id);
    return { success: true };
  }
}
