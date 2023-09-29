import { Meta, StoryObj } from '@storybook/react';
import { Tags } from '@/components/Tags';

const meta: Meta<typeof Tags> = {
    title: 'Tags',
    component: Tags,
    argTypes: {
        onChange: { action: 'changed' },
    },
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
    args: {
        value: ['Первый', 'Второй', 'Третий'],
    },
};
