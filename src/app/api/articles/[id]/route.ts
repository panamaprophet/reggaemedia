import { getArticleById, removeArticleById, updateArticleById } from '@/services/articles';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const PUT = async (request: Request, context: { params: { id: string } }) => {
    const payload = JSON.parse(request.body as any);
    const article = await updateArticleById(context.params.id, payload);

    NextResponse.json({ article });
};

export const GET = async (_: Request, context: { params: { id: string } }) => {
    const article = await getArticleById(context.params.id);

    NextResponse.json({ article });
};

export const DELETE = async (_: Request, context: { params: { id: string } }) => {
    const success = await removeArticleById(context.params.id);

    revalidatePath('/');
    revalidatePath(`/articles/${context.params.id}`);

    NextResponse.json({ success });
};
