import { Article } from '@/types';

export const saveArticle = async (article: Partial<Article>) => {
    const hasId = Boolean(article.id);
    const method = hasId ? 'PUT' : 'POST';
    const url = hasId ? `/api/articles/${article.id}` : '/api/articles';
    const body = JSON.stringify(article);

    const result = await fetch(url, { method, body }).then(response => response.json());

    return result.article.id;
};

export const getArticles = () => fetch('/api/articles')
    .then(response => response.json())
    .then<Article[]>(response => response.articles);

export const getArticle = async (id: string) => fetch(`/api/articles/${id}`)
    .then(response => response.json())
    .then<Article>(response => response.article);

export const removeArticle = (id: string) => fetch('/api/articles/' + id, { method: 'DELETE' })
    .then(response => response.json());

export const createArticle = async ({ authorId }: { authorId: string }) => ({
    authorId,
    title: '',
    tags: [],
    body: {
        root: {
            direction: null,
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
            children: [{ type: 'paragraph', version: 1 }],
        },
    },
    createdOn: Date.now(),
    updatedOn: Date.now(),
});

export const publishArticle = (id: string) => fetch(`/api/articles/${id}/publish`, { method: 'POST' }).then(response => response.json());

export const unpublishArticle = (id: string) => fetch(`/api/articles/${id}/unpublish`, { method: 'POST' }).then(response => response.json());
