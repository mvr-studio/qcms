"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSchema = exports.getUserRelations = void 0;
const file_1 = require("./file");
const config_1 = __importDefault(require("./config"));
const capitalize_1 = __importDefault(require("./capitalize"));
const dedent_1 = __importDefault(require("dedent"));
const pluralize_1 = __importDefault(require("pluralize"));
const dateFieldsTemplate = (0, dedent_1.default) `
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
`;
const getSchemaTemplate = () => {
    return (0, file_1.readFile)('../prisma/schema.template.prisma');
};
const getFieldTemplate = (field) => {
    const typedDefault = field.type === 'String'
        ? `@default("${field.default}")`
        : `@default(${field.default})`;
    const defaultProperty = field.default ? typedDefault : '';
    return `${field.name} ${field.type}${(field === null || field === void 0 ? void 0 : field.required) ? '' : '?'} ${defaultProperty}`;
};
const getRelationTemplate = (field) => {
    switch (field.relation) {
        case 'belongsTo':
            return `${field.name} ${field.model}${(field === null || field === void 0 ? void 0 : field.required) ? '' : '?'} @relation(fields: [${field.name}Id], references: [id])\n${field.name}Id String${(field === null || field === void 0 ? void 0 : field.required) ? '' : '?'}`;
        case 'hasMany':
            return `${(0, pluralize_1.default)(field.name)}  ${field.model}[]`;
    }
};
const buildField = (field) => {
    const defaultTemplate = getFieldTemplate(field);
    switch (field.type) {
        case 'String':
            return defaultTemplate;
        case 'Json':
            return defaultTemplate;
        case 'Int':
            return defaultTemplate;
        case 'Relation':
            return getRelationTemplate(field);
        default:
            throw new Error('Unknown field type');
    }
};
const buildModels = () => {
    return Object.entries(config_1.default.schema)
        .map(([objectName, objectProperties]) => (0, dedent_1.default) `
    model ${(0, capitalize_1.default)(objectName)} {
      id   String @id @default(uuid())
      ${objectProperties.fields.map((field) => buildField(field)).join('\n')}
      ${dateFieldsTemplate}
    }
  `)
        .join('\n');
};
const getUserRelations = () => 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
Object.entries(config_1.default.schema).filter(([_, objectDefinition]) => objectDefinition.fields.some((field) => field.model === 'User'));
exports.getUserRelations = getUserRelations;
const buildUserRelations = () => {
    return (0, exports.getUserRelations)()
        .map(([objectName]) => `${(0, pluralize_1.default)(objectName)} ${(0, capitalize_1.default)(objectName)}[]`)
        .join('\n');
};
const buildSchema = () => {
    const schemaTemplate = getSchemaTemplate();
    const modelsTemplate = buildModels();
    const userRelations = buildUserRelations();
    const schema = schemaTemplate
        .replace('//AUTO', modelsTemplate)
        .replace('//USER_RELATIONS', userRelations);
    return (0, file_1.writeFile)('../prisma/schema.prisma', schema);
};
exports.buildSchema = buildSchema;
