"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOperationsNames = void 0;
const pluralize_1 = __importDefault(require("pluralize"));
const capitalize_1 = __importDefault(require("../capitalize"));
const getOperationsNames = (name) => {
    return {
        findAll: (0, pluralize_1.default)(name),
        findOne: `${name}ById`,
        create: `create${(0, capitalize_1.default)(name)}`,
        update: `update${(0, capitalize_1.default)(name)}`,
        delete: `delete${(0, capitalize_1.default)(name)}`
    };
};
exports.getOperationsNames = getOperationsNames;
