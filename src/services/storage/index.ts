import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { client } from '@/providers/s3';


export const getUploadUrl = (bucket: string, key: string) => getSignedUrl(client, new PutObjectCommand({
    Bucket: bucket,
    Key: key,
}));
