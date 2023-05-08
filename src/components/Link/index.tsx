import { cx } from '@/helpers';
import { ReactNode } from 'react';


interface PropsWithHref {
    href: string,
    target?: '_self' | '_blank',
}

interface PropsWithClick {
    onClick: () => void,
}

type Props = {
    children: ReactNode,
    className?: string,
} & (PropsWithHref | PropsWithClick);


export const Link = ({ className, children, ...props }: Props) => (
    <a className={cx('hover:underline underline-offset-2 transition cursor-pointer', className)} {...props}>
        {children}
    </a>
);
