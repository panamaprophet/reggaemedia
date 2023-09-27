import { createPortal } from 'react-dom';
import { ReactNode } from 'react';

export const Container = ({ children }: { children: ReactNode }) => createPortal(
    <div className="absolute right-8 top-4">
        {children}
    </div>,
    document.body,
);
