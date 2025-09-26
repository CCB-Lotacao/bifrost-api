import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configurar validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Configurar CORS
  app.enableCors();

  const port = configService.get("app.port") || 3000;
  await app.listen(port);

  console.log(`Aplicação rodando na porta http://localhost:${port}🚀`);
}

bootstrap();
