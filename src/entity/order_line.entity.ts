import {
  AfterInsert,
  AfterUpdate,
  BaseEntity,
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
import { Order, OrderStatus } from './order.entity';

export enum OrderLineStatus {
  READY = 'ready',
  DOING = 'doing',
  DONE = 'done',
  CANCELLED = 'cancelled',
}

@Entity()
export class OrderLine extends BaseEntity {
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

  @Column('float', { nullable: true })
  amount: number;

  // @Column({
  //   type: 'enum',
  //   enum: OrderLineStatus,
  //   default: OrderLineStatus.READY,
  // })
  // status: OrderLineStatus;

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn()
  write_date: Date;

  @ManyToOne(() => Product, (product) => product.order_line)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.order_line, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @AfterInsert()
  @AfterUpdate()
  updateAmount() {
    this.amount = this.price * this.quantity;
    this.save();
  }
}
