import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getAccessToken, getUserInfo, refreshAccessToken } from '@/services/auth';


const fieldsConfiguration = {
    username: {
        label: 'Email',
        type: 'email',
        placeholder: 'somebody@example.com',
    },
    password: {
        label: 'Password',
        type: 'password',
    },
};


export const authOptions = {
    pages: {
        signIn: '/auth/signin',
        error: '/auth/signin',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: fieldsConfiguration,
            authorize: async (credentials) => {
                if (!credentials) {
                    return null;
                }

                try {
                    const token = await getAccessToken(credentials.username, credentials.password);
                    const user = await getUserInfo(credentials.username);

                    return {
                        ...user,
                        ...token,
                    };
                } catch (error) {
                    console.log('auth error =', error);
                    return null;
                }
            },
        }),
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
                const newToken = await refreshAccessToken(token.id, token.refreshToken);

                return {
                    ...token,
                    ...newToken,
                };
            } catch (error) {
                console.log('auth error =', error);
                return null;
            }

        },
        session: async ({ session, token }: { session: any, token: any }) => {
            if (!token) {
                return null;
            }

            return {
                ...session,
                user: {
                    id: token.sub,
                    ...session.user,
                },
                token,
            };
        },
    }
};


export default NextAuth(authOptions);
