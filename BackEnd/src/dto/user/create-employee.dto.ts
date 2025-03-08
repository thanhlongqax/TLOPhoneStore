import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Họ và tên' })
  fullName :string;
  @ApiProperty({ description: 'Email' })
  email: string;
  @ApiProperty({ description: 'Ngày sinh' })
  dateOfBirth?: Date;
  @ApiProperty({ description: 'Ảnh đại diện' })
  background? : string;
  confirmationToken? : string;
}