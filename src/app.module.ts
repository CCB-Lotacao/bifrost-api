import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import configuration from "./config/configuration";
import { ApiModule } from "./modules";
import { User } from "./domain/entities";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get("database.host"),
        port: configService.get("database.port"),
        username: configService.get("database.username"),
        password: configService.get("database.password"),
        database: configService.get("database.database"),
        entities: [User],
        synchronize: true, // Apenas para desenvolvimento
        logging: true,
      }),
      inject: [ConfigService],
    }),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    ApiModule,
  ],
})
export class AppModule {}
