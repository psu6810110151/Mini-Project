import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // เปิดให้ Frontend เข้าถึงได้
  await app.listen(3000);
}
bootstrap();