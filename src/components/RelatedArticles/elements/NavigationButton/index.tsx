import { Button } from '@/components/Button';
import { ArrowLeft } from '@/components/Icons/ArrowLeft';
import { ArrowRight } from '@/components/Icons/ArrowRight';


export const NavigationButton = ({ id, title, direction = 'next' }: { id: string, title: string, direction?: 'next' | 'prev' }) => (
    <Button type="secondary" to={`/articles/${id}`}>
        <div className="flex items-center gap-4" title={title}>
            {direction === 'prev' && (
                <div className="flex-shrink-0">
                    <ArrowLeft size={16} />
                </div>
            )}

            <div className="whitespace-nowrap text-ellipsis overflow-hidden text-left">
                <div className="text-sx text-gray-400">
                    {direction === 'prev' && 'Предыдущая статья'}
                    {direction === 'next' && 'Следующая статья'}
                </div>
                {title}
            </div>

            {direction === 'next' && (
                <div className="flex-shrink-0">
                    <ArrowRight size={16} />
                </div>
            )}
        </div>
    </Button >
);
