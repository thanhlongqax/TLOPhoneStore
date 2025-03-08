import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty({ description: 'Tên sản phẩm' })
  product_name: string;
  @ApiProperty({ description: 'Hình ảnh sản phẩm' })
  product_images? : [];
  @ApiProperty({ description: 'đường dẫn hình url' })
  product_slug?: string;
  @ApiProperty({ description: 'Giá sản phẩm' })
  product_price: number;
  @ApiProperty({ description: 'Họ và tên' })
  barcode?: string;
  @ApiProperty({ description: 'Họ và tên' })
  categoryId: string;
  @ApiProperty({ description: 'Họ và tên' })
  thumbnail? : string;
  @ApiProperty({ description: 'Họ và tên' })
  promotion_note? : string;
  @ApiProperty({ description: 'Họ và tên' })
  short_description? : string;
  @ApiProperty({ description: 'Họ và tên' })
  description? : string;

}
