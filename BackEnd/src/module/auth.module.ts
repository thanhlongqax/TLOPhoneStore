
import { Module } from '@nestjs/common';
import { AuthService } from '@app/service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@app/controller';
import { AccessTokenStrategy, RefreshTokenStrategy } from '@app/strategies';
import { UserModule } from './user.module';
import { HashService } from '@app/util';
import { RolesGuard } from '@app/guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '1d' }
    }),
  ],
  controllers: [AuthController],
  providers: [HashService,AuthService, AccessTokenStrategy, RefreshTokenStrategy ,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
  }],
  exports: [AuthService],
})
export class AuthModule {}
