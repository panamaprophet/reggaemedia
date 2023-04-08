import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';


export const client = new CognitoIdentityProviderClient({
    credentials: {
        accessKeyId: String(process.env.AMAZON_ACCESS_KEY),
        secretAccessKey: String(process.env.AMAZON_SECRET_KEY),
    },
    region: String(process.env.AMAZON_REGION),
});
