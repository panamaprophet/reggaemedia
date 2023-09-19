import { SyntheticEvent, useState } from 'react';
import { signIn } from 'next-auth/react';

import { InputText } from '@/components/Input/InputText';
import { Button } from '@/components/Button';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { GetServerSidePropsContext } from 'next';

interface Props {
    callbackUrl: string,
    error: string,
}

const Page = ({ callbackUrl, error }: Props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        signIn('credentials', { username, password, callbackUrl });
    };

    return (
        <form
            className="flex flex-col m-auto gap-4 max-w-xs w-full"
            onSubmit={onSubmit}
        >
            {error && (
                <p className="text-red-500 bg-red-400/10 p-2 rounded text-center mb-4 border-red-400 border">
                    Некорректная почта или пароль
                </p>
            )}

            <label className="flex flex-col gap-1">
                Почта:
                <InputText
                    value={username}
                    placeholder="mail@example.com"
                    onChange={setUsername}
                />
            </label>

            <label className="flex flex-col gap-1">
                Пароль:
                <InputText
                    type="password"
                    value={password}
                    onChange={setPassword}
                />
            </label>

            <div className="mt-4 w-full flex flex-col">
                <Button type="secondary" onClick={onSubmit}>Войти</Button>
            </div>
        </form>
    );
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
