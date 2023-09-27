import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { UUID } from 'crypto';
import { Status, Props, Context } from '../../types';
import { Container } from '../Container';
import { Toast } from '../Toast';

export const ToastContext = createContext<Context>({} as Context);

export const useToast = () => useContext(ToastContext);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Props[]>([]);
    const [timeoutIds, setTimeoutIds] = useState<{ [id: UUID]: NodeJS.Timeout }>({});

    const showToast = (toast: Omit<Props, 'id'>) => {
        const id = globalThis.crypto.randomUUID() as UUID;
        const timeout = toast.timeout ?? 3000;
        const timeoutId = setTimeout(() => removeToast(id), timeout);

        setToasts(state => [...state, { ...toast, id }]);
        setTimeoutIds({ ...timeoutIds, [id]: timeoutId });

        return id;
    };

    const updateToast = (id: UUID, toast: Omit<Props, 'id'>) => {
        setToasts(state => state.map(item => item.id === id ? { ...item, ...toast } : item));
    };

    const removeToast = (id: UUID) => {
        const { [id]: timeoutId, ...rest } = timeoutIds;

        clearTimeout(timeoutId);
        setTimeoutIds(rest);
        setToasts(state => state.filter(toast => toast.id !== id));
    };

    const promise = <T,>(fn: () => Promise<T>, status: Status) => {
        const toastId = showToast({ message: status.pending });

        return fn()
            .then(() => updateToast(toastId, { message: status.resolve }))
            .catch(() => updateToast(toastId, { message: status.reject }));
    };

    useEffect(() => {
        return () => {
            Object
                .values(timeoutIds)
                .forEach(timeoutId => clearTimeout(timeoutId));
        };
    }, [timeoutIds]);

    return (
        <ToastContext.Provider value={{ showToast, updateToast, removeToast, promise }}>
            <Container>
                {toasts.map((toast) => (
                    <Toast key={toast.id} onClick={() => removeToast(toast.id)}>
                        {toast.message}
                    </Toast>
                ))}
            </Container>
            {children}
        </ToastContext.Provider>
    );
};
