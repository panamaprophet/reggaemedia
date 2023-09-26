'use client';

import { UUID } from 'crypto';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Status {
    pending: string;
    resolve: string;
    reject: string;
}

interface Props {
    id: UUID;
    message: ReactNode;
    timeout?: number;
}

interface Context {
    showToast: (toast: Omit<Props, 'id'>) => UUID;
    updateToast: (id: UUID, toast: Omit<Props, 'id'>) => void;
    removeToast: (id: UUID) => void;
    promise: <T, >(fn: () => Promise<T>, status: Status) => Promise<any>;
}

export const ToastContext = createContext<Context>({} as Context);

export const useToast = () => useContext(ToastContext);

export const Container = ({ toasts = [], onClick }: { toasts: Props[], onClick: (id: UUID) => void }) => {
    return createPortal(
        <div className="flex flex-col absolute right-8 top-4">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    onClick={() => onClick(toast.id)}
                    className="rounded-md border bg-white shadow-sm px-4 py-2.5 text-sm mb-2 cursor-pointer"
                >
                    {toast.message}
                </div>
            ))}
        </div>,
        document.body,
    );
};

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
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
            <Container toasts={toasts} onClick={removeToast} />
            {children}
        </ToastContext.Provider>
    );
};
