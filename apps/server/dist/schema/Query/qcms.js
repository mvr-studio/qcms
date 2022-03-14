"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pluralize_1 = __importDefault(require("pluralize"));
const constants_1 = require("../../constants");
const config_1 = __importDefault(require("../../utils/config"));
const operations_1 = require("../../utils/operations");
const qcms = (t) => {
    t.field('qcms', {
        type: 'CmsInfo',
        authorize(_root, _args, context) {
            var _a;
            return ((_a = context.user) === null || _a === void 0 ? void 0 : _a.role) === constants_1.USER_ROLES.ADMIN;
        },
        resolve() {
            const schema = Object.fromEntries(Object.entries(config_1.default.schema).map(([objectName, objectDefinition]) => [
                objectName,
                Object.assign({ plural: (0, pluralize_1.default)(objectName), operations: (0, operations_1.getOperationsNames)(objectName) }, objectDefinition)
            ]));
            schema['user'] = {
                plural: 'users',
                operations: (0, operations_1.getOperationsNames)('user'),
                fields: [
                    { name: 'name', type: 'String' },
                    { name: 'email', type: 'String' }
                ]
            };
            return {
                schema
            };
        }
    });
};
exports.default = qcms;
