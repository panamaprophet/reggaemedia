import { useState } from 'react';
import { signIn } from 'next-auth/react';

import { InputText } from '@/components/Input/InputText';
import { Button } from '@/components/Button';
import { Column } from '@/components/Layout';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { GetServerSidePropsContext } from 'next';

interface Props {
    callbackUrl: string,
    error: string,
}

const Page = ({ callbackUrl, error }: Props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Column className="m-auto gap-4">
            {error && <p className="text-red-500">Некорректная почта или пароль</p>}
            <Column>
                <p>Почта:</p>
                <InputText
                    value={username}
                    className="border py-2 px-2 rounded"
                    onChange={setUsername}
                />
            </Column>
            <Column>
                <p>Пароль:</p>
                <InputText
                    type="password"
                    value={password}
                    className="border py-2 px-2 rounded"
                    onChange={setPassword}
                />
            </Column>
            <Button onClick={() => signIn('credentials', { username, password, callbackUrl }, )}>Войти</Button>
        </Column>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
    const { callbackUrl = '/', error = '' } = context.query;

    if (session) {
        return { redirect: { destination: callbackUrl } };
    }
    
    return { props: { callbackUrl, error } };
}

export default Page;
