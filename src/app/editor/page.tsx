import { getServerSession } from 'next-auth';
import { getArticles } from '@/services/articles';
import { Button } from '@/components/Button';
import { Link } from '@/components/Link';
import { redirect } from 'next/navigation';
import { Metadata, NextPage } from 'next';
import { EditorArticleList } from '@/components/EditorArticleList/EditorArticleList';

export const metadata: Metadata = {
    title: 'Reggaemedia | Редактор',
};

const Page: NextPage = async () => {
    const articles = await getArticles();
    const session = await getServerSession();

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/editor');
    }

    return (
        <div className="flex flex-col max-w-4xl w-full mx-auto p-4">
            <div className="flex justify-end items-center pb-4">
                <Link to="/editor/new">
                    <Button type="secondary">
                        Новая статья
                    </Button>
                </Link>
            </div>

            <EditorArticleList articles={articles} />
        </div>
    );
};

export default Page;
