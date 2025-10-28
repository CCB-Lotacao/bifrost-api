import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { IdentityProvider, Permission, UserRole } from "../../../domain/enums";
import { Authorization, Identity } from "../../../domain/entities";
import {
  IRequiredPermission,
  IResourcePermission,
} from "../../../modules/auth/interfaces";
import { REQUIRED_PERMISSION_KEY } from "../decorators";
import { PermissionByRole } from "../../../common/constants";

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

  constructor(private readonly reflector: Reflector) {}

  private static isResourcePermission(
    permission: IRequiredPermission
  ): permission is IResourcePermission {
    return typeof permission === "object";
  }

  private static isPermissionList(
    permission: IRequiredPermission
  ): permission is Permission[] {
    return permission instanceof Array;
  }

  private static canAuthorize(userrole: UserRole): boolean {
    // bypass (skip validation)
    return userrole === UserRole.SystemAdmin || userrole === UserRole.Assistant;
  }

  private createIdentity(id: string): Identity {
    return new Identity(id, IdentityProvider.Local);
  }

  private createAuthorization(
    tokenPayload: any,
    requiredPermission: IRequiredPermission,
    requestParameters: { readonly [key: string]: string }
  ): Authorization {
    const identity = this.createIdentity(tokenPayload.sub);
    const authorization = new Authorization(identity);

    const userRole = tokenPayload.role as UserRole;
    const permissions = PermissionByRole[userRole] || [];

    if (AuthGuard.canAuthorize(userRole)) {
      authorization.identity.skipValidation = true;
      const resources = new Set<string>();
      resources.add(authorization.identity.id);

      if (AuthGuard.isResourcePermission(requiredPermission)) {
        const resourcePermissions = Object.keys(requiredPermission) || [];
        for (const resource of resourcePermissions) {
          const resourceId = requestParameters[resource];
          resourceId && resources.add(resourceId);
        }
      }

      for (const resourceId of resources) {
        for (const permission of permissions) {
          authorization.addPermission(permission, resourceId);
        }
      }
    }

    if (userRole === UserRole.SystemAdmin) {
      for (const permission of permissions) {
        authorization.addPermission(permission, "system");
      }
    }

    if (
      authorization.permissions.size >= 1 ||
      authorization.identity.skipValidation
    ) {
      return authorization;
    }

    return authorization;
  }

  private validateAuthorization(
    authorization: Authorization,
    requiredPermission: IRequiredPermission,
    requestParameters: { readonly [key: string]: string }
  ): boolean {
    if (authorization.identity.skipValidation) {
      return true;
    }

    if (!AuthGuard.isResourcePermission(requiredPermission)) {
      if (AuthGuard.isPermissionList(requiredPermission)) {
        return requiredPermission.every((rp) => {
          const [resourceId] = authorization.findResource(rp);
          return authorization.hasPermission(rp, resourceId);
        });
      }

      const [resourceId] = authorization.findResource(requiredPermission);
      return authorization.hasPermission(requiredPermission, resourceId);
    }

    const resourcePermissions = Object.entries(requiredPermission);
    return resourcePermissions.every(([resource, permissions]) => {
      const resourceId = requestParameters[resource];
      return permissions.every((permission) => {
        return authorization.hasPermission(permission, resourceId);
      });
    });
  }

  private async validateToken(request: Request): Promise<any> {
    try {
      const authorization = request.headers.authorization || "";
      const acessToken = authorization.replace("Bearer ", "");

      if (!acessToken) {
        throw new UnauthorizedException("Authorization header is required");
      }

      return jwt.verify(acessToken, this.JWT_SECRET);
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException(error.message);
      }

      Logger.error(error, "AuthGuard");
      throw new InternalServerErrorException(`Failed to validate acessToken`);
    }
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const contextHandler = context.getHandler();

    const requiredPermission =
      this.reflector.get<IRequiredPermission>(
        REQUIRED_PERMISSION_KEY,
        contextHandler
      ) || [];

    const httpArgs = context.switchToHttp();
    const request = httpArgs.getRequest<Request>();
    const requestParameters = request.params || {};

    const tokenPayload = await this.validateToken(request);
    const authorization = this.createAuthorization(
      tokenPayload,
      requiredPermission,
      requestParameters
    );

    (request as any)["identity"] = authorization.identity;
    return this.validateAuthorization(
      authorization,
      requiredPermission,
      requestParameters
    );
  }
}
