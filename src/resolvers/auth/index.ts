import { createHmac } from 'crypto';
import { AdminGetUserCommand, AdminInitiateAuthCommand, AuthFlowType } from '@aws-sdk/client-cognito-identity-provider';
import { client } from '@/services/idp';

export const getAccessToken = (username: string, password: string) => {
    const hasher = createHmac('sha256', String(process.env.COGNITO_CLIENT_SECRET));

    hasher.update(`${username}${process.env.COGNITO_CLIENT_ID}`);

    return client.send(new AdminInitiateAuthCommand({
        ClientId: process.env.COGNITO_CLIENT_ID,
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
            SECRET_HASH: hasher.digest('base64'),
        },
    }));
};

export const refreshAccessToken = (id: string, refreshToken: string) => {
    const hasher = createHmac('sha256', String(process.env.COGNITO_CLIENT_SECRET));

    hasher.update(`${id}${process.env.COGNITO_CLIENT_ID}`);

    return client.send(new AdminInitiateAuthCommand({
        ClientId: process.env.COGNITO_CLIENT_ID,
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
        AuthParameters: {
            REFRESH_TOKEN: refreshToken,
            SECRET_HASH: hasher.digest('base64'),
        },
    }));
};

export const getUserInfo = (username: string) => client.send(new AdminGetUserCommand({
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: username,
}));
