import { Logger } from "@nestjs/common";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { APP_PORT = 3000 } = process.env;
  await app.listen(APP_PORT, () => {
    Logger.log(
      `Nest application listening on http://localhost:${APP_PORT} 🚀`,
      "NestApplication"
    );
  });
}
bootstrap();
