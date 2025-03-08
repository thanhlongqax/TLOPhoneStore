import { ApiProperty } from '@nestjs/swagger';

export class sendEmailEmployeeDto {
  @ApiProperty({ description: 'Email' })
  email: string;
}