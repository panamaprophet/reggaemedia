import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArticlePreview } from '@/components/ArticlePreview';
import { getArticlesByTag } from '@/services/articles';

export const generateMetadata = async (props: { params: { tag: string } }): Promise<Metadata> => ({
    title: `Reggaemedia | Поиск по тегу: ${decodeURIComponent(props.params.tag)}`,
});

const Page = async ({ params }: { params: { tag: string } }) => {
    const tag = decodeURIComponent(params.tag);
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
