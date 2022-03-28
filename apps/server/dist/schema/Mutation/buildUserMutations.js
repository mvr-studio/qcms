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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const constants_1 = require("../../constants");
const auth_1 = require("../../utils/auth");
const logInUser = (t) => {
    t.field('logInUser', {
        type: 'AuthResponse',
        args: {
            email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            password: (0, nexus_1.nonNull)((0, nexus_1.stringArg)())
        },
        resolve(_parent, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield context.prisma.user.findUnique({
                    where: {
                        email: args.email
                    }
                });
                if (!user)
                    throw new Error('Unable to log in');
                const isMatching = bcryptjs_1.default.compareSync(args.password, (user === null || user === void 0 ? void 0 : user.passwordDigest) || '');
                if (!isMatching)
                    throw new Error('Unable to log in');
                const signedJWT = (0, auth_1.getSignedJWT)(user);
                (0, auth_1.setAuthCookie)({ context, signedJWT });
                return {
                    jwt: signedJWT
                };
            });
        }
    });
};
const logOutUser = (t) => {
    t.field('logOutUser', {
        type: 'JSON',
        resolve(_parent, _args, context) {
            (0, auth_1.unsetAuthCookie)({ context });
            return {
                success: true
            };
        }
    });
};
const registerUser = (t) => {
    t.field('registerUser', {
        type: 'AuthResponse',
        args: {
            email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            password: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            name: (0, nexus_1.stringArg)()
        },
        resolve(_parent, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const newUser = yield context.prisma.user.create({
                    data: {
                        email: args.email,
                        passwordDigest: bcryptjs_1.default.hashSync(args.password, 3),
                        name: args.name
                    }
                });
                const signedJWT = (0, auth_1.getSignedJWT)(newUser);
                (0, auth_1.setAuthCookie)({ context, signedJWT });
                return {
                    jwt: signedJWT
                };
            });
        }
    });
};
const createUser = (t) => {
    t.field('createUser', {
        type: 'User',
        args: {
            data: (0, nexus_1.arg)({ type: 'JSON' })
        },
        authorize(_root, _args, context) {
            var _a;
            return ((_a = context.user) === null || _a === void 0 ? void 0 : _a.role) === constants_1.USER_ROLES.ADMIN;
        },
        resolve(_parent, args, context) {
            return context.prisma.user.create({
                data: args.data
            });
        }
    });
};
const updateUser = (t) => {
    t.field('updateUser', {
        type: 'User',
        args: {
            id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            data: (0, nexus_1.arg)({ type: 'JSON' })
        },
        authorize(_root, _args, context) {
            var _a;
            return ((_a = context.user) === null || _a === void 0 ? void 0 : _a.role) === constants_1.USER_ROLES.ADMIN;
        },
        resolve(_parents, args, context) {
            return context.prisma.user.update({
                where: {
                    id: args.id
                },
                data: args.data
            });
        }
    });
};
const deleteUser = (t) => {
    t.field('deleteUser', {
        type: 'User',
        args: {
            id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)())
        },
        authorize(_root, _args, context) {
            var _a;
            return ((_a = context.user) === null || _a === void 0 ? void 0 : _a.role) === constants_1.USER_ROLES.ADMIN;
        },
        resolve(_parents, args, context) {
            return context.prisma.user.delete({
                where: {
                    id: args.id
                }
            });
        }
    });
};
const buildUserMutations = (t) => {
    logInUser(t);
    logOutUser(t);
    registerUser(t);
    createUser(t);
    updateUser(t);
    deleteUser(t);
};
exports.default = buildUserMutations;
