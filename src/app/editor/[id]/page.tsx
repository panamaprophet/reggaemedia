import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { ArticleEditForm } from '@/components/ArticleEditForm';
import { ContextProvider as ToastContextProvider } from '@/components/Toasts';
import { getArticleById } from '@/services/articles';
import { createArticle } from '@/actions/articles';

const Page = async ({ params }: { params: { id: string } }) => {
    const isNew = params.id === 'new';

    const session = await getServerSession();
    const article = await (isNew ? createArticle({ authorId: session?.user.id ?? '' }) : getArticleById(params.id));

    if (!session) {
        redirect(`/api/auth/signin?callbackUrl=/editor/${params.id}`);
    }

    if (!article) {
        return notFound();
    }

    return (
        <ToastContextProvider>
            <div className="max-w-4xl w-full mx-auto mb-4">
                <ArticleEditForm article={article} />
            </div>
        </ToastContextProvider>
    );
}

export default Page;
