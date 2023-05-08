import { UUID, createHmac } from 'crypto';
import {
    AdminGetUserCommand,
    AdminInitiateAuthCommand,
    AttributeType,
    AuthFlowType,
    AuthenticationResultType,
    ListUsersCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { client } from '@/providers/idp';


const getAccessTokenFromAuthenticationResult = (result: AuthenticationResultType) => ({
    accessToken: result.AccessToken,
    refreshToken: result.RefreshToken,
    accessTokenExpiresIn: Date.now() + (result.ExpiresIn || 0) * 1000,
});


const getAttributeValueByName = (name: string, attributes: AttributeType[]) => {
    return attributes.find(attribute => attribute.Name === name)?.Value;
};

const getSecretHash = (str: string) => {
    const hasher = createHmac('sha256', String(process.env.COGNITO_CLIENT_SECRET));

    hasher.update(str);

    return hasher.digest('base64');
};


export const getAccessToken = async (username: string, password: string) => {
    const secretHash = getSecretHash(`${username}${process.env.COGNITO_CLIENT_ID}`);

    const { AuthenticationResult } = await client.send(new AdminInitiateAuthCommand({
        ClientId: process.env.COGNITO_CLIENT_ID,
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
            SECRET_HASH: secretHash,
        },
    }));

    if (!AuthenticationResult) {
        throw Error('no access token');
    }

    return getAccessTokenFromAuthenticationResult(AuthenticationResult);
};

export const refreshAccessToken = async (id: string, refreshToken: string) => {
    const secretHash = getSecretHash(`${id}${process.env.COGNITO_CLIENT_ID}`);

    const { AuthenticationResult } = await client.send(new AdminInitiateAuthCommand({
        ClientId: process.env.COGNITO_CLIENT_ID,
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
        AuthParameters: {
            REFRESH_TOKEN: refreshToken,
            SECRET_HASH: secretHash,
        },
    }));

    if (!AuthenticationResult) {
        throw Error('token refresh failed');
    }

    return getAccessTokenFromAuthenticationResult(AuthenticationResult);
};

export const getUserInfo = async (username: string) => {
    const { UserAttributes } = await client.send(new AdminGetUserCommand({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username: username,
    }));

    if (!UserAttributes) {
        throw Error('user not found');
    }

    const id = getAttributeValueByName('sub', UserAttributes);
    const email = getAttributeValueByName('email', UserAttributes);

    if (!id) {
        throw Error('no user id found');
    }

    return {
        id,
        email,
    }
};

export const getUserById = async (id: UUID) => {
    const result = await client.send(new ListUsersCommand({
        Filter: `sub = \"${id}\"`,
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
    }));

    const { Users = [] } = result;
    const [user] = Users;

    if (!user || !user.Attributes) {
        throw Error('user not found');
    }

    return {
        id: getAttributeValueByName('sub', user.Attributes),
        name: getAttributeValueByName('name', user.Attributes),
        email: getAttributeValueByName('email', user.Attributes),
    };
};
