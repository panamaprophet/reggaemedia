import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArticlePreview } from '@/components/ArticlePreview';
import { getArticlesByTag } from '@/services/articles';

export const metadata: Metadata = {
    title: 'Reggaemedia | Поиск по тегу',
};

const Page = async ({ params }: { params: { tag: string } }) => {
    const { tag } = params;
    const articles = await getArticlesByTag(tag) ?? [];

    return (
        <>
            <Header hasInlineLogo={true} />

            <main className="flex-grow">
                {articles.map((article) => <ArticlePreview key={article.id} article={article} />)}
            </main>

            <Footer />
        </>
    )
};

export default Page;
