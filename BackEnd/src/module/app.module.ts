import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@app/module/auth.module';
import { CategoryModule } from '@app/module/category.module';
import { ProductModule } from '@app/module/product.module';
import { CustomerModule } from '@app/module/customer.module';
import { OrderModule } from '@app/module/order.module';
import { UserModule } from '@app/module/user.module';
import { ProductSubModule } from '@app/module/productSub.module';
import { RoleModule } from '@app/module/role.module';
import { GmailModule } from '@app/module/gmail.module';
import { HashService } from '@app/util/hash.service';
import { ImagesController } from '@app/controller';
import { DefaultModule } from '@app/module/default.module';
import { InvoiceModule } from '@app/module/invoice.module';
import { JwtModule } from '@nestjs/jwt';
import { ReportModule } from '@app/module/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '1d' }
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/../entity/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    CategoryModule,
    CustomerModule,
    OrderModule,
    ProductModule,
    ProductSubModule,
    RoleModule,
    UserModule,
    DefaultModule,
    GmailModule,
    InvoiceModule,
    ReportModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      exclude: ['/api/(.*)'],
      serveRoot: '/',
    }),

  ],
  providers: [HashService],
  controllers :[ImagesController],
  exports: [HashService],
})
export class AppModule {}
