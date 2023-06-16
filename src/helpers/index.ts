import { Article } from '@/types';


export const cx = (...classes: unknown[]) =>
    classes
        .filter(Boolean)
        .filter(value => typeof value !== 'object')
        .join(' ');

export const getCurrentYear = () => new Date().getFullYear();

export const sortByDate = (a: Article, b: Article) => (b.updatedOn || b.createdOn) - (a.updatedOn || a.createdOn);

export const removeByIndex = <T,>(index: number, items: T[]) => items.filter((_, itemIndex) => itemIndex !== index);

export const setByIndex = <T,>(index: number, value: T, items: T[]) => items.map((item, itemIndex) => itemIndex === index ? value : item);
