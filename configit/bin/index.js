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
const prompts_1 = require("@inquirer/prompts");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const executors_1 = require("./utils/executors");
const outputs_1 = require("./utils/outputs");
const CALL_DIRECTORY = process.cwd();
const getPrompts = () => __awaiter(void 0, void 0, void 0, function* () {
    const command = yield (0, prompts_1.input)({ message: 'What is the command?' });
    const manager = yield (0, prompts_1.select)({ message: 'Package manager:', choices: [
            {
                name: 'yarn',
                value: 'yarn ',
            },
            {
                name: 'npm',
                value: 'npm run ',
            },
            {
                name: 'pnpm',
                value: 'pnpm ',
            },
        ], });
    console.log('All the necessary prompts recieved! Proceeding with cdk deploy command');
    return {
        command,
        manager
    };
});
const getScriptString = (command) => {
    const filePath = path_1.default.join(CALL_DIRECTORY, 'package.json');
    const result = JSON.parse((0, fs_1.readFileSync)(filePath, 'utf-8'));
    const isScriptExist = Object.keys(result.scripts).includes(command);
    if (!isScriptExist) {
        console.log('There is no provided script');
        process.exit(1);
    }
    return result.scripts[command];
};
const callCDK = (command, packageManager) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Getting script line...');
    const script = getScriptString(command);
    console.log('Script line recieved, proceeding with command: ', script);
    const isOutput = (0, outputs_1.isOutputExist)(script);
    const composedCommand = packageManager + command;
    console.log('Is output present in script line: ', isOutput);
    switch (isOutput) {
        case true: {
            const fileName = (0, outputs_1.getOutputFile)(script);
            console.log('Output file exist. Filename is: ', fileName);
            const result = (0, executors_1.executeCommandWithFileReader)(composedCommand, fileName);
            return result;
        }
        case false: {
            console.log('Output file is not defined. Proceeding with logs reader');
            const result = (0, executors_1.executeCommandWithLogsReader)(composedCommand);
            return result;
        }
    }
});
const createEnvironmentFile = (store) => {
    const parsedStore = store.join('\n');
    const envFile = path_1.default.join(CALL_DIRECTORY, '.env');
    console.log('Got all key-value pairs, creating .env file');
    (0, fs_1.writeFileSync)(envFile, parsedStore);
    console.log('.env file created');
    console.log('I am finished here, terminating process...');
};
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const prompts = yield getPrompts();
    const generatedValues = yield callCDK(prompts.command, prompts.manager);
    console.log('All values recieved without errors. Final variables: ', generatedValues);
    createEnvironmentFile(generatedValues);
    process.exit(1);
});
init();
