"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionByRole = exports.KnownHeaders = void 0;
const enums_1 = require("../domain/enums");
exports.KnownHeaders = {
    Version: "x-ccb-api-version",
};
exports.PermissionByRole = {
    [enums_1.UserRole.SystemAdmin]: [
        enums_1.Permission.WriteUser,
        enums_1.Permission.ReadUser,
        enums_1.Permission.WriteVehicle,
        enums_1.Permission.ReadVehicle,
    ],
    [enums_1.UserRole.Assistant]: [
        enums_1.Permission.WriteUser,
        enums_1.Permission.ReadUser,
        enums_1.Permission.ReadVehicle,
        enums_1.Permission.WriteVehicle,
    ],
    [enums_1.UserRole.Brotherhood]: [enums_1.Permission.ReadUser, enums_1.Permission.ReadVehicle],
};
