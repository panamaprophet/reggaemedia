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
        children: 'кнопка',
    },
};
