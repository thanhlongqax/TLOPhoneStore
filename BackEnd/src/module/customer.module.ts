import { Module } from '@nestjs/common';
import { CustomerService } from '@app/service'
import { CustomerController } from '@app/controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer, Order } from '@app/entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@app/guard';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@app/module/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer , Order]),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '1d' }
    }),],
  controllers: [CustomerController],
  providers: [CustomerService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
export class CustomerModule {}
