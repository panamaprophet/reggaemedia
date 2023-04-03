#!/usr/bin/env ts-node

import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { ReggaemediaCdkStack } from './stack.lib';


const app = new App();

const stackName = 'reggae-media-stack';

new ReggaemediaCdkStack(app, stackName, {
    stackName,
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
});
