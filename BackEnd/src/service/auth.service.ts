import {
  BadRequestException, HttpException, HttpStatus,
  Injectable, InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { ApiResponseDto, AuthDto, ChangePasswordDto, CreateEmployeeDto, CreateUserDto } from '@app/dto';
import { UserService } from './user.service';
import { HashService } from '@app/util';
import * as jwt from 'jsonwebtoken';
import { MailerService } from '@nestjs-modules/mailer';
import * as process from 'node:process';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly hashService: HashService,
    private readonly mailerService: MailerService
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<any> {
    try {
      const userExists = await this.userService.findUserByUsername(
        createUserDto.username,
      );
      if (userExists) {
        return new Error('Tài khoản đã tồn tại.');
      }

      await this.userService.createUser({
        ...createUserDto,
      });
      return new ApiResponseDto(200, true, 'Đăng ký thành công .');
    }catch (error){
      throw new NotFoundException(error);
    }
  }

  async registerWithGmail(userData: CreateEmployeeDto) {
    try {
      const token = jwt.sign({ email: userData.email },process.env.JWT_ACCESS_SECRET, {
        expiresIn: '1h',
      });
      userData.confirmationToken = token;
      await this.userService.createEmployee(userData);
      await this.sendUserConfirmation(userData.email, token);
      return new ApiResponseDto(200,true , "Đã gửi email. Vui lòng đặt mật trong 1 giờ");
    }catch (e){
      throw new BadRequestException(e)
    }
  }

  async sendUserConfirmation(userEmail: string, token: string) {
    const url = `${process.env.CLIENT_URL}/login?token=${token}`;
    try {
      await this.mailerService.sendMail({
        to: userEmail,
        subject: 'Xác thực Email của bạn',
        template: 'confirmation',
        context: { url },
      });
    }catch (error ){
      throw new BadRequestException('Email không đúng');
    }
  }

  async validateToken(token: string): Promise<ApiResponseDto<boolean>> {
    try {
      const token_Compare = process.env.JWT_ACCESS_SECRET;
      const decoded = jwt.verify(token, token_Compare) as { email: string };

      const user = await this.userService.findByEmail(decoded.email);
      if (!user) {
        throw new HttpException("Người dùng không tồn tại", HttpStatus.BAD_REQUEST);
      }

      if (user.confirmationToken !== token) {
        throw new HttpException("Invalid hoặc token hết hạn", HttpStatus.BAD_REQUEST);
      }
      return new ApiResponseDto(200, true, 'Token is valid.');
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException("Invalid token hoặc token hết hạn. Vui lòng nhờ admin gửi lại link tạo mật khẩu");
      } else if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException("Token has expired");
      } else {
        throw new InternalServerErrorException("An error occurred during token validation.");
      }
    }
  }

  async signIn(authDto : AuthDto) {
    try {
      const user = await this.userService.findUserByUsername(authDto.username);
      if (!user) throw new BadRequestException('Người dùng không tồn tại');
      const passwordMatches = await this.hashService.verifyData(user.password, authDto.password);
      if (!passwordMatches) {
        throw new Error('username hoặc mật khẩu bị sai');
      }
      const roleName = user.role.role_name;
      const tokens = await this.getTokens(user.user_id, user.username, roleName , user.isHasPassword ,user.background);
      await this.updateRefreshToken(user.user_id, tokens.refreshToken);
      return tokens;
    }catch (error){
      throw new BadRequestException(error);
    }
  }

  async signInWithToken(token: string) {
    try {
      let payload;
      try {
        payload = this.jwtService.verify(token, {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        });
      } catch (error) {
        throw new Error('Invalid or expired token');
      }
      const user = await this.userService.findByEmail(payload.email);

      if (!user) {
        throw new Error('User does not exist');
      }

      const roleName = user.role.role_name;
      const tokens = await this.getTokens(user.user_id, user.username, roleName, false , user.background);
      await this.updateRefreshToken(user.user_id, tokens.refreshToken);
      return tokens;
    }catch (error){
      throw new BadRequestException(error)
    }
  }

  async changeNewPassword(token: string, changePasswordDTO : ChangePasswordDto): Promise<ApiResponseDto<null>> {
    try {
      if (changePasswordDTO.newPassword !== changePasswordDTO.confirmPassword) {
        throw new Error("Mật khẩu không trùng khớp");
      }
      const isTokenValid = await this.validateToken(token);
      if (!isTokenValid) {
        throw new Error("Token hết hạn hoặc không hợp lệ");
      }
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as { email: string };
      const user = await this.userService.findByEmail(decoded.email)
      const hashedPassword = await this.hashService.hashData(changePasswordDTO.newPassword);
      user.password = hashedPassword;
      user.isHasPassword = true;
      await this.userService.updateUserByUserId(user.user_id, user);
      return new ApiResponseDto(HttpStatus.OK, true, 'Password changed successfully.');
    }catch (error) {
      throw new BadRequestException(error)
    }
  }

  async logout(userId: string) {
    try {
      return this.userService.updateUserById(userId, { refreshToken: null });
    }catch (error){
      throw new NotFoundException(error)
    }

  }

  async refreshTokens(userId: string, refreshToken: string) {
    try {
      const user = await this.userService.findUserById(userId);
      if (!user || !user.refreshToken)
        throw new Error('Truy cập bị từ chối');
      const refreshTokenMatches = await argon2.verify(
        user.refreshToken,
        refreshToken,
      );
      if (!refreshTokenMatches) throw new Error('Truy cập bị từ chối');
      const roleName = user.role.role_name;
      const tokens = await this.getTokens(user.user_id, user.username , roleName , user.isHasPassword , user.background);
      await this.updateRefreshToken(user.user_id, tokens.refreshToken);
      return tokens;
    }catch (error){
      throw new BadRequestException(error);
    }
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashService.hashData(refreshToken);
    await this.userService.updateUserById(userId, { refreshToken: hashedRefreshToken } );
  }

  async getTokens(userId: string, username: string ,role: string , isHasPassword : boolean , background : string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          isHasPassword,
          role,
          background
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_TTL'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          isHasPassword,
          role,
          background
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_TTL'),
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

}
