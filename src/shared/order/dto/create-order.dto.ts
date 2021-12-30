import { OrderStatus } from '../../../entity/order.entity';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderLineDto {
  @IsInt()
  product_id: number;

  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @ValidateNested({ each: true })
  @Type(() => CreateOrderLineDto)
  order_line: CreateOrderLineDto[];

  @IsEnum(OrderStatus)
  @IsOptional()
  status: OrderStatus;

  @IsNumber()
  tax: number;

  @IsInt()
  table_id: number;
}
