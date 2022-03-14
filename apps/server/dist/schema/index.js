"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GQLDate = void 0;
const nexus_1 = require("nexus");
const Objects_1 = __importDefault(require("./Objects"));
const Query_1 = __importDefault(require("./Query"));
const Mutation_1 = __importDefault(require("./Mutation"));
const graphql_type_json_1 = __importDefault(require("graphql-type-json"));
const graphql_iso_date_1 = require("graphql-iso-date");
exports.GQLDate = (0, nexus_1.asNexusMethod)(graphql_iso_date_1.GraphQLDate, 'date');
exports.default = (0, nexus_1.makeSchema)({
    types: [Query_1.default, Mutation_1.default, ...Objects_1.default, graphql_type_json_1.default, exports.GQLDate],
    outputs: {
        schema: __dirname + '/../schema.graphql',
        typegen: __dirname + '/generated/nexus.ts'
    },
    contextType: {
        module: require.resolve('../context'),
        export: 'Context'
    },
    plugins: [(0, nexus_1.fieldAuthorizePlugin)()]
});
