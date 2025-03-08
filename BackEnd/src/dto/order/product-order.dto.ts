import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ProductDto {

  @ApiProperty({ description: 'id sản phẩm' })
  @IsString()
  product_id?: string;
}
