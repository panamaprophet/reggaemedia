import type { NextApiRequest, NextApiResponse } from 'next';


const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    console.log(request.method, request.query, request.body);

    if (request.method === 'PUT') {
        const article = {}; // @todo: await updateArticleById(request.query.id)

        return response.status(200).json({ article });
    }

    if (request.method === 'POST') {
        const article = JSON.parse(request.body); // @todo: data = JSON.parse(request.body); await createArticle(data);

        return response.status(200).json({ article });
    }

    if (request.method === 'GET') {
        const { query } = request;
        const { id } = query;
        const article = { id }; // @todo: id ? await getArticleById(request.query.id) : (isAdmin ? getArticles() : getPublishedArticles())

        return response.status(200).json({ article });
    }

    if (request.method === 'DELETE') {
        const success = true; // @todo: await removeArticleById(request.query.id)

        return response.status(200).json({ success });
    }

    return response.status(501).json({ error: 'not implemented' });
};

export default handler;
