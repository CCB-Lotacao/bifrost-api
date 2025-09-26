import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Permission } from "../../../domain/enums";
import { REQUIRED_PERMISSION_KEY } from "../decorators";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.get<Permission | Permission[]>(
      REQUIRED_PERMISSION_KEY,
      context.getHandler()
    );

    if (!requiredPermission) {
      return true;
    }

    return true;
  }
}
