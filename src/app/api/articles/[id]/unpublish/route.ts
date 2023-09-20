import { unpublishArticle } from '@/services/articles';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async (_: Request, context: { params: { id: string } }) => {
    const result = await unpublishArticle({ id: context.params.id });

    revalidatePath('/');
    revalidatePath(`/articles/${context.params.id}`);

    return NextResponse.json(result);
};
