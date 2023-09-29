import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/Button';

const meta: Meta<typeof Button> = {
    title: 'Button',
    component: Button,
    argTypes: {
        onClick: { action: 'clicked' },
    },
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
    args: {
        children: 'Нажать',
    },
};

export const Secondary: Story = {
    args: {
        children: 'Нажать',
        theme: 'secondary',
    },
};

export const Delete: Story = {
    args: {
        children: 'Удалить',
        theme: 'delete',
    },
};

export const SizeMedium: Story = {
    args: {
        children: 'Нажать обычную кнопку',
        size: 'medium',
    },
};

export const SizeSmall: Story = {
    args: {
        children: 'Нажать маленькую кнопку',
        size: 'small',
    },
};

export const WidthFull: Story = {
    args: {
        children: 'Нажать широкую кнопку',
        width: 'full',
    },
};
