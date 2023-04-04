import { ReactNode } from "react";

interface Props {
    children: ReactNode,
}

export const Section = ({ children }: Props) => {
    return (
        <div className="flex justify-center w-full border-b-slate-600">
            {children}
        </div>
    );
};
