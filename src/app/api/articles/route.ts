import { NextResponse } from 'next/server';
import { createArticle, getArticles, getPublishedArticles } from '@/services/articles';

export const POST = async (request: Request) => {
    const payload = JSON.parse(request.body as any);
    const article = await createArticle(payload);

    return NextResponse.json({ article });
};

export const GET = async () => {
    const isAdmin = true;
    const articles = await (isAdmin ? getArticles() : getPublishedArticles());

    return NextResponse.json({ articles });
};
