import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from '@app/service';
import { User } from '@app/entity';
import { CreateEmployeeDto, CreateUserDto, UpdateUserDto } from '@app/dto';
import { AccessTokenGuard, RolesGuard } from '@app/guard';
import { Role } from '@app/decorator';

@ApiTags('Nhân viên')
@ApiBearerAuth()
@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Role('ADMIN')
  @Get()
  @ApiOperation({ summary: 'Lấy tất nhân viên có phân trang ' })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Số trang',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Số phần tử giới hạn trên 1 trang',
  })
  @ApiQuery({
    name: 'search',
    required: true,
    type: String,
    description: 'Từ khóa tìm kiếm',
  })
  @ApiResponse({ status: 200, type: [User] })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search = '',
  ): Promise<User[]> {
    return this.userService.getAllEmployee(page,limit,search);
  }
  @Role('ADMIN')
  @Get(':id')
  @ApiOperation({ summary: 'Lấy nhân viên theo id ' })
  @ApiParam({
    name: 'id',
    description: 'id của nhân viên',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200, type: User })
  async findOne(@Param('id') id: string): Promise<any> {
    return this.userService.findEmployeeById(id);
  }
  @Role('USER' , 'ADMIN')
  @Get('username/:username')
  @ApiOperation({ summary: 'Lấy nhân viên theo username ' })
  @ApiParam({
    name: 'username',
    description: 'username của nhân viên',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200, type: User })
  async findOneByUserName(@Param('username') username: string): Promise<any> {
    return this.userService.getEmployeeByUserName(username);
  }
  @Role('ADMIN')
  @Get('locked/:id')
  @ApiOperation({
    summary: 'Mở Khóa nhân viên theo id',
    description: 'Admin.'
  })
  @ApiParam({
    name: 'id',
    description: 'id của nhân viên',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200, type: User })
  async lockedOne(@Param('id') id: string): Promise<any> {
    return this.userService.LockEmployeeById(id);
  }
  @Role('ADMIN')
  @Get('unlocked/:id')
  @ApiOperation({
    summary: 'Mở Khóa nhân viên theo id',
    description: 'Admin.'
  })
  @ApiParam({
    name: 'id',
    description: 'id của nhân viên',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200, type: User })
  async unLockedOne(@Param('id') id: string): Promise<any> {
    return this.userService.UnLockEmployeeById(id);
  }
  @Role('ADMIN')
  @Post()
  @ApiOperation({
    summary: 'Tạo 1 nhân viên mới',
    description: 'Admin.'
  })
  @ApiBody({type :CreateEmployeeDto })
  @ApiResponse({ status: 201, type: User })
  async create(@Body() user: CreateEmployeeDto): Promise<any> {
    return this.userService.createEmployee(user);
  }
  @Role('ADMIN' , 'USER')
  @Put(':id')
  @ApiOperation({
    summary: 'Cập nhật nhân viên theo id',
    description: 'Admin.'
  })
  @ApiParam({
    name: 'id',
    description: 'id của nhân viên',
    required: true,
    type: String,
  })
  @ApiBody({type :UpdateUserDto })
  @ApiResponse({ status: 200, type: User })
  async update(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<any> {
    return this.userService.updateUserById(id, user);
  }
  @Role('ADMIN')
  @Delete(':id')
  @ApiOperation({
    summary: 'Xóa 1 nhân viên theo id',
    description: 'Admin.'
  })
  @ApiParam({
    name: 'id',
    description: 'id của nhân viên',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 204 })
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUserById(id);
  }

  @Role('ADMIN')
  @Get('sendEmail/:id')
  @ApiOperation({
    summary: 'Gửi email xác thực nhân viên',
    description: 'Admin.'
  })
  @ApiParam({
    name: 'id',
    description: 'id của nhân viên',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200 })
  async sendEmail(@Param('id') id: string): Promise<any> {
    return this.userService.sendWithGmail(id);
  }
}
