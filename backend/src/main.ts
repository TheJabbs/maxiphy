import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {TypeTransformPipe} from "./pipes/type_transform_pipe";
import {ErrorLoggingService} from "./core/ErrorLogging/ErrorLogging.service";
import {GlobalExceptionFilter} from "./microservices/error-logging";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const errorLoggingService = app.get(ErrorLoggingService);

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
  );


  app.useGlobalFilters(new GlobalExceptionFilter(errorLoggingService));

  //app.use(cookieParser());


  await app.listen(4000, '0.0.0.0');}
bootstrap();
