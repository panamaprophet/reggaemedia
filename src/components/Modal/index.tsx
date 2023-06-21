import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';


const modalSizes = {
    'auto': 'w-auto h-auto',
    'screen': 'w-screen h-screen'
}

const modalType = {
    'default': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ',
    'float': '',
}

const modalOverlay = {
    'float': 'bg-transparent',
    'default': 'bg-slate-50/95' 
}

interface Props {
    children: ReactNode,
    isOpen: boolean,
    type?: 'default' | 'float',
    size?: 'auto' | 'screen',
    onClose?: () => void;
    className?: string,
    position?: { top: number, left: number },
}

export const Modal = ({ children, size = 'auto', type = 'default', isOpen, onClose = () => { }, position }: Props) => {
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
        <div className="fixed h-full w-full top-0 left-0 right-0 bottom-0">
            <div className={`fixed h-full w-full ${modalOverlay[type]}`} onClick={onClose} />
            <div className={`fixed ${modalSizes[size]} ${modalType[type]}`} style={position}>
                {children}
            </div>
        </div >,
        document.body,
    );
};
