"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const buildAutoQueries_1 = __importDefault(require("./buildAutoQueries"));
const buildUserQueries_1 = __importDefault(require("./buildUserQueries"));
const qcms_1 = __importDefault(require("./qcms"));
const Query = (0, nexus_1.objectType)({
    name: 'Query',
    definition(t) {
        (0, buildUserQueries_1.default)(t);
        (0, buildAutoQueries_1.default)(t);
        (0, qcms_1.default)(t);
    }
});
exports.default = Query;
