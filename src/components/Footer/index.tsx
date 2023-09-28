import { getCurrentYear } from '@/helpers';

export const Footer = () => (
    <section className="w-full p-4 border-t boder-t-slate-200 text-center text-gray-600 text-xs uppercase">
        {getCurrentYear()} © Reggaemedia. Crafted with love.
    </section>
);
