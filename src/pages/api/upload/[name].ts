import { NextApiRequest, NextApiResponse } from 'next';
import { getUploadUrl } from '@/services/s3';


const BUCKET_NAME = String(process.env.BUCKET_NAME);


const handler = async (request: NextApiRequest, response: NextApiResponse<{ url: string }>) => {
    const { name } = request.query;
    const target = `uploads/${name}`;
    const url = await getUploadUrl(BUCKET_NAME, target);

    return response.json({ url });
};


export default handler;
