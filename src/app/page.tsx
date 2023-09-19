import Head from 'next/head';
import { getPublishedArticles } from '@/services/articles';
import { ArticlePreview } from '@/components/ArticlePreview';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';


const Page = async () => {
    const articles = await getPublishedArticles() ?? [];

    return (
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
};

export default Page;
