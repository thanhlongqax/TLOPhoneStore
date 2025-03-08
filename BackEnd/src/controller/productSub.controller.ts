import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductSubService } from '@app/service';
import { ProductSub } from '@app/entity';
import { Role } from '@app/decorator';
import { RolesGuard } from '@app/guard';

// @ApiTags('product-subs')
@Controller('product-subs')
@UseGuards(RolesGuard)
export class ProductSubController {
  constructor(private readonly productSubService: ProductSubService) {}
  // @Role('USER', 'ADMIN')
  // @Get()
  // @ApiOperation({
  //   summary: 'Tìm tất cả sản phẩm phụ',
  // })
  // @ApiResponse({ status: 200, type: [ProductSub] })
  // async findAll(): Promise<ProductSub[]> {
  //   return this.productSubService.findAll();
  // }
  // @Role('USER', 'ADMIN')
  // @Get(':id')
  // @ApiOperation({ summary: 'Lấy sản phẩm phụ theo id' })
  // @ApiResponse({ status: 200, type: ProductSub })
  // async findOne(@Param('id') id: string): Promise<ProductSub> {
  //   return this.productSubService.findOne(id);
  // }
  // @Role('ADMIN')
  // @Post()
  // @ApiOperation({ summary: 'Create a new product sub' })
  // @ApiResponse({ status: 201, type: ProductSub })
  // async create(@Body() productSub: ProductSub): Promise<ProductSub> {
  //   return this.productSubService.create(productSub);
  // }
  // @Role('ADMIN')
  // @Put(':id')
  // @ApiOperation({ summary: 'Update a product sub' })
  // @ApiResponse({ status: 200, type: ProductSub })
  // async update(@Param('id') id: string, @Body() productSub: ProductSub): Promise<ProductSub> {
  //   return this.productSubService.update(id, productSub);
  // }
  // @Role('ADMIN')
  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete a product sub' })
  // @ApiResponse({ status: 204 })
  // async remove(@Param('id') id: string): Promise<void> {
  //   return this.productSubService.remove(id);
  // }
}
