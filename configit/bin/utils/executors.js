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
exports.executeCommandWithLogsReader = exports.getCommandOutputs = exports.executeCommandWithFileReader = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const CALL_DIRECTORY = process.cwd();
const convertCamelCaseToSnakeCase = (text) => {
    const letters = text.trim();
    let result = '';
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        if (letter === letter.toUpperCase()) {
            result += `_${letter}`;
        }
        else {
            result += letter.toUpperCase();
        }
    }
    return result;
};
const getFormattedVariable = (text) => {
    const [key, value] = text.split('.')[1].split('=');
    const formattedKey = convertCamelCaseToSnakeCase(key);
    return [formattedKey, value.trim()].join('=');
};
const executeCommandWithFileReader = (command, fileName) => {
    console.log('Calling cdk deploy...');
    (0, child_process_1.execSync)(command, { cwd: CALL_DIRECTORY });
    const filePath = path_1.default.join(CALL_DIRECTORY, fileName);
    try {
        const data = JSON.parse((0, fs_1.readFileSync)(filePath, 'utf8'));
        const [stackKey] = Object.keys(data);
        const result = [];
        for (let [key, value] of Object.entries(data[stackKey])) {
            const formattedKey = convertCamelCaseToSnakeCase(key);
            result.push([formattedKey, value].join('='));
        }
        return result;
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
exports.executeCommandWithFileReader = executeCommandWithFileReader;
const getCommandOutputs = (command) => new Promise((resolve, reject) => {
    const childProcess = (0, child_process_1.spawn)(command, { cwd: CALL_DIRECTORY, shell: true });
    let outputs = '';
    childProcess.stderr.on('data', (data) => outputs += data.toString());
    childProcess.stdout.on('data', (data) => outputs += data.toString());
    childProcess.on('close', (code) => {
        if (code === 0) {
            const variables = outputs.split('\n').filter((item) => item.includes(' = '));
            resolve(variables.map(getFormattedVariable));
        }
        else {
            reject([]);
        }
    });
});
exports.getCommandOutputs = getCommandOutputs;
const executeCommandWithLogsReader = (command) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const outputs = yield (0, exports.getCommandOutputs)(command);
        if (outputs.length === 0) {
            throw new Error('No variables found by logs reader');
        }
        return outputs;
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
});
exports.executeCommandWithLogsReader = executeCommandWithLogsReader;
