import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEditorStateParser } from '@/components/Editor/hooks/useEditorStateParser';
import { getArticleById } from '@/resolvers/articles';
import { theme } from '@/theme';
import { Article } from '@/types';


const Page = ({ article }: { article: Article }) => {
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

                <div className="flex justify-between items-center text-gray-400 text-sm p-4">
                    <div>{new Date(article.updatedOn).toDateString()}</div>
                    {/* <div>{article.tags.join(' ')}</div> */}
                    {/* <div>{article.authorId}</div> */}
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

    return {
        notFound: !article,
        props: {
            article,
        },
    };
};
