import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    credentials: true, 
    methods:['GET','POST','PUT','DELETE','OPTIONS','PATCH'],
    origin:['http://localhost:3000','http://localhost:3001']
  });
  app.use(cookieParser(process.env.REACT_APP_JWT_SECRET));
  
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
