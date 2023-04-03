import { Article } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';


const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    console.log(request.method, request.query, request.body);

    if (request.method === 'POST') {
        const article = JSON.parse(request.body); // @todo: data = JSON.parse(request.body); await createArticle(data);

        return response.status(200).json({ article });
    }

    if (request.method === 'GET') {
        const articles: Article[] = []; // @todo: (isAdmin ? getArticles() : getPublishedArticles())

        return response.status(200).json({ articles });
    }

    return response.status(501).json({ error: 'not implemented' });
};

export default handler;
