import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';


interface Props {
    children: ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    size: string;
}

export const Modal = ({ children, isOpen, size, onClose = () => { } }: Props) => {
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
        <div className={["fixed h-full w-full top-0", size].join(' ')}>
            <div className="top-0 left-0 right-0 bottom-0 fixed" onClick={onClose} />
            <div className="w-full fixed flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{children}</div>
        </div >,
        document.body
    );
};
