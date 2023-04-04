import { ReactNode } from 'react';

interface Props {
    children: ReactNode,
    className?: string;
}

export const Text = ({ children }: Props) => {
    return <div className="leading-10 uppercase text-gray-600">{children}</div>;
};
