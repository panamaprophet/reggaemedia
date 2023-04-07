import { ReactNode } from 'react';

interface Props {
    children: ReactNode,
    onClick: () => void,
}

export const Button = ({ children, onClick }: Props) => (
    <button className="outline-none bg-none text-inherit" onClick={onClick}>{children}</button>
)
