import { Header } from '@/components/Header';
import { Link } from '@/components/Link';
import Head from 'next/head';

const Page = () => (
    <>
        <Head>
            <title>Reggaemedia | Страница не найдена</title>
        </Head>
        <div className="h-screen flex flex-col">
            <Header hasInlineLogo />
            <div className="flex items-center justify-center w-full flex-grow">
                <h1 className="text-2xl font-extrabold text-slate-900 border-r pr-5">404</h1>
                <h2 className="text-slate-700 ml-5">
                    Такой страницы не существует. <Link className="text-blue-600" to="/">Домой</Link>
                </h2>
            </div>
        </div>
    </>
)

export default Page;
