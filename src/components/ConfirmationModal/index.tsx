import { ComponentProps } from 'react';
import { Modal } from '../Modal';
import { Button } from '../Button';


type ModalProps = ComponentProps<typeof Modal>;

type Props = Omit<ModalProps, 'onClose'> & {
    onConfirm: () => void,
    onDecline: () => void,
    confirmButtonText?: string,
    declineButtonText?: string,
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
                <Button type="delete" onClick={onConfirm}>{confirmButtonText}</Button>
                <Button type="secondary" onClick={onDecline}>{declineButtonText}</Button>
            </div>
        </div>
    </Modal>
);