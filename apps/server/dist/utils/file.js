"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.readFile = exports.cwdPath = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const write = require('write');
const cwdPath = (filePath) => path_1.default.join(process.cwd(), filePath);
exports.cwdPath = cwdPath;
const getFilePath = (relPath) => path_1.default.join(__dirname, relPath);
const readFile = (relPath) => {
    return fs_1.default.readFileSync(getFilePath(relPath), { encoding: 'utf8' });
};
exports.readFile = readFile;
const writeFile = (relPath, content) => {
    return write.sync(getFilePath(relPath), content);
};
exports.writeFile = writeFile;
