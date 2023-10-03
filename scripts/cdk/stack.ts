#!/usr/bin/env ts-node

import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { ReggaemediaCdkStack } from './stack.lib';

const app = new App();

const stackName = String(process.env.npm_package_name);

new ReggaemediaCdkStack(app, stackName, { stackName });
