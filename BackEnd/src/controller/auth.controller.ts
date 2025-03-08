import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
  Query,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService  } from '@app/service';
import { CreateUserDto, AuthDto, CreateEmployeeDto, ChangePasswordDto, UpdateUserDto } from '@app/dto';
import { AccessTokenGuard, RefreshTokenGuard } from '@app/guard';
import { Role } from '@app/decorator';
import { RolesGuard  } from '@app/guard';
@ApiTags('Authentication')
@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {constructor(private readonly authService: AuthService) {
  }
  // @Role('ADMIN')
  // @Post('signup')
  // @ApiOperation({ summary: 'Sign up a new user' })
  // @ApiResponse({ status: 201, description: 'User created' })
  // async signUp(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.signUp(createUserDto);
  // }
  @Role('ADMIN')
  @Post('registerMail')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Đăng ký email' })
  @ApiBody({
    type: CreateEmployeeDto
  })
  @ApiResponse({ status: 200, description: 'Đăng ký qua gmail' })
  async register(@Body() userData: CreateEmployeeDto)  {
    return await this.authService.registerWithGmail(userData);
  }

  @Post('confirm')
  @ApiOperation({ summary: 'Xác thực mã token từ gmail' })
  @ApiBody({
    type: ChangePasswordDto
  })
  @ApiResponse({ status: 200, description: 'Đăng ký qua gmail' })
  async confirm(
    @Query('token') token : string ,
    @Body() changePassword : ChangePasswordDto) {
    return await this.authService.changeNewPassword(token ,changePassword );
  }

  @Post('signin')
  @ApiOperation({ summary: 'Đăng nhập' })
  @ApiBody({
    description: 'Thông tin cần để đăng nhập',
    type: AuthDto
  })
  @ApiResponse({ status: 200})
  Login(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @Get('login')
  @ApiOperation({ summary: 'Đăng nhập với token từ gmail' })
  @ApiQuery({
    name: 'token',
    description: 'Token được lấy từ Gmail để thực hiện đăng nhập',
    required: true,
    type: String,
  })
  @ApiResponse({ status: 200, description: 'User signed in' })
  LoginWithToken(@Query('token') token : string) {
    return this.authService.signInWithToken(token);
  }

  // @UseGuards(AccessTokenGuard)
  @Role('ADMIN' , 'USER')
  @Get('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Đăng xuất' })
  @ApiResponse({ status: 200, description: 'User Logout' })
  logout(@Req() req: Request) {
    const userId = req.user['sub'];

    if (!userId) {
      throw new BadRequestException('User not found');
    }

    this.authService.logout(userId)
  }

  // @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh Token mới khi hết hạn' })
  @ApiResponse({ status: 200, description:'Lấy được access token và refresh token' })
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];

    if (!userId || !refreshToken) {
      throw new BadRequestException('User ID or refresh token is missing');
    }

    return this.authService.refreshTokens(userId, refreshToken);
  }
}
