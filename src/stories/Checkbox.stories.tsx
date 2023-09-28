import { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@/components/Checkbox';

const meta: Meta<typeof Checkbox> = {
    title: 'Checkbox',
    component: Checkbox,
    argTypes: {
        onChange: {
            action: 'state changed'
        }
    }
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
    args: {
        label: 'чекбокс с лейблом',
    },
};

export const Checked: Story = {
    args: {
        label: 'чекбокс с лейблом',
        isChecked: true,
    },
};
