import { Meta, StoryObj } from '@storybook/react';
import { Link } from '@/components/Link';

const meta: Meta<typeof Link> = {
    title: 'Link',
    component: Link,
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
    args: {
        to: '#',
        children: 'Ссылка',
    },
};
