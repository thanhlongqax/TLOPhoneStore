import { Module } from '@nestjs/common';
import { DefaultService } from '@app/service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer, Role, User , Order } from '@app/entity';
import { HashService } from '@app/util';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@app/module/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@app/guard';
import { ProductModule } from '@app/module/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([User , Role , Customer , Order]),
    UserModule,
    ProductModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '1d' }
    }),],
  providers: [HashService,DefaultService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
  exports: [DefaultService],
})
export class DefaultModule {}
