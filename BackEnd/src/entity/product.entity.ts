import { Entity, Column,PrimaryGeneratedColumn, ManyToOne ,OneToMany , JoinColumn } from 'typeorm';
import { Category } from './category.entity';
import { BaseEntity } from './base.entity';
import { ProductSub } from './productSub.entity';
@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  product_id: string;

  @Column({ length: 255 })
  product_name: string;

  @Column({ length: 255 , nullable:true})
  product_slug: string;

  @Column({ type: 'double' })
  product_price: number;

  @Column({ type: 'double' , nullable:true })
  product_base_price: number;

  @Column('simple-array' ,{ nullable: true})
  product_images: string[];

  @Column({ length: 255  , nullable:true})
  thumbnail : string;

  @Column({ length: 255  , nullable:true , default : "64GB"})
  size  : string;

  @Column({ type: 'text' ,nullable: true })
  promotion_note : string;

  @Column({ type: 'text' ,nullable: true})
  short_description : string;

  @Column({ type: 'text' ,nullable: true} )
  description : string;

  @ManyToOne(() => Category, category => category.products ,{ nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => ProductSub, productSub => productSub.product ,{ nullable: true })
  productSubs: ProductSub[];

  @Column({ length: 50, unique: true , nullable:true })
  barcode: string; 
}
