import { ReactNode } from 'react';
import { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
    title: 'Reggaemedia',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="ru">
            <body className="max-w-full min-h-screen">
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
