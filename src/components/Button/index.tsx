import { ReactNode } from 'react';

interface Props {
    children: ReactNode,
    onClick?: () => void,
    type?: 'default' | 'secondary',
}

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
    `
}

export const Button = ({ type = 'default', children, onClick }: Props) => (
    <button className={`${ButtonTypes[type]}`} onClick={onClick}>
        {children}
    </button>
)
