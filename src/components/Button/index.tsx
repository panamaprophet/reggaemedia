import { cx } from '@/helpers';
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

const ButtonDefaults = `
    disabled:opacity-50
    disabled:cursor-default
`;

const ButtonTheme = {
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

const ButtonWidth = {
    'full': 'w-full',
    'auto': 'w-auto',
};

interface Props {
    children: ReactNode,
    disabled?: boolean,
    theme?: keyof typeof ButtonTheme,
    size?: keyof typeof ButtonSize,
    width?: keyof typeof ButtonWidth,
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'],
    onClick?: MouseEventHandler<HTMLButtonElement>,
}

export const Button = ({
    theme = 'default',
    size = 'medium',
    width = 'auto',
    type,
    children,
    disabled,
    onClick,
}: Props) => (
    <button
        className={cx(
            ButtonDefaults,
            ButtonSize[size],
            ButtonTheme[theme],
            ButtonWidth[width],
        )}
        onClick={onClick}
        disabled={disabled}
        type={type}
    >
        {children}
    </button>
);
