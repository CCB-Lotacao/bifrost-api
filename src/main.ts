import "reflect-metadata";
import { Logger } from "@nestjs/common";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("CCB Lotação")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/", app, document);

  const { APP_PORT = 3000 } = process.env;

  await app.listen(APP_PORT, () => {
    Logger.log(
      `Nest application listening on http://localhost:${APP_PORT} 🚀`,
      "NestApplication"
    );
  });
}
bootstrap();
