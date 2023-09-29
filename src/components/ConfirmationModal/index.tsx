import { Modal } from '../Modal';
import { Button } from '../Button';
import { ReactNode } from 'react';

type Props = {
    isOpen: boolean;
    children: ReactNode;
    onConfirm: () => void;
    onDecline: () => void;
    confirmButtonText?: string;
    declineButtonText?: string;
}


export const ConfirmationModal = ({
    children,
    isOpen,
    onConfirm,
    onDecline,
    confirmButtonText = 'Oк',
    declineButtonText = 'Отмена',
}: Props) => (
    <Modal isOpen={isOpen} onClose={onDecline}>
        <div className="border rounded-md shadow-sm bg-white p-4 text-center">
            {children}

            <div className="flex flex-row pt-4 gap-4 justify-center">
                <Button theme="delete" onClick={onConfirm}>{confirmButtonText}</Button>
                <Button theme="secondary" onClick={onDecline}>{declineButtonText}</Button>
            </div>
        </div>
    </Modal>
);
