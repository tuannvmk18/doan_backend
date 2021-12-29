import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TableStatus {
  OFFLINE = 'offline',
  ONLINE = 'online',
}

@Entity('table')
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column({
    type: 'enum',
    enum: TableStatus,
    default: TableStatus.OFFLINE,
  })
  status: TableStatus;
}
