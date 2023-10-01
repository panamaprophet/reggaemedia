"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOutputFile = exports.isOutputExist = void 0;
const path_1 = __importDefault(require("path"));
const OUTPUT_COMMAND = '--outputs-file';
const isOutputExist = (script) => script.split(' ').includes(OUTPUT_COMMAND);
exports.isOutputExist = isOutputExist;
const getOutputFile = (command) => {
    const commands = command.split(' ');
    const fileIndex = commands.findIndex((item) => OUTPUT_COMMAND === item);
    return path_1.default.basename(commands[fileIndex + 1]);
};
exports.getOutputFile = getOutputFile;
