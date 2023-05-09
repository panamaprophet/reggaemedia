import { cx } from '@/helpers';
import { ReactNode } from 'react';


type Props = {
    children: ReactNode,
    className?: string,
    to?: string,
    target?: '_self' | '_blank',
    onClick?: () => void,
}


export const Link = ({ className, children, to, ...props }: Props) => (
    <a className={cx('hover:underline underline-offset-2 transition cursor-pointer', className)} href={to} {...props}>
        {children}
    </a>
);
