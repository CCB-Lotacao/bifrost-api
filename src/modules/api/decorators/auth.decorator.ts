import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Permission } from "../../../domain/enums";
import { AuthGuard } from "../guards";

export const REQUIRED_PERMISSION_KEY = "required_permission";

export const Auth = (requiredPermission?: Permission | Permission[]) => {
  return applyDecorators(
    SetMetadata(REQUIRED_PERMISSION_KEY, requiredPermission),
    UseGuards(AuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: "Unauthorized" }),
    ApiForbiddenResponse({ description: "Forbidden" })
  );
};
