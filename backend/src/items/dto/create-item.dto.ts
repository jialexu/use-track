import { IsString, IsNumber, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { ItemStatus } from '@/entities';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsDateString()
  purchase_date: string;

  @IsNumber()
  purchase_price: number;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsDateString()
  @IsOptional()
  warranty_end?: string;

  @IsDateString()
  @IsOptional()
  return_deadline?: string;

  @IsString()
  @IsOptional()
  serial_no?: string;

  @IsString()
  @IsOptional()
  storage_location?: string;

  @IsString()
  @IsOptional()
  transaction_id?: string;
}

export class UpdateItemDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsEnum(ItemStatus)
  @IsOptional()
  status?: ItemStatus;

  @IsString()
  @IsOptional()
  storage_location?: string;
}
