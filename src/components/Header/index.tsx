import { Row } from '../Layout';
import { Link } from '../Link';
import { Search } from '../Search';
import { YouTube } from '../Icons/YouTube';
import { VK } from '../Icons/VK';
import { Instagram } from '../Icons/Instagram';
import { Section } from '../Section';
import { ReactNode } from 'react';
import { cx } from '@/helpers';


interface Props {
    onSearch?: (text: string) => void,
}

const LinkButtonWithIcon = ({ href, children, color = 'bg-black-500' }: { children: ReactNode, color: string, href: string }) => (
    <Link className={cx('w-8 h-8 flex items-center justify-center rounded', color)} href={href}>
        {children}
    </Link>
);

export const Header = ({ onSearch = () => { } }: Props) => {
    const links = {
        youtube: 'https://www.youtube.com/watch?v=7ip0XCgggFQ',
        vk: 'https://vk.com/reggaemedia',
        instagram: 'https://www.instagram.com/reggaemedia/',
    }

    return (
        <Section>
            <Row className="w-full px-4 py-2 uppercase text-gray-600 flex justify-between items-center">
                <div className="flex gap-4">
                    <Link className="text-xs uppercase" href="/">Статьи</Link>
                    <Link className="text-xs uppercase" href="/">Связаться c нами</Link>
                </div>

                <div className="flex gap-4">
                    <LinkButtonWithIcon href={links.vk} color="bg-blue-500">
                        <VK size={14} />
                    </LinkButtonWithIcon>

                    <LinkButtonWithIcon href={links.youtube} color="bg-red-500">
                        <YouTube size={14} />
                    </LinkButtonWithIcon>

                    <LinkButtonWithIcon href={links.instagram} color="bg-blue-500">
                        <Instagram size={14} />
                    </LinkButtonWithIcon>

                    <Search onSubmit={(query: string) => onSearch(query)} />
                </div>
            </Row>
        </Section>
    );
};
