import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category extends BaseEntity {
  @ApiProperty({ description: 'id danh mục' })
  @PrimaryGeneratedColumn()
  category_id: string;

  @ApiProperty({ description: 'tên danh mục' })
  @Column({ length: 255 })
  category_name: string;

  @ApiProperty({ description: 'Mô tả danh mục' })
  @Column({ type: 'text', nullable:true })
  description: string;

  @ApiProperty({ description: 'đường dẫn slug SEO danh mục' })
  @Column({ unique: true })
  categorySlug: string;

  @OneToMany(() => Product, product => product.category)
  products: Product[];
}
