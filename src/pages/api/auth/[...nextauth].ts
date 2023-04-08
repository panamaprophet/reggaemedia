import { getUserInfo, login } from '@/resolvers/auth';
import { AttributeType } from '@aws-sdk/client-cognito-identity-provider';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';


const getAttributeValueByName =
    (name: string, attributes: AttributeType[]) =>
        attributes.find(attribute => attribute.Name === name)?.Value;

const SESSION_MAX_AGE_SECONDS = 60 * 60;

export const authOptions = {
    session: {
        maxAge: SESSION_MAX_AGE_SECONDS,
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'somebody@example.com',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    return null;
                }

                try {
                    const { AuthenticationResult } = await login(credentials.username, credentials.password);
                    const { UserAttributes } = await getUserInfo(credentials.username);

                    if (!AuthenticationResult || !AuthenticationResult.AccessToken) {
                        throw Error('no access token');
                    }

                    if (!UserAttributes) {
                        throw Error('no user was found');
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
                } catch (error) {
                    console.log('auth error =', error);
                }

                return null;
            },
        })
    ],
};


export default NextAuth(authOptions);
