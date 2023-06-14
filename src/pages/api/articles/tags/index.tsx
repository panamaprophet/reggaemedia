import { NextApiResponse, NextApiRequest } from 'next';
import { getTags } from '@/services/articles';


const handler = async (_request: NextApiRequest, response: NextApiResponse) => {
    try {
        const result = await getTags();

        response.json(result);
    } catch (error) {
        response.status(500).json({ error });
    }
};

export default handler;
