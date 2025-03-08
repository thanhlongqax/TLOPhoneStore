import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Username' })
  username: string;
  @ApiProperty({ description: 'Họ và tên' })
  fullName :string;
  @ApiProperty({ description: 'Email' })
  email: string;
  @ApiProperty({ description: 'Mật khẩu' })
  password: string;
  refreshToken?: string;
}