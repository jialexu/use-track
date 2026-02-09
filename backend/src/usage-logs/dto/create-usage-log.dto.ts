import { IsString, IsNumber, IsOptional, IsDateString, IsArray } from 'class-validator';

export class CreateUsageLogDto {
  @IsString()
  item_id: string;

  @IsDateString()
  date: string;

  @IsNumber()
  @IsOptional()
  duration_minutes?: number;

  @IsNumber()
  @IsOptional()
  count?: number;

  @IsArray()
  @IsOptional()
  context_tags?: string[];

  @IsNumber()
  @IsOptional()
  satisfaction?: number; // 1-5

  @IsString()
  @IsOptional()
  note?: string;
}

export class UpdateUsageLogDto {
  @IsNumber()
  @IsOptional()
  duration_minutes?: number;

  @IsNumber()
  @IsOptional()
  count?: number;

  @IsNumber()
  @IsOptional()
  satisfaction?: number;

  @IsString()
  @IsOptional()
  note?: string;
}
