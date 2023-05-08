import { ReactNode } from 'react';

interface Props {
    children: ReactNode,
}

export const Section = ({ children }: Props) => (
    <section className="w-full flex border-b border-b-slate-200 last:border-0 justify-between">
        {children}
    </section>
);

