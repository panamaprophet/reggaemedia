import { sendEmail } from '@/services/email';
import { NextResponse } from 'next/server';

const ADMIN_EMAIL = String(process.env.ADMIN_EMAIL);

export const POST = async (request: Request) => {
    const { message, sender } = await request.json();
    const { name, email } = sender;

    const response = await sendEmail({
        from: email,
        to: ADMIN_EMAIL,
        subject: `Reggaemedia | ${name} написал письмо`,
        body: message,
    });

    return NextResponse.json({ success: Boolean(response) });
};
