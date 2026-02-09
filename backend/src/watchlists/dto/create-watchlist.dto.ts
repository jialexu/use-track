import { IsString, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class CreateWatchlistDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;

  @IsNumber()
  @IsOptional()
  target_price?: number;

  @IsNumber()
  @IsOptional()
  current_price?: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  vendor: string;

  @IsNumber()
  @IsOptional()
  priority?: number;

  @IsString()
  @IsOptional()
  status?: string;
}

export class UpdateWatchlistDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  current_price?: number;

  @IsNumber()
  @IsOptional()
  target_price?: number;

  @IsNumber()
  @IsOptional()
  priority?: number;

  @IsString()
  @IsOptional()
  status?: string;
}
