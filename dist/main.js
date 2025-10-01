"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const { APP_PORT = 3000 } = process.env;
    await app.listen(APP_PORT, () => {
        common_1.Logger.log(`Nest application listening on http://localhost:${APP_PORT} 🚀`, "NestApplication");
    });
}
bootstrap();
