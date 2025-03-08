import { forwardRef, Module } from '@nestjs/common';
import { InvoiceService } from '@app/service';
import { InvoiceController } from '@app/controller';
import {OrderModule} from '@app/module/order.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@app/guard';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@app/module/user.module';

@Module({
  imports: [
    forwardRef(() => OrderModule),
    UserModule,
    JwtModule.register({
    secret: process.env.JWT_ACCESS_SECRET,
    signOptions: { expiresIn: '1d' }
  }),],
  controllers: [InvoiceController],
  providers: [InvoiceService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
export class InvoiceModule {}
