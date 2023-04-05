import { DynamoDBClient } from '@aws-sdk/client-dynamodb';


export const client = new DynamoDBClient({
    credentials: {
        accessKeyId: String(process.env.AMAZON_ACCESS_KEY),
        secretAccessKey: String(process.env.AMAZON_SECRET_KEY),
    },
    region: String(process.env.AMAZON_REGION),
});
