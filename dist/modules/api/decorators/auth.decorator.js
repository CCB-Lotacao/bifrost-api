"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.REQUIRED_PERMISSION_KEY = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../guards");
exports.REQUIRED_PERMISSION_KEY = "required_permission";
const Auth = (requiredPermission) => {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(exports.REQUIRED_PERMISSION_KEY, requiredPermission), (0, common_1.UseGuards)(guards_1.AuthGuard), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiUnauthorizedResponse)({ description: "Unauthorized" }), (0, swagger_1.ApiForbiddenResponse)({ description: "Forbidden" }));
};
exports.Auth = Auth;
