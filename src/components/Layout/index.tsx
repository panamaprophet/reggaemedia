import { ReactNode } from 'react';


export const Layout = ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
)

export const Row = ({ children, className }: { children: ReactNode, className?: string }) => (
    <div className={['flex', className].join(' ')}>
        {children}
    </div>
)

export const Column = ({ children, className }: { children: ReactNode, className?: string }) => (
    <div className={['flex flex-col', className].join(' ')}>
        {children}
    </div>
)
