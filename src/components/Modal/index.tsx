import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalType = {
    'default': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ',
    'float': '',
};

const modalOverlay = {
    'float': 'bg-transparent select-none pointer-events-none',
    'default': 'bg-slate-50/95',
};

export interface Props {
    children: ReactNode;
    isOpen: boolean;
    type?: 'default' | 'float';
    className?: string;
    position?: { top: number, left: number };
    onClose?: () => void;
}

export const Modal = ({ children, type = 'default', isOpen, onClose = () => { }, position }: Props) => {
    useEffect(() => {
        if (type !== 'float') {
            document.body.style.overflow = isOpen ? 'hidden' : 'visible';
        }
    }, [isOpen, type]);

    useEffect(() => {
        const handleKeyboardClick = (event: KeyboardEvent) => (event.code === 'Escape') && onClose();

        document.addEventListener('keydown', handleKeyboardClick);

        return () => {
            document.removeEventListener('keydown', handleKeyboardClick);
        }
    }, [onClose]);

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <div className="fixed h-full w-full top-0 left-0 z-10">
            <div className={`fixed h-full w-full ${modalOverlay[type]}`} onClick={onClose} />
            <div className={`fixed ${modalType[type]}`} style={position}>
                {children}
            </div>
        </div >,
        document.body,
    );
};
