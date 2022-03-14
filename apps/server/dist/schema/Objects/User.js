"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const pluralize_1 = __importDefault(require("pluralize"));
const capitalize_1 = __importDefault(require("../../utils/capitalize"));
const prismaSchema_1 = require("../../utils/prismaSchema");
const User = (0, nexus_1.objectType)({
    name: 'User',
    definition(t) {
        t.nonNull.string('id');
        t.string('name');
        t.nonNull.string('email');
        t.field('role', { type: 'Role' });
        (0, prismaSchema_1.getUserRelations)().map(([objectName]) => {
            t.field((0, pluralize_1.default)(objectName), { type: (0, capitalize_1.default)(objectName) });
        });
        t.nonNull.date('createdAt');
        t.nonNull.date('updatedAt');
    }
});
exports.default = User;
