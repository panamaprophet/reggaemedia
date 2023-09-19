import { Metadata } from 'next';

import '@/styles/globals.css';

export const metadata: Metadata = {
    title: 'Reggaemedia',
    description: 'Welcome to reggaemedia',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ru">
            <body className="max-w-full min-h-screen">
                {children}
            </body>
        </html>
    )
}
