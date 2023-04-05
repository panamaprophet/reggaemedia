import { ReactNode } from 'react';

interface Props {
    children: ReactNode,
    className?: string;
}

export const Text = ({ children }: Props) => {
    return <div className="text-xs uppercase">{children}</div>;
};
