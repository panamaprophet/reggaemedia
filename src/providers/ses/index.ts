import { SESClient } from '@aws-sdk/client-ses';

export const client = new SESClient({
    credentials: {
        accessKeyId: String(process.env.AMAZON_ACCESS_KEY),
        secretAccessKey: String(process.env.AMAZON_SECRET_KEY),
    },
    region: String(process.env.AMAZON_REGION),
});
