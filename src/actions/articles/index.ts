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
