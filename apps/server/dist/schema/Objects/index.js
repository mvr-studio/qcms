"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AutoObjects_1 = __importDefault(require("./AutoObjects"));
const User_1 = __importDefault(require("./User"));
const Role_1 = __importDefault(require("./Role"));
const AuthResponse_1 = __importDefault(require("./AuthResponse"));
const CmsInfo_1 = __importDefault(require("./CmsInfo"));
const PageInfo_1 = __importDefault(require("./PageInfo"));
exports.default = [...AutoObjects_1.default, User_1.default, Role_1.default, AuthResponse_1.default, CmsInfo_1.default, PageInfo_1.default];
