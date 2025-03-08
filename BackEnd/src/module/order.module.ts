import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from '@app/service';
import { OrderController } from '@app/controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, OrderItem, Customer, Product } from '@app/entity';
import {  UserModule } from '@app/module/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@app/guard';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([Order ,OrderItem , Customer , Product]),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '1d' }
    }),
  ],
  providers: [OrderService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
