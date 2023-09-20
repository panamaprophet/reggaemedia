'use client';

import { uploadFile } from '@/actions/storage';
import { Button } from '@/components/Button';
import { Editor } from '@/components/Editor';
import { ArrowSmallLeft } from '@/components/Icons/ArrowSmallLeft';
import { InputText } from '@/components/Input/InputText';
import { formatArticleDate } from '@/helpers/article';
import { theme } from '@/theme';
import { Article } from '@/types';
import { Tags } from '@/components/Tags';
import { Link } from '@/components/Link';
import { useState } from 'react';
import { publishArticle, saveArticle, unpublishArticle } from '@/actions/articles';

export const ArticleEditForm = ({ article }: { article: Article }) => {
    const isNewArticle = Boolean(article.id);
    const [state, setState] = useState(article);

    const onPublish = () => state.publishedOn ? unpublishArticle(article.id) : publishArticle(article.id);

    const onSave = () => saveArticle(state);

    return (
        <>
            <div className="flex justify-between items-center p-2 pt-4">
                <div className="flex gap-4 items-center">
                    <Link to="/editor">
                        <Button type="secondary">
                            <ArrowSmallLeft size="sm" />
                        </Button>
                    </Link>

                    <div className="text-sm text-gray-600">
                        обновлено: {formatArticleDate(state, true)}
                    </div>
                </div>

                <div className="flex gap-4">
                    {!isNewArticle && (
                        <Button type="secondary" onClick={onPublish}>
                            {state.publishedOn ? 'Отменить публикацию' : 'Опубликовать'}
                        </Button>
                    )}

                    <Button type="secondary" onClick={onSave}>
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
