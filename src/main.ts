import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const isProduction = process.env.NODE_ENV === 'production';
  const port = process.env.PORT || 4000; 
  const serverUrl = isProduction
    ? 'https://shop-backend-swagger.vercel.app/' 
    : `http://localhost:${port}`;

  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('API для работы с пользователями')
    .setVersion('1.0')
    .addServer(serverUrl)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  try {
    await app.listen(port);
    console.log(`🚀 Server is running on ${serverUrl}`);
    console.log(`📚 Swagger API documentation is available on ${serverUrl}/api`);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

bootstrap().catch(err => {
  console.error('Bootstrap error:', err);
  process.exit(1);
});
