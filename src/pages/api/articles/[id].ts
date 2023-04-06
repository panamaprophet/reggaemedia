import type { NextApiRequest, NextApiResponse } from 'next';
import { getArticleById, removeArticleById, updateArticleById } from '@/resolvers/articles';


const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    console.log('/api/articles', request.method, request.query, request.body);

    const { query } = request;
    const id = String(query.id);

    if (request.method === 'PUT') {
        const payload = JSON.parse(request.body);
        const article = await updateArticleById(id, payload);

        return response.json({ article });
    }

    if (request.method === 'GET') {
        const article = await getArticleById(id);

        return response.json({ article });
    }

    if (request.method === 'DELETE') {
        const success = await removeArticleById(id);

        return response.json({ success });
    }

    return response.status(501).json({ error: 'not implemented' });
};

export default handler;
