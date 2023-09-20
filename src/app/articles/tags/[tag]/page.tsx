import { getArticlesByTag } from '@/services/articles';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArticlePreview } from '@/components/ArticlePreview';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Reggaemedia | Поиск по тегу',
};

const Page = async ({ params }: { params: { tag: string } }) => {
    const { tag } = params;
    const articles = await getArticlesByTag(tag) ?? [];

    return (
        <>
            <Header hasInlineLogo={true} />

            {articles.map((article) => <ArticlePreview key={article.id} article={article} />)}

            <Footer />
        </>
    )
};

export default Page;
