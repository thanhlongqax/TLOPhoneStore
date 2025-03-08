import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product ,ProductSub } from '@app/entity';
import { ApiResponseDto, CreateProductDTO, UpdateProductDto } from '@app/dto';
import { CategoryService } from '@app/service/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductSub)
    private readonly productSubRepository: Repository<ProductSub>,
    private readonly categoryService: CategoryService,
  ) {}

  async createProduct(createProductDTO: CreateProductDTO): Promise<any> {
    try {
      const category = await this.categoryService.findOne(createProductDTO.categoryId);
      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const productData = {
        ...createProductDTO,
        category: category,
      };

      const product = this.productRepository.create(productData);
      await this.productRepository.save(product);

      return new ApiResponseDto(200, true, 'Tạo sản phẩm thành công.');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(page: number = 1, limit: number = 10 ,search: string): Promise<any> {
    try {
      const query = this.productRepository.createQueryBuilder('product');

      if (search) {
        query.where('product.product_name LIKE :search', { search: `%${search}%` });
      }

      query.skip((page - 1) * limit).take(limit);

      query.leftJoinAndSelect('product.productSubs', 'productSubs');

      query.leftJoinAndSelect('product.category', 'category');

      const [data, total] = await query.getManyAndCount();

      return {data , total}
    }catch (error){
      throw new NotFoundException(error);
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      let Product = await this.productRepository.findOne({ where: { product_id: id }, relations: ['productSubs','category'] });
      return new ApiResponseDto(200, true, 'Lấy 1 sản phẩm thành công .' ,Product );
    }catch (error){
      throw new NotFoundException(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<any>    {
    try {
      let category = null;
      if (updateProductDto.categoryId) {
        category = await this.categoryService.findOne(updateProductDto.categoryId);
        if (!category) {
          throw new Error('Không tìm thấy danh mục');
        }
      }
      const product = await this.productRepository.findOneBy({product_id : id});
      if (!product) {
        throw new Error('Không tìm thấy sản phẩm');
      }
      const productDTO = new Product();
      delete updateProductDto.categoryId;
      Object.assign(productDTO, updateProductDto);
      if (category) {
        productDTO.category = category;
      }
      await this.productRepository.update(id , productDTO);
      return new ApiResponseDto(200, true, 'Cập nhật sản phẩm thành công .');
    }catch (error){
      throw  new NotFoundException(error);
    }
  }

  async remove(id: string): Promise<any> {
    try {
      await this.productSubRepository.delete({ product: { product_id: id } });
      await this.productRepository.delete(id);
      return new ApiResponseDto(200, true, 'Xóa sản phẩm thành công .' ,);
    }catch (error){
      throw new BadRequestException(error);
    }
  }

  async saveProductData(productData: any) {
    try {
      const category = await this.categoryService.createCategoryBySlug(productData.categorySlug);
      const newProduct = new Product();
      newProduct.product_id = productData.product_id;
      newProduct.product_name = productData.product_name;
      newProduct.product_images = Array.isArray(productData.product_images) ? productData.product_images : [productData.product_images];
      newProduct.product_slug = productData.product_slug;

      newProduct.barcode = productData.barcode;
      newProduct.thumbnail = productData.thumbnail;
      newProduct.product_price = productData.product_price;
      newProduct.product_base_price = productData.product_base_price
      newProduct.description = productData.description;
      newProduct.promotion_note = productData.promotion_note;
      newProduct.short_description = productData.short_description;
      newProduct.size = productData.size;
      newProduct.category = category;
      const savedProduct = await this.productRepository.save(newProduct);
      if (productData.productSubs && productData.productSubs.length > 0) {
        for (const sub of productData.productSubs) {
          const productSub = new ProductSub();
          productSub.product_sub_id = productData.product_sub_id;
          productSub.product_name = sub.product_name;
          productSub.product_images = Array.isArray(sub.product_images) ? sub.product_images : [sub.product_images];
          productSub.product_price = sub.product_price;
          productSub.product_slug = sub.product_slug;
          productSub.barcode = sub.barcode;
          productSub.thumbnail = sub.thumbnail;
          productSub.color = sub.color;
          productSub.size = sub.size;
          productSub.product = savedProduct;

          await this.productSubRepository.save(productSub);
        }
      }
      return new ApiResponseDto(200, true, 'Thêm dữ liệu về sản phẩm thành công .' ,);
    }catch (error){
      throw new BadRequestException(error)
    }
  }
}
