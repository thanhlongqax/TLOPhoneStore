import { Controller, Put,Param, Body, UseGuards} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth , ApiParam } from '@nestjs/swagger';
import { UserService } from '@app/service';
import { User } from '@app/entity';
import { UpdateAdminDto, UpdateUserDto } from '@app/dto';
import { RolesGuard } from '@app/guard';
import { Role } from '@app/decorator';

@ApiTags('Trang quản trị')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(RolesGuard)
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @Role('ADMIN')
  @Put(':username')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Cập nhật admin theo id',
    description: 'Admin',
  })
  @ApiParam({
    name: 'id',
    description: 'id của admin',
    required: true,
    type: String,
  })
  @ApiBody({
    description: 'Thông tin cần cập nhật của admin',
    type: UpdateUserDto
  })
  @ApiResponse({ status: 200, type: User })
  async update(@Param('username')username: string, @Body() admin: UpdateAdminDto): Promise<any> {
    return this.userService.updateAdminByUserName(username , admin);
  }
}
