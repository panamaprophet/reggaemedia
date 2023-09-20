import { getUploadUrl } from '@/services/storage';
import { NextResponse } from 'next/server';


const BUCKET_NAME = String(process.env.BUCKET_NAME);


export const GET = async (_: Request, context: { params: { name: string } }) => {
    const { name } = context.params;
    const target = `uploads/${name}`;
    const url = await getUploadUrl(BUCKET_NAME, target);

    return NextResponse.json({ url });
};
