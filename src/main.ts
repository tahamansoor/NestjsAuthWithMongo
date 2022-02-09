import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger()
  const port = 3000
  const config = new DocumentBuilder()
    .setTitle('mongoxauth')
    .setDescription('auth ')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  logger.verbose(`this app is runing on port:${port}`)
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
