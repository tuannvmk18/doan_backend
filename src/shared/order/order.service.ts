import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Order, OrderStatus } from '../../entity/order.entity';
import { OrderLine } from '../../entity/order_line.entity';
import { Product } from '../../entity/product.entity';
import { Table, TableStatus } from '../../entity/table.entity';

@Injectable()
export class OrderService {
  private readonly orderRepository: Repository<Order>;
  private readonly orderLineRepository: Repository<OrderLine>;
  private readonly productRepository: Repository<Product>;
  private readonly tableRepository: Repository<Table>;

  constructor(@InjectConnection() connection: Connection) {
    this.orderRepository = connection.getRepository(Order);
    this.productRepository = connection.getRepository(Product);
    this.orderLineRepository = connection.getRepository(OrderLine);
    this.tableRepository = connection.getRepository(Table);
  }

  async create(createOrderDto: CreateOrderDto) {
    const newOrder = this.orderRepository.create(createOrderDto);

    let tmpTotal = 0;
    for (const order_line of newOrder.order_line) {
      tmpTotal += order_line.quantity * order_line.price;
    }
    newOrder.total = (tmpTotal * newOrder.tax) / 100;

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
    const order = await this.orderRepository.findOne(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (
      order.status == OrderStatus.PAID ||
      order.status == OrderStatus.CANCELLED
    ) {
      throw new HttpException(
        'Can not update this order because order status',
        200,
      );
    }

    const updateOrder = this.orderRepository.create(updateOrderDto);
    updateOrder.id = id;

    if (
      order.status == OrderStatus.DRAFT &&
      updateOrder.status == OrderStatus.DOING
    ) {
      await this.updateTableStatus(updateOrder.table_id, TableStatus.ONLINE);
    }

    if (
      order.status == OrderStatus.DOING &&
      updateOrder.status == OrderStatus.CANCELLED
    ) {
      await this.updateTableStatus(order.table_id, TableStatus.OFFLINE);
    }

    if (
      order.table_id != updateOrder.table_id &&
      updateOrder.status == OrderStatus.DOING
    ) {
      await this.updateTableStatus(order.table_id, TableStatus.OFFLINE);
      await this.updateTableStatus(order.table_id, TableStatus.ONLINE);
    }

    let tmpTotal = 0;
    for (const order_line of updateOrder.order_line) {
      tmpTotal += order_line.quantity * order_line.price;
    }
    updateOrder.total = tmpTotal;

    return await this.orderRepository.save(updateOrderDto);
  }

  async remove(id: number) {
    const order = await this.orderRepository.findOneOrFail(id);
    await this.updateTableStatus(order.table_id, TableStatus.OFFLINE);
    return await this.orderRepository.delete(id);
  }

  async actionDone(id: number) {
    const order = await this.orderRepository.findOne(+id, {
      relations: ['order_line'],
    });

    switch (order.status) {
      case OrderStatus.CANCELLED || OrderStatus.DRAFT:
        throw new HttpException('Order status must be doing', 200);
      case OrderStatus.PAID:
        return order;
    }
    order.status = OrderStatus.PAID;
    await this.updateTableStatus(order.table_id, TableStatus.OFFLINE);
    return await this.orderRepository.save(order);
  }

  async updateTableStatus(tableId: number, table_status: TableStatus) {
    const order_table = await this.tableRepository.findOneOrFail(tableId);
    order_table.status = table_status;
    await this.tableRepository.update(tableId, order_table);
  }
}
