import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoleService } from '@app/service';
import { Role } from '@app/entity';
import { RolesGuard } from '@app/guard';

@ApiTags('roles')
@Controller('roles')
@UseGuards(RolesGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // @Get()
  // @ApiOperation({ summary: 'Get all roles' })
  // @ApiResponse({ status: 200, type: [Role] })
  // async findAll(): Promise<Role[]> {
  //   return this.roleService.findAll();
  // }
  //
  // @Get(':id')
  // @ApiOperation({ summary: 'Get a role by ID' })
  // @ApiResponse({ status: 200, type: Role })
  // async findOne(@Param('id') id: number): Promise<Role> {
  //   return this.roleService.findOne(id);
  // }
  //
  // @Post()
  // @ApiOperation({ summary: 'Create a new role' })
  // @ApiResponse({ status: 201, type: Role })
  // async create(@Body() role: Role): Promise<Role> {
  //   return this.roleService.create(role);
  // }
  //
  // @Put(':id')
  // @ApiOperation({ summary: 'Update a role' })
  // @ApiResponse({ status: 200, type: Role })
  // async update(@Param('id') id: number, @Body() role: Role): Promise<Role> {
  //   return this.roleService.update(id, role);
  // }
  //
  // @Delete(':id')
  // @ApiOperation({ summary: 'Xóa danh sách role ' })
  // @ApiResponse({ status: 204 })
  // async remove(@Param('id') id: number): Promise<String> {
  //   return this.roleService.deleteRoleById(id);
  // }
}
