import { IsArray, IsOptional, IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerOrderDto {

  @ApiProperty({ description: 'Số điện thoại' })
  @IsString()
  customer_phone: string;

  @ApiProperty({ description: 'Họ và tên' })
  @IsOptional()
  @IsString()
  customer_name?:string;

  @ApiProperty({ description: 'Địa chỉ khách hàng' })
  @IsOptional()
  @IsString()
  customer_address?:string;
}
