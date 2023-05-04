import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { SerializedEditorState } from 'lexical';
import { Button } from '@/components/Button';
import { Editor } from '@/components/Editor';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getArticleById } from '@/resolvers/articles';
import { ParsedUrlQuery } from 'querystring';


// returns the article id from the current location query
const useArticleId = () => {
    const { query } = useRouter();
    const { id: ids } = query;

    const id = Array.isArray(ids) ? ids[0] : ids;

    return useState<string | undefined>(id !== 'new' ? id : undefined);
};

// returns the tuple consisting of userId and user object
const useUserId = () => {
    const session = useSession();

    return [
        session.data?.user?.id,
        session.data?.user,
    ];
};

// returns the article id from parsed query string
const getArticleId = (query: ParsedUrlQuery) => {
    const { id: ids } = query;
    const id = Array.isArray(ids) ? ids[0] : ids;

    return id !== 'new' ? id : undefined;
};


export const Page = (props: { article: any }) => {
    const [article, setArticle] = useState<SerializedEditorState>(props.article?.body);
    const [title, setTitle] = useState(props.article?.title);
    const [tags, setTags] = useState<string[]>(props.article?.tags ?? []);
    const [id, setArticleId] = useArticleId();
    const [authorId] = useUserId();
    // const [metadata, setMetadata] = useState({});

    const save = async () => {
        // @todo: abstract
        const url = id ? `/api/articles/${id}` : '/api/articles';

        const result = await fetch(url, {
            method: id ? 'PUT' : 'POST',
            body: JSON.stringify({
                id,
                title,
                tags,
                authorId,
                body: article,
            }),
        }).then(response => response.json());

        setArticleId(result.article.id);
    };

    return (
        <div>
            <div className="text-right p-2 pt-4">
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

                <Editor
                    initialState={article}
                    onChange={state => setArticle(state?.toJSON())}
                />
            </div>
        </div>
    );
}

export default Page;

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    const articleId = getArticleId(ctx.query);

    if (!session) {
        return {
            redirect: {
                destination: `/api/auth/signin?callbackUrl=${ctx.req.url}`,
                permanent: false,
            },
        };
    }

    if (articleId) {
        return {
            props: {
                article: await getArticleById(articleId),
            },
        };
    }

    return {
        props: {},
    };
};
