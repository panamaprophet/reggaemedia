import { getTags } from '@/services/articles';
import { NextResponse } from 'next/server';

export const GET = async () => {
    const tags = await getTags();

    NextResponse.json({ tags });
};
