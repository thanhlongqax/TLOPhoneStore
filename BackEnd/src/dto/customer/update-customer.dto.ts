import { IsString, IsEmail, IsOptional, MaxLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerDto {

  @ApiProperty({ description: 'Họ và tên' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  customer_name?: string;

  @ApiProperty({ description: 'email' })
  @IsEmail()
  @IsOptional()
  @MaxLength(255)
  customer_email?: string;

  @ApiProperty({ description: 'SDT' })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  customer_phone?: string;

  @ApiProperty({ description: 'Địa chỉ' })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  customer_address?: string;

  @ApiProperty({ description: 'Mức độ thành viên' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  membership_level?:string;

  @ApiProperty({ description: 'điểm thành viên' })
  @IsNumber()
  @IsOptional()
  points_balance?:number
}
