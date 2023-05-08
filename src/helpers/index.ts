import { Article } from '@/types';


export const cx = (...classes: unknown[]) =>
    classes
        .filter(Boolean)
        .filter(value => typeof value !== 'object')
        .join(' ');

export const getCurrentYear = () => new Date().getFullYear();

export const sortByDate = (a: Article, b: Article) => (b.updatedOn || b.createdOn) - (a.updatedOn || a.createdOn);
