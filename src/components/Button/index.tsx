import { cx } from '@/helpers';
import { MouseEventHandler, ReactNode } from 'react';


const ButtonType = {
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
        max-w-full
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

const ButtonSize = {
    'small': 'px-2 py-1 text-xs shadow-sm rounded',
    'medium': 'px-4 py-2.5 text-sm shadow-sm rounded-md',
};

interface Props {
    children: ReactNode,
    disabled?: boolean,
    type?: keyof typeof ButtonType,
    size?: keyof typeof ButtonSize,
    onClick?: MouseEventHandler<HTMLButtonElement>,
}

export const Button = ({
    type = 'default',
    size = 'medium',
    children,
    disabled,
    onClick,
}: Props) => (
    <button className={cx(ButtonSize[size], ButtonType[type])} onClick={onClick} disabled={disabled}>
        {children}
    </button>
);
