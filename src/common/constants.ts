import { Permission, UserRole } from "../domain/enums";

export const KnownHeaders = {
  Version: "x-ccb-api-version",
};

export const PermissionByRole = {
  [UserRole.SystemAdmin]: [Permission.WriteUser, Permission.ReadUser],
  [UserRole.Assistant]: [Permission.WriteUser, Permission.ReadUser],
  [UserRole.Brotherhood]: [Permission.ReadUser],
};
