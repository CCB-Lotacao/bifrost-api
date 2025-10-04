import {
  AdminRemoveUserFromGroupCommand,
  AdminCreateUserCommand,
  AdminDisableUserCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import { BadGatewayException, Inject, Injectable } from "@nestjs/common";
import { IdentityProvider } from "../../../domain/enums";
import { CreateIdentityDto } from "../dtos";
import {
  Config,
  IAwsCognitoConfiguration,
} from "../../../config/configuration";
import { Identity } from "../../../domain/entities";

@Injectable()
export class IdentityProviderService {
  constructor(
    @Inject(Config.AwsCognito)
    private readonly awsCognitoConfiguration: IAwsCognitoConfiguration,
    private readonly client: CognitoIdentityProviderClient
  ) {}

  public async createUserIdentity(
    createIdentityDto: CreateIdentityDto
  ): Promise<Identity> {
    const UserAttributes = Object.entries(createIdentityDto).map(
      ([Name, Value]) => ({ Name, Value })
    );

    UserAttributes.push({ Name: "email_verified", Value: "true" });

    const { User } = await this.client.send(
      new AdminCreateUserCommand({
        UserPoolId: this.awsCognitoConfiguration.userPoolId,
        Username: createIdentityDto.email,
        UserAttributes,
      })
    );

    if (!User || !User.Username) {
      throw new BadGatewayException();
    }

    return new Identity(User.Username, IdentityProvider.AmazonCognito);
  }

  public async disableUserIdentity(identityId: string): Promise<void> {
    await this.client.send(
      new AdminDisableUserCommand({
        UserPoolId: this.awsCognitoConfiguration.userPoolId,
        Username: identityId,
      })
    );
  }
}
