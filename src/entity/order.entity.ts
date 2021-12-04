import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderLine } from './order_line.entity';

export enum OrderStatus {
  DRAFT = 'draft',
  DOING = 'doing',
  PAID = 'paid',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  total: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.DRAFT,
  })
  status: OrderStatus;

  @Column('float')
  tax: number;

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn()
  write_date: Date;

  @DeleteDateColumn()
  delete_date: Date;

  @OneToMany(() => OrderLine, (order_line) => order_line.order, {
    cascade: true,
  })
  order_line!: OrderLine[];
}
