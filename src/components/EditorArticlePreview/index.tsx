'use client';

import { formatArticleDate } from '@/helpers/article';
import { Article } from '@/types';
import { Link } from '../Link';
import { ConfirmationModal } from '../ConfirmationModal';
import { useState } from 'react';


export const EditorArticlePreview = ({ article, onRemove }: { article: Article, onRemove: (id: string) => void }) => {
    const [selectedArticle, setSelectedArticle] = useState<Article>();

    return (
        <div className="w-full p-4 mt-2 gap-2 flex flex-col rounded border">
            <ConfirmationModal
                onConfirm={() => onRemove(selectedArticle!.id)}
                onDecline={() => setSelectedArticle(undefined)}
                confirmButtonText="Удалить"
                declineButtonText="Отмена"
                isOpen={Boolean(selectedArticle)}
            >
                <p>Статья «{selectedArticle?.title}» будет удалена.</p>
                <p>Продолжить?</p>
            </ConfirmationModal>
            <Link className="text-black" to={`/editor/${article.id}`}>
                {article.title}
            </Link>

            <div className="text-xs text-gray-600">
                Обновлено {formatArticleDate(article, true)}
            </div>

            <div className="flex flex-row gap-2 text-xs">
                <Link className="text-blue-400" to={`/editor/${article.id}`}>Редактировать</Link> ·
                <Link className="text-blue-400" to={`/articles/${article.id}`}>Просмотр</Link> ·
                <Link className="text-red-400" to="" onClick={() => setSelectedArticle(article)}>Удалить</Link>
            </div>
        </div>
    );
};
