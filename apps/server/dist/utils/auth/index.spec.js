"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
test('resolves boolean permission', () => {
    const permission = (0, _1.resolvePermissions)({ permissionsResolver: true });
    expect(permission).toBeTruthy();
});
test('resolves functional permission', () => {
    const truthyPermissio = (0, _1.resolvePermissions)({
        permissionsResolver: ({ user }) => user.id === 1,
        user: { id: 1 }
    });
    expect(truthyPermissio).toBeTruthy();
    const falsyPermission = (0, _1.resolvePermissions)({
        permissionsResolver: ({ user }) => user.id === 2,
        user: { id: 1 }
    });
    expect(falsyPermission).toBeFalsy();
});
