import { ReactNode } from 'react';


export const Layout = ({ children }: { children: ReactNode }) => {
    return <div>{children}</div>;
};

export const Row = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <div className={['flex', className].join(' ')}>
            {children}
        </div>
    );
};

export const Column = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <div className={['flex flex-col', className].join(' ')}>
            {children}
        </div>
    );
};
