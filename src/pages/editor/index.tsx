import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import Head from 'next/head';
import { EditorArticlePreview } from '@/components/EditorArticlePreview';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getArticles } from '@/resolvers/articles';
import { Article } from '@/types';
import { useState } from 'react';
import { ConfirmationModal } from '@/components/ConfirmationModal';


const removeArticle = (id: string) => fetch('/api/articles/' + id, { method: 'DELETE' }).then(response => response.json());


const Page = ({ articles = [] }: { articles: Article[] }) => {
    const [selectedArticle, setSelectedArticle] = useState<Article>();

    const onConfirm = () => {
        if (!selectedArticle) {
            return;
        }

        removeArticle(selectedArticle.id);
        setSelectedArticle(undefined);
    };

    const onDecline = () => setSelectedArticle(undefined);

    return (
        <>
            <Head>
                <title>Reggaemedia | Редактор</title>
            </Head>

            <ConfirmationModal
                onConfirm={onConfirm}
                onDecline={onDecline}
                confirmButtonText="Удалить"
                declineButtonText="Отмена"
                isOpen={Boolean(selectedArticle)}
            >
                <p>Статья «{selectedArticle?.title}» будет удалена.</p>
                <p>Продолжить?</p>
            </ConfirmationModal>

            <div className="flex flex-col max-w-4xl w-full mx-auto p-4">
                {articles.map((article) => (
                    <EditorArticlePreview
                        key={article.id}
                        article={article}
                        onRemove={() => setSelectedArticle(article)}
                    />
                ))}
            </div>
        </>
    );
};

export default Page;

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
    const session = await getServerSession(ctx.req, ctx.res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: `/api/auth/signin?callbackUrl=${ctx.req.url}`,
                permanent: false,
            },
        };
    }

    return {
        props: {
            articles: await getArticles(),
        },
    };
};
