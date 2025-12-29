// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. เปิด CORS (สำคัญมาก ไม่งั้น Frontend จะติดแดงอีกแบบ)
  app.enableCors(); 

  // 2. กำหนด Port ให้ตรงกับ Frontend (3003)
  await app.listen(3003);
  
  // เพิ่ม Log บอกตัวเองหน่อยว่ารัน Port ไหน
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();