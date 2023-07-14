import { ComponentProps } from 'react';
import NextLink from 'next/link';
import { cx } from '@/helpers';


type LinkProps = ComponentProps<typeof NextLink>;

type Props = Omit<LinkProps, 'href'> & { to: LinkProps['href'] };


export const Link = ({ className, children, to, ...props }: Props) => (
    <NextLink className={cx('underline underline-offset-2 transition cursor-pointer', className)} href={to} {...props}>
        {children}
    </NextLink>
);
