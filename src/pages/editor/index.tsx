import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import Head from 'next/head';
import { EditorArticlePreview } from '@/components/EditorArticlePreview';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getArticles } from '@/resolvers/articles';
import { Article } from '@/types';


// @todo: add confirmation modal
const removeArticle = (id: string) => fetch('/api/articles/' + id, { method: 'DELETE' }).then(response => response.json());


const Page = ({ articles = [] }: { articles: Article[] }) => {
    return (
        <>
            <Head>
                <title>Reggaemedia | Редактор</title>
            </Head>

            <div className="flex flex-col max-w-4xl w-full mx-auto p-4">
                {articles.map(article => (
                    <EditorArticlePreview key={article.id} article={article} onRemove={removeArticle} />
                ))}
            </div>
        </>
    );
};

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
        props: {
            articles: await getArticles(),
        },
    };
};
