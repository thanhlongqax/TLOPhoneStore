import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@app/service';
import { ApiResponseDto } from '@app/dto';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService : UserService,) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    if (!roles || !roles.length) {
      return true;
    }
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Không tìm thấy token');
    }
    let payload;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException(error)
    }
    // const payload = await this.jwtService.verifyAsync(token, {
    //   secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
    // });

    request.user = payload;

      const userRole = payload.role;
      if (roles.includes(userRole)) {
        if (userRole === 'ADMIN') {
          return true;
        }
        const user = await this.userService.findByEmail(payload.email);
        if (user && user.isHasPassword == true) {
          return true;
        } else {
          throw new UnauthorizedException('Access denied: Người dùng chưa thiết lập mật khẩu');
        }
      } else {
        throw new UnauthorizedException('Access denied: Người dùng chưa không đúng quyền truy cập vui lòng vào bằng tài khoản admin');
      }
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.split(' ')[1];
  }

}
