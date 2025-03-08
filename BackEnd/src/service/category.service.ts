import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Category } from '@app/entity/category.entity';
import { Product } from '@app/entity/product.entity';
import { ApiResponseDto } from '@app/dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(data: Partial<Category>): Promise<any> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { categorySlug: data.categorySlug },
    });

    if (existingCategory) {
      return new ApiResponseDto(400, false, 'Slug đã tồn tại.');
    }
    const category = this.categoryRepository.create(data);
    await this.categoryRepository.save(category);
    return new ApiResponseDto(200, true, 'Tạo danh mục thành công.');

  }

  async findAll(): Promise<any> {
    const categories = await this.categoryRepository.find();
    return new ApiResponseDto(200, true, 'Lấy danh sách danh mục thành công .' ,categories );
  }
  async findAllByPage(page: number = 1, limit: number = 10 ,search: string): Promise<any> {
    const query = this.categoryRepository.createQueryBuilder('category');
    if (search) {
      query.where('category.category_name LIKE :search', { search: `%${search}%` });
    }
    query.skip((page - 1) * limit).take(limit);

    query.leftJoinAndSelect('category.products', 'product');

    const [data, total] = await query.getManyAndCount();

    return {data , total}
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOne({ where: { category_id: id }, relations: ['products'] });
  }
  async findOneByWhere(where: string): Promise<Category> {
    return this.categoryRepository.findOne({ where: { categorySlug: where } });
  }
  async update(id: string, data: Partial<Category>): Promise<any> {
    await this.categoryRepository.update(id, data);
    return new ApiResponseDto(200, true, 'Cập nhật danh mục thành công.');
  }

  async remove(id: string): Promise<any> {
    await this.categoryRepository.delete(id);
    return new ApiResponseDto(200, true, 'Xóa danh mục thành công.');
  }

  async findOneBySlug(categorySlug: string): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { categorySlug } });
  }

  async createCategoryBySlug(categorySlug: string): Promise<any> {
    let category = await this.findOneBySlug(categorySlug);

    if (!category) {
      category = this.categoryRepository.create({
        categorySlug,
        category_name: `${categorySlug}`,
      });

      category = await this.categoryRepository.save(category);
    }

    return category;
  }

}
