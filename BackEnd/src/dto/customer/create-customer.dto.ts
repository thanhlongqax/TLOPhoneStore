import { IsString, IsEmail, IsOptional, IsPhoneNumber, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Họ và tên khách hàng' })
  @IsString()
  @MaxLength(255)
  customer_name?: string;

  @ApiProperty({ description: 'Email khách hàng' })
  @IsEmail()
  @IsOptional()
  @MaxLength(255)
  customer_email?: string;

  @ApiProperty({ description: 'Số điện thoại khách hàng' })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  customer_phone: string;

  @ApiProperty({ description: 'Địa chỉ khách hàng' })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  customer_address?: string;
}
