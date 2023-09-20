'use client';

import { EditorArticlePreview } from '@/components/EditorArticlePreview';
import { removeArticle } from '@/actions/articles';
import { Article } from '@/types';

export const EditorArticleList = ({ articles }: { articles: Article[] }) => {
    return (
        <>
            {articles.map((article) => (
                <EditorArticlePreview
                    key={article.id}
                    article={article}
                    onRemove={async id => removeArticle(id)}
                />
            ))}
        </>
    );
}
