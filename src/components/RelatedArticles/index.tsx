import { Article } from '@/types';
import { Button } from '../Button';
import { ArrowLeft } from '../Icons/ArrowLeft';
import { ArrowRight } from '../Icons/ArrowRight';


interface Props {
    prev?: Pick<Article, 'id' | 'title'>,
    next?: Pick<Article, 'id' | 'title'>,
}


export const RelatedArticles = ({ prev, next }: Props) => (
    <div className="grid grid-cols-2 p-4 gap-64">
        {prev && (
            <Button type="secondary" to={`/articles/${prev.id}`}>
                <div className="flex items-center gap-4" title={prev.title}>
                    <div className="flex-shrink-0">
                        <ArrowLeft size={16} />
                    </div>

                    <div className="whitespace-nowrap text-ellipsis overflow-hidden text-left">
                        <div className="text-sx text-gray-400">Предыдущая статья</div>
                        {prev.title}
                    </div>
                </div>
            </Button>
        )}

        {!prev && <div data-name="spacer" />}

        {next && (
            <Button type="secondary" to={`/articles/${next.id}`}>
                <div className="flex items-center gap-4" title={next.title}>
                    <div className="whitespace-nowrap text-ellipsis overflow-hidden text-right">
                        <div className="text-sx text-gray-400">Следующая статья</div>
                        {next.title}
                    </div>

                    <div className="flex-shrink-0">
                        <ArrowRight size={16} />
                    </div>
                </div>
            </Button>
        )}
    </div>
);
