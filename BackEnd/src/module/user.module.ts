import { Module } from '@nestjs/common';
import { UserService } from '@app/service'
import { AdminController, UserController } from '@app/controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User } from '@app/entity';
import { HashService } from '@app/util';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@app/guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User , Role]),
    JwtModule.register({
    secret: process.env.JWT_ACCESS_SECRET,
    signOptions: { expiresIn: '1d' }
  }),
  ],
  controllers: [UserController , AdminController],
  providers: [HashService,UserService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
  exports: [UserService],
})
export class UserModule {}
