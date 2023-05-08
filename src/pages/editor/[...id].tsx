import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { SerializedEditorState } from 'lexical';
import { Button } from '@/components/Button';
import { Editor } from '@/components/Editor';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { formatArticleDate, normalize } from '@/helpers/article';
import { useArticleId } from '@/hooks/useArticleId';
import { useUserId } from '@/hooks/useUserId';
import { theme } from '@/theme';
import { uploadFile } from '@/resolvers/storage';
import { Article } from '@/types';


const initialArticle: SerializedEditorState = {
    root: {
        direction: null,
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
        children: [{ type: 'paragraph', version: 1 }],
    },
};

const getArticle = async (id: string) => fetch(`/api/articles/${id}`).then(response => response.json());

const saveArticle = async (article: Partial<Article>) => {
    const hasId = Boolean(article.id);
    const method = hasId ? 'PUT' : 'POST';
    const url = hasId ? `/api/articles/${article.id}` : '/api/articles';
    const body = JSON.stringify(article);

    const result = await fetch(url, { method, body }).then(response => response.json());

    return result.article.id;
};


export const Page = () => {
    const [id, setArticleId] = useArticleId();
    const [authorId] = useUserId();
    const [isLoading, setLoading] = useState(Boolean(id));

    const [state, setState] = useState({
        id,
        authorId,
        title: '',
        tags: [] as string[],
        body: initialArticle,
        createdOn: Date.now(),
        updatedOn: Date.now(),
    });

    useEffect(() => {
        id && getArticle(id).then((result) => {
            setState(result.article);
            setLoading(false);
        });
    }, [id]);

    const save = async () => {
        const body = { root: normalize(state.body.root) };
        const articleId = await saveArticle({ ...state, body });

        setArticleId(articleId);
    };

    return (
        <div className="max-w-4xl mx-auto mb-4">
            <div className="flex justify-between items-center p-2 pt-4">
                {state && (
                    <div className="text-sm text-gray-600">
                        обновлено: {formatArticleDate(state)}
                    </div>
                )}
                <Button type="secondary" onClick={save}>
                    Сохранить
                </Button>
            </div>

            <div className="mt-4 m-2 p-2 bg-white rounded border">
                <input
                    value={state.title}
                    onChange={(event) => setState({ ...state, title: event.target.value })}
                    placeholder="Заголовок"
                    className="max-w-full w-full focus:outline-none text-3xl p-4"
                />

                <input
                    value={state.tags.join(',')}
                    onChange={(event) => setState({ ...state, tags: event.target.value.split(',') })}
                    placeholder="Теги"
                    className="max-w-full w-full focus:outline-none text-normal p-4"
                />

                {isLoading && (
                    <div className="text-center text-normal p-4">
                        загрузка...
                    </div>
                )}

                {!isLoading && (
                    <Editor
                        theme={theme}
                        initialState={state.body}
                        onChange={editorState => setState({ ...state, body: editorState.toJSON() })}
                        onUpload={uploadFile}
                    />
                )}
            </div>
        </div>
    );
}

export default Page;

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
    const session = await getServerSession(ctx.req, ctx.res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: `/api/auth/signin?callbackUrl=${ctx.req.url}`,
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
