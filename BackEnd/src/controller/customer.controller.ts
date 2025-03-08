import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CustomerService } from '@app/service';
import { Customer } from '@app/entity';
import { CreateCustomerDto, UpdateCustomerDto } from '@app/dto';
import { Role } from '@app/decorator';
import { RolesGuard } from '@app/guard';

@ApiTags('Khách hàng')
@ApiBearerAuth()
@Controller('customers')
@UseGuards(RolesGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Role('USER', 'ADMIN')
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách khách hàng có phân trang' })
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
  @ApiResponse({ status: 200})
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search = '',
  ): Promise<any[]> {
    return this.customerService.findAll(page, limit,search);
  }
  @Role('USER', 'ADMIN')
  @Get('phone')
  @ApiOperation({ summary: 'Lấy khách hàng theo số điện thoại' })
  @ApiParam({
    name: 'số điện thoại',
    description: 'số điện thoại của khách hàng',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200})
  async findPhoneNumber(@Query('sdt') phoneNumber: string): Promise<any> {
    return this.customerService.findCustomerByPhone(phoneNumber);
  }
  @Role('USER', 'ADMIN')
  @Get(':id')
  @ApiOperation({ summary: 'Lấy khách hàng theo id' })
  @ApiParam({
    name: 'id',
    description: 'ID của khách hàng cần lấy',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200})
  async findOne(@Param('id') id: string): Promise<any> {
    return this.customerService.findOne(id);
  }

  @Role('USER', 'ADMIN')
  @Get('historyOrder/:id')
  @ApiOperation({ summary: 'Lịch sử đặt hàng theo id' })
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
  @ApiResponse({ status: 200})
  async getHistoryCustomerOrderById(
    @Param('id') id: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search = '',
  ): Promise<any> {
    return this.customerService.getCustomerOrderHistory(id, page, limit, search);
  }
  @Role('USER', 'ADMIN')
  @Post()
  @ApiOperation({ summary: 'Tạo mới khách hàng' })
  @ApiBody({type :CreateCustomerDto})
  @ApiResponse({ status: 201 })
  async create(@Body() customerDate: CreateCustomerDto): Promise<any> {
    return this.customerService.create(customerDate);
  }
  @Role('USER', 'ADMIN')
  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật khách hàng' })
  @ApiParam({
    name: 'id',
    description: 'id cần xóa',
    required: true,
    type: String,
  })
  @ApiBody({type :UpdateCustomerDto})
  @ApiResponse({ status: 200})
  async update(@Param('id') id: string, @Body() customer: UpdateCustomerDto): Promise<any> {
    return this.customerService.update(id, customer);
  }

}
