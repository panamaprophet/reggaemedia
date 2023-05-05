import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';


const modalSizes = {
    'auto': 'w-auto h-auto',
    'screen': 'w-screen h-screen'
}

interface Props {
    children: ReactNode;
    isOpen: boolean;
    size?: 'auto' | 'screen',
    onClose?: () => void;
    className?: string;
}

export const Modal = ({ children, size = 'auto', isOpen, onClose = () => { } }: Props) => {
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
        <div className="fixed h-full w-full top-0 left-0 right-0 bottom-0">
            <div className="fixed h-full w-full bg-slate-50/95" onClick={onClose} />
            <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${modalSizes[size]}`}>
                {children}
            </div>
        </div >,
        document.body
    );
};
