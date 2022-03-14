"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const constants_1 = require("../../constants");
const Role = (0, nexus_1.enumType)({
    name: 'Role',
    members: Object.keys(constants_1.USER_ROLES)
});
exports.default = Role;
