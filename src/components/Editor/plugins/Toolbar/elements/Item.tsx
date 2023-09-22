import { ReactNode } from 'react';
import { Button } from '@/components/Button';
import { cx } from '@/helpers';

interface Props {
    title?: string,
    active?: boolean,
    disabled?: boolean,
    children: ReactNode,
    onClick: () => void,
}

export const Item = ({
    children,
    title = '',
    active = false,
    disabled = false,
    onClick,
}: Props) => (
    <Button
        theme="secondary"
        onClick={onClick}
        disabled={disabled}
    >
        <div className={cx('flex items-center justify-center', active && 'bg-slate-100')} title={title}>
            {children}
        </div>
    </Button>
)
