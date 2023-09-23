import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { unpublishArticle } from '@/services/articles';

export const POST = async (_: Request, context: { params: { id: string } }) => {
    const result = await unpublishArticle({ id: context.params.id });

    revalidatePath('/');
    revalidatePath(`/articles/${context.params.id}`);

    return NextResponse.json(result);
};
