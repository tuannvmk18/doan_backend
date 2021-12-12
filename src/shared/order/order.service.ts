import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Order, OrderStatus } from '../../entity/order.entity';
import { OrderLine, OrderLineStatus } from '../../entity/order_line.entity';

@Injectable()
export class OrderService {
  private readonly orderRepository: Repository<Order>;
  private readonly orderLineRepository: Repository<OrderLine>;

  constructor(@InjectConnection() connection: Connection) {
    this.orderRepository = connection.getRepository(Order);
    this.orderLineRepository = connection.getRepository(OrderLine);
  }

  async create(createOrderDto: CreateOrderDto) {
    const newOrder = this.orderRepository.create(createOrderDto);
    return await this.orderRepository.save(newOrder);
  }

  async findAll(skip: number = undefined, take: number = undefined) {
    return await this.orderRepository.find({
      skip,
      take,
      relations: ['order_line'],
    });
  }

  async findOne(id: number) {
    return await this.orderRepository.findOne(id, {
      relations: ['order_line'],
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const updateOrder = this.orderRepository.create(updateOrderDto);
    updateOrder.id = id;
    return await this.orderRepository.save(updateOrderDto);
  }

  async remove(id: number) {
    return await this.orderRepository.softDelete(id);
  }

  async actionDone(id: number) {
    const order = await this.orderRepository.findOne(+id, {
      relations: ['order_line'],
    });

    // switch (order.status) {
    //   case OrderStatus.CANCELLED || OrderStatus.DRAFT:
    //     return null;
    //   case OrderStatus.PAID:
    //     return order;
    // }

    for (const order_line of order.order_line) {
      order_line.status = OrderLineStatus.DONE;
    }
    order.status = OrderStatus.PAID;
    return await this.orderRepository.save(order);
  }
}
