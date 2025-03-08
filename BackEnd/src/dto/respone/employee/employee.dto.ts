import { ApiProperty } from '@nestjs/swagger';

export class EmployeeDto {

  @ApiProperty({ description: 'Username' })
  user_id: string;

  @ApiProperty({ description: 'Username' })
  username: string;

  @ApiProperty({ description: 'Họ và tên' })
  fullName? :string;

  @ApiProperty({ description: 'ảnh đại diện' })
  background?: string;

  @ApiProperty({ description: 'Email' })
  email?: string;

  @ApiProperty({ description: 'Ngày sinh' })
  dateOfBirth?: string;

  @ApiProperty({ description: 'Vai trò' })
  role_description?: string;
}