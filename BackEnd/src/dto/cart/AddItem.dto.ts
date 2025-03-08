import { ApiProperty } from '@nestjs/swagger';

export class AddItemDto {
  @ApiProperty({ description: 'Id sản phẩm' })
  productId?: string;
  @ApiProperty({ description: 'số lượng' })
  quantity?: number;
}
