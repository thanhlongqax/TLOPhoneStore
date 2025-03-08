import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Order } from './order.entity';

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  customer_id: string;

  @Column({ length: 255 , nullable: true })
  customer_name: string;

  @Column({ length: 255, unique: true , nullable:true })
  customer_email: string;

  @Column({ length: 255 , unique: true })
  customer_phone: string;

  @Column({ length: 255  , nullable: true})
  customer_address: string;

  @Column({ length: 255  , nullable: true})
  membership_level: string;

  @Column({ nullable: true})
  points_balance: number;

  @Column({ nullable: true})
  last_purchase_date: Date;

  @Column({ nullable: true})
  total_spent: number;

  @OneToMany(() => Order, order => order.customer , {nullable : true})
  orders: Order[];

}
