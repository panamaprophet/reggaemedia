import { Meta, StoryObj } from '@storybook/react';
import { Modal } from '@/components/Modal';

const meta: Meta<typeof Modal> = {
    title: 'Modal',
    component: Modal,
};

type Story = StoryObj<typeof meta>;

export default meta;

const ModalContentMock = (
    <div className="border border-slate-50/95 rounded shadow p-4 bg-white">
        Модальное окно
    </div>
);

const FullSizeModalContentMock = (
    <div className="border border-slate-50/95 rounded shadow p-4 bg-red-100 w-screen h-screen" >
        Модальное окно
    </div >
);

export const Default: Story = {
    args: {
        isOpen: true,
        children: ModalContentMock,
    },
};

export const Float: Story = {
    args: {
        isOpen: true,
        type: 'float',
        position: {
            top: 100,
            left: 100,
        },
        children: ModalContentMock,
    },
};

export const FullSize: Story = {
    args: {
        isOpen: true,
        children: FullSizeModalContentMock,
    },
};
