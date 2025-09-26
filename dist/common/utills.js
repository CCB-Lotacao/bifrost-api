"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUndefinedFields = void 0;
const removeUndefinedFields = (obj) => {
    return Object.keys(obj).reduce((acc, objKey) => {
        if (obj[objKey] !== undefined) {
            acc[objKey] = obj[objKey];
        }
        return acc;
    }, {});
};
exports.removeUndefinedFields = removeUndefinedFields;
