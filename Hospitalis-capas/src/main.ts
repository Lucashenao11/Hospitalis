import { setServers } from 'node:dns/promises';
setServers(['1.1.1.1', '8.8.8.8']);

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
  console.log(`Hospitalis (capas) corriendo en puerto ${process.env.PORT ?? 3001}`);
}
bootstrap();
