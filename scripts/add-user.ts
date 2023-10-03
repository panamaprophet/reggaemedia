#!/usr/bin/env ts-node

import readline from 'readline/promises';
import {
    AdminCreateUserCommand,
    AdminSetUserPasswordCommand,
    CognitoIdentityProviderClient,
    DescribeUserPoolCommand,
    PasswordPolicyType,
} from '@aws-sdk/client-cognito-identity-provider';
import { CloudFormationClient, DescribeStacksCommand } from '@aws-sdk/client-cloudformation';

const readLineAsync = async (question: string) => {
    const readlineInterface = readline.createInterface({ input: process.stdin, output: process.stdout });
    const result = await readlineInterface.question(question);

    readlineInterface.close();

    return result;
};

const readLineWithValidation = async (question: string, validate: (value: string) => boolean): Promise<string> => {
    const value = await readLineAsync(question);

    return validate(value) ? value : readLineWithValidation(question, validate);
};

const validateEmail = (value: string) => value.split('@').every(part => part.length);

const validateName = (value: string) => value.length > 0;

const validatePassword = (password: string, policy: PasswordPolicyType = {}) => {
    const { MinimumLength = 0, RequireLowercase, RequireNumbers, RequireSymbols, RequireUppercase } = policy;

    if (
        (password.length < MinimumLength) ||
        (RequireLowercase && !/[a-z]/.test(password)) ||
        (RequireUppercase && !/[A-Z]/.test(password)) ||
        (RequireNumbers && !/[0-9]/.test(password)) ||
        (RequireSymbols && !/[!@#$%^&*(),.?":{}|<>]/.test(password))
    ) {
        console.log('\ninvalid password. constraints = %o\n', policy);

        return false;
    }

    return true;
};

(async () => {
    const cognitoIdpClient = new CognitoIdentityProviderClient();
    const cloudFormationClient = new CloudFormationClient();

    const stackName = String(process.env.npm_package_name);
    const { Stacks = [] } = await cloudFormationClient.send(new DescribeStacksCommand({ StackName: stackName }));
    const outputs = Stacks[0]?.Outputs ?? [];

    const userPoolId = outputs?.find(({ OutputKey }) => OutputKey === 'cognitoUserPoolId')?.OutputValue;
    const userPool = await cognitoIdpClient.send(new DescribeUserPoolCommand({ UserPoolId: userPoolId }));
    const passwordPolicy = userPool.UserPool?.Policies?.PasswordPolicy;

    const email = await readLineWithValidation('user email = ', validateEmail);
    const password = await readLineWithValidation('user password = ', value => validatePassword(value, passwordPolicy));
    const name = await readLineWithValidation('user name = ', validateName);

    const { User } = await cognitoIdpClient.send(new AdminCreateUserCommand({
        UserPoolId: userPoolId,
        Username: email,
        UserAttributes: [{
            Name: 'name',
            Value: name,
        }],
    }));

    await cognitoIdpClient.send(new AdminSetUserPasswordCommand({
        Username: email,
        UserPoolId: userPoolId,
        Password: password,
        Permanent: true,
    }));

    const resultMessage = Boolean(User) ? 'user successfully added' : 'failed to add user';

    console.log(`\n${resultMessage}\n`);
})();
