import { ReactNode } from 'react';


const ButtonTypes = {
    'default': `
        outline-none
        bg-none
        text-inherit
    `,
    'secondary': `
        px-4
        py-2
        font-semibold
        text-sm
        bg-white
        text-slate-700
        border
        border-slate-300
        rounded-md
        shadow-sm
        focus:ring-4
        focus:ring-offset-2
        focus:ring-offset-slate-50
        focus:ring-blue-300
        dark:bg-slate-700
        dark:text-slate-200
        dark:ring-offset-slate-900
        dark:border-transparent
    `,
    'delete': `
        px-4
        py-2
        font-semibold
        text-sm
        bg-red-500
        text-slate-100
        border
        border-red-200
        rounded-md
        shadow-sm
        focus:ring-4
        focus:ring-offset-2
        focus:ring-offset-slate-50
        focus:ring-blue-300
        dark:bg-slate-700
        dark:text-slate-200
        dark:ring-offset-slate-900
        dark:border-transparent
    `
};

interface Props {
    children: ReactNode,
    onClick?: () => void,
    type?: keyof typeof ButtonTypes,
    to?: string,
}

export const Button = ({ type = 'default', children, to, onClick }: Props) => {
    const Tag = to ? 'a' : 'button';

    return (
        <Tag className={`${ButtonTypes[type]}`} href={to} onClick={onClick}>
            {children}
        </Tag>
    );
};
