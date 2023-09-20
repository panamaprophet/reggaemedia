'use client';

import { SyntheticEvent, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { InputText } from '@/components/Input/InputText';
import { Button } from '@/components/Button';

const Page = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') ?? '';
    const error = searchParams.get('error') ?? '';

    const onSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        signIn('credentials', { username, password, callbackUrl });
    };

    return (
        <form
            className="flex flex-col m-auto gap-4 max-w-xs w-full h-full justify-center"
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

export default Page;
