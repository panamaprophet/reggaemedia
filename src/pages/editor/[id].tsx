import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { Button } from '@/components/Button';
import { Editor } from '@/components/Editor';
import { Tags } from '@/components/Tags';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { formatArticleDate, normalize } from '@/helpers/article';
import { getArticleById } from '@/services/articles';
import { getInitialArticle, saveArticle } from '@/actions/articles';
import { uploadFile } from '@/actions/storage';
import { theme } from '@/theme';
import { Article } from '@/types';


export const Page = ({ article }: { article: Article }) => {
    const router = useRouter();
    const [state, setState] = useState(article);

    const save = async () => {
        const hasId = Boolean(state.id);
        const body = { root: normalize(state.body.root) };
        const id = await saveArticle({ ...state, body });

        if (!hasId) {
            router.replace(`/editor/${id}`, undefined, { shallow: true });
        }

        setState({ ...state, id });
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

                <Editor
                    theme={theme}
                    initialState={state.body}
                    onChange={editorState => setState({ ...state, body: editorState.toJSON() })}
                    onUpload={uploadFile}
                />
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

    const userId = session.user.id;
    const id = String(ctx.params?.id);
    const hasId = id !== 'new';

    const article = hasId
        ? await getArticleById(id)
        : await getInitialArticle({ authorId: userId });

    return {
        props: { article },
    };
};
