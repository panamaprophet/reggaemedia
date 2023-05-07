import { cx } from '@/helpers';
import { ReactNode } from 'react';


interface Props {
    children: ReactNode,
    href: string,
    className?: string,
    target?: '_self' | '_blank',
}


export const Link = ({
    children,
    href,
    target = '_self',
    className
}: Props) => (
    <a className={cx('text-gray-600 hover:underline underline-offset-2 transition', className)} target={target} href={href} >
        {children}
    </a>
);
