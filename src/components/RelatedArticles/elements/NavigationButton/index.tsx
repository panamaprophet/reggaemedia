import { Button } from '@/components/Button';
import { ArrowLeft } from '@/components/Icons/ArrowLeft';
import { ArrowRight } from '@/components/Icons/ArrowRight';
import { Link } from '@/components/Link';


export const NavigationButton = (props: {
    id: string,
    title: string,
    direction?: 'next' | 'previous',
}) => {
    const isNext = props.direction === 'next';
    const isPrevious = props.direction === 'previous';
    const text = isPrevious ? 'Предыдущая статья' : 'Следующая статья'

    return (
        <Link to={`/articles/${props.id}`}>
            <Button type="secondary">
                <div className="flex items-center gap-4" title={props.title}>
                    {isPrevious && (
                        <div className="flex-shrink-0">
                            <ArrowLeft />
                        </div>
                    )}

                    <div className="whitespace-nowrap text-ellipsis overflow-hidden text-left">
                        <div className="text-sx text-gray-400">
                            {text}
                        </div>

                        {props.title}
                    </div>

                    {isNext && (
                        <div className="flex-shrink-0">
                            <ArrowRight />
                        </div>
                    )}
                </div>
            </Button>
        </Link>
    );
};
