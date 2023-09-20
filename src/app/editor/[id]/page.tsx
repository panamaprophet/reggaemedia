import { getServerSession } from 'next-auth';
import { getArticleById } from '@/services/articles';
import { createArticle } from '@/actions/articles';
import { notFound } from 'next/navigation';
import { ArticleEditForm } from '../../../components/ArticleEditForm/ArticleEditForm';


const Page = async ({ params }: { params: { id: string } }) => {
    const isNew = params.id === 'new';

    const session = await getServerSession();
    const article = await (isNew ? createArticle({ authorId: session?.user.id ?? '' }) : getArticleById(params.id));

    if (!article) {
        return notFound();
    }

    return (
        <div className="max-w-4xl w-full mx-auto mb-4">
            <ArticleEditForm article={article} />
        </div>
    );
}

export default Page;
