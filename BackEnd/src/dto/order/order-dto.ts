import { IsArray, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from './create-order-item.dto';

export class OrderDto {
  @IsOptional()
  @IsDate()
  order_date?: Date;

  @IsOptional()
  @IsArray()
  @Type(() => OrderItemDto)
  orderItems?: OrderItemDto[];


}
