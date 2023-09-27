import { ReactNode } from 'react';
import { Cross } from '@/components/Icons/Cross';

export const Toast = ({ children, onClick }: { children: ReactNode, onClick?: () => void }) => (
    <div className="float-right clear-right max-w-xs flex items-center p-4 text-gray-500 bg-white rounded-md border shadow gap-2.5 cursor-pointer mb-2" onClick={onClick}>
        <div className="text-sm font-normal hyphens-auto">
            {children}
        </div>
        <div className="shrink-0 flex items-center">
            <Cross />
        </div>
    </div>
);
