import type { NextApiRequest, NextApiResponse } from 'next';
import { getSetting, removeSetting, setSetting } from '@/resolvers/settings';


const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    console.log('/api/settings', request.method);

    const { query } = request;
    const id = String(query.id);

    if (request.method === 'PUT') {
        const { value } = JSON.parse(request.body);
        const success = await setSetting(id, value);

        return response.json({ success });
    }

    if (request.method === 'GET') {
        const result = await getSetting(id);

        return response.json(result);
    }

    if (request.method === 'DELETE') {
        const success = await removeSetting(id);

        return response.json({ success });
    }

    return response.status(501).json({ error: 'not implemented' });
};

export default handler;
