import Head from 'next/head';

import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { Section } from '@/components/Section';


export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Section>
          <Container>
            <Header />
          </Container>
        </Section>
      </main>
    </>
  )
}
