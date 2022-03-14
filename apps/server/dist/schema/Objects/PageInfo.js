"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const PageInfo = (0, nexus_1.objectType)({
    name: 'PageInfo',
    definition(t) {
        t.nonNull.boolean('hasNextPage');
        t.nonNull.boolean('hasPreviousPage');
        t.nonNull.int('startCursor');
        t.nonNull.int('endCursor');
        t.nonNull.int('endPage');
        t.nonNull.int('currentPage');
    }
});
exports.default = PageInfo;
