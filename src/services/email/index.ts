import { SendEmailCommand } from '@aws-sdk/client-ses';
import { client } from '@/providers/ses';

export const sendEmail = async (params: {
    from: string;
    to: string;
    subject: string;
    body: string;
 }) => {
    const result = await client.send(new SendEmailCommand({
        Destination: {
            ToAddresses: [params.to],
        },
        Message: {
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: params.body,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: params.subject,
            },
        },
        Source: params.from,
    }));

    return result.MessageId;
};
