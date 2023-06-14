import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { getArticlesWithTag } from '@/services/articles';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArticlePreview } from '@/components/ArticlePreview';
import { Article } from '@/types';


type Props = {
    articles: Article[],
}

const Page = ({ articles }: Props) => {
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

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
    const { query: { tag } } = ctx;

    const articles = await getArticlesWithTag(tag);

    return {
        props: {
            articles,
        },
    };
};
