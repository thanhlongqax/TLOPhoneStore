import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { ProductDto } from './product-order.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDto {

  @ApiProperty({ description: 'số lượng' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Sản phẩm' })
  @ValidateNested()
  @Type(() => ProductDto)
  product: ProductDto;
}
