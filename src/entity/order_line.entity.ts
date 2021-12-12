import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';
import { Exclude } from 'class-transformer';

export enum OrderLineStatus {
  READY = 'ready',
  DOING = 'doing',
  DONE = 'done',
  CANCELLED = 'cancelled',
}

@Entity()
export class OrderLine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column({ nullable: true })
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

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn()
  write_date: Date;

  @DeleteDateColumn()
  delete_date: Date;

  @ManyToOne(() => Product, (product) => product.order_line)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.order_line, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
