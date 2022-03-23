"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const _1 = require(".");
test('resolves boolean permission', () => {
    const permission = (0, _1.resolvePermissions)({ permissionsResolver: true });
    expect(permission).toBeTruthy();
});
test('resolves functional permission', () => {
    const truthyPermission = (0, _1.resolvePermissions)({
        permissionsResolver: ({ user }) => user.id === '1x',
        user: {
            name: 'Johnny',
            email: 'johnny@cash.io',
            passwordDigest: '1xxx1',
            id: '1x',
            role: 'USER',
            createdAt: (0, dayjs_1.default)().toDate(),
            updatedAt: (0, dayjs_1.default)().toDate()
        }
    });
    expect(truthyPermission).toBeTruthy();
    const falsyPermission = (0, _1.resolvePermissions)({
        permissionsResolver: ({ user }) => user.id === 'anythingelse1',
        user: {
            name: 'Johnny',
            email: 'johnny@cash.io',
            passwordDigest: '1xxx1',
            id: '1x',
            role: 'USER',
            createdAt: (0, dayjs_1.default)().toDate(),
            updatedAt: (0, dayjs_1.default)().toDate()
        }
    });
    expect(falsyPermission).toBeFalsy();
});
