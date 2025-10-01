"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfiguration = void 0;
const path_1 = __importDefault(require("path"));
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const configuration_1 = require("../../config/configuration");
let DatabaseConfiguration = class DatabaseConfiguration {
    constructor(config) {
        this.config = config;
    }
    createTypeOrmOptions() {
        const environment = this.config.get(configuration_1.Config.AppEnvironment);
        const isDevelopment = environment === "development";
        return {
            logging: false,
            type: "mysql",
            autoLoadEntities: true,
            synchronize: isDevelopment,
            migrationsRun: !isDevelopment,
            metadataTableName: "typeorm_metadata",
            migrationsTableName: "typeorm_migration_history",
            migrations: [path_1.default.join(__dirname, "migrations", "*{.ts,.js}")],
            namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
            host: this.config.get("DB_HOST"),
            username: this.config.get("DB_USERNAME"),
            password: this.config.get("DB_PASSWORD"),
            database: this.config.get("DB_DATABASE"),
        };
    }
};
exports.DatabaseConfiguration = DatabaseConfiguration;
exports.DatabaseConfiguration = DatabaseConfiguration = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DatabaseConfiguration);
