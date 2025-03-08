import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany , JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Customer } from './customer.entity';
import { OrderItem } from './orderItem.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column({ type: 'date' })
  order_date: Date;

  @Column({ type: 'double' })
  total_price: number;

  @Column({ type: 'double' })
  amount_paid: number;

  @Column({ type: 'double' })
  refund_amount: number;

  @ManyToOne(() => Customer, customer => customer.orders ,{ nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  orderItems: OrderItem[];

}
