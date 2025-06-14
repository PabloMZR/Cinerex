import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
      methods: 'GET,POST,PUT,DELETE,PATCH',
      credentials: true
    }
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
