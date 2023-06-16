import { clickableSize, clickableStyle, cx } from '@/helpers';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode,
    onClick?: () => void,
    style?: keyof typeof clickableStyle,
    size?: keyof typeof clickableSize,
    type?: 'button' | 'submit' | 'reset' | undefined,
}

export const Button = ({
    style = 'default',
    size = 'medium',
    children,
    type,
    onClick,
}: Props) => {
    return (
        <button className={cx(clickableSize[size], clickableStyle[style])} type={type} onClick={onClick}>
            {children}
        </button>
    );
};
