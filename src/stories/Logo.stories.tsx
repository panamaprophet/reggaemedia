import { Meta, StoryObj } from '@storybook/react';
import { Logo } from '@/components/Logo';

const meta: Meta<typeof Logo> = {
    title: 'Logo',
    component: Logo,
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Medium: Story = {
    args: {
        size: 'medium',
    },
};

export const Small: Story = {
    args: {
        size: 'small',
    },
};

export const Large: Story = {
    args: {
        size: 'large',
    },
};
