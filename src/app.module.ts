import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ApiModule, DatabaseModule } from "./modules";
import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    DatabaseModule,
    ApiModule,
  ],
})
export class AppModule {}
