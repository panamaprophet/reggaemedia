import { cx } from '@/helpers';
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';


interface Props {
    children: ReactNode;
    isOpen: boolean;
    size: string,
    onClose?: () => void;
    className?: string;
}

export const Modal = ({ children, isOpen, size, className = '', onClose = () => { } }: Props) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'visible';
    }, [isOpen]);

    useEffect(() => {
        const handleKeyboardClick = (event: KeyboardEvent) => (event.code === 'Escape') && onClose();

        document.addEventListener('keydown', handleKeyboardClick);

        return () => document.removeEventListener('keydown', handleKeyboardClick);
    }, [onClose]);

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <div className={cx("fixed h-full w-full top-0", size)}>
            <div className="top-0 left-0 right-0 bottom-0 fixed bg-slate-50/95" onClick={onClose} />
            <div className={cx("w-full fixed flex items-center justify-center", className)}>{children}</div>
        </div >,
        document.body
    );
};
