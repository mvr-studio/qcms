"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const find_up_1 = __importDefault(require("find-up"));
const constants_1 = require("../constants");
const configPath = find_up_1.default.sync(constants_1.CONFIG_FILES, { cwd: __dirname });
if (!configPath)
    throw new Error('Configuration file was not found');
console.info(`[QCMS] Using config file: ${configPath}`);
const config = require(configPath);
exports.default = config;
