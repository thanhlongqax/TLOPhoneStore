import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({ description: 'Trạng thái' })
  statusCode: number;
  @ApiProperty({ description: 'thành công hay thất bại' })
  success: boolean;
  @ApiProperty({ description: 'Thông báo' })
  message: string;
  @ApiProperty({ description: 'Dữ liệu' })
  data?: T;

  constructor(statusCode: number, success: boolean, message: string, data?: T) {
    this.statusCode = statusCode;
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
