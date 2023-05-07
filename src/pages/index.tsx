import Head from 'next/head';
import { Header } from '@/components/Header';
import { Section } from '@/components/Section';
import { Footer } from '@/components/Footer';
import { Logo } from '@/components/Logo';
import { GetServerSideProps } from 'next';
import { Article, User } from '@/types';
import { getArticles } from '@/resolvers/articles';
import { Link } from '@/components/Link';


const Page = ({ articles = [] }: { articles: Article[], users: User[] }) => {
    return (
        <>
            <Head>
                <title>Home Page</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Section>
                    <Header onSearch={(text) => console.log(text)} />
                </Section>
                <Section>
                    <div className='flex justify-center items-center my-16'>
                        <Logo size="medium" />
                    </div>
                </Section>

                <Section>
                    {articles && articles.map((article, index) => (
                        <Link key={index} href={`/articles/${article.id}`}>
                            <p className="text-2xl font-normal">{article.title}</p>
                            <p>preview text</p>
                        </Link>
                    ))}
                </Section>

                <Section>
                    <Footer />
                </Section>
            </main>
        </>
    )
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {
            articles: await getArticles(),
            users: [], // @todo
        },
    };
};
