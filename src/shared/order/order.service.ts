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

  async create(createOrderDto: CreateOrderDto) {
    const newOrder = this.orderRepository.create(createOrderDto);
    return await this.orderRepository.save(newOrder);
  }

  async findAll(skip: number = undefined, take: number = undefined) {
    return await this.orderRepository.find({
      skip,
      take,
      // relations: ['order_line', 'order_line.product'],
      relations: ['order_line'],
    });
  }

  async findOne(id: number) {
    return await this.orderRepository.findOne(id);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return await this.orderRepository.update(id, updateOrderDto);
  }

  async remove(id: number) {
    return await this.orderRepository.softDelete(id);
  }
}
