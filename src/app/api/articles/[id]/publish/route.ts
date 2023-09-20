
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { publishArticle } from '@/services/articles';

export const POST = async (_: Request, context: { params: { id: string } }) => {
    const result = await publishArticle({ id: context.params.id });

    revalidatePath('/');
    revalidatePath(`/articles/${context.params.id}`);

    return NextResponse.json(result);
};
