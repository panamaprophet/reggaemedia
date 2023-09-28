import type { Meta, StoryObj } from '@storybook/react';
import { InputText } from '@/components/Input/InputText';

const meta: Meta<typeof InputText> = {
    title: 'Input',
    component: InputText,
    argTypes: {
        onChange: { action: 'changed' },
    },
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
    args: {
        value: 'инпут с текстом',
        placeholder: 'test@example.com',
    },
};

export const Placeholder: Story = {
    args: {
        value: '',
        placeholder: 'test@example.com',
    },
};
