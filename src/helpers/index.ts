import { Article } from '@/types';


export const cx = (...classes: unknown[]) =>
    classes
        .filter(Boolean)
        .filter(value => typeof value !== 'object')
        .join(' ');

export const getCurrentYear = () => new Date().getFullYear();

export const sortByDate = (a: Article, b: Article) => (b.updatedOn || b.createdOn) - (a.updatedOn || a.createdOn);

export const clickableStyle = {
    'default': `
        outline-none
        bg-none
        text-inherit
    `,
    'secondary': `
        font-semibold
        bg-white
        text-slate-700
        border
        border-slate-300
        focus:ring-4
        focus:ring-offset-2
        focus:ring-offset-slate-50
        focus:ring-blue-300
    `,
    'delete': `
        font-semibold
        bg-red-500
        text-slate-100
        border
        border-red-200
        focus:ring-4
        focus:ring-offset-2
        focus:ring-offset-slate-50
        focus:ring-blue-300
    `
};

export const clickableSize = {
    'small': 'px-2 py-1 text-xs shadow-sm rounded',
    'medium': 'px-4 py-2 text-sm shadow-sm rounded-md',
}
