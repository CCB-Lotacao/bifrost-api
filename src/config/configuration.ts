export interface IAppConfiguration {
  readonly environment: string;
  readonly name: string;
  readonly port: number;
}

export interface IAwsGlobalConfiguration {
  readonly region: string;
  readonly endpoint?: string | null;
  readonly credentials?: {
    readonly accessKeyId: string;
    readonly secretAccessKey: string;
  } | null;
}

export interface IAwsCognitoConfiguration {
  readonly userPoolId: string;
}

export interface IAwsConfiguration {
  readonly global: IAwsGlobalConfiguration;
  readonly cognito: IAwsCognitoConfiguration;
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
  readonly aws: IAwsConfiguration;
}

export const Config = {
  Aws: "aws",
  AwsCognito: "aws.cognito",
  AwsGlobalConfiguration: "aws.global",
  AwsCognitoUserPoolId: "aws.cognito.userPoolId",
  AwsRegion: "aws.global.region",
  AwsEndpoint: "aws.global.endpoint",
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
  const AWS_REGION = process.env.AWS_REGION || "us-east-1";
  const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || null;
  const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || null;
  const AWS_COGNITO_USER_POOL_ID = process.env.AWS_COGNITO_USER_POOL_ID || null;
  const AWS_ENDPOINT = process.env.AWS_ENDPOINT || null;

  const useCredentials = !!(AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY);

  return {
    app: {
      environment: ENVIRONMENT,
      name: APP_NAME,
      port: PORT,
    },
    database: {
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432", 10),
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_DATABASE || "ccb_lotacao",
    },
    aws: {
      global: {
        region: AWS_REGION,
        endpoint: AWS_ENDPOINT,
        ...(useCredentials && {
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY,
        }),
      },
      cognito: { userPoolId: AWS_COGNITO_USER_POOL_ID ?? "" },
    },
  };
};
