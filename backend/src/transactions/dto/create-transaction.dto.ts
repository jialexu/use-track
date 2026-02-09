import { IsString, IsNumber, IsOptional, IsDateString, IsArray } from 'class-validator';

export class CreateTransactionDto {
  @IsDateString()
  datetime: string;

  @IsString()
  @IsOptional()
  merchant?: string;

  @IsNumber()
  total_amount: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  payment_method?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  receipt_images?: string;

  @IsString()
  @IsOptional()
  invoice_no?: string;

  @IsNumber()
  @IsOptional()
  tax?: number;

  @IsNumber()
  @IsOptional()
  shipping_fee?: number;
}

export class UpdateTransactionDto {
  @IsDateString()
  @IsOptional()
  datetime?: string;

  @IsString()
  @IsOptional()
  merchant?: string;

  @IsNumber()
  @IsOptional()
  total_amount?: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  payment_method?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsArray()
  @IsOptional()
  tags?: string[];
}
