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
}: Props) => (
    <a target={target} href={href} >
        {children}
    </a>
);
