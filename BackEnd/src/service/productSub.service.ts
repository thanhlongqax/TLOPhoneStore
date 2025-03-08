import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSub ,Product } from '@app/entity';

@Injectable()
export class ProductSubService {
  constructor(
    @InjectRepository(ProductSub)
    private readonly productSubRepository: Repository<ProductSub>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(data: Partial<ProductSub>): Promise<ProductSub> {
    const productSub = this.productSubRepository.create(data);
    return this.productSubRepository.save(productSub);
  }

  async findAll(): Promise<ProductSub[]> {
    return this.productSubRepository.find({ relations: ['product'] });
  }

  async findOne(id: string): Promise<ProductSub> {
    return this.productSubRepository.findOne({ where: { product_sub_id: id }, relations: ['product'] });
  }

  async update(id: string, data: Partial<ProductSub>): Promise<ProductSub> {
    await this.productSubRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productSubRepository.delete(id);
  }

  async findProductByProductSub(id: string): Promise<Product> {
    const productSub = await this.findOne(id);
    return productSub.product;
  }
}
