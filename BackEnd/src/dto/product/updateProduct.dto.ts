import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ description: 'Tên sản phẩm' })
  product_name?: string;
  @ApiProperty({ description: 'Đường dẫn sản phẩm URL SEO' })
  product_slug?: string;
  @ApiProperty({ description: 'Giá sản phẩm' })
  product_price?: number;
  @ApiProperty({ description: 'Mã barcode' })
  barcode?: string;
  @ApiProperty({ description: 'id danh mục' })
  categoryId?: string;
}
