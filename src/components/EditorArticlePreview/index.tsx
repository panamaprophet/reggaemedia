import { formatArticleDate } from '@/helpers/article';
import { Article } from '@/types';
import { Link } from '../Link';


export const EditorArticlePreview = ({ article, onRemove }: { article: Article, onRemove: (id: string) => void }) => (
    <div className="w-full p-4 mt-2 gap-2 flex flex-col rounded border">
        <Link className="text-black" to={`/editor/${article.id}`}>
            {article.title}
        </Link>

        <div className="text-xs text-gray-600">
            Обновлено {formatArticleDate(article, true)}
        </div>

        <div className="flex flex-row gap-2 text-xs">
            <Link className="text-blue-400" to={`/editor/${article.id}`}>Редактировать</Link> ·
            <Link className="text-blue-400" to={`/articles/${article.id}`}>Просмотр</Link> ·
            <Link className="text-red-400" to="" onClick={() => onRemove(article.id)}>Удалить</Link>
        </div>
    </div>
);
