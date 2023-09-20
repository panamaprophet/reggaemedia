import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArticlePreview } from '@/components/ArticlePreview';
import { getPublishedArticles } from '@/services/articles';

export const metadata: Metadata = {
    title: 'Reggaemedia | Статьи',
};

const Page = async () => {
    const articles = await getPublishedArticles();

    return (
        <>
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
