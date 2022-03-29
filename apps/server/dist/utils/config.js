"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findup = require('findup-sync');
const constants_1 = require("../constants");
let configPath;
const fixedConfigFilePath = process.env.QCMS_FIXED_CONFIG_PATH;
if (fixedConfigFilePath) {
    configPath = fixedConfigFilePath;
}
else {
    configPath = findup(constants_1.CONFIG_FILES, { cwd: __dirname });
}
if (!configPath)
    throw new Error('Configuration file was not found');
console.info(`[QCMS] Using config file: ${configPath}`);
const config = require(configPath);
exports.default = config;
