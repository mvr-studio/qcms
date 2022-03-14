"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const cors = require('micro-cors')({ origin: 'http://localhost:3050' });
const apollo_server_micro_1 = require("apollo-server-micro");
const micro_1 = require("micro");
const apollo_server_core_1 = require("apollo-server-core");
const schema_1 = __importDefault(require("./schema"));
const context_1 = require("./context");
const zod_1 = require("zod");
const apollo_server_plugin_http_headers_1 = __importDefault(require("apollo-server-plugin-http-headers"));
const micro_cookie_1 = __importDefault(require("micro-cookie"));
const apolloServer = new apollo_server_micro_1.ApolloServer({
    schema: schema_1.default,
    plugins: [
        (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)(),
        apollo_server_plugin_http_headers_1.default
    ],
    context: context_1.context,
    formatError(error) {
        if (error.originalError instanceof zod_1.ZodError) {
            const zodError = JSON.parse(error.message)[0];
            return new apollo_server_core_1.UserInputError(zodError.message, {
                argumentName: `data.${zodError.path}`
            });
        }
        return error;
    }
});
module.exports = apolloServer.start().then(() => {
    const handler = apolloServer.createHandler();
    return cors((0, micro_cookie_1.default)((req, res) => req.method === 'OPTIONS' ? (0, micro_1.send)(res, 200, 'ok') : handler(req, res)));
});
