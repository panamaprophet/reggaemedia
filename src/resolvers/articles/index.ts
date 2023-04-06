import { randomUUID } from 'crypto';
import { DeleteItemCommand, GetItemCommand, PutItemCommand, QueryCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { client as db } from '@/services/db';
import type { Article } from '@/types';


const tableName = String(process.env.TABLE_ARTICLES);


export const updateArticleById = async (id: string, changes: Partial<Article>) => {
    const result = await db.send(new PutItemCommand({
        TableName: tableName,
        Item: marshall({ id, ...changes }),
    }));

    return result.$metadata.httpStatusCode === 200;
};

export const createArticle = async (article: Partial<Article>) => {
    const id = randomUUID();

    return updateArticleById(id, article);
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

    return result.Items
        ? result.Items.map(item => unmarshall(item))
        : null;
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