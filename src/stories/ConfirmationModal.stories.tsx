import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmationModal } from '@/components/ConfirmationModal';

const meta: Meta<typeof ConfirmationModal> = {
    title: 'ConfirmationModal',
    component: ConfirmationModal,
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
    args: {
        isOpen: true,
        children: 'Подтвердить содержимое модального окна?',
        confirmButtonText: 'Да',
        declineButtonText: 'Нет',
    },
};
