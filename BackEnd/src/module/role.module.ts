import { Module } from '@nestjs/common';
import { RoleService } from '@app/service'
import { RoleController } from '@app/controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User } from '@app/entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@app/guard';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@app/module/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role , User]),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '1d' }
    }),
  ],
  controllers: [RoleController],
  providers: [RoleService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
export class RoleModule {}
