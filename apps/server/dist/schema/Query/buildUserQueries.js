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
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const constants_1 = require("../../constants");
const me = (t) => {
    t.field('me', {
        type: 'User',
        authorize(_root, _args, context) {
            var _a;
            return !!((_a = context.session) === null || _a === void 0 ? void 0 : _a.data);
        },
        resolve(_parents, _args, context) {
            var _a, _b;
            return context.prisma.user.findUnique({
                where: {
                    email: (_b = (_a = context.session) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.email
                }
            });
        }
    });
};
const userById = (t) => {
    t.field('userById', {
        type: 'User',
        args: {
            id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)())
        },
        authorize(_root, _args, context) {
            var _a;
            return ((_a = context.user) === null || _a === void 0 ? void 0 : _a.role) === constants_1.USER_ROLES.ADMIN;
        },
        resolve(_parents, args, context) {
            return context.prisma.user.findUnique({
                where: {
                    id: args.id
                }
            });
        }
    });
};
const users = (t) => {
    const LIST_LENGTH = 10;
    const UsersRelayed = (0, nexus_1.objectType)({
        name: 'UsersRelayed',
        definition(t) {
            t.field('pageInfo', { type: 'PageInfo' });
            t.list.field('edges', { type: 'User' });
        }
    });
    t.field('users', {
        type: UsersRelayed,
        args: {
            where: (0, nexus_1.arg)({ type: 'JSON' }),
            orderBy: (0, nexus_1.arg)({ type: 'JSON' }),
            skip: (0, nexus_1.intArg)({ default: 0 }),
            take: (0, nexus_1.intArg)({ default: LIST_LENGTH })
        },
        authorize(_root, _args, context) {
            var _a;
            return ((_a = context.user) === null || _a === void 0 ? void 0 : _a.role) === constants_1.USER_ROLES.ADMIN;
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        resolve(_parents, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const SKIP = args.skip || 0;
                const TAKE = args.take || LIST_LENGTH;
                const usersCount = yield context.prisma.user.count();
                const edges = yield context.prisma.user.findMany({
                    where: args.where,
                    orderBy: args.orderBy,
                    skip: args.skip || 0,
                    take: args.take || LIST_LENGTH
                });
                const pageInfo = {
                    hasNextPage: SKIP + TAKE < usersCount,
                    hasPreviousPage: SKIP > 0,
                    startCursor: args.skip,
                    endCursor: SKIP + TAKE,
                    endPage: Math.ceil(usersCount / TAKE),
                    currentPage: Math.ceil(usersCount - SKIP / TAKE)
                };
                return {
                    edges,
                    pageInfo
                };
            });
        }
    });
};
const buildAutoQueries = (t) => {
    me(t);
    userById(t);
    users(t);
};
exports.default = buildAutoQueries;
