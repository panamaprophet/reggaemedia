import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';

import { InputText } from '@/components/Input/InputText';
import { Button } from '@/components/Button';
import { Column } from '@/components/Layout';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { GetServerSidePropsContext } from 'next';

const Page = () => {
    const [{ username, password }, setData] = useState({ username: '', password: '' });
    const { query } = useRouter();
    const [isError, setError] = useState(Boolean(query.error));

    useEffect(() => {
        if (username !== '' && isError) {
            setError(false);
        }
    }, [username, isError]);

    return (
        <Column className="m-auto gap-4">
            {isError && <p className="text-red-500">Некорректная почта или пароль</p>}
            <Column>
                <p>Почта:</p>
                <InputText
                    value={username}
                    className="border py-2 px-2 rounded"
                    onChange={(value) => setData({ username: value, password })}
                />
            </Column>
            <Column>
                <p>Пароль:</p>
                <InputText
                    type="password"
                    value={password}
                    className="border py-2 px-2 rounded"
                    onChange={(value) => setData({ username, password: value })}
                />
            </Column>
            <Button onClick={() => signIn('credentials', { username, password, callbackUrl: '/' }, )}>Войти</Button>
        </Column>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (session) {
        return { redirect: { destination: '/' } };
    }
    
    return { props: {} }
}

export default Page;
