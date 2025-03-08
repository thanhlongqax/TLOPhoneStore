import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  OnModuleInit
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProductService } from '@app/service';
import { Product } from '@app/entity';
import { CreateProductDTO, UpdateProductDto } from '@app/dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Role } from '@app/decorator';
import { RolesGuard } from '@app/guard';

@ApiTags('Sản phẩm')
@ApiBearerAuth()
@Controller('products')
@UseGuards(RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Role('USER', 'ADMIN')
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Số trang',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Số phần tử giới hạn trên 1 trang',
  })
  @ApiQuery({
    name: 'search',
    required: true,
    type: String,
    description: 'Từ khóa tìm kiếm',
  })
  @ApiResponse({ status: 200, type: [Product] })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search = '',
  ) {
    return this.productService.findAll(page, limit,search);
  }

  @Role('USER', 'ADMIN')
  @Get(':id')
  @ApiOperation({ summary: 'Lấy sản phẩm theo id' })
  @ApiParam({
    name: 'id',
    description: 'id của sản phẩm cần lấy',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200, type: Product })
  async findOne(@Param('id') id: string): Promise<any> {
    return this.productService.findOne(id);
  }

  @Role('ADMIN')
  @Post()
  @ApiOperation({
    summary: 'Tạo mới 1 sản phẩn',
    description: 'Admin.'
  })
  @ApiBody({type : CreateProductDTO})
  @ApiResponse({ status: 201, type: Product })
  async create(@Body()  createProductDto: CreateProductDTO): Promise<any> {
    return this.productService.createProduct(createProductDto);
  }

  @Role('ADMIN')
  @Put(':id')
  @ApiOperation({
    summary: 'Cập nhật 1 sản phẩm',
    description: 'Admin.'
  })
  @ApiParam({
    name: 'id',
    description: 'id của sản phẩm cần xóa',
    required: true,
    type: String,
  })
  @ApiBody({type : UpdateProductDto})
  @ApiResponse({ status: 200, type: Product })
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<any> {
    return this.productService.update(id, updateProductDto);
  }
  @Role('ADMIN')
  @Delete(':id')
  @ApiOperation({ summary: 'Xóa sản phẩm' })
  @ApiParam({
    name: 'id',
    description: 'id của sản phẩm cần xóa',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 204 })
  async remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(id);
  }
  @Role('ADMIN')
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Cập nhật sản phẩm theo file JSON',
    type: 'string',
    required: true,
  })
  @ApiOperation({
    summary: 'Upload sản phẩm từ file JSON',
    description: 'API này cho phép upload file JSON chứa thông tin sản phẩm. Chỉ ADMIN có quyền truy cập.',
  })
  @ApiResponse({
    status: 200,
    description: 'Upload file thành công và các sản phẩm đã được cập nhật.',
    type: [Object],
  })
  @ApiResponse({
    status: 400,
    description: 'Lỗi nếu file không hợp lệ hoặc dữ liệu không đúng định dạng.',
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập.',
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File ) {
    const products: any[] = JSON.parse(file.buffer.toString());

    const savedProducts = [];
    for (const productData of products) {
      const savedProduct = await this.productService.saveProductData(productData);
      savedProducts.push(savedProduct);
    }
  }


}
