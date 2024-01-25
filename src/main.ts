import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true
  }))

  const options = new DocumentBuilder()
  .setTitle('Meetings')
  .setDescription('Host ephemeral meetings(spaces) and receive feedback')
  .setVersion('0.1')
  .setContact('Damilare Akin-Oladejo', 'https://akin-oladejo.github.io', 'akinoladejodamilare@gmail.com')
  .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  await app.listen(3000);
}
bootstrap();
