"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
exports.Config = {
    AppEnvironment: "app.environment",
    AppName: "app.name",
    AppPort: "app.port",
    DatabaseHost: "database.host",
    DatabasePort: "database.port",
    DatabaseUsername: "database.username",
    DatabasePassword: "database.password",
    DatabaseName: "database.database",
};
exports.default = () => {
    const ENVIRONMENT = process.env.NODE_ENV || "development";
    const APP_NAME = process.env.APP_NAME || "bifrost-api";
    const PORT = parseInt(process.env.PORT || "3000", 10);
    return {
        app: {
            environment: ENVIRONMENT,
            name: APP_NAME,
            port: PORT,
        },
        database: {
            host: process.env.DB_HOST || "localhost",
            port: parseInt(process.env.DB_PORT || "3306", 10),
            username: process.env.DB_USERNAME || "root",
            password: process.env.DB_PASSWORD || "password",
            database: process.env.DB_DATABASE || "ccb_lotra",
        },
    };
};
