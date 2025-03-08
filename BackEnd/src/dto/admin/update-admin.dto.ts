import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdminDto {
  @ApiProperty({ description: 'Mật khẩu' })
  password?: string;
  @ApiProperty({ description: 'Ảnh đại diện' })
  background?: string;

}