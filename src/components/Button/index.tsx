import { ReactNode } from "react";

interface Props {
    children: ReactNode,
    onClick: () => void,
}

export const Button = ({ children, onClick }: Props) => {
    return (
        <button className="outline-none bg-none" onClick={onClick}>{children}</button>
    );
};
