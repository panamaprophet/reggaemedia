'use client';

import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Link } from '@/components/Link';

export const metadata: Metadata = {
    title: 'Reggaemedia | Страница не найдена',
};

const Page = () => (
    <div className="h-screen flex flex-col">
        <Header hasInlineLogo={true} />
        <div className="flex items-center justify-center w-full grow">
            <h1 className="text-2xl font-extrabold text-slate-900 border-r pr-5">404</h1>
            <h2 className="text-slate-700 ml-5">
                Такой страницы не существует. <Link className="text-blue-600" to="/">Домой</Link>
            </h2>
        </div>
    </div>
);

export default Page;
