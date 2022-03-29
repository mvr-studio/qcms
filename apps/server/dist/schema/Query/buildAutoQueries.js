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
const pluralize_1 = __importDefault(require("pluralize"));
const capitalize_1 = __importDefault(require("../../utils/capitalize"));
const config_1 = __importDefault(require("../../utils/config"));
const auth_1 = require("../../utils/auth");
const operations_1 = require("../../utils/operations");
const schema = config_1.default.schema;
const getRelations = (objectDefinition) => {
    return Object.fromEntries(objectDefinition.fields
        .filter((field) => field.model)
        .map((field) => [field.relation === 'belongsTo' ? field.name : (0, pluralize_1.default)(field.name), true]));
};
const autoFindAllQuery = ({ t, objectName, objectDefinition }) => {
    const LIST_LENGTH = 10;
    const ObjectRelayed = (0, nexus_1.objectType)({
        name: `${(0, capitalize_1.default)((0, pluralize_1.default)(objectName))}Relayed`,
        definition(t) {
            t.field('pageInfo', { type: 'PageInfo' });
            t.list.field('edges', { type: (0, capitalize_1.default)(objectName) });
        }
    });
    const FIND_ALL_NAME = (0, operations_1.getOperationsNames)(objectName).findAll;
    t.field(FIND_ALL_NAME, {
        type: ObjectRelayed,
        args: {
            where: (0, nexus_1.arg)({ type: 'JSON' }),
            orderBy: (0, nexus_1.arg)({ type: 'JSON' }),
            skip: (0, nexus_1.intArg)({ default: 0 }),
            take: (0, nexus_1.intArg)({ default: LIST_LENGTH })
        },
        authorize(_parents, _args, context) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                if (!((_a = objectDefinition.permissions) === null || _a === void 0 ? void 0 : _a.findAll))
                    return true;
                return (0, auth_1.resolvePermissions)({
                    permissionsResolver: (_b = objectDefinition.permissions) === null || _b === void 0 ? void 0 : _b.findAll,
                    user: context.user
                });
            });
        },
        resolve(_parents, args, context) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                const SKIP = args.skip || 0;
                const TAKE = args.take || LIST_LENGTH;
                const prismaObject = (_a = context.prisma) === null || _a === void 0 ? void 0 : _a[objectName];
                const objectsCount = yield prismaObject.count();
                const edges = yield prismaObject.findMany({
                    where: Object.assign(Object.assign({}, args.where), (objectDefinition.whereExtension && objectDefinition.whereExtension({ user: context.user }))),
                    orderBy: args.orderBy,
                    skip: args.skip,
                    take: args.take,
                    include: getRelations(objectDefinition)
                });
                const pageInfo = {
                    hasNextPage: SKIP + TAKE < objectsCount,
                    hasPreviousPage: SKIP > 0,
                    startCursor: args.skip,
                    endCursor: SKIP + TAKE,
                    endPage: Math.ceil(objectsCount / TAKE),
                    currentPage: Math.ceil(objectsCount - SKIP / TAKE)
                };
                return {
                    edges,
                    pageInfo
                };
            });
        }
    });
};
const autoFindOneQuery = ({ t, objectName, objectDefinition }) => {
    const FIND_ONE_NAME = (0, operations_1.getOperationsNames)(objectName).findOne;
    t.nullable.field(FIND_ONE_NAME, {
        type: (0, capitalize_1.default)(objectName),
        args: {
            id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)())
        },
        authorize(_parents, args, context) {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function* () {
                if (!((_a = objectDefinition.permissions) === null || _a === void 0 ? void 0 : _a.findOne))
                    return true;
                const prismaObject = (_b = context.prisma) === null || _b === void 0 ? void 0 : _b[objectName];
                const entity = yield prismaObject.findUnique({
                    where: {
                        id: args.id
                    }
                });
                return (0, auth_1.resolvePermissions)({
                    permissionsResolver: (_c = objectDefinition.permissions) === null || _c === void 0 ? void 0 : _c.findOne,
                    user: context.user,
                    entity
                });
            });
        },
        resolve(_parents, args, context) {
            var _a;
            const prismaObject = (_a = context.prisma) === null || _a === void 0 ? void 0 : _a[objectName];
            return prismaObject.findFirst({
                where: Object.assign({ id: args.id }, (objectDefinition.whereExtension && objectDefinition.whereExtension({ user: context.user }))),
                include: getRelations(objectDefinition)
            });
        }
    });
};
const buildAutoQueries = (t) => {
    return Object.entries(schema).map(([objectName, objectDefinition]) => {
        autoFindAllQuery({ t, objectName, objectDefinition });
        autoFindOneQuery({ t, objectName, objectDefinition });
    });
};
exports.default = buildAutoQueries;
