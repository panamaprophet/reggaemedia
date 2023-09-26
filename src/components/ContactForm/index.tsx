'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/Button';
import { InputText } from '@/components/Input/InputText';
import { sendMessage } from '@/actions/message';

export const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitted, setSubmitted] = useState(false);

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const { success } = await sendMessage(message, { name, email });

        setSubmitted(success);
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4">
            <label className="flex flex-col gap-1">
                Имя:
                <InputText
                    value={name}
                    placeholder="василий"
                    onChange={setName}
                />
            </label>

            <label className="flex flex-col gap-1">
                Почта:
                <InputText
                    type="email"
                    value={email}
                    placeholder="mail@example.com"
                    onChange={setEmail}
                />
            </label>

            <label>
                Сообщение:
                <textarea
                    value={message}
                    onChange={event => setMessage(event.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full px-4 py-2.5"
                />
            </label>

            <div className="mt-4 w-full flex flex-col">
                <Button theme="secondary" type="submit" disabled={isSubmitted}>
                    {isSubmitted ? 'Отправлено' : 'Отправить'}
                </Button>
            </div>
        </form>
    )
};
