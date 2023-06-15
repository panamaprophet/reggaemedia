import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Article, User } from '@/types';
import { getPublishedArticles } from '@/services/articles';
import { ArticlePreview } from '@/components/ArticlePreview';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';


const Page = ({ articles = [] }: { articles: Article[], users: User[] }) => (
    <>
        <Head>
            <title>Reggaemedia | Статьи</title>
        </Head>

        <Header />

        <main className="flex-grow">
            {articles.map((article) => (
                <ArticlePreview article={article} key={article.id} />
            ))}
        </main>

        <Footer />
    </>
);

export default Page;

export const getServerSideProps: GetServerSideProps = async (_) => {
    return {
        props: {
            articles: await getPublishedArticles(),
            users: [], // @todo
        },
    };
};
