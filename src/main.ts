import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
      .setTitle("Parking api")
      .setDescription("Api parking")
      .setVersion("1.0")
      .addTag("parking")
      .build();

  const document = SwaggerModule.createDocument(app,config);
  const configu = app.get(ConfigService);
  SwaggerModule.setup('api',app,document) 
  app.useGlobalPipes(new ValidationPipe());
 // app.enableCors();
  await app.listen(process.env.PORT || 3000,() =>{
    console.log(`Running in ${configu.get('environment')} mode`)
    console.log("dfdfdfdfdfdf "+process.env.REDIS_PORT)

  });
}
bootstrap();
