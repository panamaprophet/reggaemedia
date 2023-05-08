import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Article, User } from '@/types';
import { getArticles } from '@/services/articles';
import { ArticlePreview } from '@/components/ArticlePreview';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Logo } from '@/components/Logo';


const Page = ({ articles = [] }: { articles: Article[], users: User[] }) => (
    <>
        <Head>
            <title>Reggaemedia | Статьи</title>
        </Head>

        <Header />

        <div className="flex justify-center items-center border-b border-b-slate-200 py-16">
            <Logo size="medium" />
        </div>

        <main>
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
            articles: await getArticles(),
            users: [], // @todo
        },
    };
};
