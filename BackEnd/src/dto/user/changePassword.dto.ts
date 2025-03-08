import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ description: 'Mật khẩu mới' })
  newPassword :string;
  @ApiProperty({ description: 'Nhập lại mật khẩu' })
  confirmPassword: string;
}