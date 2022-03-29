"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const capitalize_1 = __importDefault(require("../../utils/capitalize"));
const config_1 = __importDefault(require("../../utils/config"));
const zod_1 = require("zod");
const validation_1 = require("../../utils/validation");
const operations_1 = require("../../utils/operations");
const auth_1 = require("../../utils/auth");
const autoCreateMutation = ({ t, objectName, objectDefinition }) => {
    const CREATE_NAME = (0, operations_1.getOperationsNames)(objectName).create;
    t.field(CREATE_NAME, {
        type: (0, capitalize_1.default)(objectName),
        args: {
            data: (0, nexus_1.arg)({ type: 'JSON' })
        },
        authorize(_parents, _args, context) {
            var _a, _b;
            if (!((_a = objectDefinition.permissions) === null || _a === void 0 ? void 0 : _a.create))
                return true;
            return (0, auth_1.resolvePermissions)({
                permissionsResolver: (_b = objectDefinition.permissions) === null || _b === void 0 ? void 0 : _b.create,
                user: context.user
            });
        },
        resolve(_parents, args, context) {
            var _a;
            const fieldsValidation = (0, validation_1.buildFieldsValidation)(objectDefinition);
            const dataValidation = zod_1.z.object(fieldsValidation);
            const prismaObject = (_a = context.prisma) === null || _a === void 0 ? void 0 : _a[objectName];
            return prismaObject.create({
                data: dataValidation.parse(args.data),
                where: objectDefinition.whereExtension && objectDefinition.whereExtension({ user: context.user })
            });
        }
    });
};
const autoUpdateMutation = ({ t, objectName, objectDefinition }) => {
    const UPDATE_NAME = (0, operations_1.getOperationsNames)(objectName).update;
    t.field(UPDATE_NAME, {
        type: (0, capitalize_1.default)(objectName),
        args: {
            id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            data: (0, nexus_1.arg)({ type: 'JSON' })
        },
        authorize(_parents, args, context) {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function* () {
                if (!((_a = objectDefinition.permissions) === null || _a === void 0 ? void 0 : _a.update))
                    return true;
                const prismaObject = (_b = context.prisma) === null || _b === void 0 ? void 0 : _b[objectName];
                const entity = yield prismaObject.findFirst({
                    where: Object.assign({ id: args.id }, (objectDefinition.whereExtension && objectDefinition.whereExtension({ user: context.user })))
                });
                return (0, auth_1.resolvePermissions)({
                    permissionsResolver: (_c = objectDefinition.permissions) === null || _c === void 0 ? void 0 : _c.update,
                    user: context.user,
                    entity: entity
                });
            });
        },
        resolve(_parents, args, context) {
            var _a;
            const fieldsValidation = (0, validation_1.buildFieldsValidation)(objectDefinition);
            const dataValidation = zod_1.z.object(fieldsValidation);
            const prismaObject = (_a = context.prisma) === null || _a === void 0 ? void 0 : _a[objectName];
            return prismaObject.update({
                where: {
                    id: args.id
                },
                data: dataValidation.parse(args.data)
            });
        }
    });
};
const autoDeleteMutation = ({ t, objectName, objectDefinition }) => {
    const DELETE_NAME = (0, operations_1.getOperationsNames)(objectName).delete;
    t.field(DELETE_NAME, {
        type: (0, capitalize_1.default)(objectName),
        args: {
            id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)())
        },
        authorize(_parents, args, context) {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function* () {
                if (!((_a = objectDefinition.permissions) === null || _a === void 0 ? void 0 : _a.delete))
                    return true;
                const prismaObject = (_b = context.prisma) === null || _b === void 0 ? void 0 : _b[objectName];
                const entity = yield prismaObject.findUnique({
                    where: Object.assign({ id: args.id }, (objectDefinition.whereExtension && objectDefinition.whereExtension({ user: context.user })))
                });
                return (0, auth_1.resolvePermissions)({
                    permissionsResolver: (_c = objectDefinition.permissions) === null || _c === void 0 ? void 0 : _c.delete,
                    user: context.user,
                    entity: entity
                });
            });
        },
        resolve(_parents, args, context) {
            var _a;
            const prismaObject = (_a = context.prisma) === null || _a === void 0 ? void 0 : _a[objectName];
            return prismaObject.delete({
                where: {
                    id: args.id
                }
            });
        }
    });
};
const buildAutoMutations = (t) => {
    return Object.entries(config_1.default.schema).map(([objectName, objectDefinition]) => {
        autoCreateMutation({ t, objectName, objectDefinition });
        autoUpdateMutation({ t, objectName, objectDefinition });
        autoDeleteMutation({ t, objectName, objectDefinition });
    });
};
exports.default = buildAutoMutations;
