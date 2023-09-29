import { randomUUID } from 'crypto';
import { cache } from 'react';
import {
    DeleteItemCommand,
    GetItemCommand,
    PutItemCommand,
    ReturnConsumedCapacity,
    ReturnValue,
    ScanCommand,
    UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
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

export const getArticleById = cache(async (id: string) => {
    const result = await db.send(new GetItemCommand({
        TableName: tableName,
        Key: marshall({ id }),
    }));

    return result.Item ? unmarshall(result.Item) as Article : null;
});

export const removeArticleById = async (id: string) => {
    const result = await db.send(new DeleteItemCommand({
        TableName: tableName,
        Key: marshall({ id }),
    }));

    return result.$metadata.httpStatusCode === 200;
};

export const getArticles = cache(async () => {
    const result = await db.send(new ScanCommand({
        TableName: tableName,
        Limit: 100,
        ReturnConsumedCapacity: ReturnConsumedCapacity.TOTAL,
    }));

    console.log('getArticles. consumed capacity: %s', result.ConsumedCapacity?.CapacityUnits);

    return (result.Items || [])
        .map(item => unmarshall(item))
        .map(item => item as Article) // @todo: add transform step
        .sort(sortByDate);
});

export const getRelatedArticles = cache(async (id: string) => {
    const result = await db.send(new ScanCommand({
        TableName: tableName,
        Limit: 100,
        ProjectionExpression: 'id, title',
        FilterExpression: 'attribute_exists(publishedOn)',
        ReturnConsumedCapacity: ReturnConsumedCapacity.TOTAL,
    }));

    console.log('getRelatedArticles. consumed capacity: %s', result.ConsumedCapacity?.CapacityUnits);

    if (!result.Items || result.Items.length === 1) {
        return null;
    }

    const items = result.Items.map(item => unmarshall(item) as Pick<Article, 'id' | 'title'>);
    const currentArticleIndex = items.findIndex(item => item.id === id);
    const previous = items[currentArticleIndex - 1] || null;
    const next = items[currentArticleIndex + 1] || null;

    return {
        previous,
        next,
    }
});

export const getPublishedArticles = cache(async () => {
    const result = await db.send(new ScanCommand({
        TableName: tableName,
        Limit: 100,
        FilterExpression: 'attribute_exists(publishedOn)',
        ReturnConsumedCapacity: ReturnConsumedCapacity.TOTAL,
    }));

    console.log('getPublishedArticles. consumed capacity: %s', result.ConsumedCapacity?.CapacityUnits);

    return (result.Items || [])
        .map(item => unmarshall(item) as Article)
        .sort((a, b) => b.publishedOn! - a.publishedOn!);
});

export const unpublishArticle = async ({ id }: Pick<Article, 'id'>): Promise<Pick<Article, 'id' | 'updatedOn' | 'publishedOn'>> => {
    const result = await db.send(new UpdateItemCommand({
        TableName: tableName,
        Key: marshall({ id }),
        UpdateExpression: 'REMOVE publishedOn SET updatedOn = :updatedOn',
        ExpressionAttributeValues: marshall({
            ':updatedOn': Date.now(),
        }),
        ReturnValues: ReturnValue.UPDATED_NEW,
    }));

    const { publishedOn, updatedOn } = unmarshall(result.Attributes || {});

    return {
        id,
        updatedOn,
        publishedOn,
    };
};

export const publishArticle = async ({ id }: Pick<Article, 'id'>): Promise<Pick<Article, 'id' | 'updatedOn' | 'publishedOn'>> => {
    const result = await db.send(new UpdateItemCommand({
        TableName: tableName,
        Key: marshall({ id }),
        UpdateExpression: 'SET publishedOn = :publishedOn, updatedOn = :updatedOn',
        ExpressionAttributeValues: marshall({
            ':publishedOn': Date.now(),
            ':updatedOn': Date.now(),
        }),
        ReturnValues: ReturnValue.UPDATED_NEW,
    }));

    const { publishedOn, updatedOn } = unmarshall(result.Attributes || {});

    return {
        id,
        updatedOn,
        publishedOn,
    };
};

export const getTags = cache(async () => {
    const result = await getPublishedArticles();

    if (!result) {
        return [];
    }

    const tags = result.reduce((acc, item) => {
        item.tags.forEach((tag: string) => acc.add(tag));

        return acc;
    }, new Set<string>());

    return Array.from(tags);
});

export const getArticlesByTag = cache(async (tag: string) => {
    const result = await getPublishedArticles();
    const articles = result?.filter((item) => item.tags.includes(tag));

    if (!result) {
        return null;
    }

    return articles;
});
