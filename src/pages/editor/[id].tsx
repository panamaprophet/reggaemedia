import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { Button } from '@/components/Button';
import { Editor } from '@/components/Editor';
import { Tags } from '@/components/Tags';
import { InputText } from '@/components/Input/InputText';
import { ArrowSmallLeft } from '@/components/Icons/ArrowSmallLeft';
import { Link } from '@/components/Link';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { formatArticleDate, normalize } from '@/helpers/article';
import { getArticleById } from '@/services/articles';
import { createArticle, publishArticle, saveArticle, unpublishArticle } from '@/actions/articles';
import { uploadFile } from '@/actions/storage';
import { theme } from '@/theme';
import { Article } from '@/types';


export const Page = ({ article }: { article: Article }) => {
    const router = useRouter();
    const [state, setState] = useState(article);

    const onSave = async (data: Article) => {
        const hasId = Boolean(data.id);
        const body = { root: normalize(data.body.root) };
        const id = await saveArticle({ ...data, body });

        if (!hasId) {
            router.replace(`/editor/${id}`, undefined, { shallow: true });
            setState({ ...data, id });
        }
    };

    const onPublish = async () => {
        const { publishedOn, updatedOn } = state.publishedOn
            ? await unpublishArticle(state.id)
            : await publishArticle(state.id);

        setState({ ...state, updatedOn, publishedOn });
    };

    return (
        <div className="max-w-4xl w-full mx-auto mb-4">
            <div className="flex justify-between items-center p-2 pt-4">
                <div className="flex gap-4 items-center">
                    <Link to="/editor">
                        <Button type="secondary">
                            <ArrowSmallLeft size="sm" />
                        </Button>
                    </Link>

                    {state && (
                        <div className="text-sm text-gray-600">
                            обновлено: {formatArticleDate(state, true)}
                        </div>
                    )}
                </div>

                <div className="flex gap-4">
                    <Button type="secondary" onClick={onPublish}>
                        {state.publishedOn ? 'Отменить публикацию' : 'Опубликовать'}
                    </Button>

                    <Button type="secondary" onClick={() => onSave(state)}>
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
        : await createArticle({ authorId: userId });

    return {
        props: { article },
    };
};
