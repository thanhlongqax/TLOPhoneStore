import { forwardRef, Module } from '@nestjs/common';
import { ReportService } from '@app/service';
import { ReportController } from '@app/controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order} from '@app/entity';
import {  UserModule } from '@app/module/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@app/guard';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([Order]),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '1d' }
    }),
  ],
  providers: [ReportService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
  controllers: [ReportController],
})
export class ReportModule {}
