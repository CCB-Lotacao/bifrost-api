"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultHeaders = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../common/constants");
const DefaultHeaders = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiHeader)({ name: constants_1.KnownHeaders.Version, example: "1", required: false }));
};
exports.DefaultHeaders = DefaultHeaders;
