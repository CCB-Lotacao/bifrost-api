import { Permission, UserRole } from "../domain/enums";

export const KnownHeaders = {
  Version: "x-ccb-api-version",
};

export const PermissionByRole = {
  [UserRole.SystemAdmin]: [
    Permission.WriteUser,
    Permission.ReadUser,
    Permission.WriteVehicle,
    Permission.ReadVehicle,
  ],
  [UserRole.Assistant]: [
    Permission.WriteUser,
    Permission.ReadUser,
    Permission.ReadVehicle,
    Permission.WriteVehicle,
  ],
  [UserRole.Brotherhood]: [Permission.ReadUser, Permission.ReadVehicle],
};
