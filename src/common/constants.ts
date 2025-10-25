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
    Permission.WriteCommon,
    Permission.ReadCommon,
  ],
  [UserRole.Assistant]: [
    Permission.WriteUser,
    Permission.ReadUser,
    Permission.ReadVehicle,
    Permission.WriteVehicle,
    Permission.WriteCommon,
    Permission.ReadCommon,
  ],
  [UserRole.Brotherhood]: [
    Permission.ReadUser,
    Permission.ReadVehicle,
    Permission.ReadCommon,
  ],
};
