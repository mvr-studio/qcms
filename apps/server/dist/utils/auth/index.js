"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsetAuthCookie = exports.setAuthCookie = exports.getSignedJWT = exports.resolvePermissions = exports.decodeToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dayjs_1 = __importDefault(require("dayjs"));
const constants_1 = require("../../constants");
const decodeToken = (authHeader) => {
    const jwtToken = authHeader.replace('Bearer ', '');
    if (!jwtToken)
        return null;
    const decodedUser = jsonwebtoken_1.default.verify(jwtToken, process.env.QCMS_JWT_SECRET || 'sadge');
    const exp = decodedUser.exp;
    const expirationDate = (0, dayjs_1.default)(exp * 1000);
    if ((0, dayjs_1.default)().isBefore(expirationDate))
        return decodedUser;
    return null;
};
exports.decodeToken = decodeToken;
const resolvePermissions = ({ permissionsResolver, entity, user }) => {
    switch (typeof permissionsResolver) {
        case 'boolean':
            return permissionsResolver;
        case 'function':
            return permissionsResolver({ user, entity });
    }
};
exports.resolvePermissions = resolvePermissions;
const getSignedJWT = (data) => jsonwebtoken_1.default.sign({ data }, process.env.QCMS_JWT_SECRET || 'sadge', {
    expiresIn: '7d'
});
exports.getSignedJWT = getSignedJWT;
const setAuthCookie = ({ context, signedJWT }) => {
    return context.setCookies.push({
        name: constants_1.AUTH_COOKIE_NAME,
        value: `Bearer ${signedJWT}`,
        options: {
            expires: (0, dayjs_1.default)().add(7, 'days').toDate(),
            httpOnly: true,
            sameSite: 'none'
        }
    });
};
exports.setAuthCookie = setAuthCookie;
const unsetAuthCookie = ({ context }) => {
    return context.setCookies.push({
        name: constants_1.AUTH_COOKIE_NAME,
        value: '',
        options: {
            httpOnly: true,
            sameSite: 'none'
        }
    });
};
exports.unsetAuthCookie = unsetAuthCookie;
