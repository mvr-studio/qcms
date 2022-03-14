"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const AuthResponse = (0, nexus_1.objectType)({
    name: 'AuthResponse',
    definition(t) {
        t.nonNull.string('jwt');
    }
});
exports.default = AuthResponse;
