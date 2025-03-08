import { Entity, Column,PrimaryGeneratedColumn, ManyToOne , JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';

@Entity()
export class ProductSub extends BaseEntity {
  @PrimaryGeneratedColumn()
  product_sub_id: string;
  
  @ManyToOne(() => Product, product => product.productSubs )
  @JoinColumn({ name: 'productProductId' })
  product: Product;

  @Column({ length: 255 })
  product_name: string;

  @Column({ length: 255 })
  product_slug: string;

  @Column({ type: 'double' })
  product_price: number;

  @Column({ length: 255  , nullable:true , default : "Màu trắng"})
  color: string;

  @Column({ length: 255 , nullable:true , default : "64GB"})
  size: string;

  @Column({ length: 255 })
  product_images: string;

  @Column({ length: 255 })
  thumbnail : string;

  @Column({ length: 50, unique: true })
  barcode: string
}
