import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'Tên của người dùng' })
  username?: string;
  @ApiProperty({ description: 'Mật khẩu' })
  password?: string;
  @ApiProperty({ description: 'Email' })
  email?: string;

  @ApiProperty({ description: 'Họ và tên' })
  fullName?: string;

  @ApiProperty({ description: 'Ngày sinh' })
  dataOfBirth?: string;

  @ApiProperty({ description: 'Ảnh đại diện' })
  background?: string;

  refreshToken?: string;
}