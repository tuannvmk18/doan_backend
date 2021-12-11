import { OrderStatus } from '../../../entity/order.entity';
import { IsNumber } from 'class-validator';

export class CreateOrderDto {
  order_line: {
    product_id: number;
    price: number;
    quantity: number;
    amount: number;
  }[];

  @IsNumber()
  tax: number;

  @IsNumber()
  total: number;
}
