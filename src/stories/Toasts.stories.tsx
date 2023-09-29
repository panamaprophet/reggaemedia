import type { Meta, StoryObj } from '@storybook/react';
import { Container, Toast } from '@/components/Toasts';

const meta: Meta<typeof Container> = {
    title: 'Toasts',
    component: Container,
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Empty: Story = {};

export const OneItem: Story = {
    render: (args) => (
        <Container {...args}>
            <Toast>Внимание внимание!</Toast>
        </Container>
    ),
};

export const ManyItems: Story = {
    render: (args) => (
        <Container {...args}>
            <Toast>Внимание внимание!</Toast>
            <Toast>Внимание!</Toast>
            <Toast>Внимание! Поезд отправляется</Toast>
        </Container>
    ),
};

export const HeavyContent: Story = {
    render: (args) => (
        <Container {...args}>
            <Toast>
                Внимание внимание! Поезд отправляется через пять минут с платформы девять и три четверти!
            </Toast>
        </Container>
    ),
};

