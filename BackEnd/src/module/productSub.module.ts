import { Module } from '@nestjs/common';
import { ProductSubService } from '@app/service'
import { ProductSubController } from '@app/controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductSub } from '@app/entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@app/guard';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@app/module/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSub ,Product]),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '1d' }
    }),
  ],
  controllers: [ProductSubController],
  providers: [ProductSubService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
export class ProductSubModule {}
