import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEditorStateParser } from '@/components/Editor/hooks/useEditorStateParser';
import { getArticleById } from '@/resolvers/articles';
import { theme } from '@/theme';
import { Article, User } from '@/types';
import { getUserById } from '@/resolvers/auth';
import { formatArticleDate } from '@/helpers/article';


const Page = ({ article, author }: { article: Article, author: User }) => {
    const body = useEditorStateParser(article.body, { theme });

    return (
        <>
            <Head>
                <title>{article.title}</title>
            </Head>

            <div>
                <h1 className="text-3xl p-4 pt-8">
                    {article.title}
                </h1>

                <div className="flex flex-col justify-center items-start text-gray-400 text-sm p-4">
                    <div>{formatArticleDate(article)}</div>
                    <div>{author.name || author.id}</div>
                </div>

                <div className="p-4">
                    {body}
                </div>
            </div>
        </>
    )
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
    const { query } = ctx;
    const { id } = query;

    const article = await getArticleById(id);
    const author = article && await getUserById(article.authorId);

    return {
        notFound: !article,
        props: {
            article,
            author,
        },
    };
};
