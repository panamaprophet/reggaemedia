import { sendEmail } from '@/services/email';
import { NextResponse } from 'next/server';

const ADMIN_EMAIL = String(process.env.ADMIN_EMAIL);

export const POST = async (request: Request) => {
    const { message, sender } = await request.json();
    const { name, email } = sender;

    const response = await sendEmail({
        from: ADMIN_EMAIL,
        to: ADMIN_EMAIL,
        subject: `Reggaemedia | ${name} написал письмо`,
        body: `${message}\n\n${name}\n${email}`,
    });

    return NextResponse.json({ success: Boolean(response) });
};
