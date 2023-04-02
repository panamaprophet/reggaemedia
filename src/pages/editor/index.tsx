import Head from 'next/head';

/**
 * editor main page.
 *
 * shows the list of articles with quick actions
 * - publish / unpublish
 * - edit
 * - view
 * - delete
 * 
 * some optional website stuff editable by admin also should be located here
 *
 * @returns {React.Component>}
 */
export default function Editor() {
    return (
        <>
            <Head>
                <title>Editor</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </>
    )
}
