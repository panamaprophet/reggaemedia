import { ReactNode } from "react";

interface Props {
    children: ReactNode,
}

export const Section = ({ children }: Props) => {
    return (
        <div className="flex justify-center w-full pb-2 border-b border-b-slate-200">
            {children}
        </div>
    );
};
