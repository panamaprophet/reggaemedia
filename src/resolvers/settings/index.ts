import { PutItemCommand, DeleteItemCommand, ScanCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { client as db } from '@/services/db';


const tableName = String(process.env.TABLE_SETTINGS);


export const setSetting = async (key: string, value: unknown) => {
    const result = await db.send(new PutItemCommand({
        TableName: tableName,
        Item: marshall({ key, value }),
    }));

    return {
        success: (result.$metadata.httpStatusCode === 200),
        item: { key, value },
    };
};

export const removeSetting = async (key: string) => {
    const result = await db.send(new DeleteItemCommand({
        TableName: tableName,
        Key: marshall({ key }),
    }));

    return {
        success: (result.$metadata.httpStatusCode === 200),
        item: { key },
    };
};

export const getSettings = async (): Promise<any> => {
    const result = await db.send(new ScanCommand({
        TableName: tableName,
        Limit: 100,
    }));

    const items =
        result.Items
            ? result.Items.map(item => unmarshall(item))
            : [];

    return items.reduce((result, item) => ({
        ...result,
        [item.key]: item.value,
    }), {});
};

export const getSetting = async (key: string) => {
    const result = await db.send(new GetItemCommand({
        TableName: tableName,
        Key: marshall({ key }),
    }))

    return result.Item || null;
};
