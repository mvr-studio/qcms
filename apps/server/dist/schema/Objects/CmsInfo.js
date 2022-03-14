"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const CmsInfo = (0, nexus_1.objectType)({
    name: 'CmsInfo',
    definition(t) {
        t.field('schema', {
            type: 'JSON'
        });
    }
});
exports.default = CmsInfo;
