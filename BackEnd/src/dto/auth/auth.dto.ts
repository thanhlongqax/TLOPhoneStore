import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ description: 'Username' })
  username: string;

  @ApiProperty({ description: 'Mật khẩu' })
  password: string;
}