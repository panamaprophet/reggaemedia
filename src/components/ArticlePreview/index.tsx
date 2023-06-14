import { Article } from '@/types';
import { Link } from '@/components/Link';
import { useEditorStateParser } from '@/components/Editor/hooks/useEditorStateParser';
import { theme } from '@/theme';
import { formatArticleDate } from '@/helpers/article';
import { Ellipsis } from '../Icons/Ellipsis';


export const ArticlePreview = ({ article }: { article: Article }) => {
    const body = useEditorStateParser(article.body, { theme, isPreview: true });

    return (
        <div
            className="
                max-w-4xl
                px-4
                pt-6
                pb-0
                w-full
                last:pb-6
                mx-auto
                hyphens-auto
                group
            "
        >
            <Link to={`/articles/${article.id}`} className="text-2xl font-normal mb-2 block">
                {article.title}
            </Link>

            <div className="text-gray-400 text-sm mb-4">
                {formatArticleDate(article)}
            </div>

            {body}

            <Link to={`/articles/${article.id}`} className="inline-block mt-2">Читать далее</Link>

            <div className="w-full flex items-center justify-center pt-6 pb-0 group-last:hidden">
                <Ellipsis />
            </div>
        </div>
    );
};
