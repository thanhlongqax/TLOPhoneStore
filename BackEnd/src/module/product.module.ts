import { Module } from '@nestjs/common';
import { ProductService } from '@app/service';
import { ProductController } from '@app/controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductSub } from '@app/entity';
import { CategoryModule } from '@app/module/category.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@app/guard';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@app/module/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product , ProductSub]), CategoryModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '1d' }
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
  exports : [ProductService],
})
export class ProductModule {}
