import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AttributeType, AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import { getUserInfo, getAccessToken, refreshAccessToken } from '@/resolvers/auth';


const getAttributeValueByName =
    (name: string, attributes: AttributeType[]) =>
        attributes.find(attribute => attribute.Name === name)?.Value;

const getAccessTokenFromAuthenticationResult =
    (result: AuthenticationResultType) =>
        ({
            accessToken: result.AccessToken,
            refreshToken: result.RefreshToken,
            accessTokenExpiresIn: Date.now() + (result.ExpiresIn || 0) * 1000,
        });

export const authOptions = {
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
                    const { AuthenticationResult } = await getAccessToken(credentials.username, credentials.password);
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
                        ...getAccessTokenFromAuthenticationResult(AuthenticationResult),
                    }
                } catch (error) {
                    console.log('auth error =', error);
                }

                return null;
            },
        })
    ],
    callbacks: {
        jwt: async ({ token, user }: { token: any, user: any }) => {
            if (user) {
                return {
                    ...token,
                    ...user,
                };
            }

            if (Date.now() < token.accessTokenExpiresIn) {
                return token;
            }

            try {
                const { AuthenticationResult } = await refreshAccessToken(token.id, token.refreshToken);

                if (!AuthenticationResult) {
                    throw Error('can\'t refresh token');
                }

                return {
                    ...token,
                    ...getAccessTokenFromAuthenticationResult(AuthenticationResult),
                }
            } catch (error) {
                console.log('auth error =', error);
            }

            return null;
        },
        session: async ({ session, token }: { session: any, token: any }) => {
            if (!token) {
                return null;
            }

            return { ...session, token };
        },
    }
};


export default NextAuth(authOptions);
