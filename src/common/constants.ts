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
    Permission.WriteChurch,
    Permission.ReadChurch,
  ],
  [UserRole.Assistant]: [
    Permission.WriteUser,
    Permission.ReadUser,
    Permission.ReadVehicle,
    Permission.WriteVehicle,
    Permission.WriteChurch,
    Permission.ReadChurch,
  ],
  [UserRole.Brotherhood]: [
    Permission.ReadUser,
    Permission.ReadVehicle,
    Permission.ReadChurch,
  ],
};
