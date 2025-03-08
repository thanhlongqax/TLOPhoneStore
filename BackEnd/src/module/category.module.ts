import { Module } from '@nestjs/common';
import { CategoryService } from '@app/service';
import { CategoryController } from '@app/controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Product } from '@app/entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@app/guard';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@app/module/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '1h' }
    }),
  ],
  controllers: [CategoryController],
  providers: [CategoryService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
  exports: [CategoryService],
})
export class CategoryModule {}
