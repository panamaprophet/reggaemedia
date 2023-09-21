import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

const Page = async () => {
    return (
        <div className="flex flex-col h-full">
            <Header hasInlineLogo />

            <main className="flex flex-col justify-center mx-auto h-full w-full max-w-xl">
                <ContactForm />
            </main>

            <Footer />
        </div>
    )
};

export default Page;
