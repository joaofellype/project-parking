import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
      .setTitle("Parking api")
      .setDescription("Api parking")
      .setVersion("1.0")
      .addTag("parking")
      .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document) 
  app.useGlobalPipes(new ValidationPipe());
 // app.enableCors();
  await app.listen(3000);
}
bootstrap();
