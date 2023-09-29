import { Meta, StoryObj } from '@storybook/react';
import { RelatedArticles } from '@/components/RelatedArticles';
import { ComponentProps } from 'react';

const meta: Meta<typeof RelatedArticles> = {
    title: 'RelatedArticles',
    component: RelatedArticles,
};

type Story = StoryObj<typeof meta>;

export default meta;

const articleMock: ComponentProps<typeof RelatedArticles>['next'] = {
    id: globalThis.crypto.randomUUID(),
    title: 'Крайне интересная тестовая статья про что-то смешное',
};

const shortTitleMock = 'Статья';

export const Default: Story = {
    args: {
        previous: articleMock,
        next: articleMock,
    },
};

export const PreviousOnly: Story = {
    args: {
        previous: articleMock,
    },
};

export const NextOnly: Story = {
    args: {
        next: articleMock,
    },
};

export const ShortTitle: Story = {
    args: {
        next: { ...articleMock, title: shortTitleMock },
        previous: { ...articleMock, title: shortTitleMock },
    },
};
