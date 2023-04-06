import { ReactNode } from 'react'


interface Props {
    children: ReactNode,
}

export const Container = ({ children }: Props) => {
    return (
        <div className="w-full max-w-6xl">
            {children}
        </div>
    );
};
