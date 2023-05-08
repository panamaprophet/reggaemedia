import { Header } from '@/components/Header';
import { Link } from '@/components/Link';
import { Section } from '@/components/Section';
import Head from 'next/head';

export default function Custom404() {
    return (
        <>
            <Head>
                <title>Reggaemedia | Страница не найдена</title>
            </Head>
            <div className="relative h-screen w-screen">
                <div className="absolute top-0 w-full">
                    <Section>
                        <Header onSearch={(text) => console.log(text)} />
                    </Section>
                </div>
                <div className="flex items-center justify-center w-full h-full">
                    <h1 className="text-2xl font-extrabold text-slate-900 border-r pr-5">404</h1>
                    <h2 className="text-slate-700 ml-5">Такой страницы не существует. <Link className="text-blue-600" href="/">Домой?</Link></h2>
                </div>
            </div>
        </>
    )
}
