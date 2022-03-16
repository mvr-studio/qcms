"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const cors = require('micro-cors')({
    origin: process.env.QCMS_CORS_ORIGIN || 'http://localhost:3050'
});
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
const startServer = apolloServer.start();
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield startServer;
        const apolloHandler = yield apolloServer.createHandler({
            path: process.env.QCMS_PATH || '/api/graphql'
        });
        yield cors((0, micro_cookie_1.default)(((req, res) => {
            req.method === 'OPTIONS'
                ? (0, micro_1.send)(res, 200, 'ok')
                : apolloHandler(req, res);
        })(req, res)));
    });
}
exports.default = handler;
module.exports = handler;
