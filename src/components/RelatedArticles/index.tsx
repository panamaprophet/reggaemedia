import { Article } from '@/types';
import { Button } from '../Button';
import { ArrowLeft } from '../Icons/ArrowLeft';
import { ArrowRight } from '../Icons/ArrowRight';


interface Props {
    prev?: Pick<Article, 'id' | 'title'>,
    next?: Pick<Article, 'id' | 'title'>,
}


export const RelatedArticles = (props: Props) => {
    const { prev, next } = props;

    if (!prev && !next) {
        return null;
    }

    return (
        <div className="flex justify-between items-center p-4">
            {prev && (
                <Button type="secondary" to={`/articles/${prev.id}`}>
                    <div className="flex items-center gap-4">
                        <ArrowLeft size={16} />
                        <div>
                            <span className="block text-sx text-gray-400 flex items-center justify-start">
                                Предыдущая статья
                            </span>

                            {prev.title}
                        </div>
                    </div>
                </Button>
            )}

            {next && (
                <Button type="secondary" to={`/articles/${next.id}`}>
                    <div className="flex items-center gap-4">
                        <div>
                            <span className="block text-sx text-gray-400 flex items-center justify-end">
                                Следующая статья
                            </span>

                            {next.title}
                        </div>
                        <ArrowRight size={16} />
                    </div>
                </Button>
            )}
        </div>
    );
}
