import { UUID } from 'crypto';
import { createPortal } from 'react-dom';
import { Toast } from '../Toast';
import { Props } from '../../types';

export const Container = ({ toasts = [], onClick }: { toasts: Props[], onClick: (id: UUID) => void }) => createPortal(
    <div className="absolute right-8 top-4">
        {toasts.map((toast) => (
            <Toast key={toast.id} onClick={() => onClick(toast.id)}>
                {toast.message}
            </Toast>
        ))}
    </div>,
    document.body,
);
