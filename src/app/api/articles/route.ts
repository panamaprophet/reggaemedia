import { createArticle, getArticles, getPublishedArticles } from '@/services/articles';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
    const payload = JSON.parse(request.body as any);
    const article = await createArticle(payload);

    NextResponse.json({ article });
};

export const GET = async () => {
    const isAdmin = true;
    const articles = await (isAdmin ? getArticles() : getPublishedArticles());

    NextResponse.json({ articles });
};
