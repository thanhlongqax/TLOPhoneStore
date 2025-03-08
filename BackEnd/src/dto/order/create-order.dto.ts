import { IsOptional } from 'class-validator';
import { OrderDto } from './order-dto';
import { IsString } from 'class-validator';
import { CustomerOrderDto } from './customer-order.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'Họ và tên' })
  @IsOptional()
  order: OrderDto;

  @ApiProperty({ description: 'Khách hàng' })
  @IsOptional()
  customer : CustomerOrderDto

  @ApiProperty({ description: 'Tiền khách hàng đưa' })
  amount_paid?: number;

  @ApiProperty({ description: 'Tiền hoàn lại cho khách' })
  refund_amount?: number;


}
