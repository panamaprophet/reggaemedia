import { NextApiRequest, NextApiResponse } from 'next';
import { unpublishArticle } from '@/services/articles';


const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    const id = String(request.query.id);

    if (request.method !== 'POST') {
        return response.status(501).json({ error: 'not implemented' });
    }

    const result = await unpublishArticle({ id });

    await response.revalidate(`/articles/${id}`);
    await response.revalidate('/');

    return response.json(result);
};

export default handler;
