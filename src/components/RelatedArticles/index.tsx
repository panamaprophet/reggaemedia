import { Article } from '@/types';
import { NavigationButton } from './elements/NavigationButton';


type Props = {
    [key in 'previous' | 'next']: Pick<Article, 'id' | 'title'> | null;
};

export const RelatedArticles = ({ previous, next }: Props) => (
    <div className="flex flex-row justify-between gap-4">
        {previous && (<NavigationButton {...previous} direction="previous" />)}

        {!previous && <div data-name="spacer" />}

        {next && (<NavigationButton {...next} direction="next" />)}
    </div>
);
