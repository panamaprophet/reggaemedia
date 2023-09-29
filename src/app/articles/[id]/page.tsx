import { Metadata } from 'next';
import { SerializedEditorState } from 'lexical';
import { useEditorStateParser } from '@/components/Editor/hooks/useEditorStateParser';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RelatedArticles } from '@/components/RelatedArticles';
import { getArticleById, getPublishedArticles, getRelatedArticles } from '@/services/articles';
import { getUserById } from '@/services/auth';
import { formatArticleDate } from '@/helpers/article';
import { theme } from '@/theme';
import { Article } from '@/types';

const getArticleBody = (article: Article | null) => article?.body ?? {} as SerializedEditorState;

export const generateMetadata = async (props: { params: { id: string } }): Promise<Metadata> => {
    const article = await getArticleById(props.params.id);
    const title = article ? article.title : 'статья не найдена';

    return {
        title: `Reggaemedia | ${title}`,
    };
};

export const generateStaticParams = async () => {
    const articles = await getPublishedArticles() ?? [];
    const paths = articles.map(({ id }) => ({ id }));

    return paths;
};

const Page = async ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const article = await getArticleById(id);
    const author = article && await getUserById(article.authorId);
    const relatedArticles = article && await getRelatedArticles(id);

    const articleTitle = article?.title || '';
    const articleBody = getArticleBody(article);
    const body = useEditorStateParser(articleBody, { theme });

    if (!article || !author) {
        return null;
    }

    return (
        <>
            <Header hasInlineLogo={true} />

            <article className="max-w-4xl mx-auto my-0 pb-4 grow">
                <h1 className="text-3xl p-4 pt-8">
                    {articleTitle}
                </h1>

                <div className="flex flex-col justify-center items-start text-gray-400 text-sm p-4">
                    <div>{formatArticleDate(article)}</div>
                    <div>{author.name || author.id}</div>
                </div>

                <div className="p-4">
                    {body}
                </div>
            </article>

            <div className="max-w-4xl mx-auto px-4 pb-8 empty:hidden">
                {relatedArticles && (<RelatedArticles {...relatedArticles} />)}
            </div>

            <Footer />
        </>
    )
};

export default Page;
