import type { NextApiRequest, NextApiResponse } from 'next';


const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    console.log(request.method, request.query, request.body);

    const { query } = request;
    const { id } = query;

    if (request.method === 'PUT') {
        const article = { id }; // @todo: await updateArticleById(id)

        return response.status(200).json({ article });
    }

    if (request.method === 'GET') {
        const article = { id }; // @todo: await getArticleById(request.query.id)

        return response.status(200).json({ article });
    }

    if (request.method === 'DELETE') {
        const success = true; // @todo: await removeArticleById(request.query.id)

        return response.status(200).json({ success });
    }

    return response.status(501).json({ error: 'not implemented' });
};

export default handler;
