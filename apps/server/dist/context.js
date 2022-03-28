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
exports.context = void 0;
const prisma_1 = __importDefault(require("./utils/prisma"));
const auth_1 = require("./utils/auth");
const context = ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let user = null;
    const authHeader = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a['Q-AUTHENTICATION']) || req.headers.authorization;
    const session = (authHeader && authHeader !== 'null' && (0, auth_1.decodeToken)(authHeader)) || { data: null };
    try {
        user =
            ((session === null || session === void 0 ? void 0 : session.data) &&
                (yield prisma_1.default.user.findUnique({
                    where: {
                        id: (_b = session.data) === null || _b === void 0 ? void 0 : _b.id
                    }
                }))) ||
                null;
    }
    catch (_c) { }
    return {
        prisma: prisma_1.default,
        session,
        user,
        setCookies: [],
        setHeaders: []
    };
});
exports.context = context;
