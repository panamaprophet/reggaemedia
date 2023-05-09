import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEditorStateParser } from '@/components/Editor/hooks/useEditorStateParser';
import { getArticleById, getRelatedArticles } from '@/services/articles';
import { theme } from '@/theme';
import { Article, User } from '@/types';
import { getUserById } from '@/services/auth';
import { formatArticleDate } from '@/helpers/article';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Link } from '@/components/Link';
import { ArrowLeft } from '@/components/Icons/ArrowLeft';
import { ArrowRight } from '@/components/Icons/ArrowRight';
import { Button } from '@/components/Button';
import { RelatedArticles } from '@/components/RelatedArticles';


interface Props {
    article: Article,
    author: User,
    relatedArticles: [
        previous: Pick<Article, 'id' | 'title'>,
        next: Pick<Article, 'id' | 'title'>
    ] | null,
}


const Page = ({ article, author, relatedArticles }: Props) => {
    const body = useEditorStateParser(article.body, { theme });

    return (
        <>
            <Head>
                <title>Reggaemedia | {article.title}</title>
            </Head>

            <Header />

            <div className="max-w-4xl mx-auto my-0 pb-4">
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

                {relatedArticles && (
                    <RelatedArticles
                        prev={relatedArticles[0]}
                        next={relatedArticles[1]}
                    />
                )}
            </div>

            <Footer />
        </>
    )
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
    const { query } = ctx;
    const { id } = query;

    const article = await getArticleById(id);
    const author = article && await getUserById(article.authorId);
    const relatedArticles = article && await getRelatedArticles(id);

    return {
        notFound: !article,
        props: {
            article,
            author,
            relatedArticles,
        },
    };
};
