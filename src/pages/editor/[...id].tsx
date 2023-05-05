import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { SerializedEditorState, SerializedLexicalNode } from 'lexical';
import { Button } from '@/components/Button';
import { Editor } from '@/components/Editor';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { theme } from '@/theme';


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

const filterList = ['direction', 'indent', 'mode', 'detail'];

const normalize = (node: SerializedLexicalNode) => {
    let result: any = { ...node };

    const hasChildren = 'children' in result && Array.isArray(result.children);

    if (hasChildren) {
        result.children = result.children.map(normalize);
    }

    // replace empty paragraphs with br
    if (result.type === 'paragraph' && result.children.length === 0) {
        result.children = [{ type: 'linebreak', version: 1 }];
    }

    // keep minimal required data
    result = Object.fromEntries(
        Object
            .entries(result)
            .filter(([key]) => !filterList.includes(key))
    );

    return result;
};


export const Page = () => {
    const [article, setArticle] = useState<SerializedEditorState>();
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [id, setArticleId] = useArticleId();
    const [authorId] = useUserId();
    const [isLoading, setLoading] = useState(Boolean(id));
    // const [metadata, setMetadata] = useState({});

    useEffect(() => {
        if (id) {
            fetch(`/api/articles/${id}`)
                .then(response => response.json())
                .then(({ article }) => {
                    setTitle(article.title);
                    setTags(article.tags);
                    setArticle(article.body);

                    // setMetadata({
                    //     createdOn: article.createdOn,
                    //     updatedOn: article.updatedOn,
                    // });
                })
                .then(() => setLoading(false));
        }
    }, [id]);

    const save = async () => {
        if (!article) {
            console.log('nothing to save');
            return;
        }

        // @todo: abstract
        const url = id ? `/api/articles/${id}` : '/api/articles';

        const result = await fetch(url, {
            method: id ? 'PUT' : 'POST',
            body: JSON.stringify({
                id,
                title,
                tags,
                authorId,
                body: {
                    root: normalize(article.root),
                },
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
                    />
                )}
            </div>
        </div>
    );
}

export default Page;

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
    const session = await getServerSession(ctx.req, ctx.res, authOptions);

    // @todo: consider the server side article fetching

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
