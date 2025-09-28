export interface IAppConfiguration {
  readonly environment: string;
  readonly name: string;
  readonly port: number;
}

export interface IDatabaseConfiguration {
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
  readonly database: string;
}

export interface IConfiguration {
  readonly app: IAppConfiguration;
  readonly database: IDatabaseConfiguration;
}

export const Config = {
  AppEnvironment: "app.environment",
  AppName: "app.name",
  AppPort: "app.port",
  DatabaseHost: "database.host",
  DatabasePort: "database.port",
  DatabaseUsername: "database.username",
  DatabasePassword: "database.password",
  DatabaseName: "database.database",
};

export default (): IConfiguration => {
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
      port: parseInt(process.env.DB_PORT || "3307", 10),
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_DATABASE || "ccb_lotacao",
    },
  };
};
