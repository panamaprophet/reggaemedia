import { UUID } from 'crypto';

export interface Status {
    pending: string;
    resolve: string;
    reject: string;
}

export interface Props {
    id: UUID;
    message: ReactNode;
    timeout?: number;
}

export interface Context {
    showToast: (toast: Omit<Props, 'id'>) => UUID;
    updateToast: (id: UUID, toast: Omit<Props, 'id'>) => void;
    removeToast: (id: UUID) => void;
    promise: <T, >(fn: () => Promise<T>, status: Status) => Promise<any>;
}
