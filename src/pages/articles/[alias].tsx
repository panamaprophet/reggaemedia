import { GetServerSideProps } from 'next';
import Head from 'next/head';

/**
 * article page.
 *
 * shows particular article by alias (consider id as default or fallback option)
 *
 * @returns {React.Component>}
 */
export default function Article() {
    return (
        <>
            <Head>
                <title>Article</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
    const { url } = ctx.req;

    return {
        props: {
            url,
        },
    };
}
