import Head from 'next/head';
import { useRouter } from 'next/router';

/**
 * article editor page.
 *
 * uses lexical and some other features (tags, publish/unpublish, etc) to edit the some particular page by id
 *
 * @returns {React.Component>}
 */
export default function ArticleEditor() {
    const { query } = useRouter();
    const { id: ids } = query;
    const id = (Array.isArray(ids) && ids.length > 0) ? ids[0] : ids;

    console.log('article id = ', id);

    return (
        <>
            <Head>
                <title>ArticleEditor</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </>
    )
}
