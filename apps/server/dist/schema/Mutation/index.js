"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const buildAutoMutations_1 = __importDefault(require("./buildAutoMutations"));
const buildUserMutations_1 = __importDefault(require("./buildUserMutations"));
const Mutation = (0, nexus_1.objectType)({
    name: 'Mutation',
    definition(t) {
        (0, buildAutoMutations_1.default)(t);
        (0, buildUserMutations_1.default)(t);
    }
});
exports.default = Mutation;
