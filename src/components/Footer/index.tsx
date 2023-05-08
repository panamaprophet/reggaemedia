import { getCurrentYear } from '@/helpers';
import { Section } from '../Section';

export const Footer = () => (
    <Section>
        <div className="w-full p-4 border-t boder-t-slate-200 text-center text-gray-600 text-xs uppercase">
            {getCurrentYear()} © Reggaemedia. Crafted with love.
        </div>
    </Section>
)
