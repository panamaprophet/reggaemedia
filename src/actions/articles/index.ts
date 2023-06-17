import { Article } from '@/types';


const fetchJson = <T>(...args: Parameters<typeof fetch>): Promise<T> => fetch(...args).then(response => response.json());

export const saveArticle = async (article: Partial<Article>) => {
    const hasId = Boolean(article.id);
    const method = hasId ? 'PUT' : 'POST';
    const url = hasId ? `/api/articles/${article.id}` : '/api/articles';
    const body = JSON.stringify(article);

    const result = await fetchJson<{ article: Article }>(url, { method, body });

    return result.article.id;
};

export const getArticles = () => fetchJson<{ articles: Article[] }>('/api/articles').then(response => response.articles);

export const getArticle = async (id: string) => fetchJson<Article>(`/api/articles/${id}`)

export const removeArticle = (id: string) => fetchJson<{ success: boolean }>('/api/articles/' + id, { method: 'DELETE' });

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

type PublishResult = Pick<Article, 'id' | 'updatedOn' | 'createdOn' | 'publishedOn'>;

export const publishArticle = (id: string) => fetchJson<PublishResult>(`/api/articles/${id}/publish`, { method: 'POST' });

export const unpublishArticle = (id: string) => fetchJson<PublishResult>(`/api/articles/${id}/unpublish`, { method: 'POST' });

export const getTags = () => fetchJson<string[]>('/api/articles/tags');
