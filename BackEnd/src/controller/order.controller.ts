import { Controller, Get, Post, Put, Delete, Param, Body, BadRequestException, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from '@app/service';
import { Order } from '@app/entity';
import { CreateOrderDto } from '@app/dto';
import { Role } from '@app/decorator';
import { RolesGuard } from '@app/guard';

@ApiTags('Đơn hàng')
@ApiBearerAuth()
@Controller('orders')
@UseGuards(RolesGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Role('USER', 'ADMIN')
  @Get()
  @ApiOperation({ summary: 'Lấy tất cả đơn hàng' })
  @ApiResponse({ status: 200, type: [Order] })
  async findAll(): Promise<any[]> {
    return this.orderService.findAll();
  }
  @Role('ADMIN' , 'USER')
  @Get(':id')
  @ApiOperation({ summary: 'Lấy đơn hàng theo id' })
  @ApiResponse({ status: 200, type: Order })
  async findOne(@Param('id') id: number): Promise<any> {
    return this.orderService.findOne(id);
  }

  @Role('USER', 'ADMIN')
  @Post()
  @ApiOperation({ summary: 'Tạo mới 1 đơn hàng' })
  @ApiResponse({ status: 201, type: Order })
  async create(@Body() orderData: CreateOrderDto): Promise<any> {
    return this.orderService.createOrder(orderData);
  }

  // @Role('ADMIN')
  // @Put(':id')
  // @ApiOperation({ summary: 'Update an order' })
  // @ApiResponse({ status: 200, type: Order })
  // async update(@Param('id') id: number, @Body() order: Order): Promise<Order> {
  //   return this.orderService.update(id, order);
  // }

  // @Role('ADMIN')
  // @Delete(':id')
  // @ApiOperation({ summary: 'Xóa 1 đơn hàng' })
  // @ApiResponse({ status: 204 })
  // async remove(@Param('id') id: number): Promise<void> {
  //   return this.orderService.remove(id);
  // }
}
