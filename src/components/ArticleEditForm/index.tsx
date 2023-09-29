'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';
import { Editor } from '@/components/Editor';
import { InputText } from '@/components/Input/InputText';
import { ArrowSmallLeft } from '@/components/Icons/ArrowSmallLeft';
import { Tags } from '@/components/Tags';
import { Link } from '@/components/Link';
import { publishArticle, saveArticle, unpublishArticle } from '@/actions/articles';
import { uploadFile } from '@/actions/storage';
import { formatArticleDate } from '@/helpers/article';
import { theme } from '@/theme';
import { Article } from '@/types';
import { useToast } from '../Toasts';

export const ArticleEditForm = ({ article }: { article: Article }) => {
    const isNewArticle = !article.id || article.id === 'new';
    const [state, setState] = useState(article);
    const toast = useToast();

    const onPublish = async () => {
        const isPublished = Boolean(state.publishedOn);

        await toast.promise(async () => {
            const publishResult = await (
                isPublished
                    ? unpublishArticle(article.id)
                    : publishArticle(article.id)
            );

            setState({
                ...state,
                updatedOn: publishResult.updatedOn,
                publishedOn: publishResult.publishedOn,
            });
        }, {
            pending: isPublished ? 'Отмена публикации...' : 'Публикация...',
            resolve: isPublished ? 'Публикация отменена' : 'Опубликовано',
            reject: 'Ошибка публикации',
        });
    }

    const onSave = () => toast.promise(() => saveArticle(state), {
        pending: 'Сохранение...',
        resolve: 'Сохранено',
        reject: 'Ошибка сохранения',
    });

    return (
        <>
            <div className="flex justify-between items-center p-2 pt-4">
                <div className="flex gap-4 items-center">
                    <Link to="/editor">
                        <Button theme="secondary">
                            <ArrowSmallLeft size="sm" />
                        </Button>
                    </Link>

                    <div className="text-sm text-gray-600">
                        обновлено: {formatArticleDate(state, true)}
                    </div>
                </div>

                <div className="flex gap-4">
                    {!isNewArticle && (
                        <Button theme="secondary" onClick={onPublish}>
                            {state.publishedOn ? 'Отменить публикацию' : 'Опубликовать'}
                        </Button>
                    )}

                    <Button theme="secondary" onClick={onSave}>
                        Сохранить
                    </Button>
                </div>
            </div>

            <div className="mt-4 m-2 p-2 bg-white rounded border">
                <InputText
                    value={state.title}
                    onChange={(title) => setState({ ...state, title })}
                    placeholder="Заголовок"
                    className="focus:outline-none !text-3xl !p-4 !bg-transparent !border-0"
                />

                <Tags value={state.tags} onChange={(tags) => setState({ ...state, tags })} />

                <Editor
                    theme={theme}
                    initialState={state.body}
                    onChange={editorState => setState({ ...state, body: editorState.toJSON() })}
                    onUpload={uploadFile}
                />
            </div>
        </>
    );
};
