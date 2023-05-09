import { randomUUID } from 'crypto';
import { DeleteItemCommand, GetItemCommand, PutItemCommand, QueryCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { client as db } from '@/providers/db';
import { sortByDate } from '@/helpers';
import type { Article } from '@/types';


const tableName = String(process.env.TABLE_ARTICLES);


export const updateArticleById = async (id: string, changes: Partial<Article>) => {
    const result = await db.send(new PutItemCommand({
        TableName: tableName,
        Item: marshall({
            id,
            ...changes,
            updatedOn: Date.now(),
        }),
    }));

    return {
        success: result.$metadata.httpStatusCode === 200,
        id,
    };
};

export const createArticle = async (article: Partial<Article>) => {
    const id = randomUUID();

    return updateArticleById(id, {
        ...article,
        createdOn: Date.now(),
    });
};

export const getArticleById = async (id: string) => {
    const result = await db.send(new GetItemCommand({
        TableName: tableName,
        Key: marshall({ id }),
    }));

    return result.Item ? unmarshall(result.Item) : null;
};

export const removeArticleById = async (id: string) => {
    const result = await db.send(new DeleteItemCommand({
        TableName: tableName,
        Key: marshall({ id }),
    }));

    return result.$metadata.httpStatusCode === 200;
};

export const getArticles = async () => {
    const result = await db.send(new ScanCommand({
        TableName: tableName,
        Limit: 100,
    }));

    if (!result.Items) {
        return null;
    }

    return result.Items
        .map(item => unmarshall(item))
        .map(item => item as Article) // @todo: add transform step
        .sort(sortByDate);
};

export const getRelatedArticles = async (id: string) => {
    const result = await db.send(new ScanCommand({
        TableName: tableName,
        Limit: 100,
        ProjectionExpression: 'id, title',
    }));

    if (!result.Items || result.Items.length === 1) {
        return [];
    }

    const items = result.Items
        .map(item => unmarshall(item))
        .map(item => item as Pick<Article, 'id' | 'title'>);

    const currentArticleIndex = items.findIndex(item => item.id === id);

    const previousItem = items[currentArticleIndex - 1] || null;
    const nextItem = items[currentArticleIndex + 1] || null;

    return [previousItem, nextItem];
};

export const getPublishedArticles = async () => {
    const result = await db.send(new QueryCommand({
        TableName: tableName,
        IndexName: 'publishedIndex',
        KeyConditionExpression: '#key = :value',
        ExpressionAttributeNames: { '#key': 'isPublished' },
        ExpressionAttributeValues: marshall({ ':value': true }),
        ScanIndexForward: false,
    }));

    return result.Items
        ? result.Items.map(item => unmarshall(item))
        : null;
};
