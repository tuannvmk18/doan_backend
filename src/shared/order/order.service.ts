import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Order } from '../../entity/order.entity';

@Injectable()
export class OrderService {
  private readonly orderRepository: Repository<Order>;

  constructor(@InjectConnection() connection: Connection) {
    this.orderRepository = connection.getRepository(Order);
  }

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
