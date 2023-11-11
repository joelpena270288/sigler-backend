import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors: true});
  app.setGlobalPrefix('api');
  app.enableCors();
  
  const options = new DocumentBuilder()
    .setTitle('Api App')
    .setDescription('This is Api')
    .setVersion('1.0')
    .addTag('CIGLER')
    .build();
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
  
  await app.listen(AppModule.port);
}
bootstrap();
