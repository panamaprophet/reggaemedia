import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import Head from 'next/head';
import { EditorArticlePreview } from '@/components/EditorArticlePreview';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getArticles, removeArticle } from '@/actions/articles';
import { Article } from '@/types';


const Page = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedArticle, setSelectedArticle] = useState<Article>();

    const onConfirm = async () => {
        if (!selectedArticle) {
            return;
        }

        await removeArticle(selectedArticle.id);
        await getArticles().then(setArticles);

        setSelectedArticle(undefined);
    };

    const onDecline = () => setSelectedArticle(undefined);

    useEffect(() => { getArticles().then(setArticles) }, []);

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
        props: {},
    };
};
