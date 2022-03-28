"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findup = require('findup-sync');
const constants_1 = require("../constants");
const configPath = findup(constants_1.CONFIG_FILES, { cwd: __dirname });
if (!configPath)
    throw new Error('Configuration file was not found');
console.info(`[QCMS] Using config file: ${configPath}`);
const config = require(configPath);
exports.default = config;
