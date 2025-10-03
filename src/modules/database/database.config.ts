import path from "path";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Config } from "../../config/configuration";

@Injectable()
export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  constructor(public readonly config: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const environment = this.config.get<string>(Config.AppEnvironment);
    const isDevelopment = environment === "development";

    return {
      useUTC: true,
      logging: false,
      type: "postgres",
      autoLoadEntities: true,
      synchronize: isDevelopment,
      migrationsRun: !isDevelopment,
      metadataTableName: "typeorm_metadata",
      migrationsTableName: "typeorm_migration_history",
      migrations: [path.join(__dirname, "migrations", "*{.ts,.js}")],
      host: this.config.get<string>("DB_HOST"),
      username: this.config.get<string>("DB_USERNAME"),
      password: this.config.get<string>("DB_PASSWORD"),
      database: this.config.get<string>("DB_DATABASE"),
    };
  }
}
