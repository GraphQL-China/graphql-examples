import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: [
            "'self'",
            'fonts.googleapis.com',
            'cdn.jsdelivr.net',
            "'unsafe-inline'",
          ],
          scriptSrc: [
            "'self'",
            'cdn.jsdelivr.net',
            "'unsafe-inline'",
            "'unsafe-eval'",
          ],
          imgSrc: ["'self'", 'data:', 'cdn.jsdelivr.net'],
          fontSrc: ["'self'", 'fonts.gstatic.com'],
        },
      },
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );

  await app.listen(4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
