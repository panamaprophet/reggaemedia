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
import { uploadFile } from '@/actions/storage';
import { useRouter } from 'next/router';
import { getArticle, saveArticle } from '@/actions/articles';
import { Tags } from '@/components/Tags';


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


export const Page = () => {
    const [id, setArticleId] = useArticleId();
    const [authorId] = useUserId();
    const [isLoading, setLoading] = useState(Boolean(id));
    const router = useRouter();

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
        if (id) {
            getArticle(id).then((article) => {
                setState(article);
                setLoading(false);
            });
        }
    }, [id]);

    useEffect(() => {
        if (!state.authorId) {
            setState(prev => ({ ...prev, authorId }));
        }
    }, [authorId, state]);

    const save = async () => {
        const body = { root: normalize(state.body.root) };
        const articleId = await saveArticle({ ...state, body });

        if (!id) {
            router.replace(`/editor/${articleId}`, undefined, { shallow: true });
        }

        setArticleId(articleId);
    };

    return (
        <div className="max-w-4xl w-full mx-auto mb-4">
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

                <Tags value={state.tags} onChange={(tags) => setState({ ...state, tags })} />

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
