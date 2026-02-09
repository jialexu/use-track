import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('home-cards')
  async getHomeCards() {
    return this.dashboardService.getHomeCards();
  }

  @Get('spending')
  async getSpendingDashboard(
    @Query('month') month?: number,
    @Query('year') year?: number,
  ) {
    return this.dashboardService.getSpendingDashboard(month, year);
  }

  @Get('items')
  async getItemsDashboard() {
    return this.dashboardService.getItemsDashboard();
  }

  @Get('watchlist')
  async getWatchlistDashboard() {
    return this.dashboardService.getWatchlistDashboard();
  }

  @Get()
  async getComprehensiveDashboard() {
    return this.dashboardService.getComprehensiveDashboard();
  }
}
