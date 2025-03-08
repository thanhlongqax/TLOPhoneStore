import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import * as compression from "compression";
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { join } from 'path';
import {DefaultService} from '@app/service';
import { RolesGuard } from '@app/guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.setGlobalPrefix("/api");
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle("TLO BackEnd Final NodeJs")
    .setDescription("TLO Shopping sử dụng NestJs . Mở rộng từ Node và ExpressJs")
    .setTermsOfService("Môn học NodeJS cuối kỳ")
    .setContact(" Tên sinh viên : Nguyễn Lâm Thành Long , MSSV : 52100820" ,"", "52100820@student.tdtu.edu.vn")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "Bearer",
        bearerFormat: "JWT",
      },
      "authorization",
    )
    .addServer("/")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/", app, document, {
    jsonDocumentUrl: "swagger/json",
  });
  await app.listen(process.env.SERVER_URL ?? 3000);
}
bootstrap();
