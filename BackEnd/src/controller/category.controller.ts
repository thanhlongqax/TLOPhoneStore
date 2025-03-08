import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CategoryService } from '@app/service';
import { Category } from '@app/entity';
import { RolesGuard } from '@app/guard';
import { Role } from '@app/decorator';

@ApiTags('Danh mục')
@ApiBearerAuth()
@Controller('categories')
@UseGuards(RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Role('USER', 'ADMIN')
  @Get()
  @ApiOperation({ summary: 'Lấy tất cả danh mục có phân trang' })
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
  @ApiResponse({ status: 200, type: [Category] })
  async findAllByPage(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search = '',
  ): Promise<any> {
    return this.categoryService.findAllByPage(page , limit , search);
  }

  @Role('USER', 'ADMIN')
  @Get(':id')
  @ApiOperation({ summary: 'Lấy danh mục theo id' })
  @ApiParam({
    name: 'id',
    description: 'ID của danh mục cần lấy',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200, type: Category })
  async findOne(@Param('id') id: string): Promise<any> {
    return this.categoryService.findOne(id);
  }
  @Role('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Tạo mới danh mục' })
  @ApiBody({type: Category})
  @ApiResponse({ status: 201, type: Category })
  async create(@Body() category: Category): Promise<any> {
    return this.categoryService.create(category);
  }

  @Role('ADMIN')
  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật danh mục' })
  @ApiParam({
    name: 'id',
    description: 'ID của danh mục cần lấy',
    required: true,
    type: String,
  })
  @ApiBody({type: Category})
  @ApiResponse({ status: 200, type: Category })
  async update(@Param('id') id: string, @Body() category: Category): Promise<any> {
    return this.categoryService.update(id, category);
  }

  @Role('ADMIN')
  @Delete(':id')
  @ApiOperation({ summary: 'Xóa danh mục' })
  @ApiParam({
    name: 'id',
    description: 'ID của danh mục cần xóa',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 204 })
  async remove(@Param('id') id: string): Promise<any> {
    return this.categoryService.remove(id);
  }
}
