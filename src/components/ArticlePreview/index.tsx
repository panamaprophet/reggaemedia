import { Article } from '@/types';
import { Link } from '@/components/Link';
import { useEditorStateParser } from '@/components/Editor/hooks/useEditorStateParser';
import { theme } from '@/theme';
import { formatArticleDate } from '@/helpers/article';


export const ArticlePreview = ({ article }: { article: Article }) => {
    const body = useEditorStateParser(article.body, { theme, isPreview: true });

    return (
        <div className="p-4">
            <Link href={`/articles/${article.id}`} className="text-2xl font-normal mb-4 block">
                {article.title}
            </Link>

            <div className="text-gray-400 text-sm mb-4">
                {formatArticleDate(article)}
            </div>

            {body}

            <br />

            <Link href={`/articles/${article.id}`}>Читать далее</Link>
        </div>
    );
};
