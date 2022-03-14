"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const capitalize_1 = __importDefault(require("../../utils/capitalize"));
const config_1 = __importDefault(require("../../utils/config"));
const mapFieldType = (fieldType) => {
    switch (fieldType) {
        case 'Json':
            return 'JSON';
        default:
            return fieldType;
    }
};
const getFieldDefinition = (t, field) => {
    if (field.type === 'Relation')
        return (field === null || field === void 0 ? void 0 : field.relation) === 'belongsTo'
            ? t.field(field.name, { type: field === null || field === void 0 ? void 0 : field.model })
            : t.list.field(field.name, { type: field === null || field === void 0 ? void 0 : field.model });
    return t.field(field.name, { type: mapFieldType(field.type) });
};
const buildObjects = (schema) => {
    return Object.entries(schema).map(([objectName, objectDefinition]) => (0, nexus_1.objectType)({
        name: (0, capitalize_1.default)(objectName),
        definition(t) {
            t.nonNull.string('id');
            objectDefinition.fields.map((field) => getFieldDefinition(t, field));
            t.nonNull.date('createdAt');
            t.nonNull.date('updatedAt');
        }
    }));
};
exports.default = buildObjects(config_1.default.schema);
