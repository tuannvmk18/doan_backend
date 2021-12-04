import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';

export enum OrderLineStatus {
  READY = 'ready',
  DOING = 'doing',
  DONE = 'done',
}

@Entity()
export class OrderLine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column()
  order_id: number;

  @Column()
  quantity: number;

  @Column('float')
  price: number;

  @Column('float')
  amount: number;

  @Column({
    type: 'enum',
    enum: OrderLineStatus,
    default: OrderLineStatus.READY,
  })
  status: OrderLineStatus;

  @ManyToOne(() => Product, (product) => product.order_line)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.order_line)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
