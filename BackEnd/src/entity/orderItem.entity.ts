import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { BaseEntity } from '@app/entity/base.entity';

@Entity()
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  order_item_id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'double' })
  price: number;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @ManyToOne(() => Order, order => order.orderItems)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, product => product.product_id)
  product: Product;
  @BeforeInsert()
  @BeforeUpdate()
  async calculatePrice() {
    if (this.product && this.quantity) {
      this.price = this.product.product_price * this.quantity;
    }
  }
}
