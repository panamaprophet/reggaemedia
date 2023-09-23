import { fetchJson } from '@/helpers';

export const sendMessage = (
    message: string,
    sender: {
        name: string,
        email: string,
    }) => fetchJson<{ success: boolean }>('/api/message', {
        method: 'POST',
        body: JSON.stringify({
            message,
            sender,
        }),
    });
