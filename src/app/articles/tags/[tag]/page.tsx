import Head from 'next/head';

import { getArticlesByTag } from '@/services/articles';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArticlePreview } from '@/components/ArticlePreview';


const Page = async ({ params }: { params: { tag: string } }) => {
    const { tag } = params;
    const articles = await getArticlesByTag(tag) ?? [];

    return (
        <>
            <Head>
                <title>Reggaemedia</title>
            </Head>

            <Header hasInlineLogo={true} />

            {articles.map((article) => <ArticlePreview key={article.id} article={article} />)}

            <Footer />
        </>
    )
};

export default Page;
