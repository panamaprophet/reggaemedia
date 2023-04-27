import type { NextApiRequest, NextApiResponse } from 'next';
import { createArticle, getArticles, getPublishedArticles } from '@/resolvers/articles';


const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    console.log('/api/articles', request.method);

    const isAdmin = false;

    if (request.method === 'POST') {
        const payload = JSON.parse(request.body);
        const article = await createArticle(payload);

        return response.status(200).json({ article });
    }

    if (request.method === 'GET') {
        const articles = await (isAdmin ? getArticles() : getPublishedArticles());

        return response.status(200).json({ articles });
    }

    return response.status(501).json({ error: 'not implemented' });
};

export default handler;
