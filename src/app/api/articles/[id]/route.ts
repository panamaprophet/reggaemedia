import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { getArticleById, removeArticleById, updateArticleById } from '@/services/articles';

export const PUT = async (request: Request, context: { params: { id: string } }) => {
    const payload = await request.json();
    const article = await updateArticleById(context.params.id, payload);

    return NextResponse.json({ article });
};

export const GET = async (_: Request, context: { params: { id: string } }) => {
    const article = await getArticleById(context.params.id);

    return NextResponse.json({ article });
};

export const DELETE = async (_: Request, context: { params: { id: string } }) => {
    const success = await removeArticleById(context.params.id);

    revalidatePath('/');
    revalidatePath(`/articles/${context.params.id}`);

    return NextResponse.json({ success });
};
