import { clickableSize, clickableStyle, cx } from '@/helpers';
import { ReactNode } from 'react';


interface Props {
    children: ReactNode,
    onClick?: () => void,
    style?: keyof typeof clickableStyle,
    size?: keyof typeof clickableSize,
    to?: string,
    className?: string,
}

export const Link = ({
    style,
    size,
    className,
    children,
    to,
}: Props) => {
    return (
        <a className={cx(className, size && clickableSize[size], style && clickableStyle[style])} href={to}>
            {children}
        </a>
    );
};
