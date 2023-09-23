import { NextResponse } from 'next/server';
import { getTags } from '@/services/articles';

export const GET = async () => {
    const tags = await getTags();

    return NextResponse.json({ tags });
};
