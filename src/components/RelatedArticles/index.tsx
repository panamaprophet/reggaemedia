import { Article } from '@/types';
import { NavigationButton } from './elements/NavigationButton';


interface Props {
    prev?: Pick<Article, 'id' | 'title'>,
    next?: Pick<Article, 'id' | 'title'>,
}


export const RelatedArticles = ({ prev, next }: Props) => (
    <div className="grid grid-cols-2 p-4 gap-64">
        {prev && (<NavigationButton {...prev} direction="prev" />)}

        {!prev && <div data-name="spacer" />}

        {next && (<NavigationButton {...next} direction="next" />)}
    </div>
);
