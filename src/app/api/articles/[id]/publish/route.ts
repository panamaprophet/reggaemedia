
import { publishArticle } from '@/services/articles';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async (_: Request, context: { params: { id: string } }) => {
    const result = await publishArticle({ id: context.params.id });

    revalidatePath('/');
    revalidatePath(`/articles/${context.params.id}`);

    NextResponse.json(result);
};
