#!/usr/bin/env ts-node

import { CloudFormationClient, DescribeStacksCommand } from '@aws-sdk/client-cloudformation';
import { writeFileSync } from 'fs';

const toSnakeCase = (str: string) => str.replace(/[A-Z]/g, char => `_${char}`);

const formatKey = (str: string) => toSnakeCase(str).toUpperCase();

(async () => {
    console.log('exporting outputs to .env file...');

    const client = new CloudFormationClient();

    const fileName = process.cwd() + '/.env.test';
    const stackName = process.env.npm_package_name;
    const { Stacks = [] } = await client.send(new DescribeStacksCommand({ StackName: stackName }));

    const outputs = Stacks[0]?.Outputs ?? [];

    if (!outputs) {
        throw Error('no outputs found');
    }

    const environmentVariables = outputs.reduce((result, { OutputKey, OutputValue }) => {
        return result + `${formatKey(OutputKey!)}="${OutputValue}"\n`;
    }, '');

    writeFileSync(fileName, environmentVariables);
})();
