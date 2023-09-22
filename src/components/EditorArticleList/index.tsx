'use client';

import { ListItem } from './elements/ListItem';
import { removeArticle } from '@/actions/articles';
import { Article } from '@/types';

export const EditorArticleList = ({ articles }: { articles: Article[] }) => {
    return (
        <>
            {articles.map((article) => (
                <ListItem
                    key={article.id}
                    article={article}
                    onRemove={async id => removeArticle(id)}
                />
            ))}
        </>
    );
}
