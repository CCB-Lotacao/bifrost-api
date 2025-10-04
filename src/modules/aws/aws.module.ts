import {
  CognitoIdentityProviderClient,
  CognitoIdentityProviderClientConfig,
} from "@aws-sdk/client-cognito-identity-provider";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  Config,
  IAwsCognitoConfiguration,
  IAwsConfiguration,
  IAwsGlobalConfiguration,
} from "../../config/configuration";

@Module({
  providers: [
    {
      provide: Config.Aws,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get<IAwsConfiguration>(Config.Aws);
      },
    },
    {
      provide: Config.AwsCognito,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get<IAwsCognitoConfiguration>(Config.AwsCognito);
      },
    },
    {
      provide: Config.AwsGlobalConfiguration,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get<IAwsGlobalConfiguration>(
          Config.AwsGlobalConfiguration
        );
      },
    },
    {
      provide: CognitoIdentityProviderClient,
      inject: [Config.AwsGlobalConfiguration],
      useFactory: (config: IAwsGlobalConfiguration) =>
        new CognitoIdentityProviderClient(
          config as CognitoIdentityProviderClientConfig
        ),
    },
  ],
  exports: [CognitoIdentityProviderClient, Config.AwsCognito],
})
export class AwsModule {}
