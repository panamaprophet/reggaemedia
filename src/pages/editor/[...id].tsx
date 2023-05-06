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
        children: [],
    },
};

const getArticle = async (id: string) => fetch(`/api/articles/${id}`).then(response => response.json());

const saveArticle = async (article: Partial<Article>) => {
    const hasId = 'id' in article;
    const method = hasId ? 'PUT' : 'POST';
    const url = hasId ? `/api/articles/${article.id}` : '/api/articles';
    const body = JSON.stringify(article);

    const result = await fetch(url, { method, body }).then(response => response.json());

    return result.article.id;
};


export const Page = () => {
    const [article, setArticle] = useState<SerializedEditorState>(initialArticle);
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [id, setArticleId] = useArticleId();
    const [authorId] = useUserId();
    const [isLoading, setLoading] = useState(Boolean(id));
    const [metadata, setMetadata] = useState<{ createdOn: number, updatedOn: number }>();

    useEffect(() => {
        if (id) {
            getArticle(id)
                .then(({ article }) => {
                    setTitle(article.title);
                    setTags(article.tags);
                    setArticle(article.body);
                    setMetadata({
                        createdOn: article.createdOn,
                        updatedOn: article.updatedOn,
                    });
                    setLoading(false);
                });
        }
    }, [id]);

    const save = async () => {
        const body = { root: normalize(article.root) };
        const articleId = await saveArticle({ id, title, tags, authorId, body, ...metadata });

        setArticleId(articleId);
    };

    return (
        <div>
            <div className="flex justify-between items-center p-2 pt-4">
                {metadata && (
                    <div className="text-sm text-gray-600">
                        обновлено: {formatArticleDate(metadata)}
                    </div>
                )}
                <Button type="secondary" onClick={save}>
                    Сохранить
                </Button>
            </div>

            <div className="max-w-full mt-4 m-2 p-2 bg-white rounded border">
                <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Заголовок"
                    className="max-w-full w-full focus:outline-none text-3xl p-4"
                />

                <input
                    value={tags.join(',')}
                    onChange={(event) => setTags(event.target.value.split(','))}
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
                        initialState={article}
                        onChange={state => setArticle(state?.toJSON())}
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
