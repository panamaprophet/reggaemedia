import { Meta, StoryObj } from '@storybook/react';
import { SerializedTextNode } from 'lexical';
import { ArticlePreview } from '@/components/ArticlePreview';
import { Article } from '@/types';

const meta: Meta<typeof ArticlePreview> = {
    title: 'Article Preview',
    component: ArticlePreview,
};

type Story = StoryObj<typeof meta>;

export default meta;

const articleMock: Article = {
    id: globalThis.crypto.randomUUID(),
    authorId: globalThis.crypto.randomUUID(),
    title: 'Тестовая статья',
    tags: ['a', 'b', 'c'],
    createdOn: Date.now(),
    updatedOn: Date.now(),
    publishedOn: Date.now(),
    body: {
        root: {
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
            children: [{
                type: 'text',
                version: 1,
                text: `
                    Елена Вахник, режиссер и журналист из Москвы, выпустившая документальный фильм «Регги c севера», 
                    c участием легендарного продюсера Ли «Скрэтч» Перри, 
                    критика Артемия Троицкого и российских музыкантов: Децла, Герберта Моралеса, Коли Маню, Steppa Style, Prophet P, Tenor Youthman, 
                    рассказывает o том, как проходили съемки фильма. «Регги c севра» показали на Международном фестивале документального кино в Йиглаве (Чехия), 
                    a также в десятках городов России и СНГ.
                `,
            } as SerializedTextNode],
        },
    },
};

export const Default: Story = {
    args: {
        article: articleMock,
    },
};

export const MultipleItems: Story = {
    decorators: [
        (Story) => (
            <div>
                <Story />
                <Story />
            </div>
        ),
    ],
    args: {
        article: articleMock,
    },
};
